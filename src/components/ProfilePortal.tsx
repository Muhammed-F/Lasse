import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Briefcase, 
  MapPin, 
  AlertCircle, 
  CheckCircle, 
  GraduationCap, 
  Clock, 
  Plus, 
  ArrowRight, 
  ExternalLink, 
  FileText, 
  Check, 
  Upload,
  Download,
  X,
  ChevronDown,
  CreditCard,
  ShieldAlert
} from "lucide-react";
import { jsPDF } from "jspdf";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  deleteUser 
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { IN_DEMAND_JOBS } from "../data";

// Sweden Constants matches App.tsx
const SWEDEN_REGIONS = [
  "Stockholms län", "Västra Götalands län", "Skåne län", "Uppsala län", 
  "Södermanlands län", "Östergötlands län", "Jönköpings län", "Kronobergs län", 
  "Kalmar län", "Gotlands län", "Blekinge län", "Hallands län", "Värmlands län", 
  "Örebro län", "Västmanlands län", "Dalarnas län", "Gävleborgs län", 
  "Västernorrlands län", "Jämtlands län", "Västerbottens län", "Norrbottens län"
];

const getResourceStylesAndIcon = (name: string, url: string) => {
  const lowerName = name.toLowerCase();
  const lowerUrl = url.toLowerCase();
  
  if (lowerName.includes("truck") || lowerName.includes("skjutstativ") || lowerName.includes("ledstaplare") || lowerName.includes("motvikt")) {
    return {
      icon: "🚜",
      bgClass: "bg-emerald-50/45 border-emerald-150 hover:bg-emerald-100/60 text-emerald-900",
      accentTextClass: "text-emerald-950 font-bold",
      subText: "Skaffa behörighet för truckkort",
      iconColor: "text-emerald-500"
    };
  }
  if (lowerName.includes("körkort") || lowerName.includes("korkort") || lowerName.includes("trafikverket") || lowerName.includes("bil") || lowerName.includes("transport")) {
    return {
      icon: "🚗",
      bgClass: "bg-teal-50/20 border-teal-150 hover:bg-teal-100/60 text-teal-900",
      accentTextClass: "text-teal-950 font-bold",
      subText: "Körkort och prov hos Trafikverket",
      iconColor: "text-teal-400"
    };
  }
  if (lowerName.includes("komvux")) {
    return {
      icon: "🏫",
      bgClass: "bg-slate-50 border-slate-205 hover:bg-slate-100/60 text-slate-700",
      accentTextClass: "text-slate-850 font-bold",
      subText: "Studievägar hos din kommun",
      iconColor: "text-slate-400"
    };
  }
  if (lowerName.includes("skolverket") || lowerName.includes("lärar")) {
    return {
      icon: "🎓",
      bgClass: "bg-indigo-50/20 border-indigo-150 hover:bg-indigo-100/60 text-indigo-900",
      accentTextClass: "text-indigo-950 font-extrabold",
      subText: "Sök lärarlegitimation hos Skolverket",
      iconColor: "text-indigo-400"
    };
  }
  if (lowerName.includes("socialstyrelsen") || lowerName.includes("legitimation")) {
    return {
      icon: "🏨",
      bgClass: "bg-emerald-50 border-emerald-150 hover:bg-emerald-100/60 text-emerald-850",
      accentTextClass: "text-emerald-900 font-bold",
      subText: "Svensk yrkeslegitimation",
      iconColor: "text-emerald-400"
    };
  }
  if (lowerName.includes("yrkeshögskola") || lowerName.includes("yh-program") || lowerName.includes("yh-kurs") || lowerName.includes("på yh") || lowerUrl.includes("yrkeshogskolan")) {
    return {
      icon: "⚡",
      bgClass: "bg-sky-50/20 border-sky-100 hover:bg-sky-50/50 text-sky-900",
      accentTextClass: "text-indigo-900 font-extrabold",
      subText: "Hitta YH-kurser i Sverige",
      iconColor: "text-sky-400"
    };
  }
  if (lowerName.includes("antagning") || lowerUrl.includes("antagning.se")) {
    return {
      icon: "🎓",
      bgClass: "bg-indigo-50/20 border-indigo-100 hover:bg-indigo-100/50 text-indigo-950",
      accentTextClass: "text-indigo-900 font-extrabold",
      subText: "Högre studier på Antagning.se",
      iconColor: "text-indigo-405"
    };
  }
  if (lowerName.includes("dokumentation") || lowerName.includes("guide") || lowerName.includes("läs mer") || lowerName.includes("manual") || lowerName.includes("handbook") || lowerName.includes("w3schools") || lowerName.includes("react") || lowerName.includes("node") || lowerName.includes("docker") || lowerName.includes("kubernetes") || lowerName.includes("tutorial")) {
    return {
      icon: "📚",
      bgClass: "bg-rose-50/30 border-rose-100 hover:bg-rose-50/60 text-rose-900",
      accentTextClass: "text-rose-955 font-bold",
      subText: "Referenslitteratur och studieguider",
      iconColor: "text-rose-455"
    };
  }
  if (lowerName.includes("jobb") || lowerName.includes("indeed") || lowerName.includes("platsbanken") || lowerName.includes("arbetsförmedlingen") || lowerName.includes("bemannings")) {
    return {
      icon: "💼",
      bgClass: "bg-indigo-50/20 border-indigo-100 hover:bg-indigo-50/50 text-indigo-950",
      accentTextClass: "text-indigo-900 font-extrabold",
      subText: "Hitta utlysta lediga tjänster",
      iconColor: "text-indigo-400"
    };
  }
  
  return {
    icon: "🔗",
    bgClass: "bg-slate-50 border-slate-150 hover:bg-slate-100/50 text-slate-800",
    accentTextClass: "text-slate-850 font-bold",
    subText: "Öppna extern länk för detta moment",
    iconColor: "text-slate-400"
  };
};

interface ProfilePortalProps {
  profile: any;
  setProfile: (p: any) => void;
  isEditingProfile: boolean;
  setIsEditingProfile: (b: boolean) => void;
  favoriteJobs: string[];
  setFavoriteJobs: React.Dispatch<React.SetStateAction<string[]>>;
  selectedFavoriteJob: string;
  setSelectedFavoriteJob: (s: string) => void;
  savedJobPosts: any[];
  setSavedJobPosts: React.Dispatch<React.SetStateAction<any[]>>;
  completedSteps: Record<string, boolean>;
  setCompletedSteps: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  careerScore: any;
  newSkill: string;
  setNewSkill: (s: string) => void;
  handleAddSkill: () => void;
  handleRemoveSkill: (s: string) => void;
  dragActive: boolean;
  handleDrag: (e: any) => void;
  handleDrop: (e: any) => void;
  uploadedDocs: any[];
  setUploadedDocs: React.Dispatch<React.SetStateAction<any[]>>;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleFileChange: (e: any) => void;
  setSelectedJob: (j: any) => void;
  setIsMobileJobDetailOpen?: (b: boolean) => void;
  setSearchKeyword: (s: string) => void;
  setJobsSubTab: (s: string) => void;
  setActiveTab: (s: string) => void;
  computeJobMatchingDetails: (j: any) => any;
  currentUser?: any;
  isAuthLoading?: boolean;
  onClearSession?: () => void;
  onStartChatWithLasse?: (text: string) => void;
  selectedCompareRoles: string[];
  setSelectedCompareRoles: React.Dispatch<React.SetStateAction<string[]>>;
  isCompareModalOpen: boolean;
  setIsCompareModalOpen: (b: boolean) => void;
  isPremium?: boolean;
  setIsPremium?: (b: boolean) => void;
  isPremiumCancelled?: boolean;
  setIsPremiumCancelled?: (b: boolean) => void;
}

// Helpers for checking educational and experience requirements
const requiresNoHigherEducation = (job: { educationRequired: string; role: string }) => {
  const edu = job.educationRequired.toLowerCase();
  const role = job.role.toLowerCase();
  
  // Explicitly identify roles that do NOT require higher or formal vocational degrees/licenses.
  // These are entry-level positions where someone can begin working immediately.
  const lowEducationAllowedKeywords = [
    "kundtjänst", "butikssäljare", "personlig assistent", "lagerarbetare", "säljare", 
    "industrimontör", "servitör", "servitris", "hotellreceptionist", "turistguide", 
    "administratör", "väktare", "skyddsvakt", "assembler", "customer service", 
    "store associate", "personal assistant", "warehouse", "sales representative", 
    "waiter", "waitress", "receptionist", "tour guide",
    "paketsorterare", "terminalarbetare", "lagerplockare", "inventerare", "flyttarbetare", 
    "godshanterare", "ramparbetare", "chaufförsmedhjälpare", "butiksmedarbetare", 
    "kassabiträde", "kundvärd", "demonstratör", "butikspåfyllare", "merchandiser", 
    "kassapersonal", "uthyrningsmedarbetare", "restaurangbiträde", "diskare", 
    "köksbiträde", "serveringspersonal", "städpersonal", "cafébiträde", "barista", 
    "snabbmatsmedarbetare", "matleveransbud", "matsalsvärd", "frukostvärd", "cykelbud", 
    "tidningsdistributör", "budbilsmedhjälpare", "lokalvårdare", "hemstädare", 
    "fönsterputsare", "fastighetsskötarassistent", "trappstädare", "saneringsmedhjälpare", 
    "fastighetsvärd", "montör", "produktionsmedarbetare", "fabriksarbetare", 
    "monteringsarbetare", "paketeringspersonal", "sorteringsarbetare", "återvinningsarbetare", 
    "operatörsassistent", "boendestödjare", "servicevärd", "bärplockare", 
    "skördearbetare", "växthusarbetare", "parkarbetare", "skogsplanterare", 
    "trädgårdsarbetare", "kyrkogårdsarbetare", "renhållningsarbetare", "telefonsäljare", 
    "mötesbokare", "eventsäljare", "eventpersonal", "garderobiär", "arenapersonal", 
    "publikvärd", "biljettkontrollant", "väktarelev", "parkeringsvakt", 
    "hemtjänstbiträde", "avlösare", "ledsagare",
    "förare", "chaufför", "budbil", "taxiförare", "bussförare", "tågvärd", 
    "spårvagnsförare", "tunnelbaneförare", "matros", "fiskematros", "kabinpersonal", 
    "flygvärdinna", "vårdbiträde", "städare", "renhållnings"
  ];

  if (lowEducationAllowedKeywords.some(kw => role.includes(kw))) {
    return true;
  }

  // Any role mentioning academic degrees, professional licenses, or vocational training lines
  const universityOrVocationalKeywords = [
    "kandidat", "bachelor", "master", "doktor", "ph.d", "examen (3", "examen (4", "examen (5", 
    "universitet", "högskola", "civilingenjör", "högskoleingenjör", "läkarprogrammet", 
    "lärare", "sjuksköterska", "sjuksköterske", "psykolog", "specialistläkare", "tandläkare", 
    "arkitekt", "ingenjör", "forskare", "professor", "lektor", "socionom", "advokat", 
    "åklagare", "domare", "psykoterapeut", "rektor", "biomedicinsk", "farmakologi",
    "apotekare", "pedagog", "vård- och omsorgsprogrammet", "programmet", "lärarutbildning", 
    "gymnasieskolans", "vvs-", "svetsare", "snickare", "träarbetare", "el- och energiprogrammet",
    "industriteknisk utbildning", "yh-utbildning", "yrkeshögskola", "yh-examen"
  ];

  if (universityOrVocationalKeywords.some(kw => edu.includes(kw) || role.includes(kw))) {
    return false;
  }

  const lowerEduPhrases = ["ingen formell", "inget formellt", "krävs ej", "ej krav", "behövs ej", "ingen formell eftergymnasial"];
  const isExplicitlyNoEdu = lowerEduPhrases.some(phrase => edu.includes(phrase));

  if (isExplicitlyNoEdu) {
    const strictExclusions = ["legitimation", "yrkeslegitimation", "programmet", "lärling", "examen"];
    if (strictExclusions.some(kw => edu.includes(kw))) {
      return false;
    }
    return true;
  }

  return false;
};

const requiresNoExperience = (job: { educationRequired: string; role: string }) => {
  const edu = job.educationRequired.toLowerCase();
  const role = job.role.toLowerCase();
  
  // Jobs that DO require apprentice years (lärling), vocational licensing, or leadership/senior statuses
  const expKeywords = [
    "erfarenhet", "erfaren", "yrkeserfarenhet", "lärling", "lärlingstid", "gesäll", "yrkesbevis",
    "mångårig", "många års", "lång erfarenhet", "5+ år", "3+ år", "7+ år", "ledande", 
    "specialist", "arkitekt", "chef", "senior", "doktorsexamen", "postdoktor", "revisorsinspektionen",
    "starkt meriterande med erfarenhet", "kräver erfarenhet", "tidigare erfarenhet"
  ];
  
  if (expKeywords.some(kw => edu.includes(kw) || role.includes(kw))) {
    if (edu.includes("ingen erfarenhet") || edu.includes("inget krav på erfarenhet") || edu.includes("erfarenhet är inget krav")) {
      return true;
    }
    return false;
  }
  
  const seniorTitles = ["ledande", "chef", "senior", "specialist", "revisor", "arkitekt", "manager", "planner", "ingenjör", "engineer"];
  if (seniorTitles.some(t => role.includes(t))) {
    return false;
  }
  
  return true;
};

