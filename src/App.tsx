import React, { useState, useRef, useEffect } from "react";
import { 
  User, 
  MessageSquare, 
  Send, 
  TrendingUp, 
  CheckCircle, 
  MapPin, 
  Wallet, 
  ArrowRight, 
  FileText, 
  Briefcase, 
  Check, 
  ExternalLink, 
  AlertCircle, 
  Upload,
  Info,
  Search,
  Plus,
  X,
  ChevronRight,
  ChevronDown,
  GraduationCap,
  Award,
  Calendar,
  Smartphone,
  Download,
  Share2,
  Sparkles
} from "lucide-react";
import { CareerScore, MarketPrognosis, JobMatch, Message } from "./types";
import { 
  SWEDEN_REGIONS, 
  IN_DEMAND_JOBS, 
  INITIAL_USER_PROFILE, 
  TRENDS_SWEDEN 
} from "./data";
import { motion, AnimatePresence } from "motion/react";
import Mascot, { MascotState } from "./components/Mascot";
import CompanyLogo from "./components/CompanyLogo";
import ProfilePortal from "./components/ProfilePortal";
import LoginGuard from "./components/LoginGuard";
import { onAuthStateChanged, signOut, User as FirebaseUser } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import OnboardingWizard from "./components/OnboardingWizard";

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

const getCompanyDomain = (companyName: string): string => {
  const name = companyName.toLowerCase().trim();
  const clean = name
    .replace(/\b(ab|as|ltd|gmbh|inc|group|sverige|sweden|kommun|bolag)\b/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
    .replace(/\s+/g, '');
    
  if (!clean) return 'company.com';
  
  if (clean.includes('volvo')) return 'volvogroup.com';
  if (clean.includes('scania')) return 'scania.com';
  if (clean.includes('ericsson')) return 'ericsson.com';
  if (clean.includes('ikea')) return 'ikea.com';
  if (clean.includes('hm') || clean.includes('hennes')) return 'hm.com';
  if (clean.includes('spotify')) return 'spotify.com';
  if (clean.includes('klarna')) return 'klarna.com';
  if (clean.includes('bankgirot')) return 'bankgirot.se';
  if (clean.includes('handelsbanken')) return 'handelsbanken.se';
  if (clean.includes('swedbank')) return 'swedbank.se';
  if (clean.includes('seb')) return 'seb.se';
  if (clean.includes('nordea')) return 'nordea.se';
  if (clean.includes('aftonbladet')) return 'aftonbladet.se';
  if (clean.includes('expressen')) return 'expressen.se';
  if (clean.includes('sj')) return 'sj.se';
  if (clean.includes('postnord')) return 'postnord.se';
  if (clean.includes('telia')) return 'telia.se';
  if (clean.includes('tele2')) return 'tele2.se';
  if (clean.includes('telenor')) return 'telenor.se';
  if (clean.includes('saab')) return 'saabgroup.com';
  if (clean.includes('ica')) return 'ica.se';
  if (clean.includes('coop')) return 'coop.se';
  if (clean.includes('systembolaget')) return 'systembolaget.se';
  if (clean.includes('arla')) return 'arla.se';
  if (clean.includes('securitas')) return 'securitas.com';
  if (clean.includes('skanska')) return 'skanska.se';
  if (clean.includes('sweco')) return 'sweco.se';
  if (clean.includes('afry') || clean.includes('f')) return 'afry.com';
  
  return clean.length <= 4 ? `${clean}.se` : `${clean}.com`;
};

function HeaderMascot({ thinking = false }: { thinking?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const [blink, setBlink] = useState(false);

  // Auto blinking interval matching the main mascot
  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 150);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="relative flex items-center justify-center cursor-pointer select-none animate-floating shrink-0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      id="header-mascot-moose-suit"
    >
      {/* Outer Glow ring containing warm ochre-to-rust gradient */}
      <div className="relative h-13 w-13 md:h-14 md:w-14 rounded-full bg-gradient-to-br from-ochre via-amber-500 to-rust p-0.5 shadow-md flex items-center justify-center border border-white/20 transition-all duration-350 bg-card-bg">
        <div className="h-full w-full rounded-full bg-[#FCF9F2] dark:bg-[#1C1814] flex items-center justify-center overflow-hidden select-none relative group transition-colors duration-300 shadow-inner">
          {/* Animated Glow in backdrop */}
          <div className="absolute inset-0 bg-gradient-to-tr from-rust/10 via-amber-500/10 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
          
          <svg
            viewBox="0 0 160 160"
            className="w-full h-full overflow-visible drop-shadow-xs scale-110 translate-y-1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="mooseFurHeader" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#8A5A36" />
                <stop offset="100%" stopColor="#5C3A21" />
              </linearGradient>
              <linearGradient id="snoutGradHeader" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#D29A74" />
                <stop offset="100%" stopColor="#B07C58" />
              </linearGradient>
              <linearGradient id="antlerGradHeader" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FED766" />
                <stop offset="100%" stopColor="#EE964B" />
              </linearGradient>
            </defs>

            {/* ANTLER LEFT */}
            <motion.g
              animate={hovered ? { rotate: [-6, 6, -6] } : { rotate: [-2, 2, -2] }}
              transition={{ repeat: Infinity, duration: hovered ? 1.5 : 4, ease: "easeInOut" }}
              style={{ transformOrigin: "35px 65px" }}
            >
              <path d="M 40 60 C 20 50, 10 35, 12 15 C 13 10, 22 10, 23 18 C 24 30, 32 38, 38 42 C 34 25, 25 15, 29 5 C 32 0, 39 5, 41 15 C 44 26, 46 36, 45 42 C 48 24, 48 10, 54 8 C 59 6, 62 14, 58 26 C 54 36, 50 48, 48 55 Z" fill="url(#antlerGradHeader)" stroke="#A06020" strokeWidth="1.5" />
            </motion.g>

            {/* ANTLER RIGHT */}
            <motion.g
              animate={hovered ? { rotate: [6, -6, 6] } : { rotate: [2, -2, 2] }}
              transition={{ repeat: Infinity, duration: hovered ? 1.5 : 4, ease: "easeInOut" }}
              style={{ transformOrigin: "125px 65px" }}
            >
              <path d="M 120 60 C 140 50, 150 35, 148 15 C 147 10, 138 10, 137 18 C 136 30, 128 38, 122 42 C 126 25, 135 15, 131 5 C 128 0, 121 5, 119 15 C 116 26, 114 36, 115 42 C 112 24, 112 10, 106 8 C 101 6, 98 14, 102 26 C 106 36, 110 48, 112 55 Z" fill="url(#antlerGradHeader)" stroke="#A06020" strokeWidth="1.5" />
            </motion.g>

            {/* SUIT JACKET / BODY */}
            <path d="M 40 135 Q 15 145, 15 160 L 145 160 Q 145 145, 120 135 Z" fill="#1E293B" stroke="#0F172A" strokeWidth="1.5" />

            {/* WHITE SHIRT V-NECK */}
            <path d="M 68 135 L 80 154 L 92 135 Z" fill="#FFFFFF" />

            {/* YELLOW CAREER TIE & KNOT */}
            <path d="M 78 148 L 82 148 L 84 159 L 80 163 L 76 159 Z" fill="#FDE047" stroke="#EAB308" strokeWidth="0.5" />
            <path d="M 77 145 L 83 145 L 81 149 L 79 149 Z" fill="#EAB308" />

            {/* SUIT LAPELS */}
            <path d="M 62 135 L 74 151 L 74 135 Z" fill="#334155" stroke="#0F172A" strokeWidth="1" />
            <path d="M 98 135 L 86 151 L 86 135 Z" fill="#334155" stroke="#0F172A" strokeWidth="1" />

            {/* HEAD & FACE BASICS (BOBBING WRAPPER) */}
            <motion.g
              animate={hovered ? { y: [0, -3, 0] } : { y: [0, -1, 0] }}
              transition={{ repeat: Infinity, duration: hovered ? 2 : 4, ease: "easeInOut" }}
              style={{ transformOrigin: "80px 90px" }}
            >
              {/* EAR LEFT */}
              <path d="M 48 80 C 25 78, 20 88, 18 95 C 18 100, 30 100, 42 90 Z" fill="#5C3A21" stroke="#402010" strokeWidth="1.5" />
              <path d="M 42 84 C 28 85, 26 91, 36 90 Z" fill="#E89B9B" />

              {/* EAR RIGHT */}
              <path d="M 112 80 C 135 78, 140 88, 142 95 C 142 100, 130 100, 118 90 Z" fill="#5C3A21" stroke="#402010" strokeWidth="1.5" />
              <path d="M 118 84 C 132 85, 134 91, 124 90 Z" fill="#E89B9B" />

              {/* MAIN ROUNDED HEAD */}
              <rect x="42" y="62" width="76" height="66" rx="32" fill="url(#mooseFurHeader)" stroke="#402010" strokeWidth="2" />

              {/* EYES */}
              {/* Eye Left */}
              <ellipse cx="65" cy="85" rx="8" ry="11" fill="#FFFFFF" stroke="#402010" strokeWidth="1.5" />
              <circle cx="65" cy="84" r="4.5" fill="#101827" />
              <circle cx="63" cy="81" r="1.5" fill="#FFFFFF" />
              {blink && <rect x="55" y="70" width="20" height="25" fill="url(#mooseFurHeader)" />}

              {/* Eye Right */}
              <ellipse cx="95" cy="85" rx="8" ry="11" fill="#FFFFFF" stroke="#402010" strokeWidth="1.5" />
              <circle cx="95" cy="84" r="4.5" fill="#101827" />
              <circle cx="93" cy="81" r="1.5" fill="#FFFFFF" />
              {blink && <rect x="85" y="70" width="20" height="25" fill="url(#mooseFurHeader)" />}

              {/* EYEBROWS (Thoughtful in thinking state) */}
              {thinking ? (
                <>
                  <path d="M 53 74 Q 63 67, 71 70" stroke="#402010" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  <path d="M 107 74 Q 97 67, 89 70" stroke="#402010" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                </>
              ) : (
                <>
                  <path d="M 52 71 Q 61 67, 70 71" stroke="#402010" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                  <path d="M 108 71 Q 99 67, 90 71" stroke="#402010" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                </>
              )}

              {/* INTELLECTUAL GLASSES */}
              <g stroke="#000000" strokeWidth="2.5" fill="none">
                <rect x="52" y="77" width="23" height="18" rx="6" />
                <rect x="85" y="77" width="23" height="18" rx="6" />
                <line x1="75" y1="84" x2="85" y2="84" />
                <line x1="42" y1="82" x2="52" y2="82" />
                <line x1="108" y1="82" x2="118" y2="82" />
              </g>

              {/* MOOSE NOSE & SNOUT */}
              <path d="M 50 100 Q 80 82, 110 100 Q 112 118, 80 122 Q 48 118, 50 100 Z" fill="url(#snoutGradHeader)" stroke="#402010" strokeWidth="1.5" />
              <circle cx="71" cy="104" r="2.5" fill="#4A2F1B" />
              <circle cx="89" cy="104" r="2.5" fill="#4A2F1B" />

              {/* MOUTH */}
              <path d="M 72 113 Q 80 118, 88 113" fill="none" stroke="#5C1010" strokeWidth="3" strokeLinecap="round" />

              {/* Blush Cheeks */}
              <circle cx="49" cy="98" r="4.5" fill="#FF8A8A" opacity="0.4" />
              <circle cx="111" cy="98" r="4.5" fill="#FF8A8A" opacity="0.4" />
            </motion.g>

            {/* SUIT SLEEVE / ARMS */}
            {thinking ? (
              /* SUIT SLEEVE IN THINKING POSE (HAND-ON-CHIN) WITH ALIVE ATTENTIVE FLOATING */
              <motion.g
                animate={hovered ? {
                  y: [0, -3.5, 1.2, -2.2, 0],
                  rotate: [0, -1.8, 1.8, -0.8, 0],
                  scale: [1, 1.018, 0.982, 1.008, 1]
                } : {
                  y: [0, -2.2, 0.6, -1.4, 0],
                  rotate: [0, -0.8, 0.8, -0.4, 0],
                  scale: [1, 1.008, 0.992, 1.004, 1]
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: hovered ? 2.2 : 3.8,
                  ease: "easeInOut"
                }}
                style={{ transformOrigin: "115px 135px" }}
              >
                {/* Sleeve folding up towards chin */}
                <path d="M 115 138 C 105 118, 92 116, 85 121" stroke="#1E293B" strokeWidth="11" strokeLinecap="round" fill="none" />
                <path d="M 115 138 C 105 118, 92 116, 85 121" stroke="#334155" strokeWidth="9" strokeLinecap="round" fill="none" />
                
                {/* White cuff */}
                <circle cx="85" cy="121" r="5" fill="#FFFFFF" />
                
                {/* Moose Hoof hand placed precisely on bottom-right of chin */}
                <circle cx="81" cy="119" r="7.5" fill="#5C3A21" stroke="#402010" strokeWidth="1.5" />
                
                {/* Fingers curled towards chin */}
                <path d="M 74 114 Q 80 113, 81 119" fill="none" stroke="#402010" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M 77 118 Q 82 117, 83 121" fill="none" stroke="#402010" strokeWidth="1.2" strokeLinecap="round" />
              </motion.g>
            ) : (
              /* SUIT SLEEVE & FRIENDLY WAVE/POINT GESTURE (DEFAULT) */
              <motion.g
                animate={hovered ? { 
                  rotate: [0, -12, 10, -12, 0],
                  x: [0, 2, -2, 2, 0]
                } : {
                  rotate: [0, 3, 0],
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: hovered ? 1.4 : 3.2,
                  ease: "easeInOut"
                }}
                style={{ transformOrigin: "115px 135px" }}
              >
                {/* Dark Blue Suit Sleeve */}
                <path d="M 115 135 L 138 112 L 148 122 L 125 145 Z" fill="#1E293B" stroke="#0F172A" strokeWidth="1.5" />
                
                {/* White shirt cuff */}
                <path d="M 136 111 L 141 106 L 146 111 L 141 116 Z" fill="#FFFFFF" />
                
                {/* Moose Hoof hand */}
                <circle cx="143" cy="108" r="7.5" fill="#5C3A21" stroke="#402010" strokeWidth="1.5" />
                
                {/* Pointy finger gesture */}
                <path d="M 138 105 Q 135 98, 140 98 Q 143 98, 142 105 Z" fill="#5C3A21" stroke="#402010" strokeWidth="1.2" />
              </motion.g>
            )}
          </svg>
        </div>

        {/* Small Swedish badge indicator positioned relative to the outer container */}
        <div className="absolute -bottom-0.5 -right-0.5 h-4.5 w-4.5 rounded-full border border-white dark:border-stone-850 bg-[#004B76] flex items-center justify-center text-[10px] shadow-sm z-20 select-none">
          👑
        </div>
      </div>

      {/* Sparkles of professional excellence of Career Moose */}
      {hovered && (
        <div className="absolute inset-0 pointer-events-none overflow-visible">
          <motion.div 
            initial={{ opacity: 0, scale: 0, x: 22, y: -22 }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5], x: [22, 30, 38], y: [-22, -34, -46] }}
            transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 0.1 }}
            className="absolute top-0 right-0 w-2 h-2 bg-amber-400 rotate-45 rounded-xs"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0, x: 32, y: -8 }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5], x: [32, 44, 50], y: [-8, -15, -25] }}
            transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 0.35 }}
            className="absolute top-2 right-1 w-1.5 h-1.5 bg-yellow-300 rotate-45 rounded-xs"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0, x: 12, y: -28 }}
            animate={{ opacity: [0, 1, 0], scale: [0.4, 0.9, 0.4], x: [12, 16, 20], y: [-28, -40, -50] }}
            transition={{ duration: 0.7, repeat: Infinity, repeatDelay: 0.2 }}
            className="absolute top-0 right-3 w-1.5 h-1.5 bg-sky-200 rotate-45 rounded-xs"
          />
        </div>
      )}
    </motion.div>
  );
}

function LegacyHeaderMascotUnused() {
  const [hovered, setHovered] = useState(false);
  const [blink, setBlink] = useState(false);

  // Auto blinking interval matching the main mascot
  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 150);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="relative flex items-center justify-center cursor-pointer select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      id="header-mascot-moose-suit"
    >
      <svg
        viewBox="0 0 160 160"
        className="w-12 h-12 md:w-14 md:h-14 overflow-visible drop-shadow-sm"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="mooseFurHeader" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8A5A36" />
            <stop offset="100%" stopColor="#5C3A21" />
          </linearGradient>
          <linearGradient id="snoutGradHeader" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D29A74" />
            <stop offset="100%" stopColor="#B07C58" />
          </linearGradient>
          <linearGradient id="antlerGradHeader" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FED766" />
            <stop offset="100%" stopColor="#EE964B" />
          </linearGradient>
        </defs>

        {/* ANTLER LEFT */}
        <motion.g
          animate={hovered ? { rotate: [-6, 6, -6] } : { rotate: [-2, 2, -2] }}
          transition={{ repeat: Infinity, duration: hovered ? 1.5 : 4, ease: "easeInOut" }}
          style={{ transformOrigin: "35px 65px" }}
        >
          <path d="M 40 60 C 20 50, 10 35, 12 15 C 13 10, 22 10, 23 18 C 24 30, 32 38, 38 42 C 34 25, 25 15, 29 5 C 32 0, 39 5, 41 15 C 44 26, 46 36, 45 42 C 48 24, 48 10, 54 8 C 59 6, 62 14, 58 26 C 54 36, 50 48, 48 55 Z" fill="url(#antlerGradHeader)" stroke="#A06020" strokeWidth="1.5" />
        </motion.g>

        {/* ANTLER RIGHT */}
        <motion.g
          animate={hovered ? { rotate: [6, -6, 6] } : { rotate: [2, -2, 2] }}
          transition={{ repeat: Infinity, duration: hovered ? 1.5 : 4, ease: "easeInOut" }}
          style={{ transformOrigin: "125px 65px" }}
        >
          <path d="M 120 60 C 140 50, 150 35, 148 15 C 147 10, 138 10, 137 18 C 136 30, 128 38, 122 42 C 126 25, 135 15, 131 5 C 128 0, 121 5, 119 15 C 116 26, 114 36, 115 42 C 112 24, 112 10, 106 8 C 101 6, 98 14, 102 26 C 106 36, 110 48, 112 55 Z" fill="url(#antlerGradHeader)" stroke="#A06020" strokeWidth="1.5" />
        </motion.g>

        {/* SUIT JACKET / BODY */}
        <path d="M 40 135 Q 15 145, 15 160 L 145 160 Q 145 145, 120 135 Z" fill="#1E293B" stroke="#0F172A" strokeWidth="1.5" />

        {/* WHITE SHIRT V-NECK */}
        <path d="M 68 135 L 80 154 L 92 135 Z" fill="#FFFFFF" />

        {/* YELLOW CAREER TIE & KNOT */}
        <path d="M 78 148 L 82 148 L 84 159 L 80 163 L 76 159 Z" fill="#FDE047" stroke="#EAB308" strokeWidth="0.5" />
        <path d="M 77 145 L 83 145 L 81 149 L 79 149 Z" fill="#EAB308" />

        {/* SUIT LAPELS */}
        <path d="M 62 135 L 74 151 L 74 135 Z" fill="#334155" stroke="#0F172A" strokeWidth="1" />
        <path d="M 98 135 L 86 151 L 86 135 Z" fill="#334155" stroke="#0F172A" strokeWidth="1" />

        {/* HEAD & FACE BASICS (BOBBING WRAPPER) */}
        <motion.g
          animate={hovered ? { y: [0, -3, 0] } : { y: [0, -1, 0] }}
          transition={{ repeat: Infinity, duration: hovered ? 2 : 4, ease: "easeInOut" }}
          style={{ transformOrigin: "80px 90px" }}
        >
          {/* EAR LEFT */}
          <path d="M 48 80 C 25 78, 20 88, 18 95 C 18 100, 30 100, 42 90 Z" fill="#5C3A21" stroke="#402010" strokeWidth="1.5" />
          <path d="M 42 84 C 28 85, 26 91, 36 90 Z" fill="#E89B9B" />

          {/* EAR RIGHT */}
          <path d="M 112 80 C 135 78, 140 88, 142 95 C 142 100, 130 100, 118 90 Z" fill="#5C3A21" stroke="#402010" strokeWidth="1.5" />
          <path d="M 118 84 C 132 85, 134 91, 124 90 Z" fill="#E89B9B" />

          {/* MAIN ROUNDED HEAD */}
          <rect x="42" y="62" width="76" height="66" rx="32" fill="url(#mooseFurHeader)" stroke="#402010" strokeWidth="2" />

          {/* EYES */}
          {/* Eye Left */}
          <ellipse cx="65" cy="85" rx="8" ry="11" fill="#FFFFFF" stroke="#402010" strokeWidth="1.5" />
          <circle cx="65" cy="84" r="4.5" fill="#101827" />
          <circle cx="63" cy="81" r="1.5" fill="#FFFFFF" />
          {blink && <rect x="55" y="70" width="20" height="25" fill="url(#mooseFurHeader)" />}

          {/* Eye Right */}
          <ellipse cx="95" cy="85" rx="8" ry="11" fill="#FFFFFF" stroke="#402010" strokeWidth="1.5" />
          <circle cx="95" cy="84" r="4.5" fill="#101827" />
          <circle cx="93" cy="81" r="1.5" fill="#FFFFFF" />
          {blink && <rect x="85" y="70" width="20" height="25" fill="url(#mooseFurHeader)" />}

          {/* INTELLECTUAL GLASSES */}
          <g stroke="#000000" strokeWidth="2.5" fill="none">
            <rect x="52" y="77" width="23" height="18" rx="6" />
            <rect x="85" y="77" width="23" height="18" rx="6" />
            <line x1="75" y1="84" x2="85" y2="84" />
            <line x1="42" y1="82" x2="52" y2="82" />
            <line x1="108" y1="82" x2="118" y2="82" />
          </g>

          {/* MOOSE NOSE & SNOUT */}
          <path d="M 50 100 Q 80 82, 110 100 Q 112 118, 80 122 Q 48 118, 50 100 Z" fill="url(#snoutGradHeader)" stroke="#402010" strokeWidth="1.5" />
          <circle cx="71" cy="104" r="2.5" fill="#4A2F1B" />
          <circle cx="89" cy="104" r="2.5" fill="#4A2F1B" />

          {/* MOUTH */}
          <path d="M 72 113 Q 80 118, 88 113" fill="none" stroke="#5C1010" strokeWidth="3" strokeLinecap="round" />

          {/* Blush Cheeks */}
          <circle cx="49" cy="98" r="4.5" fill="#FF8A8A" opacity="0.4" />
          <circle cx="111" cy="98" r="4.5" fill="#FF8A8A" opacity="0.4" />
        </motion.g>

        {/* SUIT SLEEVE & FRIENDLY WAVE/POINT GESTURE */}
        <motion.g
          animate={hovered ? { 
            rotate: [0, -12, 10, -12, 0],
            x: [0, 2, -2, 2, 0]
          } : {
            rotate: [0, 3, 0],
          }}
          transition={{ 
            repeat: Infinity,
            duration: hovered ? 1.4 : 3.2,
            ease: "easeInOut"
          }}
          style={{ transformOrigin: "115px 135px" }}
        >
          {/* Dark Blue Suit Sleeve */}
          <path d="M 115 135 L 138 112 L 148 122 L 125 145 Z" fill="#1E293B" stroke="#0F172A" strokeWidth="1.5" />
          
          {/* White shirt cuff */}
          <path d="M 136 111 L 141 106 L 146 111 L 141 116 Z" fill="#FFFFFF" />
          
          {/* Moose Hoof hand */}
          <circle cx="143" cy="108" r="7.5" fill="#5C3A21" stroke="#402010" strokeWidth="1.5" />
          
          {/* Pointy finger gesture */}
          <path d="M 138 105 Q 135 98, 140 98 Q 143 98, 142 105 Z" fill="#5C3A21" stroke="#402010" strokeWidth="1.2" />
        </motion.g>
      </svg>
      
      {/* Sparles of professional excellence of Career Moose */}
      {hovered && (
        <div className="absolute inset-0 pointer-events-none overflow-visible">
          <motion.div 
            initial={{ opacity: 0, scale: 0, x: 22, y: -22 }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5], x: [22, 30, 38], y: [-22, -34, -46] }}
            transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 0.1 }}
            className="absolute top-0 right-0 w-2 h-2 bg-amber-400 rotate-45 rounded-xs"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0, x: 32, y: -8 }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5], x: [32, 44, 50], y: [-8, -15, -25] }}
            transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 0.35 }}
            className="absolute top-2 right-1 w-1.5 h-1.5 bg-yellow-300 rotate-45 rounded-xs"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0, x: 12, y: -28 }}
            animate={{ opacity: [0, 1, 0], scale: [0.4, 0.9, 0.4], x: [12, 16, 20], y: [-28, -40, -50] }}
            transition={{ duration: 0.7, repeat: Infinity, repeatDelay: 0.2 }}
            className="absolute top-0 right-3 w-1.5 h-1.5 bg-sky-200 rotate-45 rounded-xs"
          />
        </div>
      )}
    </motion.div>
  );
}

