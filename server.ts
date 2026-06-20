import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Increase limit to handle base64 image/document uploads (PDF/Resume parses)
app.use(express.json({ limit: "12mb" }));
app.use(express.urlencoded({ limit: "12mb", extended: true }));

// Initialize Google GenAI Client
const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Robust generate function with automatic model fallback and retries to avoid temporary 503 / high demand errors
async function generateContentWithFallback(params: { model?: string, contents: any, config?: any }) {
  const models = ["gemini-3.5-flash", "gemini-3.1-flash-lite"];
  let lastError: any = null;
  const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));
  
  // Attempt 1: Try each model sequentially without wait delay to see if one is instantly available
  for (const model of models) {
    try {
      console.log(`Executing request using model: ${model} (Primary attempt)`);
      const response = await ai.models.generateContent({
        ...params,
        model: model
      });
      return response;
    } catch (err: any) {
      lastError = err;
      const errMsg = String(err.message || err.statusText || JSON.stringify(err) || "").toLowerCase();
      const code = err.status || err.code || (err.error && err.error.code);
      
      const isUnavailable = 
        code === 503 || 
        code === 429 || 
        code === 500 ||
        code === 504 ||
        errMsg.includes("503") || 
        errMsg.includes("429") || 
        errMsg.includes("500") || 
        errMsg.includes("504") || 
        errMsg.includes("unavailable") || 
        errMsg.includes("high demand") || 
        errMsg.includes("overloaded") ||
        errMsg.includes("resource_exhausted") || 
        errMsg.includes("limit") ||
        errMsg.includes("temporary");
        
      if (isUnavailable) {
        console.warn(`[Gemini Fallback] Model ${model} is busy/rate-limited (status ${code || "429"}). Trying next model immediately...`);
        continue;
      }
      
      console.error(`[Gemini Error] Non-retryable error using model ${model}:`, err);
      throw err; // Non-retryable configuration or programming error
    }
  }

  // Attempt 2: If primary attempts failed on all models, perform retry with backoff on the robust lite model
  console.warn(`[Gemini Fallback] Primary attempts failed on all models. Starting backoff retries on gemini-3.1-flash-lite...`);
  const retryModel = "gemini-3.1-flash-lite";
  const maxRetries = 3;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Retrying request using fallback model: ${retryModel} (Attempt ${attempt}/${maxRetries})`);
      const response = await ai.models.generateContent({
        ...params,
        model: retryModel
      });
      return response;
    } catch (err: any) {
      lastError = err;
      if (attempt < maxRetries) {
        const delay = attempt * 1500 + Math.random() * 500;
        console.warn(`[Gemini Retry] Fallback model ${retryModel} returned error. Retrying in ${Math.round(delay)}ms...`);
        await sleep(delay);
      }
    }
  }
  
  throw lastError;
}

// Robust JSON sanitizing and parsing helper
function cleanAndParseJSON(text: string, fallback: any) {
  if (!text) return fallback;
  let cleanText = text.trim();
  
  // Remove markdown code block backticks if present
  if (cleanText.startsWith("```")) {
    cleanText = cleanText.replace(/^```[a-zA-Z]*\s*/, "");
    cleanText = cleanText.replace(/\s*```$/, "");
    cleanText = cleanText.trim();
  }
  
  // Find the first brace { or bracket [
  const firstBrace = cleanText.indexOf("{");
  const firstBracket = cleanText.indexOf("[");
  let startIdx = -1;
  let isObject = true;
  
  if (firstBrace !== -1 && (firstBracket === -1 || firstBrace < firstBracket)) {
    startIdx = firstBrace;
    isObject = true;
  } else if (firstBracket !== -1) {
    startIdx = firstBracket;
    isObject = false;
  }
  
  if (startIdx !== -1) {
    let depth = 0;
    let inString = false;
    let escape = false;
    let endIdx = -1;
    
    for (let i = startIdx; i < cleanText.length; i++) {
      const char = cleanText[i];
      
      if (escape) {
        escape = false;
        continue;
      }
      
      if (char === "\\") {
        escape = true;
        continue;
      }
      
      if (char === '"') {
        inString = !inString;
        continue;
      }
      
      if (!inString) {
        if (isObject) {
          if (char === "{") depth++;
          else if (char === "}") {
            depth--;
            if (depth === 0) {
              endIdx = i;
              break;
            }
          }
        } else {
          if (char === "[") depth++;
          else if (char === "]") {
            depth--;
            if (depth === 0) {
              endIdx = i;
              break;
            }
          }
        }
      }
    }
    
    if (endIdx !== -1) {
      cleanText = cleanText.substring(startIdx, endIdx + 1);
    } else {
      // Fallback search last occurrences if balanced scanning is incomplete
      const fallbackEndIdx = isObject ? cleanText.lastIndexOf("}") : cleanText.lastIndexOf("]");
      if (fallbackEndIdx !== -1 && fallbackEndIdx > startIdx) {
        cleanText = cleanText.substring(startIdx, fallbackEndIdx + 1);
      }
    }
  }
  
  try {
    return JSON.parse(cleanText);
  } catch (error) {
    console.warn("[JSON Clean Parser] Standard JSON.parse failed. Attempting tail-comma stripping.", error);
    try {
      // Remove common trailing commas in arrays/objects
      const sanitized = cleanText.replace(/,\s*([\]}])/g, "$1");
      return JSON.parse(sanitized);
    } catch (e) {
      console.error("[JSON Clean Parser] Failed to parse JSON even after cleaning. Fallback returned:", fallback);
      return fallback;
    }
  }
}

