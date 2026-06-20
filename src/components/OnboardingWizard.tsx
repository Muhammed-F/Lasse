import React, { useState, useEffect } from "react";
import { 
  User, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle, 
  Sparkles, 
  Plus, 
  X, 
  Languages, 
  BookOpen, 
  Info,
  Laptop,
  Truck,
  Car
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SWEDEN_REGIONS, IN_DEMAND_JOBS } from "../data";

interface OnboardingWizardProps {
  initialEmail: string;
  initialName: string;
  onSave: (finalProfile: any) => void;
  onLogout: () => void;
}

export default function OnboardingWizard({ 
  initialEmail, 
  initialName, 
  onSave,
  onLogout 
}: OnboardingWizardProps) {
  const [step, setStep] = useState<number>(() => {
    try {
      const saved = localStorage.getItem("karriaralg_draft_step");
      return saved ? parseInt(saved, 10) : 1;
    } catch {
      return 1;
    }
  });
  const totalSteps = 5;

  // Form states
  const [fullName, setFullName] = useState<string>(() => {
    try {
      const saved = localStorage.getItem("karriaralg_draft_fullName");
      return saved || initialName || "";
    } catch {
      return initialName || "";
    }
  });
  const [targetRole, setTargetRole] = useState<string>(() => {
    try {
      const saved = localStorage.getItem("karriaralg_draft_targetRole");
      return saved || "";
    } catch {
      return "";
    }
  });
  const [targetLocation, setTargetLocation] = useState<string>(() => {
    try {
      const saved = localStorage.getItem("karriaralg_draft_targetLocation");
      return saved || "Stockholm";
    } catch {
      return "Stockholm";
    }
  });
  const [email] = useState(initialEmail || "");
  const [phone, setPhone] = useState<string>(() => {
    try {
      const saved = localStorage.getItem("karriaralg_draft_phone");
      return saved || "";
    } catch {
      return "";
    }
  });
  const [languages, setLanguages] = useState<string>(() => {
    try {
      const saved = localStorage.getItem("karriaralg_draft_languages");
      return saved || "Svenska (Modersmål), Engelska (Flytande)";
    } catch {
      return "Svenska (Modersmål), Engelska (Flytande)";
    }
  });
  const [skills, setSkills] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("karriaralg_draft_skills");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [newSkillInput, setNewSkillInput] = useState("");
  const [customLicenseInput, setCustomLicenseInput] = useState("");
  const [education, setEducation] = useState("");
  
  // Granular education fields for wizard stage 4
  const [eduLevel, setEduLevel] = useState<string>(() => {
    try {
      const saved = localStorage.getItem("karriaralg_draft_eduLevel");
      return saved || "Universitet";
    } catch {
      return "Universitet";
    }
  });
  const [eduSchool, setEduSchool] = useState<string>(() => {
    try {
      const saved = localStorage.getItem("karriaralg_draft_eduSchool");
      return saved || "";
    } catch {
      return "";
    }
  });
  const [eduYears, setEduYears] = useState<string>(() => {
    try {
      const saved = localStorage.getItem("karriaralg_draft_eduYears");
      return saved || "3";
    } catch {
      return "3";
    }
  });
  const [eduTitle, setEduTitle] = useState<string>(() => {
    try {
      const saved = localStorage.getItem("karriaralg_draft_eduTitle");
      return saved || "";
    } catch {
      return "";
    }
  });

  // Synchronize granular states to the consolidated education string
  useEffect(() => {
    const parts = [];
    if (eduLevel) parts.push(eduLevel);
    if (eduYears) {
      parts.push(`${eduYears} år`);
    }
    if (eduTitle) {
      parts.push(`inom ${eduTitle}`);
    }
    if (eduSchool) {
      parts.push(`vid ${eduSchool}`);
    }
    setEducation(parts.join(" "));
  }, [eduLevel, eduSchool, eduYears, eduTitle]);

  const [certifications, setCertifications] = useState<string>(() => {
    try {
      const saved = localStorage.getItem("karriaralg_draft_certifications");
      return saved || "";
    } catch {
      return "";
    }
  });
  const [driverLicenses, setDriverLicenses] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("karriaralg_draft_driverLicenses");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [experience, setExperience] = useState<string>(() => {
    try {
      const saved = localStorage.getItem("karriaralg_draft_experience");
      return saved || "";
    } catch {
      return "";
    }
  });
  const [interests, setInterests] = useState<string>(() => {
    try {
      const saved = localStorage.getItem("karriaralg_draft_interests");
      return saved || "";
    } catch {
      return "";
    }
  });
  const [cvText, setCvText] = useState<string>(() => {
    try {
      const saved = localStorage.getItem("karriaralg_draft_cvText");
      return saved || "";
    } catch {
      return "";
    }
  });

  // Automatically persist any changes to draft onboarding inputs
  useEffect(() => {
    try {
      localStorage.setItem("karriaralg_draft_step", step.toString());
      localStorage.setItem("karriaralg_draft_fullName", fullName);
      localStorage.setItem("karriaralg_draft_targetRole", targetRole);
      localStorage.setItem("karriaralg_draft_targetLocation", targetLocation);
      localStorage.setItem("karriaralg_draft_phone", phone);
      localStorage.setItem("karriaralg_draft_languages", languages);
      localStorage.setItem("karriaralg_draft_skills", JSON.stringify(skills));
      localStorage.setItem("karriaralg_draft_eduLevel", eduLevel);
      localStorage.setItem("karriaralg_draft_eduSchool", eduSchool);
      localStorage.setItem("karriaralg_draft_eduYears", eduYears);
      localStorage.setItem("karriaralg_draft_eduTitle", eduTitle);
      localStorage.setItem("karriaralg_draft_certifications", certifications);
      localStorage.setItem("karriaralg_draft_driverLicenses", JSON.stringify(driverLicenses));
      localStorage.setItem("karriaralg_draft_experience", experience);
      localStorage.setItem("karriaralg_draft_interests", interests);
      localStorage.setItem("karriaralg_draft_cvText", cvText);
    } catch (err) {
      console.error("Failed to persist draft progress to localStorage:", err);
    }
  }, [
    step, fullName, targetRole, targetLocation, phone, languages, skills,
    eduLevel, eduSchool, eduYears, eduTitle, certifications, driverLicenses, experience, interests, cvText
  ]);

  const suggestedSkillsMap: Record<string, string[]> = {
    "utvecklare": ["JavaScript", "TypeScript", "React", "Node.js", "Git", "SQL", "Tailwind CSS"],
    "sjuksköterska": ["Akutsjukvård", "Patientvård", "Svenska", "Hjärt-lungräddning", "Journalföring"],
    "kock": ["HACCP", "Kallskänk", "Menyplanering", "Livsmedelshygien", "Kostekonomi"],
    "elektriker": ["Elinstallation", "Ritningsläsning", "Auktorisation AL", "Felsökning", "Kabeldragning"],
    "ekonom": ["Bokföring", "Revision", "Excel", "Momsredovisning", "Årsredovisning", "Analys"]
  };

  const getSuggestedSkills = () => {
    const roleLower = targetRole.toLowerCase();
    for (const key in suggestedSkillsMap) {
      if (roleLower.includes(key)) {
        return suggestedSkillsMap[key];
      }
    }
    return ["Problemlösning", "Kommunikation", "Svenska", "Samarbete", "IT-vana"];
  };

  const handleAddSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills(prev => [...prev, trimmed]);
    }
    setNewSkillInput("");
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(prev => prev.filter(s => s !== skill));
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Synthesize default or refined cvText if empty
    let finalCv = cvText;
    if (!finalCv.trim()) {
      finalCv = `${fullName}. ${targetRole} verksam i ${targetLocation}. Kompetenser: ${skills.join(", ")}. Utbildning: ${education}. Erfarenhet: ${experience}.`;
    }

    const finalProfile = {
      fullName: fullName.trim() || "Användare",
      targetRole: targetRole.trim() || "Arbetssökande",
      targetLocation,
      email,
      phone: phone.trim(),
      languages: languages.trim(),
      skills: skills.length > 0 ? skills : ["Svenska", "Datorvana", "Problemlösning"],
      education: education.trim() || "Gymnasieutveckling / Relevant utbildning",
      certifications: certifications.trim(),
      driverLicenses,
      experience: experience.trim() || "Söker första utmaning eller nya möjligheter i Sverige",
      interests: interests.trim(),
      cvText: finalCv.trim(),
      hasSetupCompleted: true
    };

    // Purge draft keys from localStorage since setup is completed
    try {
      const keys = [
        "karriaralg_draft_step",
        "karriaralg_draft_fullName",
        "karriaralg_draft_targetRole",
        "karriaralg_draft_targetLocation",
        "karriaralg_draft_phone",
        "karriaralg_draft_languages",
        "karriaralg_draft_skills",
        "karriaralg_draft_eduLevel",
        "karriaralg_draft_eduSchool",
        "karriaralg_draft_eduYears",
        "karriaralg_draft_eduTitle",
        "karriaralg_draft_certifications",
        "karriaralg_draft_driverLicenses",
        "karriaralg_draft_experience",
        "karriaralg_draft_interests",
        "karriaralg_draft_cvText"
      ];
      keys.forEach(k => localStorage.removeItem(k));
    } catch (err) {
      console.warn("Failed to clear onboarding local draft:", err);
    }

    onSave(finalProfile);
  };

  // Stegindikator-komp
  const renderStepper = () => {
    return (
      <div className="flex items-center justify-between w-full max-w-lg mx-auto mb-2 relative px-4" id="onboarding-stepper">
        {/* Connection Bar */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2 z-0" />
        <div 
          className="absolute top-1/2 left-0 h-0.5 bg-indigo-600 -translate-y-1/2 z-0 transition-all duration-300" 
          style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
        />

        {Array.from({ length: totalSteps }).map((_, i) => {
          const stepNum = i + 1;
          const isActive = step === stepNum;
          const isCompleted = step > stepNum;
          
          return (
            <div key={stepNum} className="flex flex-col items-center z-10 relative">
              <div 
                className={`flex items-center justify-center h-8 w-8 rounded-full font-bold text-xs border-2 transition-all ${
                  isActive 
                    ? "bg-indigo-600 text-white border-indigo-600 ring-4 ring-indigo-100" 
                    : isCompleted 
                    ? "bg-emerald-500 text-white border-emerald-500" 
                    : "bg-white text-slate-400 border-slate-200"
                }`}
              >
                {isCompleted ? <CheckCircle className="h-4 w-4" /> : stepNum}
              </div>
              <span className={`text-[10px] font-extrabold uppercase mt-1.5 transition-all hidden sm:block ${
                isActive ? "text-indigo-600" : isCompleted ? "text-emerald-600" : "text-slate-400"
              }`}>
                {stepNum === 1 && "Personligt"}
                {stepNum === 2 && "Yrkesmål"}
                {stepNum === 3 && "Skills"}
                {stepNum === 4 && "Studier"}
                {stepNum === 5 && "Bakgrund"}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-2 sm:p-4 flex flex-col justify-center h-[calc(100vh-2rem)] md:h-[min(820px,calc(100vh-4rem))] min-h-0" id="onboarding-wizard-container">
      <div className="bg-white border border-slate-200 rounded-3xl shadow-xl flex flex-col overflow-hidden h-full min-h-0" id="wizard-form-box">
        {/* Banner header */}
        <div className="bg-slate-900 px-4 sm:px-6 py-4 sm:py-5 text-white relative shrink-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900 via-slate-900 to-slate-900 opacity-90" />
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
            <div>
              <span className="bg-indigo-500/25 border border-indigo-400/30 text-indigo-300 font-extrabold font-mono text-[9px] uppercase px-2 py-0.5 rounded-full tracking-wider">
                Steg-för-steg Onboarding
              </span>
              <h2 className="text-lg sm:text-xl font-black mt-1 tracking-tight">Skapa din anpassade karriärprofil</h2>
              <p className="text-slate-400 text-xs mt-0.5 max-w-lg hidden sm:block">
                Fyll i dina uppgifter så matchar vi dig automatiskt mot svenska kollektivavtalslöner och gällande yrkeskrav.
              </p>
              <div className="sm:hidden mt-1.5 bg-indigo-500/20 border border-indigo-500/30 text-indigo-200 text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-lg">
                Steg {step} av {totalSteps}: {step === 1 && "Personliga uppgifter"}
                {step === 2 && "Yrkesmål & Region"}
                {step === 3 && "Skills & Kompetenser"}
                {step === 4 && "Studier & Certifikat"}
                {step === 5 && "Bakgrund & Spara"}
              </div>
            </div>
            <button
              onClick={onLogout}
              type="button"
              className="text-xs text-slate-400 hover:text-white border border-slate-700 hover:border-slate-500 px-3 py-1.5 rounded-xl cursor-pointer transition-all self-end md:self-auto font-bold"
            >
              Logga ut
            </button>
          </div>
        </div>

        {/* Stepper Progression */}
        <div className="border-b border-slate-100 py-3 sm:py-4 bg-slate-50/50 shrink-0">
          {renderStepper()}
        </div>

        {/* Actual Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 sm:p-10 space-y-4 sm:space-y-6 min-h-0 scrollbar-thin">
            <AnimatePresence mode="wait">
            
            {/* STEP 1: Personal info */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
                id="onboard-step-1"
              >
                <div className="border-l-4 border-indigo-500 pl-3">
                  <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider">Möte & Kontaktuppgifter</h3>
                  <p className="text-slate-400 text-xs mt-1">Låt oss börja med ditt namn och kontaktuppgifter så att Lasse kan hälsa på dig rätt.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wide block">Ditt Fullständiga Namn</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <User className="h-4 w-4" />
                      </span>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="t.ex. Anna Andersson"
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 font-mono">
                    <label className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wide block">E-postadress (Låst till ditt konto)</label>
                    <input
                      type="text"
                      disabled
                      value={email}
                      className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 text-slate-500 rounded-xl text-xs select-none cursor-not-allowed font-medium"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wide block">Telefonnummer (Valfritt)</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="t.ex. +46 70 123 45 67"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all font-medium"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wide block">Språkkunskaper</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Languages className="h-4 w-4" />
                      </span>
                      <input
                        type="text"
                        value={languages}
                        onChange={(e) => setLanguages(e.target.value)}
                        placeholder="t.ex. Svenska (Modersmål), Engelska (Flytande)"
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all font-medium"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-150 flex gap-3 text-slate-500 text-xs">
                  <Info className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong>Lasses tips:</strong> I Sverige uppskattas det enormt om du behärskar grundläggande yrkessvenska, men många internationella bolag fungerar bra med enbart engelska. Specificera gärna din språknivå tydligt!
                  </p>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Job Target & Location */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
                id="onboard-step-2"
              >
                <div className="border-l-4 border-indigo-500 pl-3">
                  <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider">Målroll & Geografiskt område</h3>
                  <p className="text-slate-400 text-xs mt-1">Vilket yrke strävar du efter att jobba inom i Sverige, och på vilken plats?</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wide block">Önskad Yrkesroll / Karriärmål</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Briefcase className="h-4 w-4" />
                      </span>
                      <input
                        type="text"
                        required
                        value={targetRole}
                        onChange={(e) => setTargetRole(e.target.value)}
                        placeholder="t.ex. Mjukvaruutvecklare, Kock, Elektriker..."
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all font-medium"
                      />
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      <span className="text-[9px] text-slate-400 font-semibold self-center mr-1">Vanliga:*</span>
                      {["Software Developer", "Legitimerad Sjuksköterska", "Elektriker", "Kock", "Företagssäljare"].map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setTargetRole(r)}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-650 px-2 py-0.5 rounded-md text-[10px] transition-all font-medium cursor-pointer"
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wide block">Svensk Region / Ort</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <MapPin className="h-4 w-4" />
                      </span>
                      <select
                        value={targetLocation}
                        onChange={(e) => setTargetLocation(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-205 rounded-xl text-xs outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all font-semibold appearance-none cursor-pointer"
                      >
                        {SWEDEN_REGIONS.map((reg) => (
                          <option key={reg} value={reg}>
                            {reg}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-150 flex gap-3 text-slate-500 text-xs">
                  <Laptop className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong>Framtidsutsikt:</strong> Olika landsdelar i Sverige har skilda efterfråge-landskap. Till exempel växer industrisektorn starkt i Västerbotten och Norrbotten på grund av nyetableringar, medan IT och start-ups samlas i storstadsregionerna Stockholm och Göteborg.
                  </p>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Skills & Tag Selector */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
                id="onboard-step-3"
              >
                <div className="border-l-4 border-indigo-500 pl-3">
                  <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider">Kompetenser & Färdigheter (Skills)</h3>
                  <p className="text-slate-400 text-xs mt-1">Lägg till kompetenser så genererar Lasse en anpassad gapanalys direkt.</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wide block">Dina Nyckelkompetenser</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newSkillInput}
                        onChange={(e) => setNewSkillInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddSkill(newSkillInput);
                          }
                        }}
                        placeholder="Skriv en kompetens (t.ex. React, Excel, HLR) och tryck Enter"
                        className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-205 rounded-xl text-xs outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all font-medium"
                      />
                      <button
                        type="button"
                        onClick={() => handleAddSkill(newSkillInput)}
                        className="px-4 py-2.5 bg-indigo-600 font-bold hover:bg-indigo-700 text-white text-xs rounded-xl transition duration-150 cursor-pointer flex items-center justify-center gap-1 shrink-0"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Lägg till</span>
                      </button>
                    </div>
                  </div>

                  {skills.length > 0 ? (
                    <div className="bg-slate-50 border border-slate-150 p-4 rounded-2xl">
                      <label className="text-[9px] text-slate-400 font-black uppercase tracking-wider block mb-2">Sparade Kompetenser ({skills.length} st)</label>
                      <div className="flex flex-wrap gap-2">
                        {skills.map((s) => (
                          <span 
                            key={s} 
                            className="bg-indigo-55 border border-indigo-100 text-indigo-700 text-xs px-2.5 py-1 rounded-xl flex items-center gap-1.5 font-semibold"
                          >
                            <span>{s}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveSkill(s)}
                              className="text-indigo-400 hover:text-indigo-600 rounded-full cursor-pointer focus:outline-none"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-amber-50/60 border border-dashed border-amber-200 text-amber-800 text-xs p-4 rounded-2xl text-center">
                      Inga kompetenser tillagda än. Lasse rekommenderar att du lägger till minst 3 färdigheter!
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-400 font-extrabold uppercase block tracking-wider">Rekommenderade färdigheter för din profil:</label>
                    <div className="flex flex-wrap gap-1.5">
                      {getSuggestedSkills().map((suggested) => {
                        const isAdded = skills.includes(suggested);
                        return (
                          <button
                            key={suggested}
                            type="button"
                            disabled={isAdded}
                            onClick={() => handleAddSkill(suggested)}
                            className={`px-3 py-1 rounded-lg text-xs transition duration-150 cursor-pointer font-medium ${
                              isAdded 
                                ? "bg-slate-100 text-slate-400 border border-slate-200/50 cursor-not-allowed" 
                                : "bg-white hover:bg-indigo-50 text-indigo-600 border border-slate-200 hover:border-indigo-200"
                            }`}
                          >
                            + {suggested}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 4: Education & Certifications */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
                id="onboard-step-4"
              >
                <div className="border-l-4 border-indigo-500 pl-3">
                  <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider">Utbildning & Certifieringar</h3>
                  <p className="text-slate-400 text-xs mt-1">Berätta om din utbildningsbakgrund.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {/* UTBILDNINGSNIVÅ */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wide block">Utbildningsnivå</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <GraduationCap className="h-4 w-4" />
                      </span>
                      <select
                        value={eduLevel}
                        onChange={(e) => setEduLevel(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-205 rounded-xl text-xs outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all font-semibold appearance-none cursor-pointer"
                      >
                        <option value="Gymnasium">Gymnasium</option>
                        <option value="Högskola">Högskola</option>
                        <option value="Universitet">Universitet</option>
                        <option value="Komvux">Komvux</option>
                        <option value="Yrkeshögskola (YH)">Yrkeshögskola (YH)</option>
                        <option value="Annat">Annat</option>
                      </select>
                    </div>
                  </div>

                  {/* SKOLANS NAMN */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wide block">Skolans / Lärosätets Namn</label>
                    <input
                      type="text"
                      required
                      value={eduSchool}
                      onChange={(e) => setEduSchool(e.target.value)}
                      placeholder="t.ex. KTH, Nackademin, Polhemsgymnasiet..."
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all font-medium"
                    />
                  </div>

                  {/* ANTAL ÅR */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wide block">Antal studerade år</label>
                    <select
                      value={eduYears}
                      onChange={(e) => setEduYears(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-205 rounded-xl text-xs outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all font-semibold appearance-none cursor-pointer"
                    >
                      <option value="1">1 år</option>
                      <option value="2">2 år</option>
                      <option value="3">3 år</option>
                      <option value="4">4 år</option>
                      <option value="5">5 år</option>
                      <option value="Mindre än 1">Mindre än 1 år</option>
                      <option value="Mer än 5">Mer än 5 år</option>
                    </select>
                  </div>

                  {/* KURS / PROGRAM TITEL */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wide block">Kurs- eller Programtitel</label>
                    <input
                      type="text"
                      required
                      value={eduTitle}
                      onChange={(e) => setEduTitle(e.target.value)}
                      placeholder="t.ex. Systemutvecklare, Samhällsvetenskapliga..."
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all font-medium"
                    />
                  </div>

                  {/* CERTIFIERINGAR */}
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wide block">Certifieringar (Valfritt)</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <BookOpen className="h-4 w-4" />
                      </span>
                      <input
                        type="text"
                        value={certifications}
                        onChange={(e) => setCertifications(e.target.value)}
                        placeholder="t.ex. Scrum Master (PSM I), AWS Certified"
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all font-medium"
                      />
                    </div>
                  </div>

                  {/* KÖRKORT OCH FORDONSKORT (NEW) */}
                  <div className="space-y-3 md:col-span-2 border-t border-slate-100 pt-4" id="driver-licenses-wizard-section">
                    <div>
                      <label className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wide block">Körkort, Fordonskort & Maskinbevis</label>
                      <p className="text-slate-400 text-[11px] mt-0.5">Markera de körkorts- och fordonsbehörigheter du har för att synas bättre för svenska arbetsgivare.</p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2" id="licenses-badge-grid">
                      {[
                        { value: "B-Körkort (Personbil)", label: "🚗 B Personbil" },
                        { value: "BE (Bil + tungt släp)", label: "🚙 BE Tungt Släp" },
                        { value: "C-Körkort (Tung lastbil)", label: "Lorry C Lastbil" },
                        { value: "CE (Lastbil + tungt släp)", label: "🛞 CE Tung & Släp" },
                        { value: "D-Körkort (Buss)", label: "🚌 D Buss" },
                        { value: "Truckkort A", label: "🏗️ Truckkort A" },
                        { value: "Truckkort B", label: "🏭 Truckkort B" },
                        { value: "YKB (Yrkesförarkompetens)", label: "📜 YKB Yrkesbevis" },
                        { value: "Taxiförarlegitimation", label: "🚕 Taxileg" }
                      ].map((item) => {
                        const isSelected = driverLicenses.includes(item.value);
                        return (
                          <button
                            key={item.value}
                            type="button"
                            onClick={() => {
                              if (isSelected) {
                                setDriverLicenses(prev => prev.filter(x => x !== item.value));
                              } else {
                                setDriverLicenses(prev => [...prev, item.value]);
                              }
                            }}
                            className={`px-3 py-2 rounded-xl border text-[11px] font-semibold text-left transition-all relative flex items-center justify-between cursor-pointer group active:scale-97 ${
                              isSelected
                                ? "bg-indigo-600 border-indigo-600 text-white shadow-xs font-bold"
                                : "bg-slate-50 hover:bg-slate-100/80 border-slate-200 text-slate-700"
                            }`}
                          >
                            <span>{item.label}</span>
                            {isSelected ? (
                              <span className="h-4 w-4 rounded-full bg-white/20 text-white text-[9px] flex items-center justify-center font-black">✓</span>
                            ) : (
                              <span className="h-4 w-4 rounded-full border border-slate-300 text-slate-300 group-hover:border-slate-400 text-[9px] flex items-center justify-center font-black"></span>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* MANUELL KÖRKORTSTAGG (CUSTOM USER INPUT FOR EXOTIC DRIVER CARD TYPES) */}
                    <div className="space-y-1.5 bg-slate-50 border border-slate-200/60 p-3 rounded-xl" id="custom-license-block">
                      <label className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider block">Har du andra behörigheter? (T.ex. lastbilsmonterad kran, truck C, grävmaskin...)</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={customLicenseInput}
                          onChange={(e) => setCustomLicenseInput(e.target.value)}
                          placeholder="Skriv t.ex. Lastbilskran, Truck C, Hjullastare"
                          className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:border-indigo-500 font-medium"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              const val = customLicenseInput.trim();
                              if (val && !driverLicenses.includes(val)) {
                                setDriverLicenses(prev => [...prev, val]);
                                setCustomLicenseInput("");
                              }
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const val = customLicenseInput.trim();
                            if (val && !driverLicenses.includes(val)) {
                              setDriverLicenses(prev => [...prev, val]);
                              setCustomLicenseInput("");
                            }
                          }}
                          className="px-3 bg-indigo-600 text-white font-extrabold text-[10.5px] uppercase tracking-wider rounded-xl hover:bg-indigo-700 active:scale-95 transition-all cursor-pointer flex items-center gap-1 shrink-0"
                        >
                          <Plus className="h-3 w-3" />
                          <span>Lägg till</span>
                        </button>
                      </div>

                      {/* Display custom driver license badges as interactive deletable tags */}
                      {(() => {
                        const customLicenses = driverLicenses.filter(lic => ![
                          "B-Körkort (Personbil)",
                          "BE (Bil + tungt släp)",
                          "C-Körkort (Tung lastbil)",
                          "CE (Lastbil + tungt släp)",
                          "D-Körkort (Buss)",
                          "Truckkort A",
                          "Truckkort B",
                          "YKB (Yrkesförarkompetens)",
                          "Taxiförarlegitimation"
                        ].includes(lic));
                        if (customLicenses.length === 0) return null;
                        return (
                          <div className="flex flex-wrap gap-1.5 pt-1.5" id="custom-licenses-pills">
                            {customLicenses.map((lic) => (
                              <span key={lic} className="bg-white border border-indigo-200 text-indigo-900 px-2 py-0.5 rounded-lg text-[10px] font-bold flex items-center gap-1">
                                <span>{lic}</span>
                                <button
                                  type="button"
                                  onClick={() => setDriverLicenses(prev => prev.filter(x => x !== lic))}
                                  className="text-indigo-400 hover:text-indigo-700 font-extrabold cursor-pointer text-xs"
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-150 flex gap-3 text-slate-500 text-xs">
                  <Info className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong>Visste du?</strong> Tvååriga YH-utbildningar (Yrkeshögskola) är extremt respekterade i det svenska näringslivet. De fokuserar 100 % på yrkespraktik (LIA - Lärande i arbete) och speglar de lokala fackförbundens yrkeskrav.
                  </p>
                </div>
              </motion.div>
            )}

            {/* STEP 5: Experience & Interests & Save */}
            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
                id="onboard-step-5"
              >
                <div className="border-l-4 border-indigo-500 pl-3">
                  <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider">Erfarenhet & CV-skiss</h3>
                  <p className="text-slate-400 text-xs mt-1">Det sista steget! Lägg till en kort sammanfattning så sparar vi din profil säkert i molnet.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wide block">Arbetserfarenhet (Tidigare roller)</label>
                    <textarea
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      placeholder="Beskriv var och hur länge du arbetat tidigare..."
                      rows={3}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all font-medium font-sans resize-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wide block">Fritidsintressen (Valfritt)</label>
                    <textarea
                      value={interests}
                      onChange={(e) => setInterests(e.target.value)}
                      placeholder="t.ex. Vandring, öppen källkod, fika med nära och kära..."
                      rows={3}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all font-medium font-sans resize-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wide block">Färdig CV-text (För AI-tailoring)</label>
                    <span className="text-[9px] text-slate-400 font-medium">Lasse skapar denna åt dig baserat på dina svar om du lämnar den tom</span>
                  </div>
                  <textarea
                    value={cvText}
                    onChange={(e) => setCvText(e.target.value)}
                    placeholder="Mina samlade meriter..."
                    rows={3}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all font-medium font-mono resize-none"
                  />
                </div>

                <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-150 flex gap-3 text-emerald-800 text-xs">
                  <Sparkles className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5 animate-pulse" />
                  <p className="leading-relaxed">
                    <strong>Allt är klart!</strong> När du klickar på "Spara och Starta" nedan kommer dina uppgifter att fästas permanent på ditt autentiserade konto i Firestore. Du kan direkt börja chatta personligt med Lasse och spara matchade Platsbanken-tjänster!
                  </p>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
          </div>

          {/* Stepper Navigation Actions */}
          <div className="border-t border-slate-100 p-4 sm:px-10 py-4 bg-slate-50/90 flex justify-between items-center gap-4 shrink-0 mt-auto">
            <button
              type="button"
              disabled={step === 1}
              onClick={handlePrev}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold font-sans flex items-center justify-center gap-1.5 transition-all outline-none cursor-pointer select-none border border-slate-200 text-slate-700 hover:bg-slate-100 ${
                step === 1 ? "opacity-35 cursor-not-allowed hover:bg-transparent" : "opacity-100 active:scale-98"
              }`}
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Föregående</span>
            </button>

            {step < totalSteps ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-5 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center gap-1.5 transition duration-150 hover:shadow-indigo-600/10 shadow-lg active:scale-98 cursor-pointer select-none"
              >
                <span>Nästa steg</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-3 rounded-xl text-xs font-extrabold uppercase tracking-widest bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2 transition duration-150 shadow-lg shadow-emerald-600/20 active:scale-98 cursor-pointer select-none animate-pulse"
              >
                <CheckCircle className="h-4 w-4 animate-pulse" />
                <span>Spara &amp; Starta ✨</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