export function getCustomRoadmapForJob(job: any): any[] {
  const roleLower = job.role.toLowerCase();
  const roleClean = job.role.split('(')[0].trim();
  const catLower = job.category.toLowerCase();

  // Helper for Antagning & YH search URLs
  const getEduSearchQuery = (role: string): string => {
    const base = role.split('(')[0].split('/')[0].replace(/Legitimerad|Auktoriserad/gi, "").trim();
    const lower = base.toLowerCase();
    if (lower.includes("mjukvaru") || lower.includes("software developer") || lower.includes("programmerare")) return "Mjukvaruutveckling";
    if (lower.includes("systemut") || lower.includes("system developer") || lower.includes("it-arkitekt") || lower.includes("it arkitekt")) return "Systemutveckling";
    if (lower.includes("webb") || lower.includes("frontend") || lower.includes("backend") || lower.includes("fullstack")) return "Webbutveckling";
    if (lower.includes("sjuksköterska") || lower.includes("nurse")) return "Sjuksköterska";
    if (lower.includes("läkare") || lower.includes("doctor")) return "Läkare";
    if (lower.includes("tandläkare")) return "Tandläkare";
    if (lower.includes("elektriker")) return "Elektriker";
    if (lower.includes("vvs")) return "VVS-montör";
    return base;
  };

  const eduQuery = getEduSearchQuery(job.role);
  const yhUrl = `https://www.yrkeshogskolan.se/hitta-utbildning/sok-utbildning/?q=${encodeURIComponent(eduQuery)}`;
  const antagningUrl = `https://www.antagning.se/se/search?freeText=${encodeURIComponent(eduQuery)}`;

  // 1. SOFTWARE DEVELOPER & IT/TECH ROLES
  if (catLower.includes("teknik") || roleLower.includes("utvecklare") || roleLower.includes("developer") || roleLower.includes("cybersecurity") || roleLower.includes("it") || roleLower.includes("designer")) {
    const isDeveloper = roleLower.includes("utvecklare") || roleLower.includes("developer");
    const isCyber = roleLower.includes("security") || roleLower.includes("säkerhet");
    const isDes = roleLower.includes("designer") || roleLower.includes("ux") || roleLower.includes("ui");
    const isCloud = roleLower.includes("cloud") || roleLower.includes("devops") || roleLower.includes("sysadm");
    
    let step1Title = `Skaffa en YH-examen eller högskoleutbildning inom ${eduQuery}`;
    let step1Desc = `Satsa på en målinriktad 2-årig Yrkeshögskoleutbildning (YH) med LIA-praktik, eller en 3-årig kandidatexamen i Datavetenskap. I Sverige är LIA (Lärande i arbete) på YH-utbildningar den mest direkta vägen till anställning eftersom du får praktisera på ett svenskt IT-bolag.`;
    let step1Dur = "1.5–3 år";

    if (isCyber) {
      step1Title = "Utbilda dig inom IT-säkerhet & nätverk";
      step1Desc = "En YH-examen inom molnsäkerhet eller nätverkstestning är en utmärkt bas. Företag kräver djup nätverkskunskap, så att komplettera studierna med nätverkscertifikat som CCNA ger dig ett enormt försprång.";
    } else if (isDes) {
      step1Title = "YH-utbildning eller kandidatexamen i UX/UI-design";
      step1Desc = "Läs digital design, interaktionsdesign eller kognitionsvetenskap på YH eller högskola. Fokusera särskilt på att lära dig designprocessen, användartid och de svenska kraven för digital tillgänglighet (WCAG-direktivet).";
    } else if (isCloud) {
      step1Title = "Målriktad Moln-/DevOps-teknikerutbildning";
      step1Desc = "Sök dig till yrkeshögskolans DevOps- eller Cloud Engineer-utbildningar. Vadstena, Nackademin och EC Utbildning är populära alternativ som inkluderar 20-30 veckors LIA-praktik hos svenska SaaS-bolag.";
    }

    let step2Title = `Bygg en personlig meritportfölj med ${job.requiredSkills.slice(0, 3).join(", ")}`;
    let step2Desc = `Svenska tech-företag rekryterar baserat på praktisk skicklighet. Skapa ett GitHub-konto och publicera 2-3 egna projekt där du använder ${job.requiredSkills.join(", ")}. Skriv utförliga och professionella dokumentationer (README) som visar din problemlösningsförmåga.`;
    let step2Dur = "2–4 månader";

    if (isCyber) {
      step2Title = "Skapa ett hemmalabb och ta grundläggande säkerhetscertifikat";
      step2Desc = "Installera virtuella miljöer (t.ex. Kali Linux), öva på penetrationstestning och logganalys i din egen sandbox. Förbered dig för branschledande certifieringar som CompTIA Security+ eller CEH (Certified Ethical Hacker) för att bevisa din formella kompetens.";
    } else if (isDes) {
      step2Title = "Bygg en visuell designportfölj i Figma";
      step2Desc = "Gör användarstudier, rita wireframes och skapa interaktiva prototyper i Figma för 2-3 fiktiva eller verkliga webbapplikationer. Visa hela din designprocess – från problemformulering och skisser till slutgiltigt gränssnitt.";
    } else if (isCloud) {
      step2Title = "Implementera automatiska pipelines via GitHub Actions & Terraform";
      step2Desc = "Lär dig att skriva Infrastructure as Code (IaC) med Terraform och konfigurera automatisk drift (CI/CD) med GitHub Actions. Skapa ett litet molnhobbyprojekt på AWS eller Azure och håll driftskostnaderna nere under gratiszonen.";
    }

    let step3Title = `CV-optimering och sök bland de ${job.activeAds} aktiva annonserna`;
    let step3Desc = `Anpassa ditt CV för svenska tech-rekryterare genom att tydligt lista din tekniska stack. Förutom Platsbanken bör du söka via nischade kanaler som LinkedIn, Demando eller Uptrail för att hitta relevanta juniora tjänster inom ${catLower}.`;
    let step3Dur = "1–3 månader";

    return [
      { step: 1, title: step1Title, description: step1Desc, duration: step1Dur, resources: [{ name: "Hitta YH-program inom IT", url: yhUrl }, { name: "Hitta universitetskurser på Antagning.se", url: antagningUrl }] },
      { step: 2, title: step2Title, description: step2Desc, duration: step2Dur, resources: [{ name: "Läs mer om Git & GitHub", url: "https://github.com" }, { name: "Skriva ett starkt CV", url: "https://arbetsformedlingen.se/tips-och-rad/skriva-cv" }] },
      { step: 3, title: step3Title, description: step3Desc, duration: step3Dur, resources: [{ name: `Sök lediga tjänster på Platsbanken (${job.activeAds} st)`, url: `https://arbetsformedlingen.se/platsbanken/annonser?q=${encodeURIComponent(roleClean)}` }] }
    ];
  }

  // 2. MEDICAL & HEALTHCARE ROLES
  if (catLower.includes("hälsa") || roleLower.includes("sjuksköterska") || roleLower.includes("läkare") || roleLower.includes("tandläkare") || roleLower.includes("psykolog") || roleLower.includes("sköterska") || roleLower.includes("underr") || roleLower.includes("apotek") || roleLower.includes("fysioterapeut")) {
    const isNurse = roleLower.includes("sjuksköterska") || roleLower.includes("sköterska");
    const isDoc = roleLower.includes("läkare");
    const isUndersk = roleLower.includes("undersköterska");
    
    let step1Title = `Slutför din utbildning till ${roleClean}`;
    let step1Desc = `Genomgå det formella akademiska programmet på högskola eller universitet (3 år för sjuksköterska/fysioterapeut, 5-6 år för psykolog/läkare/tandläkare). För undersköterskor är det Vård- och omsorgsprogrammet på gymnasieskola eller vuxenutbildning (Komvux) som gäller.`;
    let step1Dur = isUndersk ? "1.5 år" : isNurse ? "3 år" : "5–6 år";

    let step2Title = "Ansök om svensk yrkeslegitimation från Socialstyrelsen";
    let step2Desc = "För legitimerade yrken är det ett strikt lagkrav under patientsäkerhetslagen. Så fort du fått dina betyg skickar du ansökan till Socialstyrelsen. Om du har utländsk utbildning krävs genomgången språkkurs i svenska (C1 level) samt kunskapsprov och praktisk tjänstgöring.";
    let step2Dur = "1–3 månader";

    if (isUndersk) {
      step2Title = "Kräv din skyddade yrkestitel hos Socialstyrelsen";
      step2Desc = "Sedan juli 2023 är Undersköterska en skyddad yrkestitel i Sverige. Du måste ansöka om ett formellt bevis från Socialstyrelsen efter avslutad vårdutbildning för att få tillsvidareanställning som undersköterska i kommunal eller regional vård.";
    }

    let step3Title = "Anställning hos region, kommun eller privat vårdgivare";
    let step3Desc = `Sveriges hälso- och sjukvård har ett enormt strukturellt personalbehov. Det finns just nu ${job.activeAds} lediga tjänster i hela landet. Sök jobb direkt via Regionens jobbportaler, 'Offentliga Jobb' eller Platsbanken. Välj primärvård, sjukhusvård eller hemtjänst beroende på din specialistprofil.`;
    let step3Dur = "1–2 månader";

    return [
      { step: 1, title: step1Title, description: step1Desc, duration: step1Dur, resources: [{ name: "Sök vårdprogram på Antagning.se", url: antagningUrl }, { name: "Yrkesutbildningar på Komvux", url: "https://www.studentum.se/utbildning/komvux" }] },
      { step: 2, title: step2Title, description: step2Desc, duration: step2Dur, resources: [{ name: "Legitimation - Socialstyrelsen", url: "https://legitimation.socialstyrelsen.se/" }] },
      { step: 3, title: step3Title, description: step3Desc, duration: step3Dur, resources: [{ name: `Sök lediga tjänster på Platsbanken (${job.activeAds} st)`, url: `https://arbetsformedlingen.se/platsbanken/annonser?q=${encodeURIComponent(roleClean)}` }] }
    ];
  }

  // 3. EDUCATION / LÄRARE ROLES
  if (catLower.includes("utbildning") || roleLower.includes("lärare") || roleLower.includes("pedagog") || roleLower.includes("förskollärare")) {
    const isForskola = roleLower.includes("förskollärare");
    
    let step1Title = `Avlägga Lärar- eller förskollärarexamen`;
    let step1Desc = `Genomför Lärarprogrammet (Grundlärarutbildning, Ämneslärarutbildning 4.5-5 år eller Förskollärarutbildning 3.5 år) vid ett ackrediterat universitet. Om du redan har tillräckliga ämnesstudier bakom dig kan du söka Kompletterande Pedagogisk Utbildning (KPU) på 1-1.5 år för snabbbehörighet.`;
    let step1Dur = isForskola ? "3.5 år" : "1.5–5 år";

    let step2Title = "Ansök om formell lärarlegitimation hos Skolverket";
    let step2Desc = "Lärarlegitimationen är ett svenskt lagkrav för att få tillsvidareanställning samt rätten att sätta betyg och självständigt ansvara för undervisningen. Du ansöker elektroniskt hos Skolverket genom att bifoga ditt examensbevis från universitetet.";
    let step2Dur = "1–2 månader";

    let step3Title = `Säkra en skoltjänst bland landets ${job.activeAds} annonser`;
    let step3Desc = `Det råder stor lärarbrist i hela Sverige, framförallt inom NO-ämnen, matematik och yrkesutbildningar. Sök tjänster direkt hos kommunernas egna rekryteringssajter eller hos fristående skolkoncerner (t.ex. IES, Kunskapsskolan). Du erhåller en mentor under ditt första yrkesår (introduktionsperioden).`;
    let step3Dur = "1–3 månader";

    return [
      { step: 1, title: step1Title, description: step1Desc, duration: step1Dur, resources: [{ name: "Lärarutbildningar på Antagning.se", url: antagningUrl }] },
      { step: 2, title: step2Title, description: step2Desc, duration: step2Dur, resources: [{ name: "Ansök om Legitimation - Skolverket", url: "https://www.skolverket.se" }] },
      { step: 3, title: step3Title, description: step3Desc, duration: step3Dur, resources: [{ name: `Sök skoltjänster på Platsbanken (${job.activeAds} st)`, url: `https://arbetsformedlingen.se/platsbanken/annonser?q=${encodeURIComponent(roleClean)}` }] }
    ];
  }

  // 4. ELEKTRIKER
  if (roleLower.includes("elektriker")) {
    return [
      {
        step: 1,
        title: "Gymnasial El-utbildning eller Yrkesvux (Komvux)",
        description: "Skaffa behörighet inom El- och energiprogrammet med inriktning Elteknik. Du behöver klara alla grundkurser inklusive elinstallationer, elkraftsystem och svenska för att vara behörig att gå vidare till lärlingstid.",
        duration: "1–2 år",
        resources: [
          { name: "Hitta elektrikerkurser på Komvux", url: "https://www.studentum.se/utbildning/komvux" }
        ]
      },
      {
        step: 2,
        title: "Klara 1600 timmars lärlingstid för ECY-certifikat",
        description: "Efter skolan registrerar du dig hos Elbranschens Centrala Yrkesnämnd (ECY). Du gör 1600 timmar (ca 1 år) som anställd lärling hos ett behörigt elinstallationsföretag under handledning för att få ditt eftertraktade yrkesbevis.",
        duration: "10–12 månader",
        resources: [
          { name: "Läs mer om lärlingsregler på ECY", url: "https://www.ecy.com" }
        ]
      },
      {
        step: 3,
        title: `Ansök om jobb & sök elinstallationsauktorisation`,
        description: `Det finns just nu ${job.activeAds} lediga elektrikerjobb i Sverige. Ett giltigt B-körkort är ett absolut standardkrav för att köra servicebilar. Som färdig elektriker kan du senare studera vidare för att få personlig elinstallationsauktorisation (t.ex. AL eller B) hos Elsäkerhetsverket.`,
        duration: "1–3 månader",
        resources: [
          { name: `Hitta lediga elektrikerannonser (${job.activeAds} st)`, url: `https://arbetsformedlingen.se/platsbanken/annonser?q=Elektriker` }
        ]
      }
    ];
  }

  // 5. VVS-MONTÖR
  if (roleLower.includes("vvs")) {
    return [
      {
        step: 1,
        title: "VVS- och fastighetsprogrammet eller motsvarande vuxenutbildning",
        description: "Gå en grundutbildning inom VVS-teknik. Du får lära dig rördragning, systemkunskap för sanitet och värme, ritningsläsning samt svetstekniker under kontrollerade former.",
        duration: "1–2 år",
        resources: [
          { name: "Sök VVS-utbildningar på Yrkeshögskolan/Vux", url: "https://www.yrkeshogskolan.se" }
        ]
      },
      {
        step: 2,
        title: "Slutför din lärlingstid (850 timmar) och klara det formella Branschprovet",
        description: "Arbeta som VVS-lärling på ett certifierat VVS-företag. Efter godkänd lärlingstid bokar du och klarar VVS-branschens yrkesnämnds prov (Branschprovet) för att erhålla ditt yrkesbevis som certifierad VVS-montör.",
        duration: "1.5–2 år",
        resources: [
          { name: "VVS Branschens Yrkesnämnd info", url: "http://vvsyn.se" }
        ]
      },
      {
        step: 3,
        title: `Säkra anställning och sök bland ${job.activeAds} lediga tjänster`,
        description: `Byggbranschen och renoveringssektorn söker ständigt legitimerade rörläggare. Se till att du har ett giltigt svenskt B-körkort för att kunna ta hand om servicebilen och åka ut till kunder självständigt.`,
        duration: "1–3 månader",
        resources: [
          { name: `Sök VVS-jobb på Platsbanken Sverige (${job.activeAds} st)`, url: `https://arbetsformedlingen.se/platsbanken/annonser?q=VVS` }
        ]
      }
    ];
  }

  // 6. LASTBILSCHAUFFÖR (TRUCK DRIVER)
  if (roleLower.includes("lastbil") || roleLower.includes("chaufför") || roleLower.includes("fartyg") || roleLower.includes("buss") || roleLower.includes("driver")) {
    return [
      {
        step: 1,
        title: "Ta C/CE-körkort för tung lastbil & släp",
        description: "Skriv inskrivningsprov, ladda ner Trafikverkets teoriprogram och genomgå den praktiska körkortsträningen för tung lastbil (C). Att utöka till CE (med tungt släp) gör dig dubbelt så eftertraktad på marknaden.",
        duration: "3–6 månader",
        resources: [
          { name: "Körkortskrav & prov - Trafikverket", url: "https://www.trafikverket.se" }
        ]
      },
      {
        step: 2,
        title: "Klara la obligatoriska YKB-grundutbildningen (140 timmar)",
        description: "Följ lagkravet för yrkesmässig godstrafik inom EU/EES genom att ta Yrkeskompetensbeviset (YKB). Utbildningen omfattas av sparsam körning, lastsäkring, lagar/regler samt trafiksäkerhet och avslutas med ett prov hos Trafikverket.",
        duration: "1–2 månader",
        resources: [
          { name: "YKB-utbildningsregister hos Transportstyrelsen", url: "https://www.transportstyrelsen.se" }
        ]
      },
      {
        step: 3,
        title: `Sök anställning hos åkeri bland ${job.activeAds} lediga tjänster`,
        description: `Sverige lider av massiv förarbrist inom transportsektorn. Registrera ditt digitala förarkort för färdskrivaren, skriv ett strukturerat CV och sök direkt till stora välkända logistikföretag eller lokala åkerier.`,
        duration: "1–2 månader",
        resources: [
          { name: `Sök Lastbilsförarjobb på Platsbanken (${job.activeAds} st)`, url: `https://arbetsformedlingen.se/platsbanken/annonser?q=Lastbilschauff%C3%B6r` }
        ]
      }
    ];
  }

  // 7. LAGERARBETARE
  if (roleLower.includes("lager") || roleLower.includes("warehouse")) {
    return [
      {
        step: 1,
        title: "Genomgå en intensiv truckförarutbildning (A+B-kort)",
        description: "Ta truckkort för de vanligaste lagertruckarna: Ledstaplare (A2), Motviktstruck (B1) och Skjutstativtruck (B3). Det är en kort utbildning på 2-4 dagar som ökar dina jobbchanser markant.",
        duration: "2–4 dagar",
        resources: [
          { name: "Hitta truckutbildningar i Sverige", url: "https://www.studentum.se/utbildning/truckkort" }
        ]
      },
      {
        step: 2,
        title: "Lär dig grunderna i materialflöden och lagersystem (WMS)",
        description: "Bygg upp förståelse för hur en distributionscentral fungerar: Inleverans, orderplock med handskanner (PDA/Voice), paketering, lastsäkring samt hur du samverkar säkert med rörliga fordon.",
        duration: "1–2 veckor",
        resources: [
          { name: "Läs mer om lagerarbete på Arbetsförmedlingen", url: "https://arbetsformedlingen.se/planera-din-karriar/hitta-yrken" }
        ]
      },
      {
        step: 3,
        title: `Skriv in dig hos bemanningsföretag & sök bland ${job.activeAds} annonser`,
        description: `De flesta lagerrekryteringar i Sverige sker löpande via bemanningsföretag som till exempel Adecco, Randstad, Lernia eller Manpower. Registrera din profil och flagga att ditt truckkort är aktivt för omedelbar matchning.`,
        duration: "1–3 veckor",
        resources: [
          { name: `Sök lagerarbetarjobb på Platsbanken (${job.activeAds} st)`, url: `https://arbetsformedlingen.se/platsbanken/annonser?q=Lagerarbetare` }
        ]
      }
    ];
  }

  // Fallback default but still beautifully Swedified and referencing specific data points
  return [
    {
      step: 1,
      title: `Moment 1: Skaffa formell behörighet för ${roleClean}`,
      description: `För att arbeta som ${roleClean} i Sverige krävs oftast en godkänd utbildningsprofil. Branschens förväntade krav är: ${job.educationRequired}. Sök och tillgodose utbildningsmöjligheterna via offentliga anslag.`,
      duration: "1–3 år",
      resources: [
        { name: "Hitta utbildningar på Antagning.se", url: antagningUrl },
        { name: "Sök Yrkeshögskoleutbildningar på YH", url: yhUrl }
      ]
    },
    {
      step: 2,
      title: `Moment 2: Träna fackkunskaper (${job.requiredSkills.slice(0, 3).join(", ")})`,
      description: `Satsa tid på att praktisera kärnfärdigheterna i din profil: ${job.requiredSkills.join(", ")}. Skapa ett modernt, professionellt svenskt CV och samla dina intyg.`,
      duration: "2–4 månader",
      resources: [
        { name: "Skriva ett starkt svenskt CV", url: "https://arbetsformedlingen.se/tips-och-rad/skriva-cv" }
      ]
    },
    {
      step: 3,
      title: `Moment 3: Sök lediga tjänster bland de ${job.activeAds} aktiva annonserna`,
      description: `Sök lediga jobb aktivt i Sverige. Det finns just nu ${job.activeAds} utlysta tjänster för ${roleClean} på Platsbanken. Sortera på din hemregion och nätverka aktivt.`,
      duration: "1–3 månader",
      resources: [
        { name: `Sök lediga tjänster på Platsbanken (${job.activeAds} st)`, url: `https://arbetsformedlingen.se/platsbanken/annonser?q=${encodeURIComponent(roleClean)}` }
      ]
    }
  ];
}