export default function ProfilePortal({
  profile,
  setProfile,
  isEditingProfile,
  setIsEditingProfile,
  favoriteJobs,
  setFavoriteJobs,
  selectedFavoriteJob,
  setSelectedFavoriteJob,
  savedJobPosts,
  setSavedJobPosts,
  completedSteps,
  setCompletedSteps,
  careerScore,
  newSkill,
  setNewSkill,
  handleAddSkill,
  handleRemoveSkill,
  dragActive,
  handleDrag,
  handleDrop,
  uploadedDocs,
  setUploadedDocs,
  fileInputRef,
  handleFileChange,
  setSelectedJob,
  setIsMobileJobDetailOpen,
  setSearchKeyword,
  setJobsSubTab,
  setActiveTab,
  computeJobMatchingDetails,
  currentUser,
  isAuthLoading,
  onClearSession,
  onStartChatWithLasse,
  selectedCompareRoles,
  setSelectedCompareRoles,
  isCompareModalOpen,
  setIsCompareModalOpen,
  isPremium,
  setIsPremium,
  isPremiumCancelled,
  setIsPremiumCancelled
}: ProfilePortalProps) {
  
  // Sectioned layout tracker tab: 'saved-careers' | 'active-progression' | 'profile-details' | 'shortage-matching'
  const [profileSubTab, setProfileSubTab] = useState<'saved-careers' | 'active-progression' | 'profile-details' | 'shortage-matching'>('saved-careers');
  const [showBilling, setShowBilling] = useState<boolean>(false);
  const [cancelConfirm, setCancelConfirm] = useState<boolean>(false);
  const [billingSubmitting, setBillingSubmitting] = useState<boolean>(false);
  const [isMobileGapModalOpen, setIsMobileGapModalOpen] = useState(false);
  const [isMobileCareerListOpen, setIsMobileCareerListOpen] = useState(false);
  const [cvSectionTab, setCvSectionTab] = useState<'preview' | 'data'>('preview');
  const [cvTheme, setCvTheme] = useState<'navy' | 'slate' | 'forest' | 'burgundy'>('navy');
  const [avatarError, setAvatarError] = useState<string | null>(null);
  const [profileCustomLicenseInput, setProfileCustomLicenseInput] = useState("");
  const [selectedShortageIndustry, setSelectedShortageIndustry] = useState<string>("Alla");
  const [shortageProfileOnly, setShortageProfileOnly] = useState<boolean>(false);
  const [shortageNoEduRequired, setShortageNoEduRequired] = useState<boolean>(false);
  const [shortageNoExpRequired, setShortageNoExpRequired] = useState<boolean>(false);
  const [shortageMinSalary, setShortageMinSalary] = useState<number>(20000);
  const [shortageVisibleCount, setShortageVisibleCount] = useState<number>(10);

  // Reset pagination count when filters are modified
  useEffect(() => {
    setShortageVisibleCount(10);
  }, [selectedShortageIndustry, shortageProfileOnly, shortageNoEduRequired, shortageNoExpRequired, shortageMinSalary]);

  // States and hooks for Custom AI Career Roadmap builder
  const [guidanceLoading, setGuidanceLoading] = useState(false);
  const [guidanceData, setGuidanceData] = useState<{
    educationRequired: string;
    topSkillsNeeded: string[];
    certificationsAndLicenses: string[];
    adviserSpeech: string;
  } | null>(null);

  // Input states for adding a custom step
  const [newCustomStepTitle, setNewCustomStepTitle] = useState("");
  const [newCustomStepDesc, setNewCustomStepDesc] = useState("");
  const [newCustomStepDuration, setNewCustomStepDuration] = useState("1-2 veckor");

  const fetchGuidanceForJob = async (jobName: string) => {
    if (!jobName) return;
    setGuidanceLoading(true);
    try {
      const response = await fetch("/api/roadmap-guidance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roleName: jobName })
      });
      if (response.ok) {
        const data = await response.json();
        setGuidanceData(data);
      } else {
        console.error("Failed to load AI guidance status", response.status);
      }
    } catch (err) {
      console.error("Error loading roadmap AI guidance", err);
    } finally {
      setGuidanceLoading(false);
    }
  };

  const activeJobName = favoriteJobs.includes(selectedFavoriteJob) ? selectedFavoriteJob : (favoriteJobs[0] || "");
  const roadmapMode = profile.roadmapModes?.[activeJobName] || 'ai';

  useEffect(() => {
    if (activeJobName && profileSubTab === 'active-progression' && roadmapMode === 'custom') {
      fetchGuidanceForJob(activeJobName);
    }
  }, [activeJobName, profileSubTab, roadmapMode]);

  const setRoadmapMode = (mode: 'ai' | 'custom') => {
    setProfile((prev: any) => {
      const defaultModes = prev.roadmapModes || {};
      return {
        ...prev,
        roadmapModes: {
          ...defaultModes,
          [activeJobName]: mode
        }
      };
    });
  };

  const handleAddCustomStep = () => {
    if (!newCustomStepTitle.trim()) return;
    const newStep = {
      id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      title: newCustomStepTitle.trim(),
      description: newCustomStepDesc.trim(),
      duration: newCustomStepDuration || "Valfri tid",
      isDone: false
    };
    setProfile((prev: any) => {
      const list = prev.customRoadmaps?.[activeJobName] || [];
      return {
        ...prev,
        customRoadmaps: {
          ...(prev.customRoadmaps || {}),
          [activeJobName]: [...list, newStep]
        }
      };
    });
    setNewCustomStepTitle("");
    setNewCustomStepDesc("");
    setNewCustomStepDuration("1-2 veckor");
  };

  const handleDeleteCustomStep = (stepId: string) => {
    setProfile((prev: any) => {
      const list = prev.customRoadmaps?.[activeJobName] || [];
      const filtered = list.filter((s: any) => s.id !== stepId);
      return {
        ...prev,
        customRoadmaps: {
          ...(prev.customRoadmaps || {}),
          [activeJobName]: filtered
        }
      };
    });
  };

  const handleToggleCustomStepDone = (stepId: string) => {
    setProfile((prev: any) => {
      const list = prev.customRoadmaps?.[activeJobName] || [];
      const updated = list.map((s: any) => {
        if (s.id === stepId) {
          return { ...s, isDone: !s.isDone };
        }
        return s;
      });
      return {
        ...prev,
        customRoadmaps: {
          ...(prev.customRoadmaps || {}),
          [activeJobName]: updated
        }
      };
    });
  };

  // Spelling checker states
  const [isCheckingSpelling, setIsCheckingSpelling] = useState(false);
  const [spellingSuggestions, setSpellingSuggestions] = useState<{
    field: string;
    original: string;
    correction: string;
    reason: string;
  }[]>([]);
  const [spellingCheckedYet, setSpellingCheckedYet] = useState(false);
  const [spellingErrorMsg, setSpellingErrorMsg] = useState<string | null>(null);

  const handleCheckProfileSpelling = async () => {
    setIsCheckingSpelling(true);
    setSpellingErrorMsg(null);
    setSpellingSuggestions([]);
    setSpellingCheckedYet(true);

    try {
      const response = await fetch("/api/suggest-spelling", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profileData: profile,
          context: "profile"
        })
      });

      if (!response.ok) {
        throw new Error("Kunde inte hämta stavningsförslag.");
      }

      const resData = await response.json();
      if (resData && resData.suggestions) {
        setSpellingSuggestions(resData.suggestions);
      }
    } catch (err: any) {
      console.error(err);
      setSpellingErrorMsg("Ett fel uppstod vid stavningskontrollen.");
    } finally {
      setIsCheckingSpelling(false);
    }
  };

  const handleApplyCorrection = (field: string, original: string, correction: string) => {
    const currentValue = String(profile[field] || "");
    let newValue = currentValue;
    if (currentValue.includes(original)) {
      newValue = currentValue.replace(new RegExp(original, "g"), correction);
    } else {
      newValue = currentValue.replace(original, correction);
    }

    handleProfileLocalChange(field, newValue);

    // Remove suggestion from list
    setSpellingSuggestions(prev => prev.filter(s => !(s.field === field && s.original === original)));
  };

  const handleApplyAllCorrections = () => {
    spellingSuggestions.forEach(s => {
      const field = s.field;
      const currentValue = String(profile[field] || "");
      let newValue = currentValue;
      if (currentValue.includes(s.original)) {
        newValue = currentValue.replace(new RegExp(s.original, "g"), s.correction);
      } else {
        newValue = currentValue.replace(s.original, s.correction);
      }
      handleProfileLocalChange(field, newValue);
    });

    setSpellingSuggestions([]);
  };

  // AI CV Tailorer states
  const [isAdaptingCV, setIsAdaptingCV] = useState(false);
  const [targetCareerInput, setTargetCareerInput] = useState("");
  const [adaptError, setAdaptError] = useState<string | null>(null);
  const [adaptSuccess, setAdaptSuccess] = useState<string | null>(null);

  const handleAdaptCVWithAI = async (targetedCareerName: string) => {
    if (!targetedCareerName.trim()) {
      setAdaptError("Vänligen ange ett mål-yrke först.");
      return;
    }
    setIsAdaptingCV(true);
    setAdaptError(null);
    setAdaptSuccess(null);

    try {
      const response = await fetch("/api/rewrite-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profile: profile,
          targetCareer: targetedCareerName.trim()
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText || "Det gick inte att skräddarsy ditt CV.");
      }

      const updatedProfile = await response.json();
      setProfile({
        ...updatedProfile,
        hasSetupCompleted: true
      });
      setAdaptSuccess(`Ditt CV har nu skräddarsitts av Lasse för att matcha karriären "${targetedCareerName}"! 🇸🇪 Platsinformation och kompetenser har uppdaterats.`);
      setTargetCareerInput("");
    } catch (err: any) {
      console.error("AI CV adaptation failed:", err);
      setAdaptError(err.message || "Ett oväntat fel uppstod när Lasse skräddarsydde ditt CV.");
    } finally {
      setIsAdaptingCV(false);
    }
  };

  // Auth Form states
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [showAuthSuccess, setShowAuthSuccess] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleAuthAction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail.trim() || !authPassword.trim()) {
      setAuthError("Fyll i både e-post och lösenord.");
      return;
    }
    setAuthLoading(true);
    setAuthError(null);
    setShowAuthSuccess(null);
    try {
      if (authMode === 'login') {
        await signInWithEmailAndPassword(auth, authEmail.trim(), authPassword);
        setShowAuthSuccess("Inloggningen lyckades! Din profil och dina framsteg synkroniseras nu automatiskt. 🌲");
        setTimeout(() => setShowAuthSuccess(null), 5000);
      } else {
        await createUserWithEmailAndPassword(auth, authEmail.trim(), authPassword);
        setShowAuthSuccess("Konto skapat! Dina framsteg har sparats säkert i molnet. ⚡");
        setTimeout(() => setShowAuthSuccess(null), 5000);
      }
      setAuthEmail("");
      setAuthPassword("");
    } catch (err: any) {
      console.error("Auth helper error:", err);
      let msg = err.message || "Ett fel uppstod.";
      if (err.code === 'auth/wrong-password') msg = "Felaktigt lösenord. Försök igen.";
      if (err.code === 'auth/user-not-found') msg = "Det finns inget konto med denna e-post.";
      if (err.code === 'auth/email-already-in-use') msg = "Denna e-postadress används redan.";
      if (err.code === 'auth/weak-password') msg = "Lösenordet måste vara minst 6 tecken långt.";
      setAuthError(msg);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      if (onClearSession) onClearSession();
      setShowAuthSuccess("Du har loggat ut från tjänsten.");
      setTimeout(() => setShowAuthSuccess(null), 4000);
    } catch (err: any) {
      setAuthError("Det gick inte att logga ut.");
    }
  };

  const handleDeleteAccount = async () => {
    const user = auth.currentUser;
    if (!user) return;
    setAuthLoading(true);
    setAuthError(null);
    try {
      // 1. Delete user doc from Firestore
      const userDocRef = doc(db, "users", user.uid);
      await deleteDoc(userDocRef);
      // 2. Clear state
      if (onClearSession) onClearSession();
      // 3. Delete user account
      await deleteUser(user);
      setShowAuthSuccess("Ditt konto och alla dina sparade uppgifter har raderats permanent.");
      setTimeout(() => setShowAuthSuccess(null), 5000);
      setShowDeleteConfirm(false);
    } catch (err: any) {
      console.error("Failed to delete account:", err);
      if (err.code === 'auth/requires-recent-login') {
        setAuthError("Säkerhetsåtgärd: Du behöver logga ut och logga in igen nyligen för att kunna radera ditt konto.");
      } else {
        setAuthError(err.message || "Kunde inte radera kontot.");
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const handleProfileLocalChange = (key: string, value: any) => {
    setProfile((prev: any) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAvatarError(null);
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setAvatarError("Bilden är för stor! Max storlek är 2 MB.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          handleProfileLocalChange("avatar", event.target.result);
        }
      };
      reader.onerror = () => {
        setAvatarError("Det gick inte att läsa in bilden.");
      };
      reader.readAsDataURL(file);
    }
  };

  const generatePDF = () => {
    // PDF page size: 210mm x 297mm (Standard A4)
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });

    const themeColorsRGB = {
      navy: { primary: [30, 58, 138], accent: [29, 78, 216] }, // blue-900 / blue-700
      slate: { primary: [15, 23, 42], accent: [71, 85, 105] },  // slate-900 / slate-600
      forest: { primary: [6, 78, 59], accent: [5, 150, 105] },  // emerald-900 / emerald-600
      burgundy: { primary: [76, 5, 25], accent: [190, 18, 60] } // rose-950 / rose-700
    };

    const activeRGB = themeColorsRGB[cvTheme] || themeColorsRGB.navy;

    const fullName = profile.fullName || "Sven Johansson";
    const targetRole = profile.targetRole || "Software Developer";
    const currentJob = profile.currentJob || "Juniorutvecklare (Sökande)";
    const location = profile.targetLocation || "Stockholms län";
    const email = profile.email || "sven.johansson@example.se";
    const phone = profile.phone || "+46 70 123 45 67";
    const education = profile.education || "Högskoleexamen i Systemutveckling (2 år), Yrkeshögskola (YH) Göteborg";
    const certifications = profile.certifications || "Scrum Master (PSM I), AWS Cloud Practitioner (Pågående)";
    const experience = profile.experience || "Juniorutvecklare på TechHub Göteborg (2024-2026). Utvecklade dashboard-gränssnitt och integrerade webhooks.\nPraktikant på Retail SE (2023). Integrerade betalningsformulär.";
    const interests = profile.interests || "Modern frontend-tillståndshantering, server-side ramverk (Next.js/Express), molnautomatisering, grön teknik.";
    const languages = profile.languages || "Svenska (Modersmål), Engelska (Flytande)";
    const aboutMe = profile.cvText || "Sven Johansson. Erfaren frontend-utvecklare som söker en roll i Sverige.";

    // 1. Sidebar Background
    doc.setFillColor(activeRGB.primary[0], activeRGB.primary[1], activeRGB.primary[2]);
    doc.rect(0, 0, 70, 297, "F");

    // 2. Sidebar details
    doc.setTextColor(255, 255, 255);
    
    // Circle/Square Avatar
    if (profile.avatar) {
      try {
        // Draw avatar image with a nice white frame
        doc.setFillColor(255, 255, 255, 0.2);
        doc.rect(21.5, 11.5, 27, 27, "F");
        doc.addImage(profile.avatar, "JPEG", 22, 12, 26, 26);
      } catch (err) {
        // Fallback to text initials if image format has load issues
        doc.setFillColor(255, 255, 255, 0.15);
        doc.circle(35, 25, 12, "F");
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        const initials = fullName.split(' ').map((n: any) => n[0]).join('').toUpperCase().slice(0, 2);
        doc.text(initials, 35, 26, { align: "center" });
      }
    } else {
      doc.setFillColor(255, 255, 255, 0.15);
      doc.circle(35, 25, 12, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      const initials = fullName.split(' ').map((n: any) => n[0]).join('').toUpperCase().slice(0, 2);
      doc.text(initials, 35, 26, { align: "center" });
    }

    let sideY = 55;

    // Contact
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("KONTAKT", 10, sideY);
    doc.line(10, sideY + 2, 60, sideY + 2);
    sideY += 7;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    
    doc.text("E-post:", 10, sideY);
    sideY += 4;
    const splitEmail = doc.splitTextToSize(email, 50);
    doc.text(splitEmail, 10, sideY);
    sideY += (splitEmail.length * 3.5) + 1;

    doc.text("Telefon:", 10, sideY);
    sideY += 4;
    doc.text(phone, 10, sideY);
    sideY += 7;

    doc.text("Ort:", 10, sideY);
    sideY += 4;
    doc.text(location, 10, sideY);
    sideY += 10;

    // Languages
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("SPRÅK", 10, sideY);
    doc.line(10, sideY + 2, 60, sideY + 2);
    sideY += 7;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    const splitLanguages = doc.splitTextToSize(languages, 52);
    doc.text(splitLanguages, 10, sideY);
    sideY += (splitLanguages.length * 3.5) + 10;

    // Competencies
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("KOMPETENSER", 10, sideY);
    doc.line(10, sideY + 2, 60, sideY + 2);
    sideY += 7;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    const skillsList = profile.skills && profile.skills.length > 0 ? profile.skills : ["React", "TypeScript", "JavaScript", "SQL", "Git"];
    skillsList.forEach((skill: string) => {
      if (sideY < 285) {
        doc.setFillColor(255, 255, 255);
        doc.circle(12, sideY - 1, 0.75, "F");
        doc.text(skill, 15, sideY);
        sideY += 5;
      }
    });

    // 3. Right column details
    doc.setTextColor(30, 41, 59);
    let mainY = 22;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text(fullName, 78, mainY);
    mainY += 7.5;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(activeRGB.accent[0], activeRGB.accent[1], activeRGB.accent[2]);
    doc.text(targetRole.toUpperCase(), 78, mainY);
    mainY += 5;

    doc.setFont("helvetica", "italic");
    doc.setFontSize(8.5);
    doc.setTextColor(100, 116, 139);
    doc.text(`Nuvarande Sysselsättning: ${currentJob}`, 78, mainY);
    mainY += 10;

    // Profile summary
    doc.setTextColor(30, 41, 59);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11.5);
    doc.text("OM MIG & SAMMANFATTNING", 78, mainY);
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.4);
    doc.line(78, mainY + 2.5, 200, mainY + 2.5);
    mainY += 8;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    const splitAbout = doc.splitTextToSize(aboutMe, 122);
    doc.text(splitAbout, 78, mainY);
    mainY += (splitAbout.length * 4.5) + 8;

    // Work experience
    doc.setTextColor(30, 41, 59);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11.5);
    doc.text("ARBETSLIVSERFARENHET", 78, mainY);
    doc.line(78, mainY + 2.5, 200, mainY + 2.5);
    mainY += 8;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);

    const expLines = experience.split('\n');
    expLines.forEach((lineText: string) => {
      if (lineText.trim()) {
        const splitExp = doc.splitTextToSize(lineText, 122);
        const blockHeight = splitExp.length * 4.5;
        if (mainY + blockHeight > 285) {
          doc.addPage();
          mainY = 20;
        }

        doc.setDrawColor(activeRGB.accent[0], activeRGB.accent[1], activeRGB.accent[2]);
        doc.setLineWidth(0.8);
        doc.line(78, mainY - 1, 78, mainY + blockHeight - 2);

        const lower = lineText.toLowerCase();
        const hasHeader = lower.includes("utvecklare") || lower.includes("intern") || lower.includes("praktik") || lower.includes("säljare") || lower.includes("sjuksköterska") || lower.includes("kock") || lower.includes("at ") || lower.includes("på ") || lineText.includes("(");
        
        if (hasHeader) {
          doc.setFont("helvetica", "bold");
          doc.setTextColor(30, 41, 59);
        } else {
          doc.setFont("helvetica", "normal");
          doc.setTextColor(71, 85, 105);
        }

        splitExp.forEach((expL: string) => {
          if (mainY > 285) {
            doc.addPage();
            mainY = 20;
          }
          doc.text(expL, 81, mainY);
          mainY += 4.5;
        });

        doc.setFont("helvetica", "normal");
        doc.setTextColor(71, 85, 105);
        mainY += 2;
      }
    });

    mainY += 5;

    // Education
    const elLines = education.split('\n');
    const eduHeight = elLines.length * 5 + 15;
    if (mainY + eduHeight > 285) {
      doc.addPage();
      mainY = 20;
    }

    doc.setTextColor(30, 41, 59);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11.5);
    doc.text("UTBILDNING", 78, mainY);
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.4);
    doc.line(78, mainY + 2.5, 200, mainY + 2.5);
    mainY += 8;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);

    elLines.forEach((eduL_line: string) => {
      if (eduL_line.trim()) {
        const splitEdu = doc.splitTextToSize(eduL_line, 122);
        splitEdu.forEach((eduL: string) => {
          if (mainY > 285) {
            doc.addPage();
            mainY = 20;
          }
          doc.text(eduL, 78, mainY);
          mainY += 4.5;
        });
        mainY += 1.5;
      }
    });

    mainY += 5;

    // Certifications
    if (certifications && certifications.trim()) {
      const certLines = certifications.split('\n');
      const certHeight = certLines.length * 5 + 15;
      if (mainY + certHeight > 285) {
        doc.addPage();
        mainY = 20;
      }

      doc.setTextColor(30, 41, 59);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11.5);
      doc.text("CERTIFIERINGAR & MERITER", 78, mainY);
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.4);
      doc.line(78, mainY + 2.5, 200, mainY + 2.5);
      mainY += 8;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(71, 85, 105);

      certLines.forEach((cert_line: string) => {
        if (cert_line.trim()) {
          const splitCert = doc.splitTextToSize(cert_line, 122);
          splitCert.forEach((certL: string) => {
            if (mainY > 285) {
              doc.addPage();
              mainY = 20;
            }
            doc.text(certL, 78, mainY);
            mainY += 4.5;
          });
          mainY += 1.5;
        }
      });
    }

    // Interests
    if (interests && interests.trim()) {
      const intLines = interests.split('\n');
      const intHeight = intLines.length * 5 + 15;
      if (mainY + intHeight > 285) {
        doc.addPage();
        mainY = 20;
      }

      doc.setTextColor(30, 41, 59);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11.5);
      doc.text("SÄRSKILDA INTRESSEN", 78, mainY);
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.4);
      doc.line(78, mainY + 2.5, 200, mainY + 2.5);
      mainY += 8;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(71, 85, 105);

      intLines.forEach((int_line: string) => {
        if (int_line.trim()) {
          const splitInt = doc.splitTextToSize(int_line, 122);
          splitInt.forEach((intL: string) => {
            if (mainY > 285) {
              doc.addPage();
              mainY = 20;
            }
            doc.text(intL, 78, mainY);
            mainY += 4.5;
          });
          mainY += 1.5;
        }
      });
    }

    // Save with sanitized filename
    const filename = `${fullName.replace(/\s+/g, "_")}_CV.pdf`;
    doc.save(filename);
  };

  return (
    <div className="space-y-6 w-full max-w-7xl mx-auto" id="profile-portfolio-gateway">
      
      {/* 1. DASHBOARD HEADER */}
      <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-[0_4px_30px_rgba(15,23,42,0.015)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 select-none">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider font-mono">MIN INSTRUMENTPANEL & PROFIL</span>
          </div>
          <h2 className="text-lg font-black text-slate-800 tracking-tight font-display mt-0.5">
            Din personliga karriärs- och studieplan
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Hantera dina sparade yrken, din studieplan samt ditt optimerade CV på ett och samma ställe.
          </p>
        </div>
      </div>

      {/* Tab select buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full" id="profile-sub-navigation-menu">
        <button
          type="button"
          onClick={() => setProfileSubTab('saved-careers')}
          className={`flex items-center gap-2.5 p-3.5 rounded-2xl border text-xs font-bold transition-all duration-200 cursor-pointer shadow-xs ${
            profileSubTab === 'saved-careers'
              ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-600/10'
              : 'bg-white border-slate-250 text-slate-705 hover:bg-slate-50 hover:border-slate-350'
          }`}
          id="btn-subtab-saved-careers"
        >
          <span className="text-lg">🎯</span>
          <div className="text-left min-w-0 flex-1">
            <span className="block font-semibold truncate text-[11.5px] leading-tight">Karriärmål</span>
            <span className={`text-[10px] block font-light leading-none mt-0.5 ${profileSubTab === 'saved-careers' ? 'text-indigo-200' : 'text-slate-400'}`}>
              {favoriteJobs.length} sparade
            </span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setProfileSubTab('active-progression')}
          className={`flex items-center gap-2.5 p-3.5 rounded-2xl border text-xs font-bold transition-all duration-200 cursor-pointer shadow-xs ${
            profileSubTab === 'active-progression'
              ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-600/10'
              : 'bg-white border-slate-250 text-slate-705 hover:bg-slate-50 hover:border-slate-350'
          }`}
          id="btn-subtab-active-progression"
        >
          <span className="text-lg">🧭</span>
          <div className="text-left min-w-0 flex-1">
            <span className="block font-semibold truncate text-[11.5px] leading-tight">Min resaplan</span>
            <span className={`text-[10px] block font-light leading-none mt-0.5 ${profileSubTab === 'active-progression' ? 'text-indigo-200' : 'text-slate-400'}`}>
              Roadmap & steg
            </span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setProfileSubTab('shortage-matching')}
          className={`flex items-center gap-2.5 p-3.5 rounded-2xl border text-xs font-bold transition-all duration-200 cursor-pointer shadow-xs ${
            profileSubTab === 'shortage-matching'
              ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-600/10'
              : 'bg-white border-slate-250 text-slate-705 hover:bg-slate-50 hover:border-slate-350'
          }`}
          id="btn-subtab-shortage-matching"
        >
          <span className="text-lg">🔥</span>
          <div className="text-left min-w-0 flex-1">
            <span className="block font-semibold truncate text-[11.5px] leading-tight">Matcha bristyrken</span>
            <span className={`text-[10px] block font-light leading-none mt-0.5 ${profileSubTab === 'shortage-matching' ? 'text-indigo-200' : 'text-slate-400'}`}>
              Brist i Sverige
            </span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setProfileSubTab('profile-details')}
          className={`flex items-center gap-2.5 p-3.5 rounded-2xl border text-xs font-bold transition-all duration-200 cursor-pointer shadow-xs ${
            profileSubTab === 'profile-details'
              ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-600/10'
              : 'bg-white border-slate-250 text-slate-705 hover:bg-slate-50 hover:border-slate-350'
          }`}
          id="btn-subtab-profile-details"
        >
          <span className="text-lg">👤</span>
          <div className="text-left min-w-0 flex-1">
            <span className="block font-semibold truncate text-[11.5px] leading-tight">Mina uppgifter</span>
            <span className={`text-[10px] block font-light leading-none mt-0.5 ${profileSubTab === 'profile-details' ? 'text-indigo-200' : 'text-slate-400'}`}>
              Profil & CV
            </span>
          </div>
        </button>
      </div>

      {/* 2. MAIN BENTO-STYLE DASHBOARD GRID */}
      <div className="space-y-8 w-full" id="profile-unified-workspace">
        <AnimatePresence mode="wait">
          {profileSubTab === 'saved-careers' && (
            <motion.div
              key="saved-careers"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.18 }}
              className="w-full animate-fade-in"
            >
              {/* BLOCK 1: MINA KARRIÄRMÅL */}
              <div className="bg-slate-50/50 border border-slate-200 p-5 rounded-3xl space-y-5" id="profile-saved-careers-panel">
            <div className="flex items-center justify-between border-b border-slate-250 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">🎯</span>
                <h3 className="font-extrabold text-sm uppercase text-slate-800 tracking-wide font-mono">Mina Karriärmål</h3>
              </div>
              <span className="bg-white font-mono text-[9.5px] font-black text-indigo-700 border border-indigo-100 px-2 py-0.5 rounded-md">
                {favoriteJobs.length} yrken sparade
              </span>
            </div>

            {/* Mobile-only Trigger Card for Saved Careers */}
            <div 
              onClick={() => setIsMobileCareerListOpen(true)}
              className="block md:hidden bg-gradient-to-r from-indigo-50/50 to-slate-50 border border-indigo-250/70 p-4 rounded-2xl cursor-pointer active:scale-98 transition-all shadow-xs"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🎯</span>
                  <div>
                    <h4 className="font-extrabold text-[11px] uppercase text-indigo-950 font-display tracking-wider">Mina sparade yrken</h4>
                    <p className="text-slate-800 font-extrabold text-xs block mt-0.5">
                      {selectedFavoriteJob || (favoriteJobs[0] || "Ingen sparad karriär vald")}
                    </p>
                  </div>
                </div>
                <div className="bg-white px-2.5 py-1.5 rounded-xl border border-indigo-150 shadow-2xs flex items-center gap-1 shrink-0">
                  <span className="text-[10px] font-mono font-black text-indigo-750">
                    {favoriteJobs.length} st
                  </span>
                  <ChevronDown className="h-4 w-4 text-indigo-600 stroke-[2.5]" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-3 md:gap-6 items-start">
              {/* Left Box: Targets Checklist */}
              <div className="space-y-4 md:space-y-6 hidden md:block md:col-span-5">
              
              {/* Favorited Roles */}
              <div className="bg-white border border-slate-200 p-2.5 md:p-6 rounded-xl md:rounded-2xl shadow-[0_8px_30px_rgba(15,23,42,0.015)] space-y-3 md:space-y-5">
                <div className="border-b border-slate-100 pb-3 flex justify-between items-center gap-2">
                  <div>
                    <h4 className="font-extrabold text-[10px] md:text-xs uppercase text-slate-850 tracking-wide font-display">Mina sparade yrken</h4>
                    <p className="text-[9px] md:text-[10.5px] text-slate-400 mt-0.5 leading-snug">Välj ett yrke för omedelbar gapanalys & SCB-matchning</p>
                  </div>
                  <span className="bg-slate-100 text-slate-800 text-[8.5px] md:text-[10px] font-bold font-mono px-1.5 md:px-2 py-0.5 rounded-md shrink-0">
                    {favoriteJobs.length} st
                  </span>
                </div>

                <div className="space-y-1.5 md:space-y-2 max-h-[350px] overflow-y-auto pr-1">
                  {favoriteJobs.map((roleName) => {
                    const matchedJob = IN_DEMAND_JOBS.find(j => j.role === roleName);
                    const isSelected = selectedFavoriteJob === roleName;
                    return (
                      <div
                        key={roleName}
                        onClick={() => {
                          setSelectedFavoriteJob(roleName);
                        }}
                        className={`p-2 md:p-3.5 border rounded-lg md:rounded-xl transition-all cursor-pointer flex justify-between items-center gap-1.5 md:gap-3 ${
                          isSelected 
                            ? 'bg-indigo-50/40 border-indigo-300 shadow-xs relative' 
                            : 'bg-white border-slate-150 hover:bg-slate-50'
                        }`}
                      >
                        <div className="space-y-0.5 md:space-y-1 min-w-[0px] flex-1">
                          <strong className="text-slate-850 text-[10px] md:text-xs block font-sans truncate font-bold">{roleName}</strong>
                          <div className="flex flex-wrap items-center gap-1 text-[8px] md:text-[9.5px] font-mono leading-none">
                            <span className="text-slate-400 uppercase font-black truncate max-w-[50px] md:max-w-none">{matchedJob?.category || "Tjänst"}</span>
                            <span className="text-slate-300">•</span>
                            <span className="text-emerald-700 font-bold font-sans">{(matchedJob?.avgSalary || 42000).toLocaleString("sv-SE")} kr</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 md:gap-2 text-right shrink-0">
                          {isSelected && <span className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-indigo-500 animate-pulse shrink-0"></span>}
                          


                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setFavoriteJobs(prev => {
                                const filtered = prev.filter(r => r !== roleName);
                                if (selectedFavoriteJob === roleName && filtered.length > 0) {
                                  setSelectedFavoriteJob(filtered[0]);
                                }
                                return filtered;
                              });
                            }}
                            className="text-slate-400 hover:text-red-650 font-black cursor-pointer text-xs p-1 rounded-md hover:bg-slate-100 shrink-0"
                            title="Ta bort sparad"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    );
                  })}

                  {favoriteJobs.length === 0 && (
                    <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-xl space-y-2 text-slate-500 text-xs">
                      <AlertCircle className="w-5 h-5 mx-auto text-slate-350" />
                      <p className="font-semibold text-slate-705">Du har inga sparade yrken ännu.</p>
                      <p className="text-[10px] text-slate-400">Gå till fliken <strong>Yrkeskatalog</strong> för att utforska och spara yrken.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Platsbanken Real vacancies */}
              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-[0_8px_30px_rgba(15,23,42,0.015)] space-y-5">
                <div className="border-b border-slate-100 pb-3 flex justify-between items-center gap-3">
                  <div>
                    <h4 className="font-extrabold text-xs uppercase text-slate-800 tracking-wide flex items-center gap-1.5 font-display">
                      <Briefcase className="h-3.5 w-3.5 text-indigo-600 shrink-0" />
                      <span>Sparade jobb (Platsbanken)</span>
                    </h4>
                    <p className="text-[10.5px] text-slate-400 mt-0.5">Automatiskt sparade från realtidssökningar</p>
                  </div>
                  <span className="bg-slate-100 text-slate-800 text-[10px] font-bold font-mono px-2 py-0.5 rounded-md">
                    {savedJobPosts.length} st
                  </span>
                </div>

                <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
                  {savedJobPosts.map((job) => (
                    <div
                      key={job.id}
                      onClick={() => {
                        setSelectedJob(job);
                        setActiveTab('jobs');
                        if (setIsMobileJobDetailOpen) {
                          setIsMobileJobDetailOpen(true);
                        }
                      }}
                      className="p-3.5 bg-slate-50/60 hover:bg-slate-100/70 border border-slate-200 hover:border-indigo-200 rounded-xl transition-all flex justify-between items-start gap-3 cursor-pointer group"
                    >
                      <div className="space-y-1 min-w-[0px] flex-1">
                        <strong className="text-slate-800 text-xs block font-sans truncate font-bold group-hover:text-indigo-900 transition-colors">{job.title}</strong>
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-semibold font-sans">
                          <span>🏢 {job.company}</span>
                          <span className="text-slate-300">•</span>
                          <span>📍 {job.location}</span>
                        </div>
                        <div className="flex items-center gap-2 font-mono text-[9px] pt-1">
                          <span className="text-indigo-600 font-black">Match: {computeJobMatchingDetails(job).matchPercentage}%</span>
                          <span className="text-slate-300">•</span>
                          <span className="text-indigo-700 font-bold hover:underline cursor-pointer">
                            Visa Detaljer →
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSavedJobPosts(prev => prev.filter(p => p.id !== job.id));
                        }}
                        className="text-slate-400 hover:text-red-650 hover:bg-slate-100/80 rounded-md font-bold cursor-pointer text-xs p-1 relative z-10"
                        title="Ta bort sparad"
                      >
                        ×
                      </button>
                    </div>
                  ))}

                  {savedJobPosts.length === 0 && (
                    <div className="p-8 text-center border bg-slate-50/20 border-dashed border-slate-205 rounded-xl text-slate-500 text-[11px] space-y-1">
                      <Briefcase className="w-5 h-5 mx-auto text-slate-300" />
                      <p className="font-semibold text-slate-600">Du har inga sparade jobbannonser än.</p>
                      <p className="text-[10px] text-slate-400">Spara intressanta annonser direkt i sökfliken.</p>
                    </div>
                  )}
                </div>
              </div>

              </div> {/* Close Left Box column spacer */}

              {/* Right Box: Sweden Dynamic Gap Analyst with "Börja Progressera" button */}
              <div className="space-y-4 md:space-y-6 col-span-12 md:col-span-7">
              {(() => {
                const activeJobName = favoriteJobs.includes(selectedFavoriteJob) ? selectedFavoriteJob : (favoriteJobs[0] || "");
                if (!activeJobName) {
                  return (
                    <div className="bg-white border border-slate-200 p-12 rounded-2xl shadow-xs text-center space-y-3">
                      <Briefcase className="h-10 w-10 text-slate-300 mx-auto" />
                      <p className="text-slate-500 text-xs font-semibold">Ingen sparad karriär vald.</p>
                      <p className="text-[11px] text-slate-400 leading-relaxed max-w-xs mx-auto">Välj en roll till vänster för att ladda din personliga gapanalys.</p>
                    </div>
                  );
                }

                // Analyze gap
                const job = IN_DEMAND_JOBS.find(j => j.role === activeJobName) || IN_DEMAND_JOBS[0];
                const userSkillsNormalized = (profile.skills || []).map(s => s.toLowerCase().trim().replace(/[-\s]/g, ''));
                const jobSkills = job.requiredSkills || [];
                const hasSkills = jobSkills.filter(skill => {
                  const sNorm = skill.toLowerCase().trim().replace(/[-\s]/g, '');
                  return userSkillsNormalized.some(us => us.includes(sNorm) || sNorm.includes(us));
                });
                const missingSkills = jobSkills.filter(skill => !hasSkills.includes(skill));
                
                const userEduLower = (profile.education || "").toLowerCase();
                const jobEduLower = (job.educationRequired || "").toLowerCase();
                let educationMatches = false;

                if (userEduLower.trim().length > 5) {
                  const eduKeywords = ["kandidat", "bachelor", "master", "magister", "yh", "yrkeshögskola", "universitet", "högskola", "examen", "ingenjör", "legitimerad", "legitimation", "vård- och omsorg", "gymnasie", "komvux"];
                  const matchedKeywords = eduKeywords.filter(kw => jobEduLower.includes(kw) && userEduLower.includes(kw));
                  
                  const roleWords = ["sjuksköterska", "sjuksköterske", "läkare", "psykolog", "lärare", "elektriker", "kock", "utvecklare", "ingenjör", "ekonom", "jurist", "personal", "fysioterapeut", "apotekare"];
                  const matchedRoleWords = roleWords.filter(rw => job.role.toLowerCase().includes(rw) && userEduLower.includes(rw));

                  if (matchedKeywords.length > 0 || matchedRoleWords.length > 0) {
                    educationMatches = true;
                  } else if (userEduLower.includes("examen") || userEduLower.includes("degree") || userEduLower.includes("utbildning")) {
                    educationMatches = true;
                  }
                }

                let missingAcademia = job.educationRequired || "Relevant utbildning saknas";
                let academiaAdvice = "";
                let academiaPlatform = "Studera.nu (Utbildningsregister)";
                let academiaUrl = "https://www.studera.nu/";

                if (job.category.toLowerCase().includes("hälsa") || job.category.toLowerCase().includes("vård")) {
                  academiaAdvice = "Svensk hälso- och sjukvård ställer strikta formella krav på yrkeslegitimation från Socialstyrelsen eller genomgånget vårdprogram. Detta säkerställer hög patientsäkerhet.";
                  academiaPlatform = "Socialstyrelsen Legitimation";
                  academiaUrl = "https://legitimation.socialstyrelsen.se/";
                } else if (job.category.toLowerCase().includes("utbildning") || job.category.toLowerCase().includes("skola")) {
                  academiaAdvice = "Läraryrken i Sverige regleras av Skolverket och kräver vanligtvis en formell lärarlegitimation för fast anställning och betygsättning.";
                  academiaPlatform = "Skolverket Legitimation";
                  academiaUrl = "https://www.skolverket.se/";
                } else if (job.category.toLowerCase().includes("teknik") || job.role.toLowerCase().includes("it") || job.role.toLowerCase().includes("utvecklare")) {
                  academiaAdvice = "Inom tekniksektorn värdesätts praktisk kompetens (portfölj/LIA) högt, men för ingenjörsroller är en akademisk examen eller relevant YH-utbildning en stark bas.";
                  academiaPlatform = "Yrkeshögskolan programutbud";
                  academiaUrl = "https://www.yrkeshogskolan.se/hitta-utbildning?q=" + encodeURIComponent(job.role.split('(')[0].trim());
                } else {
                  academiaAdvice = "Satsa på en målinriktad utbildning (Komvux, YH eller högskola) för att tillgodose branschens krav och öka din anställbarhet.";
                  academiaPlatform = "Antagning.se (Akademiskt register)";
                  academiaUrl = "https://www.antagning.se/se/search?freeText=" + encodeURIComponent(job.role.split('(')[0].trim());
                }

                const userCertLower = (profile.certifications || "").toLowerCase();
                const checklist: { item: string, status: 'have' | 'missing', advice: string, platform: string, url: string }[] = [];

                // Driver license check based on role/category
                const needsDriverLicense = ["hantverk", "bygg", "transport", "omsorg", "hemtjänst", "installation", "lastbil", "fastighet"].some(term => 
                  job.role.toLowerCase().includes(term) || job.category.toLowerCase().includes(term)
                );

                const hasDriverLicense = userCertLower.includes("körkort") || userCertLower.includes("korkort");
                checklist.push({
                  item: needsDriverLicense ? "Svenskt B-Körkort (Personbil) - Krav" : "Svenskt B-Körkort",
                  status: hasDriverLicense ? "have" : "missing",
                  advice: needsDriverLicense 
                    ? "Många uppdrag och regionala tjänster inom denna sektor kräver servicebil eller hembesök."
                    : "Ett B-körkort är starkt meriterande och ökar din anställbarhet avsevärt för resor utanför storstadsområden.",
                  platform: "Trafikverket",
                  url: "https://www.trafikverket.se/korkort"
                });

                // Section specialized licenses
                if (job.role.toLowerCase().includes("sjuksköterska") || job.role.toLowerCase().includes("läkare") || job.role.toLowerCase().includes("tandläkare") || job.role.toLowerCase().includes("psykolog") || job.role.toLowerCase().includes("lärare")) {
                  const hasLicense = userCertLower.includes("legitimation") || userCertLower.includes("legitimerad") || userCertLower.includes("licens");
                  const title = job.role.toLowerCase().includes("lärare") ? "Svensk Lärarlegitimation (Skolverket)" : "Svensk Yrkeslegitimation (Socialstyrelsen)";
                  checklist.push({
                    item: title,
                    status: hasLicense ? "have" : "missing",
                    advice: "Formellt krav för att utöva yrket självständigt i Sverige samt erhålla fast anställning.",
                    platform: job.role.toLowerCase().includes("lärare") ? "Skolverket" : "Socialstyrelsen",
                    url: job.role.toLowerCase().includes("lärare") ? "https://www.skolverket.se" : "https://legitimation.socialstyrelsen.se"
                  });
                } else if (job.role.toLowerCase().includes("elektriker")) {
                  const hasECY = userCertLower.includes("ecy") || userCertLower.includes("auktorisation");
                  checklist.push({
                    item: "ECY-certifikat (Elinstallationsauktorisation)",
                    status: hasECY ? "have" : "missing",
                    advice: "Grundkrav för att arbeta självständigt som auktoriserad elektriker i fält under Elsäkerhetsverkets regler.",
                    platform: "Elinstallationsbranschens certifieringsnämnd",
                    url: "https://www.ecy.com"
                  });
                } else if (job.role.toLowerCase().includes("lastbil") || job.role.toLowerCase().includes("truck driver") || job.role.toLowerCase().includes("buss")) {
                  const hasYKB = userCertLower.includes("ykb") || userCertLower.includes("yrkeskompetensbevis");
                  checklist.push({
                    item: "C/CE-Körkort & YKB (Yrkeskompetensbevis)",
                    status: hasYKB ? "have" : "missing",
                    advice: "Krävs enligt lag för att köra tunga fordon yrkesmässigt inom EU/EES.",
                    platform: "Transportstyrelsen",
                    url: "https://www.transportstyrelsen.se"
                  });
                }

                const matchPct = Math.min(100, Math.round(
                  35 + 
                  (hasSkills.length / Math.max(1, jobSkills.length)) * 40 + 
                  (educationMatches ? 15 : 0) + 
                  (checklist.every(c => c.status === "have") ? 10 : 0)
                ));

                return (
                  <div className="bg-white border border-slate-200 p-2.5 md:p-8 rounded-xl md:rounded-2xl shadow-xs space-y-4 md:space-y-6 animate-fade-in">
                    
                    {/* Header */}
                    <div className="border-b border-slate-100 pb-3 md:pb-4 flex flex-wrap justify-between items-start gap-2.5 md:gap-4">
                      <div className="space-y-1">
                        <span className="text-[8px] md:text-[9px] bg-indigo-50 text-indigo-800 border border-indigo-200/50 px-2 py-0.5 rounded-md font-mono font-black uppercase">
                          KOMPETENS- & GAPDIAGNOS
                        </span>
                        <h2 className="text-xs md:text-base font-extrabold text-slate-900 tracking-tight leading-snug font-display">
                          {activeJobName}
                        </h2>
                      </div>
                      
                      <div className="text-right shrink-0">
                        <span className="bg-indigo-600 text-white px-2 py-0.5 md:px-3 md:py-1 text-[10px] md:text-xs font-black rounded-md md:rounded-lg font-mono inline-block shadow-2xs">
                          {matchPct}% Match
                        </span>
                      </div>
                    </div>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 md:gap-4">
                      <div className="bg-slate-50 p-2.5 md:p-4 rounded-lg md:rounded-xl border border-slate-100 font-mono text-[9px] md:text-[11px]">
                        <span className="text-[8px] md:text-[9px] text-slate-400 uppercase font-black block">MEDELLÖN ENLIGT SCB</span>
                        <strong className="text-xs md:text-sm text-slate-900 block mt-0.5 font-sans font-black">
                          {job.avgSalary.toLocaleString("sv-SE")} SEK/mån
                        </strong>
                        <span className="text-[8.5px] md:text-[9.5px] text-slate-400 block mt-0.5 italic">{job.salaryRange}</span>
                      </div>

                      <div className="bg-slate-50 p-2.5 md:p-4 rounded-lg md:rounded-xl border border-slate-100 font-mono text-[9px] md:text-[11px]">
                        <span className="text-[8px] md:text-[9px] text-slate-400 uppercase font-black block">EFTERFRÅGAN (SVERIGE)</span>
                        <strong className="text-xs md:text-sm text-indigo-750 block mt-0.5 font-sans font-black flex items-center gap-1">
                          {job.demandLevel === "High" ? "⚡ Mycket hög" : "Stabil/God"}
                        </strong>
                        <span className="text-[8.5px] md:text-[9.5px] text-slate-400 block mt-0.5 italic">{job.activeAds.toLocaleString()} aktiva platsannonser</span>
                      </div>
                    </div>

                    {/* What you already have */}
                    <div className="space-y-3">
                      <h4 className="text-[11.5px] font-mono font-black uppercase text-slate-900 flex items-center gap-1.5">
                        <CheckCircle className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
                        <span>Dina styrkor för rollen:</span>
                      </h4>
                      <div className="p-4 bg-emerald-50/10 border border-emerald-100 rounded-xl space-y-3 text-[11.5px]">
                        <div>
                          <strong className="text-emerald-950 font-sans block mb-1 text-xs font-bold">Matchande kompetenser:</strong>
                          {hasSkills.length > 0 ? (
                            <div className="flex flex-wrap gap-1.5">
                              {hasSkills.map((sk, idx) => (
                                <span key={idx} className="bg-emerald-50 border border-emerald-250 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-mono font-bold">
                                  ✓ {sk}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <p className="italic text-slate-400 text-[10px]">Inga direkta nyckelordsmatchningar i din nuvarande profil ännu.</p>
                          )}
                        </div>

                        <div className="pt-2 border-t border-emerald-100 text-[11px] font-mono">
                          <strong className="text-emerald-950 font-sans block mb-0.5 text-xs font-bold">Utbildningsnivå:</strong>
                          {educationMatches ? (
                            <p className="text-emerald-850 font-sans font-medium">
                              ✓ Din akademiska nivå <strong className="font-mono">({profile.education || "Saknas"})</strong> mäter upp väl mot yrkeskrav!
                            </p>
                          ) : (
                            <p className="text-slate-500 italic font-sans">Din nuvarande utbildningsprofil mäter inte upp helt mot minimikraven. Se resplanen.</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* What you are missing (the gaps) */}
                    <div className="space-y-3">
                      <h4 className="text-[11.5px] font-mono font-black uppercase text-slate-900 flex items-center gap-1.5">
                        <AlertCircle className="h-4.5 w-4.5 text-indigo-500 shrink-0" />
                        <span>Kompetensgap att stänga:</span>
                      </h4>
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
                        {missingSkills.length > 0 ? (
                          <div className="space-y-1.5">
                            <span className="text-[10px] text-slate-400 font-mono font-bold uppercase block">Nyckelord som saknas i din profil:</span>
                            <div className="flex flex-wrap gap-1">
                              {missingSkills.map((sk, idx) => (
                                <span key={idx} className="bg-white text-slate-800 border border-slate-201 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold shadow-3xs">
                                  ⚠ {sk}
                                </span>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="text-emerald-800 font-mono text-[10.5px] flex items-center gap-1 font-bold">
                            ✓ Din profil innehåller alla rekommenderade kompetenser!
                          </div>
                        )}

                        {!educationMatches && missingAcademia && (
                          <div className="pt-3 border-t border-slate-200 text-[11px] font-mono space-y-1.5">
                            <div>
                              <span className="text-[9.5px] text-indigo-600 font-bold uppercase block mb-0.5">Formell yrkesutbildning som saknas:</span>
                              <strong className="text-slate-950 font-sans text-xs block">{missingAcademia}</strong>
                            </div>
                            <p className="text-slate-505 font-sans leading-relaxed text-[11px]">
                              {academiaAdvice}
                            </p>
                            <div>
                              <a
                                href={academiaUrl}
                                target="_blank"
                                      rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-250 text-indigo-700 font-bold font-sans rounded-xl shadow-2xs hover:bg-slate-50 transition-all text-[10.5px] cursor-pointer"
                              >
                                <span>Visa program på {academiaPlatform}</span>
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            </div>
                          </div>
                        )}

                        {checklist.map((chk, idx) => {
                          if (chk.status === "missing") {
                            return (
                              <div key={idx} className="pt-3 border-t border-slate-200 text-[11px] font-mono space-y-1.5">
                                <div>
                                  <span className="text-[9.5px] text-indigo-600 font-bold uppercase block">Kompletterande licens / bevis:</span>
                                  <strong className="text-slate-900 font-sans text-xs block">{chk.item}</strong>
                                </div>
                                <p className="text-slate-500 font-sans leading-relaxed text-[10.5px]">
                                  {chk.advice}
                                </p>
                                <div>
                                  <a
                                    href={chk.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-250 text-indigo-700 font-bold font-sans rounded-xl shadow-2xs hover:bg-slate-50 transition-all text-[10.5px] cursor-pointer"
                                  >
                                    <span>Se prov hos {chk.platform}</span>
                                    <ExternalLink className="h-3 w-3" />
                                  </a>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        })}
                      </div>
                    </div>

                    {/* Börja Progressera Button & Studievägledning inside analyst */}
                    <div className="pt-3 border-t border-slate-100 text-center space-y-4">
                      
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedFavoriteJob(activeJobName);
                          setProfileSubTab('active-progression');
                          setTimeout(() => {
                            const el = document.getElementById('progress-roadmap-view-root');
                            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }, 100);
                        }}
                        className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold uppercase tracking-wider rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-500/10 hover:shadow-emerald-600/20 active:scale-98 transition-all"
                      >
                        <span>BÖRJA PROGRESSERA STEG FÖR STEG 🚀</span>
                        <ArrowRight className="h-4 w-4 stroke-[2.5]" />
                      </button>

                      <div className="text-slate-400 text-[10.5px] leading-relaxed">
                        Klicka på knappen ovan för att aktivera den steg-för-steg-baserade <strong className="text-slate-600">studie- och framstegsplanen</strong> för att få {activeJobName.split('(')[0].trim()}.
                      </div>
                    </div>

                  </div>
                );
              })()}
            </div> {/* Close Right Box column spacer */}

            </div> {/* Close grid */}

          </div> {/* Close Block 1 Container */}
            </motion.div>
          )}

          {profileSubTab === 'active-progression' && (
            <motion.div
              key="active-progression"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.18 }}
              className="w-full animate-fade-in"
            >
              {/* BLOCK 2: MIN RESPLAN & FRAMSTEG */}
              <div className="bg-slate-50/50 border border-slate-200 p-5 rounded-3xl space-y-5" id="profile-roadmap-progression-panel">
            <div className="flex items-center justify-between border-b border-slate-250 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">📈</span>
                <h3 className="font-extrabold text-sm uppercase text-slate-800 tracking-wide font-mono">Min Resplan & Framsteg</h3>
              </div>
              {(() => {
                const activeJobName = favoriteJobs.includes(selectedFavoriteJob) ? selectedFavoriteJob : (favoriteJobs[0] || "");
                const job = IN_DEMAND_JOBS.find(j => j.role === activeJobName) || IN_DEMAND_JOBS[0];
                const userSkillsNormalized = (profile.skills || []).map(s => s.toLowerCase().trim().replace(/[-\s]/g, ''));
                const jobSkills = job.requiredSkills || [];
                const userEduLower = (profile.education || "").toLowerCase();
                const jobEduLower = (job.educationRequired || "").toLowerCase();
                const roleLower = job.role.toLowerCase();
                let educationMatches = false;

                if (roleLower.includes("lager") || roleLower.includes("warehouse") || jobEduLower.includes("ingen formell") || jobEduLower.includes("inget formellt")) {
                  educationMatches = true;
                } else if (userEduLower.trim().length > 5) {
                  const eduKeywords = ["kandidat", "bachelor", "master", "magister", "yh", "yrkeshögskola", "universitet", "högskola", "examen", "ingenjör", "legitimerad", "legitimation", "vård- och omsorg", "gymnasie", "komvux"];
                  const matchedKeywords = eduKeywords.filter(kw => jobEduLower.includes(kw) && userEduLower.includes(kw));
                  const roleWords = ["sjuksköterska", "sjuksköterske", "läkare", "psykolog", "lärare", "elektriker", "kock", "utvecklare", "ingenjör", "ekonom", "jurist", "personal", "fysioterapeut", "apotekare"];
                  const matchedRoleWords = roleWords.filter(rw => job.role.toLowerCase().includes(rw) && userEduLower.includes(rw));
                  if (matchedKeywords.length > 0 || matchedRoleWords.length > 0) {
                    educationMatches = true;
                  } else if (userEduLower.includes("examen") || userEduLower.includes("degree") || userEduLower.includes("utbildning")) {
                    educationMatches = true;
                  }
                }

                const userCertLower = (profile.certifications || "").toLowerCase();
                const checklist: any[] = [];
                const isLagerJob = job.role.toLowerCase().includes("lager") || job.role.toLowerCase().includes("warehouse");
                const hasTruckkort = userCertLower.includes("truckkort") || userCertLower.includes("truck-kort") || userCertLower.includes("truckförar") || userCertLower.includes("truck kort");
                if (isLagerJob && !hasTruckkort) {
                  checklist.push({});
                }
                const needsDriverLicense = ["hantverk", "bygg", "transport", "omsorg", "hemtjänst", "installation", "lastbil", "fastighet"].some(term => 
                  job.role.toLowerCase().includes(term) || job.category.toLowerCase().includes(term)
                );
                const hasDriverLicense = userCertLower.includes("körkort") || userCertLower.includes("korkort") || (profile.driverLicenses && profile.driverLicenses.length > 0);
                if (needsDriverLicense && !hasDriverLicense) {
                  checklist.push({});
                }

                if (job.role.toLowerCase().includes("sjuksköterska") || job.role.toLowerCase().includes("läkare") || job.role.toLowerCase().includes("tandläkare") || job.role.toLowerCase().includes("psykolog") || job.role.toLowerCase().includes("lärare")) {
                  const hasLicense = userCertLower.includes("legitimation") || userCertLower.includes("legitimerad") || userCertLower.includes("licens");
                  if (!hasLicense) checklist.push({});
                } else if (job.role.toLowerCase().includes("elektriker")) {
                  const hasECY = userCertLower.includes("ecy") || userCertLower.includes("auktorisation");
                  if (!hasECY) checklist.push({});
                }

                const missingSkills = jobSkills.filter(skill => {
                  const sNorm = skill.toLowerCase().trim().replace(/[-\s]/g, '');
                  return !userSkillsNormalized.some(us => us.includes(sNorm) || sNorm.includes(us));
                });

                let stepsCount = 1;
                if (!educationMatches) stepsCount++;
                stepsCount += missingSkills.length;
                stepsCount += checklist.length;

                const completedKeys = Object.keys(completedSteps).filter(k => k.startsWith(`${profile.targetRole}-`));
                const completedCount = completedKeys.filter(k => completedSteps[k]).length;
                return (
                  <span className="bg-white font-mono text-[9.5px] font-black text-indigo-700 border border-indigo-100 px-2 py-0.5 rounded-md">
                    {completedCount} av {stepsCount} steg klara
                  </span>
                );
              })()}
            </div>

            {(() => {
              const activeJobName = favoriteJobs.includes(selectedFavoriteJob) ? selectedFavoriteJob : (favoriteJobs[0] || "");
          
          // Fallback or setup
          const job = IN_DEMAND_JOBS.find(j => j.role === activeJobName) || IN_DEMAND_JOBS[0];
          const userSkillsNormalized = (profile.skills || []).map(s => s.toLowerCase().trim().replace(/[-\s]/g, ''));
          const jobSkills = job.requiredSkills || [];
          const hasSkills = jobSkills.filter(skill => {
            const sNorm = skill.toLowerCase().trim().replace(/[-\s]/g, '');
            return userSkillsNormalized.some(us => us.includes(sNorm) || sNorm.includes(us));
          });
          const missingSkills = jobSkills.filter(skill => !hasSkills.includes(skill));

          const userEduLower = (profile.education || "").toLowerCase();
          const jobEduLower = (job.educationRequired || "").toLowerCase();
          const roleLower = job.role.toLowerCase();
          let educationMatches = false;

          if (roleLower.includes("lager") || roleLower.includes("warehouse") || jobEduLower.includes("ingen formell") || jobEduLower.includes("inget formellt")) {
            educationMatches = true;
          } else if (userEduLower.trim().length > 5) {
            const eduKeywords = ["kandidat", "bachelor", "master", "magister", "yh", "yrkeshögskola", "universitet", "högskola", "examen", "ingenjör", "legitimerad", "legitimation", "vård- och omsorg", "gymnasie", "komvux"];
            const matchedKeywords = eduKeywords.filter(kw => jobEduLower.includes(kw) && userEduLower.includes(kw));
            
            const roleWords = ["sjuksköterska", "sjuksköterske", "läkare", "psykolog", "lärare", "elektriker", "kock", "utvecklare", "ingenjör", "ekonom", "jurist", "personal", "fysioterapeut", "apotekare"];
            const matchedRoleWords = roleWords.filter(rw => job.role.toLowerCase().includes(rw) && userEduLower.includes(rw));

            if (matchedKeywords.length > 0 || matchedRoleWords.length > 0) {
              educationMatches = true;
            } else if (userEduLower.includes("examen") || userEduLower.includes("degree") || userEduLower.includes("utbildning")) {
              educationMatches = true;
            }
          }

          const userCertLower = (profile.certifications || "").toLowerCase();
          const checklist: { item: string, status: 'have' | 'missing', advice: string, platform: string, url: string }[] = [];

          const isLagerJob = job.role.toLowerCase().includes("lager") || job.role.toLowerCase().includes("warehouse");
          const hasTruckkort = userCertLower.includes("truckkort") || userCertLower.includes("truck-kort") || userCertLower.includes("truckförar") || userCertLower.includes("truck kort");

          if (isLagerJob && !hasTruckkort) {
            checklist.push({
              item: "Truckkort A+B (A1-A4, B1-B4)",
              status: "missing",
              advice: "Det absolut främsta kravet för lagerarbete och logistik i Sverige. Truckkort ökar dina chanser till jobb med över 90% och är starkt meriterande.",
              platform: "Studentum Truckutbildning",
              url: "https://www.studentum.se/utbildning/truckkort"
            });
          }

          const needsDriverLicense = ["hantverk", "bygg", "transport", "omsorg", "hemtjänst", "installation", "lastbil", "fastighet"].some(term => 
            job.role.toLowerCase().includes(term) || job.category.toLowerCase().includes(term)
          );

          const hasDriverLicense = userCertLower.includes("körkort") || userCertLower.includes("korkort") || (profile.driverLicenses && profile.driverLicenses.length > 0);
          if (needsDriverLicense && !hasDriverLicense) {
            checklist.push({
              item: "Svenskt B-Körkort (Personbil)",
              status: "missing",
              advice: "Många uppdrag och regionala tjänster inom denna sektor kräver servicebil eller hembesök.",
              platform: "Trafikverket",
              url: "https://www.trafikverket.se/korkort"
            });
          }

          if (job.role.toLowerCase().includes("sjuksköterska") || job.role.toLowerCase().includes("läkare") || job.role.toLowerCase().includes("tandläkare") || job.role.toLowerCase().includes("psykolog") || job.role.toLowerCase().includes("lärare")) {
            const hasLicense = userCertLower.includes("legitimation") || userCertLower.includes("legitimerad") || userCertLower.includes("licens");
            const title = job.role.toLowerCase().includes("lärare") ? "Svensk Lärarlegitimation (Skolverket)" : "Svensk Yrkeslegitimation (Socialstyrelsen)";
            if (!hasLicense) {
              checklist.push({
                item: title,
                status: "missing",
                advice: "Formellt krav för att utöva yrket självständigt i Sverige samt erhålla fast anställning.",
                platform: job.role.toLowerCase().includes("lärare") ? "Skolverket" : "Socialstyrelsen",
                url: job.role.toLowerCase().includes("lärare") ? "https://www.skolverket.se" : "https://legitimation.socialstyrelsen.se"
              });
            }
          } else if (job.role.toLowerCase().includes("elektriker")) {
            const hasECY = userCertLower.includes("ecy") || userCertLower.includes("auktorisation");
            if (!hasECY) {
              checklist.push({
                item: "ECY-certifikat (Elinstallationsauktorisation)",
                status: "missing",
                advice: "Grundkrav för att arbeta självständigt som auktoriserad elektriker i fält under Elsäkerhetsverkets regler.",
                platform: "Elinstallationsbranschens certifieringsnämnd",
                url: "https://www.ecy.com"
              });
            }
          } else if (job.role.toLowerCase().includes("lastbil") || job.role.toLowerCase().includes("truck driver") || job.role.toLowerCase().includes("buss")) {
            const hasYKB = userCertLower.includes("ykb") || userCertLower.includes("yrkeskompetensbevis");
            if (!hasYKB) {
              checklist.push({
                item: "Yrkeskompetensbevis (YKB)",
                status: "missing",
                advice: "Lagstadgat EU-krav för yrkesmässig godstrafik och personbefordran.",
                platform: "Transportstyrelsen",
                url: "https://www.transportstyrelsen.se"
              });
            }
          }

          // Build dynamic roadmap
          const dynamicSteps: any[] = [];
          let stepCounter = 1;

          // 1. Education Gap
          if (!educationMatches) {
            dynamicSteps.push({
              step: stepCounter++,
              type: "education",
              title: `Slutför yrkesutbildning för ${activeJobName.split('(')[0].trim()}`,
              description: `Du saknar formell yrkesutbildning för denna roll. Branschens rekommenderade utbildningskrav är: ${job.educationRequired}. Sök till Komvux, yrkeshögskola (YH) eller universitet för att uppfylla kraven.`,
              duration: job.role.toLowerCase().includes("lastbil") || job.role.toLowerCase().includes("lager") ? "3-6 månader" : "1.5–3 år",
              resources: [
                { name: "Komvux i din kommun", url: "https://www.studentum.se/utbildning/komvux" },
                { name: "Sök program på Yrkeshögskolan", url: `https://www.yrkeshogskolan.se/hitta-utbildning/sok-utbildning/?q=${encodeURIComponent(job.role.split('(')[0].trim())}` }
              ]
            });
          }

          // 2. Missing Skills Gaps (each skill individually)
          if (missingSkills.length > 0) {
            missingSkills.forEach((skill: any) => {
              let learnUrl = `https://www.google.com/search?q=l%C3%A4ra+sig+${encodeURIComponent(skill)}+kurs`;
              let duration = "2–4 veckor";
              let desc = `Skaffa kunskap och praktisk erfarenhet inom ${skill}, som saknas i din nuvarande profil och för närvarande hindrar full matchning. Genomför webbkurser, egna övningsprojekt eller praktisk träning.`;

              const lowerSkill = skill.toLowerCase();
              if (lowerSkill.includes("typescript")) {
                learnUrl = "https://www.typescriptlang.org/docs/";
                desc = "Läs TypeScript Handbook, konvertera dina JavaScript-projekt till TS och lär dig om stark typsäkerhet, gränssnitt och typer.";
                duration = "2-3 veckor";
              } else if (lowerSkill.includes("react")) {
                learnUrl = "https://react.dev";
                desc = "Bygg moderna användargränssnitt med React 18+. Bemästra state, hooks och komponentstruktur.";
                duration = "3-4 veckor";
              } else if (lowerSkill.includes("node")) {
                learnUrl = "https://nodejs.org";
                desc = "Lär dig skriva asynkron serverkod i JavaScript/TypeScript med Node.js och Express, samt utveckla REST-API:er.";
                duration = "2-4 veckor";
              } else if (lowerSkill.includes("docker")) {
                learnUrl = "https://www.docker.com/get-started/";
                desc = "Lär dig containerisering med Docker. Skriv Dockerfiles, bygg egna containers och orkestrera tjänster via Docker Compose.";
                duration = "1-2 veckor";
              } else if (lowerSkill.includes("kubernetes")) {
                learnUrl = "https://kubernetes.io/docs/tutorials/";
                desc = "Lär dig hantera poddar, tjänster, volymer och replikering av containeriserade system med Kubernetes.";
                duration = "3-5 veckor";
              } else if (lowerSkill.includes("aws") || lowerSkill.includes("azure") || lowerSkill.includes("cloud")) {
                learnUrl = "https://aws.amazon.com/free/";
                desc = "Lär dig skala applikationer i molnet (AWS eller Azure). Bekanta dig med virtuella servrar, fillagring och säkerhet.";
                duration = "4-6 veckor";
              } else if (lowerSkill.includes("sql")) {
                learnUrl = "https://www.w3schools.com/sql/";
                desc = "Lär dig relationsdatabaser, SQL-frågestruktur (SELECT, INSERT, JOIN) samt schema-design för robust datalagring.";
                duration = "1-2 veckor";
              } else if (lowerSkill.includes("java")) {
                learnUrl = "https://dev.java/";
                desc = "Lär dig Java och objektorienterad programmering samt utveckling i Spring Boot-ramverket.";
                duration = "4-6 veckor";
              }

              dynamicSteps.push({
                step: stepCounter++,
                type: "skill",
                skillName: skill,
                title: `Stäng kompetensgap: Bemästra ${skill}`,
                description: desc,
                duration: duration,
                resources: [
                  { name: `Dokumentation & kurser för ${skill}`, url: learnUrl },
                  { name: "Sök kurser på Yrkeshögskolan", url: `https://www.yrkeshogskolan.se/hitta-utbildning/sok-utbildning/?q=${encodeURIComponent(skill)}` }
                ]
              });
            });
          }

          // 3. Missing Licenses
          if (checklist.length > 0) {
            checklist.forEach((chk) => {
              dynamicSteps.push({
                step: stepCounter++,
                type: "license",
                title: `Skaffa behörighet: ${chk.item}`,
                description: `För att uppfylla kraven i din profil behöver du ta ${chk.item}. ${chk.advice}`,
                duration: "1–2 månader",
                resources: [
                  { name: `Officiell info på ${chk.platform}`, url: chk.url }
                ]
              });
            });
          }

          // Fallback if 100% matched
          if (dynamicSteps.length === 0) {
            dynamicSteps.push({
              step: stepCounter++,
              type: "complete",
              title: "Grattis! Din profil är helt komplett",
              description: `Du har redan alla rekommenderade kompetenser och formella behörigheter för rollen som ${activeJobName.split('(')[0].trim()} i din profil. Inga gap att stänga!`,
              duration: "Direkt ✨",
              resources: [
                { name: "Visa dina styrkor", url: "#" }
              ]
            });
          }

          // 4. Final step: CV Optimizer & Applying
          if (isLagerJob) {
            dynamicSteps.push({
              step: stepCounter++,
              type: "apply",
              title: `Registrera dig hos Bemanningsföretag & sök direkt (${job.activeAds} aktiva jobb)`,
              description: `Sista steget! Bemanningsföretag anställer ständigt lagerarbetare och kan sätta dig i arbete omgående. Se till att nämna ditt Truckkort och registrera din profil hos de största aktörerna för snabbast möjliga anställning.`,
              duration: "1-2 veckor ⚡",
              resources: [
                { name: "Lernia Bemanning (Lagerjobb)", url: "https://www.lernia.se/lediga-jobb/?q=lager" },
                { name: "Randstad Bemanning och Rekrytering", url: "https://www.randstad.se/arbetssokande/lediga-jobb/q-lager/" },
                { name: "Manpower (Lediga lagerjobb)", url: "https://www.manpower.se/sv/lediga-jobb?search=lager" },
                { name: "Sök på Platsbanken (Lagerarbetare)", url: `https://arbetsformedlingen.se/platsbanken/annonser?q=${encodeURIComponent(job.role.split('(')[0].trim())}` }
              ]
            });
          } else {
            dynamicSteps.push({
              step: stepCounter++,
              type: "apply",
              title: `Optimera CV & Sök bland de ${job.activeAds} aktiva annonserna`,
              description: `Sista steget! Med alla kompetensgap framgångsrikt åtgärdade kan du uppdatera ditt digitala CV (Lasse kan hjälpa dig i chatten!) och söka de ${job.activeAds} lediga tjänsterna som finns tillgängliga på Platsbanken.`,
              duration: "1–3 månader",
              resources: [
                { name: `Sök lediga jobb på Platsbanken (${job.activeAds} st)`, url: `https://arbetsformedlingen.se/platsbanken/annonser?q=${encodeURIComponent(job.role.split('(')[0].trim())}` },
                { name: `Sök på LinkedIn Sverige`, url: `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(job.role.split('(')[0].trim())}&location=Sweden` }
              ]
            });
          }

          // Check mode
          const customStepsList = profile.customRoadmaps?.[activeJobName] || [];
          const isCustomMode = roadmapMode === 'custom';

          // Metrics
          const totalSteps = isCustomMode ? customStepsList.length : dynamicSteps.length;
          const completedCount = isCustomMode 
            ? customStepsList.filter((s: any) => s.isDone).length
            : dynamicSteps.filter((st: any) => completedSteps[`${profile.targetRole}-${st.step}`]).length;
          const progressPercent = totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0;

          let speech = isCustomMode 
            ? "Välkommen till din anpassade studieplan! Lägg till dina egna delmål och stäng dina kompetensgap med hjälp av mina tips. 🌲🦌"
            : "Välkommen till din studieplan! Låt oss stänga dina kompetensgap steg för steg. 🦌☕";
          if (progressPercent > 0 && progressPercent < 100) {
            speech = `Strålande kämpat! Du har bockat av och stängt ${completedCount} av ${totalSteps} områden i din plan. Du är på god väg! 📈🇸🇪`;
          } else if (progressPercent === 100 && totalSteps > 0) {
            speech = `Fantastiskt! Du har slutfört hela planen och uppnått dina mål! 🏆 Moose-ive framgång! Snabbt vidare till Platsbanken? 🦌🎉`;
          }

          const getKomvuxUrlAndName = (loc: string) => {
            const cleaned = (loc || "").toLowerCase().trim();
            if (cleaned.includes("stockholm") || cleaned.includes("kista")) {
              return { name: "Stockholms Intensivutbildning / Komvux Stockholm", url: "https://vuxenutbildning.stockholm/" };
            } else if (cleaned.includes("göteborg") || cleaned.includes("goteborg")) {
              return { name: "Komvux Göteborg / Vuxenutbildningen", url: "https://goteborg.se/vuxenutbildningen" };
            } else if (cleaned.includes("malmö") || cleaned.includes("malmo")) {
              return { name: "Komvux Malmö stads vuxenutbildning", url: "https://malmo.se/komvux" };
            } else if (cleaned.includes("uppsala")) {
              return { name: "Uppsala Vuxenutbildning / Komvux", url: "https://www.uppsala.se/komvux/" };
            } else if (cleaned.includes("vasteras") || cleaned.includes("västerås")) {
              return { name: "Komvux Västerås Kommun", url: "https://www.vasteras.se/komvux" };
            } else if (cleaned.includes("orebro") || cleaned.includes("örebro")) {
              return { name: "Örebro Vuxenutbildning (Komvux)", url: "https://www.orebro.se/komvux" };
            } else if (cleaned.includes("linkoping") || cleaned.includes("linköping")) {
              return { name: "Vuxenutbildningen Linköpings kommun", url: "https://www.linkoping.se/vuxenutbildning/" };
            } else {
              return { name: "Hitta Komvux Utbildningar", url: "https://www.studentum.se/utbildning/komvux" };
            }
          };

          const localKomvux = getKomvuxUrlAndName(profile.targetLocation);
          const eduQuery = activeJobName.split('(')[0].split('/')[0].replace(/Legitimerad|Auktoriserad/gi, "").trim();
          const yhQueryUrl = `https://www.yrkeshogskolan.se/hitta-utbildning/sok-utbildning/?q=${encodeURIComponent(eduQuery)}`;
          const antagningQueryUrl = `https://www.antagning.se/se/search?freeText=${encodeURIComponent(eduQuery)}&period=27&sortBy=relevance`;

          return (
            <div
              key="active-progression"
              className="space-y-6 w-full animate-fade-in"
              id="progress-roadmap-view-root"
            >
            
            {/* Left Column: Progress Meter Dashboard */}
            <div className="space-y-6">
              
              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-[0_8px_30px_rgba(15,23,42,0.015)] space-y-5">
                
                <div className="space-y-1">
                  <span className="text-[9px] bg-emerald-100 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-md font-mono font-black uppercase">
                    AKTIV RESPLAN I SVERIGE
                  </span>
                  <h3 className="font-extrabold text-sm md:text-base text-slate-900 tracking-tight leading-snug font-display">
                    {selectedFavoriteJob}
                  </h3>
                </div>

                <div className="space-y-5">
                  
                  {/* Linear track meter */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-slate-400 font-bold block">FRAMSTEG</span>
                      <span className="text-slate-900 font-extrabold block bg-slate-100 px-2 py-0.5 rounded-md text-[10.5px]">
                        {completedCount} av {totalSteps} avklarade
                      </span>
                    </div>

                    <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden relative">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="bg-emerald-500 h-full rounded-full"
                      />
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-black text-emerald-700 font-mono">
                        {progressPercent}% FÄRDIGT
                      </span>
                    </div>
                  </div>

                  {/* Dropdown to switch roadmap models */}
                  <div className="pt-4 border-t border-slate-100 space-y-2">
                    <label className="text-[9.5px] text-slate-400 font-bold uppercase block tracking-wider font-mono">
                      VÄLJ SPÅRAT YRKE:
                    </label>
                    <select
                      value={selectedFavoriteJob}
                      onChange={(e) => setSelectedFavoriteJob(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 outline-none rounded-xl text-xs font-bold text-slate-800 cursor-pointer"
                    >
                      {favoriteJobs.map((roleOpt, ri) => (
                        <option key={ri} value={roleOpt}>{roleOpt}</option>
                      ))}
                    </select>
                  </div>

                  {/* Selector for Roadmap Mode (Pre-determined vs Custom) */}
                  <div className="pt-4 border-t border-slate-100 space-y-2.5">
                    <label className="text-[9.5px] text-slate-400 font-bold uppercase block tracking-wider font-mono">
                      PLANSTRATEGI:
                    </label>
                    <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100/50 border border-slate-150 rounded-xl">
                      <button
                        type="button"
                        onClick={() => setRoadmapMode('ai')}
                        className={`py-2 px-1.5 rounded-lg text-[10.5px] font-extrabold flex items-center justify-center gap-1 cursor-pointer transition-all ${
                          roadmapMode === 'ai'
                            ? "bg-white text-indigo-700 shadow-xs border-b-2 border-indigo-500"
                            : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        <span>🧭 Standard AI-plan</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setRoadmapMode('custom')}
                        className={`py-2 px-1.5 rounded-lg text-[10.5px] font-extrabold flex items-center justify-center gap-1 cursor-pointer transition-all ${
                          roadmapMode === 'custom'
                            ? "bg-white text-emerald-700 shadow-xs border-b-2 border-emerald-500"
                            : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        <span>🛠️ Egen plan med AI</span>
                      </button>
                    </div>
                  </div>

                  {/* Lasse Moose Coach Advice Bubble */}
                  <div className="bg-amber-50/20 border border-amber-200 p-4 rounded-xl flex gap-3.5 items-start">
                    <div className="w-9 h-9 bg-amber-50 border border-amber-200/80 rounded-full shrink-0 flex items-center justify-center text-sm">
                      🦌
                    </div>
                    <div className="space-y-0.5 flex-1 min-w-0 font-sans">
                      <span className="text-[9px] text-amber-800 font-mono font-black uppercase">STUDIECOACH LASSE:</span>
                      <p className="text-slate-800 text-xs font-bold leading-relaxed">
                        {speech}
                      </p>
                    </div>
                  </div>

                </div>

              </div>

            </div>

            {/* Right Column: Step by step cards */}
            <div className="space-y-4 w-full">
              {(() => {
                const roadmap = dynamicSteps;

                const getKomvuxUrlAndName = (loc: string) => {
                  const cleaned = (loc || "").toLowerCase().trim();
                  if (cleaned.includes("stockholm") || cleaned.includes("kista")) {
                    return { name: "Stockholms Intensivutbildning / Komvux Stockholm", url: "https://vuxenutbildning.stockholm/" };
                  } else if (cleaned.includes("göteborg") || cleaned.includes("goteborg")) {
                    return { name: "Komvux Göteborg / Vuxenutbildningen", url: "https://goteborg.se/vuxenutbildningen" };
                  } else if (cleaned.includes("malmö") || cleaned.includes("malmo")) {
                    return { name: "Komvux Malmö stads vuxenutbildning", url: "https://malmo.se/komvux" };
                  } else if (cleaned.includes("uppsala")) {
                    return { name: "Uppsala Vuxenutbildning / Komvux", url: "https://www.uppsala.se/komvux/" };
                  } else if (cleaned.includes("vasteras") || cleaned.includes("västerås")) {
                    return { name: "Komvux Västerås Kommun", url: "https://www.vasteras.se/komvux" };
                  } else if (cleaned.includes("orebro") || cleaned.includes("örebro")) {
                    return { name: "Örebro Vuxenutbildning (Komvux)", url: "https://www.orebro.se/komvux" };
                  } else if (cleaned.includes("linkoping") || cleaned.includes("linköping")) {
                    return { name: "Vuxenutbildningen Linköpings kommun", url: "https://www.linkoping.se/vuxenutbildning/" };
                  } else if (cleaned.includes("helsingborg")) {
                    return { name: "Komvux Helsingborg Yrkesutbildning", url: "https://helsingborg.se/vuxenutbildning/" };
                  } else if (cleaned.includes("jonkoping") || cleaned.includes("jönköping")) {
                    return { name: "Vuxenutbildningen Jönköpings kommun", url: "https://jonkoping.se/vuxenutbildning" };
                  } else if (cleaned.includes("norrkoping") || cleaned.includes("norrköping")) {
                    return { name: "Komvux Norrköpings kommun", url: "https://www.norrkoping.se/vuxenutbildning-komvux.html" };
                  } else if (cleaned.includes("umea") || cleaned.includes("umeå")) {
                    return { name: "Umeå Vuxenutbildning (Komvux)", url: "https://www.umea.se/komvux" };
                  }
                  return { name: "Nationella Komvux- & Vuxenutbildningen", url: "https://www.studentum.se/utbildning/komvux" };
                };

                const localKomvux = getKomvuxUrlAndName(profile.targetLocation);
                const customStepsList = profile.customRoadmaps?.[activeJobName] || [];

                if (roadmapMode === "custom") {
                  return (
                    <div className="space-y-6">
                      
                      {/* Part 1: AI Advisor SYV Guidance Panel */}
                      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl text-white space-y-4 shadow-sm text-left">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">🌲</span>
                          <h4 className="font-extrabold text-xs tracking-wider uppercase font-mono text-emerald-405">
                            Lasses AI-Karriärstudie för {activeJobName}
                          </h4>
                        </div>

                        {guidanceLoading ? (
                          <div className="space-y-3 animate-pulse py-2">
                            <div className="h-4 bg-slate-850 rounded-md w-3/4"></div>
                            <div className="h-4 bg-slate-850 rounded-md w-1/2"></div>
                            <div className="h-10 bg-slate-855 rounded-xl w-full"></div>
                          </div>
                        ) : (
                          <div className="space-y-4 text-xs">
                            {guidanceData ? (
                              <>
                                <div className="bg-slate-950/40 p-3.5 rounded-xl border border-slate-800 space-y-2">
                                  <p className="font-bold text-amber-350 flex items-center gap-1.5">
                                    <span className="text-[13px]">🎓</span>
                                    <span>Rekommenderad utbildningsväg i Sverige:</span>
                                  </p>
                                  <p className="text-slate-205 font-medium leading-relaxed">
                                    {guidanceData.educationRequired}
                                  </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  <div className="bg-slate-950/30 p-3.5 rounded-xl border border-slate-800/65 space-y-1.5">
                                    <p className="font-bold text-teal-300 flex items-center gap-1">
                                      <span>⚡ Nyckelkompetenser:</span>
                                    </p>
                                    <ul className="list-disc leading-relaxed pl-4 space-y-1 text-slate-350 font-medium">
                                      {guidanceData.topSkillsNeeded?.map((sk, i) => (
                                        <li key={i}>{sk}</li>
                                      ))}
                                      {(!guidanceData.topSkillsNeeded || guidanceData.topSkillsNeeded.length === 0) && (
                                        <li>Inga specifika kompetenser angivna.</li>
                                      )}
                                    </ul>
                                  </div>

                                  <div className="bg-slate-950/30 p-3.5 rounded-xl border border-slate-800/65 space-y-1.5">
                                    <p className="font-bold text-rose-300 flex items-center gap-1">
                                      <span>📜 Formella licenskrav:</span>
                                    </p>
                                    <ul className="list-disc leading-relaxed pl-4 space-y-1 text-slate-355 font-medium">
                                      {guidanceData.certificationsAndLicenses?.map((cert, i) => (
                                        <li key={i}>{cert}</li>
                                      ))}
                                      {(!guidanceData.certificationsAndLicenses || guidanceData.certificationsAndLicenses.length === 0) && (
                                        <li>Inga formella licenser krävs i Sverige.</li>
                                      )}
                                    </ul>
                                  </div>
                                </div>

                                <div className="bg-emerald-950/30 border border-emerald-900/60 p-3 rounded-xl flex gap-2 items-start">
                                  <span className="text-sm">👋</span>
                                  <p className="text-[11px] leading-relaxed font-semibold text-emerald-100 italic">
                                    "{guidanceData.adviserSpeech}"
                                  </p>
                                </div>
                              </>
                            ) : (
                              <div className="text-slate-300 font-medium">
                                Kunde inte hämta specifik rådgivning. Lägg till dina egna anpassade resplansteg nedan för att nå målet!
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Part 2: Add New Step Toolbar */}
                      <div className="bg-white border border-slate-205 p-5 rounded-2xl shadow-xs space-y-4 text-left">
                        <h4 className="font-extrabold text-xs tracking-wider uppercase font-mono text-slate-400">
                          Lägg till ett nytt anpassat steg i din plan
                        </h4>

                        <div className="space-y-3">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div className="md:col-span-2 space-y-1">
                              <label className="text-[10px] text-slate-400 font-bold block">Titel på steget:</label>
                              <input 
                                type="text"
                                placeholder="t.ex. Anmäla skolan, ta truckkort, sök praktikplatser"
                                value={newCustomStepTitle}
                                onChange={(e) => setNewCustomStepTitle(e.target.value)}
                                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-1 focus:ring-emerald-500 font-semibold text-slate-800 outline-none"
                                id="custom-step-title-input"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] text-slate-400 font-bold block">Tidåtgång:</label>
                              <select
                                value={newCustomStepDuration}
                                onChange={(e) => setNewCustomStepDuration(e.target.value)}
                                className="w-full px-3 py-2 text-xs border border-slate-210 rounded-xl outline-none font-semibold text-slate-705 cursor-pointer"
                              >
                                <option value="1-2 dagar">1-2 dagar</option>
                                <option value="1-2 veckor">1-2 veckor</option>
                                <option value="1 månad">1 månad</option>
                                <option value="3 månader">3 månader</option>
                                <option value="6 månader">6 månader</option>
                                <option value="1-2 år">1-2 år</option>
                              </select>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] text-slate-400 font-bold block">Beskrivning eller anteckningar (Valfritt):</label>
                            <textarea
                              placeholder="t.ex. Ansök senast den 15e. Prata med studierektorn."
                              value={newCustomStepDesc}
                              onChange={(e) => setNewCustomStepDesc(e.target.value)}
                              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-1 focus:ring-emerald-500 font-medium text-slate-700 outline-none h-14 resize-none"
                            />
                          </div>

                          <button
                            type="button"
                            onClick={handleAddCustomStep}
                            disabled={!newCustomStepTitle.trim()}
                            className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white text-xs font-black rounded-xl transition cursor-pointer flex items-center justify-center gap-1 shadow-xs"
                            id="add-custom-step-btn"
                          >
                            <span>Lägg till steg i resplan ⚡</span>
                          </button>
                        </div>
                      </div>

                      {/* Part 3: Step Cards List */}
                      <div className="space-y-3.5">
                        {customStepsList.length === 0 ? (
                          <div className="border border-dashed border-slate-300 rounded-2xl p-8 text-center space-y-2 bg-slate-50/50">
                            <div className="text-2xl text-slate-400">📋</div>
                            <h5 className="font-extrabold text-sm text-slate-705">Din anpassade plan är tom</h5>
                            <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed font-semibold">
                              Skapa dina egna delmål och milstolpar ovan. Ta hjälp av Lasses AI-analys på toppen för att se exakt vad som behövs för svensk behörighet!
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-3 font-sans">
                            {customStepsList.map((step: any, index: number) => {
                              const isDone = !!step.isDone;
                              return (
                                <motion.div
                                  key={step.id}
                                  layout="position"
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ 
                                    opacity: isDone ? 0.8 : 1,
                                    scale: isDone ? 0.99 : 1,
                                    borderColor: isDone ? "#10b981" : "#e2e8f0",
                                    backgroundColor: isDone ? "rgba(240, 253, 244, 0.3)" : "rgba(255, 255, 255, 1)",
                                  }}
                                  transition={{ duration: 0.35, ease: "easeInOut" }}
                                  className="border rounded-2xl p-5 relative shadow-xs text-left"
                                >
                                  <div className="flex gap-4 items-start pr-12">
                                    {/* Checkbox */}
                                    <motion.button
                                      type="button"
                                      whileTap={{ scale: 0.9 }}
                                      whileHover={{ scale: 1.05 }}
                                      onClick={() => handleToggleCustomStepDone(step.id)}
                                      className={`w-6.5 h-6.5 rounded-lg border-2 flex items-center justify-center cursor-pointer transition-colors mt-0.5 shrink-0 ${
                                        isDone 
                                          ? "bg-emerald-500 border-emerald-500 text-white shadow-xs" 
                                          : "border-slate-300 hover:border-slate-400 bg-white"
                                      }`}
                                    >
                                      {isDone && (
                                        <motion.svg 
                                          className="h-3.5 w-3.5" 
                                          fill="none" 
                                          viewBox="0 0 24 24" 
                                          stroke="currentColor" 
                                          strokeWidth={3}
                                          initial={{ scale: 0 }}
                                          animate={{ scale: 1 }}
                                        >
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </motion.svg>
                                      )}
                                    </motion.button>

                                    <div className="space-y-1.5 flex-1 min-w-0">
                                      <div className="flex flex-wrap items-center gap-2">
                                        <span className="text-[9.5px] bg-emerald-50 border border-emerald-200 text-emerald-805 px-2 py-0.5 rounded-md font-mono font-black uppercase shrink-0">
                                          STEG {index + 1}
                                        </span>
                                        <span className="text-[10px] text-slate-505 font-mono font-bold shrink-0 inline-flex items-center gap-1">
                                          ⏱️ {step.duration}
                                        </span>
                                      </div>

                                      <h4 className={`text-sm md:text-base font-extrabold tracking-tight ${isDone ? "text-slate-400 line-through" : "text-slate-900"}`}>
                                        {step.title}
                                      </h4>

                                      {step.description && (
                                        <p className={`text-xs leading-relaxed font-semibold ${isDone ? "text-slate-400" : "text-slate-600"}`}>
                                          {step.description}
                                        </p>
                                      )}
                                    </div>
                                  </div>

                                  {/* Delete button (Trash icon) */}
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteCustomStep(step.id)}
                                    className="absolute top-4 right-4 p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition cursor-pointer"
                                    title="Ta bort steg"
                                  >
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                  </button>
                                </motion.div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                }

                return (
                  <div className="space-y-4">
                    
                    <div className="bg-white p-5 border border-slate-205 rounded-xl flex items-center justify-between gap-3 shadow-[0_4px_25px_rgba(15,23,42,0.01)] select-none">
                      <div>
                        <span className="text-[9.5px] font-mono font-bold text-slate-400 block uppercase">Framstegsplan mot målyrke</span>
                        <h3 className="font-extrabold text-sm text-slate-900 font-display">
                          Steg för steg mot: {activeJobName}
                        </h3>
                      </div>
                      <span className="bg-emerald-50 text-emerald-800 border border-emerald-150 px-2.5 py-0.5 rounded font-mono text-[10.5px] font-extrabold">
                        {roadmap.length} delmoment
                      </span>
                    </div>

                    {roadmap.map((step: any) => {
                      const stepKey = `${profile.targetRole}-${step.step}`;
                      const isDone = !!completedSteps[stepKey];
                      const cleanRoleName = activeJobName.split('(')[0].split('/')[0].replace(/Legitimerad|Auktoriserad/gi, "").trim();
                      const isAcademicOrFormalEducationJob = !["lager", "warehouse", "chaufför", "lastbil", "buss", "driver", "väktare", "skyddsvakt", "brandman"].some(term => activeJobName.toLowerCase().includes(term));

                      // Grammatically correct Swedified search query helper
                      const getSwedishEducationSearchQuery = (role: string): string => {
                        const base = role.split('(')[0].split('/')[0].replace(/Legitimerad|Auktoriserad/gi, "").trim();
                        const lower = base.toLowerCase();
                        if (lower.includes("mjukvaru") || lower.includes("software developer") || lower.includes("programmerare")) {
                          return "Mjukvaruutveckling";
                        }
                        if (lower.includes("systemut") || lower.includes("system developer") || lower.includes("it-arkitekt") || lower.includes("it arkitekt")) {
                          return "Systemutveckling";
                        }
                        if (lower.includes("webb") || lower.includes("frontend") || lower.includes("backend") || lower.includes("fullstack")) {
                          return "Webbutveckling";
                        }
                        if (lower.includes("apputveck") || lower.includes("mobilutveck")) {
                          return "Apputveckling";
                        }
                        if (lower.includes("spelutveck")) {
                          return "Spelutveckling";
                        }
                        if (lower.includes("sjuksköterska") || lower.includes("nurse")) {
                          return "Sjuksköterska";
                        }
                        if (/utvecklare/i.test(base)) {
                          return base.replace(/utvecklare/gi, "utveckling");
                        }
                        return base;
                      };

                      const eduQuery = getSwedishEducationSearchQuery(activeJobName);
                      const yhQueryUrl = `https://www.yrkeshogskolan.se/hitta-utbildning/sok-utbildning/?q=${encodeURIComponent(eduQuery)}`;
                      const antagningQueryUrl = `https://www.antagning.se/se/search?freeText=${encodeURIComponent(eduQuery)}&period=27&sortBy=relevance`;

                      return (
                        <motion.div 
                          key={step.step}
                          layout="position"
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ 
                            opacity: isDone ? 0.8 : 1,
                            scale: isDone ? 0.99 : 1,
                            borderColor: isDone ? "#10b981" : "#e2e8f0",
                            backgroundColor: isDone ? "rgba(240, 253, 244, 0.3)" : "rgba(255, 255, 255, 1)",
                          }}
                          transition={{ 
                            duration: 0.35, 
                            ease: "easeInOut" 
                          }}
                          className="border rounded-2xl p-5 md:p-6 relative shadow-xs"
                        >
                          <div className="flex gap-4 items-start">
                            {/* Checkbox */}
                            <motion.button
                              type="button"
                              whileTap={{ scale: 0.9 }}
                              whileHover={{ scale: 1.05 }}
                              onClick={() => {
                                setCompletedSteps((prev: any) => ({
                                  ...prev,
                                  [stepKey]: !isDone
                                }));
                              }}
                              className={`w-6.5 h-6.5 rounded-lg border-2 flex items-center justify-center cursor-pointer transition-colors mt-0.5 shrink-0 ${
                                isDone 
                                  ? "bg-emerald-500 border-emerald-500 text-white shadow-xs" 
                                  : "border-slate-300 hover:border-slate-400 bg-white"
                              }`}
                              id={`step-checkbox-${step.step}`}
                            >
                              <AnimatePresence mode="popLayout">
                                {isDone && (
                                  <motion.div
                                    initial={{ scale: 0, rotate: -20 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    exit={{ scale: 0, rotate: 20 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                  >
                                    <Check className="h-4.5 w-4.5 stroke-[3.5]" />
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </motion.button>

                            <div className="space-y-2.5 flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                                <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">MOMENT {step.step}</span>
                                <span className="text-slate-300 font-mono text-[9px]">•</span>
                                <span className="text-[10px] bg-slate-100 text-slate-650 font-mono px-2 py-0.5 rounded font-black flex items-center gap-1">
                                  <Clock className="w-3 h-3 text-slate-405" />
                                  <span>Tid: {step.duration}</span>
                                </span>
                              </div>

                              <div className="relative inline-block max-w-full">
                                <h4 className={`text-xs md:text-sm font-extrabold text-slate-900 font-display transition-colors duration-300 ${isDone ? "text-slate-400" : ""}`}>
                                  {step.title}
                                </h4>
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: isDone ? "100%" : "0%" }}
                                  transition={{ duration: 0.3, ease: "easeInOut" }}
                                  className="absolute left-0 top-[52%] h-[2px] bg-slate-300 pointer-events-none rounded"
                                />
                              </div>
                              
                              <p className={`text-xs leading-relaxed transition-colors duration-300 ${isDone ? "text-slate-400 opacity-80" : "text-slate-500"}`}>
                                {step.description}
                              </p>

                              {/* Local program queries */}
                              <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-sans">
                                  {step.type === "education" ? (
                                    isAcademicOrFormalEducationJob ? (
                                      <>
                                        <a
                                          href={localKomvux.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="inline-flex items-center gap-1.5 p-2 bg-slate-50 border border-slate-200 hover:bg-slate-100/60 rounded-lg text-slate-700 transition font-sans text-[10.5px]"
                                        >
                                          <span className="text-sm shrink-0">🏫</span>
                                          <div className="min-w-0 flex-1">
                                            <span className="font-bold text-slate-805 block truncate leading-none">Komvux i din kommun</span>
                                            <span className="text-[9.5px] text-slate-400 truncate block mt-0.5 font-medium">Sök "{eduQuery}" på Komvux</span>
                                          </div>
                                          <ExternalLink className="h-3 w-3 text-slate-400 shrink-0" />
                                        </a>

                                        <a
                                          href={yhQueryUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="inline-flex items-center gap-1.5 p-2 bg-sky-50/20 border border-sky-100 hover:bg-sky-50/50 rounded-lg text-sky-900 transition font-sans text-[10.5px]"
                                        >
                                          <span className="text-sm shrink-0">⚡</span>
                                          <div className="min-w-0 flex-1">
                                            <span className="font-extrabold text-indigo-900 block truncate leading-none">Hitta YH-program</span>
                                            <span className="text-[9.5px]/[13px] text-slate-404 truncate block mt-0.5 font-medium font-medium">Sök "{eduQuery}" på YH</span>
                                          </div>
                                          <ExternalLink className="h-3 w-3 text-sky-400 shrink-0" />
                                        </a>

                                        <a
                                          href={antagningQueryUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="inline-flex items-center gap-1.5 p-2 bg-indigo-50/20 border border-indigo-100 hover:bg-indigo-50/50 rounded-lg text-indigo-950 transition font-sans text-[10.5px] sm:col-span-2"
                                        >
                                          <span className="text-sm shrink-0">🎓</span>
                                          <div className="min-w-0 flex-1">
                                            <span className="font-extrabold text-indigo-900 block truncate leading-none">Antagning.se kurser</span>
                                            <span className="text-[9.5px] text-slate-500 truncate block mt-0.5 font-medium">Sök "{eduQuery}" på Antagning.se</span>
                                          </div>
                                          <ExternalLink className="h-3 w-3 text-indigo-400 shrink-0" />
                                        </a>
                                      </>
                                    ) : (
                                      <div className="col-span-2 py-3 px-3 bg-slate-50 border border-slate-150 rounded-lg text-left text-slate-500 text-[11px] leading-relaxed">
                                        ℹ️ Ingen formell eftergymnasial eller Komvux-utbildning krävs för detta yrkesområde. Yrkeserfarenhet eller kortare yrkeslicenser (t.ex. truckkort) är meriterande.
                                      </div>
                                    )
                                  ) : step.type === "skill" ? (
                                    <>
                                      {step.resources && step.resources.length > 0 ? (
                                        step.resources.map((res: any, ri: number) => {
                                          const styles = getResourceStylesAndIcon(res.name, res.url);
                                          const isLastAndOdd = ri === step.resources.length - 1 && step.resources.length % 2 !== 0;
                                          return (
                                            <a
                                              key={ri}
                                              href={res.url}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className={`inline-flex items-center gap-1.5 p-2 bg-white rounded-lg border transition font-sans text-[10.5px] cursor-pointer hover:shadow-xs hover:bg-slate-50/50 ${styles.bgClass} ${isLastAndOdd ? "sm:col-span-2" : ""}`}
                                            >
                                              <span className="text-sm shrink-0">{styles.icon}</span>
                                              <div className="min-w-0 flex-1">
                                                <span className={`block truncate leading-none ${styles.icon === "⚡" || styles.icon === "🎓" || styles.icon === "💼" ? "font-extrabold text-indigo-950" : "font-bold text-slate-900"}`}>{res.name}</span>
                                                <span className="text-[9.5px]/[13px] text-slate-500 truncate block mt-0.5 font-medium">{styles.subText}</span>
                                              </div>
                                              <ExternalLink className={`h-3 w-3 shrink-0 ${styles.iconColor}`} />
                                            </a>
                                          );
                                        })
                                      ) : (
                                        <div className="col-span-2 py-3 px-3 bg-slate-50 border border-slate-150 rounded-lg text-left text-slate-500 text-[11px] leading-relaxed">
                                          ℹ️ Inga specifika studielänkar tillgängliga. Sök på internet eller prata med studiecoach Lasse för personlig vägledning.
                                        </div>
                                      )}
                                    </>
                                  ) : step.type === "license" ? (
                                    <>
                                      {step.resources && step.resources.length > 0 ? (
                                        step.resources.map((res: any, ri: number) => {
                                          const styles = getResourceStylesAndIcon(res.name, res.url);
                                          const isLastAndOdd = ri === step.resources.length - 1 && step.resources.length % 2 !== 0;
                                          return (
                                            <a
                                              key={ri}
                                              href={res.url}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className={`inline-flex items-center gap-1.5 p-2 bg-white rounded-lg border transition font-sans text-[10.5px] cursor-pointer hover:shadow-xs hover:bg-slate-50/50 ${styles.bgClass} ${isLastAndOdd ? "sm:col-span-2" : ""}`}
                                            >
                                              <span className="text-sm shrink-0">{styles.icon}</span>
                                              <div className="min-w-0 flex-1">
                                                <span className={`block truncate leading-none ${styles.icon === "⚡" || styles.icon === "🎓" || styles.icon === "💼" ? "font-extrabold text-indigo-950" : "font-bold text-slate-900"}`}>{res.name}</span>
                                                <span className="text-[9.5px]/[13px] text-slate-500 truncate block mt-0.5 font-medium">{styles.subText}</span>
                                              </div>
                                              <ExternalLink className={`h-3 w-3 shrink-0 ${styles.iconColor}`} />
                                            </a>
                                          );
                                        })
                                      ) : (
                                        <div className="col-span-2 py-3 px-3 bg-slate-50 border border-slate-150 rounded-lg text-left text-slate-500 text-[11px] leading-relaxed">
                                          ℹ️ Kontakta berörd myndighet eller utbildare för information om licenskravet.
                                        </div>
                                      )}
                                    </>
                                  ) : (
                                    <>
                                      {(() => {
                                        const roleLower = activeJobName.toLowerCase();
                                        const isPublicSector = roleLower.includes("sjuksköterska") || roleLower.includes("sköterska") || roleLower.includes("läkare") || roleLower.includes("tandläkare") || roleLower.includes("psykolog") || roleLower.includes("vård") || roleLower.includes("omsorg") || roleLower.includes("lärare") || roleLower.includes("fysioterapeut") || roleLower.includes("pedagog");
                                        if (isPublicSector) {
                                          return (
                                            <a
                                              href="https://www.offentligajobb.se"
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="inline-flex items-center gap-1.5 p-2 bg-sky-50 border border-sky-150 hover:bg-sky-100/60 rounded-lg text-sky-955 transition font-sans text-[10.5px]"
                                            >
                                              <span className="text-sm shrink-0">🏛️</span>
                                              <div className="min-w-0 flex-1">
                                                <span className="font-bold text-sky-900 block truncate leading-none">Offentliga Jobb</span>
                                                <span className="text-[9.5px] text-sky-600 truncate block mt-0.5 font-medium font-medium font-medium">Sök jobb i offentliga sektorn</span>
                                              </div>
                                              <ExternalLink className="h-3 w-3 text-sky-400 shrink-0" />
                                            </a>
                                          );
                                        } else {
                                          return (
                                            <a
                                              href="https://www.yrkeshogskolan.se/for-studerande/lia-och-praktik/"
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="inline-flex items-center gap-1.5 p-2 bg-teal-50/20 border border-teal-100 hover:bg-teal-50/50 rounded-lg text-teal-900 transition font-sans text-[10.5px]"
                                            >
                                              <span className="text-sm shrink-0">🤝</span>
                                              <div className="min-w-0 flex-1">
                                                <span className="font-extrabold text-teal-955 block truncate leading-none">APL & LIA Praktik</span>
                                                <span className="text-[9.5px] text-teal-600 truncate block mt-0.5 font-medium font-medium">Hitta svenska praktikplatser</span>
                                              </div>
                                              <ExternalLink className="h-3 w-3 text-teal-400 shrink-0" />
                                            </a>
                                          );
                                        }
                                      })()}

                                      <a
                                        href={`https://arbetsformedlingen.se/platsbanken/annonser?q=${encodeURIComponent(cleanRoleName)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 p-2 bg-slate-50 border border-slate-200 hover:bg-slate-100/60 rounded-lg text-slate-705 transition font-sans text-[10.5px]"
                                      >
                                        <span className="text-sm shrink-0">💼</span>
                                        <div className="min-w-0 flex-1">
                                          <span className="font-bold text-slate-800 block truncate leading-none">Sök på Platsbanken</span>
                                          <span className="text-[9.5px] text-slate-400 truncate block mt-0.5 font-medium font-medium font-medium">Sök jobb som "{cleanRoleName}"</span>
                                        </div>
                                        <ExternalLink className="h-3 w-3 text-slate-400 shrink-0" />
                                      </a>

                                      <a
                                        href={`https://se.indeed.com/jobs?q=${encodeURIComponent(cleanRoleName)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 p-2 bg-indigo-50/20 border border-indigo-100 hover:bg-indigo-50/50 rounded-lg text-indigo-950 transition font-sans text-[10.5px] sm:col-span-2"
                                      >
                                        <span className="text-sm shrink-0">📈</span>
                                        <div className="min-w-0 flex-1">
                                          <span className="font-extrabold text-indigo-900 block truncate leading-none">Hitta jobb på Indeed</span>
                                          <span className="text-[9.5px] text-slate-500 truncate block mt-0.5 font-medium font-medium font-medium">Lediga tjänster på Indeed.se</span>
                                        </div>
                                        <ExternalLink className="h-3 w-3 text-indigo-400 shrink-0" />
                                      </a>
                                    </>
                                  )}
                                </div>

                                {step.type === "education" && step.resources && step.resources.length > 0 && (
                                  <div className="mt-2 text-xs flex flex-wrap gap-1.5 items-center">
                                    <span className="text-[9.5px] text-slate-400 font-mono font-bold mr-1">Studieresurser:</span>
                                    {step.resources.map((res: any, ri: number) => (
                                      <a 
                                        key={ri}
                                        href={res.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-200 text-indigo-600 hover:text-indigo-800 rounded-md font-mono text-[10px] font-bold shadow-2xs hover:bg-slate-50 transition cursor-pointer"
                                      >
                                        <span>{res.name}</span>
                                        <ExternalLink className="h-2.5 w-2.5 shrink-0" />
                                      </a>
                                    ))}
                                  </div>
                                )}
                              </div>

                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>
          </div>

          );
        })()}

        </div> {/* Close Block 2 Container */}
      </motion.div>
    )}

      {profileSubTab === 'profile-details' && (
        <motion.div
          key="profile-details"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.18 }}
          className="w-full animate-fade-in"
        >
          {/* BLOCK 4: MINA UPPGIFTER & CV */}
          <div 
            className="bg-slate-50/50 border border-slate-200 p-5 rounded-3xl space-y-5 animate-fade-in w-full" 
            id="profile-details-cv-panel"
          >
            <div className="flex items-center justify-between border-b border-slate-250 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">👤</span>
                <h3 className="font-extrabold text-sm uppercase text-slate-800 tracking-wide font-mono">Mina Uppgifter & CV</h3>
              </div>
              <span className="bg-white font-mono text-[9.5px] font-black text-indigo-700 border border-indigo-100 px-2 py-0.5 rounded-md">
                Profil & Dokument
              </span>
            </div>

            <div className="space-y-6 w-full">
              
              {/* Left Box: Avatar details card */}
              <div className="space-y-6">
              
              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-[0_8px_30px_rgba(15,23,42,0.015)] text-center space-y-4">
                
                <div className="relative h-20 w-20 rounded-full bg-slate-900 border-4 border-white shadow-md mx-auto flex items-center justify-center text-white font-sans font-bold text-2xl select-none group overflow-hidden">
                  {profile.avatar ? (
                    <img 
                      src={profile.avatar} 
                      alt={profile.fullName} 
                      className="h-full w-full object-cover animate-fade-in" 
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    profile.fullName ? profile.fullName.split(' ').map((n:any)=>n[0]).join('').toUpperCase().slice(0, 2) : "SJ"
                  )}
                  {/* Hover to edit overlay */}
                  <label 
                    htmlFor="avatar-file-input-sidebar" 
                    className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-[10px] font-black uppercase text-white tracking-wider cursor-pointer transition-opacity z-10"
                  >
                    <span>📷</span>
                    <span className="scale-90">Ändra</span>
                  </label>
                  <input
                    id="avatar-file-input-sidebar"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                  <span className="absolute bottom-0 right-0 h-5 w-5 bg-emerald-500 border-2 border-white rounded-full z-20"></span>
                </div>

                {avatarError && (
                  <p className="text-[10px] text-rose-500 font-bold bg-rose-50 px-2 py-1 rounded-lg animate-pulse inline-block">
                    ⚠️ {avatarError}
                  </p>
                )}

                <div className="space-y-1">
                  <h3 className="font-extrabold text-base text-slate-900 block truncate font-display">
                    {profile.fullName}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-bold font-mono">
                    {profile.currentJob || "Juniorutvecklare (Sökande)"}
                  </p>
                  <p className="text-[10px] text-slate-400 font-mono flex items-center justify-center gap-1 mt-1">
                    <MapPin className="h-3.5 w-3.5 text-slate-400" />
                    {profile.targetLocation}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-2">
                  {!isEditingProfile ? (
                    <button
                      type="button"
                      onClick={() => setIsEditingProfile(true)}
                      className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-98"
                    >
                      <span>Redigera Profil & CV 👤</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsEditingProfile(false)}
                      className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-98"
                    >
                      <span>Spara Uppgifter ✓</span>
                    </button>
                  )}

                  {/* Billing management button */}
                  <button
                    type="button"
                    onClick={() => {
                      setShowBilling(!showBilling);
                      setCancelConfirm(false);
                    }}
                    className={`w-full py-2.5 border text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-98 ${
                      showBilling 
                        ? "bg-slate-900 text-white border-slate-900 hover:bg-slate-800 dark:bg-amber-500 dark:text-slate-950 dark:hover:bg-amber-400" 
                        : "bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-200/80 dark:bg-amber-950/20 dark:hover:bg-amber-950/30 dark:text-amber-300 dark:border-amber-900/50"
                    }`}
                    id="manage-billing-button"
                  >
                    <CreditCard className="h-3.5 w-3.5" />
                    <span>{showBilling ? "Stäng Hantera Betalning ×" : "Hantera Betalning & Prenumeration 💳"}</span>
                  </button>
                </div>

                {/* Collapsible Billing Details Panel */}
                <AnimatePresence>
                  {showBilling && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-850 rounded-xl space-y-3.5 text-xs font-sans mt-2">
                        <div className="flex justify-between items-center border-b border-slate-200/60 dark:border-slate-800 pb-2">
                          <span className="font-bold text-slate-500 dark:text-slate-400">Medlemskap:</span>
                          <span className={`px-2 py-0.5 rounded-full font-black text-[10px] uppercase tracking-wide ${
                            isPremium 
                              ? isPremiumCancelled 
                                ? "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300" 
                                : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300"
                              : "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-400"
                          }`}>
                            {isPremium ? (isPremiumCancelled ? "Premium (Uppsagd)" : "Lasse Premium 💎") : "Lasse Gratis 🌟"}
                          </span>
                        </div>

                        {isPremium ? (
                          <div className="space-y-3">
                            <div className="space-y-1.5 font-mono text-[11px] text-slate-600 dark:text-slate-400 leading-normal">
                              <p className="flex justify-between">
                                <span>Giltig till:</span>
                                <strong className="text-slate-850 dark:text-slate-200 font-extrabold">2026-08-11</strong>
                              </p>
                              <p className="flex justify-between">
                                <span>Återstående tid:</span>
                                <strong className="text-slate-850 dark:text-slate-200 font-bold">31 dagar kvar</strong>
                              </p>
                              <p className="flex justify-between">
                                <span>Månadskostnad:</span>
                                <strong className="text-slate-850 dark:text-slate-200">50 SEK</strong>
                              </p>
                              <p className="flex justify-between">
                                <span>Debitering nästa månad:</span>
                                <strong className={isPremiumCancelled ? "text-rose-500 font-bold" : "text-emerald-600 dark:text-emerald-400 font-bold"}>
                                  {isPremiumCancelled ? "0 kr (Annullerad)" : "50 kr (Automatiskt)"}
                                </strong>
                              </p>
                            </div>

                            {/* Show warning if active and not cancelled */}
                            {!isPremiumCancelled && (
                              <div className="p-2.5 bg-sky-50 dark:bg-sky-950/20 border border-sky-100 dark:border-sky-900/30 rounded-lg text-[10px] text-sky-800 dark:text-sky-300 leading-normal">
                                Ditt Lasse Premium förnyas automatiskt den 2026-08-11. Du kan när som helst säga upp prenumerationen nedan för att undvika framtida avgifter.
                              </div>
                            )}

                            {isPremiumCancelled ? (
                              <div className="p-2.5 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 rounded-lg text-[10px] text-rose-800 dark:text-rose-300 leading-normal">
                                🛑 Prenumerationen är uppsagd. Du behåller full premiumåtkomst fram till den <strong>2026-08-11</strong>, därefter avslutas den och du debiteras inte igen.
                              </div>
                            ) : null}

                            {/* Cancel / Reactivate Buttons */}
                            {cancelConfirm ? (
                              <div className="p-3 bg-rose-50 dark:bg-rose-950/30 border border-rose-150 dark:border-rose-900/50 rounded-xl space-y-2.5">
                                <p className="text-[10px] text-rose-850 dark:text-rose-300 font-bold leading-normal flex gap-1 items-start">
                                  <ShieldAlert className="h-4 w-4 shrink-0 text-rose-500 mt-0.5" />
                                  <span>Är du säker på att du vill avsluta? Du kommer att förlora tillgången till Lasse AI-karriärcoach, obegränsade CV-granskningar och smarta jobbmatchningar efter din period.</span>
                                </p>
                                <div className="flex gap-2">
                                  <button
                                    type="button"
                                    onClick={async () => {
                                      setBillingSubmitting(true);
                                      setTimeout(() => {
                                        if (setIsPremiumCancelled) setIsPremiumCancelled(true);
                                        setBillingSubmitting(false);
                                        setCancelConfirm(false);
                                      }, 1000);
                                    }}
                                    disabled={billingSubmitting}
                                    className="flex-1 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-[10px] rounded-lg transition active:scale-98 cursor-pointer text-center"
                                  >
                                    {billingSubmitting ? "Avbryter..." : "Ja, avsluta prenumeration"}
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setCancelConfirm(false)}
                                    className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[10px] rounded-lg transition active:scale-98 cursor-pointer"
                                  >
                                    Avbryt
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="pt-1">
                                {!isPremiumCancelled ? (
                                  <button
                                    type="button"
                                    onClick={() => setCancelConfirm(true)}
                                    className="w-full py-2 bg-transparent hover:bg-rose-50 dark:hover:bg-rose-950/20 text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 font-extrabold rounded-lg text-[11px] transition active:scale-98 cursor-pointer border border-rose-200 dark:border-rose-900/50"
                                  >
                                    Avbryt prenumeration 🛑
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={async () => {
                                      setBillingSubmitting(true);
                                      setTimeout(() => {
                                        if (setIsPremiumCancelled) setIsPremiumCancelled(false);
                                        setBillingSubmitting(false);
                                      }, 800);
                                    }}
                                    disabled={billingSubmitting}
                                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-lg text-[11px] uppercase tracking-wide transition active:scale-98 cursor-pointer flex items-center justify-center gap-1"
                                  >
                                    {billingSubmitting ? "Aktiverar..." : "Återaktivera prenumeration ⚡"}
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="space-y-2.5 text-center py-1">
                            <p className="text-[10.5px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                              Du använder gratisversionen. Uppgradera till <strong className="text-slate-800 dark:text-white">Lasse Premium</strong> för obegränsade chattmeddelanden, professionell CV-mall, och mycket mer!
                            </p>
                            <button
                              type="button"
                              onClick={() => {
                                setShowBilling(false);
                                setActiveTab("premium");
                              }}
                              className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-lg text-[10.5px] uppercase tracking-wide transition active:scale-98 cursor-pointer"
                            >
                              Uppgradera nu 💎
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>

              {/* Stats details */}
              <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs text-xs space-y-3 font-mono">
                <span className="text-[9.5px] text-slate-400 font-black uppercase tracking-wider block">Portfoliodetaljer</span>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Angivna taggar:</span>
                  <strong className="text-slate-850 font-bold">{profile.skills.length} st</strong>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Målsektor:</span>
                  <strong className="text-slate-850 font-bold">{profile.targetRole}</strong>
                </div>
                <div className="flex justify-between items-center py-1.5">
                  <span className="text-slate-500">Uppladdade filer:</span>
                  <strong className="text-slate-850 font-bold">{uploadedDocs.length} st</strong>
                </div>
              </div>

              {/* Account, Progress Saving & Authentication Card */}
              <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs text-xs space-y-4">
                <div className="border-b border-slate-100 pb-2.5">
                  <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider block">Molnsynk & Framsteg ☁️</span>
                  <p className="text-[10px] text-slate-500 mt-1 leading-normal font-medium">
                    Spara ditt CV, din studieplan och dina matchade jobb automatiskt i molnet.
                  </p>
                </div>

                {isAuthLoading ? (
                  <div className="py-4 flex justify-center items-center">
                    <span className="h-5 w-5 border-2 border-slate-350 border-t-indigo-600 rounded-full animate-spin"></span>
                  </div>
                ) : currentUser ? (
                  <div className="space-y-3 font-sans">
                    <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl space-y-1.5">
                      <div className="flex items-center gap-1.5 text-emerald-850 font-bold text-[11px]">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span>Inloggad & Säker</span>
                      </div>
                      <p className="text-[10px] text-slate-600 font-mono break-all font-medium">
                        {currentUser.email}
                      </p>
                    </div>

                    <div className="text-[9.5px] text-slate-400 font-mono font-medium flex items-center gap-1">
                      <span>✓</span>
                      <span>Dina framsteg sparas i molnet i realtid</span>
                    </div>

                    <div className="pt-2 flex flex-col gap-1.5">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-[10.5px] cursor-pointer transition active:scale-98"
                      >
                        Logga ut 🚪
                      </button>

                      {showDeleteConfirm ? (
                        <div className="p-3 bg-rose-50 border border-rose-150 rounded-xl space-y-2 mt-2">
                          <p className="text-[10px] text-rose-800 font-bold leading-normal">
                            ⚠️ Är du helt säker? Detta kommer permanent radera ditt konto och rensa all din data från databasen. Jobb och CV förloras.
                          </p>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={handleDeleteAccount}
                              disabled={authLoading}
                              className="px-2.5 py-1.5 bg-rose-600 hover:bg-rose-750 font-bold text-white text-[9.5px] rounded-md transition cursor-pointer"
                            >
                              {authLoading ? "Raderar..." : "Ja, radera allt"}
                            </button>
                            <button
                              type="button"
                              onClick={() => setShowDeleteConfirm(false)}
                              className="px-2.5 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-[9.5px] rounded-md transition cursor-pointer"
                            >
                              Avbryt
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setShowDeleteConfirm(true)}
                          className="w-full text-center text-rose-500 hover:text-rose-600 bg-transparent py-1 font-bold text-[10px] cursor-pointer transition underline"
                        >
                          Radera mitt konto
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleAuthAction} className="space-y-3 font-sans">
                    <div className="flex bg-slate-50 border border-slate-150 p-0.5 rounded-lg">
                      <button
                        type="button"
                        onClick={() => {
                          setAuthMode("login");
                          setAuthError(null);
                        }}
                        className={`flex-1 py-1 text-[10px] font-black uppercase text-center rounded-md cursor-pointer transition-all ${authMode === 'login' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-450 hover:text-slate-755'}`}
                      >
                        Logga in
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setAuthMode("register");
                          setAuthError(null);
                        }}
                        className={`flex-1 py-1 text-[10px] font-black uppercase text-center rounded-md cursor-pointer transition-all ${authMode === 'register' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-450 hover:text-slate-755'}`}
                      >
                        Nytt konto
                      </button>
                    </div>

                    <div className="space-y-2">
                      <div className="space-y-1">
                        <label className="text-[9px] text-slate-400 font-black uppercase tracking-wide">E-post</label>
                        <input
                          type="email"
                          required
                          value={authEmail}
                          onChange={(e) => setAuthEmail(e.target.value)}
                          placeholder="namn@domän.se"
                          className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:bg-white focus:border-indigo-500 font-sans shadow-inner"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] text-slate-400 font-black uppercase tracking-wide">Lösenord</label>
                        <input
                          type="password"
                          required
                          value={authPassword}
                          onChange={(e) => setAuthPassword(e.target.value)}
                          placeholder="Minst 6 tecken"
                          className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:bg-white focus:border-indigo-500 font-sans shadow-inner"
                        />
                      </div>
                    </div>

                    {authError && (
                      <div className="p-2.5 bg-rose-50 border border-rose-150 rounded-lg text-rose-700 text-[10px] flex gap-1.5 items-start font-medium">
                        <span className="shrink-0 mt-0.5">⚠️</span>
                        <span>{authError}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={authLoading}
                      className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-350 text-white font-black uppercase tracking-wide rounded-lg text-[10px] cursor-pointer transition active:scale-98 shadow-sm flex items-center justify-center gap-1.5"
                    >
                      {authLoading ? (
                        <>
                          <span className="h-3 w-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                          <span>Behandlar...</span>
                        </>
                      ) : (
                        <span>{authMode === 'login' ? "Logga in" : "Skapa & Spara"}</span>
                      )}
                    </button>
                  </form>
                )}

                <AnimatePresence>
                  {showAuthSuccess && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-2.5 bg-emerald-50 border border-emerald-150 rounded-lg text-emerald-800 text-[9.5px] flex gap-1.5 items-start font-medium"
                    >
                      <span className="shrink-0 text-emerald-500">✓</span>
                      <span>{showAuthSuccess}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

            {/* Right Box: Form fields or static resume card */}
            <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-2xl shadow-xs">
              
              {isEditingProfile ? (
                <div className="space-y-6">
                  <div className="border-b border-slate-100 pb-3">
                    <h4 className="font-extrabold text-sm uppercase text-slate-800 tracking-wide font-display text-[13px]">Uppdatera Profiluppgifter</h4>
                    <p className="text-[11px] text-slate-405 mt-0.5">Lasse använder dessa uppgifter för att beräkna dina matchningsprocent</p>
                  </div>

                  {/* Spelling correction assistance panel */}
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                      <div>
                        <h5 className="font-bold text-xs text-slate-800 flex items-center gap-1.5 uppercase tracking-wider">
                          ✍️ Stavningshjälpmedlet (Drivs av AI)
                        </h5>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Kontrollera om ditt CV eller dina profiluppgifter innehåller stavningsfel eller tryckfel på svenska.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleCheckProfileSpelling}
                        disabled={isCheckingSpelling}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-350 text-white rounded-xl text-[11px] font-bold uppercase tracking-wider shrink-0 shadow-sm flex items-center gap-1.5 transition cursor-pointer select-none"
                      >
                        {isCheckingSpelling ? (
                          <>
                            <div className="h-3 w-3 border-2 border-white border-t-transparent animate-spin rounded-full"></div>
                            <span>ANALYS_PÅGÅR...</span>
                          </>
                        ) : (
                          <span>KONTROLLERA STAVNING 🔍</span>
                        )}
                      </button>
                    </div>

                    {spellingCheckedYet && !isCheckingSpelling && (
                      <div className="pt-2.5 border-t border-slate-200">
                        {spellingSuggestions.length === 0 ? (
                          <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-[11px]">
                            <Check className="h-4 w-4 shrink-0" />
                            <span>Fantastiskt jobb! Inga stavfel eller tryckfel upptäcktes i dina uppgifter. Allt ser helt rent ut! 👍</span>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-[11px] text-amber-805 font-extrabold uppercase tracking-wide">
                                ⚠️ Hittade {spellingSuggestions.length} stavningsfel:
                              </span>
                              <button
                                type="button"
                                onClick={handleApplyAllCorrections}
                                className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white text-[10px] font-black uppercase rounded-lg transition-all shadow-xs cursor-pointer select-none"
                              >
                                Åtgärda Alla Automatisk 🔧
                              </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-[220px] overflow-y-auto pr-1">
                              {spellingSuggestions.map((sug, s_idx) => {
                                // Translate internal key name to fancy Swedish label
                                const fieldLabels: Record<string, string> = {
                                  fullName: "Namn",
                                  currentJob: "Yrkesroll",
                                  targetRole: "Yrkesmål",
                                  education: "Utbildning",
                                  certifications: "Certifikat",
                                  cvText: "Om mig",
                                  experience: "Erfarenhet",
                                  interests: "Intressen"
                                };
                                const translatedField = fieldLabels[sug.field] || sug.field;

                                return (
                                  <div key={s_idx} className="p-2.5 bg-amber-50 border border-amber-150 rounded-lg text-[11px] flex flex-col justify-between gap-1.5 font-sans">
                                    <div className="space-y-1">
                                      <div className="flex items-center justify-between">
                                        <span className="text-[9px] bg-amber-100/80 text-amber-800 font-black px-1.5 py-0.5 rounded uppercase tracking-wider">
                                          {translatedField}
                                        </span>
                                        <span className="text-[10px] text-slate-400 line-through decoration-red-500 font-semibold">
                                          "{sug.original}"
                                        </span>
                                      </div>
                                      <p className="text-slate-800 leading-normal font-medium">
                                        Föreslås: <strong className="text-emerald-700 font-bold bg-emerald-50 px-1 py-0.5 rounded">"{sug.correction}"</strong>
                                      </p>
                                      {sug.reason && (
                                        <p className="text-[10px] text-slate-500 font-sans italic">
                                          💡 {sug.reason}
                                        </p>
                                      )}
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => handleApplyCorrection(sug.field, sug.original, sug.correction)}
                                      className="w-full mt-1 px-2 py-1 bg-white hover:bg-amber-100 border border-amber-200 text-amber-850 hover:text-amber-950 font-bold rounded-md transition text-[10px] cursor-pointer"
                                    >
                                      Rätta fältet ✓
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                    
                    {/* Profilbild Upload Row */}
                    <div className="sm:col-span-2 p-4 bg-slate-50/50 border border-slate-200 rounded-xl space-y-3">
                      <span className="text-[10px] text-slate-500 uppercase font-bold block tracking-wider">Profilbild (frivilligt)</span>
                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="h-16 w-16 rounded-full bg-slate-900 border-2 border-white shadow-xs flex items-center justify-center text-white font-sans font-bold text-sm overflow-hidden shrink-0 select-none">
                          {profile.avatar ? (
                            <img src={profile.avatar} alt="Profilbild" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                          ) : (
                            "INGEN"
                          )}
                        </div>
                        <div className="space-y-2 flex-1 text-center sm:text-left">
                          <input
                            type="file"
                            accept="image/*"
                            id="edit-form-avatar-picker"
                            className="hidden"
                            onChange={handleAvatarUpload}
                          />
                          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                            <button
                              type="button"
                              onClick={() => document.getElementById("edit-form-avatar-picker")?.click()}
                              className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-[10.5px] font-bold text-slate-800 transition cursor-pointer select-none"
                            >
                              Välj bild...
                            </button>
                            {profile.avatar && (
                              <button
                                type="button"
                                onClick={() => handleProfileLocalChange("avatar", null)}
                                className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-650 rounded-lg text-[10.5px] font-bold transition cursor-pointer select-none"
                              >
                                Ta bort bild
                              </button>
                            )}
                          </div>
                          <p className="text-[9px] text-slate-400 font-sans leading-relaxed">Format som JPEG, PNG eller WebP stöds. Maxstorlek 2 MB.</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 uppercase font-black block mb-1">Fullständigt namn</label>
                      <input
                        type="text"
                        value={profile.fullName}
                        onChange={(e) => handleProfileLocalChange("fullName", e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all rounded-xl text-slate-800 font-sans text-xs font-semibold"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 uppercase font-black block mb-1">Nuvarande Sysselsättning</label>
                      <input
                        type="text"
                        value={profile.currentJob || ""}
                        onChange={(e) => handleProfileLocalChange("currentJob", e.target.value)}
                        placeholder="t.ex. Arbetssökande, Vårdbiträde, Junior IT"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all rounded-xl text-slate-800 font-sans text-xs font-semibold"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 uppercase font-black block mb-1">Inriktning / Yrkesmål</label>
                      <input
                        type="text"
                        value={profile.targetRole}
                        onChange={(e) => handleProfileLocalChange("targetRole", e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all rounded-xl text-slate-800 font-sans text-xs font-semibold"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 uppercase font-black block mb-1">Län i Sverige</label>
                      <select
                        value={profile.targetLocation}
                        onChange={(e) => handleProfileLocalChange("targetLocation", e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all rounded-xl text-slate-800 font-sans text-xs cursor-pointer font-semibold text-slate-800"
                      >
                        {SWEDEN_REGIONS.map((reg, ri) => (
                          <option key={ri} value={reg}>{reg}</option>
                        ))}
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-[10px] text-slate-400 uppercase font-black block mb-1">Akademisk Utbildning / YH-nivå</label>
                      <input
                        type="text"
                        value={profile.education}
                        onChange={(e) => handleProfileLocalChange("education", e.target.value)}
                        placeholder="t.ex. Gymnasieexamen, YH-examen (2 år), Kandidatexamen Datavetenskap"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all rounded-xl text-slate-800 font-sans text-xs font-semibold"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-[10px] text-slate-400 uppercase font-black block mb-1">Licenser & Bevis (t.ex. Körkort B, Legitimation)</label>
                      <input
                        type="text"
                        value={profile.certifications}
                        onChange={(e) => handleProfileLocalChange("certifications", e.target.value)}
                        placeholder="t.ex. B-Körkort, ECY-certifikat, Legitimerad fackledare"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all rounded-xl text-slate-800 font-sans text-xs font-semibold"
                      />
                    </div>

                    {/* KÖRKORT & FORDONSKORT EDIT (NEW) */}
                    <div className="sm:col-span-2 border-t border-slate-100 pt-4" id="driver-licenses-profile-edit-section">
                      <div>
                        <label className="text-[10px] text-indigo-650 text-indigo-600 font-bold uppercase tracking-wider block mb-1">Körkort, Fordonskort & Maskinbevis</label>
                        <p className="text-slate-400 text-[10.5px] leading-relaxed mb-3">
                          Körkortskrav finns i nästan 30% av alla platsannonser i Sverige. Bocka i dina aktiva behörigheter:
                        </p>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3.5" id="profile-licenses-edit-grid">
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
                          const currentLicenses = profile.driverLicenses || [];
                          const isSelected = currentLicenses.includes(item.value);
                          return (
                            <button
                              key={item.value}
                              type="button"
                              onClick={() => {
                                if (isSelected) {
                                  handleProfileLocalChange("driverLicenses", currentLicenses.filter((x: string) => x !== item.value));
                                } else {
                                  handleProfileLocalChange("driverLicenses", [...currentLicenses, item.value]);
                                }
                              }}
                              className={`px-3 py-2 rounded-xl border text-[11px] font-semibold text-left transition-all relative flex items-center justify-between cursor-pointer group active:scale-97 ${
                                isSelected
                                  ? "bg-indigo-600 border-indigo-600 text-white shadow-xs font-bold"
                                  : "bg-slate-50 hover:bg-slate-100/80 border-slate-205 text-slate-700"
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

                      {/* Manual other license input */}
                      <div className="space-y-1.5 bg-slate-50 border border-slate-200/60 p-3 rounded-xl" id="profile-custom-license-block">
                        <label className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider block">Andra fordon/maskinkort (T.ex. lastbilsmonterad kran, truck C, grävmaskin...)</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={profileCustomLicenseInput}
                            onChange={(e) => setProfileCustomLicenseInput(e.target.value)}
                            placeholder="t.ex. Säkra Lyft, Truck C, Hjullastare C"
                            className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:border-indigo-500 font-medium text-slate-800"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                const val = profileCustomLicenseInput.trim();
                                if (val) {
                                  const currentLicenses = profile.driverLicenses || [];
                                  if (!currentLicenses.includes(val)) {
                                    handleProfileLocalChange("driverLicenses", [...currentLicenses, val]);
                                    setProfileCustomLicenseInput("");
                                  }
                                }
                              }
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const val = profileCustomLicenseInput.trim();
                              if (val) {
                                const currentLicenses = profile.driverLicenses || [];
                                if (!currentLicenses.includes(val)) {
                                  handleProfileLocalChange("driverLicenses", [...currentLicenses, val]);
                                  setProfileCustomLicenseInput("");
                                }
                              }
                            }}
                            className="px-3 bg-indigo-600 text-white font-extrabold text-[10.5px] uppercase tracking-wider rounded-xl hover:bg-indigo-700 active:scale-95 transition-all cursor-pointer flex items-center gap-1 shrink-0"
                          >
                            <span>+ Lägg till</span>
                          </button>
                        </div>

                        {/* Display custom licenses in profile edit */}
                        {(() => {
                          const currentLicenses = profile.driverLicenses || [];
                          const customLicenses = currentLicenses.filter((lic: string) => ![
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
                            <div className="flex flex-wrap gap-1.5 pt-1.5">
                              {customLicenses.map((lic: string) => (
                                <span key={lic} className="bg-white border border-indigo-200 text-indigo-900 px-2 py-0.5 rounded-lg text-[10px] font-bold flex items-center gap-1">
                                  <span>{lic}</span>
                                  <button
                                    type="button"
                                    onClick={() => handleProfileLocalChange("driverLicenses", currentLicenses.filter((x: string) => x !== lic))}
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

                    <div>
                      <label className="text-[10px] text-slate-400 uppercase font-black block mb-1">E-postadress</label>
                      <input
                        type="email"
                        value={profile.email || ""}
                        onChange={(e) => handleProfileLocalChange("email", e.target.value)}
                        placeholder="t.ex. din.mail@example.se"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all rounded-xl text-slate-800 font-sans text-xs font-semibold"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 uppercase font-black block mb-1">Telefonnummer</label>
                      <input
                        type="tel"
                        value={profile.phone || ""}
                        onChange={(e) => handleProfileLocalChange("phone", e.target.value)}
                        placeholder="t.ex. 070-123 45 67"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all rounded-xl text-slate-800 font-sans text-xs font-semibold"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-[10px] text-slate-400 uppercase font-black block mb-1">Språkkunskaper</label>
                      <input
                        type="text"
                        value={profile.languages || ""}
                        onChange={(e) => handleProfileLocalChange("languages", e.target.value)}
                        placeholder="t.ex. Svenska (Modersmål), Engelska (Flytande)"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all rounded-xl text-slate-800 font-sans text-xs font-semibold"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-[10px] text-slate-400 uppercase font-black block mb-1">Sammanfattning / Om mig (Kort presentation)</label>
                      <textarea
                        value={profile.cvText || ""}
                        onChange={(e) => handleProfileLocalChange("cvText", e.target.value)}
                        rows={3}
                        placeholder="Skriv en kort, professionell inledning om dig själv..."
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all rounded-xl text-slate-800 font-sans text-xs font-medium leading-relaxed resize-y"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-[10px] text-slate-400 uppercase font-black block mb-1">Arbetslivserfarenhet (Historik, en rad per post)</label>
                      <textarea
                        value={profile.experience || ""}
                        onChange={(e) => handleProfileLocalChange("experience", e.target.value)}
                        rows={4}
                        placeholder="Företag & Roll (År). Beskrivning av dina arbetsuppgifter..."
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all rounded-xl text-slate-800 font-sans text-xs font-medium leading-relaxed resize-y"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-[10px] text-slate-400 uppercase font-black block mb-1">Särskilda Intressen eller Fältfokus</label>
                      <textarea
                        value={profile.interests || ""}
                        onChange={(e) => handleProfileLocalChange("interests", e.target.value)}
                        rows={2}
                        placeholder="t.ex. Modern frontend, server-side utveckling, molndistribution..."
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all rounded-xl text-slate-800 font-sans text-xs font-medium leading-relaxed resize-y"
                      />
                    </div>
                  </div>

                  {/* Skills tags editing */}
                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-440 font-mono uppercase block font-black mb-1">Mina Kompetensnyckelord (Taggar)</label>
                    <div className="flex flex-wrap gap-1.5 p-3 bg-slate-50 border border-slate-200 rounded-xl max-h-[140px] overflow-y-auto">
                      {profile.skills.map((skill: string, si: number) => (
                        <span key={si} className="bg-white hover:bg-rose-50 text-slate-850 px-2.5 py-1 rounded-md border border-slate-205 text-[10px] font-mono flex items-center gap-1.5 transition-colors">
                          <span className="h-1.5 w-1.5 rounded-full bg-indigo-550 bg-indigo-500"></span>
                          <span>{skill}</span>
                          <button 
                            type="button" 
                            onClick={() => handleRemoveSkill(skill)}
                            className="text-slate-450 hover:text-red-650 font-black ml-1 cursor-pointer"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-2 font-mono">
                      <input
                        type="text"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Lägg till kompetensnyckelord..."
                        className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all rounded-xl text-xs font-sans"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddSkill();
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={handleAddSkill}
                        className="px-4 py-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition cursor-pointer flex items-center justify-center shadow-xs"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* CV documents & supporting uploads */}
                  <div className="space-y-3 pt-4 border-t border-slate-100 font-mono text-[11px]">
                    <div>
                      <label className="text-[10px] text-slate-400 uppercase font-black">Ladda upp betyg / fackbevis / CV</label>
                      <p className="text-[10px] text-slate-450 font-sans mt-0.5">Dessa indexeras automatiskt av karriärcoachen</p>
                    </div>

                    <div 
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                      className={`border-2 border-dashed rounded-xl p-4 text-center text-xs transition relative ${
                        dragActive ? 'border-indigo-500 bg-indigo-50/15' : 'border-slate-205 hover:border-slate-350 bg-slate-50/40'
                      }`}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,.txt"
                        className="hidden"
                      />
                      <div className="space-y-1.5 cursor-pointer text-slate-500" onClick={() => fileInputRef.current?.click()}>
                        <Upload className="h-5 w-5 text-slate-450 mx-auto" />
                        <p className="font-bold text-slate-700 font-sans">Klicka eller dra hit för att ladda upp</p>
                        <p className="text-[9.5px] text-slate-400 font-sans">PDF, TXT eller Word-dokument upp till 10 MB</p>
                      </div>
                    </div>

                    {uploadedDocs.length > 0 && (
                      <div className="space-y-1.5">
                        <span className="text-[9px] text-slate-400 font-black uppercase tracking-wider block">Uppladdade bilagor ({uploadedDocs.length}):</span>
                        <div className="divide-y divide-slate-100 border border-slate-150 rounded-xl overflow-hidden bg-white">
                          {uploadedDocs.map((doc, idx) => (
                            <div key={idx} className="p-2.5 flex items-center justify-between text-[11px] gap-2 font-sans font-medium">
                              <div className="flex items-center gap-2 min-w-[0px] flex-1">
                                <FileText className="h-4 w-4 text-slate-450 shrink-0" />
                                <span className="font-bold text-slate-800 truncate leading-none">{doc.name}</span>
                                <span className="text-slate-400 shrink-0 font-mono text-[9px]">({doc.size})</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  setUploadedDocs(prev => prev.filter((_, i) => i !== idx));
                                }}
                                className="text-red-500 hover:text-red-700 font-bold px-1.5 text-xs font-sans shrink-0 hover:bg-slate-50 rounded"
                              >
                                Ta bort
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-3">
                    <button
                      type="button"
                      onClick={() => setIsEditingProfile(false)}
                      className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    >
                      <span>Spara Uppgifter ✓</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  
                  {/* CV Sub-navigation Bar */}
                  <div className="flex flex-col sm:flex-row border-b border-slate-100 pb-3 justify-between items-start sm:items-center gap-3">
                    <div className="flex gap-1 p-1 bg-slate-100/60 rounded-xl">
                      <button
                        type="button"
                        onClick={() => setCvSectionTab('preview')}
                        className={`px-3.5 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                          cvSectionTab === 'preview'
                            ? 'bg-white text-slate-900 shadow-xs'
                            : 'text-slate-500 hover:text-slate-900'
                        }`}
                      >
                        <span>📄</span>
                        <span>CV-förhandsgranskning & PDF</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setCvSectionTab('data')}
                        className={`px-3.5 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                          cvSectionTab === 'data'
                            ? 'bg-white text-slate-900 shadow-xs'
                            : 'text-slate-500 hover:text-slate-900'
                        }`}
                      >
                        <span>📊</span>
                        <span>Mina Sifferuppgifter & Bilagor</span>
                      </button>
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => setIsEditingProfile(true)}
                      className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition cursor-pointer select-none flex items-center gap-1 shadow-xs active:scale-97"
                    >
                      <span>Redigera CV</span>
                      <span>👤</span>
                    </button>
                  </div>

                  {cvSectionTab === 'preview' ? (
                    <div className="space-y-6">
                      
                      {/* CV Design Controls Card */}
                      <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4 font-sans text-xs">
                        <div className="space-y-1.5 text-center md:text-left">
                          <span className="font-bold text-slate-800 block text-xs">Välj ett svenskt designtema:</span>
                          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                            {[
                              { id: "navy", name: "Marinblå", bg: "bg-indigo-900" },
                              { id: "slate", name: "Antracit", bg: "bg-slate-950" },
                              { id: "forest", name: "Skogsgrön", bg: "bg-emerald-900" },
                              { id: "burgundy", name: "Bourgogne", bg: "bg-rose-950" }
                            ].map((themeItem) => (
                              <button
                                key={themeItem.id}
                                type="button"
                                onClick={() => setCvTheme(themeItem.id as any)}
                                className={`px-2.5 py-1.5 rounded-lg border text-[10px] font-bold transition flex items-center gap-1.5 cursor-pointer ${
                                  cvTheme === themeItem.id
                                    ? 'bg-slate-900 text-white border-slate-900'
                                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                                }`}
                              >
                                <span className={`h-2.5 w-2.5 rounded-full ${themeItem.bg} shrink-0`}></span>
                                {themeItem.name}
                              </button>
                            ))}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={generatePDF}
                          className="w-full md:w-auto px-5 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer hover:shadow-lg active:scale-97 select-none"
                        >
                          <Download className="h-4.5 w-4.5 text-white" />
                          <span>Ladda ned professionellt CV (PDF)</span>
                        </button>
                      </div>

                      {/* Lasse AI CV Adaptive Tailorer Promo Box */}
                      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg relative overflow-hidden text-white font-sans">
                        <div className="absolute top-0 right-0 h-40 w-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="absolute -bottom-10 -left-10 h-40 w-40 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none"></div>

                        <div className="relative flex flex-col md:flex-row items-center justify-between gap-5">
                          <div className="space-y-3 max-w-xl text-center md:text-left">
                            <div className="flex items-center gap-2.5 justify-center md:justify-start">
                              <span className="flex items-center justify-center h-8 w-8 rounded-lg bg-indigo-600 text-white text-base shadow-xs">💬</span>
                              <div>
                                <h4 className="font-extrabold text-sm text-slate-100 flex items-center gap-1.5 leading-none">
                                  Skriv och anpassa ditt CV direkt i chatten!
                                </h4>
                                <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">Superkraft från Lasse-AI ⚡</span>
                              </div>
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed font-medium">
                              Lasse har nu full tillgång till ditt CV under era samtal. Du kan enkelt be honom lägga till nya kompetenser, skriva om din profil, uppdatera yrkesmål eller bygga fylliga beskrivningar för dina anställningar direkt från chatten!
                            </p>
                          </div>

                          {onStartChatWithLasse && (
                            <button
                              type="button"
                              onClick={() => {
                                onStartChatWithLasse("Hej Lasse! Jag vill att du hjälper mig att skriva mitt CV. Kan du titta på min nuvarande profil och föreslå förbättringar eller skriva om min profil?");
                              }}
                              className="w-full md:w-auto px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 shrink-0 shadow-lg active:scale-97 select-none cursor-pointer"
                            >
                              <span>Prata med Lasse om mitt CV 🦌</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Visual paper-sheet A4-aspect preview */}
                      <div className="relative max-w-[700px] mx-auto bg-white border border-slate-200 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] overflow-hidden font-sans flex text-[11px] leading-relaxed text-slate-800 select-none min-h-[750px]">
                        
                        {/* Interactive Sidebar Preview (Col 1: Width 32%) */}
                        <div className={`w-[32%] ${
                          cvTheme === 'navy' ? 'bg-indigo-950' :
                          cvTheme === 'slate' ? 'bg-slate-900' :
                          cvTheme === 'forest' ? 'bg-emerald-950' : 'bg-rose-950'
                        } text-white p-5 space-y-6 flex flex-col shrink-0`}>
                          
                          {/* Circle Avatar badge */}
                          <div className="text-center space-y-2 mt-2">
                            {profile.avatar ? (
                              <div className="h-16 w-16 rounded-xl border border-white/30 overflow-hidden mx-auto bg-slate-100 flex items-center justify-center shadow-xs">
                                <img src={profile.avatar} alt={profile.fullName} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                              </div>
                            ) : (
                              <div className="h-14 w-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-bold text-base mx-auto">
                                {profile.fullName ? profile.fullName.split(' ').map((n:any)=>n[0]).join('').toUpperCase().slice(0, 2) : "SJ"}
                              </div>
                            )}
                            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-300 block">MERITFÖRTECKNING</span>
                          </div>

                          {/* Contact list */}
                          <div className="space-y-4 pt-2 text-[10px]">
                            <div className="border-b border-white/20 pb-1">
                              <span className="font-extrabold uppercase tracking-wider block text-slate-300">Kontakt</span>
                            </div>
                            <div className="space-y-2">
                              <p className="break-all">🏡 <strong>Ort:</strong> {profile.targetLocation}</p>
                              <p className="break-all">📧 <strong>E-post:</strong> {profile.email || "sven.johansson@example.se"}</p>
                              <p className="break-all">📞 <strong>Tel:</strong> {profile.phone || "+46 70 123 45 67"}</p>
                            </div>
                          </div>

                          {/* Languages list */}
                          <div className="space-y-2 text-[10px]">
                            <div className="border-b border-white/20 pb-1">
                              <span className="font-extrabold uppercase tracking-wider block text-slate-300">Språk</span>
                            </div>
                            <p className="leading-tight text-slate-200">{profile.languages || "Svenska (Modersmål), Engelska (Flytande)"}</p>
                          </div>

                          {/* Skills list */}
                          <div className="space-y-3 text-[10px] flex-1">
                            <div className="border-b border-white/20 pb-1">
                              <span className="font-extrabold uppercase tracking-wider block text-slate-300">Kompetenser</span>
                            </div>
                            <div className="flex flex-col gap-1.5">
                              {(profile.skills && profile.skills.length > 0 ? profile.skills : ["React", "TypeScript", "JavaScript", "SQL", "Git"]).slice(0, 9).map((sk: string, i: number) => (
                                <div key={i} className="flex items-center gap-1.5 text-slate-100">
                                  <span className="h-1.5 w-1.5 rounded-full bg-white shrink-0" />
                                  <span className="truncate">{sk}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="text-[8px] text-center text-slate-400 font-mono mt-auto pt-4 border-t border-white/10">
                            Utformat enligt svensk standard
                          </div>
                        </div>

                        {/* Interactive Main Body Column */}
                        <div className="flex-1 p-6 space-y-5 bg-white text-slate-800 flex flex-col justify-start">
                          
                          {/* Name Header */}
                          <div className="space-y-1 pb-3 border-b border-slate-100">
                            <h3 className="text-xl font-extrabold text-slate-900 block tracking-tight">
                              {profile.fullName}
                            </h3>
                            <p className={`text-xs uppercase font-extrabold tracking-wide ${
                              cvTheme === 'navy' ? 'text-indigo-600' :
                              cvTheme === 'slate' ? 'text-slate-600' :
                              cvTheme === 'forest' ? 'text-emerald-700' : 'text-rose-700'
                            }`}>
                              {profile.targetRole}
                            </p>
                            <p className="text-[10px] text-slate-400 italic">
                              Nuvarande situation: {profile.currentJob || "Arbetssökande / Studerande"}
                            </p>
                          </div>

                          {/* About Section */}
                          <div className="space-y-1.5">
                            <h4 className="text-[11px] font-extrabold text-slate-900 uppercase tracking-wider pl-1 border-l-2 border-slate-250">Om mig & Profil</h4>
                            <p className="text-[10.5px] text-slate-600 leading-relaxed pl-1 font-medium bg-slate-50/40 p-2 rounded-lg border border-slate-100">
                              {profile.cvText || "Sven Johansson. Erfaren frontend-utvecklare som söker en roll i Sverige."}
                            </p>
                          </div>

                          {/* Work Experience chronology timeline */}
                          <div className="space-y-2">
                            <h4 className="text-[11px] font-extrabold text-slate-900 uppercase tracking-wider pl-1 border-l-2 border-slate-250">Arbetslivserfarenhet</h4>
                            <div className="space-y-3.5 pl-1.5 text-[10.5px]">
                              {(profile.experience || "Ingen registrerad meritförteckning.").split('\n').filter((l:string)=>l.trim()).map((lineText: string, li: number) => {
                                const isHeader = lineText.toLowerCase().includes("utvecklare") || lineText.toLowerCase().includes("praktik") || lineText.toLowerCase().includes("säljare") || lineText.toLowerCase().includes("sjuksköterska") || lineText.toLowerCase().includes("kock") || lineText.includes("(");
                                return (
                                  <div key={li} className="relative pl-3.5 border-l-2 border-slate-100 hover:border-slate-300 transition-colors py-0.5">
                                    <span className={`absolute -left-[5px] top-1.5 h-2 w-2 rounded-full ${
                                      cvTheme === 'navy' ? 'bg-indigo-500' :
                                      cvTheme === 'slate' ? 'bg-slate-500' :
                                      cvTheme === 'forest' ? 'bg-emerald-500' : 'bg-rose-500'
                                    } shrink-0`} />
                                    {isHeader ? (
                                      <strong className="text-slate-900 block font-bold leading-tight">{lineText}</strong>
                                    ) : (
                                      <p className="text-slate-600 leading-relaxed font-normal">{lineText}</p>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Education section */}
                          <div className="space-y-1.5">
                            <h4 className="text-[11px] font-extrabold text-slate-900 uppercase tracking-wider pl-1 border-l-2 border-slate-250">Utbildning</h4>
                            <div className="bg-slate-50/50 border border-slate-100 p-2.5 rounded-lg text-slate-755 space-y-1.5">
                              {(profile.education || "Ingen formell utbildning angiven.").split('\n').filter((l:string)=>l.trim()).map((eduLine: string, eduIdx: number) => (
                                <p key={eduIdx} className="text-slate-800 leading-tight font-medium">• {eduLine}</p>
                              ))}
                            </div>
                          </div>

                          {/* Certifications if present */}
                          {profile.certifications && (
                            <div className="space-y-1.5 bg-indigo-50/10 p-2.5 rounded-lg border border-indigo-100/40">
                              <h4 className="text-[10px] font-extrabold text-slate-905 uppercase tracking-wider pl-1">Certifieringar & Meriter</h4>
                              <div className="text-slate-700 space-y-1">
                                {profile.certifications.split('\n').filter((l:string)=>l.trim()).map((certLine: string, cIdx: number) => (
                                  <p key={cIdx} className="text-slate-705 font-medium text-[10px]">• {certLine}</p>
                                ))}
                              </div>
                            </div>
                          )}

                           {/* Driver Licenses if present */}
                          {profile.driverLicenses && profile.driverLicenses.length > 0 && (
                            <div className="space-y-1.5 bg-indigo-50/10 p-2.5 rounded-lg border border-indigo-100/40">
                              <h4 className="text-[10px] font-extrabold text-indigo-900 uppercase tracking-wider pl-1 font-bold">Körkort & Behörigheter</h4>
                              <div className="flex flex-wrap gap-1">
                                {Array.from(new Set(profile.driverLicenses)).map((lic: string) => (
                                  <span key={lic} className="bg-indigo-100/60 text-indigo-950 px-2 py-0.5 rounded text-[9px] font-bold">
                                    {lic}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Interests if present */}
                          {profile.interests && (
                            <div className="space-y-1 text-slate-500 text-[10px] mt-auto">
                              <span className="font-extrabold uppercase text-slate-700 block text-[9px] tracking-wider">Särskilda Intressen</span>
                              <p className="italic leading-normal pl-0.5">{profile.interests}</p>
                            </div>
                          )}

                        </div>
                      </div>
                    </div>
                  ) : (
                    
                    /* View Details Block (Legacy Tab: Data Grid & Bilagor) */
                    <div className="space-y-6">
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-xs">
                        <div className="p-4 bg-slate-50/50 border border-slate-150 rounded-xl space-y-1">
                          <span className="text-[9px] text-slate-400 font-mono font-bold uppercase block">Nuvarande roll / situation:</span>
                          <span className="text-xs text-slate-800 font-bold block">{profile.currentJob || "Arbetssökande"}</span>
                        </div>

                        <div className="p-4 bg-slate-50/50 border border-slate-150 rounded-xl space-y-1">
                          <span className="text-[9px] text-slate-400 font-mono font-bold uppercase block">Inriktning & Målkarriär:</span>
                          <span className="text-xs text-slate-800 font-bold block">{profile.targetRole}</span>
                        </div>

                        <div className="p-4 bg-slate-50/50 border border-slate-150 rounded-xl space-y-1 sm:col-span-2">
                          <span className="text-[9px] text-slate-400 font-mono font-bold uppercase block">E-post & Mobilkontakt:</span>
                          <span className="text-xs text-slate-800 font-bold block leading-relaxed">
                            {profile.email || "Ingen e-post"} • {profile.phone || "Inget telefonnummer"}
                          </span>
                        </div>

                        <div className="p-4 bg-slate-50/50 border border-slate-150 rounded-xl space-y-1 sm:col-span-2">
                          <span className="text-[9px] text-slate-400 font-mono font-bold uppercase block">Högsta utbildning / Särskild behörighet:</span>
                          <span className="text-xs text-slate-800 font-bold block leading-relaxed">{profile.education || "Ingen formell utbildning angiven."}</span>
                        </div>

                        <div className="p-4 bg-slate-50/50 border border-slate-150 rounded-xl space-y-1 sm:col-span-2">
                          <span className="text-[9px] text-slate-400 font-mono font-bold uppercase block">Certifikat & Övrigt:</span>
                          <span className="text-xs text-slate-800 font-bold block leading-relaxed">{profile.certifications || "Inga angivna certifikat."}</span>
                        </div>

                        <div className="p-4 bg-slate-50/50 border border-slate-150 rounded-xl space-y-1 sm:col-span-2">
                          <span className="text-[9px] text-slate-400 font-mono font-bold uppercase block">Körkort, Fordonskort & Maskinbevis:</span>
                          {profile.driverLicenses && profile.driverLicenses.length > 0 ? (
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {Array.from(new Set(profile.driverLicenses)).map((lic: string) => (
                                <span key={lic} className="bg-indigo-550/10 bg-indigo-50 border border-indigo-100 text-indigo-950 px-2.5 py-1 rounded-xl text-[10.5px] font-bold">
                                  {lic}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-xs text-slate-800 font-bold block leading-relaxed">Inga angivna körkort/fordonskort.</span>
                          )}
                        </div>
                      </div>

                      {/* Tag list */}
                      <div className="space-y-2">
                        <span className="text-[9px] text-slate-400 font-mono font-bold block uppercase">Kompetensprofil (Aktiva nyckelord):</span>
                        <div className="flex flex-wrap gap-1.5">
                          {profile.skills.map((skill: string, si: number) => (
                            <span key={si} className="bg-slate-50 border border-slate-200/80 text-slate-800 px-3 py-1 rounded-lg text-[10.5px] font-mono font-medium flex items-center gap-1.5">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                              <span>{skill}</span>
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Supporting files */}
                      <div className="space-y-2 pt-2">
                        <span className="text-[9px] text-slate-400 font-mono font-bold block uppercase">Dina uppladdade CV:n & dokument:</span>
                        {uploadedDocs.length > 0 ? (
                          <div className="divide-y divide-slate-100 border border-slate-150 rounded-xl overflow-hidden bg-white">
                            {uploadedDocs.map((doc, idx) => (
                              <div key={idx} className="p-3 flex items-center gap-2.5 text-[11px] font-sans">
                                <FileText className="h-4.5 w-4.5 text-indigo-500 shrink-0" />
                                <div className="min-w-[0px] flex-1">
                                  <span className="font-bold text-slate-800 block truncate leading-tight">{doc.name}</span>
                                  <span className="text-[10px] text-slate-400 font-mono block mt-0.5">{doc.size} • Verifierad underlag</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-[11px] text-slate-405 italic">Inga uppladdade filer eller betygskompletteringar spårade lokalt.</p>
                        )}
                      </div>

                    </div>
                  )}

                </div>
              )}

            </div>

          </div> {/* Close internal details content */}

        </div> {/* Close BLOCK 4 (Mina Uppgifter & CV) */}
      </motion.div>
    )}

    {profileSubTab === 'shortage-matching' && (
      <motion.div
        key="shortage-matching"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.2 }}
        className="space-y-6"
      >
        <div className="space-y-6 w-full font-sans">
            
            {/* Shortage Intro Statement (Full-width, polished) */}
            <div className="bg-gradient-to-br from-indigo-900 to-indigo-950 text-white p-6 rounded-3xl shadow-md border border-indigo-850 space-y-2 relative overflow-hidden">
              <div className="absolute right-[-15px] bottom-[-15px] text-indigo-800/10 text-8xl font-black font-display pointer-events-none select-none">
                SE
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl">🔥</span>
                <span className="text-[10px] bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 px-2 py-0.5 rounded-md font-mono font-bold uppercase animate-pulse">
                  KRITISK ARBETSKRAFTBRIST
                </span>
              </div>
              <h3 className="text-sm font-black font-display tracking-tight leading-snug">
                Arbetsmarknadens Största Behov
              </h3>
              <p className="text-[11.5px] text-indigo-150 leading-relaxed max-w-3xl">
                Det enklaste sättet att göra karriär eller skola om sig är att satsa på yrken där arbetsgivare letar febrilt efter personal. Dessa kallas <strong className="text-white font-bold">bristyrken</strong>. Lasse har matchat din profil mot officiella krav samt Platsbankens annonser.
              </p>
            </div>

            {/* Combined Gridbox Filter Panel for all controls */}
            <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-[0_8px_30px_rgba(15,23,42,0.012)] space-y-5 w-full">
              <div className="border-b border-slate-100 pb-3 flex flex-wrap items-center justify-between gap-2.5">
                <div>
                  <h4 className="font-extrabold text-xs uppercase text-slate-800 tracking-wide font-display">Matchningsmotor & filter</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5 font-sans">Välj branscher, kravnivåer och löneanspråk på en och samma rad</p>
                </div>
                
                {/* Reset button shown if filters are active */}
                {(selectedShortageIndustry !== "Alla" || shortageProfileOnly || shortageNoEduRequired || shortageNoExpRequired || shortageMinSalary > 20000) && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedShortageIndustry("Alla");
                      setShortageProfileOnly(false);
                      setShortageNoEduRequired(false);
                      setShortageNoExpRequired(false);
                      setShortageMinSalary(20000);
                    }}
                    className="text-[10.5px] text-indigo-650 hover:text-white font-black hover:bg-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-xl border border-indigo-100 transition-all cursor-pointer shadow-3xs"
                  >
                    <span>🔄 Återställ alla filter</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* Grid Element 1: Bransch/Sektor */}
                <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-150/55 space-y-3 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] bg-slate-200 text-slate-600 font-mono font-bold px-1.5 py-0.5 rounded">1</span>
                      <h5 className="text-[11px] font-extrabold text-slate-700">Välj branschområde</h5>
                    </div>
                    <p className="text-[9.5px] text-slate-400 leading-snug">Avgränsa matchningen till din sektor</p>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 pt-2 max-h-[192px] overflow-y-auto pr-1.5 scrollbar-thin scrollbar-thumb-slate-200">
                    {[
                      "Alla",
                      "Administration, ekonomi, juridik",
                      "Bygg och anläggning",
                      "Chefer och verksamhetsledare",
                      "Data/IT",
                      "Försäljning, inköp, marknadsföring",
                      "Hantverk",
                      "Hotell, restaurang, storhushåll",
                      "Hälso- och sjukvård",
                      "Industriell tillverkning",
                      "Installation, drift, underhåll",
                      "Kropps- och skönhetsvård",
                      "Kultur, media, design",
                      "Militära yrken",
                      "Naturbruk",
                      "Naturvetenskap",
                      "Pedagogik",
                      "Sanering och renhållning",
                      "Säkerhet och bevakning",
                      "Transport, distribution, lager",
                      "Yrken med social inriktning",
                      "Yrken med teknisk inriktning"
                    ].map((categoryName) => {
                      const isActive = selectedShortageIndustry === categoryName;
                      return (
                        <button
                          key={categoryName}
                          type="button"
                          onClick={() => setSelectedShortageIndustry(categoryName)}
                          className={`px-2 py-2 rounded-xl text-[10px] font-bold text-center border transition-all cursor-pointer ${
                            isActive
                              ? "bg-indigo-600 border-indigo-600 text-white shadow-xs"
                              : "bg-white border-slate-200 hover:bg-slate-100 hover:border-slate-300 text-slate-650 hover:text-slate-900"
                          }`}
                        >
                          {categoryName === "Alla" ? "Alla branscher" : categoryName}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Grid Element 2: Profil & kravfilter */}
                <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-150/55 space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] bg-slate-200 text-slate-600 font-mono font-bold px-1.5 py-0.5 rounded">2</span>
                      <h5 className="text-[11px] font-extrabold text-slate-700">Profil & Kravpålägg</h5>
                    </div>
                    <p className="text-[9.5px] text-slate-400 leading-snug">Filtrera utifrån profil samt utbildningsnivå</p>
                  </div>
                  <div className="space-y-2 pt-1 font-sans">
                    {/* Toggle 1: Utifrån min profil */}
                    <label className="flex items-start gap-2.5 cursor-pointer select-none group">
                      <input 
                        type="checkbox"
                        checked={shortageProfileOnly}
                        onChange={(e) => setShortageProfileOnly(e.target.checked)}
                        className="mt-0.5 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                      />
                      <div className="space-y-0.5">
                        <span className="text-[11px] font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">Utifrån min profil</span>
                        <p className="text-[9.5px] text-slate-450 leading-tight">Matchar mina registrerade kunskaper</p>
                      </div>
                    </label>

                    {/* Toggle 2: Inget krav på högskoleutbildning */}
                    <label className="flex items-start gap-2.5 cursor-pointer select-none group pt-2 border-t border-slate-150/40">
                      <input 
                        type="checkbox"
                        checked={shortageNoEduRequired}
                        onChange={(e) => setShortageNoEduRequired(e.target.checked)}
                        className="mt-0.5 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                      />
                      <div className="space-y-0.5">
                        <span className="text-[11px] font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">Arbete utan utbildningskrav</span>
                        <p className="text-[9.5px] text-slate-455 leading-tight">Yrken som ej kräver högskoleexamen</p>
                      </div>
                    </label>

                    {/* Toggle 3 : Inget krav på erfarenhet */}
                    <label className="flex items-start gap-2.5 cursor-pointer select-none group pt-2 border-t border-slate-150/40">
                      <input 
                        type="checkbox"
                        checked={shortageNoExpRequired}
                        onChange={(e) => setShortageNoExpRequired(e.target.checked)}
                        className="mt-0.5 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                      />
                      <div className="space-y-0.5">
                        <span className="text-[11px] font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">Arbete utan erfarenhetskrav</span>
                        <p className="text-[9.5px] text-slate-455 leading-tight">Ypperligt för karriärväxlare</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Grid Element 3: Mellanlön slider */}
                <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-150/55 space-y-3 flex flex-col justify-between font-sans">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] bg-slate-200 text-slate-600 font-mono font-bold px-1.5 py-0.5 rounded">3</span>
                      <h5 className="text-[11px] font-extrabold text-slate-700">Löneanspråk / Medellön</h5>
                    </div>
                    <p className="text-[9.5px] text-slate-400 leading-snug">Anpassa lägsta snittlön för yrket</p>
                  </div>
                  <div className="space-y-2.5 pt-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-550">Lägsta lön:</span>
                      <span className="bg-indigo-50 text-indigo-700 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border border-indigo-100">
                        {shortageMinSalary.toLocaleString("sv-SE")} kr
                      </span>
                    </div>

                    <input
                      type="range"
                      min="20000"
                      max="80000"
                      step="2000"
                      value={shortageMinSalary}
                      onChange={(e) => setShortageMinSalary(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 focus:outline-none"
                    />

                    {/* Quick presets */}
                    <div className="flex flex-wrap gap-1">
                      {[25000, 35000, 45000, 55000, 65000].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setShortageMinSalary(preset)}
                          className={`text-[9.5px] font-mono font-bold px-1.5 py-0.5 rounded transition-all cursor-pointer ${
                            shortageMinSalary === preset
                              ? 'bg-indigo-600 text-white shadow-3xs font-black'
                              : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-100 hover:text-slate-700'
                          }`}
                        >
                          {preset / 1000}k+
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Strategic Advice Box */}
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-3xl space-y-4 text-slate-700">
              <h4 className="font-extrabold text-xs uppercase text-slate-800 tracking-wide font-mono flex items-center gap-1.5 select-none">
                <span>💡</span> Tre skäl att matcha mot bristyrken
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[10.5px] leading-relaxed">
                <div className="space-y-0.5 bg-white p-3.5 rounded-2xl border border-slate-150/65">
                  <strong className="text-slate-900 font-bold block">1. Säkrare anställning</strong>
                  <span className="text-slate-500 block">Även under svåra ekonomiska tider behåller dessa yrken mycket hög efterfrågan.</span>
                </div>
                <div className="space-y-0.5 bg-white p-3.5 rounded-2xl border border-slate-150/65">
                  <strong className="text-slate-900 font-bold block">2. Gynnsamma anställningsvillkor</strong>
                  <span className="text-slate-500 block">Eftersom arbetsgivare kämpar om personal erbjuds ofta kollektivavtal och lönepremier.</span>
                </div>
                <div className="space-y-0.5 bg-white p-3.5 rounded-2xl border border-slate-150/65 font-sans">
                  <strong className="text-slate-900 font-bold block">3. Snabba YH-utbildningar</strong>
                  <span className="text-slate-500 block">Yrkeshögskolor (YH) har 1–2 år korta och kostnadsfria program som är skräddarsydda efter bristbehoven.</span>
                </div>
              </div>
            </div>

            {/* Strategic Advice Divider */}
            <div className="border-t border-slate-200/80 my-4" />

            {/* Right Column: Matched Shortage occupations */}
            <div className="space-y-5 w-full">
              {(() => {
                const userSkillsNormalized = (profile.skills || []).map((s: string) => s.toLowerCase().trim().replace(/[-\s]/g, ''));
                
                // Filter and map high demand jobs
                const mappedShortageJobs = IN_DEMAND_JOBS.filter(job => {
                  if (job.demandLevel !== "High") return false;
                  if (selectedShortageIndustry !== "Alla") {
                    return job.category.includes(selectedShortageIndustry);
                  }
                  return true;
                }).map(job => {
                  const jobSkills = job.requiredSkills || [];
                  const hasSkills = jobSkills.filter(skill => {
                    const sNorm = skill.toLowerCase().trim().replace(/[-\s]/g, '');
                    return userSkillsNormalized.some(us => us.includes(sNorm) || sNorm.includes(us));
                  });
                  const missingSkills = jobSkills.filter(skill => !hasSkills.includes(skill));

                  const userEduLower = (profile.education || "").toLowerCase();
                  const jobEduLower = (job.educationRequired || "").toLowerCase();
                  let educationMatches = false;
                  if (userEduLower.trim().length > 5) {
                    const eduKeywords = ["kandidat", "bachelor", "master", "magister", "yh", "yrkeshögskola", "universitet", "högskola", "examen", "ingenjör", "legitimerad", "legitimation", "vård- och omsorg", "gymnasie", "komvux"];
                    const matchedKeywords = eduKeywords.filter(kw => jobEduLower.includes(kw) && userEduLower.includes(kw));

                    const roleWords = ["sjuksköterska", "sjuksköterske", "läkare", "psykolog", "lärare", "elektriker", "kock", "utvecklare", "ingenjör", "ekonom", "jurist", "personal", "fysioterapeut", "apotekare"];
                    const matchedRoleWords = roleWords.filter(rw => job.role.toLowerCase().includes(rw) && userEduLower.includes(rw));

                    if (matchedKeywords.length > 0 || matchedRoleWords.length > 0) {
                      educationMatches = true;
                    } else if (userEduLower.includes("examen") || userEduLower.includes("degree") || userEduLower.includes("utbildning")) {
                      educationMatches = true;
                    }
                  }

                  const matchPct = Math.min(100, Math.round(
                    35 + 
                    (hasSkills.length / Math.max(1, jobSkills.length)) * 40 + 
                    (educationMatches ? 25 : 0)
                  ));

                  return {
                    ...job,
                    matchPct,
                    hasSkills,
                    missingSkills,
                    educationMatches
                  };
                }).sort((a, b) => b.matchPct - a.matchPct);

                // Apply advanced filterpålägg
                const filteredShortageJobs = mappedShortageJobs.filter(job => {
                  if (shortageProfileOnly) {
                    if (job.matchPct < 52 && job.hasSkills.length === 0) {
                      return false;
                    }
                  }
                  if (shortageNoEduRequired) {
                    if (!requiresNoHigherEducation(job)) {
                      return false;
                    }
                  }
                  if (shortageNoExpRequired) {
                    if (!requiresNoExperience(job)) {
                      return false;
                    }
                  }
                  if (job.avgSalary < shortageMinSalary) {
                    return false;
                  }
                  return true;
                });

                if (filteredShortageJobs.length === 0) {
                  return (
                    <div className="bg-white border border-slate-200 p-12 rounded-3xl shadow-xs text-center space-y-3 font-sans w-full">
                      <Briefcase className="h-10 w-10 text-slate-300 mx-auto" />
                      <p className="text-slate-505 text-sm font-semibold">Inga yrken matchar dina filterkrav.</p>
                      <p className="text-[11.5px] text-slate-400">Prova att sänka lönekravet eller ändra de bockbara extrafiltren för att se fler utmärkta yrkesval.</p>
                    </div>
                  );
                }

                // Slice list for pagination
                const paginatedJobs = filteredShortageJobs.slice(0, shortageVisibleCount);

                return (
                  <div className="space-y-6 w-full">
                    <div className="flex justify-between items-center text-[11px] font-mono pl-1 text-slate-400 uppercase tracking-widest select-none">
                      <span>Yrken sorterade efter din profilmatchning</span>
                      <span>{filteredShortageJobs.length} matchande bristyrken</span>
                    </div>

                    {/* TWO IN A ROW GRID LAYOUT */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-left w-full">
                      {paginatedJobs.map((job) => {
                        const isFavorited = favoriteJobs.includes(job.role);
                        const isSelectedForCompare = selectedCompareRoles.includes(job.role);
                        
                        // Match styling
                        let badgeColorClass = "bg-rose-50 text-rose-800 border-rose-200/50";
                        let ratingText = "Utvecklingspotentiell";
                        if (job.matchPct >= 70) {
                          badgeColorClass = "bg-emerald-50 text-emerald-800 border-emerald-300/50";
                          ratingText = "Utmärkt Matchning";
                        } else if (job.matchPct >= 45) {
                          badgeColorClass = "bg-indigo-50 text-indigo-800 border-indigo-200/50";
                          ratingText = "God Matchning";
                        }

                        return (
                          <div
                            key={job.role}
                            className="bg-white border border-slate-200 p-5 md:p-6 rounded-3xl shadow-[0_4px_20px_rgba(15,23,42,0.01)] space-y-4 hover:border-slate-300 transition-all flex flex-col justify-between"
                          >
                            <div className="space-y-4">
                              {/* Title block */}
                              <div className="flex flex-wrap items-start justify-between gap-3">
                                <div className="space-y-1">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <span className={`text-[10px] px-2 py-0.5 rounded-lg font-mono font-bold border ${badgeColorClass}`}>
                                      {ratingText} ({job.matchPct}%)
                                    </span>
                                    <span className="text-[10px] bg-slate-100 text-slate-705 px-2 py-0.5 rounded-lg border border-slate-200/65 font-mono">
                                      {job.category}
                                    </span>
                                  </div>
                                  <h4 className="text-sm font-black text-slate-900 tracking-tight leading-snug">
                                    {job.role}
                                  </h4>
                                </div>

                                <div className="text-right text-[11px] font-mono shrink-0">
                                  <span className="text-slate-400 block uppercase font-extrabold text-[9px]">Medellön</span>
                                  <strong className="text-sm font-black text-slate-900 block mt-0.5 font-sans">
                                    {job.avgSalary.toLocaleString("sv-SE")} SEK/mån
                                  </strong>
                                </div>
                              </div>

                              {/* Quick description */}
                              <p className="text-[11.5px] text-slate-500 leading-relaxed border-l-2 border-indigo-150 pl-3">
                                {job.futureOutlook}
                              </p>

                              {/* Details Bar */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 bg-slate-50 p-3.5 rounded-xl border border-slate-150/60 text-slate-700">
                                {/* Education requirement */}
                                <div className="space-y-1">
                                  <span className="text-[9px] text-slate-400 font-mono font-bold uppercase block flex items-center gap-1">
                                    <GraduationCap className="h-3.5 w-3.5 text-slate-400 mr-0.5" /> Utbildningskrav:
                                  </span>
                                  <p className="text-[10.5px] text-slate-700 font-semibold leading-relaxed">
                                    {job.educationRequired}
                                  </p>
                                </div>

                                {/* Market ads count */}
                                <div className="space-y-1">
                                  <span className="text-[9px] text-slate-400 font-mono font-bold uppercase block">
                                    Annonser på Platsbanken:
                                  </span>
                                  <p className="text-[10.5px] text-slate-700 font-semibold leading-relaxed">
                                    <strong>{job.activeAds.toLocaleString()} st</strong> aktiva annonser.
                                  </p>
                                </div>
                              </div>

                              {/* Key Skills breakdown */}
                              <div className="space-y-2">
                                <span className="text-[9px] text-slate-400 font-mono font-bold uppercase tracking-wider block">
                                  Nyckelkompetenser som krävs för yrket:
                                </span>
                                <div className="flex flex-wrap gap-1.5">
                                  {job.requiredSkills.map((skill) => {
                                    const hasIt = job.hasSkills.includes(skill);
                                    return (
                                      <span
                                        key={skill}
                                        className={`px-2.5 py-1 rounded-md text-[10px] font-bold flex items-center gap-1 border transition-colors ${
                                          hasIt
                                            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                                            : "bg-slate-50 text-slate-400 border-slate-150/70"
                                        }`}
                                      >
                                        {hasIt ? (
                                          <span className="text-emerald-600 font-black">✓</span>
                                        ) : (
                                          <span className="text-slate-350 font-serif">?</span>
                                        )}
                                        <span>{skill}</span>
                                      </span>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>

                            {/* Matching summary alert */}
                            <div className="flex justify-between items-center gap-4 pt-3 border-t border-slate-100 flex-wrap">
                              <span className="text-[10.5px] text-slate-500 font-sans">
                                {job.missingSkills.length === 0 ? (
                                  <span className="text-emerald-700 font-extrabold flex items-center gap-1">
                                    <span>✓</span> Du matchar alla nyckelkompetenser för detta yrke!
                                  </span>
                                ) : (
                                  <span>Du saknar <strong>{job.missingSkills.length} st</strong> nyckelkompetenser för komplett matchning.</span>
                                )}
                              </span>

                              {/* Actions block */}
                              <div className="flex items-center gap-2 flex-wrap">
                                {/* Favorite add */}
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (isFavorited) return;
                                    setFavoriteJobs(prev => {
                                      if (prev.includes(job.role)) return prev;
                                      return [...prev, job.role];
                                    });
                                    setSelectedFavoriteJob(job.role);
                                  }}
                                  disabled={isFavorited}
                                  className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 select-none ${
                                    isFavorited
                                      ? "bg-slate-50 border border-slate-205 text-slate-400 cursor-not-allowed"
                                      : "bg-indigo-600 hover:bg-slate-700 text-white shadow-2xs"
                                  }`}
                                >
                                  {isFavorited ? (
                                    <>
                                      <span>✓</span>
                                      <span>Mitt Karriärmål</span>
                                    </>
                                  ) : (
                                    <>
                                      <span>🎯</span>
                                      <span>Satsa på detta yrke</span>
                                    </>
                                  )}
                                </button>

                                {/* Compare toggle button */}
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedCompareRoles(prev => {
                                      let next;
                                      if (prev.includes(job.role)) {
                                        next = prev.filter(r => r !== job.role);
                                      } else {
                                        next = [...prev, job.role];
                                      }
                                      if (next.length >= 2) {
                                        setIsCompareModalOpen(true);
                                      }
                                      return next;
                                    });
                                  }}
                                  className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 select-none border ${
                                    isSelectedForCompare
                                      ? "bg-amber-500 hover:bg-amber-600 border-amber-600 text-white shadow-2xs"
                                      : "bg-white hover:bg-slate-50 border-slate-200 text-slate-705 hover:border-slate-300"
                                  }`}
                                  style={{ display: 'none' }}
                                  title={isSelectedForCompare ? "Ta bort från jämförelse" : "Lägg till i jämförelse"}
                                >
                                  <span>{isSelectedForCompare ? "⚖️ Jämförs" : "⚖️ Jämför"}</span>
                                </button>

                                {/* Talk to Lasse */}
                                {onStartChatWithLasse && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const promptText = `Hej Lasse! Jag vill ha råd om hur jag kan skola om mig eller stänga mitt kompetensgap till bristyrket "${job.role}". Jag matchar i dagsläget ${job.hasSkills.length} av ${job.requiredSkills.length} nyckelkompetenser. Hur rekommenderar du att jag börjar min kompetensresa?`;
                                      onStartChatWithLasse(promptText);
                                    }}
                                    className="border border-slate-200 hover:bg-slate-50 text-slate-705 px-3 py-1.5 rounded-xl text-[11px] font-bold transition flex items-center gap-1 select-none cursor-pointer"
                                  >
                                    <span>💬</span>
                                    <span>Rådgör med Lasse</span>
                                  </button>
                                )}
                              </div>
                            </div>

                          </div>
                        );
                      })}
                    </div>

                    {/* PAGINATION SHOW MORE BUTTON */}
                    {filteredShortageJobs.length > shortageVisibleCount && (
                      <div className="flex justify-center pt-4">
                        <button
                          type="button"
                          onClick={() => setShortageVisibleCount((prev) => prev + 10)}
                          className="bg-white hover:bg-slate-50 text-indigo-600 hover:text-indigo-800 font-extrabold text-xs px-5 py-3 rounded-2xl border border-slate-200 hover:border-slate-300 shadow-3xs transition-all cursor-pointer flex items-center gap-2"
                        >
                          <span>Visa fler bristyrken</span>
                          <span className="bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-lg text-[9px] font-mono font-bold">
                            +{Math.min(10, filteredShortageJobs.length - shortageVisibleCount)} av {filteredShortageJobs.length - shortageVisibleCount} kvar
                          </span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          </div> 
        </motion.div>
      )}
    </AnimatePresence>

    {/* 4. MOBILE/RESPONSIVE OVERLAY FOR SAVED CAREER GAP DIAGNOSIS */}
    <AnimatePresence>
      {isMobileGapModalOpen && selectedFavoriteJob && (() => {
        const activeJobName = selectedFavoriteJob;
        const job = IN_DEMAND_JOBS.find(j => j.role === activeJobName) || IN_DEMAND_JOBS[0];
        const userSkillsNormalized = (profile.skills || []).map(s => s.toLowerCase().trim().replace(/[-\s]/g, ''));
        const jobSkills = job.requiredSkills || [];
        const hasSkills = jobSkills.filter(skill => {
          const sNorm = skill.toLowerCase().trim().replace(/[-\s]/g, '');
          return userSkillsNormalized.some(us => us.includes(sNorm) || sNorm.includes(us));
        });
        const missingSkills = jobSkills.filter(skill => !hasSkills.includes(skill));

        const userEduLower = (profile.education || "").toLowerCase();
        const jobEduLower = (job.educationRequired || "").toLowerCase();
        let educationMatches = false;

        if (userEduLower.trim().length > 5) {
          const eduKeywords = ["kandidat", "bachelor", "master", "magister", "yh", "yrkeshögskola", "universitet", "högskola", "examen", "ingenjör", "legitimerad", "legitimation", "vård- och omsorg", "gymnasie", "komvux"];
          const matchedKeywords = eduKeywords.filter(kw => jobEduLower.includes(kw) && userEduLower.includes(kw));

          const roleWords = ["sjuksköterska", "sjuksköterske", "läkare", "psykolog", "lärare", "elektriker", "kock", "utvecklare", "ingenjör", "ekonom", "jurist", "personal", "fysioterapeut", "apotekare"];
          const matchedRoleWords = roleWords.filter(rw => job.role.toLowerCase().includes(rw) && userEduLower.includes(rw));

          if (matchedKeywords.length > 0 || matchedRoleWords.length > 0) {
            educationMatches = true;
          } else if (userEduLower.includes("examen") || userEduLower.includes("degree") || userEduLower.includes("utbildning")) {
            educationMatches = true;
          }
        }

        let missingAcademia = job.educationRequired || "Relevant utbildning saknas";
        let academiaAdvice = "";
        let academiaPlatform = "Studera.nu (Utbildningsregister)";
        let academiaUrl = "https://www.studera.nu/";

        if (job.category.toLowerCase().includes("hälsa") || job.category.toLowerCase().includes("vård")) {
          academiaAdvice = "Svensk hälso- och sjukvård ställer strikta formella krav på yrkeslegitimation från Socialstyrelsen eller genomgånget vårdprogram. Detta säkerställer hög patientsäkerhet.";
          academiaPlatform = "Socialstyrelsen Legitimation";
          academiaUrl = "https://legitimation.socialstyrelsen.se/";
        } else if (job.category.toLowerCase().includes("utbildning") || job.category.toLowerCase().includes("skola")) {
          academiaAdvice = "Läraryrken i Sverige regleras av Skolverket och kräver vanligtvis en formell lärarlegitimation för fast anställning och betygsättning.";
          academiaPlatform = "Skolverket Legitimation";
          academiaUrl = "https://www.skolverket.se/";
        } else if (job.category.toLowerCase().includes("teknik") || job.role.toLowerCase().includes("it") || job.role.toLowerCase().includes("utvecklare")) {
          academiaAdvice = "Inom tekniksektorn värdesätts praktisk kompetens (portfölj/LIA) högt, men för ingenjörsroller är en akademisk examen eller relevant YH-utbildning en stark bas.";
          academiaPlatform = "Yrkeshögskolan programutbud";
          academiaUrl = "https://www.yrkeshogskolan.se/hitta-utbildning?q=" + encodeURIComponent(job.role.split('(')[0].trim());
        } else {
          academiaAdvice = "Satsa på en målinriktad utbildning (Komvux, YH eller högskola) för att tillgodose branschens krav och öka din anställbarhet.";
          academiaPlatform = "Antagning.se (Akademiskt register)";
          academiaUrl = "https://www.antagning.se/se/search?freeText=" + encodeURIComponent(job.role.split('(')[0].trim());
        }

        const userCertLower = (profile.certifications || "").toLowerCase();
        const checklist: { item: string, status: 'have' | 'missing', advice: string, platform: string, url: string }[] = [];

        const needsDriverLicense = ["hantverk", "bygg", "transport", "omsorg", "hemtjänst", "installation", "lastbil", "fastighet"].some(term => 
          job.role.toLowerCase().includes(term) || job.category.toLowerCase().includes(term)
        );

        const hasDriverLicense = userCertLower.includes("körkort") || userCertLower.includes("korkort");
        checklist.push({
          item: needsDriverLicense ? "Svenskt B-Körkort (Personbil) - Krav" : "Svenskt B-Körkort",
          status: hasDriverLicense ? "have" : "missing",
          advice: needsDriverLicense 
            ? "Många uppdrag och regionala tjänster inom denna sektor kräver servicebil eller hembesök."
            : "Ett B-körkort är starkt meriterande och ökar din anställbarhet avsevärt för resor utanför storstadsområden.",
          platform: "Trafikverket",
          url: "https://www.trafikverket.se/korkort"
        });

        if (job.role.toLowerCase().includes("sjuksköterska") || job.role.toLowerCase().includes("läkare") || job.role.toLowerCase().includes("tandläkare") || job.role.toLowerCase().includes("psykolog") || job.role.toLowerCase().includes("lärare")) {
          const hasLicense = userCertLower.includes("legitimation") || userCertLower.includes("legitimerad") || userCertLower.includes("licens");
          const title = job.role.toLowerCase().includes("lärare") ? "Svensk Lärarlegitimation (Skolverket)" : "Svensk Yrkeslegitimation (Socialstyrelsen)";
          checklist.push({
            item: title,
            status: hasLicense ? "have" : "missing",
            advice: "Formellt krav för att utöva yrket självständigt i Sverige samt erhålla fast anställning.",
            platform: job.role.toLowerCase().includes("lärare") ? "Skolverket" : "Socialstyrelsen",
            url: job.role.toLowerCase().includes("lärare") ? "https://www.skolverket.se" : "https://legitimation.socialstyrelsen.se"
          });
        } else if (job.role.toLowerCase().includes("elektriker")) {
          const hasECY = userCertLower.includes("ecy") || userCertLower.includes("auktorisation");
          checklist.push({
            item: "ECY-certifikat (Elinstallationsauktorisation)",
            status: hasECY ? "have" : "missing",
            advice: "Grundkrav för att arbeta självständigt som auktoriserad elektriker i fält under Elsäkerhetsverkets regler.",
            platform: "Elinstallationsbranschens certifieringsnämnd",
            url: "https://www.ecy.com"
          });
        } else if (job.role.toLowerCase().includes("lastbil") || job.role.toLowerCase().includes("truck driver") || job.role.toLowerCase().includes("buss")) {
          const hasYKB = userCertLower.includes("ykb") || userCertLower.includes("yrkeskompetensbevis");
          checklist.push({
            item: "C/CE-Körkort & YKB (Yrkeskompetensbevis)",
            status: hasYKB ? "have" : "missing",
            advice: "Krävs enligt lag för att köra tunga fordon yrkesmässigt inom EU/EES.",
            platform: "Transportstyrelsen",
            url: "https://www.transportstyrelsen.se"
          });
        }

        const matchPct = Math.min(100, Math.round(
          35 + 
          (hasSkills.length / Math.max(1, jobSkills.length)) * 40 + 
          (educationMatches ? 15 : 0) + 
          (checklist.every(c => c.status === "have") ? 10 : 0)
        ));

        return (
          <motion.div 
            key="favorite-gap-modal-overlay"
            id="mobile-gap-detail-modal" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setIsMobileGapModalOpen(false);
              }
            }}
            className="fixed inset-0 z-[100] flex flex-col justify-end md:justify-center md:items-center bg-slate-950/25 backdrop-blur-md px-0 md:p-4 text-left cursor-pointer"
          >
            <motion.div
              initial={{ y: "100%", rotate: "1.2deg", scale: 0.96 }}
              animate={{ y: 0, rotate: "0deg", scale: 1 }}
              exit={{ y: "100%", rotate: "-1deg", scale: 0.96 }}
              transition={{ type: "spring", damping: 18, stiffness: 125, mass: 0.85 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-t-3xl md:rounded-3xl h-[92vh] max-h-[92dvh] md:h-auto md:max-h-[85vh] w-full md:max-w-2xl flex flex-col overflow-hidden relative shadow-[0_24px_60px_-15px_rgba(28,25,23,0.18)] border border-amber-950/10 text-slate-800 cursor-default font-sans"
              style={{ transformOrigin: "bottom center" }}
            >
              {/* Modal Drag/Indicator Handle */}
              <div className="w-full flex justify-center py-4 shrink-0 bg-indigo-50/45 border-b border-indigo-950/5 relative">
                <div className="w-14 h-1.5 rounded-full bg-slate-300/80" />
                <div className="absolute top-0 left-0 right-0 h-[3.5px] bg-indigo-600" />
                <button
                  onClick={() => setIsMobileGapModalOpen(false)}
                  className="absolute right-4 top-2 p-1.5 bg-slate-200/50 hover:bg-slate-300/60 text-slate-700 hover:text-slate-950 rounded-full active:scale-95 transition-all outline-none cursor-pointer"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              {/* Gap Details Content */}
              <div className="flex-1 overflow-y-auto p-5 pb-28 text-xs leading-relaxed text-slate-600 space-y-6">
                
                {/* Header */}
                <div className="border-b border-slate-100 pb-4 flex flex-wrap justify-between items-start gap-4">
                  <div className="space-y-1">
                    <span className="text-[9px] bg-indigo-50 text-indigo-800 border border-indigo-200/50 px-2.5 py-0.5 rounded-md font-mono font-black uppercase">
                      KOMPETENS- & GAPDIAGNOS
                    </span>
                    <h2 className="text-sm md:text-base font-extrabold text-[#111] leading-snug tracking-tight font-display">
                      {activeJobName}
                    </h2>
                  </div>
                  
                  <div className="text-right shrink-0">
                    <span className="bg-indigo-600 text-white px-3 py-1 text-xs font-black rounded-lg font-mono inline-block shadow-2xs">
                      {matchPct}% Match
                    </span>
                  </div>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 font-mono text-[11px]">
                    <span className="text-[9px] text-slate-400 uppercase font-black block">MEDELLÖN ENLIGT SCB</span>
                    <strong className="text-sm text-slate-900 block mt-0.5 font-sans font-black">
                      {job.avgSalary.toLocaleString("sv-SE")} SEK/mån
                    </strong>
                    <span className="text-[9.5px] text-slate-400 block mt-0.5 italic">{job.salaryRange}</span>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 font-mono text-[11px]">
                    <span className="text-[9px] text-slate-400 uppercase font-black block">EFTERFRÅGAN (SVERIGE)</span>
                    <strong className="text-sm text-indigo-750 block mt-0.5 font-sans font-black flex items-center gap-1">
                      {job.demandLevel === "High" ? "⚡ Mycket hög" : "Stabil/God"}
                    </strong>
                    <span className="text-[9.5px] text-slate-400 block mt-0.5 italic">{job.activeAds.toLocaleString()} aktiva platsannonser</span>
                  </div>
                </div>

                {/* What you already have */}
                <div className="space-y-3">
                  <h4 className="text-[11.5px] font-mono font-black uppercase text-slate-900 flex items-center gap-1.5">
                    <CheckCircle className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
                    <span>Dina styrkor för rollen:</span>
                  </h4>
                  <div className="p-4 bg-emerald-50/10 border border-emerald-100 rounded-xl space-y-3 text-[11.5px]">
                    <div>
                      <strong className="text-emerald-950 font-sans block mb-1 text-xs font-bold">Matchande kompetenser:</strong>
                      {hasSkills.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5">
                          {hasSkills.map((sk, idx) => (
                            <span key={idx} className="bg-emerald-50 border border-emerald-250 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-mono font-bold">
                              ✓ {sk}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="italic text-slate-400 text-[10px]">Inga direkta nyckelordsmatchningar i din nuvarande profil ännu.</p>
                      )}
                    </div>

                    <div className="pt-2 border-t border-emerald-100 text-[11px] font-mono">
                      <strong className="text-emerald-950 font-sans block mb-0.5 text-xs font-bold">Utbildningsnivå:</strong>
                      {educationMatches ? (
                        <p className="text-emerald-850 font-sans font-medium">
                          ✓ Din akademiska nivå <strong className="font-mono">({profile.education || "Saknas"})</strong> mäter upp väl mot yrkeskrav!
                        </p>
                      ) : (
                        <p className="text-slate-500 italic font-sans_not">Din nuvarande utbildningsprofil mäter inte upp helt mot minimikraven. Se resplanen.</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* What you are missing (the gaps) */}
                <div className="space-y-3">
                  <h4 className="text-[11.5px] font-mono font-black uppercase text-slate-900 flex items-center gap-1.5">
                    <AlertCircle className="h-4.5 w-4.5 text-indigo-550 shrink-0" />
                    <span>Kompetensgap att stänga:</span>
                  </h4>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
                    {missingSkills.length > 0 ? (
                      <div className="space-y-1.5">
                        <span className="text-[10px] text-slate-400 font-mono font-bold uppercase block">Nyckelord som saknas i din profil:</span>
                        <div className="flex flex-wrap gap-1">
                          {missingSkills.map((sk, idx) => (
                            <span key={idx} className="bg-white text-slate-800 border border-slate-201 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold shadow-3xs">
                              ⚠ {sk}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-emerald-800 font-mono text-[10.5px] flex items-center gap-1 font-bold">
                        ✓ Din profil innehåller alla rekommenderade kompetenser!
                      </div>
                    )}

                    {!educationMatches && missingAcademia && (
                      <div className="pt-3 border-t border-slate-200 text-[11px] font-mono space-y-1.5">
                        <div>
                          <span className="text-[9.5px] text-indigo-600 font-bold uppercase block mb-0.5">Formell yrkesutbildning som saknas:</span>
                          <strong className="text-slate-950 font-sans text-xs block">{missingAcademia}</strong>
                        </div>
                        <p className="text-slate-505 font-sans leading-relaxed text-[11px]">
                          {academiaAdvice}
                        </p>
                        <div>
                          <a
                            href={academiaUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-250 text-indigo-700 font-bold font-sans rounded-xl shadow-2xs hover:bg-slate-50 transition-all text-[10.5px] cursor-pointer"
                          >
                            <span>Visa program på {academiaPlatform}</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    )}

                    {checklist.map((chk, idx) => {
                      if (chk.status === "missing") {
                        return (
                          <div key={idx} className="pt-3 border-t border-slate-200 text-[11px] font-mono space-y-1.5">
                            <div>
                              <span className="text-[9.5px] text-indigo-600 font-bold uppercase block">Kompletterande licens / bevis:</span>
                              <strong className="text-slate-900 font-sans text-xs block">{chk.item}</strong>
                            </div>
                            <p className="text-slate-500 font-sans leading-relaxed text-[10.5px]">
                              {chk.advice}
                            </p>
                            <div>
                              <a
                                href={chk.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-250 text-indigo-700 font-bold font-sans rounded-xl shadow-2xs hover:bg-slate-50 transition-all text-[10.5px] cursor-pointer"
                              >
                                <span>Se prov hos {chk.platform}</span>
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>

                {/* Börja Progressera Button & Studievägledning inside analyst */}
                <div className="pt-3 border-t border-slate-100 text-center space-y-4">
                  
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFavoriteJob(activeJobName);
                      setProfileSubTab('active-progression');
                      setIsMobileGapModalOpen(false);
                      setTimeout(() => {
                        const el = document.getElementById('progress-roadmap-view-root');
                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }, 100);
                    }}
                    className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold uppercase tracking-wider rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-500/10 hover:shadow-emerald-600/20 active:scale-98 transition-all"
                  >
                    <span>BÖRJA PROGRESSERA STEG FÖR STEG 🚀</span>
                    <ArrowRight className="h-4 w-4 stroke-[2.5]" />
                  </button>

                  <div className="text-slate-400 text-[10.5px] leading-relaxed">
                    Klicka på knappen ovan för att aktivera den steg-för-steg-baserade <strong className="text-slate-600">studie- och framstegsplanen</strong> för att få {activeJobName.split('(')[0].trim()}.
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        );
      })()}
    </AnimatePresence>

    {/* 5. MOBILE SELECTOR MODAL FOR SAVED CARRIERS */}
    <AnimatePresence>
      {isMobileCareerListOpen && (
        <motion.div 
          key="favorite-career-picker-overlay"
          id="mobile-career-picker-modal" 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsMobileCareerListOpen(false);
            }
          }}
          className="fixed inset-0 z-[100] flex flex-col justify-end md:justify-center md:items-center bg-slate-950/25 backdrop-blur-md px-0 md:p-4 text-left cursor-pointer"
        >
          <motion.div
            initial={{ y: "100%", rotate: "1.2deg", scale: 0.96 }}
            animate={{ y: 0, rotate: "0deg", scale: 1 }}
            exit={{ y: "100%", rotate: "-1deg", scale: 0.96 }}
            transition={{ type: "spring", damping: 18, stiffness: 125, mass: 0.85 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-t-3xl md:rounded-3xl h-[65vh] max-h-[65dvh] md:h-auto md:max-h-[85vh] w-full md:max-w-md flex flex-col overflow-hidden relative shadow-[0_24px_60px_-15px_rgba(28,25,23,0.18)] border border-amber-955/10 text-slate-800 cursor-default font-sans"
            style={{ transformOrigin: "bottom center" }}
          >
            {/* Modal Drag/Indicator Handle */}
            <div className="w-full flex justify-center py-4 shrink-0 bg-indigo-50/45 border-b border-indigo-950/5 relative">
              <div className="w-14 h-1.5 rounded-full bg-slate-300/80" />
              <div className="absolute top-0 left-0 right-0 h-[3.5px] bg-indigo-600" />
              <button
                onClick={() => setIsMobileCareerListOpen(false)}
                className="absolute right-4 top-2 p-1.5 bg-slate-200/50 hover:bg-slate-300/60 text-slate-700 hover:text-slate-950 rounded-full active:scale-95 transition-all outline-none cursor-pointer"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              <div className="border-b border-slate-100 pb-2">
                <span className="text-[9px] bg-indigo-100/60 text-indigo-800 border border-indigo-200/50 px-2.5 py-0.5 rounded-md font-mono font-black uppercase inline-block">
                  VÄLJ KARRIÄRMÅL 🎯
                </span>
                <h3 className="font-extrabold text-sm text-slate-900 tracking-tight font-display mt-1">
                  Mina sparade yrken
                </h3>
                <p className="text-[10.5px] text-slate-400 mt-0.5 leading-snug">
                  Tryck på ett yrke för att ladda dess kompetens- och gapanalys direkt.
                </p>
              </div>

              <div className="space-y-2 max-h-[45vh] overflow-y-auto pr-1">
                {favoriteJobs.map((roleName) => {
                  const matchedJob = IN_DEMAND_JOBS.find(j => j.role === roleName);
                  const isSelected = selectedFavoriteJob === roleName;
                  return (
                    <div
                      key={roleName}
                      onClick={() => {
                        setSelectedFavoriteJob(roleName);
                        setIsMobileCareerListOpen(false);
                      }}
                      className={`p-3 border rounded-xl transition-all cursor-pointer flex justify-between items-center gap-3 ${
                        isSelected 
                          ? 'bg-indigo-50/40 border-indigo-300 shadow-xs relative font-bold' 
                          : 'bg-white border-slate-150 hover:bg-slate-50'
                      }`}
                    >
                      <div className="space-y-0.5 min-w-[0px] flex-1">
                        <strong className="text-slate-850 text-xs block font-sans truncate font-bold">{roleName}</strong>
                        <div className="flex items-center gap-1.5 text-[9.5px] font-mono leading-none">
                          <span className="text-slate-400 uppercase font-black">{matchedJob?.category || "Tjänst"}</span>
                          <span className="text-slate-300">•</span>
                          <span className="text-emerald-700 font-bold font-sans">{(matchedJob?.avgSalary || 42000).toLocaleString("sv-SE")} kr</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-right shrink-0">
                        {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse shrink-0"></span>}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setFavoriteJobs(prev => {
                              const filtered = prev.filter(r => r !== roleName);
                              if (selectedFavoriteJob === roleName && filtered.length > 0) {
                                setSelectedFavoriteJob(filtered[0]);
                              }
                              return filtered;
                            });
                          }}
                          className="text-slate-450 hover:text-red-650 font-black cursor-pointer text-xs p-1.5 rounded-md hover:bg-slate-100 shrink-0"
                          title="Ta bort sparad"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  );
                })}

                {favoriteJobs.length === 0 && (
                  <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-xl space-y-2 text-slate-500 text-xs">
                    <AlertCircle className="w-5 h-5 mx-auto text-slate-350" />
                    <p className="font-semibold text-slate-700">Du har inga sparade yrken ännu.</p>
                    <p className="text-[10px] text-slate-405">Gå till fliken <strong>Yrkeskatalog</strong> för att utforska och spara yrken.</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>



    </div> {/* Close Main Workspace Grid */}

  </div>
  );
}