// Primary Server API routes
// Mascot Logo Save Endpoint
app.post("/api/save-logo", async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) {
      return res.status(400).json({ error: "No image data provided" });
    }
    const base64Data = image.replace(/^data:image\/png;base64,/, "");
    const logoFolder = path.join(process.cwd(), "public");
    const distFolder = path.join(process.cwd(), "dist");
    
    if (!fs.existsSync(logoFolder)) {
      fs.mkdirSync(logoFolder, { recursive: true });
    }

    const logoPath = path.join(logoFolder, "logo.png");
    fs.writeFileSync(logoPath, base64Data, "base64");
    
    // Also save copy as apple-touch-icon.png for direct PWA lookups
    const appleIconPath = path.join(logoFolder, "apple-touch-icon.png");
    fs.writeFileSync(appleIconPath, base64Data, "base64");

    // Write to production 'dist' directory as well if it exists at runtime (so production serves it instantly)
    if (fs.existsSync(distFolder)) {
      try {
        fs.writeFileSync(path.join(distFolder, "logo.png"), base64Data, "base64");
        fs.writeFileSync(path.join(distFolder, "apple-touch-icon.png"), base64Data, "base64");
        console.log("Successfully backported Mascot logo dynamically to dist/ folder!");
      } catch (distErr) {
        console.warn("Could not write logo to dist folder directly:", distErr);
      }
    }
    
    console.log("Successfully saved Mascot logo as public/logo.png and public/apple-touch-icon.png!");
    res.json({ success: true, path: "/logo.png" });
  } catch (err: any) {
    console.error("Error writing logo image file:", err);
    res.status(500).json({ error: err.message || "Failed to save logo" });
  }
});

// 1. Career Advisor Chat Endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { messages, profile } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid message payload" });
    }

    if (!apiKey) {
      return res.status(500).json({
         error: "GEMINI_API_KEY environment variable is not defined. Please set it in the Secrets panel."
      });
    }

    // Build personalized instruction if user profile details are provided
    let profileContext = "";
    if (profile) {
      profileContext = `
The user currently has the following profile/CV active:
- Name: ${profile.fullName || "User"}
- Target Role/Yrkesmål: ${profile.targetRole || "N/A"}
- Target Location: ${profile.targetLocation || "Sweden"}
- Active Core Skills: ${Array.isArray(profile.skills) ? profile.skills.join(", ") : "None specified"}
- Education: ${profile.education || "None specified"}
- Certifications: ${profile.certifications || "None specified"}
- Driver Licenses: ${Array.isArray(profile.driverLicenses) ? profile.driverLicenses.join(", ") : "None specified"}
- Experience summary: ${profile.experience || "None specified"}
- Interests: ${profile.interests || "None specified"}
- Languages: ${profile.languages || "None specified"}
- Email: ${profile.email || "None specified"}
- Phone: ${profile.phone || "None specified"}
- CV Summary (Om mig): ${profile.cvText || "None specified"}

Tailor your guidance, suggestions, and responses directly to this profile when relevant, pointing out specific skill gap transitions, learning avenues, or potential Swedish salary scales.`;
    }

    // Prepare content structure
    const formattedContents = messages.map(msg => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }]
    }));

    const response = await generateContentWithFallback({
      contents: formattedContents,
      config: {
        responseMimeType: "application/json",
        systemInstruction: `You are 'Lasse the Career Älg 🇸🇪', a warm, friendly, highly realistic, and conversational Swedish career mascot and expert coach. 

Follow these professional yet warm human-like communication rules strictly:
1. BE EXTRA CONCISE: Do NOT produce walls of text or long-winded paragraphs. Keep replies maximum 2 to 4 sentences total!
2. VISUAL LAYOUT & EMOJIS: Use bullet points accompanied by clean, engaging emojis (like 🇸🇪, ☕, 🤝, 💸, 📈, 💼) instead of dense prose, making facts immediate and bite-sized.
3. TALK LIKE A HUMAN: Do not sound robotic or overly technical. Speak in a helpful, friendly, natural manner.
4. ENGAGING FOLLOW-UPS: Always end your reply with exactly ONE natural, short, inviting follow-up question related to the topic of conversation.
5. SWEDISH LANGUAGE: ALWAYS reply in Swedish. Write all replies fully in Swedish.
6. SWEDISH TRUTHS: Anchor your advice in Swedish facts (Kollektivavtal, Skatteverket, Platsbanken, Fika) but express them concisely in mere lines.
7. NO MARKDOWN FORMATTING: Do NOT use markdown bold/italic style markup (such as asterisks ** or *) or other markdown styles. The chat interface renders plain text with line breaks, so any markdown symbols will look like noise. Keep the text clean, natural, and formatted with plain line breaks and list bullets (•) instead.

PROFILE MANAGEMENT CAPABILITY (CRITICAL EXTRA POWER):
You have direct, real-time read and write access to the user's active Profile/CV details.
If the user mentions or asks you to write, modify, change, delete, or add something to their profile/CV (e.g., "skriv mitt CV för sjuksköterska", "lägg till SQL i mina kunskaper", "ta bort Java från mina kunskaper", "ändra mina intressen till...", "skriv en ny CV-sammanfattning (Om mig)", "lägg till en ny arbetslivserfarenhet"), you must apply these changes in the "profileUpdate" object.
You can write, draft, or adapt any specific section or the entire CV on behalf of the user when requested. Ensure everything is written in professional, natural Swedish.
The fields you can update in the "profileUpdate" object include:
- "fullName": string
- "targetRole": string
- "targetLocation": string
- "email": string
- "phone": string
- "languages": string
- "skills": array of strings (If the user wants to add/merge skills, append them to their existing skills array: [${profile && Array.isArray(profile.skills) ? profile.skills.map((s: string) => `"${s}"`).join(", ") : ""}]. If they want to replace or delete some skills, return the updated array. Keep the tags concise and relevant).
- "education": string (Draft a clean or updated education block if the user wants to adjust/add education)
- "certifications": string
- "driverLicenses": array of strings
- "experience": string (You can write/append beautiful Swedish professional experience summaries here!)
- "interests": string
- "cvText": string (You can write or completely overhaul this Swedish "Om mig & Profil" summary - make it highly compelling and elegant!)

Your text response ("reply") should recognize and warmly acknowledge the change or draft (e.g. "Självklart Sven! Jag har skrivit om ditt CV för att passa rollen som Sjuksköterska och sparat dina nya kunskaper på molnet. Det ser riktigt starkt ut nu! ☕").
If the user does NOT explicitly ask to change, update, write, or add anything in their profile/CV, set "profileUpdate" strictly to null.

${profileContext}

You MUST return your response as a valid JSON object matching this structure:
{
  "reply": "string (the conversation response in Swedish, Max 2-4 sentences, plain text, NO asterisks, with emojis)",
  "profileUpdate": null or {
     // only the customized fields with the updated values
  }
}`
      }
    });

    const parsed = cleanAndParseJSON(response.text || "{}", { reply: response.text || "Jag fick lite gröt i systemet. Kan du försöka igen? ☕" });
    res.json({
      reply: parsed.reply || "Jag förstår inte riktigt, men låt oss sitta ner och ta en fika! ☕ Vad vill du ändra i din profil?",
      profileUpdate: parsed.profileUpdate || null
    });
  } catch (err: any) {
    console.error("Chat error:", err);
    res.status(500).json({ error: err.message || "Internal GenAI Server Error" });
  }
});