export default function App() {
  // Theme state: support both ljust (light) and mörkt (dark) modes inspired by paper & ink
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("karriaralg_dark");
      return saved === "true";
    }
    return false;
  });

  useEffect(() => {
    const mainEl = document.getElementById("advisor-app-container");
    if (mainEl) {
      if (darkMode) {
        mainEl.classList.add("dark");
      } else {
        mainEl.classList.remove("dark");
      }
    }
    localStorage.setItem("karriaralg_dark", String(darkMode));
  }, [darkMode]);

  // PWA states & custom installation guides
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [installParamActive, setInstallParamActive] = useState<boolean>(false);
  const installRequestedRef = useRef<boolean>(false);
  const [installToast, setInstallToast] = useState<{
    show: boolean;
    message: string;
    type: "loading" | "info" | "success" | "error";
  }>({ show: false, message: "", type: "info" });
  const [showIosQuickGuide, setShowIosQuickGuide] = useState<boolean>(false);
  const [showPwaBanner, setShowPwaBanner] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("lasse_pwa_dismissed");
      return saved !== "true";
    }
    return true;
  });
  const [isStandalone, setIsStandalone] = useState<boolean>(false);

  const isIOS = () => {
    if (typeof window === "undefined" || !navigator) return false;
    const ua = navigator.userAgent;
    return /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  };

  const isAndroid = () => {
    if (typeof window === "undefined" || !navigator) return false;
    const ua = navigator.userAgent;
    return /Android/i.test(ua);
  };

  const isInIframe = () => {
    if (typeof window === "undefined") return false;
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  };

  useEffect(() => {
    // Detect standalone display mode (running inside installed PWA)
    if (typeof window !== "undefined") {
      const isLaunchedStandalone = 
        window.matchMedia('(display-mode: standalone)').matches || 
        (navigator as any).standalone === true || 
        document.referrer.includes('android-app://');
      setIsStandalone(!!isLaunchedStandalone);
    }

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      console.log("[Lasse PWA] beforeinstallprompt captured.");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("install") === "true") {
        setInstallParamActive(true);
        try {
          const newUrl = window.location.pathname + window.location.hash;
          window.history.replaceState({}, document.title, newUrl);
        } catch (err) {
          console.warn("Could not sweep URL param", err);
        }
      }
    }
  }, []);

  // Programmatic client-side mascot rendering & upload to serve as standard PWA logo.png
  useEffect(() => {
    const saveMascotLogo = async () => {
      const flagKey = "lasse_moose_logo_saved_v7";
      if (localStorage.getItem(flagKey) === "true") return;

      try {
        const svgMarkup = `<svg viewBox="0 0 160 160" width="512" height="512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="mooseFur" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#8A5A36" stop-opacity="1" />
      <stop offset="100%" stop-color="#5C3A21" stop-opacity="1" />
    </linearGradient>
    <linearGradient id="snoutGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#D29A74" stop-opacity="1" />
      <stop offset="100%" stop-color="#B07C58" stop-opacity="1" />
    </linearGradient>
    <linearGradient id="antlerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FED766" stop-opacity="1" />
      <stop offset="100%" stop-color="#EE964B" stop-opacity="1" />
    </linearGradient>
    <linearGradient id="backgroundGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0F172A" stop-opacity="1" />
      <stop offset="100%" stop-color="#020617" stop-opacity="1" />
    </linearGradient>
  </defs>

  <circle cx="80" cy="80" r="76" fill="url(#backgroundGrad)" stroke="#1E293B" strokeWidth="3" />
  <path d="M 40 60 C 20 50, 10 35, 12 15 C 13 10, 22 10, 23 18 C 24 30, 32 38, 38 42 C 34 25, 25 15, 29 5 C 32 0, 39 5, 41 15 C 44 26, 46 36, 45 42 C 48 24, 48 10, 54 8 C 59 6, 62 14, 58 26 C 54 36, 50 48, 48 55 Z" fill="url(#antlerGrad)" stroke="#A06020" strokeWidth="1.5" />
  <path d="M 120 60 C 140 50, 150 35, 148 15 C 147 10, 138 10, 137 18 C 136 30, 128 38, 122 42 C 126 25, 135 15, 131 5 C 128 0, 121 5, 119 15 C 116 26, 114 36, 115 42 C 112 24, 112 10, 106 8 C 101 6, 98 14, 102 26 C 106 36, 110 48, 112 55 Z" fill="url(#antlerGrad)" stroke="#A06020" strokeWidth="1.5" />
  <path d="M 40 135 Q 15 145, 15 160 L 145 160 Q 145 145, 120 135 Z" fill="#1E293B" stroke="#0F172A" strokeWidth="1.5" />
  <path d="M 68 135 L 80 154 L 92 135 Z" fill="#FFFFFF" />
  <path d="M 78 148 L 82 148 L 84 159 L 80 163 L 76 159 Z" fill="#FDE047" stroke="#EAB308" strokeWidth="0.5" />
  <path d="M 77 145 L 83 145 L 81 149 L 79 149 Z" fill="#EAB308" />
  <path d="M 62 135 L 74 151 L 74 135 Z" fill="#334155" stroke="#0F172A" strokeWidth="1" />
  <path d="M 98 135 L 86 151 L 86 135 Z" fill="#334155" stroke="#0F172A" strokeWidth="1" />
  <path d="M 48 80 C 25 78, 20 88, 18 95 C 18 100, 30 100, 42 90 Z" fill="#5C3A21" stroke="#402010" strokeWidth="1.5" />
  <path d="M 42 84 C 28 85, 26 91, 36 90 Z" fill="#E89B9B" />
  <path d="M 112 80 C 135 78, 140 88, 142 95 C 142 100, 130 100, 118 90 Z" fill="#5C3A21" stroke="#402010" strokeWidth="1.5" />
  <path d="M 118 84 C 132 85, 134 91, 124 90 Z" fill="#E89B9B" />
  <rect x="42" y="62" width="76" height="66" rx="32" fill="url(#mooseFur)" stroke="#402010" strokeWidth="2" />
  <ellipse cx="65" cy="85" rx="8" ry="11" fill="#FFFFFF" stroke="#402010" strokeWidth="1.5" />
  <circle cx="65" cy="84" r="4.5" fill="#101827" />
  <circle cx="63" cy="81" r="1.5" fill="#FFFFFF" />
  <ellipse cx="95" cy="85" rx="8" ry="11" fill="#FFFFFF" stroke="#402010" strokeWidth="1.5" />
  <circle cx="95" cy="84" r="4.5" fill="#101827" />
  <circle cx="93" cy="81" r="1.5" fill="#FFFFFF" />
  <g stroke="#000000" strokeWidth="2.5" fill="none">
    <rect x="52" y="77" width="23" height="18" rx="6" stroke="#000000" />
    <rect x="85" y="77" width="23" height="18" rx="6" stroke="#000000" />
    <line x1="75" y1="84" x2="85" y2="84" />
    <line x1="42" y1="82" x2="52" y2="82" />
    <line x1="108" y1="82" x2="118" y2="82" />
  </g>
  <path d="M 50 100 Q 80 82, 110 100 Q 112 118, 80 122 Q 48 118, 50 100 Z" fill="url(#snoutGrad)" stroke="#402010" strokeWidth="1.5" />
  <circle cx="71" cy="104" r="2.5" fill="#4A2F1B" />
  <circle cx="89" cy="104" r="2.5" fill="#4A2F1B" />
  <path d="M 72 113 Q 80 118, 88 113" fill="none" stroke="#5C1010" strokeWidth="3" strokeLinecap="round" />
  <circle cx="49" cy="98" r="4.5" fill="#FF8A8A" opacity="0.4" />
  <circle cx="111" cy="98" r="4.5" fill="#FF8A8A" opacity="0.4" />
</svg>`;

        const svgBlob = new Blob([svgMarkup], { type: "image/svg+xml;charset=utf-8" });
        const blobURL = URL.createObjectURL(svgBlob);
        
        const image = new Image();
        image.src = blobURL;
        image.onload = async () => {
          const canvas = document.createElement("canvas");
          canvas.width = 512;
          canvas.height = 512;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(image, 0, 0, 512, 512);
            const pngDataUrl = canvas.toDataURL("image/png");
            
            await fetch("/api/save-logo", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ image: pngDataUrl })
            });
            
            localStorage.setItem(flagKey, "true");
            console.log("[Lasse PWA] Custom Mascot logo rendered and synchronized perfectly!");
          }
          URL.revokeObjectURL(blobURL);
        };
      } catch (err) {
        console.error("Failed to automatically generate crisp PNG of Mascot:", err);
      }
    };

    saveMascotLogo();
  }, []);

  const triggerNativeInstall = async () => {
    if (!deferredPrompt) return;
    try {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the PWA install prompt');
        setShowPwaBanner(false);
        localStorage.setItem("lasse_pwa_dismissed", "true");
      }
      setDeferredPrompt(null);
    } catch (err) {
      console.warn("Failed to trigger native install:", err);
    }
  };

  const handleInstallAction = () => {
    if (isStandalone) {
      setInstallToast({
        show: true,
        message: "Lasse Karriärälg körs redan som en installerad mobilapp! 🦌📱",
        type: "success"
      });
      setTimeout(() => {
        setInstallToast(t => t.type === 'success' ? { ...t, show: false } : t);
      }, 4000);
      return;
    }

    if (isIOS()) {
      setShowIosQuickGuide(true);
      return;
    }

    if (isInIframe()) {
      setInstallToast({
        show: true,
        message: "Öppnar i en ny flik för att påbörja installationen... 🚀",
        type: "loading"
      });
      setTimeout(() => {
        setInstallToast(t => t.type === 'loading' ? { ...t, show: false } : t);
        const targetUrl = window.location.origin + "?install=true";
        window.open(targetUrl, "_blank");
      }, 1200);
      return;
    }

    if (deferredPrompt) {
      triggerNativeInstall();
    } else {
      // Show the beautiful manual installation guide instantly with zero delay!
      setShowInstallGuide(true);
      setInstallToast({
        show: true,
        message: "Öppnade installationsguiden för din mobil & webbläsare! 📱✨",
        type: "success"
      });
      setTimeout(() => {
        setInstallToast(t => t.type === 'success' ? { ...t, show: false } : t);
      }, 4000);
    }
  };

  const dismissPwaBanner = () => {
    setShowPwaBanner(false);
    localStorage.setItem("lasse_pwa_dismissed", "true");
  };

  const [showInstallGuide, setShowInstallGuide] = useState(false);

  // 3-page layout tab state: 'chat' | 'jobs' | 'profile'
  const [activeTab, setActiveTab] = useState<'chat' | 'jobs' | 'profile'>('chat');
  const [hoveredDockItem, setHoveredDockItem] = useState<string | null>(null);

  // Mascot dynamic state
  const [mascotState, setMascotState] = useState<MascotState>("idle");

  // User Profile State
  const [profile, setProfile] = useState(() => {
    return {
      ...INITIAL_USER_PROFILE,
      currentJob: "Juniorutvecklare (Sökande)"
    };
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [favoriteJobs, setFavoriteJobs] = useState<string[]>([
    "Mjukvaruutvecklare (Software Developer)",
    "Systemutvecklare / IT-arkitekt",
    "Legitimerad Sjuksköterska (Registered Nurse)"
  ]);
  const [selectedFavoriteJob, setSelectedFavoriteJob] = useState<string>("Mjukvaruutvecklare (Software Developer)");
  const [profileSubTab, setProfileSubTab] = useState<'profile-details' | 'saved-careers' | 'active-progression'>('saved-careers');
  const [savedJobPosts, setSavedJobPosts] = useState<JobMatch[]>([
    {
      id: "pb-991203",
      title: "React-utvecklare till framtidens SaaS-plattform",
      company: "Svea Tech Solutions AB",
      location: "Stockholm",
      salary: "45 000 - 58 000 SEK",
      matchScore: 82,
      description: "Vi söker en driven frontendutvecklare med starka kunskaper inom React, TypeScript och Tailwind CSS för att bygga nästa generations molnbaserade tjänst. Du samarbetar tätt med UX-designers och vårt intelligenta backend-team.",
      source: "Arbetsförmedlingen",
      url: "https://arbetsformedlingen.se/platsbanken",
      postedDate: "Igår",
      skillsDemanded: ["TypeScript", "React", "REST-API:er"]
    }
  ]);
  const [uploadedDocs, setUploadedDocs] = useState<{ name: string; size: string; uploadDate: string }[]>([
    { name: "Svens_CV_Svenska_2026.pdf", size: "142 KB", uploadDate: "2026-06-10" },
    { name: "Examensbevis_Frontend_YH.pdf", size: "320 KB", uploadDate: "2026-06-11" }
  ]);
  const [newSkill, setNewSkill] = useState("");
  const [cvText, setCvText] = useState(INITIAL_USER_PROFILE.cvText);

  // Roadmap local progress tracking
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem("karriaralg_roadmap_steps");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Watch and persist completedSteps
  useEffect(() => {
    try {
      localStorage.setItem("karriaralg_roadmap_steps", JSON.stringify(completedSteps));
    } catch (e) {
      console.warn("Failed to persist completed steps to localStorage:", e);
    }
  }, [completedSteps]);
  
  // File Upload State
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileBase64, setFileBase64] = useState<{ base64: string; mimeType: string; name: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Pre-populated statistics & scores for software developer (updated with clean sources)
  const [careerScore, setCareerScore] = useState<CareerScore>({
    matchPercentage: 74,
    overallRating: "Good",
    expectedSalary: {
      entry: "35,000 SEK/month",
      mid: "48,000 SEK/month",
      senior: "68,000 SEK/month",
      currency: "SEK"
    },
    missingSkills: [
      { skill: "TypeScript", importance: "High", estimatedTimeToLearn: "1-2 months", category: "Languages" },
      { skill: "Docker", importance: "Medium", estimatedTimeToLearn: "3 weeks", category: "Infrastructure" },
      { skill: "AWS/Azure Cloud", importance: "Medium", estimatedTimeToLearn: "1-2 months", category: "Infrastructure" }
    ],
    strengthSkills: ["JavaScript", "React", "HTML/CSS", "Git", "REST APIs", "SQL"],
    probabilityOfHiring: 78,
    timeNeededToQualify: "2-3 months",
    regionalDemand: {
      level: "High",
      growthRate: "+12.4% YoY",
      popularLocations: ["Stockholm", "Gothenburg", "Kista", "Malmö"]
    },
    swedishMarketComparison: {
      demandIndex: 8,
      popularSwedishPlatforms: [
        { name: "Arbetsförmedlingen Platsbanken", url: "https://arbetsformedlingen.se/platsbanken", count: 1420 },
        { name: "LinkedIn Jobs Sweden", url: "https://www.linkedin.com/jobs/search/?keywords=Developer&location=Sweden", count: 3200 },
        { name: "Indeed Sweden", url: "https://se.indeed.com", count: 1890 }
      ],
      notes: "High demand across Stockholm Kista cluster. Native collective agreements (Kollektivavtal) provide standard benefits."
    },
    roadmap: [
      {
        step: 1,
        title: "Moment 1: Skaffa utbildningen (Mjukvaruutveckling)",
        description: "Hitta rätt utbildningsväg inom mjukvarusektorn via högskoleutbildningar, yrkeshögskola (YH) eller Komvux. Sök och påbörja din utbildning för att lägga grunden.",
        duration: "1-2 år",
        resources: [
          { name: "TypeScript Handbook Guidelines", url: "https://www.typescriptlang.org/docs/" },
          { name: "Fullstack TS Roadmap", url: "https://roadmap.sh/typescript" }
        ]
      },
      {
        step: 2,
        title: "Moment 2: Skriva ett professionellt CV och bygga meritportfölj",
        description: "Skapa ett starkt CV anpassat för den svenska arbetsmarknaden. Bygg egna sidoprojekt och publicera källkoden på utvecklarplattformen GitHub för att visa upp din skicklighet.",
        duration: "2-4 veckor",
        resources: [
          { name: "Skriva ett vinnande CV i techsektorn", url: "https://arbetsformedlingen.se/tips-och-rad/skriva-cv" }
        ]
      },
      {
        step: 3,
        title: "Moment 3: Söka APL/LIA praktikplats och ditt slutgiltiga jobb",
        description: "Nätverka aktivt med svenska rekryterare på LinkedIn, säkra din lärande-i-arbete-praktik (APL/LIA) och ansök till lediga tjänster på Platsbanken och jobbportaler.",
        duration: "1-3 månader",
        resources: [
          { name: "Svenska YH-riktlinjer om LIA-praktik", url: "https://www.yrkeshogskolan.se/for-studerande/lia-och-praktik/" }
        ]
      }
    ]
  });

  const [marketPrognosis, setMarketPrognosis] = useState<MarketPrognosis>({
    role: "Software Developer (Mjukvaruutvecklare)",
    description: "Highly vital role across the Swedish public sector and private tech ecosystem (such as Spotify, Klarna, King, and Volvo). Involved in automating workflows, building core web clients, and cloud scalability.",
    salaryMin: 38000,
    salaryMax: 78000,
    salaryAverage: 52000,
    currency: "SEK/month",
    demandTrend: "highly-growing",
    demandScore: 89,
    forecastYears: [
      { year: 2026, score: 85 },
      { year: 2027, score: 88 },
      { year: 2028, score: 92 },
      { year: 2029, score: 95 },
      { year: 2030, score: 98 }
    ],
    keyDrivers: [
      "NIS2 cybersecurity state protocols requiring rapid system overhaul and audits across institutions.",
      "Vast investments in Swedish green energy automation grids and industrial automation in northern hubs.",
      "Persistent deficit of certified local systemutvecklare causing high reliance on international expertise."
    ],
    recommendedSwedishLinks: [
      { platform: "Platsbanken (AF)", url: "https://arbetsformedlingen.se/platsbanken", description: "Official Swedish Employment directory." },
      { platform: "Indeed SE", url: "https://se.indeed.com", description: "Consolidated commercial postings." }
    ]
  });

  // Jobs Explorer Search & List States
  const [searchKeyword, setSearchKeyword] = useState("Developer");
  const [searchLocation, setSearchLocation] = useState("All locations");
  const [jobsList, setJobsList] = useState<JobMatch[]>([]);
  const [searchingJobs, setSearchingJobs] = useState(false);
  const [explorerError, setExplorerError] = useState<string | null>(null);

  // Spelling correction states for job search keyword
  const [searchSpellingSuggestion, setSearchSpellingSuggestion] = useState<{
    hasCorrections: boolean;
    correctedText: string;
    suggestions: { original: string; correction: string; reason: string }[];
  } | null>(null);
  const [checkingSearchSpelling, setCheckingSearchSpelling] = useState(false);

  // Debounced search spelling check effect
  useEffect(() => {
    if (!searchKeyword || searchKeyword.trim().length < 3 || searchKeyword === "Developer") {
      setSearchSpellingSuggestion(null);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setCheckingSearchSpelling(true);
        const res = await fetch("/api/suggest-spelling", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: searchKeyword, context: "search" })
        });
        if (res.ok) {
          const data = await res.json();
          if (data && data.hasCorrections && data.correctedText && data.correctedText.toLowerCase().trim() !== searchKeyword.toLowerCase().trim()) {
            setSearchSpellingSuggestion(data);
          } else {
            setSearchSpellingSuggestion(null);
          }
        }
      } catch (err) {
        console.error("Spelling check error in search:", err);
      } finally {
        setCheckingSearchSpelling(false);
      }
    }, 700);

    return () => clearTimeout(timer);
  }, [searchKeyword]);

  // Active Job details focus state
  const [selectedJob, setSelectedJob] = useState<JobMatch | null>(null);
  const [authModalJob, setAuthModalJob] = useState<JobMatch | null>(null);
  const [isMobileJobDetailOpen, setIsMobileJobDetailOpen] = useState(false);
  const [isMobileCatalogDetailOpen, setIsMobileCatalogDetailOpen] = useState(false);

  // Job sub-tabs and catalog filtering states
  const [jobsSubTab, setJobsSubTab] = useState<'search' | 'catalog'>('catalog');
  const [catalogSearch, setCatalogSearch] = useState("");
  const [catalogSalaryFilter, setCatalogSalaryFilter] = useState<string>("all");
  const [catalogDemandFilter, setCatalogDemandFilter] = useState<string>("all");
  const [catalogCategoryFilter, setCatalogCategoryFilter] = useState<string>("all");
  const [catalogSort, setCatalogSort] = useState<string>("ads-desc");
  const [selectedCatalogJob, setSelectedCatalogJob] = useState<typeof IN_DEMAND_JOBS[0] | null>(null);
  const [catalogVisibleCount, setCatalogVisibleCount] = useState(20);

  // Evaluation trigger states
  const [evaluating, setEvaluating] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [cvError, setCvError] = useState<string | null>(null);
  const [successEvalMessage, setSuccessEvalMessage] = useState<string | null>(null);

  // Synchronize careerScore with the actively selected favorite job until user runs manual analysis
  useEffect(() => {
    if (hasAnalyzed) return;
    
    const activeJobName = favoriteJobs.includes(selectedFavoriteJob) ? selectedFavoriteJob : (favoriteJobs[0] || "");
    if (!activeJobName) return;

    // Find the job in IN_DEMAND_JOBS
    const job = IN_DEMAND_JOBS.find(j => j.role === activeJobName);
    if (job) {
      // Calculate missingSkills based on profile skills on-the-fly!
      const userSkillsNormalized = (profile.skills || []).map(s => s.toLowerCase().trim().replace(/[-\s]/g, ''));
      const jobSkills = job.requiredSkills || [];
      const hasSkills = jobSkills.filter(skill => {
        const sNorm = skill.toLowerCase().trim().replace(/[-\s]/g, '');
        return userSkillsNormalized.some(us => us.includes(sNorm) || sNorm.includes(us));
      });
      const missingSk = jobSkills.filter(skill => !hasSkills.includes(skill)).map(sk => ({
        skill: sk,
        importance: "High" as const,
        estimatedTimeToLearn: "1-2 månader",
        category: job.category
      }));
      const strengthSk = hasSkills;
      
      const matchPct = Math.min(100, Math.max(25, Math.round(
        35 + 
        (hasSkills.length / Math.max(1, jobSkills.length)) * 40 + 
        (((profile.education || "").toLowerCase().length > 10) ? 15 : 0) + 
        (((profile.certifications || "").toLowerCase().includes("körkort") || (profile.driverLicenses && profile.driverLicenses.length > 0)) ? 10 : 0)
      )));

      // Set career score dynamically
      setCareerScore({
        matchPercentage: matchPct,
        overallRating: matchPct >= 80 ? "Excellent" : matchPct >= 60 ? "Good" : "Needs Work",
        expectedSalary: {
          entry: `${Math.round(job.avgSalary * 0.75).toLocaleString('sv-SE')} SEK/månad`,
          mid: `${job.avgSalary.toLocaleString('sv-SE')} SEK/månad`,
          senior: `${Math.round(job.avgSalary * 1.4).toLocaleString('sv-SE')} SEK/månad`,
          currency: "SEK"
        },
        missingSkills: missingSk,
        strengthSkills: strengthSk,
        probabilityOfHiring: matchPct,
        timeNeededToQualify: "2-6 månader",
        regionalDemand: {
          level: job.demandLevel === "High" ? "High" : job.demandLevel === "Medium" ? "Steady" : "Declining",
          growthRate: "+5-10% YoY",
          popularLocations: ["Stockholm", "Göteborg", "Malmö"]
        },
        swedishMarketComparison: {
          demandIndex: job.demandLevel === "High" ? 8 : job.demandLevel === "Medium" ? 6 : 4,
          popularSwedishPlatforms: [
            { name: "Arbetsförmedlingen Platsbanken", url: `https://arbetsformedlingen.se/platsbanken/annonser?q=${encodeURIComponent(job.role.split('(')[0].trim())}`, count: job.activeAds },
            { name: "Indeed Sverige", url: `https://se.indeed.com/jobs?q=${encodeURIComponent(job.role.split('(')[0].trim())}`, count: Math.round(job.activeAds * 1.3) },
            { name: "LinkedIn Jobs Sweden", url: `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(job.role.split('(')[0].trim())}&location=Sweden`, count: Math.round(job.activeAds * 1.8) }
          ],
          notes: `Hög efterfrågan på kompetens inom ${job.category}. Svenska kollektivavtal garanterar reglerade arbetsförhållanden.`
        },
        roadmap: getCustomRoadmapForJob(job)
      });

      // Also set targeting role on profile
      setProfile(prev => {
        if (prev.targetRole === job.role) return prev;
        return {
          ...prev,
          targetRole: job.role
        };
      });
    }
  }, [selectedFavoriteJob, favoriteJobs, profile.skills, profile.education, profile.certifications, profile.driverLicenses, hasAnalyzed]);

  // Chat conversation state
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      role: "model",
      content: "Hej! Jag är Lasse, din personliga AI-karriärcoach för den svenska arbetsmarknaden. Varmt välkommen! 🍰☕\n\nJag har läst in dina profiluppgifter. Vi kan prata om allt som rör din karriärresa i Sverige:\n• 🤝 Kollektivavtal & Förmåner: Hur fackliga avtal, tjänstepension och lagreglerade villkor skapar trygghet på jobbet.\n• 💸 Löner & Skatter: Lönespann baserat på officiell SCB-statistik och inkomstskatt enligt Skatteverkets tabeller.\n• 📍 Platsbanken: Hur du bygger rätt kompetenser och matchar mot de senaste lediga tjänsterna.\n• 🏡 Svensk Arbetsplatskultur: Allt från oskrivna fika-regler på kontoret till praktiska karriärtips.\n\nVad är du nyfiken på att utforska idag? Skriv din fråga nedan så sätter vi igång! 🚀",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Firebase auth state and listeners
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isLoadingFirebaseData, setIsLoadingFirebaseData] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setIsAuthLoading(true);
      if (user) {
        setCurrentUser(user);
        setIsLoadingFirebaseData(true);
        
        // Immediately wipe Sven/demo data to guarantee a spotless slate for authenticated users
        const freshProfilePlaceholder = {
          fullName: user.displayName || "",
          targetRole: "",
          targetLocation: "Stockholm",
          email: user.email || "",
          phone: "",
          languages: "Svenska (Modersmål), Engelska (Flytande)",
          skills: [],
          education: "",
          certifications: "",
          driverLicenses: [],
          experience: "",
          interests: "",
          cvText: "",
          hasSetupCompleted: false,
        };
        setProfile(freshProfilePlaceholder);
        setFavoriteJobs([]);
        setSelectedFavoriteJob("");
        setSavedJobPosts([]);
        setCompletedSteps({});
        setUploadedDocs([]);

        try {
          const userDocRef = doc(db, "users", user.uid);
          let docSnap;
          try {
            docSnap = await getDoc(userDocRef);
          } catch (err) {
            handleFirestoreError(err, OperationType.GET, `users/${user.uid}`);
          }

          if (docSnap && docSnap.exists()) {
            const data = docSnap.data();
            if (data.profile) {
              // Ensure we enforce hasSetupCompleted check
              setProfile({
                ...data.profile,
                hasSetupCompleted: data.profile.hasSetupCompleted ?? false
              });
            }
            setFavoriteJobs(data.favoriteJobs || []);
            setSelectedFavoriteJob(data.selectedFavoriteJob || "");
            setSavedJobPosts(data.savedJobPosts || []);
            setCompletedSteps(data.completedSteps || {});
            setUploadedDocs(data.uploadedDocs || []);
            
            if (data.messages && data.messages.length > 0) {
              setMessages(data.messages);
            } else {
              setMessages([
                {
                  id: "init",
                  role: "model",
                  content: "Hej! Jag är Lasse, din personliga AI-karriärcoach för den svenska arbetsmarknaden. Varmt välkommen! 🍰☕\n\nJag har läst in dina profiluppgifter. Vi kan prata om allt som rör din karriärresa i Sverige:\n• 🤝 Kollektivavtal & Förmåner: Hur fackliga avtal, tjänstepension och lagreglerade villkor skapar trygghet på jobbet.\n• 💸 Löner & Skatter: Lönespann baserat på officiell SCB-statistik och inkomstskatt enligt Skatteverkets tabeller.\n• 📍 Platsbanken: Hur du bygger rätt kompetenser och matchar mot de senaste lediga tjänsterna.\n• 🏡 Svensk Arbetsplatskultur: Allt från oskrivna fika-regler på kontoret till praktiska karriärtips.\n\nVad är du nyfiken på att utforska idag? Skriv din fråga nedan så sätter vi igång! 🚀",
                  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }
              ]);
            }
          } else {
            // First time registration: Do NOT prepopulate with Sven Johansson
            setProfile(freshProfilePlaceholder);
            setFavoriteJobs([]);
            setSelectedFavoriteJob("");
            setSavedJobPosts([]);
            setCompletedSteps({});
            setUploadedDocs([]);
            setMessages([
              {
                id: "init",
                role: "model",
                content: "Hej! Jag är Lasse, din personliga AI-karriärcoach för den svenska arbetsmarknaden. Varmt välkommen! 🍰☕\n\nJag har läst in dina profiluppgifter. Vi kan prata om allt som rör din karriärresa i Sverige:\n• 🤝 Kollektivavtal & Förmåner: Hur fackliga avtal, tjänstepension och lagreglerade villkor skapar trygghet på jobbet.\n• 💸 Löner & Skatter: Lönespann baserat på officiell SCB-statistik och inkomstskatt enligt Skatteverkets tabeller.\n• 📍 Platsbanken: Hur du bygger rätt kompetenser och matchar mot de senaste lediga tjänsterna.\n• 🏡 Svensk Arbetsplatskultur: Allt från oskrivna fika-regler på kontoret till praktiska karriärtips.\n\nVad är du nyfiken på att utforska idag? Skriv din fråga nedan så sätter vi igång! 🚀",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }
            ]);

            try {
              await setDoc(userDocRef, {
                profile: freshProfilePlaceholder,
                favoriteJobs: [],
                selectedFavoriteJob: "",
                savedJobPosts: [],
                completedSteps: {},
                uploadedDocs: [],
                messages: [
                  {
                    id: "init",
                    role: "model",
                    content: "Hej! Jag är Lasse, din personliga AI-karriärcoach för den svenska arbetsmarknaden. Varmt välkommen! 🍰☕\n\nJag har läst in dina profiluppgifter. Vi kan prata om allt som rör din karriärresa i Sverige:\n• 🤝 Kollektivavtal & Förmåner: Hur fackliga avtal, tjänstepension och lagreglerade villkor skapar trygghet på jobbet.\n• 💸 Löner & Skatter: Lönespann baserat på officiell SCB-statistik och inkomstskatt enligt Skatteverkets tabeller.\n• 📍 Platsbanken: Hur du bygger rätt kompetenser och matchar mot de senaste lediga tjänsterna.\n• 🏡 Svensk Arbetsplatskultur: Allt från oskrivna fika-regler på kontoret till praktiska karriärtips.\n\nVad är du nyfiken på att utforska idag? Skriv din fråga nedan så sätter vi igång! 🚀",
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  }
                ]
              });
            } catch (err) {
              handleFirestoreError(err, OperationType.WRITE, `users/${user.uid}`);
            }
          }
        } catch (err) {
          console.error("Failed to fetch user data from Firestore on login:", err);
        } finally {
          setIsLoadingFirebaseData(false);
        }
      } else {
        setCurrentUser(null);
        // Reset to Sven Johansson demo profile for guest flow
        setProfile({
          ...INITIAL_USER_PROFILE,
          currentJob: "Juniorutvecklare (Sökande)",
          hasSetupCompleted: true
        });
        setFavoriteJobs([
          "Mjukvaruutvecklare (Software Developer)",
          "Systemutvecklare / IT-arkitekt",
          "Legitimerad Sjuksköterska (Registered Nurse)"
        ]);
        setSelectedFavoriteJob("Mjukvaruutvecklare (Software Developer)");
        setSavedJobPosts([
          {
            id: "pb-991203",
            title: "React-utvecklare till framtidens SaaS-plattform",
            company: "Svea Tech Solutions AB",
            location: "Stockholm",
            salary: "45 000 - 58 000 SEK",
            matchScore: 82,
            description: "Vi söker en driven frontendutvecklare med starka kunskaper inom React, TypeScript och Tailwind CSS för att bygga nästa generations molnbaserade tjänst. Du samarbetar tätt med UX-designers och vårt intelligenta backend-team.",
            source: "Arbetsförmedlingen",
            url: "https://arbetsformedlingen.se/platsbanken",
            postedDate: "Igår",
            skillsDemanded: ["TypeScript", "React", "REST-API:er"]
          }
        ]);
        setUploadedDocs([
          { name: "Svens_CV_Svenska_2026.pdf", size: "142 KB", uploadDate: "2026-06-10" },
          { name: "Examensbevis_Frontend_YH.pdf", size: "320 KB", uploadDate: "2026-06-11" }
        ]);
        setCompletedSteps({});
        setMessages([
          {
            id: "init",
            role: "model",
            content: "Hej! Jag är Lasse, din personliga AI-karriärcoach för den svenska arbetsmarknaden. Varmt välkommen! 🍰☕\n\nJag har läst in dina profiluppgifter. Vi kan prata om allt som rör din karriärresa i Sverige:\n• 🤝 Kollektivavtal & Förmåner: Hur fackliga avtal, tjänstepension och lagreglerade villkor skapar trygghet på jobbet.\n• 💸 Löner & Skatter: Lönespann baserat på officiell SCB-statistik och inkomstskatt enligt Skatteverkets tabeller.\n• 📍 Platsbanken: Hur du bygger rätt kompetenser och matchar mot de senaste lediga tjänsterna.\n• 🏡 Svensk Arbetsplatskultur: Allt från oskrivna fika-regler på kontoret till praktiska karriärtips.\n\nVad är du nyfiken på att utforska idag? Skriv din fråga nedan så sätter vi igång! 🚀",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }
      setIsAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Autosave status to cloud Firestore when state values adapt
  useEffect(() => {
    if (currentUser && !isLoadingFirebaseData) {
      // Guard: NEVER overwrite logged-in user documents with the default demo/guest profile data!
      if (profile.email === "sven.johansson@example.se" || profile.fullName === "Sven Johansson") {
        return;
      }

      const saveToFirestore = async () => {
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          await setDoc(userDocRef, {
            profile,
            favoriteJobs,
            selectedFavoriteJob,
            savedJobPosts,
            completedSteps,
            uploadedDocs,
            messages,
          }, { merge: true });
        } catch (err) {
          console.error("Auto-sync error saving to Firestore:", err);
          handleFirestoreError(err, OperationType.WRITE, `users/${currentUser.uid}`);
        }
      };

      const timer = setTimeout(() => {
        saveToFirestore();
      }, 1000); // 1-second debounce
      return () => clearTimeout(timer);
    }
  }, [currentUser, isLoadingFirebaseData, profile, favoriteJobs, selectedFavoriteJob, savedJobPosts, completedSteps, uploadedDocs, messages]);

  // Auto scroll chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, chatLoading]);

  // Synchronize catalog selection on filters changes
  useEffect(() => {
    setCatalogVisibleCount(20);
    const list = IN_DEMAND_JOBS.filter(job => {
      const matchesKeyword = !catalogSearch.trim() || 
        job.role.toLowerCase().includes(catalogSearch.toLowerCase()) ||
        job.requiredSkills.some(s => s.toLowerCase().includes(catalogSearch.toLowerCase())) ||
        job.category.toLowerCase().includes(catalogSearch.toLowerCase());
      
      let matchesSalary = true;
      if (catalogSalaryFilter === 'lt40k') {
        matchesSalary = job.avgSalary < 40000;
      } else if (catalogSalaryFilter === '40k55k') {
        matchesSalary = job.avgSalary >= 40000 && job.avgSalary <= 55000;
      } else if (catalogSalaryFilter === 'gt55k') {
        matchesSalary = job.avgSalary > 55000;
      }
      
      const matchesDemand = catalogDemandFilter === 'all' || job.demandLevel === catalogDemandFilter;
      const matchesCategory = catalogCategoryFilter === 'all' || job.category === catalogCategoryFilter;
      
      return matchesKeyword && matchesSalary && matchesDemand && matchesCategory;
    }).sort((a, b) => {
      if (catalogSort === 'ads-desc') return b.activeAds - a.activeAds;
      if (catalogSort === 'salary-desc') return b.avgSalary - a.avgSalary;
      if (catalogSort === 'role-asc') return a.role.localeCompare(b.role);
      return 0;
    });

    if (list.length > 0) {
      if (!selectedCatalogJob || !list.some(f => f.role === selectedCatalogJob.role)) {
        setSelectedCatalogJob(list[0]);
      }
    } else {
      setSelectedCatalogJob(null);
    }
  }, [catalogSearch, catalogSalaryFilter, catalogDemandFilter, catalogCategoryFilter, catalogSort]);

  const getLasseJobsComment = (): string => {
    if (searchingJobs) {
      return "Speglar dina kvalifikationer mot Platsbankens live-register... Muuu! Drick lite fika-kaffe så länge! ☕";
    }
    if (explorerError) {
      return "Hoppsan! Platsbanken-API var lite upptaget, men lugn – jag har laddat vårt intelligenta svenska reservregister med relevanta jobb! 🌲";
    }
    if (selectedJob) {
      const isFit = selectedJob.skillsDemanded && profile.skills.some(us => selectedJob.skillsDemanded.some(sd => sd.toLowerCase().replace(/\s+/g, '') === us.toLowerCase().replace(/\s+/g, '')));
      return `Lasse tipsar: Hos ${selectedJob.company} kan du glänsa! De söker en ${selectedJob.title} i ${selectedJob.location}. ${isFit ? 'Du har matchande kompetens, sök direkt!' : 'Kika på fackliga kollektivavtal och sök tjänsten!'}`;
    }
    if (searchKeyword && searchKeyword !== "Developer") {
      return `Muuuu! Jag hittade ${jobsList.length || 20} lediga jobb inom "${searchKeyword}". Kika på "Efterfrågan" för att se landskapets framtid! 🥕`;
    }
    return "Hej! Vill du byta yrkesbana? Skriv in en roll eller bransch till vänster så hämtar jag data och fackliga baslinjer! 🌲";
  };

  // Mascot dynamic animations based on state variables
  useEffect(() => {
    if (evaluating) {
      setMascotState("thinking");
    } else if (chatLoading) {
      setMascotState("thinking");
    }
  }, [evaluating, chatLoading]);

  useEffect(() => {
    if (successEvalMessage) {
      setMascotState("success");
      const t = setTimeout(() => {
        setMascotState("idle");
      }, 5000);
      return () => clearTimeout(t);
    }
  }, [successEvalMessage]);

  useEffect(() => {
    if (messages.length > 1) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === "model") {
        setMascotState("speaking");
        const t = setTimeout(() => {
          setMascotState("idle");
        }, 6400);
        return () => clearTimeout(t);
      }
    }
  }, [messages]);

  // Initial trigger to load real vacancies from Platsbanken
  useEffect(() => {
    triggerSwedishJobSearch("Developer", "All locations");
  }, []);

  const handleProfileChange = (field: string, value: any) => {
    const updated = { ...profile, [field]: value };
    setProfile(updated);
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      const updatedSkills = [...profile.skills, newSkill.trim()];
      setProfile({ ...profile, skills: updatedSkills });
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const updatedSkills = profile.skills.filter(s => s !== skillToRemove);
    setProfile({ ...profile, skills: updatedSkills });
  };

  // Run dynamic analysis on CV (manual text or PDF base64 file)
  const handleAnalyzeCV = async () => {
    setEvaluating(true);
    setCvError(null);
    setSuccessEvalMessage(null);

    const payloadText = cvText || `Name: ${profile.fullName}. Skills: ${profile.skills.join(", ")}. Education: ${profile.education}. Experience: ${profile.experience}. Certifications: ${profile.certifications}.`;

    try {
      const res = await fetch("/api/analyze-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cvText: payloadText,
          fileData: fileBase64 ? { base64: fileBase64.base64, mimeType: fileBase64.mimeType } : null,
          targetRole: profile.targetRole,
          location: profile.targetLocation
        })
      });

      if (!res.ok) {
        throw new Error("Unable to analyze profile. Please check that GEMINI_API_KEY is configured.");
      }

      const analyzedResult: CareerScore = await res.json();
      setCareerScore(analyzedResult);
      setHasAnalyzed(true);

      // Re-trigger outlook
      const outlookRes = await fetch("/api/market-outlook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: profile.targetRole,
          location: profile.targetLocation
        })
      });
      if (outlookRes.ok) {
        const outlookData = await outlookRes.json();
        setMarketPrognosis(outlookData);
      }

      // Sync user profile inputs with the analyzed role
      handleProfileChange("targetRole", profile.targetRole || analyzedResult.roadmap[0]?.title || "Software Developer");

      // Inject a follow-up advisory message in Chat Advisor
      const followUpMsg: Message = {
        id: `eval-msg-${Date.now()}`,
        role: "model",
        content: `Jag har nu beräknat din gapanalys direkt mot det svenska yrkeslandskapet!\n\n• Profilmatchning: ${analyzedResult.matchPercentage}% match mot målrollen (${analyzedResult.overallRating})\n• Kompetensgap: ${analyzedResult.missingSkills.length} utvecklingsområden identifierade\n• Uppskattad månadslön: Medianlön på ${analyzedResult.expectedSalary.mid}\n\nBeräkningarna baseras på officiell lönestatistik från SCB och svenska kollektivavtal. Vill du att vi diskuterar en studieplan eller karriärstrategi för att stänga dessa kompetensgap? Skriv din fråga här!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, followUpMsg]);

      setSuccessEvalMessage("Profile custom evaluation complete! Stats updated.");
    } catch (err: any) {
      console.error(err);
      setCvError(err.message || "Failed to analyze document.");
    } finally {
      setEvaluating(false);
    }
  };

  // Submit chat to live Swedish career coach
  const handleSendChatMessage = async (e?: React.FormEvent, overrideText?: string) => {
    if (e) e.preventDefault();
    const textToSend = overrideText || chatInput;
    if (!textToSend.trim() || chatLoading) return;

    if (!overrideText) {
      setChatInput("");
    }
    setChatError(null);

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setChatLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })),
          profile: profile
        })
      });

      if (!response.ok) {
        throw new Error("Unable to connect to the advisor. Verify your configuration.");
      }

      const resJson = await response.json();
      
      const updatedFields = resJson.profileUpdate ? Object.keys(resJson.profileUpdate) : undefined;
      const swedishFieldLabels: Record<string, string> = {
        fullName: "Namn",
        targetRole: "Yrkesmål",
        targetLocation: "Plats",
        email: "E-post",
        phone: "Telefonnummer",
        languages: "Språk",
        skills: "Kunskaper",
        education: "Utbildning",
        certifications: "Certifieringar",
        experience: "Arbetslivserfarenhet",
        interests: "Intressen",
        cvText: "CV-sammanfattning"
      };

      const modelMsg: Message = {
        id: `ai-${Date.now()}`,
        role: "model",
        content: resJson.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        profileUpdated: !!resJson.profileUpdate,
        updatedFields: updatedFields ? updatedFields.map(f => swedishFieldLabels[f] || f) : undefined
      };
      setMessages(prev => [...prev, modelMsg]);

      if (resJson.profileUpdate) {
        setProfile(prev => ({
          ...prev,
          ...resJson.profileUpdate
        }));
        
        // Trigger a happy/celebrating mascot state for Lasse
        setMascotState("celebrating");
        setTimeout(() => {
          setMascotState("idle");
        }, 4000);
      }

    } catch (err: any) {
      console.error(err);
      setChatError(err.message || "Advisor communication failed.");
    } finally {
      setChatLoading(false);
    }
  };

  // Live Swedish job search targeting Arbetsförmedlingen API
  const triggerSwedishJobSearch = async (kw: string, loc: string) => {
    setSearchingJobs(true);
    setExplorerError(null);
    setSearchKeyword(kw);
    setSearchLocation(loc);

    // 1. Live Job Listings Fetch promise from Platsbanken
    const jobsPromise = fetch("/api/search-jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        keyword: kw,
        location: loc === "All locations" || loc === "Alla platser" ? "" : loc,
        limit: 20
      })
    })
    .then(async (res) => {
      if (!res.ok) throw new Error("API call returned failure status.");
      const result = await res.json();
      const loadedJobs: JobMatch[] = result.jobs || [];
      setJobsList(loadedJobs);
      
      // Do not auto-select first job, leave it to the user to choose/click "Visa" in the listings to view details
      setSelectedJob(null);
    });

    // 2. Market outlook & compensation analytics promise
    const outlookPromise = fetch("/api/market-outlook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        role: kw,
        location: loc === "All locations" || loc === "Alla platser" ? "Sweden" : loc
      })
    })
    .then(async (res) => {
      if (res.ok) {
        const outlookData = await res.json();
        if (outlookData && outlookData.salaryAverage) {
          setMarketPrognosis(outlookData);
        }
      }
    })
    .catch((err) => {
      console.warn("Market outlook update failed for query:", kw, err);
    });

    try {
      await Promise.all([jobsPromise, outlookPromise]);
    } catch (err: any) {
      console.error("Job Search API fail:", err);
      setExplorerError("Unable to retrieve real-time data feeds from Arbetsförmedlingen Platsbanken. Operating with locally initialized matching index.");
    } finally {
      setSearchingJobs(false);
    }
  };

  const handleRunSearchQuery = (e: React.FormEvent) => {
    e.preventDefault();
    triggerSwedishJobSearch(searchKeyword, searchLocation);
  };

  // Automatically trigger Platsbanken live job query when career catalog selection changes
  useEffect(() => {
    if (selectedCatalogJob) {
      const cleanSearch = selectedCatalogJob.role.split('(')[0].trim();
      setSelectedJob(null); // Clear selected job posting when switching catalog roles
      triggerSwedishJobSearch(cleanSearch, "All locations");
    }
  }, [selectedCatalogJob?.role]);

  // Profile-to-Job matching score engine
  const computeJobMatchingDetails = (job: JobMatch) => {
    const jobSkills = job.skillsDemanded || [];
    const userSkills = profile.skills || [];

    if (jobSkills.length === 0) {
      return { matchPercentage: 70, missing: [] };
    }

    const matched = jobSkills.filter(js => 
      userSkills.some(us => us.toLowerCase().replace(/\s+/g, '') === js.toLowerCase().replace(/\s+/g, ''))
    );

    const matchPercentage = Math.min(100, Math.round(((matched.length + 0.5) / (jobSkills.length + 0.5)) * 100));
    const missing = jobSkills.filter(js => 
      !userSkills.some(us => us.toLowerCase().replace(/\s+/g, '') === js.toLowerCase().replace(/\s+/g, ''))
    );

    return { matchPercentage, missing };
  };

  // File drag & drop triggers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelected(e.target.files[0]);
    }
  };

  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        const base64 = reader.result.split(",")[1];
        setFileBase64({
          base64: base64,
          mimeType: file.type,
          name: file.name
        });
        setCvText(`Extracted CV metadata from uploaded file: ${file.name}. Standard professional summary. Please trigger evaluation to analyze.`);
        
        // Auto-add file details to interactive multiple uploads state
        const sizeString = file.size > 1024 * 1024 
          ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` 
          : `${(file.size / 1024).toFixed(0)} KB`;
        
        const newDoc = {
          name: file.name,
          size: sizeString,
          uploadDate: new Date().toISOString().split('T')[0]
        };
        
        setUploadedDocs(prev => {
          if (prev.some(d => d.name === file.name)) return prev;
          return [...prev, newDoc];
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleClearAttachedDocument = () => {
    setSelectedFile(null);
    setFileBase64(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const renderLiveJobVacancyList = (limit?: number) => {
    const listToRender = limit ? jobsList.slice(0, limit) : jobsList;
    return (
      <div className="space-y-3.5 mt-6 border-t border-slate-100 pt-5" id="platsbanken-embedded-listings-view">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div className="flex items-center gap-2">
            <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-widest font-mono">
              Lediga Tjänster Just Nu (Sverige)
            </h4>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-450 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
          </div>
          <span className="text-[10px] font-mono font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-705">
            {searchingJobs ? "Hämtar..." : `${jobsList.length} aktiva`}
          </span>
        </div>

        {searchingJobs ? (
          <div className="p-8 text-center space-y-3 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
            <div className="h-5 w-5 border-2 border-accent-blue border-t-transparent animate-spin rounded-full mx-auto"></div>
            <p className="font-mono text-[10px] text-slate-400">Läser in realtidsdata från Platsbanken...</p>
          </div>
        ) : jobsList.length === 0 ? (
          <div className="p-8 text-center bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
            <Briefcase className="h-7 w-7 text-slate-350 mx-auto mb-2 opacity-50" />
            <p className="text-[11px] font-sans text-slate-500 font-medium">Vi hittade inga aktiva annonser just nu hos Arbetsförmedlingen för denna roll.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2.5 max-h-[380px] overflow-y-auto pr-1">
            {listToRender.map((job) => {
              const { matchPercentage } = computeJobMatchingDetails(job);
              return (
                <div 
                  key={job.id}
                  onClick={() => {
                    setSelectedJob(job);
                    setIsMobileJobDetailOpen(true);
                  }}
                  className="bg-slate-50 hover:bg-sky-50/30 border border-slate-150 rounded-xl p-3.5 transition duration-155 cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-accent-blue/30 flex justify-between gap-3 items-start relative overflow-hidden group hover:border-sky-300"
                >
                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[8.5px] font-mono font-extrabold px-1.5 py-0.5 rounded-full border shrink-0 ${
                        matchPercentage >= 75 
                          ? 'bg-emerald-55 text-emerald-800 border-emerald-200'
                          : matchPercentage >= 50
                          ? 'bg-amber-50 text-amber-750 border-amber-200'
                          : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}>
                        {matchPercentage}% Match med profil
                      </span>
                    </div>
                    <h5 className="font-bold text-xs text-slate-900 group-hover:text-accent-blue transition-colors leading-snug line-clamp-1">
                      {job.title}
                    </h5>
                    <div className="flex flex-wrap items-center gap-2 font-semibold text-[10.5px] text-slate-650">
                      <span>🏢 {job.company}</span>
                      <span className="text-slate-300 font-normal">|</span>
                      <span>📍 {job.location}</span>
                    </div>
                    <div className="text-[9px] font-mono text-slate-400 font-medium pt-1">
                      Publicerad: {job.postedDate}
                    </div>
                  </div>
                  <div className="text-right shrink-0 self-center">
                    <span className="p-1 px-2.5 bg-slate-200 group-hover:bg-slate-900 group-hover:text-white transition-all text-slate-755 text-[9.5px] font-black uppercase rounded-lg">
                      Visa
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`min-h-screen bg-bg-workspace text-text-main flex flex-col font-sans antialiased relative transition-colors duration-350 ${darkMode ? "dark" : ""} ${activeTab === 'chat' && currentUser ? "chat-tab-active" : ""}`} id="advisor-app-container">
      
      {/* 1. Tactile paper-grain overlay & blurred glow blobs */}
      <style>{`
        /* Mobile-specific media query to collapse layout into a stacked view under 768px (viewport < 768px) */
        @media (max-width: 767px) {
          .jobs-split-container {
            display: flex !important;
            flex-direction: column !important;
            gap: 1.5rem !important;
          }
          .jobs-split-container > div {
            width: 100% !important;
            max-width: 100% !important;
            min-height: auto !important;
          }

          /* Immersive full-screen focus query for active chat tab on mobile */
          .chat-tab-active {
            height: 100vh !important;
            height: 100dvh !important;
            min-height: 100vh !important;
            min-height: 100dvh !important;
            max-height: 100vh !important;
            max-height: 100dvh !important;
            overflow: hidden !important;
            background-color: #FFF4C2 !important;
          }
          .chat-tab-active #applet-sub-layout {
            padding: 0 !important;
            margin: 0 !important;
            max-width: 100% !important;
            width: 100% !important;
            height: 100% !important;
            flex: 1 !important;
            background-color: #FFF4C2 !important;
          }
          .chat-tab-active #chat-page-view {
            height: 100% !important;
            width: 100% !important;
            max-width: 100% !important;
            padding: 0 !important;
            background-color: #FFF4C2 !important;
          }
          .chat-tab-active #career-chat-console {
            height: 100% !important;
            max-height: 100% !important;
            min-height: 100% !important;
            border-radius: 0px !important;
            border: none !important;
            background-color: #FFF4C2 !important;
          }

          /* Force cohesive cozy soft honey-cream background on native mobile chat elements */
          .chat-tab-active #advisor-app-container,
          .chat-tab-active #career-chat-console > div:first-child {
            background-color: #FFF4C2 !important;
          }
          
          /* Translucent matching color for bottom text bar */
          .chat-tab-active #career-chat-console .p-4 {
            background-color: #FFF4C2 !important;
            border-top: 1px solid rgba(0, 0, 0, 0.05) !important;
          }

          /* Soft creamy tab bar for mobile tabs */
          .chat-tab-active #chat-mobile-tabs {
            background-color: #F3DD8F !important;
            border-bottom: 1px solid rgba(0, 0, 0, 0.06) !important;
          }

          /* Incoming model bubbles inside the mobile chat: crisp paper white with elegant soft ink contrast */
          .chat-tab-active .bg-card-bg {
            background-color: #FFFFFF !important;
            border: 1px solid rgba(0, 0, 0, 0.06) !important;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02) !important;
            color: #1C1917 !important;
          }

          /* Handle Dark Mode to retain a light cozy creamy layout for readability per user feedback */
          .chat-tab-active.dark,
          .chat-tab-active.dark #applet-sub-layout,
          .chat-tab-active.dark #chat-page-view,
          .chat-tab-active.dark #career-chat-console,
          .chat-tab-active.dark #advisor-app-container,
          .chat-tab-active.dark #career-chat-console > div:first-child {
            background-color: #FFF4C2 !important;
            color: #1C1917 !important;
          }

          .chat-tab-active.dark #career-chat-console .dark\:bg-\[\#1A1412\]\/95 {
            background-color: #FFF4C2 !important;
            border-top: 1px solid rgba(0, 0, 0, 0.05) !important;
          }

          .chat-tab-active.dark #chat-mobile-tabs {
            background-color: #F3DD8F !important;
            border-bottom: 1px solid rgba(0, 0, 0, 0.06) !important;
          }

          .chat-tab-active.dark .bg-card-bg {
            background-color: #FFFFFF !important;
            border: 1px solid rgba(0, 0, 0, 0.06) !important;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.02) !important;
            color: #1C1917 !important;
          }

          /* Prevent low-contrast text inside light creamy active layout elements (except user bubbles) */
          .chat-tab-active.dark .text-text-main:not(.user-bubble-text),
          .chat-tab-active.dark .text-slate-800:not(.user-bubble-text),
          .chat-tab-active.dark .text-slate-600:not(.user-bubble-text),
          .chat-tab-active.dark .text-text-muted:not(.user-bubble-text),
          .chat-tab-active .text-fluid-chat:not(.user-bubble-text),
          .chat-tab-active.dark .text-fluid-chat:not(.user-bubble-text) {
            color: #1C1917 !important;
          }
        }

        /* Explicit override for user chat bubble to keep it white/grey as requested across all screen sizes */
        .user-bubble-text,
        .user-bubble-text *,
        div.user-bubble-text,
        #career-chat-console .user-bubble-text {
          color: #FFFFFF !important;
        }
      `}</style>
      <div className="grain-overlay" />
      <div className="absolute top-[10%] left-[20%] glow-accent-radial bg-ochre/10 dark:bg-ochre/5 animate-pulse-slow" style={{ animationDelay: "0ms" }} />
      <div className="absolute bottom-[20%] right-[10%] glow-accent-radial bg-rust/15 dark:bg-rust/5 animate-pulse-slow" style={{ animationDelay: "1000ms" }} />
      <div className="absolute top-[50%] left-[40%] glow-accent-radial bg-moss/10 dark:bg-moss/5 animate-pulse-slow" style={{ animationDelay: "2000ms" }} />

      {/* 2. MINIMAL SCANDINAVIAN FLAG ACCENT */}
      <div className={`h-1.5 w-full flex bg-sw-blue ${activeTab === 'chat' ? 'hidden md:flex' : ''}`} id="national-badge-accent">
        <div className="h-full bg-sw-blue w-1/3"></div>
        <div className="h-full bg-sw-yellow w-1/12"></div>
        <div className="h-full bg-[#004B76] w-7/12"></div>
      </div>

      {/* 3. PRIMARY NAVIGATION HEADER */}
      <header className={`border-b border-border-card bg-bg-workspace px-5 md:px-10 ${activeTab === 'chat' ? 'hidden md:flex' : 'flex'} flex-col lg:flex-row justify-between items-start lg:items-center gap-2 md:gap-4 shrink-0 transition-all duration-300 relative z-10 py-4`} id="main-app-header">
        <div>
          <div className={`flex items-center gap-2 mb-0.5 ${activeTab === 'chat' ? 'hidden md:flex' : 'flex'}`}>
            <span className="text-[9px] uppercase font-mono tracking-widest text-[#B85028] dark:text-[#E07A5F] font-bold px-1.5 py-0.5 bg-rust/10 rounded-sm border border-rust/15">SVENSK ARBETSMARKNADSTJÄNST</span>
          </div>
          <h1 className="font-display font-medium text-fluid-title tracking-tight text-text-main flex items-center gap-3.5 select-none" id="header-brand-title">
            <HeaderMascot thinking={chatLoading} />
            <span className="font-display italic font-semibold text-fluid-title tracking-tight text-text-main">Lasse Karriärälg</span>
          </h1>
          <p className={`text-[11px] md:text-xs text-text-muted mt-0.5 ${activeTab === 'chat' ? 'hidden md:block' : 'block'}`}>
            Smidig analys och smart dialog som matchar dig mot Arbetsförmedlingen, Skatteverket och aktuell lönestatistik.
          </p>
        </div>

        {/* Controls and Navigation wrapper */}
        <div className="flex items-center gap-3.5 w-full lg:w-auto self-stretch lg:self-auto justify-between lg:justify-end" id="header-controls">


          {/* Desktop Animated Navigation Bar (hidden on mobile) */}
          <div className="hidden md:flex items-center bg-transparent backdrop-blur-md p-1 rounded-full border border-border-card relative" id="desktop-animated-navbar">
          {[
            { id: "chat", label: "Karriärcoach Lasse", icon: MessageSquare },
            { id: "jobs", label: "Jobb & Statistik", icon: Briefcase },
            { id: "profile", label: "Min Profil", icon: User }
          ].map((item) => {
            const IconComp = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as any);
                  if (item.id === "chat") {
                    setMascotState("speaking");
                  }
                }}
                className={`relative px-4 py-2 rounded-full text-xs font-bold tracking-tight transition-all duration-300 flex items-center gap-1.5 z-10 cursor-pointer ${
                  isActive ? "text-white" : "text-slate-600 hover:text-slate-900"
                }`}
                id={`desk-nav-${item.id}`}
              >
                <IconComp className="h-4 w-4" />
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="desktopActiveTabHighlight"
                    className="absolute inset-0 bg-slate-900 rounded-full -z-10 shadow-md shadow-slate-900/15"
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

        {/* Mobile Read-only Status Ribbon (hidden on desktop) */}
        <div className={`flex md:hidden items-center gap-2 bg-slate-50 border border-slate-200/60 px-4 py-2 rounded-xl text-xs font-mono font-bold text-slate-700 shrink-0 ${activeTab === 'chat' ? 'hidden' : ''}`} id="header-active-tab-info">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>FOKUS:</span>
          <span className="text-accent-blue uppercase tracking-wide">
            {activeTab === 'chat' && "AI-Coach Lasse"}
            {activeTab === 'jobs' && "Jobbhittare & SCB-Statistik"}
            {activeTab === 'profile' && "Kompetensanalys & Roadmap"}
          </span>
        </div>
      </header>

      {/* 3. WORKING VIEWPORT CANVASES */}
      <main className={`flex-1 max-w-[1500px] w-full mx-auto ${(currentUser && activeTab === 'chat') ? 'overflow-hidden' : 'overflow-y-auto'} flex flex-col transition-all duration-300 ${activeTab === 'chat' || (currentUser && !profile.hasSetupCompleted) ? 'p-1 sm:p-3 md:p-8 pb-20 md:pb-8' : 'p-4 md:p-8 pb-32 md:pb-8'}`} id="applet-sub-layout">
        


        <AnimatePresence mode="wait">
          {currentUser && !profile.hasSetupCompleted ? (
            <motion.div
              key="onboarding"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full flex flex-col justify-center min-h-0"
              id="onboarding-view-wrapper"
            >
              <OnboardingWizard
                initialEmail={currentUser.email || ""}
                initialName={currentUser.displayName || ""}
                onSave={async (finalProfile) => {
                  try {
                    // Update local state
                    setProfile(finalProfile);
                    // Write directly to firestore
                    const userDocRef = doc(db, "users", currentUser.uid);
                    await setDoc(userDocRef, {
                      profile: finalProfile,
                    }, { merge: true });
                  } catch (err) {
                    console.error("Failed to save profile during onboarding:", err);
                    handleFirestoreError(err, OperationType.WRITE, `users/${currentUser.uid}`);
                  }
                }}
                onLogout={async () => {
                  await signOut(auth);
                }}
              />
            </motion.div>
          ) : (
            <>
              {/* PAGE 1: CHAT ADVISOR */}
              {activeTab === 'chat' && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, y: 12, scale: 0.995 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.995 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="w-full flex justify-center h-full flex-1 min-h-[0px]"
              id="chat-page-view"
            >
              {!currentUser ? (
                <div className="w-full flex justify-center items-center py-6 sm:py-12">
                  <LoginGuard 
                    title="Konsultera Karriärcoachen Lasse 💬"
                    subtitle="Logga in eller skapa ett kostnadsfritt konto för att chatta med Lasse om den svenska arbetsmarknaden, kollektivavtal, löneutsikter och jobbmatcher!"
                  />
                </div>
              ) : (
                /* Unified Clean Messenger-Style Chat Panel with Warm Paper Design */
                <div className="w-full max-w-4xl bg-[#FFF4C2] dark:bg-[#FFF4C2] border border-border-card rounded-3xl shadow-xl flex flex-col h-[calc(100vh-220px)] min-h-[500px] sm:h-[620px] md:h-[680px] lg:h-[720px] overflow-hidden animate-fade-in relative transition-all duration-300" id="career-chat-console">
              
              {/* Elegant dialogue header - sticky and glass-like */}
              <div className="px-6 py-4 border-b border-border-card bg-[#FFF4C2] dark:bg-[#FFF4C2] flex justify-between items-center shrink-0 z-10 transition-colors duration-300">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </div>
                  <div className="leading-tight">
                    <span className="text-sm font-display italic font-semibold text-text-main flex items-center gap-1.5">
                      Karriärcoach Lasse
                    </span>
                    <span className="text-[10px] text-emerald-800 dark:text-emerald-400 font-mono font-bold uppercase tracking-wider">Aktiv coach online</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => {
                      setMessages([
                        {
                          id: "init",
                          role: "model",
                          content: "Hej! Jag är Lasse, din personliga AI-karriärcoach för den svenska arbetsmarknaden. Historiken har nu rensats och vi startar om med ett rent blad! 🍰☕\n\nVad vill du utforska idag? Ställ din fråga om kollektivavtal, lönespann enligt SCB eller de senaste lediga jobben på Platsbanken! 🚀",
                          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        }
                      ]);
                    }}
                    className="text-text-muted hover:text-rust hover:underline text-[10px] font-mono cursor-pointer bg-[#F2EDE4] dark:bg-[#25201A] px-2.5 py-1 rounded-full transition-all border border-border-card"
                  >
                    Rensa chatt 🗑️
                  </button>
                </div>
              </div>

              {/* Mobile-only Segmented Navigation Bar at the top of the console */}
              <div className="flex md:hidden items-center justify-around bg-[#F5ECD5]/40 dark:bg-[#140E0C]/50 border-b border-border-card/20 px-3 py-2.5 gap-1 shrink-0 z-10" id="chat-mobile-tabs">
                {[
                  { id: "chat", short: "Lasse 💬" },
                  { id: "jobs", short: "Sök Jobb 💼" },
                  { id: "profile", short: "Min Profil 👤" }
                ].map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id as any);
                        if (item.id === "chat") {
                          setMascotState("speaking");
                        }
                      }}
                      className={`flex-1 text-center py-2 px-1 rounded-full text-[11px] font-bold transition-all duration-200 cursor-pointer ${
                        isActive 
                          ? "bg-slate-900 text-white shadow-xs dark:bg-[#FAF6EE] dark:text-[#12100E]" 
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-black/15"
                      }`}
                    >
                      {item.short}
                    </button>
                  );
                })}
              </div>

              {/* Chat Message Scroll list with bubbles */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-transparent scroll-smooth">
                {messages.map((m, idx) => {
                  const isUser = m.role === "user";
                  const isInit = m.id === "init";
                  return (
                    <motion.div 
                      key={m.id || idx} 
                      initial={!isUser ? { opacity: 0, x: -16, y: 4 } : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      transition={{ type: "spring", stiffness: 280, damping: 25, delay: isUser ? 0 : 0.05 }}
                      className={`flex gap-4 max-w-[85%] ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
                    >
                      
                      {/* Interactive Avatar: User Emoji or Lasse Moose! */}
                      {isUser ? (
                        <div className="h-10 w-10 bg-text-main text-[#FDF8F0] dark:bg-[#FCF9F2] dark:text-[#16120E] rounded-full flex items-center justify-center shrink-0 border border-border-card shadow-xs text-base font-bold select-none animate-fade-in" id={`user-avatar-${idx}`}>
                          👤
                        </div>
                      ) : (
                        <div className="shrink-0 scale-95 hover:scale-105 transition-transform duration-200" id={`model-avatar-${idx}`}>
                          <Mascot 
                            state={idx === messages.length - 1 ? mascotState : "idle"} 
                            size="sm" 
                          />
                        </div>
                      )}

                      {/* Bubble Text Content with premium readability */}
                      <div className="space-y-1 max-w-full">
                        <div 
                          className={`leading-relaxed text-fluid-chat whitespace-pre-line shadow-xs font-sans transition-all duration-300 p-5 rounded-3xl ${
                            isUser 
                              ? 'bg-slate-900 text-white user-bubble-text rounded-tr-none border border-slate-800 shadow-[0_4px_12px_rgba(0,0,0,0.15)] animate-fade-in' 
                              : isInit
                                ? 'bg-card-bg text-text-main border-2 border-ochre/30 rounded-tl-none shadow-md hover:shadow-lg hover:border-ochre/55'
                                : 'bg-card-bg text-text-main border border-border-card rounded-tl-none hover:border-ochre/50'
                          }`}
                        >
                          {m.content}
                        </div>
                        {m.profileUpdated && m.updatedFields && m.updatedFields.length > 0 && (
                          <div className="mt-1 bg-amber-500/10 border border-amber-500/20 text-ochre-dark dark:text-ochre rounded-2xl px-3.5 py-2 flex items-center gap-2 max-w-[90%] text-[10.5px] font-semibold animate-fade-in shadow-xs">
                            <span className="flex h-2 w-2 relative shrink-0">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                            </span>
                            <span className="leading-tight">🔄 Uppdaterat i din profil: {m.updatedFields.join(", ")}</span>
                          </div>
                        )}
                        <span className={`text-[10px] text-text-muted/80 block mt-1.5 font-mono px-2 ${isUser ? 'text-right' : 'text-left'}`}>
                          {isUser ? 'Du' : 'Lasse Karriärälg'} • {m.timestamp}
                        </span>
                      </div>

                    </motion.div>
                  );
                })}

                {chatLoading && (
                  <div className="flex gap-4 mr-auto items-center">
                    <div className="shrink-0 scale-95">
                      <Mascot state="thinking" size="sm" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[12.5px] text-text-main bg-card-bg border border-border-card px-5 py-3 rounded-3xl rounded-tl-none shadow-sm font-sans flex items-center gap-2.5 animate-pulse">
                        <span className="flex gap-1 items-center">
                          <span className="h-2 w-2 bg-ochre rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                          <span className="h-2 w-2 bg-rust rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                          <span className="h-2 w-2 bg-moss rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                        </span>
                        <span className="font-semibold text-text-muted font-sans">Lasse skriver...</span>
                      </span>
                    </div>
                  </div>
                )}

                {chatError && (
                  <div className="p-4 bg-rust/10 border border-rust/20 text-rust dark:text-rust rounded-2xl text-xs text-center flex items-center justify-center gap-2">
                    <span className="text-sm">⚠️</span>
                    <span className="font-semibold">{chatError}</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Send message text box form with cute icons and clean borders */}
              <div className="p-4 bg-[#FFF4C2]/95 dark:bg-[#FFF4C2]/95 backdrop-blur-md border-t border-border-card/25 shrink-0 pb-5 md:pb-4 relative z-10">
                
                {/* Dynamiskt Genererade Följdfrågor & Snabblänkar */}
                <div className="mb-3.5 space-y-1.5 animate-fade-in">
                  <span className="text-[10px] text-text-muted/70 font-mono font-bold uppercase tracking-wider block">
                    💡 Föreslagna följdfrågor (Klicka för att skicka direkt):
                  </span>
                  <div className="flex flex-wrap gap-1.5 items-center">
                    {(() => {
                      const activeJobSuggestName = favoriteJobs.includes(selectedFavoriteJob) ? selectedFavoriteJob : (favoriteJobs[0] || "mitt målyrke");
                      const cleanJobName = activeJobSuggestName.split('(')[0].trim();
                      
                      return [
                        { label: "💰 Medellön?", query: `Vad är medellönen och löneutvecklingen för en ${cleanJobName} i Sverige?` },
                        { label: "📈 Efterfrågan på min ort?", query: `Hur ser framtida efterfrågan och jobbprognos ut för ${cleanJobName} i området kring ${profile.targetLocation || "Sverige"}?` },
                        { label: "📍 Hur många annonser?", query: `Hur många aktiva annonser finns det på Platsbanken för ${cleanJobName} och var i landet söker de mest?` },
                        { label: "⚡ Vad måste jag göra?", query: `Vad exakt behöver jag göra för att kvalificera mig, bygga min portfölj och få mitt första jobb som ${cleanJobName}?` }
                      ].map((item, qi) => (
                        <button
                          key={qi}
                          type="button"
                          onClick={() => handleSendChatMessage(undefined, item.query)}
                          disabled={chatLoading}
                          className="px-3 py-1.5 bg-white/70 dark:bg-black/30 hover:bg-white dark:hover:bg-black/50 border border-border-card text-text-main rounded-full text-[10.5px] font-sans font-bold transition-all active:scale-95 cursor-pointer shadow-3xs flex items-center gap-1 select-none leading-none disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span>{item.label}</span>
                        </button>
                      ));
                    })()}
                  </div>
                </div>

                <form onSubmit={handleSendChatMessage} className="flex gap-2">
                  <div className="flex-1 relative flex items-center">
                    <span className="absolute left-3 text-sm select-none pointer-events-none">💬</span>
                    <input
                      type="text"
                      id="chat-query-textbox"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Fråga Lasse (t.ex. 'Vad innebär kollektivavtal?')..."
                      className="w-full pl-9 pr-4 py-3 text-xs bg-white dark:bg-white border border-slate-300 dark:border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B85028]/35 text-slate-900 dark:text-slate-900 placeholder-slate-500 dark:placeholder-slate-500 font-sans shadow-xs"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={chatLoading || !chatInput.trim()}
                    className="px-5 py-3 bg-[#B85028] hover:bg-[#9E3E1B] disabled:bg-slate-350 dark:disabled:bg-slate-800 dark:disabled:text-slate-500 text-white rounded-xl text-xs font-bold tracking-wide transition-all active:scale-95 flex items-center gap-1.5 shadow-xs cursor-pointer select-none"
                  >
                    <span>Skicka</span>
                  </button>
                </form>
              </div>

            </div>
          )}

          </motion.div>
        )}

        {/* PAGE 2: JOBS & SWEDEN LABOR MARKET STATISTICS */}
        {activeTab === 'jobs' && (
          <motion.div
            key="jobs"
            initial={{ opacity: 0, y: 12, scale: 0.995 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.995 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="space-y-6 flex-1 min-h-[0px] flex flex-col relative"
            id="jobs-page-view"
          >
            
            {/* 1. ELEGANT ACTIVE ANIMATED PARTICLE/GRADIENT BACKGROUND ELEMENTS */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10 bg-slate-50/40 rounded-3xl" id="jobs-animated-backdrop">
              {/* Dynamic drifting background orbs */}
              <motion.div 
                animate={{ 
                  x: [0, 40, -20, 0], 
                  y: [0, -50, 30, 0],
                  scale: [1, 1.12, 0.95, 1],
                }}
                transition={{ 
                  duration: 25, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute top-10 left-10 w-96 h-96 rounded-full bg-sky-200/25 blur-3xl"
              />
              <motion.div 
                animate={{ 
                  x: [0, -30, 50, 0], 
                  y: [0, 60, -40, 0],
                  scale: [1, 0.9, 1.1, 1],
                }}
                transition={{ 
                  duration: 30, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute bottom-10 right-10 w-[450px] h-[450px] rounded-full bg-indigo-200/20 blur-3xl"
              />
              <motion.div 
                animate={{ 
                  x: [0, 20, -40, 0], 
                  y: [0, 30, 50, 0],
                }}
                transition={{ 
                  duration: 22, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute top-1/2 left-1/3 w-80 h-80 rounded-full bg-emerald-100/15 blur-3xl"
              />
            </div>

            {/* 1.5. ELEGANT HEADER INFORMATION BAR */}
            <div className="bg-white/90 backdrop-blur-md border border-slate-200/65 px-5 py-3.5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shrink-0 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.02)]" id="jobs-page-sub-tabs">
              <div>
                <h3 className="font-sans font-black text-slate-900 text-sm tracking-tight uppercase flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-sky-600" />
                  <span>Svensk Yrkeskatalog</span>
                </h3>
                <p className="text-[10px] text-slate-500">Utforska yrkesgrupper, löner, framtidsutsikter och live-platsannonser i fackliga Sverige.</p>
              </div>

              <div className="text-[11px] font-mono text-slate-400 font-bold select-none text-right">
                📊 Officiell Yrkesstatistik & Kompetenskartor med Live-Platsbanken
              </div>
            </div>

            {jobsSubTab === 'search' ? (
              <>
                {/* 2. DYNAMIC COMPANION BANNER & SEARCH ROW */}
                <div className="w-full shrink-0" id="jobs-interactive-header-grid">
                  {/* Platsbanken Search Controls */}
                  <div className="w-full bg-white/95 backdrop-blur-md border border-slate-200/80 p-5 rounded-2xl shadow-[0_8px_30px_rgba(15,23,42,0.02)] flex flex-col justify-between relative overflow-hidden">
                    <div className="space-y-4">
                      <div>
                        <span className="text-[9px] font-mono text-accent-blue font-bold uppercase tracking-widest bg-sky-50 border border-sky-100 px-2 py-0.5 rounded-md w-fit block ml-0.5">
                          SÖKMOTOR
                        </span>
                        <h3 className="font-sans font-black text-slate-900 text-sm md:text-base tracking-tight uppercase mt-2">
                           Arbetsförmedlingen Platsbanken Live
                        </h3>
                        <p className="text-slate-500 text-[11px] leading-normal font-sans">
                          Utforska lediga jobb i realtid över regionala och statliga register. Skriv ett yrke och matcha din profil direkt.
                        </p>
                      </div>

                      <form onSubmit={handleRunSearchQuery} className="flex flex-wrap md:flex-nowrap gap-3 items-center w-full">
                        <div className="flex-1 min-w-[200px] relative">
                          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                          <input
                            type="text"
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                            placeholder="Sök svenska yrken (t.ex. Systemutvecklare, Sjuksköterska)"
                            className="w-full text-xs pl-9 pr-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-blue/30 focus:border-accent-blue text-text-main font-sans placeholder-slate-400 transition-all font-bold"
                          />
                          {searchSpellingSuggestion && searchSpellingSuggestion.hasCorrections && (
                            <div className="absolute left-0 right-0 top-full mt-1.5 z-30 bg-amber-50 text-amber-900 border border-amber-250 py-1.5 px-3 rounded-lg text-[11px] font-medium shadow-sm flex items-center justify-between">
                              <span>
                                Menade du: <strong className="cursor-pointer underline text-amber-700 font-bold" onClick={() => {
                                  setSearchKeyword(searchSpellingSuggestion.correctedText);
                                  setSearchSpellingSuggestion(null);
                                }}>{searchSpellingSuggestion.correctedText}</strong>?
                              </span>
                              <button 
                                type="button" 
                                onClick={() => setSearchSpellingSuggestion(null)}
                                className="text-amber-500 hover:text-amber-700 font-bold ml-2 text-[10px] cursor-pointer"
                              >
                                Avböj
                              </button>
                            </div>
                          )}
                        </div>

                        <div className="w-full md:w-[180px] shrink-0">
                          <select
                            value={searchLocation}
                            onChange={(e) => setSearchLocation(e.target.value)}
                            className="w-full text-xs px-3 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-blue/30 focus:border-accent-blue text-text-main font-sans font-bold cursor-pointer"
                          >
                            {SWEDEN_REGIONS.map((reg, ri) => (
                              <option key={ri} value={reg}>{reg}</option>
                            ))}
                          </select>
                        </div>

                        <button
                          type="submit"
                          disabled={searchingJobs}
                          className="w-full md:w-auto px-6 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-98 cursor-pointer shrink-0"
                        >
                          {searchingJobs ? (
                            <div className="h-4 w-4 border-2 border-white border-t-transparent animate-spin rounded-full"></div>
                          ) : (
                            <span>HÄMTA DATA 🔍</span>
                          )}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>

            {/* 3. PREMIUM STATISTICS DASHBOARD CARD GRID */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 shrink-0" id="statistics-highlights">
              
              {/* METADATA BLOCK 1: MEDIANLÖN */}
              <motion.div 
                whileHover={{ y: -4, scale: 1.015, filter: "brightness(1.02)", boxShadow: "0 12px 20px -3px rgba(15,23,42,0.03)" }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="bg-white/95 backdrop-blur-md border border-slate-200/70 p-5 rounded-2xl shadow-xs flex flex-col justify-between hover:border-amber-200/95 transition-colors"
              >
                <div className="flex items-start justify-between gap-1.5">
                  <div className="space-y-1 min-w-0">
                    <span className="text-[10px] md:text-xs uppercase font-mono text-slate-400 font-extrabold tracking-wider block">Medianlön</span>
                    <strong className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 block font-sans truncate">
                      {(marketPrognosis.salaryAverage || 52000).toLocaleString("sv-SE")} <span className="text-xs md:text-sm font-medium font-mono text-slate-400">SEK</span>
                    </strong>
                  </div>
                  <div className="p-2 bg-amber-50 rounded-xl text-amber-600 shrink-0 select-none hidden sm:block font-sans">
                    <Wallet className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-100 text-[9px] md:text-xs font-mono text-slate-400 leading-normal font-medium">
                  Källa: <strong>Skatteverket & SCB</strong> lönestatistik (officiell).
                </div>
              </motion.div>

              {/* METADATA BLOCK 2: LÖNESPANN */}
              <motion.div 
                whileHover={{ y: -4, scale: 1.015, filter: "brightness(1.02)", boxShadow: "0 12px 20px -3px rgba(15,23,42,0.03)" }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="bg-white/95 backdrop-blur-md border border-slate-200/70 p-5 rounded-2xl shadow-xs flex flex-col justify-between hover:border-indigo-200/95 transition-colors"
              >
                <div className="flex items-start justify-between gap-1.5">
                  <div className="space-y-1 min-w-0">
                    <span className="text-[10px] md:text-xs uppercase font-mono text-slate-400 font-extrabold tracking-wider block">Lönespann</span>
                    <strong className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 block font-sans truncate">
                      {Math.round((marketPrognosis.salaryMin || 38000) / 1000)}k - {Math.round((marketPrognosis.salaryMax || 72000) / 1000)}k <span className="text-xs md:text-sm font-medium font-mono text-slate-400">SEK</span>
                    </strong>
                  </div>
                  <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600 shrink-0 select-none hidden sm:block font-sans">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-100 text-[9px] md:text-xs font-mono text-slate-400 leading-normal font-medium">
                  Källa: Generella lönenivåer via <strong>SCB & Facket</strong>.
                </div>
              </motion.div>

              {/* METADATA BLOCK 3: LEDIGA JOBB */}
              <motion.div 
                whileHover={{ y: -4, scale: 1.015, filter: "brightness(1.02)", boxShadow: "0 12px 20px -3px rgba(15,23,42,0.03)" }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="bg-white/95 backdrop-blur-md border border-slate-200/70 p-5 rounded-2xl shadow-xs flex flex-col justify-between hover:border-sky-200/95 transition-colors"
                id="active-listings-stats-card"
              >
                <div className="flex items-start justify-between gap-1.5">
                  <div className="space-y-1 min-w-0">
                    <span className="text-[10px] md:text-xs uppercase font-mono text-slate-400 font-extrabold tracking-wider block">Lediga jobb</span>
                    <strong className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-accent-blue block font-sans truncate">
                      {jobsList.length || 20} aktiva
                    </strong>
                  </div>
                  <div className="p-2 bg-sky-50 rounded-xl text-sky-600 shrink-0 select-none hidden sm:block font-sans">
                    <Briefcase className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-100 text-[9px] md:text-xs font-mono text-slate-400 leading-normal font-medium">
                  Källa: Sökning i realtid från <strong>Arbetsförmedlingen</strong>.
                </div>
              </motion.div>

              {/* METADATA BLOCK 4: YRKESPROGNOS */}
              <motion.div 
                whileHover={{ y: -4, scale: 1.015, filter: "brightness(1.02)", boxShadow: "0 12px 20px -3px rgba(15,23,42,0.03)" }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="bg-white/95 backdrop-blur-md border border-slate-200/70 p-5 rounded-2xl shadow-xs flex flex-col justify-between hover:border-emerald-200/95 transition-colors"
                id="career-outlook-stats-card"
              >
                <div className="flex items-start justify-between gap-1.5">
                  <div className="space-y-1 min-w-0 flex-1">
                    <span className="text-[10px] md:text-xs uppercase font-mono text-slate-400 font-extrabold tracking-wider block">Efterfrågan</span>
                    <strong className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-emerald-700 block uppercase font-sans truncate">
                      {marketPrognosis.demandTrend === "highly-growing" || !searchKeyword ? "Mycket hög" : marketPrognosis.demandTrend === "growing" ? "Hög" : marketPrognosis.demandTrend === "stable" ? "Balanserad" : "Minskande"}
                    </strong>
                  </div>
                  <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600 shrink-0 select-none hidden sm:block font-sans">
                    <Info className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-100 text-[9px] md:text-xs font-mono text-slate-400 leading-normal font-medium">
                  Källa: <strong>Arbetsförmedlingens Yrkeskompass</strong>.
                </div>
              </motion.div>

            </div>

            {/* Split Screen View: Left side Job Listings, Right side Job Detailed Citation */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 flex-1 min-h-[0px] jobs-split-container">
              
              {/* Left Side: Platsbanken Live Listings */}
              <div className="col-span-12 md:col-span-5 border border-slate-200/80 bg-white rounded-2xl flex flex-col shadow-[0_8px_30px_rgba(15,23,42,0.02)] min-h-[450px] overflow-hidden" id="platsbanken-active-matches">
                <div className="px-5 py-4 bg-gradient-to-r from-slate-50 to-slate-100/30 border-b border-slate-100 flex justify-between items-center shrink-0">
                  <div>
                    <h3 className="font-extrabold text-xs text-text-main flex items-center gap-1.5 uppercase tracking-wide">
                      <span>Platsbanken Live</span>
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                      </span>
                    </h3>
                    <p className="text-[10px] text-text-muted mt-0.5">Hämtat i realtid via Jobtech API</p>
                  </div>
                  <span className="text-[10px] bg-slate-100 text-slate-800 px-2 py-0.5 rounded-md font-mono font-bold">
                    Filter: {searchKeyword}
                  </span>
                </div>
 
                <div className="flex-1 overflow-y-auto p-3 grid grid-cols-2 gap-3 md:flex md:flex-col md:space-y-1.5 md:divide-y md:divide-slate-100/80 select-none" id="platsbanken-jobs-scroll-grid">
                  {explorerError && (
                    <div className="col-span-2 p-4 bg-amber-50/60 rounded-xl text-[11px] font-mono border border-amber-100/50 flex gap-2.5 m-2">
                      <AlertCircle className="h-4 w-4 shrink-0 text-amber-500" />
                      <div>{explorerError}</div>
                    </div>
                  )}
 
                  {searchingJobs && (
                    <div className="col-span-2 p-12 text-center text-xs text-text-muted space-y-3">
                      <div className="h-6 w-6 border-2 border-accent-blue border-t-transparent animate-spin rounded-full mx-auto animate-bounce"></div>
                      <p className="font-mono text-slate-400">Ansluter till Arbetsförmedlingen...</p>
                    </div>
                  )}
 
                  {!searchingJobs && jobsList.length === 0 && (
                    <div className="col-span-2 p-16 text-center text-xs text-text-muted">
                      <Briefcase className="h-10 w-10 text-slate-350 mx-auto mb-3 opacity-60" />
                      <p className="font-medium text-slate-850">Inga lediga tjänster matchade din sökning.</p>
                      <button 
                        onClick={() => triggerSwedishJobSearch("Utvecklare", "Alla platser")} 
                        className="text-accent-blue font-bold underline mt-2 block mx-auto hover:text-sky-800 cursor-pointer text-xs"
                      >
                        Sök generella IT-jobb i Sverige
                      </button>
                    </div>
                  )}
 
                  {!searchingJobs && jobsList.map((job) => {
                    const isSelected = selectedJob && selectedJob.id === job.id;
                    const { matchPercentage } = computeJobMatchingDetails(job);
                    
                    return (
                      <div 
                        key={job.id}
                        id={`job-row-${job.id}`}
                        onClick={() => {
                          setSelectedJob(job);
                          setIsMobileJobDetailOpen(true);
                        }}
                        className={`p-3 md:p-4 rounded-xl transition-all duration-200 cursor-pointer flex flex-col justify-between gap-2.5 border ${
                          isSelected 
                            ? 'bg-sky-50/60 border-sky-300 md:border-l-4 md:border-l-sky-600 shadow-[0_4px_12px_rgba(3,105,161,0.06)]' 
                            : 'hover:bg-slate-50 border-slate-100 md:border-l-4 md:border-l-transparent bg-white/45'
                        }`}
                      >
                        <div className="space-y-1.5 min-w-[0px] flex-1">
                          {/* Top Match bar for high scannability */}
                          <div className="flex items-center justify-between gap-1">
                            <span className={`text-[9px] font-mono font-extrabold px-1.5 py-0.5 rounded-full border shrink-0 ${
                              matchPercentage >= 75 
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200/80 shadow-xs'
                                : matchPercentage >= 50
                                ? 'bg-amber-50 text-amber-700 border-amber-200/80'
                                : 'bg-slate-100 text-slate-600 border-slate-200/60'
                            }`}>
                              {matchPercentage}% Match
                            </span>
                            <span className="hidden md:flex items-center text-[9px] font-bold text-accent-blue hover:underline gap-0.5 select-none shrink-0">
                              Mer info
                              <ChevronRight className="h-3 w-3" />
                            </span>
                          </div>

                          <h4 className="font-bold text-[11px] md:text-xs text-text-main tracking-tight leading-snug line-clamp-2 md:line-clamp-none min-h-[30px] md:min-h-0" title={job.title}>
                            {job.title}
                          </h4>
                          <h5 className="text-[10px] md:text-[11px] text-slate-600 font-semibold truncate">
                            🏢 {job.company}
                          </h5>
                          
                          <div className="flex items-center gap-1.5 pt-0.5 font-mono text-[9px] md:text-[10px] text-text-muted flex-wrap">
                            <span className="flex items-center gap-0.5 text-zinc-500 truncate max-w-full">
                              <MapPin className="h-2.5 w-2.5 text-sky-600 shrink-0" />
                              <span className="truncate">{job.location}</span>
                            </span>
                          </div>
                        </div>

                        {/* Posted date/Call to action bar at the card's footer */}
                        <div className="border-t border-slate-100/50 pt-2 flex items-center justify-between text-[9px] font-mono text-slate-400">
                          <span>📅 {job.postedDate}</span>
                          <span className="md:hidden text-accent-blue font-bold text-[8.5px] uppercase tracking-wider">Visa →</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
 
              {/* Right Side: Simple Detailed vacancy view & SCB/Skatteverket Legal disclosures - Desktop Only */}
              <motion.div 
                layout
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                className="hidden md:flex md:col-span-7 bg-white border border-slate-200/80 rounded-2xl shadow-[0_8px_30px_rgba(15,23,42,0.02)] flex-col overflow-hidden min-h-[450px]"
              >
                <AnimatePresence mode="wait">
                  {selectedJob ? (
                    <motion.div 
                      key={selectedJob.id}
                      layout="position"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ 
                        opacity: { duration: 0.2, ease: "easeOut" },
                        x: { duration: 0.25, ease: "easeOut" },
                        layout: { type: "spring", stiffness: 300, damping: 28 }
                      }}
                      className="p-6 space-y-6 overflow-y-auto flex-1 text-xs" 
                      id="selected-job-details-frame"
                    >
                      
                      {/* Header info */}
                      <div className="border-b border-slate-100 pb-5">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5">
                          <div className="flex items-start gap-3.5 flex-1 min-w-[240px]">
                            {/* Company Logo container */}
                            <CompanyLogo companyName={selectedJob.company} />

                            <div className="space-y-1 flex-1 min-w-[0px]">
                              <span className="text-[9px] font-mono text-accent-blue font-bold uppercase bg-sky-50 border border-sky-100 px-2 py-0.5 rounded-md w-fit block">
                                PLATSBANKEN ID: {selectedJob.id}
                              </span>
                              <h2 className="text-sm md:text-base font-extrabold text-text-main leading-snug tracking-tight">
                                {selectedJob.title}
                              </h2>
                              <p className="text-xs font-semibold text-slate-800">
                                {selectedJob.company} — <span className="text-text-muted font-normal text-[11px]">{selectedJob.location}, Sverige</span>
                              </p>
                            </div>
                          </div>
  
                          <div className="flex flex-wrap items-center gap-2 shrink-0 sm:self-center">
                            {(() => {
                              const isJobPostSaved = savedJobPosts.some(p => p.id === selectedJob.id);
                              return (
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (!currentUser) {
                                      setAuthModalJob(selectedJob);
                                      return;
                                    }
                                    if (isJobPostSaved) {
                                      setSavedJobPosts(prev => prev.filter(p => p.id !== selectedJob.id));
                                    } else {
                                      setSavedJobPosts(prev => [...prev, selectedJob]);
                                    }
                                  }}
                                  className={`px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide border transition-all flex items-center gap-1.5 cursor-pointer select-none ${
                                    isJobPostSaved
                                      ? 'bg-emerald-50 text-emerald-800 border-emerald-250 hover:bg-emerald-100/50'
                                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                                  }`}
                                >
                                  {isJobPostSaved ? (
                                    <>
                                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                                      <span>Sparad ✓</span>
                                    </>
                                  ) : (
                                    <>
                                      <Plus className="h-3.5 w-3.5 text-slate-500" />
                                      <span>Spara jobb</span>
                                    </>
                                  )}
                                </button>
                              );
                            })()}

                            <a 
                              href={selectedJob.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              referrerPolicy="no-referrer"
                              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-850 active:scale-98 text-white rounded-xl text-xs font-bold tracking-wide transition-all shadow-md shadow-slate-900/10 flex items-center gap-1.5 cursor-pointer"
                            >
                              <span>Ansök</span>
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          </div>
                        </div>
 
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 font-mono text-[10.5px]">
                          <motion.div 
                            whileHover={{ y: -3, scale: 1.01, filter: "brightness(1.025)", boxShadow: "0 10px 15px -3px rgba(15,23,42,0.03)" }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            className="bg-slate-50 p-3 rounded-xl border border-slate-100 cursor-default"
                          >
                            <span className="text-text-muted block text-[9px] uppercase font-bold">LÖNEFORM</span>
                            <span className="font-extrabold text-slate-900 block mt-0.5">{selectedJob.salary || "Månadslön enligt kollektivavtal"}</span>
                          </motion.div>
                          <motion.div 
                            whileHover={{ y: -3, scale: 1.01, filter: "brightness(1.025)", boxShadow: "0 10px 15px -3px rgba(15,23,42,0.03)" }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            className="bg-slate-50 p-3 rounded-xl border border-slate-100 cursor-default"
                          >
                            <span className="text-text-muted block text-[9px] uppercase font-bold">ANNONSÖR / MODELL</span>
                            <span className="font-extrabold text-accent-blue block mt-0.5 font-mono">Arbetsförmedlingen Officiell</span>
                          </motion.div>
                        </div>
                      </div>
 
                      {/* Job description section */}
                      <div className="space-y-2">
                        <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-widest block font-mono">Rollbeskrivning & Kravprofil</h4>
                        <div className="p-4 bg-slate-50/40 border border-slate-200/50 rounded-xl font-sans text-text-muted leading-relaxed whitespace-pre-wrap">
                          {selectedJob.description}
                        </div>
                      </div>
 
                      {/* Matched / Missing core skills comparison checklist */}
                      <div className="space-y-2.5">
                        <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-widest block font-mono">Krav och Kompetensmatchning</h4>
                        {selectedJob.skillsDemanded && selectedJob.skillsDemanded.length > 0 ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {selectedJob.skillsDemanded.map((skill, idx) => {
                              const userHasIt = profile.skills.some(us => us.toLowerCase().replace(/\s+/g, '') === skill.toLowerCase().replace(/\s+/g, ''));
                              return (
                                <motion.div 
                                  key={idx} 
                                  whileHover={{ y: -2, scale: 1.01, filter: "brightness(1.02)", boxShadow: "0 8px 12px -3px rgba(15,23,42,0.02)" }}
                                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                  className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100 text-[11px] font-mono cursor-default"
                                >
                                  <span className={`h-5 w-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold ${
                                    userHasIt ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                                  }`}>
                                    {userHasIt ? "✓" : "✗"}
                                  </span>
                                  <span className={userHasIt ? "text-slate-800 font-bold" : "text-slate-500"}>
                                    {skill}
                                  </span>
                                  <span className="ml-auto text-[8px] font-extrabold uppercase text-text-muted">
                                    {userHasIt ? "Klar" : "Analysera"}
                                  </span>
                                </motion.div>
                              );
                            })}
                          </div>
                        ) : (
                          <p className="text-text-muted italic bg-slate-50 p-3 rounded-xl">Inga formella kompetenser fanns uttryckta i Platsbankens annonsdokument.</p>
                        )}
                      </div>
 
                      {/* Official source note block placed explicitly for high transparency */}
                      <motion.div 
                        whileHover={{ y: -3, scale: 1.005, filter: "brightness(1.025)", boxShadow: "0 10px 15px -3px rgba(14,165,233,0.03)" }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="bg-sky-50/40 border border-sky-100/55 p-4 rounded-xl text-[11.5px] text-slate-800 font-mono space-y-2 leading-relaxed cursor-default"
                      >
                        <div className="font-extrabold text-accent-blue flex items-center gap-1.5 uppercase text-xs">
                          <Info className="h-4 w-4" />
                          Marknadsanalys: Sverige
                        </div>
                        <p>
                          Löneuppskattningar och arbetsvillkor baseras på officiell lönestatistik från <strong>Statistiska centralbyrån (SCB)</strong>. Alla aktiva annonser hämtas i realtid via <strong>Arbetsförmedlingens Platsbanken-API</strong>.
                        </p>
                        <p>
                          I Sverige styrs anställningsvillkor, löneökningar och förmåner i hög grad av <strong>Kollektivavtal</strong> (avtal mellan fackförbund som Unionen eller Sveriges Ingenjörer och arbetsgivare). Detta reglerar bland annat tjänstepension, övertidsersättning och semesterdagar.
                        </p>
                      </motion.div>

                    </motion.div>
                  ) : (
                    <motion.div
                      key="empty-state"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="p-16 my-auto text-center flex flex-col items-center justify-center space-y-5"
                      id="selected-job-details-empty"
                    >
                      <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-sky-500/10 to-indigo-500/10 border border-sky-100 flex items-center justify-center shadow-inner relative animate-pulse">
                        <span className="absolute h-10 w-10 index-10 bg-sky-200/20 rounded-full animate-ping" />
                        <Briefcase className="h-6 w-6 text-sky-600" />
                      </div>
                      <div className="space-y-1.5 max-w-sm">
                        <h4 className="font-extrabold text-sm text-text-main">Välj ett ledigt jobb</h4>
                        <p className="text-xs text-text-muted leading-relaxed font-sans">
                          Klicka på en aktiv jobbannons i matchningslistan till vänster för att starta vår avancerade gapanalys. Vi mäter dina kompetenser mot kraven och beräknar din lönepotential!
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

            </div>

               </>
            ) : (
              <div className="space-y-6 flex-1 min-h-[0px] flex flex-col animate-fade-in" id="catalog-subtab-container">
                {/* Catalog Filters Bar */}
                <div className="bg-white/95 backdrop-blur-md border border-slate-200/80 p-5 rounded-2xl shadow-[0_8px_30px_rgba(15,23,42,0.02)] grid grid-cols-2 md:grid-cols-12 gap-3.5 items-end" id="catalog-filters-grid">
                  <div className="col-span-2 md:col-span-4 space-y-1.5">
                    <label className="text-[10px] text-slate-400 uppercase font-mono font-bold block">Sök yrkesroll / nyckelord</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        value={catalogSearch}
                        onChange={(e) => setCatalogSearch(e.target.value)}
                        placeholder="Sök t.ex. Arkitekt, React, Vård..."
                        className="w-full text-xs pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-blue/30 focus:border-accent-blue text-text-main placeholder-slate-400 font-sans font-semibold transition-all"
                      />
                    </div>
                  </div>

                  <div className="col-span-1 md:col-span-2 space-y-1.5">
                    <label className="text-[10px] text-slate-400 uppercase font-mono font-bold block">Bransch / Kategori</label>
                    <select
                      value={catalogCategoryFilter}
                      onChange={(e) => setCatalogCategoryFilter(e.target.value)}
                      className="w-full text-xs px-3 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-blue/30 focus:border-accent-blue text-text-main font-semibold transition-all cursor-pointer"
                    >
                      <option value="all">Alla branscher</option>
                      <option value="Teknik">Teknik</option>
                      <option value="Hälsa">Hälsa</option>
                      <option value="Säkerhet / Logistik">Logistik / Säkerhet</option>
                      <option value="Ekonomi">Ekonomi</option>
                      <option value="Utbildning">Utbildning</option>
                    </select>
                  </div>

                  <div className="col-span-1 md:col-span-2 space-y-1.5">
                    <label className="text-[10px] text-slate-400 uppercase font-mono font-bold block">Efterfrågan (Prognos)</label>
                    <select
                      value={catalogDemandFilter}
                      onChange={(e) => setCatalogDemandFilter(e.target.value)}
                      className="w-full text-xs px-3 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-blue/30 focus:border-accent-blue text-text-main font-semibold transition-all cursor-pointer"
                    >
                      <option value="all">Alla nivåer</option>
                      <option value="High">Hög efterfrågan ⚡</option>
                      <option value="Medium">Medel efterfrågan</option>
                      <option value="Low">Låg efterfrågan</option>
                    </select>
                  </div>

                  <div className="col-span-1 md:col-span-2 space-y-1.5">
                    <label className="text-[10px] text-slate-400 uppercase font-mono font-bold block">Lönespann (Brutto)</label>
                    <select
                      value={catalogSalaryFilter}
                      onChange={(e) => setCatalogSalaryFilter(e.target.value)}
                      className="w-full text-xs px-3 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-blue/30 focus:border-accent-blue text-text-main font-semibold transition-all cursor-pointer"
                    >
                      <option value="all">Alla löner</option>
                      <option value="lt40k">&lt; 40 000 kr</option>
                      <option value="40k55k">40 000 - 55 000 kr</option>
                      <option value="gt55k">&gt; 55 000 kr</option>
                    </select>
                  </div>

                  <div className="col-span-1 md:col-span-2 space-y-1.5">
                    <label className="text-[10px] text-slate-400 uppercase font-mono font-bold block">Sortering</label>
                    <select
                      value={catalogSort}
                      onChange={(e) => setCatalogSort(e.target.value)}
                      className="w-full text-xs px-3 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-blue/30 focus:border-accent-blue text-text-main font-semibold transition-all cursor-pointer"
                    >
                      <option value="ads-desc">Flest annonser</option>
                      <option value="salary-desc">Högst månadslön</option>
                      <option value="role-asc">Yrkesnamn</option>
                    </select>
                  </div>
                </div>

                {/* Sub-tab main body columns */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 flex-1 min-h-[0px] jobs-split-container">
                  
                  {/* Left Column: Catalog List */}
                  <div className="md:col-span-5 border border-slate-200/80 bg-white rounded-2xl flex flex-col shadow-[0_8px_30px_rgba(15,23,42,0.02)] min-h-[450px] overflow-hidden" id="catalog-roles-list">
                    <div className="px-5 py-4 bg-gradient-to-r from-slate-50 to-slate-100/30 border-b border-slate-100 flex justify-between items-center shrink-0">
                      <div>
                        <h3 className="font-extrabold text-xs text-text-main uppercase tracking-wide">
                          Officiellt Svenskt Yrkesregister
                        </h3>
                        <p className="text-[10px] text-text-muted mt-0.5">Kompetenskartor & historiska data</p>
                      </div>
                      <span className="text-[10px] bg-slate-100 text-slate-800 px-2.5 py-0.5 rounded-md font-mono font-bold">
                        {IN_DEMAND_JOBS.filter(job => {
                          const matchesKeyword = !catalogSearch.trim() || 
                            job.role.toLowerCase().includes(catalogSearch.toLowerCase()) ||
                            job.requiredSkills.some(s => s.toLowerCase().includes(catalogSearch.toLowerCase())) ||
                            job.category.toLowerCase().includes(catalogSearch.toLowerCase());
                          
                          let matchesSalary = true;
                          if (catalogSalaryFilter === 'lt40k') {
                            matchesSalary = job.avgSalary < 40000;
                          } else if (catalogSalaryFilter === '40k55k') {
                            matchesSalary = job.avgSalary >= 40000 && job.avgSalary <= 55000;
                          } else if (catalogSalaryFilter === 'gt55k') {
                            matchesSalary = job.avgSalary > 55000;
                          }
                          
                          const matchesDemand = catalogDemandFilter === 'all' || job.demandLevel === catalogDemandFilter;
                          const matchesCategory = catalogCategoryFilter === 'all' || job.category === catalogCategoryFilter;
                          
                          return matchesKeyword && matchesSalary && matchesDemand && matchesCategory;
                        }).length} yrken matchade
                      </span>
                    </div>

                    <div className="flex-1 overflow-y-auto p-2.5 grid grid-cols-2 gap-3 md:flex md:flex-col md:space-y-1.5 md:divide-y md:divide-slate-100/80" id="catalog-roles-scroll-container">
                      {(() => {
                        const filtered = IN_DEMAND_JOBS.filter(job => {
                          const matchesKeyword = !catalogSearch.trim() || 
                            job.role.toLowerCase().includes(catalogSearch.toLowerCase()) ||
                            job.requiredSkills.some(s => s.toLowerCase().includes(catalogSearch.toLowerCase())) ||
                            job.category.toLowerCase().includes(catalogSearch.toLowerCase());
                          
                          let matchesSalary = true;
                          if (catalogSalaryFilter === 'lt40k') {
                            matchesSalary = job.avgSalary < 40000;
                          } else if (catalogSalaryFilter === '40k55k') {
                            matchesSalary = job.avgSalary >= 40000 && job.avgSalary <= 55000;
                          } else if (catalogSalaryFilter === 'gt55k') {
                            matchesSalary = job.avgSalary > 55000;
                          }
                          
                          const matchesDemand = catalogDemandFilter === 'all' || job.demandLevel === catalogDemandFilter;
                          const matchesCategory = catalogCategoryFilter === 'all' || job.category === catalogCategoryFilter;
                          
                          return matchesKeyword && matchesSalary && matchesDemand && matchesCategory;
                        }).sort((a, b) => {
                          if (catalogSort === 'ads-desc') return b.activeAds - a.activeAds;
                          if (catalogSort === 'salary-desc') return b.avgSalary - a.avgSalary;
                          if (catalogSort === 'role-asc') return a.role.localeCompare(b.role);
                          return 0;
                        });

                        if (filtered.length === 0) {
                          return (
                            <div className="col-span-2 p-16 text-center text-xs text-text-muted">
                              <AlertCircle className="h-10 w-10 text-slate-350 mx-auto mb-3 opacity-60" />
                              <p className="font-medium text-slate-850">Inga yrken matchade dina filter inställningar.</p>
                              <button 
                                type="button"
                                onClick={() => {
                                  setCatalogSearch("");
                                  setCatalogSalaryFilter("all");
                                  setCatalogDemandFilter("all");
                                  setCatalogCategoryFilter("all");
                                }} 
                                className="text-accent-blue font-bold underline mt-2 block mx-auto hover:text-sky-800 cursor-pointer text-xs"
                              >
                                Återställ filter
                              </button>
                            </div>
                          );
                        }

                        return (
                          <>
                            {filtered.slice(0, catalogVisibleCount).map((job) => {
                              const isSelected = selectedCatalogJob && selectedCatalogJob.role === job.role;
                              return (
                                <div 
                                  key={job.role}
                                  id={`catalog-row-${job.role.replace(/\s+/g, '-')}`}
                                  onClick={() => {
                                    setSelectedCatalogJob(job);
                                    setIsMobileCatalogDetailOpen(true);
                                  }}
                                  className={`p-3 md:p-4 rounded-xl transition-all duration-200 cursor-pointer flex flex-col justify-between gap-2.5 border ${
                                    isSelected 
                                      ? 'bg-sky-50/60 border-sky-300 md:border-l-4 md:border-l-sky-600 shadow-[0_4px_12px_rgba(3,105,161,0.06)]' 
                                      : 'hover:bg-slate-50 border-slate-100 md:border-l-4 md:border-l-transparent bg-white/45'
                                  } md:flex-row md:items-center md:gap-4`}
                                >
                                  <div className="space-y-1.5 flex-1 min-w-[0px]">
                                    <h4 className="font-bold text-[11px] md:text-xs text-text-main line-clamp-2 md:line-clamp-none leading-snug min-h-[30px] md:min-h-0" title={job.role}>
                                      {job.role}
                                    </h4>
                                    <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-2 font-mono text-[9px] md:text-[9.5px]">
                                      <span className="text-sky-755 font-bold bg-sky-50/80 px-1.5 py-0.5 rounded-sm border border-sky-100/30 w-fit">
                                        {job.category}
                                      </span>
                                      <span className="hidden md:inline text-slate-300">•</span>
                                      <span className="text-emerald-700 font-bold">
                                        {(job.activeAds).toLocaleString("sv-SE")} annonser
                                      </span>
                                    </div>
                                  </div>

                                  <div className="text-left md:text-right shrink-0 border-t border-slate-100/50 pt-2 md:pt-0 md:border-t-0 flex flex-row justify-between md:flex-col items-center md:items-end w-full md:w-auto">
                                    <span className="font-bold text-slate-900 font-sans text-[11px] md:text-xs">
                                      {(job.avgSalary).toLocaleString("sv-SE")} kr
                                    </span>
                                    <span className="text-[8px] md:text-[8.5px] uppercase font-mono font-bold text-slate-400">
                                      Snittlön
                                    </span>
                                  </div>
                                </div>
                              );
                            })}

                            {filtered.length > catalogVisibleCount && (
                              <div className="col-span-2 pt-4 pb-6 px-1 flex justify-center w-full">
                                <button
                                  type="button"
                                  onClick={() => setCatalogVisibleCount(prev => prev + 20)}
                                  className="w-full md:w-auto px-6 py-2.5 bg-slate-100 font-bold hover:bg-slate-200/85 active:bg-slate-200/95 text-slate-800 text-xs tracking-wide rounded-xl border border-slate-200/60 shadow-xs cursor-pointer flex items-center justify-center gap-1.5 transition-colors"
                                >
                                  <span>Visa fler yrken</span>
                                  <ChevronDown className="h-4 w-4 text-slate-500 animate-pulse" />
                                  <span className="bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded-md text-[10px]">
                                    +{Math.min(20, filtered.length - catalogVisibleCount)}
                                  </span>
                                </button>
                              </div>
                            )}
                          </>
                        );
                      })()}
                    </div>
                  </div>

                  {/* Right Column: Catalog Detail View */}
                  <motion.div 
                    layout
                    transition={{ type: "spring", stiffness: 300, damping: 28 }}
                    className="hidden md:flex md:col-span-7 bg-white border border-slate-200/80 rounded-2xl shadow-[0_8px_30px_rgba(15,23,42,0.02)] flex-col overflow-hidden min-h-[450px]"
                  >
                    <AnimatePresence mode="wait">
                      {selectedCatalogJob ? (
                        <motion.div 
                          key={selectedCatalogJob.role}
                          layout="position"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                          className="p-6 space-y-6 overflow-y-auto flex-1 text-xs"
                          id="catalog-job-details-frame"
                        >
                          <div className="border-b border-slate-100 pb-5 space-y-3">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[9px] font-mono text-accent-blue font-bold uppercase bg-sky-50 border border-sky-100 px-2.5 py-0.5 rounded-md">
                                {selectedCatalogJob.category} — Officiell Yrkesprofil
                              </span>
                              <span className={`text-[9.5px] font-mono font-extrabold px-2 py-0.5 rounded border uppercase tracking-wider ${
                                selectedCatalogJob.demandLevel === 'High' 
                                  ? 'bg-rose-50 text-rose-700 border-rose-250' 
                                  : 'bg-amber-50 text-amber-700 border-amber-250'
                              }`}>
                                {selectedCatalogJob.demandLevel === "High" ? "Hög efterfrågan ⚡" : "Stabil efterfrågan"}
                              </span>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              <h2 className="text-sm md:text-base font-extrabold text-text-main leading-snug tracking-tight">
                                {selectedCatalogJob.role}
                              </h2>
                              {(() => {
                                const isFavorite = favoriteJobs.includes(selectedCatalogJob.role);
                                return (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (isFavorite) {
                                        setFavoriteJobs(prev => prev.filter(r => r !== selectedCatalogJob.role));
                                      } else {
                                        setFavoriteJobs(prev => [...prev, selectedCatalogJob.role]);
                                        setSelectedFavoriteJob(selectedCatalogJob.role);
                                      }
                                    }}
                                    className={`px-4.5 py-2 text-xs font-bold rounded-xl transition duration-200 cursor-pointer flex items-center justify-center gap-1.5 select-none shrink-0 ${
                                      isFavorite 
                                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/85 hover:bg-emerald-100/50'
                                        : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'
                                    }`}
                                  >
                                    {isFavorite ? (
                                      <>
                                        <Check className="h-3.5 w-3.5 shrink-0 text-emerald-650" />
                                        <span>Sparad i profil ✓</span>
                                      </>
                                    ) : (
                                      <>
                                        <Plus className="h-3.5 w-3.5 shrink-0" />
                                        <span>Spara i profil</span>
                                      </>
                                    )}
                                  </button>
                                );
                              })()}
                            </div>
                          </div>
                                                        {/* Quick statistics widgets - Upgraded to beautiful 4-card grid, 2 in a row, bigger typography & Swedish sources */}
                          <div className="grid grid-cols-2 gap-4 shrink-0" id="catalog-statistics-highlights">
                            
                            {/* METADATA BLOCK 1: MEDIANLÖN */}
                            <motion.div 
                              whileHover={{ y: -4, scale: 1.015, filter: "brightness(1.02)", boxShadow: "0 12px 20px -3px rgba(15,23,42,0.03)" }}
                              transition={{ type: "spring", stiffness: 350, damping: 25 }}
                              className="bg-white/95 backdrop-blur-md border border-slate-200/70 p-5 rounded-2xl shadow-xs flex flex-col justify-between hover:border-amber-200/95 transition-colors"
                            >
                              <div className="flex items-start justify-between gap-1.5">
                                <div className="space-y-1 min-w-0">
                                  <span className="text-[10px] md:text-xs uppercase font-mono text-slate-400 font-extrabold tracking-wider block">Medianlön</span>
                                  <strong className="text-lg sm:text-2xl md:text-3xl font-black tracking-tight text-slate-900 block font-sans truncate">
                                    {selectedCatalogJob.avgSalary.toLocaleString("sv-SE")} <span className="text-xs md:text-sm font-medium font-mono text-slate-400">SEK</span>
                                  </strong>
                                </div>
                                <div className="p-2 bg-amber-50 rounded-xl text-amber-600 shrink-0 select-none hidden sm:block font-sans">
                                  <Wallet className="h-5 w-5" />
                                </div>
                              </div>
                              <div className="mt-4 pt-2 border-t border-slate-100 text-[9px] md:text-xs font-mono text-slate-400 leading-normal font-medium">
                                Källa: <strong>Skatteverket & SCB</strong> lönestatistik (officiell).
                              </div>
                            </motion.div>

                            {/* METADATA BLOCK 2: LÖNESPANN */}
                            <motion.div 
                              whileHover={{ y: -4, scale: 1.015, filter: "brightness(1.02)", boxShadow: "0 12px 20px -3px rgba(15,23,42,0.03)" }}
                              transition={{ type: "spring", stiffness: 350, damping: 25 }}
                              className="bg-white/95 backdrop-blur-md border border-slate-200/70 p-5 rounded-2xl shadow-xs flex flex-col justify-between hover:border-indigo-200/95 transition-colors"
                            >
                              <div className="flex items-start justify-between gap-1.5">
                                <div className="space-y-1 min-w-0">
                                  <span className="text-[10px] md:text-xs uppercase font-mono text-slate-400 font-extrabold tracking-wider block">Lönespann</span>
                                  <strong className="text-sm sm:text-lg md:text-xl font-black tracking-tight text-slate-900 block font-sans truncate" title={selectedCatalogJob.salaryRange}>
                                    {selectedCatalogJob.salaryRange.replace(" SEK/månad", "").replace(" SEK", "")}
                                  </strong>
                                </div>
                                <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600 shrink-0 select-none hidden sm:block font-sans">
                                  <TrendingUp className="h-5 w-5" />
                                </div>
                              </div>
                              <div className="mt-4 pt-2 border-t border-slate-100 text-[9px] md:text-xs font-mono text-slate-400 leading-normal font-medium font-sans">
                                Källa: Generella lönenivåer via <strong>SCB & Facket</strong>.
                              </div>
                            </motion.div>

                            {/* METADATA BLOCK 3: LEDIGA JOBB */}
                            <motion.div 
                              whileHover={{ y: -4, scale: 1.015, filter: "brightness(1.02)", boxShadow: "0 12px 20px -3px rgba(15,23,42,0.03)" }}
                              transition={{ type: "spring", stiffness: 350, damping: 25 }}
                              className="bg-white/95 backdrop-blur-md border border-slate-200/70 p-5 rounded-2xl shadow-xs flex flex-col justify-between hover:border-sky-200/95 transition-colors"
                            >
                              <div className="flex items-start justify-between gap-1.5">
                                <div className="space-y-1 min-w-0">
                                  <span className="text-[10px] md:text-xs uppercase font-mono text-slate-400 font-extrabold tracking-wider block">Lediga jobb</span>
                                  <strong className="text-lg sm:text-2xl md:text-3xl font-black tracking-tight text-accent-blue block font-sans truncate">
                                    {selectedCatalogJob.activeAds.toLocaleString("sv-SE")} aktiva
                                  </strong>
                                </div>
                                <div className="p-2 bg-sky-50 rounded-xl text-sky-600 shrink-0 select-none hidden sm:block font-sans">
                                  <Briefcase className="h-5 w-5" />
                                </div>
                              </div>
                              <div className="mt-4 pt-2 border-t border-slate-100 text-[9px] md:text-xs font-mono text-slate-400 leading-normal font-medium font-sans">
                                Källa: Sökning i realtid från <strong>Arbetsförmedlingen</strong>.
                              </div>
                            </motion.div>

                            {/* METADATA BLOCK 4: YRKESPROGNOS */}
                            <motion.div 
                              whileHover={{ y: -4, scale: 1.015, filter: "brightness(1.02)", boxShadow: "0 12px 20px -3px rgba(15,23,42,0.03)" }}
                              transition={{ type: "spring", stiffness: 350, damping: 25 }}
                              className="bg-white/95 backdrop-blur-md border border-slate-200/70 p-5 rounded-2xl shadow-xs flex flex-col justify-between hover:border-emerald-200/95 transition-colors"
                            >
                              <div className="flex items-start justify-between gap-1.5">
                                <div className="space-y-1 min-w-0 flex-1">
                                  <span className="text-[10px] md:text-xs uppercase font-mono text-slate-400 font-extrabold tracking-wider block">Efterfrågan</span>
                                  <strong className="text-lg sm:text-2xl md:text-3xl font-black tracking-tight text-emerald-700 block uppercase font-sans truncate">
                                    {selectedCatalogJob.demandLevel === "High" ? "Hög" : selectedCatalogJob.demandLevel === "Medium" ? "Medel" : "Låg"}
                                  </strong>
                                </div>
                                <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600 shrink-0 select-none hidden sm:block font-sans">
                                  <Info className="h-5 w-5" />
                                </div>
                              </div>
                              <div className="mt-4 pt-2 border-t border-slate-100 text-[9px] md:text-xs font-mono text-slate-400 leading-normal font-medium font-sans">
                                Källa: <strong>Arbetsförmedlingens Yrkeskompass</strong>.
                              </div>
                            </motion.div>

                          </div>

                          {/* Future Outlook */}
                          <div className="space-y-2">
                            <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-widest block font-mono">Framtidsutsikter & Efterfrågan</h4>
                            <p className="p-4 bg-amber-50/20 border border-amber-100/50 text-slate-800 rounded-xl leading-relaxed text-[11.5px] font-sans">
                              {selectedCatalogJob.futureOutlook}
                            </p>
                          </div>

                          {/* Required Skills Checklist */}
                          <div className="space-y-2.5">
                            <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-widest block font-mono">Formella Kompetenskrav i Sverige</h4>
                            <div className="flex flex-wrap gap-2.5">
                              {selectedCatalogJob.requiredSkills.map((skill, idx) => {
                                const hasSkill = profile.skills.some(us => us.toLowerCase().replace(/\s+/g, '') === skill.toLowerCase().replace(/\s+/g, ''));
                                return (
                                  <span 
                                    key={idx} 
                                    className={`px-3 py-1.5 rounded-full border text-[11px] font-mono font-medium flex items-center gap-1.5 ${
                                      hasSkill 
                                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                                        : 'bg-slate-100 text-slate-650 border-slate-200'
                                    }`}
                                  >
                                    <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8.5px] font-extrabold ${
                                      hasSkill ? 'bg-emerald-200 text-emerald-950' : 'bg-slate-200 text-slate-500'
                                    }`}>
                                      {hasSkill ? "✓" : "•"}
                                    </span>
                                    {skill}
                                  </span>
                                );
                              })}
                            </div>
                          </div>

                          {/* Education required info */}
                          <div className="space-y-2 pb-2">
                            <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-widest block font-mono">Vanliga Utbildningsvägar</h4>
                            <div className="p-4 bg-sky-50/20 border border-sky-100/40 rounded-xl flex gap-3 text-slate-850">
                              <div className="p-1.5 bg-sky-50 text-sky-650 rounded-lg h-fit select-none shrink-0 border border-sky-100/30">
                                <GraduationCap className="h-5 w-5" />
                              </div>
                              <p className="leading-relaxed font-sans font-medium text-[11px]">
                                {selectedCatalogJob.educationRequired}
                              </p>
                            </div>
                          </div>

                          {/* Real-time live listings matching the catalog job */}
                          {renderLiveJobVacancyList()}

                        </motion.div>
                      ) : (
                        <div className="p-16 text-center space-y-4 my-auto">
                          <Briefcase className="h-10 w-10 text-slate-300 mx-auto" />
                          <p className="text-slate-500 text-xs font-medium">Ingen karriärprofil vald. Välj en roll i listan till vänster.</p>
                        </div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                </div>
              </div>
            )}

            {/* MOBILE FULL-SCREEN / SLIDEOUT DETAIL PAGE FOR CATALOG */}
            <AnimatePresence>
              {isMobileCatalogDetailOpen && selectedCatalogJob && (
                <div id="mobile-catalog-detail-modal" className="fixed inset-0 z-[100] flex flex-col justify-end md:hidden bg-slate-900/60 backdrop-blur-sm px-0">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ type: "spring", damping: 25, stiffness: 220 }}
                    className="bg-white rounded-t-3xl h-[100vh] sm:h-[92vh] max-h-[100dvh] w-full flex flex-col overflow-hidden relative shadow-[0_-8px_30px_rgba(0,0,0,0.15)] text-[#1C1917]"
                  >
                    {/* Modal Drag/Indicator Handle */}
                    <div className="w-full flex justify-center py-4 shrink-0 bg-slate-50 border-b border-slate-100 relative">
                      <div className="w-12 h-1.5 rounded-full bg-slate-300" />
                      <button
                        onClick={() => setIsMobileCatalogDetailOpen(false)}
                        className="absolute right-4 top-2.5 p-2 bg-slate-200/60 text-slate-755 hover:text-slate-950 rounded-full active:scale-95 transition-all outline-none"
                      >
                        <X className="h-4.5 w-4.5" />
                      </button>
                    </div>

                    {/* Job Details Content (Scrollable Container) */}
                    <div className="flex-1 overflow-y-auto p-5 pb-32 space-y-6 text-xs leading-relaxed text-slate-600">
                      
                      {/* Header Card */}
                      <div className="border-b border-slate-100 pb-5 space-y-3">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <span className="text-[9px] font-mono text-accent-blue font-bold uppercase bg-sky-50 border border-sky-100 px-2.5 py-0.5 rounded-md">
                            {selectedCatalogJob.category} — Officiell Yrkesprofil
                          </span>
                          <span className={`text-[9.5px] font-mono font-extrabold px-2 py-0.5 rounded border uppercase tracking-wider ${
                            selectedCatalogJob.demandLevel === 'High' 
                              ? 'bg-rose-50 text-rose-700 border-rose-250' 
                              : 'bg-amber-50 text-amber-700 border-amber-250'
                          }`}>
                            {selectedCatalogJob.demandLevel === "High" ? "Hög efterfrågan ⚡" : "Stabil efterfrågan"}
                          </span>
                        </div>

                        <div className="flex flex-col gap-1">
                          <h2 className="text-sm font-extrabold text-slate-900 leading-snug tracking-tight">
                            {selectedCatalogJob.role}
                          </h2>
                        </div>
                      </div>

                      {/* Quick statistics widgets - 2-card grid */}
                      <div className="grid grid-cols-2 gap-3 shrink-0">
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-150">
                          <span className="text-[8px] uppercase font-mono text-slate-400 font-extrabold tracking-wider block">Medianlön</span>
                          <strong className="text-xs sm:text-sm font-black tracking-tight text-slate-900 block font-sans mt-0.5">
                            {selectedCatalogJob.avgSalary.toLocaleString("sv-SE")} <span className="text-[10px] font-mono text-slate-400">kr</span>
                          </strong>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-150">
                          <span className="text-[8px] uppercase font-mono text-slate-400 font-extrabold tracking-wider block">Lönespann</span>
                          <strong className="text-xs sm:text-sm font-black tracking-tight text-slate-900 block font-sans mt-0.5">
                            {selectedCatalogJob.salaryRange.replace(" SEK/månad", "").replace(" SEK", "")}
                          </strong>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-150">
                          <span className="text-[8px] uppercase font-mono text-slate-400 font-extrabold tracking-wider block">Lediga jobb</span>
                          <strong className="text-xs sm:text-sm font-black tracking-tight text-accent-blue block font-sans mt-0.5">
                            {selectedCatalogJob.activeAds.toLocaleString("sv-SE")}
                          </strong>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-150">
                          <span className="text-[8px] uppercase font-mono text-slate-400 font-extrabold tracking-wider block">Efterfrågan</span>
                          <strong className="text-xs sm:text-sm font-black tracking-tight text-emerald-700 block uppercase font-sans mt-0.5">
                            {selectedCatalogJob.demandLevel === "High" ? "Hög" : selectedCatalogJob.demandLevel === "Medium" ? "Medel" : "Låg"}
                          </strong>
                        </div>
                      </div>

                      {/* Future Outlook */}
                      <div className="space-y-2">
                        <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-widest block font-mono">Framtidsutsikter</h4>
                        <p className="p-4 bg-amber-50/20 border border-amber-100/50 text-slate-800 rounded-xl leading-relaxed text-[11px] font-sans">
                          {selectedCatalogJob.futureOutlook}
                        </p>
                      </div>

                      {/* Required Skills Checklist */}
                      <div className="space-y-2.5">
                        <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-widest block font-mono">Formella Kompetenskrav i Sverige</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedCatalogJob.requiredSkills.map((skill, idx) => {
                            const hasSkill = profile.skills.some(us => us.toLowerCase().replace(/\s+/g, '') === skill.toLowerCase().replace(/\s+/g, ''));
                            return (
                              <span 
                                key={idx} 
                                className={`px-2.5 py-1.5 rounded-full border text-[10.5px] font-mono font-medium flex items-center gap-1.5 ${
                                  hasSkill 
                                    ? 'bg-emerald-55 text-emerald-800 border-emerald-250' 
                                    : 'bg-slate-100 text-slate-650 border-slate-200'
                                }`}
                              >
                                <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8.5px] font-extrabold ${
                                  hasSkill ? 'bg-emerald-200 text-emerald-950' : 'bg-slate-200 text-slate-500'
                                }`}>
                                  {hasSkill ? "✓" : "•"}
                                </span>
                                {skill}
                              </span>
                            );
                          })}
                        </div>
                      </div>

                      {/* Education required info */}
                      <div className="space-y-2 pb-2">
                        <h4 className="font-extrabold text-xs text-slate-950 uppercase tracking-widest block font-mono">Vanliga Utbildningsvägar</h4>
                        <div className="p-4 bg-sky-50/20 border border-sky-100/40 rounded-xl flex gap-3 text-slate-850">
                          <div className="p-1.5 bg-sky-50 text-sky-650 rounded-lg h-fit select-none shrink-0 border border-sky-100/30">
                            <GraduationCap className="h-5 w-5" />
                          </div>
                          <p className="leading-relaxed font-sans font-medium text-[11px]">
                            {selectedCatalogJob.educationRequired}
                          </p>
                        </div>
                      </div>

                      {/* Real-time live listings matching the catalog job */}
                      {renderLiveJobVacancyList()}

                    </div>

                    {/* Fixed bottom interactive actions footer */}
                    <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-150 p-4 flex gap-3 z-10 pb-6 md:pb-4">
                      {(() => {
                        const isFavorite = favoriteJobs.includes(selectedCatalogJob.role);
                        return (
                          <button
                            type="button"
                            onClick={() => {
                              if (isFavorite) {
                                setFavoriteJobs(prev => prev.filter(r => r !== selectedCatalogJob.role));
                              } else {
                                setFavoriteJobs(prev => [...prev, selectedCatalogJob.role]);
                                setSelectedFavoriteJob(selectedCatalogJob.role);
                              }
                            }}
                            className={`flex-1 py-3 text-xs font-bold rounded-xl transition duration-200 cursor-pointer flex items-center justify-center gap-1.5 select-none active:scale-95 border ${
                              isFavorite 
                                ? 'bg-emerald-55 text-emerald-800 border-emerald-250 hover:bg-emerald-100/50'
                                : 'bg-indigo-600 hover:bg-indigo-700 text-white border-transparent shadow-sm'
                            }`}
                          >
                            {isFavorite ? (
                              <>
                                <Check className="h-3.5 w-3.5 shrink-0 text-emerald-650" />
                                <span>Sparad ✓</span>
                              </>
                            ) : (
                              <>
                                <Plus className="h-3.5 w-3.5 shrink-0" />
                                <span>Spara</span>
                              </>
                            )}
                          </button>
                        );
                      })()}

                      <button
                        type="button"
                        onClick={() => {
                          const cleanSearch = selectedCatalogJob.role.split('(')[0].trim();
                          triggerSwedishJobSearch(cleanSearch, "All locations");
                          setTimeout(() => {
                            document.getElementById("platsbanken-embedded-listings-view")?.scrollIntoView({ behavior: 'smooth' });
                          }, 100);
                        }}
                        className="flex-1 py-3 bg-slate-900 hover:bg-slate-850 text-white rounded-xl text-center text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                      >
                        <span>Sök på Platsbanken</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>

                  </motion.div>
                </div>
              )}
            </AnimatePresence>

          </motion.div>
        )}

        {/* PAGE 3: MY PROFILE & GAP ANALYST */}
        {activeTab === 'profile' && (
          !currentUser ? (
            <div className="w-full flex justify-center items-center py-6 sm:py-12">
              <LoginGuard 
                title="Säker molnsparning av din profil 💼"
                subtitle="Logga in eller skapa ett kostnadsfritt konto för att se ditt digitala CV, din kompetensanalys, och din personliga utvecklings-roadmap!"
              />
            </div>
          ) : (
            <ProfilePortal
              profile={profile}
              setProfile={setProfile}
              isEditingProfile={isEditingProfile}
              setIsEditingProfile={setIsEditingProfile}
              favoriteJobs={favoriteJobs}
              setFavoriteJobs={setFavoriteJobs}
              selectedFavoriteJob={selectedFavoriteJob}
              setSelectedFavoriteJob={setSelectedFavoriteJob}
              savedJobPosts={savedJobPosts}
              setSavedJobPosts={setSavedJobPosts}
              completedSteps={completedSteps}
              setCompletedSteps={setCompletedSteps}
              careerScore={careerScore}
              newSkill={newSkill}
              setNewSkill={setNewSkill}
              handleAddSkill={handleAddSkill}
              handleRemoveSkill={handleRemoveSkill}
              dragActive={dragActive}
              handleDrag={handleDrag}
              handleDrop={handleDrop}
              uploadedDocs={uploadedDocs}
              setUploadedDocs={setUploadedDocs}
              fileInputRef={fileInputRef}
              handleFileChange={handleFileChange}
              setSelectedJob={setSelectedJob}
              setIsMobileJobDetailOpen={setIsMobileJobDetailOpen}
              setSearchKeyword={setSearchKeyword}
              setJobsSubTab={setJobsSubTab}
              setActiveTab={setActiveTab}
              computeJobMatchingDetails={computeJobMatchingDetails}
              currentUser={currentUser}
              isAuthLoading={isAuthLoading}
              onClearSession={() => {
                // Done synchronously upon initiating sign-out to prevent race conditions.
                // State resets for guest mode are fully handled by the onAuthStateChanged (null) observer loop.
                console.log("[Lasse Auth] Clearing session initiated. State cleanups are managed by onAuthStateChanged.");
              }}
              onStartChatWithLasse={(text: string) => {
                setActiveTab('chat');
                handleSendChatMessage(undefined, text);
              }}
            />
          )
        )}

        {false && activeTab === 'profile' && (
          <motion.div
            key="profile"
            initial={{ opacity: 0, y: 12, scale: 0.995 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.995 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            id="profile-page-view"
          >
            
            {/* Left Column: Profile Card + Favorite Roles */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Profile Card */}
              <div className="bg-white border border-slate-200/80 p-6 md:p-8 rounded-2xl shadow-[0_8px_30px_rgba(15,23,42,0.02)] space-y-4">
                
                {/* Visual Header / Avatar */}
                <div className="flex items-center gap-4.5">
                  <div className="relative h-18 w-18 rounded-full bg-slate-900 border-4 border-white shadow-md flex items-center justify-center text-white shrink-0 font-sans font-bold text-xl select-none">
                    {profile.fullName ? profile.fullName.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0, 2) : "SJ"}
                    <span className="absolute bottom-0 right-0 h-4.5 w-4.5 bg-emerald-500 border-2 border-white rounded-full"></span>
                  </div>
                  <div className="space-y-1 min-w-[0px] flex-1">
                    <h3 className="font-extrabold text-sm md:text-base text-slate-900 block truncate" id="profile-name-header">
                      {profile.fullName}
                    </h3>
                    <p className="text-[11px] text-text-muted font-semibold font-mono block">
                      {profile.currentJob || "Juniorutvecklare (Sökande)"}
                    </p>
                    <p className="text-[10px] text-slate-400 font-mono flex items-center gap-1.5 mt-0.5">
                      <MapPin className="h-3 w-3 text-slate-400" />
                      {profile.targetLocation}
                    </p>
                  </div>
                </div>

                {/* Edit Toggle Trigger Button */}
                {!isEditingProfile ? (
                  <button
                    type="button"
                    onClick={() => setIsEditingProfile(true)}
                    className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-98"
                    id="trigger-edit-profile-action"
                  >
                    <span>Redigera Profil & CV 👤</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsEditingProfile(false)}
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-98"
                  >
                    <span>Spara Ändringar & Tillbaka 💾</span>
                  </button>
                )}
              </div>

              {/* Edit Mode Content */}
              <AnimatePresence mode="wait">
                {isEditingProfile ? (
                  <motion.div
                    key="edit-profile"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.18, ease: "easeInOut" }}
                    className="bg-white border border-slate-200/80 p-6 md:p-8 rounded-2xl shadow-[0_8px_30px_rgba(15,23,42,0.02)] space-y-6"
                  >
                  <div className="border-b border-slate-100 pb-3">
                    <h4 className="font-black text-xs uppercase text-slate-800 tracking-wide">Ändra dina uppgifter</h4>
                    <p className="text-[11px] text-text-muted mt-0.5">Fyll i din erfarenhet och kompetenser</p>
                  </div>

                  <div className="space-y-4 text-xs font-mono">
                    <div>
                      <label className="text-[10px] text-text-muted uppercase block font-bold mb-1">Fullständigt namn</label>
                      <input
                        type="text"
                        value={profile.fullName}
                        onChange={(e) => handleProfileChange("fullName", e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all rounded-xl text-text-main font-sans text-xs font-semibold"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-text-muted uppercase block font-bold mb-1">Nuvarande Jobb / Arbetssökande</label>
                      <input
                        type="text"
                        value={profile.currentJob || ""}
                        onChange={(e) => handleProfileChange("currentJob", e.target.value)}
                        placeholder="t.ex. Juniorutvecklare, Sökande, Vårdbiträde"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all rounded-xl text-text-main font-sans text-xs font-semibold"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] text-text-muted uppercase block font-bold mb-1">Målroll / Bransch</label>
                        <input
                          type="text"
                          value={profile.targetRole}
                          onChange={(e) => handleProfileChange("targetRole", e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all rounded-xl text-text-main font-sans text-xs font-semibold"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] text-text-muted uppercase block font-bold mb-1">Ort i Sverige / Län</label>
                        <select
                          value={profile.targetLocation}
                          onChange={(e) => handleProfileChange("targetLocation", e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all rounded-xl text-text-main font-sans text-xs cursor-pointer font-semibold text-slate-800"
                        >
                          {SWEDEN_REGIONS.map((reg, ri) => (
                            <option key={ri} value={reg}>{reg}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] text-text-muted uppercase block font-bold mb-1">Akademisk Utbildning / Gymnasienivå</label>
                      <input
                        type="text"
                        value={profile.education}
                        onChange={(e) => handleProfileChange("education", e.target.value)}
                        placeholder="t.ex. Högskoleexamen, YH-examen, Gymnasieexamen"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all rounded-xl text-text-main font-sans text-xs font-semibold"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-text-muted uppercase block font-bold mb-1">Certifieringar & Licenser (t.ex. Körkort B)</label>
                      <input
                        type="text"
                        value={profile.certifications}
                        onChange={(e) => handleProfileChange("certifications", e.target.value)}
                        placeholder="t.ex. Körkort B, Scrum Master, Azure Fundamentals"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all rounded-xl text-text-main font-sans text-xs font-semibold"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-text-muted uppercase block font-bold mb-2">Hantera kompetensnyckelord</label>
                      
                      {/* Active skills */}
                      <div className="flex flex-wrap gap-1.5 mb-2.5 max-h-[140px] overflow-y-auto p-1 bg-slate-50 rounded-lg">
                        {profile.skills.map((skill, si) => (
                          <span key={si} className="bg-white hover:bg-red-50 text-slate-800 px-2.5 py-1 rounded-md border border-slate-200 text-[10px] flex items-center gap-1 transition-colors">
                            <span className="h-1.5 w-1.5 rounded-full bg-sky-500"></span>
                            <span>{skill}</span>
                            <button 
                              type="button" 
                              onClick={() => handleRemoveSkill(skill)}
                              className="text-slate-400 hover:text-red-700 font-black ml-1 text-xs cursor-pointer"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>

                      {/* Add skill row */}
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          placeholder="Skriv kompetens och tryck Enter"
                          className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all rounded-xl text-text-main font-sans text-xs"
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
                          className="px-3 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition cursor-pointer flex items-center justify-center shadow-xs"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Integrated CV & Support Document Upload Manager */}
                    <div className="space-y-3 pt-3 border-t border-slate-100">
                      <div>
                        <label className="text-[10px] text-text-muted uppercase block font-bold">Ladda upp och hantera filer</label>
                        <p className="text-[9.5px] text-slate-400 font-sans font-medium">Bifoga fackliga bevis, betygskompletteringar eller CV.</p>
                      </div>

                      {/* Drag & Drop area */}
                      <div 
                        onDragEnter={handleDrag}
                        onDragOver={handleDrag}
                        onDragLeave={handleDrag}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed rounded-xl p-3.5 text-center text-[11px] transition relative ${
                          dragActive ? 'border-sky-500 bg-sky-50/20' : 'border-slate-200 hover:border-slate-300 bg-slate-50/40'
                        }`}
                      >
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          accept=".pdf,.doc,.docx,.txt"
                          className="hidden"
                        />
                        <div className="space-y-1.5 cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                          <Upload className="h-5 w-5 text-slate-400 mx-auto" />
                          <p className="font-semibold text-slate-705 font-sans leading-snug">Ladda upp fil / CV</p>
                          <p className="text-[9px] text-slate-400">PDF, TXT eller Word</p>
                        </div>
                      </div>

                      {/* Multiple document list */}
                      {uploadedDocs.length > 0 && (
                        <div className="space-y-1.5">
                          <span className="text-[9px] text-slate-400 font-bold uppercase block">Sparade Bilagor ({uploadedDocs.length}):</span>
                          <div className="divide-y divide-slate-100 border border-slate-150 rounded-xl overflow-hidden bg-white text-xs">
                            {uploadedDocs.map((doc, idx) => (
                              <div key={idx} className="p-2 flex items-center justify-between text-[10px] gap-2">
                                <div className="flex items-center gap-1.5 min-w-[0px] flex-1">
                                  <FileText className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
                                  <span className="font-bold text-slate-900 truncate font-sans">{doc.name}</span>
                                  <span className="text-slate-400 font-light shrink-0">({doc.size})</span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setUploadedDocs(prev => prev.filter((_, i) => i !== idx));
                                  }}
                                  className="text-red-500 hover:text-red-750 font-black cursor-pointer p-0.5 text-xs font-sans hover:bg-slate-50 rounded shrink-0"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setIsEditingProfile(false)}
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-600/10"
                    >
                      <span>Spara Uppgifter ✓</span>
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="view-profile"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.18, ease: "easeInOut" }}
                  className="space-y-6"
                >
                  {/* View Mode: Saved Careers list */}
                  <div className="bg-white border border-slate-200/80 p-6 md:p-8 rounded-2xl shadow-[0_8px_30px_rgba(15,23,42,0.02)] space-y-5">
                  <div className="border-b border-slate-100 pb-3 flex justify-between items-center gap-3">
                    <div>
                      <h4 className="font-extrabold text-xs uppercase text-slate-800 tracking-wide">Dina sparade yrken (Favoriter)</h4>
                      <p className="text-[11px] text-text-muted mt-0.5">Klicka på ett yrke för omedelbar gapanalys</p>
                    </div>
                    <span className="bg-slate-100 text-slate-800 text-[10px] font-bold font-mono px-2 py-0.5 rounded-md">
                      {favoriteJobs.length} yrken
                    </span>
                  </div>

                  <div className="space-y-2 max-h-[280px] overflow-y-auto">
                    {favoriteJobs.map((roleName) => {
                      const matchedJob = IN_DEMAND_JOBS.find(j => j.role === roleName);
                      const isSelected = selectedFavoriteJob === roleName;
                      return (
                        <div
                          key={roleName}
                          onClick={() => setSelectedFavoriteJob(roleName)}
                          className={`p-3.5 border rounded-xl transition-all cursor-pointer flex justify-between items-center gap-3 ${
                            isSelected 
                              ? 'bg-sky-50/50 border-sky-400 shadow-sm relative' 
                              : 'bg-white border-slate-150 hover:bg-slate-50'
                          }`}
                        >
                          <div className="space-y-1 min-w-[0px] flex-1">
                            <strong className="text-slate-800 text-xs block font-sans truncate">{roleName}</strong>
                            <div className="flex items-center gap-2 text-[9.5px] font-mono">
                              <span className="text-slate-400 uppercase font-bold">{matchedJob?.category || "Tjänst"}</span>
                              <span className="text-slate-300">•</span>
                              <span className="text-emerald-700 font-bold">Snitt: {(matchedJob?.avgSalary || 42000).toLocaleString("sv-SE")} kr</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-right shrink-0">
                            {isSelected && <span className="h-2 w-2 rounded-full bg-sky-500 animate-ping shrink-0"></span>}
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
                              className="text-slate-400 hover:text-red-600 font-black cursor-pointer text-xs p-1 rounded-md hover:bg-slate-100 shrink-0"
                              title="Ta bort favorit"
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
                        <p className="text-[10px] text-slate-400">Spara yrkesprofiler direkt under fliken <strong>Yrkeskatalog & Filter</strong> för att läsa gapanalysen.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* SIBLING CARD: Saved Platsbanken vacancies */}
                <div className="bg-white border border-slate-200/80 p-6 md:p-8 rounded-2xl shadow-[0_8px_30px_rgba(15,23,42,0.02)] space-y-5">
                  <div className="border-b border-slate-100 pb-3 flex justify-between items-center gap-3">
                    <div>
                      <h4 className="font-extrabold text-xs uppercase text-slate-800 tracking-wide flex items-center gap-1.5">
                        <Briefcase className="h-3.5 w-3.5 text-indigo-600 shrink-0" />
                        <span>Sparade jobb (Platsbanken)</span>
                      </h4>
                      <p className="text-[10.5px] text-text-muted mt-0.5">Jobb sparade från dina realtidssökningar</p>
                    </div>
                    <span className="bg-slate-100 text-slate-800 text-[10px] font-bold font-mono px-2 py-0.5 rounded-md">
                      {savedJobPosts.length} st
                    </span>
                  </div>

                  <div className="space-y-2.5 max-h-[300px] overflow-y-auto">
                    {savedJobPosts.map((job) => (
                      <div
                        key={job.id}
                        onClick={() => {
                          setSelectedJob(job);
                          setIsMobileJobDetailOpen(true);
                        }}
                        className="p-3.5 bg-slate-50/50 hover:bg-slate-100/70 border border-slate-150 hover:border-indigo-200 rounded-xl transition-all flex justify-between items-start gap-3 cursor-pointer group"
                      >
                        <div className="space-y-1 min-w-[0px] flex-1">
                          <strong className="text-slate-800 text-xs block font-sans truncate font-bold group-hover:text-indigo-900 transition-colors">{job.title}</strong>
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-650 font-semibold font-sans">
                            <span>🏢 {job.company}</span>
                            <span className="text-slate-300">•</span>
                            <span className="text-slate-500 font-normal">📍 {job.location}</span>
                          </div>
                          <div className="flex items-center gap-2 font-mono text-[9.5px] pt-1">
                            <span className="text-indigo-600 font-extrabold">Match: {computeJobMatchingDetails(job).matchPercentage}%</span>
                            <span className="text-slate-300">•</span>
                            <span className="text-accent-blue font-bold hover:underline cursor-pointer">
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
                          className="text-slate-400 hover:text-red-600 font-black cursor-pointer text-xs p-1 rounded-md hover:bg-slate-100/80 shrink-0 relative z-10"
                          title="Ta bort sparad annons"
                        >
                          ×
                        </button>
                      </div>
                    ))}

                    {savedJobPosts.length === 0 && (
                      <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-xl space-y-1 text-slate-500 text-xs">
                        <Briefcase className="w-5 h-5 mx-auto text-slate-350" />
                        <p className="font-semibold text-slate-750">Du har inga sparade jobbannonser än.</p>
                        <p className="text-[10px] text-slate-400">Gå till fliken <strong>Jobbhittare & SCB-Statistik</strong> för att söka på Platsbanken och klicka på "Spara jobb".</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>)}
            </AnimatePresence>
            </div>

            {/* Right Column: Dynamic Sweden Gap Analyst */}
            <div className="lg:col-span-7 space-y-6">
              
              {(() => {
                const activeJobName = favoriteJobs.includes(selectedFavoriteJob) ? selectedFavoriteJob : (favoriteJobs[0] || "");
                if (!activeJobName) {
                  return (
                    <div className="bg-white border border-slate-200/80 p-12 rounded-2xl shadow-[0_8px_30px_rgba(15,23,42,0.02)] text-center space-y-3">
                      <Briefcase className="h-10 w-10 text-slate-350 mx-auto" />
                      <p className="text-slate-500 text-xs font-semibold">Ingen sparad karriär vald.</p>
                      <p className="text-[11px] text-slate-400 leading-relaxed max-w-xs mx-auto">Spara eller klicka på ett yrke till vänster för att ladda din anpassade gapanalys.</p>
                    </div>
                  );
                }

                // Analyze gap
                const job = IN_DEMAND_JOBS.find(j => j.role === activeJobName) || IN_DEMAND_JOBS[0];
                
                // Skills check
                const userSkillsNormalized = (profile.skills || []).map(s => s.toLowerCase().trim().replace(/[-\s]/g, ''));
                const jobSkills = job.requiredSkills || [];
                
                const hasSkills = jobSkills.filter(skill => {
                  const sNorm = skill.toLowerCase().trim().replace(/[-\s]/g, '');
                  return userSkillsNormalized.some(us => us.includes(sNorm) || sNorm.includes(us));
                });
                
                const missingSkills = jobSkills.filter(skill => !hasSkills.includes(skill));
                
                // Classify alerts
                const isDeveloper = activeJobName.toLowerCase().includes("utvecklare") || activeJobName.toLowerCase().includes("developer") || activeJobName.toLowerCase().includes("arkitekt") || activeJobName.toLowerCase().includes("it");
                const isNurse = activeJobName.toLowerCase().includes("sjuksköterska") || activeJobName.toLowerCase().includes("nurse") || activeJobName.toLowerCase().includes("hälsa");
                const isLightIndustrial = activeJobName.toLowerCase().includes("elektriker") || activeJobName.toLowerCase().includes("kock") || activeJobName.toLowerCase().includes("byg");
                
                // Education Check
                const userEduLower = (profile.education || "").toLowerCase();
                let educationMatches = false;
                let missingAcademia = "";
                let academiaAdvice = "";
                let academiaPlatform = "";
                let academiaUrl = "";

                if (isDeveloper) {
                  if (userEduLower.includes("systemutveckling") || userEduLower.includes("kandidat") || userEduLower.includes("it") || userEduLower.includes("yh") || userEduLower.includes("högskola") || userEduLower.includes("universitet") || userEduLower.includes("ingenjör") || userEduLower.includes("datavetenskap")) {
                    educationMatches = true;
                  } else {
                    missingAcademia = "Relevant IT-examen (YH-utbildning / Kandidatexamen)";
                    academiaAdvice = "IT-branschen värdesätter nischade YH-utbildningar (2 år) med LIA-praktik, eller datateknik från universitetet.";
                    academiaPlatform = "Yrkeshögskolan programutbud";
                    academiaUrl = "https://www.yrkeshogskolan.se/hitta-utbildning?q=programmering";
                  }
                } else if (isNurse) {
                  if (userEduLower.includes("sjuksköterska") || userEduLower.includes("omsorg") || userEduLower.includes("legitimerad sjuksköterska") || userEduLower.includes("akademisk")) {
                    educationMatches = true;
                  } else {
                    missingAcademia = "Sjuksköterskeutbildning (3 år, Akademisk kandidatexamen)";
                    academiaAdvice = "Krävs formellt legitimationsbeslut från Socialstyrelsen för att arbeta som sjuksköterska i svensk sjukvård.";
                    academiaPlatform = "Antagning.se (Akademiskt register)";
                    academiaUrl = "https://www.antagning.se/se/search?query=sjuksk%C3%B6terskeprogrammet";
                  }
                } else {
                  if (userEduLower.length >= 10 || userEduLower.includes("gymnasie") || userEduLower.includes("komvux")) {
                    educationMatches = true;
                  } else {
                    missingAcademia = "Gymnasial yrkesbehörighet eller Yrkesvux-utbildning";
                    academiaAdvice = "Yrket kräver ofta grundläggande gymnasiebehörighet eller matchande yrkesvux-basutbildning från kommunen.";
                    academiaPlatform = "Nationella Komvux-vuxenutbildningen";
                    academiaUrl = "https://www.studentum.se/utbildning/komvux";
                  }
                }

                // Licence & Driver license checks
                const userCertLower = (profile.certifications || "").toLowerCase();
                const checklist: { item: string, status: 'have' | 'missing', advice: string, platform: string, url: string }[] = [];

                if (isLightIndustrial) {
                  const hasDriverLicense = userCertLower.includes("körkort") || userCertLower.includes("korkort");
                  checklist.push({
                    item: "Svenskt B-Körkort (Personbil)",
                    status: hasDriverLicense ? "have" : "missing",
                    advice: "Många uppdrag kräver servicebil och aktivt körkort.",
                    platform: "Trafikverket",
                    url: "https://www.trafikverket.se/korkort"
                  });
                  const hasECY = userCertLower.includes("ecy") || userCertLower.includes("auktorisation");
                  if (activeJobName.toLowerCase().includes("elektriker")) {
                    checklist.push({
                      item: "ECY-certifikat (Elinstallationsauktorisation)",
                      status: hasECY ? "have" : "missing",
                      advice: "Grundkrav för att arbeta självständigt som auktoriserad elektriker i fält.",
                      platform: "Yrkeshögskolan Elutbildningar",
                      url: "https://www.yrkeshogskolan.se"
                    });
                  }
                } else {
                  const hasDriverLicense = userCertLower.includes("körkort") || userCertLower.includes("korkort") || userCertLower.includes("körkort b");
                  checklist.push({
                    item: "Svenskt B-Körkort",
                    status: hasDriverLicense ? "have" : "missing",
                    advice: "Ett B-körkort är starkt meriterande och ökar din anställbarhet avsevärt för resor utanför storstadsområden.",
                    platform: "Körkort.se / Trafikverket prov",
                    url: "https://www.trafikverket.se/korkort"
                  });
                }

                // Calculate Match percentage
                const matchPct = Math.min(100, Math.round(
                  35 + 
                  (hasSkills.length / Math.max(1, jobSkills.length)) * 40 + 
                  (educationMatches ? 15 : 0) + 
                  (checklist.every(c => c.status === "have") ? 10 : 0)
                ));

                return (
                  <div className="bg-white border border-slate-200/80 p-6 md:p-8 rounded-2xl shadow-[0_8px_30px_rgba(15,23,42,0.02)] space-y-6 animate-fade-in" id="gap-analysis-compass">
                    
                    {/* Header */}
                    <div className="border-b border-slate-100 pb-5 flex flex-wrap justify-between items-start gap-4">
                      <div className="space-y-1.5 flex-1 min-w-[200px]">
                        <span className="text-[9px] bg-sky-50 text-sky-800 border border-sky-200 px-2.5 py-0.5 rounded-md font-mono font-black uppercase">
                          KOMPETENS- & STUDIEMATCHNING
                        </span>
                        <h2 className="text-sm md:text-base font-extrabold text-slate-900 tracking-tight leading-snug">
                          {activeJobName}
                        </h2>
                      </div>
                      
                      <div className="text-right shrink-0">
                        <span className="bg-emerald-50 text-emerald-800 px-3 py-1 text-xs font-black rounded-lg border border-emerald-200 font-mono inline-block">
                          {matchPct}% Match
                        </span>
                        <span className="text-[9px] text-slate-400 block mt-1 uppercase font-bold">PROFILDIAGNOS</span>
                      </div>
                    </div>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 font-mono text-[11px]">
                        <span className="text-[9px] text-text-muted uppercase block font-bold">MEDELLÖN I SVERIGE (SNITT)</span>
                        <strong className="text-sm text-slate-900 block mt-0.5 font-sans font-black">
                          {job.avgSalary.toLocaleString("sv-SE")} SEK/mån
                        </strong>
                        <span className="text-[9.5px] text-slate-400 block mt-0.5 italic">{job.salaryRange} (SCB)</span>
                      </div>

                      <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 font-mono text-[11px]">
                        <span className="text-[9px] text-text-muted uppercase block font-bold">NATIONELL EFTERFRÅGAN</span>
                        <strong className="text-sm text-rose-700 block mt-0.5 font-sans font-black flex items-center gap-1">
                          {job.demandLevel === "High" ? "⚡ Hög efterfrågan" : "Stabil efterfrågan"}
                        </strong>
                        <span className="text-[9.5px] text-slate-400 block mt-0.5 italic">{job.activeAds.toLocaleString()} aktiva annonser</span>
                      </div>
                    </div>

                    {/* 1. WHAT THEY HAVE */}
                    <div className="space-y-3">
                      <h4 className="text-[11.5px] font-mono font-bold uppercase text-slate-900 flex items-center gap-1.5">
                        <CheckCircle className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
                        <span>Vad du redan uppfyller (Dina styrkor):</span>
                      </h4>
                      <div className="p-4 bg-emerald-50/20 border border-emerald-100/60 rounded-xl space-y-3 text-[11.5px]">
                        {/* Skills match */}
                        <div>
                          <strong className="text-emerald-900 font-sans block mb-1.5 text-xs font-semibold">Matchande kompetenser:</strong>
                          {hasSkills.length > 0 ? (
                            <div className="flex flex-wrap gap-1.5">
                              {hasSkills.map((sk, idx) => (
                                <span key={idx} className="bg-emerald-55 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-md font-mono text-[10.5px] font-bold">
                                  ✓ {sk}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <p className="italic text-slate-400 text-[10.5px]">Inga direkta kompetensmatchningar hittades i din nuvarande profil ännu.</p>
                          )}
                        </div>

                        {/* Education match */}
                        <div className="pt-2 border-t border-emerald-100 text-[11px] font-mono leading-relaxed">
                          <strong className="text-emerald-900 font-sans block mb-0.5 text-xs font-semibold">Utbildningsmatchning:</strong>
                          {educationMatches ? (
                            <p className="text-emerald-800 font-sans font-medium">
                              ✓ Din angivna akademiska nivå <strong className="font-mono">({profile.education || "Saknas"})</strong> mäter upp väl mot yrkeskrav!
                            </p>
                          ) : (
                            <p className="text-slate-500 italic font-sans font-medium">Din nuvarande utbildningsprofil mäter inte upp mot kraven. Vi rekommenderar vidare fackstudier (se gapanalys nedan).</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* 2. WHAT THEY ARE MISSING (THE GAPS) */}
                    <div className="space-y-3">
                      <h4 className="text-[11.5px] font-mono font-bold uppercase text-slate-900 flex items-center gap-1.5">
                        <AlertCircle className="h-4.5 w-4.5 text-rose-500 shrink-0" />
                        <span>Vad du saknar / Behöver komplettera:</span>
                      </h4>
                      <div className="p-4 bg-rose-50/15 border border-rose-100 rounded-xl space-y-4">
                        
                        {/* Missing Skills */}
                        {missingSkills.length > 0 ? (
                          <div className="space-y-1.5">
                            <span className="text-[10px] text-rose-700 font-mono font-bold uppercase block">Kompetensgap (Sök efter dessa i din profil):</span>
                            <div className="flex flex-wrap gap-1.5">
                              {missingSkills.map((sk, idx) => (
                                <span key={idx} className="bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded text-[10px] font-mono font-bold">
                                  ⚠ {sk}
                                </span>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="text-emerald-800 font-mono text-[10.5px] flex items-center gap-1 font-semibold">
                            ✓ Du uppfyller alla basfärdigheter som vanligen efterfrågas!
                          </div>
                        )}

                        {/* Missing Academia */}
                        {!educationMatches && missingAcademia && (
                          <div className="pt-3 border-t border-rose-100/60 text-[11px] font-mono space-y-2">
                            <div>
                              <span className="text-[9.5px] text-rose-700 font-bold uppercase block mb-0.5 font-bold">Formellt akademiskt krav:</span>
                              <strong className="text-slate-900 text-xs font-sans block">{missingAcademia}</strong>
                            </div>
                            <p className="text-slate-500 font-sans leading-relaxed text-[11px]">
                              {academiaAdvice}
                            </p>
                            <div>
                              <a
                                href={academiaUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 text-indigo-700 font-bold font-sans rounded-lg shadow-2xs hover:bg-slate-50 transition-colors text-[10.5px] cursor-pointer"
                              >
                                <span>Hitta program på {academiaPlatform}</span>
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            </div>
                          </div>
                        )}

                        {/* Missing Licences Checklist */}
                        {checklist.map((chk, idx) => {
                          if (chk.status === "missing") {
                            return (
                              <div key={idx} className="pt-3 border-t border-rose-100/60 text-[11px] font-mono space-y-1.5">
                                <div>
                                  <span className="text-[9.5px] text-rose-700 font-bold uppercase block font-bold">Licens / Legitimation som saknas:</span>
                                  <strong className="text-slate-950 font-sans text-xs block">{chk.item}</strong>
                                </div>
                                <p className="text-slate-500 font-sans leading-relaxed text-[10.5px]">
                                  {chk.advice}
                                </p>
                                <div>
                                  <a
                                    href={chk.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 text-indigo-700 font-bold font-sans rounded-lg shadow-2xs hover:bg-slate-50 transition-colors text-[10.5px] cursor-pointer"
                                  >
                                    <span>Läs mer hos {chk.platform}</span>
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

                    {/* 3. CORE UTBILDNINGS PORTAL LINKS */}
                    <div className="space-y-3">
                      <h4 className="text-[11.5px] font-mono font-bold uppercase text-slate-800 flex items-center gap-1.5">
                        <GraduationCap className="h-4.5 w-4.5 text-indigo-600 shrink-0" />
                        <span>Svenska Utbildningsanordnare & Källor:</span>
                      </h4>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-2">
                        
                        <a
                          href="https://www.studentum.se/utbildning/komvux"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-slate-50 border border-slate-201 cursor-pointer hover:bg-slate-100/50 hover:border-slate-300 rounded-xl transition flex flex-col justify-between text-left"
                        >
                          <div>
                            <span className="text-[9px] bg-slate-200 text-slate-800 px-2 py-0.5 rounded-sm font-mono font-bold">KOMVUX / GYMNASIUM</span>
                            <strong className="text-slate-900 text-xs font-sans block mt-1.5">Komvux vuxenutbildning</strong>
                            <p className="text-[10px] text-slate-500 font-sans leading-relaxed mt-0.5">
                              Läs upp betyg, grundläggande behörighet eller genomför en yrkesförberedande vuxenutbildning lokalt.
                            </p>
                          </div>
                          <span className="text-[10px] text-indigo-700 font-bold inline-flex items-center gap-0.5 mt-2.5">
                            Sök Komvuxkurser <ExternalLink className="h-2.5 w-2.5" />
                          </span>
                        </a>

                        <a
                          href="https://www.yrkeshogskolan.se"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-slate-50 border border-slate-201 cursor-pointer hover:bg-slate-100/50 hover:border-slate-300 rounded-xl transition flex flex-col justify-between text-left"
                        >
                          <div>
                            <span className="text-[9px] bg-sky-100 text-sky-800 px-2 py-0.5 rounded-sm font-mono font-bold">YRKESHÖGSKOLA</span>
                            <strong className="text-slate-900 text-xs font-sans block mt-1.5">Yrkeshögskolan (YH)</strong>
                            <p className="text-[10px] text-slate-500 font-sans leading-relaxed mt-0.5">
                              Ett av de snabbaste sätten att sadla om. Kostnadsfria 1-2 åriga yrkesutbildningar med mycket LIA-praktik.
                            </p>
                          </div>
                          <span className="text-[10px] text-indigo-700 font-bold inline-flex items-center gap-0.5 mt-2.5">
                            Hitta YH-utbildningar <ExternalLink className="h-2.5 w-2.5" />
                          </span>
                        </a>

                        <a
                          href="https://www.antagning.se"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-slate-50 border border-slate-201 cursor-pointer hover:bg-slate-100/50 hover:border-slate-300 rounded-xl transition flex flex-col justify-between text-left"
                        >
                          <div>
                            <span className="text-[9px] bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-sm font-mono font-bold">HÖGSKOLA / UNIVERSITET</span>
                            <strong className="text-slate-900 text-xs font-sans block mt-1.5">Antagning.se</strong>
                            <p className="text-[10px] text-slate-500 font-sans leading-relaxed mt-0.5">
                              Sök statliga universitetsutbildningar, högskolekurser eller distansprogram i hela Sverige.
                            </p>
                          </div>
                          <span className="text-[10px] text-indigo-700 font-bold inline-flex items-center gap-0.5 mt-2.5">
                            Ansök på Antagning.se <ExternalLink className="h-2.5 w-2.5" />
                          </span>
                        </a>

                        <a
                          href="https://www.trafikverket.se/korkort"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-slate-50 border border-slate-201 cursor-pointer hover:bg-slate-100/50 hover:border-slate-300 rounded-xl transition flex flex-col justify-between text-left"
                        >
                          <div>
                            <span className="text-[9px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-sm font-mono font-bold">KÖRKORT & LICENSER</span>
                            <strong className="text-slate-900 text-xs font-sans block mt-1.5">Trafikverket Körkort</strong>
                            <p className="text-[10px] text-slate-500 font-sans leading-relaxed mt-0.5">
                              För yrken som kräver B-körkort, tunga fordon eller yrkesförarkompetensbevis (YKB).
                            </p>
                          </div>
                          <span className="text-[10px] text-indigo-700 font-bold inline-flex items-center gap-0.5 mt-2.5">
                            Gå till Trafikverket <ExternalLink className="h-2.5 w-2.5" />
                          </span>
                        </a>

                      </div>
                    </div>

                  </div>
                );
              })()}

              {(() => {
                const activeJobName = favoriteJobs.includes(selectedFavoriteJob) ? selectedFavoriteJob : (favoriteJobs[0] || "");
                if (!activeJobName || !careerScore.roadmap || careerScore.roadmap.length === 0) return null;

                const roadmap = careerScore.roadmap;
                const totalSteps = roadmap.length;
                const completedCount = roadmap.filter(step => completedSteps[`${profile.targetRole}-${step.step}`]).length;
                const progressPercent = totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0;

                // local Komvux mapper
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
                  } else if (cleaned.includes("västerås") || cleaned.includes("vasteras")) {
                    return { name: "Komvux Västerås Kommun", url: "https://www.vasteras.se/komvux" };
                  } else if (cleaned.includes("örebro") || cleaned.includes("orebro")) {
                    return { name: "Örebro Vuxenutbildning (Komvux)", url: "https://www.orebro.se/komvux" };
                  } else if (cleaned.includes("linköping") || cleaned.includes("linkoping")) {
                    return { name: "Vuxenutbildningen Linköpings kommun", url: "https://www.linkoping.se/vuxenutbildning/" };
                  } else if (cleaned.includes("helsingborg")) {
                    return { name: "Komvux Helsingborg Yrkesutbildning", url: "https://helsingborg.se/vuxenutbildning/" };
                  } else if (cleaned.includes("jönköping") || cleaned.includes("jonkoping")) {
                    return { name: "Vuxenutbildningen Jönköpings kommun", url: "https://jonkoping.se/vuxenutbildning" };
                  } else if (cleaned.includes("norrköping") || cleaned.includes("norrkoping")) {
                    return { name: "Komvux Norrköpings kommun", url: "https://www.norrkoping.se/vuxenutbildning-komvux.html" };
                  } else if (cleaned.includes("umeå") || cleaned.includes("umea")) {
                    return { name: "Umeå Vuxenutbildning (Komvux)", url: "https://www.umea.se/komvux" };
                  }
                  return { name: "Nationella Komvux- & Vuxenutbildningen", url: "https://www.studentum.se/utbildning/komvux" };
                };

                const localKomvux = getKomvuxUrlAndName(profile.targetLocation);

                // cheer speech from Lasse
                let speech = "Välkommen till din studieplan! Låt oss stänga dina kompetensgap steg för steg. 🦌☕";
                if (progressPercent > 0 && progressPercent < 100) {
                  speech = `Strålande kämpat! Du har slutfört ${completedCount} av ${totalSteps} steg i din roadmap. Varje steg tar dig närmare kollektivavtal! 📈`;
                } else if (progressPercent === 100) {
                  speech = `Fantastiskt! Du har slutfört hela utbildningsplanen! 🏆 Moose-ive framgång! Nu är du fullständigt rustad för ${profile.targetRole}. Redo att söka jobb på Platsbanken? 🦌🎉`;
                }

                return (
                  <div className="bg-white border border-slate-200/80 p-6 md:p-8 rounded-2xl shadow-[0_8px_30px_rgba(15,23,42,0.02)] space-y-6" id="interactive-study-roadmap">
                    
                    {/* Header with Progress */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-start gap-4">
                        <div className="space-y-1">
                          <span className="text-[9px] bg-emerald-100 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-md font-mono font-black uppercase">
                            PERSONLIG UTBILDNINGSPLAN & VÄGKARTA
                          </span>
                          <h3 className="text-sm md:text-base font-extrabold text-slate-900 tracking-tight">
                            Steg för steg mot målet: {activeJobName}
                          </h3>
                        </div>
                        <div className="text-right shrink-0 font-mono">
                          <span className="bg-slate-900 text-white px-2.5 py-1 text-xs font-bold rounded-lg leading-none inline-block">
                            {progressPercent}% Slutfört
                          </span>
                        </div>
                      </div>

                      {/* Progress bar track */}
                      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden relative">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progressPercent}%` }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                          className="bg-emerald-550 h-full rounded-full"
                          style={{ backgroundColor: "#10b981" }}
                        />
                      </div>
                    </div>

                    {/* Lasse Advisor Mini Balloon speech bubble */}
                    <div className="bg-slate-50 border border-slate-150 rounded-2xl p-4 flex gap-3.5 items-start">
                      <div className="w-10 h-10 bg-slate-100 rounded-full border border-slate-200 overflow-hidden flex items-center justify-center shrink-0">
                        {/* Moose Icon Minimalist Head */}
                        <span className="text-lg">🦌</span>
                      </div>
                      <div className="space-y-1 flex-1">
                        <span className="text-[10px] text-slate-400 font-mono font-black uppercase">Lasses Studiecoach:</span>
                        <p className="text-slate-700 text-xs font-semibold leading-relaxed">
                          {speech}
                        </p>
                      </div>
                    </div>

                    {/* Step Cards List */}
                    <div className="space-y-4">
                      {roadmap.map((step) => {
                        const stepKey = `${profile.targetRole}-${step.step}`;
                        const isDone = !!completedSteps[stepKey];
                        const cleanRoleName = activeJobName.split('(')[0].split('/')[0].replace(/Legitimerad|Auktoriserad/gi, "").trim();
                        const isLager = cleanRoleName.toLowerCase().includes("lager") || activeJobName.toLowerCase().includes("lager") || (profile.targetRole || "").toLowerCase().includes("lager");
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
                            className="border rounded-xl p-4 md:p-5 relative shadow-[0_2px_8px_rgba(16,185,129,0.01)]"
                          >
                            <div className="flex gap-3.5 items-start">
                              {/* Custom Interactive Checkbox */}
                              <motion.button
                                type="button"
                                whileTap={{ scale: 0.9 }}
                                whileHover={{ scale: 1.05 }}
                                onClick={() => {
                                  setCompletedSteps(prev => ({
                                    ...prev,
                                    [stepKey]: !isDone
                                  }));
                                }}
                                className={`w-5.5 h-5.5 rounded-md border flex items-center justify-center cursor-pointer transition-colors mt-0.5 shrink-0 ${
                                  isDone 
                                    ? "bg-emerald-500 border-emerald-500 text-white" 
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
                                      <Check className="h-3.5 w-3.5 stroke-[3.5]" />
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </motion.button>

                              {/* Task Details Content */}
                              <div className="space-y-2 flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                  <span className="text-[10px] font-mono text-slate-400 font-bold">STEG {step.step}</span>
                                  <span className="text-slate-300 font-mono text-[9px]">•</span>
                                  <span className="text-[10.5px] bg-slate-100 text-slate-660 font-mono px-2 py-0.5 rounded-md font-semibold">
                                    ⏱ Uppskattad tid: {step.duration}
                                  </span>
                                </div>

                                <div className="relative inline-block max-w-full">
                                  <h4 className={`text-xs md:text-sm font-extrabold text-slate-900 select-none transition-colors duration-300 ${isDone ? "text-slate-400" : ""}`}>
                                    {step.title}
                                  </h4>
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: isDone ? "100%" : "0%" }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="absolute left-0 top-[52%] h-[2px] bg-slate-300 pointer-events-none rounded"
                                  />
                                </div>
                                
                                <p className={`text-xs text-slate-500 leading-relaxed transition-colors duration-300 ${isDone ? "text-slate-400 opacity-80" : ""}`}>
                                  {step.description}
                                </p>

                                {/* Educational Study Recommendations - Real localized links for Swedish students! */}
                                <div className="mt-3.5 pt-3.5 border-t border-slate-100 space-y-2.5">
                                  <span className="text-[10px] text-slate-400 font-mono font-black uppercase tracking-wide block">
                                    {isLager ? (
                                      step.step === 1 ? "Steg 1: Behörigheter & Licenser" : step.step === 2 ? "Steg 2: Lagerkunskaper & Regler" : "Steg 3: Sök via Bemanningsföretag"
                                    ) : (
                                      step.step === 1 ? "Steg 1: Studievägar & Sökportaler" : step.step === 2 ? "Steg 2: Karriärverktyg & CV" : "Steg 3: Praktik & Sök Jobb"
                                    )}:
                                  </span>

                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {isLager ? (
                                      step.step === 1 ? (
                                        <>
                                          <a
                                            href="https://www.studentum.se/utbildning/truckkort"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 p-2 bg-emerald-50 border border-emerald-150 hover:bg-emerald-100/60 rounded-lg text-emerald-850 transition font-sans text-[10.5px]"
                                          >
                                            <span className="text-xs">🚜</span>
                                            <div className="min-w-0 flex-1">
                                              <span className="font-bold text-slate-805 block truncate leading-none">Hitta Truckutbildning (A+B)</span>
                                              <span className="text-[9.5px]/[13px] text-slate-400 truncate block mt-0.5 font-medium">Jämför truckkurser i Sverige</span>
                                            </div>
                                            <ExternalLink className="h-3 w-3 text-emerald-500 shrink-0" />
                                          </a>

                                          <a
                                            href="https://www.lernia.se/utbildning/yrkesutbildning/fordon-och-transport/truckkort/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 p-2 bg-sky-50/20 border border-sky-100 hover:bg-sky-50/50 rounded-lg text-sky-900 transition font-sans text-[10.5px]"
                                          >
                                            <span className="text-sm shrink-0">⚡</span>
                                            <div className="min-w-0 flex-1">
                                              <span className="font-extrabold text-indigo-900 block truncate leading-none">Lernia Truckutbildning</span>
                                              <span className="text-[9.5px]/[13px] text-slate-404 truncate block mt-0.5 font-medium font-medium">Ta truckkort på 2-4 dagar</span>
                                            </div>
                                            <ExternalLink className="h-3 w-3 text-sky-400 shrink-0" />
                                          </a>
                                        </>
                                      ) : step.step === 2 ? (
                                        <>
                                          <a
                                            href="https://www.prevent.se/branscher/lager-logistik/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 p-2 bg-slate-50 border border-slate-200 hover:bg-slate-100/60 rounded-lg text-slate-700 transition font-sans text-[10.5px]"
                                          >
                                            <span className="text-sm shrink-0">🛡️</span>
                                            <div className="min-w-0 flex-1">
                                              <span className="font-bold text-slate-805 block truncate leading-none">Säkerhet på lager (Prevent)</span>
                                              <span className="text-[9.5px]/[13px] text-slate-400 truncate block mt-0.5 font-medium font-medium font-medium">Lär dig om skyddsregler</span>
                                            </div>
                                            <ExternalLink className="h-3 w-3 text-slate-400 shrink-0" />
                                          </a>

                                          <a
                                            href="https://arbetsformedlingen.se/planera-din-karriar/hitta-yrken/yrkesgrupper/1297"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 p-2 bg-sky-50/20 border border-sky-100 hover:bg-sky-50/50 rounded-lg text-sky-900 transition font-sans text-[10.5px]"
                                          >
                                            <span className="text-sm shrink-0">📋</span>
                                            <div className="min-w-0 flex-1">
                                              <span className="font-extrabold text-indigo-900 block truncate leading-none">Yrkesguide: Lagerarbetare</span>
                                              <span className="text-[9.5px]/[13px] text-slate-404 truncate block mt-0.5 font-medium font-medium font-medium">Arbetsuppgifter & krav</span>
                                            </div>
                                            <ExternalLink className="h-3 w-3 text-sky-400 shrink-0" />
                                          </a>
                                        </>
                                      ) : (
                                        <>
                                          <div className="col-span-1 sm:col-span-2 text-[10px] text-slate-500 font-bold flex items-center gap-1 mt-1 mb-1">
                                            <span>Registrera hos bemanningsföretag (de anställer direkt):</span>
                                          </div>
                                          
                                          <a
                                            href="https://www.lernia.se/lediga-jobb/?q=lager"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 p-2 bg-indigo-50/20 border border-indigo-100 hover:bg-indigo-50/50 rounded-lg text-indigo-950 transition font-sans text-[10.5px]"
                                          >
                                            <span className="text-sm shrink-0">🤝</span>
                                            <div className="min-w-0 flex-1">
                                              <span className="font-extrabold text-indigo-900 block truncate leading-none">Lernia Bemanning</span>
                                              <span className="text-[9.5px]/[13px] text-slate-500 truncate block mt-0.5 font-medium font-medium font-medium">Sök lagerjobb hos Lernia</span>
                                            </div>
                                            <ExternalLink className="h-3 w-3 text-indigo-400 shrink-0" />
                                          </a>

                                          <a
                                            href="https://www.randstad.se/arbetssokande/lediga-jobb/q-lager/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 p-2 bg-teal-50/20 border border-teal-100 hover:bg-teal-50/50 rounded-lg text-teal-900 transition font-sans text-[10.5px]"
                                          >
                                            <span className="text-sm shrink-0">💼</span>
                                            <div className="min-w-0 flex-1">
                                              <span className="font-extrabold text-teal-955 block truncate leading-none">Randstad Bemanning</span>
                                              <span className="text-[9.5px]/[13px] text-teal-600 truncate block mt-0.5 font-medium font-medium font-medium font-medium">Sök lagerjobb hos Randstad</span>
                                            </div>
                                            <ExternalLink className="h-3 w-3 text-teal-400 shrink-0" />
                                          </a>

                                          <a
                                            href="https://www.manpower.se/sv/lediga-jobb?search=lager"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 p-2 bg-amber-50/20 border border-amber-100 hover:bg-amber-50/50 rounded-lg text-amber-900 transition font-sans text-[10.5px]"
                                          >
                                            <span className="text-sm shrink-0">📋</span>
                                            <div className="min-w-0 flex-1">
                                              <span className="font-extrabold text-amber-955 block truncate leading-none">Manpower Bemanning</span>
                                              <span className="text-[9.5px]/[13px] text-amber-600 truncate block mt-0.5 font-medium font-medium font-medium font-medium">Sök lagerjobb hos Manpower</span>
                                            </div>
                                            <ExternalLink className="h-3 w-3 text-amber-400 shrink-0" />
                                          </a>

                                          <a
                                            href="https://www.adecco.se/lediga-jobb/?q=lager"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 p-2 bg-sky-50/20 border border-sky-100 hover:bg-sky-50/50 rounded-lg text-sky-900 transition font-sans text-[10.5px]"
                                          >
                                            <span className="text-sm shrink-0">⚡</span>
                                            <div className="min-w-0 flex-1">
                                              <span className="font-extrabold text-slate-805 block truncate leading-none">Adecco Bemanning</span>
                                              <span className="text-[9.5px]/[13px] text-slate-400 truncate block mt-0.5 font-medium font-medium font-medium font-medium">Sök lagerjobb hos Adecco</span>
                                            </div>
                                            <ExternalLink className="h-3 w-3 text-sky-400 shrink-0" />
                                          </a>
                                        </>
                                      )
                                    ) : step.step === 1 ? (
                                      isAcademicOrFormalEducationJob ? (
                                        <>
                                          {/* Local Komvux finder link */}
                                          <a
                                            href={localKomvux.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 p-2 bg-slate-50 border border-slate-150 hover:bg-slate-100/60 rounded-lg text-slate-700 transition font-sans text-[10.5px]"
                                          >
                                            <span className="text-sm">🏫</span>
                                            <div className="min-w-0 flex-1">
                                              <span className="font-bold text-slate-805 block truncate leading-none">Komvux i din kommun</span>
                                              <span className="text-[9.5px] text-slate-400 truncate block mt-0.5 font-medium font-medium font-medium font-medium">Sök "{eduQuery}" på Komvux</span>
                                            </div>
                                            <ExternalLink className="h-3 w-3 text-slate-400 shrink-0" />
                                          </a>

                                          {/* Yrkeshogskola search link */}
                                          <a
                                            href={yhQueryUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 p-2 bg-sky-50/20 border border-sky-100 hover:bg-sky-50/50 rounded-lg text-sky-900 transition font-sans text-[10.5px]"
                                          >
                                            <span className="text-sm">⚡</span>
                                            <div className="min-w-0 flex-1">
                                              <span className="font-extrabold text-indigo-900 block truncate leading-none">Hitta YH-program</span>
                                              <span className="text-[9.5px] text-slate-400 truncate block mt-0.5 font-medium font-medium font-medium font-medium font-medium">Sök "{eduQuery}" på YH</span>
                                            </div>
                                            <ExternalLink className="h-3 w-3 text-sky-400 shrink-0" />
                                          </a>

                                          {/* Antagning.se high school/university courses query */}
                                          <a
                                            href={antagningQueryUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 p-2 bg-indigo-50/20 border border-indigo-100 hover:bg-indigo-50/50 rounded-lg text-indigo-950 transition font-sans text-[10.5px] sm:col-span-2"
                                          >
                                            <span className="text-sm">🎓</span>
                                            <div className="min-w-0 flex-1">
                                              <span className="font-extrabold text-indigo-900 block truncate leading-none">Antagning.se kurser</span>
                                              <span className="text-[9.5px] text-slate-500 truncate block mt-0.5 font-medium font-medium font-medium font-medium font-medium font-medium">Sök "{eduQuery}" på Antagning.se</span>
                                            </div>
                                            <ExternalLink className="h-3 w-3 text-indigo-400 shrink-0" />
                                          </a>
                                        </>
                                      ) : (
                                        <div className="col-span-2 py-3 px-3 bg-slate-50 border border-slate-150 rounded-lg text-left text-slate-500 text-[11px] leading-relaxed">
                                          ℹ️ Ingen formell eftergymnasial eller Komvux-utbildning krävs för detta yrkesområde. Yrkeserfarenhet eller kortare yrkeslicenser (t.ex. truckkort) är meriterande.
                                        </div>
                                      )
                                    ) : step.step === 2 ? (
                                      <>
                                        <a
                                          href="https://arbetsformedlingen.se/tips-och-rad/skriva-cv"
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="inline-flex items-center gap-1.5 p-2 bg-amber-50/20 border border-amber-100 hover:bg-amber-50/50 rounded-lg text-amber-900 transition font-sans text-[10.5px]"
                                        >
                                          <span className="text-sm shrink-0">📝</span>
                                          <div className="min-w-0 flex-1">
                                            <span className="font-extrabold text-amber-955 block truncate leading-none">Skriva CV & Ansökan</span>
                                            <span className="text-[9.5px] text-amber-600 truncate block mt-0.5 font-medium">Få CV-tips på Arbetsförmedlingen</span>
                                          </div>
                                          <ExternalLink className="h-3 w-3 text-amber-400 shrink-0" />
                                        </a>

                                        <a
                                          href="https://github.com"
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="inline-flex items-center gap-1.5 p-2 bg-slate-50 border border-slate-200 hover:bg-slate-100/60 rounded-lg text-slate-700 transition font-sans text-[10.5px]"
                                        >
                                          <span className="text-sm shrink-0">💻</span>
                                          <div className="min-w-0 flex-1">
                                            <span className="font-bold text-slate-850 block truncate leading-none">Bygga Portfolio på GitHub</span>
                                            <span className="text-[9.5px] text-slate-400 truncate block mt-0.5 font-medium">Spara projekt och källkod</span>
                                          </div>
                                          <ExternalLink className="h-3 w-3 text-slate-400 shrink-0" />
                                        </a>

                                        <a
                                          href="https://www.linkedin.com"
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="inline-flex items-center gap-1.5 p-2 bg-indigo-50/20 border border-indigo-100 hover:bg-indigo-50/50 rounded-lg text-indigo-950 transition font-sans text-[10.5px] sm:col-span-2"
                                        >
                                          <span className="text-sm shrink-0">💼</span>
                                          <div className="min-w-0 flex-1">
                                            <span className="font-extrabold text-indigo-900 block truncate leading-none">Nätverka på LinkedIn</span>
                                            <span className="text-[9.5px] text-slate-500 truncate block mt-0.5 font-medium">Optimera profilen för rekryterare</span>
                                          </div>
                                          <ExternalLink className="h-3 w-3 text-indigo-400 shrink-0" />
                                        </a>
                                      </>
                                    ) : (
                                      <>
                                        <a
                                          href="https://www.yrkeshogskolan.se/for-studerande/lia-och-praktik/"
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="inline-flex items-center gap-1.5 p-2 bg-teal-50/20 border border-teal-100 hover:bg-teal-50/50 rounded-lg text-teal-900 transition font-sans text-[10.5px]"
                                        >
                                          <span className="text-sm shrink-0">🤝</span>
                                          <div className="min-w-0 flex-1">
                                            <span className="font-extrabold text-teal-955 block truncate leading-none">APL & LIA Praktik</span>
                                            <span className="text-[9.5px] text-teal-600 truncate block mt-0.5 font-medium">Hitta svenska praktikplatser</span>
                                          </div>
                                          <ExternalLink className="h-3 w-3 text-teal-400 shrink-0" />
                                        </a>

                                        <a
                                          href={`https://arbetsformedlingen.se/platsbanken/annonser?q=${encodeURIComponent(cleanRoleName)}`}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="inline-flex items-center gap-1.5 p-2 bg-slate-50 border border-slate-200 hover:bg-slate-100/60 rounded-lg text-slate-700 transition font-sans text-[10.5px]"
                                        >
                                          <span className="text-sm shrink-0">💼</span>
                                          <div className="min-w-0 flex-1">
                                            <span className="font-bold text-slate-850 block truncate leading-none">Sök på Platsbanken</span>
                                            <span className="text-[9.5px] text-slate-400 truncate block mt-0.5 font-medium">Sök jobb som "{cleanRoleName}"</span>
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
                                            <span className="text-[9.5px] text-slate-550 truncate block mt-0.5 font-medium">Lediga tjänster på Indeed.se</span>
                                          </div>
                                          <ExternalLink className="h-3 w-3 text-indigo-400 shrink-0" />
                                        </a>
                                      </>
                                    )}
                                  </div>

                                  {/* Custom resources provided directly by career analysis payload */}
                                  {step.resources && step.resources.length > 0 && (
                                    <div className="mt-2.5 flex flex-wrap gap-1.5 items-center">
                                      <span className="text-[9.5px] text-slate-400 font-mono font-bold mr-1">Studieresurser:</span>
                                      {step.resources.map((resItem, ri) => (
                                        <a 
                                          key={ri}
                                          href={resItem.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-200 text-indigo-600 hover:text-indigo-800 rounded-md font-mono text-[10px] font-bold shadow-2xs hover:bg-slate-50 transition cursor-pointer"
                                        >
                                          <span>{resItem.name}</span>
                                          <ExternalLink className="h-2.5 w-2.5" />
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

                  </div>
                );
              })()}

            </div>

          </motion.div>
        )}
            </>
          )}
        </AnimatePresence>

      </main>

      {/* 4. BRAND FOOTER */}
      <footer className={`${activeTab === 'chat' ? 'hidden md:flex' : 'flex'} border-t border-border-card bg-card-bg px-6 py-5 md:px-10 text-center text-[11px] text-text-muted font-mono flex flex-col md:flex-row justify-between items-center gap-3 shrink-0`} id="brand-app-footer">
        <div>
          <span>© 2026 <strong>Karriärälg</strong> • Alla rättigheter förbehållna</span>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-slate-500">
          <span>Källor: <strong>Arbetsförmedlingen</strong></span>
          <span>•</span>
          <span><strong>Statistiska centralbyrån (SCB)</strong></span>
          <span>•</span>
          <span>Regler från <strong>Skatteverket</strong></span>
        </div>
        <div className="flex flex-col gap-0.5 md:items-end">
          <span>Kalibrerad för fackliga standarder via <strong>Unionen & Sveriges Ingenjörer</strong></span>
          <span className="text-[10px] text-slate-400 italic">Fika 🍰 och kollektivavtal 🤝 är integrerat</span>
        </div>
      </footer>

      {/* 5. 21ST.DEV STYLE FLOATING NAV INTERACTIVE DOCK */}
      {activeTab !== "chat" && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none w-auto max-w-[95%] px-4 font-sans md:hidden">
          <motion.div
            initial={{ y: 80, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 18, delay: 0.1 }}
            className="pointer-events-auto flex items-center justify-center gap-3 bg-white/80 backdrop-blur-md hover:bg-white/95 border border-slate-200/80 px-4 py-2.5 rounded-full shadow-[0_20px_50px_rgba(8,112,184,0.15)] relative transition-colors duration-200"
            id="visual-utility-dock"
          >
            {[
              { id: "chat", label: "Karriärcoach Lasse", short: "Lasse 💬", icon: MessageSquare },
              { id: "jobs", label: "Jobb & Marknadsstatistik", short: "Statistik 💼", icon: Briefcase },
              { id: "profile", label: "Min Profil & Kompetensanalys", short: "Profil 👤", icon: User }
            ].map((item) => {
              const IconComponent = item.icon;
              const isActive = activeTab === item.id;
              const isHovered = hoveredDockItem === item.id;
              
              return (
                <div 
                  key={item.id} 
                  className="relative flex flex-col items-center"
                  onMouseEnter={() => setHoveredDockItem(item.id)}
                  onMouseLeave={() => setHoveredDockItem(null)}
                >
                  {/* Framer Motion Tooltip */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.9 }}
                        animate={{ opacity: 1, y: -48, scale: 1 }}
                        exit={{ opacity: 0, y: 15, scale: 0.9 }}
                        transition={{ duration: 0.12, ease: "easeOut" }}
                        className="absolute px-3 py-1.5 bg-slate-900 text-white text-[10px] md:text-xs font-mono font-bold whitespace-nowrap rounded-lg shadow-xl pointer-events-none z-50 flex items-center gap-1.5 border border-slate-800"
                      >
                        <span>{item.label}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Main Bouncy Dock Button */}
                  <motion.button
                    onClick={() => {
                      setActiveTab(item.id as any);
                      if (item.id === "chat") {
                        setMascotState("speaking");
                      }
                    }}
                    whileHover={{ scale: 1.15, y: -4 }}
                    whileTap={{ scale: 0.94 }}
                    className={`relative h-11 w-11 md:h-13 md:w-13 rounded-full flex flex-col items-center justify-center transition-all duration-200 cursor-pointer ${
                      isActive 
                        ? "bg-slate-900 text-white shadow-md shadow-slate-900/40" 
                        : "bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200/40"
                    }`}
                    id={`dock-btn-${item.id}`}
                  >
                    <IconComponent className={`h-5 w-5 md:h-[22px] md:w-[22px] ${isActive ? "scale-105" : ""}`} />
                    
                    {/* Subtle label on mobile if active */}
                    <span className="hidden md:block text-[8px] mt-0.5 opacity-60 font-medium font-sans">
                      {item.short.replace(/ [^ ]+$/, "")}
                    </span>

                    {/* Active Ring */}
                    {isActive && (
                      <motion.div 
                        layoutId="activeDockIndicatorRing"
                        className="absolute inset-0 rounded-full border border-sky-400 opacity-50" 
                        transition={{ type: "spring", stiffness: 300, damping: 22 }}
                      />
                    )}
                  </motion.button>
                  
                  {/* Tiny Active dot below button */}
                  {isActive && (
                    <motion.div
                      layoutId="activeDockDot"
                      transition={{ type: "spring", stiffness: 300, damping: 22 }}
                      className="h-1.5 w-1.5 rounded-full bg-slate-900 absolute bottom-[-5px]"
                    />
                  )}
                </div>
              );
            })}
          </motion.div>
        </div>
      )}

      {/* RESPONSIVE FULL-SCREEN / LIGHTBOX JOB DETAIL DIALOG */}
      <AnimatePresence>
        {isMobileJobDetailOpen && selectedJob && (
          <motion.div 
            id="mobile-job-detail-modal" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setIsMobileJobDetailOpen(false);
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
              className="bg-white rounded-t-3xl md:rounded-3xl h-[92vh] max-h-[92dvh] md:h-auto md:max-h-[85vh] w-full md:max-w-2xl flex flex-col overflow-hidden relative shadow-[0_24px_60px_-15px_rgba(28,25,23,0.18)] border border-amber-950/10 text-text-main cursor-default"
              style={{ transformOrigin: "bottom center" }}
            >
              {/* Modal Drag/Indicator Handle with Swedish warm bookmark style */}
              <div className="w-full flex justify-center py-4 shrink-0 bg-[#FFF4C2]/45 border-b border-amber-950/5 relative">
                <div className="w-14 h-1.5 rounded-full bg-slate-300/80" />
                <div className="absolute top-0 left-0 right-0 h-[3.5px] bg-gradient-to-r from-accent-blue via-sw-yellow to-ochre" />
                <button
                  onClick={() => setIsMobileJobDetailOpen(false)}
                  className="absolute right-4 top-2 p-1.5 bg-slate-200/50 hover:bg-slate-300/60 text-slate-700 hover:text-slate-950 rounded-full active:scale-95 transition-all outline-none cursor-pointer"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              {/* Job Details Content (Scrollable Container) */}
              <div className="flex-1 overflow-y-auto p-5 pb-28 space-y-6 text-xs leading-relaxed text-slate-600">
                
                {/* Header Card */}
                <div className="flex items-start gap-4 pb-4 border-b border-zinc-100 zoom-in-95">
                  <CompanyLogo companyName={selectedJob.company} />
                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[9px] font-mono text-accent-blue font-bold uppercase bg-sky-50 border border-sky-100 px-1.5 py-0.5 rounded-md">
                        ID: {selectedJob.id}
                      </span>
                      {(() => {
                        const { matchPercentage } = computeJobMatchingDetails(selectedJob);
                        return (
                          <span className={`text-[9px] font-mono font-extrabold px-1.5 py-0.5 rounded-full border ${
                            matchPercentage >= 75 
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-250/80 shadow-xs'
                              : matchPercentage >= 50
                              ? 'bg-amber-50 text-amber-700 border-amber-250/80'
                              : 'bg-slate-100 text-slate-600 border-slate-200/60'
                          }`}>
                            {matchPercentage}% Match med profil
                          </span>
                        );
                      })()}
                    </div>
                    <h2 className="text-sm md:text-base font-extrabold text-[#111] leading-snug tracking-tight font-display">
                      {selectedJob.title}
                    </h2>
                    <p className="text-[11px] font-bold text-slate-800">
                      {selectedJob.company} — <span className="text-slate-500 font-normal text-[10px]">{selectedJob.location}, Sverige</span>
                    </p>
                  </div>
                </div>

                {/* Simple Stats grid */}
                <div className="grid grid-cols-2 gap-3.5">
                  <div className="bg-[#FFF4C2]/30 p-4 rounded-2xl border border-amber-950/5 shadow-xs">
                    <span className="text-slate-450 block text-[8px] uppercase font-bold tracking-widest font-mono">Arbetsform / Lön</span>
                    <span className="font-extrabold text-slate-900 block mt-1 font-sans">{selectedJob.salary || "Kollektivavtal lön"}</span>
                  </div>
                  <div className="bg-[#FFF4C2]/30 p-4 rounded-2xl border border-amber-950/5 shadow-xs">
                    <span className="text-slate-450 block text-[8px] uppercase font-bold tracking-widest font-mono">Annonskälla</span>
                    <span className="font-extrabold text-accent-blue block mt-1 font-sans">Arbetsförmedlingen</span>
                  </div>
                </div>

                {/* Role description */}
                <div className="space-y-2">
                  <h4 className="font-black text-[10px] text-slate-500 uppercase tracking-widest block font-mono">Rollbeskrivning & Kravprofil</h4>
                  <div className="p-4 bg-[#FFF4C2]/15 border border-amber-950/10 rounded-2xl font-sans text-slate-700 leading-relaxed whitespace-pre-wrap text-[11px] md:text-xs">
                    {selectedJob.description}
                  </div>
                </div>

                {/* Skills match */}
                <div className="space-y-2.5">
                  <h4 className="font-black text-[10px] text-slate-500 uppercase tracking-widest block font-mono">Krav och Kompetensmatchning</h4>
                  {selectedJob.skillsDemanded && selectedJob.skillsDemanded.length > 0 ? (
                    <div className="grid grid-cols-1 gap-2">
                      {selectedJob.skillsDemanded.map((skill, idx) => {
                        const userHasIt = profile.skills.some(us => us.toLowerCase().replace(/\s+/g, '') === skill.toLowerCase().replace(/\s+/g, ''));
                        return (
                          <motion.div 
                            key={idx} 
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.04 }}
                            className="flex items-center gap-3 bg-[#FFF4C2]/5 p-3 rounded-xl border border-amber-950/5 shadow-[0_2px_8px_-2px_rgba(28,25,23,0.03)] text-[11px] font-mono cursor-default"
                          >
                            <span className={`h-5 w-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold shadow-xs ${
                              userHasIt ? 'bg-emerald-50 text-emerald-800 border border-emerald-250/50' : 'bg-rose-50 text-rose-800 border border-rose-250/50'
                            }`}>
                              {userHasIt ? "✓" : "✗"}
                            </span>
                            <span className={userHasIt ? "text-slate-850 font-bold" : "text-slate-550"}>
                              {skill}
                            </span>
                            <span className="ml-auto text-[8px] font-extrabold uppercase text-slate-400">
                              {userHasIt ? "Klar" : "Analysera"}
                            </span>
                          </motion.div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-slate-500 italic bg-amber-50/20 border border-amber-950/5 p-3 rounded-xl font-sans">Inga formella kompetenser fanns uttryckta i Platsbankens annonsdokument.</p>
                  )}
                </div>

                {/* Info Box */}
                <div className="bg-sky-50/50 border border-sky-100/60 p-4 rounded-xl text-[11px] text-slate-700 font-mono space-y-1.5 leading-relaxed">
                  <div className="font-bold text-accent-blue flex items-center gap-1.5 uppercase text-[10.5px]">
                    <Info className="h-4 w-4 shrink-0" />
                    Marknadsanalys: Sverige
                  </div>
                  <p>
                    Lönekalkyler och arbetsmatchning baseras på SCB-yrkesstatistik. Tjänstevillkor och anställningsskydd i Sverige regleras fackligt via <strong>Kollektivavtal</strong>.
                  </p>
                </div>

              </div>

              {/* Fixed bottom interactive actions footer */}
              <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-150 p-4 flex gap-3 z-10 pb-6 md:pb-4">
                {(() => {
                  const isJobPostSaved = savedJobPosts.some(p => p.id === selectedJob.id);
                  return (
                    <button
                      type="button"
                      onClick={() => {
                        if (!currentUser) {
                          setAuthModalJob(selectedJob);
                          return;
                        }
                        if (isJobPostSaved) {
                          setSavedJobPosts(prev => prev.filter(p => p.id !== selectedJob.id));
                        } else {
                          setSavedJobPosts(prev => [...prev, selectedJob]);
                        }
                      }}
                      className={`flex-1 py-3 bg-white text-slate-705 border border-slate-200 rounded-xl text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95`}
                    >
                      {isJobPostSaved ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-650" />
                          <span>Sparad ✓</span>
                        </>
                      ) : (
                        <>
                          <Plus className="h-3.5 w-3.5 text-slate-500" />
                          <span>Spara jobb</span>
                        </>
                      )}
                    </button>
                  );
                })()}

                <a 
                  href={selectedJob.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  referrerPolicy="no-referrer"
                  className="flex-1 py-3 bg-slate-900 hover:bg-slate-850 text-white rounded-xl text-center text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <span>Ansök nu</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AUTH MODAL FOR SAVING JOBS OR ATTEMPTED USER PATHS */}
      <AnimatePresence>
        {authModalJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md" id="auth-guard-modal">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md"
            >
              <button
                type="button"
                onClick={() => setAuthModalJob(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-full p-1.5 transition-all cursor-pointer z-50 select-none"
                aria-label="Stäng inloggningsruta"
              >
                <X className="h-4 w-4" />
              </button>
              
              <LoginGuard 
                title="Logga in för att spara jobb ⭐️"
                subtitle={`Skapa ett gratis konto för att spara "${authModalJob.title}" hos ${authModalJob.company} samt synka framsteg med din karriärprofil!`}
                onSuccess={() => {
                  setSavedJobPosts(prev => {
                    const isJobPostSaved = prev.some(p => p.id === authModalJob.id);
                    if (!isJobPostSaved) {
                      return [...prev, authModalJob];
                    }
                    return prev;
                  });
                  setAuthModalJob(null);
                }}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