// 2. CV Analysis & Career Score Evaluation Endpoint
app.post("/api/analyze-cv", async (req, res) => {
  try {
    const { cvText, fileData, targetRole, location } = req.body;
    
    if (!cvText && !fileData) {
      return res.status(400).json({ error: "No CV text or base64 file data provided." });
    }

    if (!apiKey) {
      return res.status(500).json({
         error: "GEMINI_API_KEY is missing. Configure it in settings."
      });
    }

    // Base prompt explaining instructions
    const prompt = `Analyze the provided resume / profile against the following preferences.
Target Career Path Role: ${targetRole || "Best matching modern high-growth tech/business role"}
Target Location Context: ${location || "Sweden/International"}

You must generate an expert-level, accurate structured analysis in JSON following the CareerScore schema. 

CRITICAL LANGUAGE RULE: All generated textual values, description fields, roadmap instructions, card comments, skill categories, and custom notes MUST be written fully and naturally in Swedish.

Focus points:
- Compute an honest Match Percentage (0-100) comparing their current skills against the requirements for the Target Career Path.
- Determine missing skills sorted by importance (High, Medium, Low), estimate of practical time required to learn each skill, and categorizations.
- Highlight their current strength skills (from the CV) that correspond well.
- Determine regional probability of being hired (0-100) based on target location, estimated expected salaries (entry, mid, senior level) in Swedish Kronor (SEK) or Euros (EUR) depending on location.
- Evaluate regional demand levels. If Sweden/Scandinavia is target, specify a Swedish market comparison score (1-10) and compile a list of active platform search queries or links on Arbetsförmedlingen, LinkedIn, Indeed Sweden, or Jobbsafari.
- Provide a robust, concrete step-by-step 3-stage learning, certification, and recruitment roadmap with specified durations.
- CRITICAL: The roadmap steps MUST be highly specific, detailed, and concrete for the exact targeted role (${targetRole}). Do NOT use generic descriptions, repetitive titles, or general templates across different professions.
- Format each step with:
  1. step: 1 - A fully customized, action-oriented title in Swedish (e.g. "Skaffa formell behörighet inom ..." or "Slutför din utbildning till ..."), providing detailed vocational advice on appropriate schools (Komvux/Yrkeshögskola), key academic credentials or licensing required for ${targetRole} in Sweden.
  2. step: 2 - A fully customized, action-oriented title in Swedish (e.g. "Bygg din meritportfölj med ..." or "Genomför lärlingstid / praktisera ...") detailing identical skills, systems, or hands-on projects they need to master next.
  3. step: 3 - A fully customized, action-oriented title in Swedish (e.g. "Sök lediga tjänster som ..." or "Gör praktik/LIA och säkra din fasta tjänst") explaining how to apply to the most relevant companies or regional authorities in Sweden, optimize CV/LinkedIn, and pass hiring interviews.
These steps must align with the Swedish vocational model. Each step object in the "roadmap" array MUST have the "step" field set to 1, 2, and 3 respectively.
- EDUCATION LOCATOR REQUIREMENT: Under the "roadmap" steps, specifically include real or highly realistic study paths based on the location. For each step, supply resources in "resources" with direct actual links where they can study this topic. Ensure they include national portals like Yrkeshögskolan (e.g. "https://www.yrkeshogskolan.se/hitta-utbildning/sok-utbildning/?q=<skill>") and/or local municipal Komvux (e.g. "https://vuxenutbildning.stockholm" for Stockholm, "https://goteborg.se/vuxenutbildningen" for Göteborg, or standard study paths on antagning.se). Make the links as specific and practical as possible for the target region.

Format the output strictly as JSON matching this detailed JSON structure:
{
  "matchPercentage": number,
  "overallRating": "Excellent" | "Good" | "Moderate" | "Low",
  "expectedSalary": {
    "entry": "string (e.g. 35 000 SEK/månad)",
    "mid": "string (e.g. 52 000 SEK/månad)",
    "senior": "string (e.g. 75 000 SEK/månad)",
    "currency": "string"
  },
  "missingSkills": [
    {
       "skill": "string",
       "importance": "High" | "Medium" | "Low",
       "estimatedTimeToLearn": "string",
       "category": "string"
    }
  ],
  "strengthSkills": ["string"],
  "probabilityOfHiring": number,
  "timeNeededToQualify": "string (e.g. 4-6 months)",
  "regionalDemand": {
    "level": "Very High" | "High" | "Steady" | "Declining",
    "growthRate": "string (e.g. +8% YoY)",
    "popularLocations": ["string"]
  },
  "swedishMarketComparison": {
    "demandIndex": number (between 1 and 10),
    "popularSwedishPlatforms": [
      { "name": "string (e.g. Arbetsförmedlingen Platsbanken)", "url": "string (valid URL representing search)", "count": number }
    ],
    "notes": "string"
  },
  "roadmap": [
    {
      "step": number,
      "title": "string",
      "description": "string",
      "duration": "string",
      "resources": [
        { "name": "string", "url": "string" }
      ]
    }
  ]
}`;

    let contentsParts: any[] = [];
    
    // Add CV file if present in payload
    if (fileData && fileData.base64 && fileData.mimeType) {
      contentsParts.push({
        inlineData: {
          mimeType: fileData.mimeType,
          data: fileData.base64
        }
      });
      // Contextual prompt element to describe CV document
      contentsParts.push({ text: `Here is the user's CV document representing their skills and experience. Plus optional extra text details: ${cvText || ""}` });
    } else {
      contentsParts.push({ text: `Here is the user's plain-text CV content:\n\n${cvText}` });
    }

    contentsParts.push({ text: prompt });

    // Request structural JSON directly
    const response = await generateContentWithFallback({
      contents: contentsParts,
      config: {
        responseMimeType: "application/json"
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("No response from career scoring model.");
    }

    const scoreData = cleanAndParseJSON(resultText, {});
    res.json(scoreData);
  } catch (err: any) {
    console.error("CV Score error:", err);
    res.status(500).json({ error: err.message || "Failing to evaluate CV profile." });
  }
});

// CV Professional Rewrite / Career Tailoring Endpoint
app.post("/api/rewrite-cv", async (req, res) => {
  try {
    const { profile, targetCareer } = req.body;
    
    if (!profile) {
      return res.status(400).json({ error: "No profile data provided for rewrite." });
    }
    if (!targetCareer) {
      return res.status(400).json({ error: "Target career must be specified." });
    }

    if (!apiKey) {
      return res.status(500).json({
         error: "GEMINI_API_KEY is missing. Configure it in settings."
      });
    }

    const prompt = `You are 'Lasse the Career Älg 🇸🇪', an elite Swedish CV writer and career transition coach. 
The user wants to transition or tailor their professional profile from their current career to target this new role: "${targetCareer}".

Evaluate their current profile, find transferable skills, and completely rewrite/tailor their CV to maximize their chances of being hired for the new targeted role on the Swedish market, while maintaining integrity (do not invent fake companies, but frame their responsibilities in terms of transferable skills, and update/suggest relevant skills tags).

Here is the user's current profile before adaptation:
- Full Name: \${profile.fullName || "User"}
- Current/Previous Target Role: \${profile.targetRole || "N/A"}
- Location: \${profile.targetLocation || "Stockholm, Sweden"}
- Email: \${profile.email || ""}
- Phone: \${profile.phone || ""}
- Languages: \${profile.languages || "Svenska, Engelska"}
- Skills Tags: \${Array.isArray(profile.skills) ? profile.skills.join(", ") : "None specified"}
- Education: \${profile.education || "None specified"}
- Certifications: \${profile.certifications || "None specified"}
- Experience Summary: \${profile.experience || "None specified"}
- Interests: \${profile.interests || "None specified"}
- CV Summary (Om mig/cvText): \${profile.cvText || "None specified"}

CRITICAL REGULATORY COMPLIANCE RULES:
1. All generated text values, description fields, experiences, interests, and profile summaries MUST be written fully, professionally, and naturally in Swedish.
2. DO NOT delete their past career chronology entirely. Instead, REFRAME and rewrite descriptions of their past jobs to emphasize transferable skills (e.g. communication, precision, project management, customer service, structured work, problem solving) that make them highly valuable in the target career of "${targetCareer}".
3. 'targetRole': Set this specifically to "${targetCareer}".
4. 'cvText': Rewrite as a highly compelling Swedish "Om mig & Profil" summary (2-3 sentences), framing how their combined background and new target focus make them an exceptional candidate.
5. 'skills': Refine their tag list to a maximum of 10-12 tags. Retain 4-5 of their relevant original skills, and add 5-6 core keywords critical for the targeted role of "${targetCareer}".
6. 'education' & 'certifications': Re-explain or append clear Swedish notes relevant to the educational/cert requirements of the new role (e.g. indicating complementary studies, licensing, or focused bootcamps).
7. 'interests': Re-word to highlight how their hobbies reflect skills (e.g. design interest for frontend, or teamwork/precision for other careers) linking to the targeted field.

Format the output strictly as JSON matching this structure:
{
  "fullName": "string",
  "targetRole": "string",
  "targetLocation": "string",
  "email": "string",
  "phone": "string",
  "languages": "string",
  "skills": ["string"],
  "education": "string",
  "certifications": "string",
  "experience": "string",
  "interests": "string",
  "cvText": "string"
}`;

    const response = await generateContentWithFallback({
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("No response from CV rewrite model.");
    }

    const rewrittenProfile = cleanAndParseJSON(resultText, profile);
    res.json(rewrittenProfile);
  } catch (err: any) {
    console.error("CV Rewrite error:", err);
    res.status(500).json({ error: err.message || "Failed to tailor CV with AI." });
  }
});

// Helper functions for offline or API key-less fail-safes
function estimateSwedenSalaryAndPrognosis(role: string, location: string) {
  const r = String(role || "Yrke").toLowerCase();
  const loc = String(location || "Sverige");
  let salaryMin = 32000;
  let salaryMax = 44000;
  let demandTrend = "stable";
  let demandScore = 65;
  let keyDrivers = ["Digitalisering", "Demografiska förändringar"];

  if (r.includes("utveckl") || r.includes("develop") || r.includes("it") || r.includes("mjukvaru") || r.includes("programmer")) {
    salaryMin = 42000;
    salaryMax = 65000;
    demandTrend = "highly-growing";
    demandScore = 92;
    keyDrivers = ["Ökad molnmigrering i Sverige", "Efterfrågan på robust IT-säkerhet", "Brist på seniora utvecklare"];
  } else if (r.includes("sjuksköt") || r.includes("nurse") || r.includes("vård")) {
    salaryMin = 36000;
    salaryMax = 48000;
    demandTrend = "highly-growing";
    demandScore = 95;
    keyDrivers = ["Åldrande befolkning i Sverige", "Stora pensionsavgångar inom regionerna", "Specialistkompetens högt eftertraktad"];
  } else if (r.includes("kock") || r.includes("chef") || r.includes("restaurang")) {
    salaryMin = 28000;
    salaryMax = 38000;
    demandTrend = "growing";
    demandScore = 78;
    keyDrivers = ["Ökad efterfrågan efter pandemirestriktioner", "Brist på utbildad köksperonal", "Växande fine-dining trend"];
  } else if (r.includes("elektriker") || r.includes("el")) {
    salaryMin = 34000;
    salaryMax = 46000;
    demandTrend = "growing";
    demandScore = 84;
    keyDrivers = ["Grön energiomställning och laddstolpar", "Stort behov inom nyproduktion", "Krav på auktoriserad behörighet"];
  } else if (r.includes("ekonom") || r.includes("pwc") || r.includes("revis")) {
    salaryMin = 33000;
    salaryMax = 52000;
    demandTrend = "stable";
    demandScore = 70;
    keyDrivers = ["Krav på hållbarhetsrapportering", "Ökad digitalisering i bokföring och revision", "Behov av strategisk rådgivning"];
  }

  const salaryAverage = Math.round((salaryMin + salaryMax) / 2);

  return {
    role: role || "Yrkesroll",
    description: `Marknaden för en ${role || "specialist"} i ${loc} präglas av goda möjligheter och stabila lönevillkor enligt fackliga riktlinjer.`,
    salaryMin,
    salaryMax,
    salaryAverage,
    currency: "SEK/månad",
    demandTrend,
    demandScore,
    forecastYears: [
      { year: 2026, score: demandScore },
      { year: 2027, score: Math.min(100, demandScore + 1) },
      { year: 2028, score: Math.min(100, demandScore + 2) },
      { year: 2029, score: Math.min(100, demandScore + 2) },
      { year: 2030, score: Math.min(100, demandScore + 3) }
    ],
    keyDrivers,
    recommendedSwedishLinks: [
      { platform: "Arbetsförmedlingen Yrkeskompassen", url: "https://arbetsformedlingen.se/planera-karriar/yrken-a-o", description: "Läs mer om framtidsutsikter och behörighetskrav." },
      { platform: "Unionen lönestatistik", url: "https://www.unionen.se/rad-och-stod/om-lon/marknadslon", description: "Jämför marknadslöner för olika yrken." }
    ]
  };
}

function getRecommendedJobsFallback(skills: string[], targetRole: string, location: string) {
  const skList = skills && skills.length > 0 ? skills : ["Problemlösning", "Svenska", "Datorvana"];
  const role = targetRole || "IT-Konsult / Mjukvaruarkitekt";
  const loc = location || "Stockholm";

  return [
    {
      id: "rec-local-1",
      title: role,
      company: "Atea Sverige",
      location: loc,
      salary: "46 000 - 58 000 SEK/månad",
      matchScore: 92,
      description: `Spännande roll för dig med erfarenhet inom fältet för ${role}. Vi söker en engagerad kollega som brinner för digital utveckling, problemlösning och samarbete.`,
      source: "LinkedIn Jobs",
      url: "https://se.linkedin.com/jobs",
      postedDate: "2 dagar sedan",
      skillsDemanded: skList.slice(0, 4)
    },
    {
      id: "rec-local-2",
      title: `Senior specialist: ${role}`,
      company: "Knowit",
      location: loc,
      salary: "50 000 - 64 000 SEK/månad",
      matchScore: 85,
      description: `Vill du arbeta med spännande uppdrag i framkant? Vi hjälper våra kunder att navigera i morgondagens utmaningar och söker dig som vill utvecklas tillsammans med oss.`,
      source: "Indeed Sweden",
      url: "https://se.indeed.com",
      postedDate: "4 dagar sedan",
      skillsDemanded: skList.length > 1 ? [skList[0], skList[1], "Målmedveten"] : ["Svenska", "Kommunikation"]
    },
    {
      id: "rec-local-3",
      title: `Junior ${role}`,
      company: "Academic Work",
      location: loc,
      salary: "34 000 - 42 000 SEK/månad",
      matchScore: 78,
      description: `För vår kunds räkning söker vi nu en hungrig junior talang. Detta är en fantastisk möjlighet att starta din karriär och matchas perfekt med dina kompetenser.`,
      source: "Arbetsförmedlingen",
      url: "https://arbetsformedlingen.se/platsbanken",
      postedDate: "Nyligen",
      skillsDemanded: skList.length > 0 ? [skList[skList.length - 1], "Samarbetsförmåga"] : ["Svenska", "Engelska"]
    }
  ];
}

// 3. Real-Time Market Outlook, Trends & Projections Endpoint
app.post("/api/market-outlook", async (req, res) => {
  try {
    const { role, location } = req.body;
    if (!role) {
      return res.status(400).json({ error: "Role param is required" });
    }

    if (!apiKey) {
      console.warn("GEMINI_API_KEY is not defined. Serving high-fidelity Sweden local market estimate.");
      const staticOutlook = estimateSwedenSalaryAndPrognosis(role, location);
      return res.json(staticOutlook);
    }

    const prompt = `Perform a comprehensive, real-world regional market prognosis and demand salary survey for the career: "${role}".
Target Region/Location: ${location || "Sweden/Stockholm/International"}

You must return a highly structured market prognosis details model in JSON adhering to this schema.
CRITICAL LANGUAGE RULE: All textual values, including "role", "description", items in "keyDrivers", and descriptions in "recommendedSwedishLinks" MUST be written fully and naturally in Swedish.

Schema:
{
  "role": "string",
  "description": "string",
  "salaryMin": number,
  "salaryMax": number,
  "salaryAverage": number,
  "currency": "string (e.g. SEK/månad)",
  "demandTrend": "highly-growing" | "growing" | "stable" | "decreasing",
  "demandScore": number, (1-100 index)
  "forecastYears": [
    { "year": 2026, "score": number },
    { "year": 2027, "score": number },
    { "year": 2028, "score": number },
    { "year": 2029, "score": number },
    { "year": 2030, "score": number }
  ],
  "keyDrivers": ["string"],
  "recommendedSwedishLinks": [
    { "platform": "string (e.g. Arbetsförmedlingen, LinkedIn, indeed SE, etc)", "url": "string", "description": "string" }
  ]
}

Ensure the ratings, drivers, and salaries fit actual industry estimations today in Sweden.`;

    const response = await generateContentWithFallback({
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const parsedData = cleanAndParseJSON(response.text || "{}", {});
    res.json(parsedData);
  } catch (err: any) {
    console.error("Market outlook calculation failed, fallback to local estimate:", err);
    try {
      const { role, location } = req.body;
      const staticOutlook = estimateSwedenSalaryAndPrognosis(role || "Yrke", location || "Sverige");
      res.json(staticOutlook);
    } catch (fallbackErr) {
      res.status(500).json({ error: "Failed to load market outlook." });
    }
  }
});

// 4. Multi-Source Job Matching Aggregator (Sweden & Global)
app.post("/api/recommend-jobs", async (req, res) => {
  try {
    const { skills, targetRole, location } = req.body;
    
    if (!targetRole && (!skills || skills.length === 0)) {
       return res.status(400).json({ error: "Skills or Target Role must be defined to find matches." });
    }

    if (!apiKey) {
      console.warn("GEMINI_API_KEY is not defined. Serving high-fidelity local matched positions.");
      const baseJobs = getRecommendedJobsFallback(skills, targetRole, location);
      return res.json(baseJobs);
    }

    const skillsPrompt = skills && skills.length > 0 ? `Target Candidate Skills: ${skills.join(", ")}` : "Skills extracted from general profile";

    const prompt = `You are a real-time job aggregator. Match modern jobs currently open or highly representative of immediate vacancies in:
Target Role: ${targetRole || "Any matching profile"}
Target Location: ${location || "Sweden/Stockholm"}
${skillsPrompt}

Generate a strictly structured list of 4-6 matching job listings that a user can immediately target or simulate search for.
CRITICAL LANGUAGE RULE: All textual values inside each job object (specifically "title", "description", etc.) MUST be written fully and naturally in Swedish.

Make them realistic, referencing valid Swedish search paths or standard careers on platforms like Arbetsförmedlingen, LinkedIn Jobs, Indeed Sweden, or Jobbsafari.
Each job match MUST contain:
- Title, Company, Location, Description, Match Score% (based on comparison), estimated salary, Skills Demanded, Source platform, and a realistic URL template linking (e.g., Arbetsförmedlingen search query or LinkedIn SE search query relevant to this specific role title).

Format response strictly as a JSON array of objects conforming to this:
[
  {
    "id": "string (unique code or index)",
    "title": "string (Swedish job title e.g. Frontend-utvecklare)",
    "company": "string",
    "location": "string",
    "salary": "string (standard Swedish salary e.g. 45 000 - 55 000 SEK/månad)",
    "matchScore": number (0 to 100 based on comparison to skills),
    "description": "string (details of job requirements written in Swedish)",
    "source": "Arbetsförmedlingen" | "LinkedIn Jobs" | "Indeed Sweden" | "Jobbsafari" | "General",
    "url": "string (valid URL path like https://arbetsformedlingen.se/platsbanken/annonser?... or LinkedIn, etc)",
    "postedDate": "string (e.g. 2 dagar sedan)",
    "skillsDemanded": ["string"]
  }
]`;

    const response = await generateContentWithFallback({
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const parsedJobs = cleanAndParseJSON(response.text || "[]", []);
    res.json(parsedJobs);
  } catch (err: any) {
    console.error("Recommend jobs error, fallback to local estimate:", err);
    try {
      const { skills, targetRole, location } = req.body;
      const baseJobs = getRecommendedJobsFallback(skills, targetRole, location);
      res.json(baseJobs);
    } catch (fallbackErr) {
      res.status(500).json({ error: "Failed to recommend matched roles." });
    }
  }
});

// 5. Real-Time Swedish Job Registry Search (Arbetsförmedlingen API)
app.post("/api/search-jobs", async (req, res) => {
  const { keyword, location, limit = 25 } = req.body;
  const cleanKeyword = keyword || "";
  const locFilter = location && location !== "All locations" ? location : "";
  const searchString = `${cleanKeyword} ${locFilter}`.trim();
  
  if (!searchString) {
    return res.json({ total: 0, jobs: [] });
  }

  try {
    // Arbetsförmedlingen JobSearch API Endpoint
    const apiUrl = `https://jobsearch.api.jobtechdev.se/search?q=${encodeURIComponent(searchString)}&limit=${limit}`;
    console.log(`Fetching Swedish Platsbanken live vacancies index: ${apiUrl}`);

    // Call external API with a strict 2-second timeout to prevent requests from hanging forever on sandboxed or firewalled runtimes
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const apiRes = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "User-Agent": "AIJobAdvisorSweden/1.0.0"
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!apiRes.ok) {
      throw new Error(`Arbetsförmedlingen API search response error: ${apiRes.status}`);
    }

    const data: any = await apiRes.json();
    const hits = data.hits || [];

    const mappedJobs = hits.map((hit: any) => {
      // Collect must have/nice to have skills
      const skills: string[] = [];
      if (hit.must_have?.skills && Array.isArray(hit.must_have.skills)) {
        hit.must_have.skills.forEach((s: any) => { if (s?.label && !skills.includes(s.label)) skills.push(s.label); });
      }
      if (hit.nice_to_have?.skills && Array.isArray(hit.nice_to_have.skills)) {
        hit.nice_to_have.skills.forEach((s: any) => { if (s?.label && !skills.includes(s.label)) skills.push(s.label); });
      }

      // Populate basic default if empty
      if (skills.length === 0) {
        const headlineLower = (hit.headline || "").toLowerCase();
        if (headlineLower.includes("utveckl") || headlineLower.includes("developer") || headlineLower.includes("it")) {
          skills.push("TypeScript", "React", "Node.js", "Git");
        } else if (headlineLower.includes("sjuksköt") || headlineLower.includes("nurse") || headlineLower.includes("vård")) {
          skills.push("Patient Care", "Healthcare", "Swedish Clinical");
        } else if (headlineLower.includes("lärare") || headlineLower.includes("pedagog")) {
          skills.push("Pedagogy", "Teaching", "Swedish");
        } else if (headlineLower.includes("ekonom") || headlineLower.includes("ekonomi")) {
          skills.push("Accounting", "Excel", "Financial Reporting");
        } else {
          skills.push("Swedish Language", "Professional Cooperation");
        }
      }

      // Standardize location string
      const muni = String(hit.workplace_address?.municipality || hit.workplace_address?.city || "Sverige").trim() || "Sverige";
      const formattedMuni = muni.charAt(0).toUpperCase() + muni.slice(1).toLowerCase();

      // Standardize salary details
      const rawSalary = String(hit.salary_description || hit.salary_type?.label || "Kollektivavtal enligt gällande avtal");
      
      return {
        id: hit.id ? String(hit.id) : String(Math.random()),
        title: hit.headline || "Tjänst (Swedish Vacancy)",
        company: hit.employer?.name || "Ref: Platsbanken AD",
        location: formattedMuni,
        salary: rawSalary.length > 50 ? rawSalary.slice(0, 48) + "..." : rawSalary,
        matchScore: 0, // Client side will update this in real-time matching
        description: hit.description?.text ? (hit.description.text.slice(0, 450) + "...") : "Se annonsens beskrivning hos Arbetsförmedlingen.",
        source: "Arbetsförmedlingen",
        url: hit.webpage_url || `https://arbetsformedlingen.se/platsbanken/annonser/${hit.id}`,
        postedDate: (() => {
          try {
            if (!hit.publication_date) return "Nyligen";
            const d = new Date(hit.publication_date);
            if (isNaN(d.getTime())) return "Nyligen";
            return d.toLocaleDateString("sv-SE");
          } catch {
            return "Nyligen";
          }
        })(),
        skillsDemanded: skills
      };
    });

    res.json({
      total: data.total?.value || mappedJobs.length,
      jobs: mappedJobs
    });

  } catch (err: any) {
    console.error("Swedish API fetch failure, operating with Gemini model pipeline:", err);
    
    // In case of internet drop/rate limit response, run Gemini dynamically to synthesize highly realistic Swedish job posts
    try {
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY not defined.");
      }

      const prompt = `Generate a realistic response of 4-6 real-world replica job positions listed in Swedish companies (like H&M, Spotify, IKEA, Volvo Car, SEB, Ericsson, Scania, Unionen) for search keyword "${cleanKeyword || "Software Specialist"}" and location "${locFilter || "Stockholm, Gothenburg"}".
      Format strictly as JSON conforming to this array format:
      [
        {
          "id": "plats-fallback-X",
          "title": "string (Swedish job title e.g. Fullstackutvecklare)",
          "company": "string (valid SW corporate name)",
          "location": "string (valid Swedish municipality)",
          "salary": "string (standard Swedish salary e.g. 45,000 - 55,000 SEK/month)",
          "matchScore": 75,
          "description": "string (descriptive summary detailing daily objectives)",
          "source": "Arbetsförmedlingen",
          "url": "https://arbetsformedlingen.se/platsbanken",
          "postedDate": "2026-06-12",
          "skillsDemanded": ["string"]
        }
      ]`;

      const response = await generateContentWithFallback({
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });

      const parsedReplica = cleanAndParseJSON(response.text || "[]", []);
      if (!Array.isArray(parsedReplica) || parsedReplica.length === 0) {
        throw new Error("Invalid array structure from Gemini response.");
      }

      res.json({
        total: parsedReplica.length,
        jobs: parsedReplica,
        isBackup: true
      });
    } catch (genErr) {
      console.warn("Gemini job generator or API fetch failed. Serving local high-quality Swedish backup registry.", genErr);
      
      const kw = cleanKeyword || "Utvecklare";
      const loc = locFilter || "Sverige";

      const staticBackup = [
        {
          id: "plats-local-1",
          title: `${kw} / Specialist`,
          company: "Spotify AB",
          location: loc || "Stockholm",
          salary: "48 000 - 62 000 SEK/månad",
          description: `Vi söker en driven lagspelare inom ${kw} som vill ansluta till vårt växande produktteam. Vi värdesätter initiativförmåga, teknisk nyfikenhet och ett öppet sinne.`,
          source: "Arbetsförmedlingen",
          url: "https://arbetsformedlingen.se/platsbanken",
          postedDate: "Nyligen",
          skillsDemanded: ["TypeScript", "React", "Node.js", "Git", "Svenska"]
        },
        {
          id: "plats-local-2",
          title: `Erfaren ${kw}`,
          company: "IKEA Digital",
          location: loc || "Älmhult",
          salary: "43 000 - 54 000 SEK/månad",
          description: `Vill du vara med och bygga framtidens digitala lösningar? Vi söker en ${kw} som vill utvecklas i en dynamisk och internationell miljö med kontor i Sverige.`,
          source: "Arbetsförmedlingen",
          url: "https://arbetsformedlingen.se/platsbanken",
          postedDate: "Nyligen",
          skillsDemanded: ["Agile/Scrum", "Problemlösning", "Svenska", "Engelska"]
        },
        {
          id: "plats-local-3",
          title: `Junior ${kw}`,
          company: "Volvo Group",
          location: loc || "Göteborg",
          salary: "35 000 - 44 000 SEK/månad",
          description: `Gör karriär hos ett av Sveriges mest ikoniska industribolag. Vi söker dig som har ett stort intresse för teknik och utveckling inom fältet för ${kw}.`,
          source: "Arbetsförmedlingen",
          url: "https://arbetsformedlingen.se/platsbanken",
          postedDate: "I förrgår",
          skillsDemanded: ["Svenska", "Teamwork", "Teknisk kompetens"]
        },
        {
          id: "plats-local-4",
          title: `${kw} (Kollektivavtal)`,
          company: "Bravida Sverige AB",
          location: loc || "Malmö",
          salary: "37 500 - 45 000 SEK/månad",
          description: `Bravida är Nordens ledande leverantör av tekniska helhetslösningar. Vi söker nu ytterligare medarbetare inom ${kw} till vår regionala enhet.`,
          source: "Arbetsförmedlingen",
          url: "https://arbetsformedlingen.se/platsbanken",
          postedDate: "Nyligen",
          skillsDemanded: ["Svenska", "Körkort B", "Samarbete"]
        },
        {
          id: "plats-local-5",
          title: `Konsult / Specialist inom ${kw}`,
          company: "PwC Sverige",
          location: loc || "Stockholm",
          salary: "46 000 - 58 000 SEK/månad",
          description: `Som konsult på PwC får du arbeta med spännande kunduppdrag och hjälpa Sveriges ledande bolag att navigera i digitala och operationella förändringar.`,
          source: "Arbetsförmedlingen",
          url: "https://arbetsformedlingen.se/platsbanken",
          postedDate: "3 dagar sedan",
          skillsDemanded: ["Analytisk förmåga", "Rådgivning", "Kundkontakt"]
        }
      ];

      res.json({
        total: staticBackup.length,
        jobs: staticBackup,
        isBackup: true
      });
    }
  }
});


// 6. Spelling Suggestion & Correction Helper Endpoint
app.post("/api/suggest-spelling", async (req, res) => {
  try {
    const { text, profileData, context = "search" } = req.body;

    if (!apiKey) {
      // Offline fallback: Return false/empty
      return res.json({ hasCorrections: false, suggestions: [] });
    }

    if (context === "search") {
      if (!text || !text.trim()) {
        return res.json({ hasCorrections: false, suggestions: [] });
      }

      const prompt = `Du är en expert på svensk stavning och grammatik för den svenska arbetsmarknaden. 
Analysera följande sökord eller fras för eventuella stavfel, felaktig stor/liten bokstav, eller förvirrande tryckfel ("typos").
Sökord/Fras: "${text}"

Bestäm om det finns några uppenbara stavfel eller tryckfel. Jämför mot giltiga svenska yrkesroller (t.ex. "utveklare" -> "utvecklare", "revisår" -> "revisor", "sjukskötursa" -> "sjuksköterska").
Om allt är helt rätt stavat, sätt "hasCorrections" till false.

SVARA ENDAST i JSON med följande struktur:
{
  "hasCorrections": boolean,
  "correctedText": "string (den fullständiga korrigerade frasen)",
  "suggestions": [
    { "original": "string", "correction": "string", "reason": "string (en kort förklaring på svenska)" }
  ]
}`;

      const response = await generateContentWithFallback({
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.1
        }
      });

      const parsed = cleanAndParseJSON(response.text || "{}", { hasCorrections: false, suggestions: [] });
      return res.json(parsed);
    } 

    if (context === "profile") {
      if (!profileData) {
        return res.json({ hasCorrections: false, suggestions: [] });
      }

      // Format fields for comparison
      const fieldsToCheck = {
        fullName: profileData.fullName || "",
        currentJob: profileData.currentJob || "",
        targetRole: profileData.targetRole || "",
        education: profileData.education || "",
        certifications: profileData.certifications || "",
        cvText: profileData.cvText || "",
        experience: profileData.experience || "",
        interests: profileData.interests || ""
      };

      const prompt = `Du är en expert på svenska CV-dokument och professionell stavning. 
Analysera följande fält från en profil/CV för att hitta uppenbara stavfel eller språkliga misstag på svenska.
Fält att kontrollera:
- Namn: "${fieldsToCheck.fullName}"
- Nuvarande yrke: "${fieldsToCheck.currentJob}"
- Yrkesmål: "${fieldsToCheck.targetRole}"
- Utbildning: "${fieldsToCheck.education}"
- Licenser/certifieringar: "${fieldsToCheck.certifications}"
- Kort sammanfattning (Om mig): "${fieldsToCheck.cvText}"
- Arbetslivserfarenhet: "${fieldsToCheck.experience}"
- Intressen: "${fieldsToCheck.interests}"

Identifiera fält med faktiska stavfel (ignorera fackuttryck på engelska, förkortningar som IT, SQL, AWS, eller legitima namn).
Om det finns stavfel, förslå det korrigerade ordet eller frasen.
Rätta bara om det är uppenbara stavfel - ändra inte stilen om stavningen är korrekt.

SVARA ENDAST i JSON med följande struktur:
{
  "hasCorrections": boolean,
  "suggestions": [
    {
      "field": "fullName" | "currentJob" | "targetRole" | "education" | "certifications" | "cvText" | "experience" | "interests",
      "original": "string (det felstavade ordet/frasen)",
      "correction": "string (det korrekta ordet/frasen)",
      "reason": "string (kort motivering på svenska)"
    }
  ]
}`;

      const response = await generateContentWithFallback({
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.1
        }
      });

      const parsed = cleanAndParseJSON(response.text || "{}", { hasCorrections: false, suggestions: [] });
      return res.json(parsed);
    }

    res.json({ hasCorrections: false, suggestions: [] });
  } catch (err) {
    console.error("Spelling correction endpoint error:", err);
    res.json({ hasCorrections: false, suggestions: [] });
  }
});


// 7. Dynamic AI Career Roadmap Guidance / Suggestions
app.post("/api/roadmap-guidance", async (req, res) => {
  try {
    const { roleName, profileData } = req.body;

    if (!roleName) {
      return res.status(400).json({ error: "roleName is required" });
    }

    if (!apiKey) {
      return res.json({
        educationRequired: "Yrkesutbildning eller relevant yrkeserfarenhet inom sektorn.",
        topSkillsNeeded: ["Branschspecifik kompetens", "Samarbete", "Svenska språket"],
        certificationsAndLicenses: ["B-Körkort (meriterande)"],
        adviserSpeech: `Hej! För att lyckas nå din dröm som ${roleName} behöver du en plan. Lägg till relevanta utbildningssteg och praktiska erfarenheter i din egen anpassade plan nedan!`
      });
    }

    const prompt = `Du är en svensk studiecoach och karriärrådgivare (Studie- och yrkesvägledare, SYV) vid namn Lasse (en klok och trevlig älg som älskar kaffe och skogen).
Analysera yrkesrollen: "${roleName}".

Ge konkreta rekommendationer på vad som krävs för att arbeta med detta yrke i Sverige samt ge en uppmuntrande kommentar.

Svara ENDAST med följande JSON-struktur (inga markdown-kodblock, bara rå JSON):
{
  "educationRequired": "string (Beskriv kortfattat vilka utbildningsvägar som finns i Sverige, t.ex. Komvux, Yrkeshögskola (YH), eller Högskola/Universitet)",
  "topSkillsNeeded": ["3-5 konkreta kompetenser eller teknologier som krävs, t.ex. React för programmerare, ritningsläsning för snickare, etc."],
  "certificationsAndLicenses": ["Konkreta licenser eller certifikat som behövs i Sverige, t.ex. Truckkort A+B, ID06, Elinstallatörsauktorisation, Legitimation, B-Körkort, etc. Lämna tom array om ingenting krävs."],
  "adviserSpeech": "string (Ett varmt, peppande budskap på svenska där du förklarar vad användaren bör fokusera på först och hur de kan bygga sin egen studie/resplan för att nå målet. Håll det kort under 400 tecken, avsluta med ett litet älg-emoticon 🌲🦌)"
}`;

    const response = await generateContentWithFallback({
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.3
      }
    });

    const parsed = cleanAndParseJSON(response.text || "{}", {
      educationRequired: "Yrkesutbildning eller relevant erfarenhet i Sverige.",
      topSkillsNeeded: ["Fackkompetens", "Praktisk övning"],
      certificationsAndLicenses: [],
      adviserSpeech: `Låt oss bygga en plan mot ${roleName}! Lägg till dina egna studiesteg nedan. 🌲🦌`
    });

    res.json(parsed);
  } catch (err) {
    console.error("Roadmap guidance endpoint error:", err);
    res.json({
      educationRequired: "Yrkesutbildning eller relevant erfarenhet i Sverige.",
      topSkillsNeeded: ["Fackkompetens", "Praktisk övning"],
      certificationsAndLicenses: [],
      adviserSpeech: "Jag kunde tyvärr inte hämta AI-rekommendationer för tillfället, men du kan fortfarande bygga din egen anpassade resplan nedan!"
    });
  }
});


// Serve static files / Vite middleware integration
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting development mode with Vite hot module proxy...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting production mode. Serving output static build files...");
    const publicPath = path.join(process.cwd(), 'public');
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(publicPath));
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AI Job Advisor and Career Compass Server started on port ${PORT}`);
  });
}

startServer();
