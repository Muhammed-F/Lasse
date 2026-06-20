import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, HelpCircle, Trophy, Volume2 } from "lucide-react";

export type MascotState = "idle" | "thinking" | "speaking" | "success";

interface MascotProps {
  state: MascotState;
  className?: string;
  onClickPhrase?: (phrase: string) => void;
  size?: "sm" | "md" | "lg";
}

export default function Mascot({ state, className = "", onClickPhrase, size = "lg" }: MascotProps) {
  const [blink, setBlink] = useState(false);
  const [speechBubble, setSpeechBubble] = useState<string | null>(null);
  const [bubbleTimer, setBubbleTimer] = useState<NodeJS.Timeout | null>(null);

  // Auto blinking interval
  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 150);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Voice/quotes pool for Lasse based on current activity
  const quotesMap = {
    idle: [
      "Hej! Click my antlers to wiggle! Let's explore your Swedish career future.",
      "Vad roligt! Let's check some local municipal taxes (Skatteverket)!",
      "Tip: Having a 'Kollektivavtal' means guaranteed pension and standard pay!",
      "Want to check if public sector developer roles are growing? Go to the Jobs tab!",
      "I love Swedish fika! Kanelbullar and dark roast coffee feed my developer brain. ☕🍰"
    ],
    thinking: [
      "Hmm... querying SCB (Statistiska centralbyrån) databases...",
      "Matching your unique credentials to Platsbanken live indexes...",
      "Analyzing the regional employment indicators...",
      "Bästa! Let me recalculate those Swedish tax brackets..."
    ],
    speaking: [
      "Precis! Here is my analysis for you.",
      "I am formulating the ultimate strategy to bridge your code skills gap!",
      "Let's review the required credentials for software developers in Stockholm.",
      "Let's consult the union-regulated baseline salaries!"
    ],
    success: [
      "Helt otroligt! Recalculation complete!",
      "Jättebra! Your CV profile matches the current market needs beautifully!",
      "Fantastic fit! Let's apply with confidence!",
      "All systems check! You are ready to land that Swedish dream job!"
    ]
  };

  const speakRandomQuote = () => {
    // If mini size, do not trigger floating speech bubbles automatically
    if (size === "sm") return;

    const pool = quotesMap[state];
    const randomIndex = Math.floor(Math.random() * pool.length);
    const phrase = pool[randomIndex];
    
    setSpeechBubble(phrase);
    if (onClickPhrase) {
      onClickPhrase(phrase);
    }

    if (bubbleTimer) clearTimeout(bubbleTimer);
    const timer = setTimeout(() => {
      setSpeechBubble(null);
    }, 5500);
    setBubbleTimer(timer);
  };

  // Speak automatically on state change to draw interest
  useEffect(() => {
    if (size !== "sm") {
      speakRandomQuote();
    }
    return () => {
      if (bubbleTimer) clearTimeout(bubbleTimer);
    };
  }, [state, size]);

  // Antler tilt animation
  const antlerLeftVariants = {
    idle: { rotate: [-2, 2, -2], transition: { repeat: Infinity, duration: 4, ease: "easeInOut" } },
    thinking: { rotate: [-6, 6, -6], transition: { repeat: Infinity, duration: 2, ease: "easeInOut" } },
    speaking: { rotate: [-4, 4, -4], transition: { repeat: Infinity, duration: 2.5, ease: "easeInOut" } },
    success: { rotate: [-15, 15, -15], scale: 1.05, transition: { repeat: 3, duration: 0.6, ease: "easeOut" } }
  };

  const antlerRightVariants = {
    idle: { rotate: [2, -2, 2], transition: { repeat: Infinity, duration: 4, ease: "easeInOut" } },
    thinking: { rotate: [6, -6, 6], transition: { repeat: Infinity, duration: 2, ease: "easeInOut" } },
    speaking: { rotate: [4, -4, 4], transition: { repeat: Infinity, duration: 2.5, ease: "easeInOut" } },
    success: { rotate: [15, -15, 15], scale: 1.05, transition: { repeat: 3, duration: 0.6, ease: "easeOut" } }
  };

  // Ear twitch animation
  const earLeftVariants = {
    idle: { rotate: [0, -5, 0], transition: { repeat: Infinity, duration: 6, repeatDelay: 3 } },
    thinking: { rotate: -10 },
    speaking: { rotate: [0, -8, 0], transition: { repeat: Infinity, duration: 1 } },
    success: { rotate: [0, -15, 0], transition: { repeat: 5, duration: 0.3 } }
  };

  // Snout twitching/speaking mouth
  const mouthVariants = {
    idle: { scaleY: 0.2, transition: { duration: 0.2 } },
    thinking: { scaleY: 0.1, scaleX: 0.8 },
    speaking: { 
      scaleY: [0.2, 0.9, 0.2, 0.7, 0.3, 0.9, 0.2], 
      transition: { repeat: Infinity, duration: 0.8, ease: "easeInOut" } 
    },
    success: { scaleY: 0.8, scaleX: 1.2, transition: { duration: 0.3 } }
  };

  // Head bobbing
  const headVariants = {
    idle: { y: [0, -3, 0], transition: { repeat: Infinity, duration: 4, ease: "easeInOut" } },
    thinking: { y: [0, -1, 2, 0], x: [0, -1, 1, 0], transition: { repeat: Infinity, duration: 3, ease: "linear" } },
    speaking: { y: [0, -5, 2, -2, 0], transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" } },
    success: { y: [0, -20, 0], transition: { repeat: 3, duration: 0.5, ease: "easeInOut" } }
  };

  return (
    <div className={`flex flex-col items-center justify-center select-none relative ${className}`} id="lasse-the-moose-container">
      
      {/* Speech Bubble floating wrapper */}
      <AnimatePresence>
        {speechBubble && size !== "sm" && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.85 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute -top-20 z-30 max-w-[260px] bg-indigo-900 text-white rounded-xl shadow-lg border border-indigo-700 p-3.5 text-xs text-center leading-normal"
            id="mascot-speech-bubble"
          >
            <div className="font-bold flex items-center justify-center gap-1 text-[10px] uppercase text-amber-300 tracking-wider mb-1 font-mono">
              {state === "thinking" && <HelpCircle className="h-3 w-3 animate-spin" />}
              {state === "success" && <Trophy className="h-3 w-3 text-yellow-300 animate-bounce" />}
              {state === "speaking" && <Volume2 className="h-3 w-3 animate-pulse" />}
              Lasse the Career Älg
            </div>
            <span>{speechBubble}</span>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-indigo-900 border-r border-b border-indigo-700 rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main interactive avatar card structure */}
      <motion.div 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={size !== "sm" ? speakRandomQuote : undefined}
        className={`${
          size === "sm" ? "w-11 h-11" : size === "md" ? "w-24 h-24" : "w-40 h-40"
        } relative cursor-pointer bg-slate-50 border border-slate-200 rounded-full flex items-center justify-center shadow-xs overflow-visible bg-gradient-to-b from-white to-slate-100`}
        id="mascot-circle-stage"
      >
        {/* Ambient indicator lights */}
        {size !== "sm" && (
          <div className="absolute top-2 right-2 flex gap-1">
            <span className={`w-2.5 h-2.5 rounded-full border border-white ${
              state === "idle" ? "bg-emerald-500 animate-pulse" :
              state === "thinking" ? "bg-amber-500 animate-pulse" :
              state === "speaking" ? "bg-blue-500 animate-ping" : "bg-purple-500 animate-bounce"
            }`} />
          </div>
        )}

        {/* SPARKLES around head on SUCCESS state */}
        {state === "success" && size !== "sm" && (
          <div className="absolute inset-0 pointer-events-none z-10">
            <Sparkles className="absolute top-2 left-3 h-5 w-5 text-yellow-400 animate-bounce" />
            <Sparkles className="absolute top-4 right-2 h-4 w-4 text-amber-400 animate-ping" />
            <Sparkles className="absolute bottom-6 left-2 h-4 w-4 text-emerald-400 animate-pulse" />
          </div>
        )}

        {/* Lasse Moose SVG graphic illustration */}
        <svg 
          viewBox="0 0 160 160" 
          className={`${
            size === "sm" ? "w-10 h-10" : size === "md" ? "w-20 h-20" : "w-36 h-36"
          } drop-shadow-xs overflow-visible`}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* DEFINES FOR GRADIENTS & PATTERNS */}
          <defs>
            <linearGradient id="mooseFur" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8A5A36" />
              <stop offset="100%" stopColor="#5C3A21" />
            </linearGradient>
            <linearGradient id="snoutGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#D29A74" />
              <stop offset="100%" stopColor="#B07C58" />
            </linearGradient>
            <linearGradient id="antlerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FED766" />
              <stop offset="100%" stopColor="#EE964B" />
            </linearGradient>
            <linearGradient id="sweaterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#005691" />
              <stop offset="100%" stopColor="#002D54" />
            </linearGradient>
          </defs>

          {/* ANTLER LEFT */}
          <motion.g 
            variants={antlerLeftVariants}
            animate={state}
            style={{ transformOrigin: "35px 65px" }}
            className="antler-l"
          >
            {/* Multiple finger-branches for standard beautiful Swedish Elk horns */}
            <path d="M 40 60 C 20 50, 10 35, 12 15 C 13 10, 22 10, 23 18 C 24 30, 32 38, 38 42 C 34 25, 25 15, 29 5 C 32 0, 39 5, 41 15 C 44 26, 46 36, 45 42 C 48 24, 48 10, 54 8 C 59 6, 62 14, 58 26 C 54 36, 50 48, 48 55 Z" fill="url(#antlerGrad)" stroke="#A06020" strokeWidth="1.5" />
          </motion.g>

          {/* ANTLER RIGHT */}
          <motion.g 
            variants={antlerRightVariants}
            animate={state}
            style={{ transformOrigin: "125px 65px" }}
            className="antler-r"
          >
            {/* Symmetrical gorgeous antler finger branch */}
            <path d="M 120 60 C 140 50, 150 35, 148 15 C 147 10, 138 10, 137 18 C 136 30, 128 38, 122 42 C 126 25, 135 15, 131 5 C 128 0, 121 5, 119 15 C 116 26, 114 36, 115 42 C 112 24, 112 10, 106 8 C 101 6, 98 14, 102 26 C 106 36, 110 48, 112 55 Z" fill="url(#antlerGrad)" stroke="#A06020" strokeWidth="1.5" />
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

          {/* THE HEAD AND ARMS (BOBBING WRAPPER) */}
          <motion.g
            variants={state === "speaking" ? undefined : headVariants}
            animate={state === "speaking" ? undefined : state}
            className={`lasse-fluid-state-transition ${
              state === "speaking" ? "lasse-css-speaking-body" : ""
            }`}
            style={{ transformOrigin: "80px 90px" }}
          >
            {/* EAR LEFT */}
            <motion.path 
              variants={earLeftVariants}
              animate={state}
              style={{ transformOrigin: "48px 80px" }}
              d="M 48 80 C 25 78, 20 88, 18 95 C 18 100, 30 100, 42 90 Z" 
              fill="#5C3A21" 
              stroke="#402010" 
              strokeWidth="1.5" 
            />
            {/* Ear left pink inner */}
            <path d="M 42 84 C 28 85, 26 91, 36 90 Z" fill="#E89B9B" />

            {/* EAR RIGHT */}
            <motion.path 
              variants={earLeftVariants}
              animate={state}
              style={{ transformOrigin: "112px 80px" }}
              d="M 112 80 C 135 78, 140 88, 142 95 C 142 100, 130 100, 118 90 Z" 
              fill="#5C3A21" 
              stroke="#402010" 
              strokeWidth="1.5" 
            />
            {/* Ear right pink inner */}
            <path d="M 118 84 C 132 85, 134 91, 124 90 Z" fill="#E89B9B" />

            {/* MAIN ROUNDED HEAD */}
            <rect x="42" y="62" width="76" height="66" rx="32" fill="url(#mooseFur)" stroke="#402010" strokeWidth="2" />

            {/* EYES */}
            {/* Eye Left */}
            <g className="eye-l">
              <ellipse cx="65" cy="85" rx="8" ry="11" fill="#FFFFFF" stroke="#402010" strokeWidth="1.5" />
              {/* Pupil */}
              <motion.circle 
                animate={state === "thinking" ? { y: [0, -2, 2, 0] } : state === "success" ? { scale: 1.2 } : {}}
                transition={{ duration: 1, repeat: state === "thinking" ? Infinity : 0 }}
                cx="65" 
                cy="84" 
                r="4.5" 
                fill="#101827" 
              />
              {/* Eye sparkle */}
              <circle cx="63" cy="81" r="1.5" fill="#FFFFFF" />
              {/* Blink covers */}
              {blink && <rect x="55" y="70" width="20" height="25" fill="url(#mooseFur)" />}
            </g>

            {/* Eye Right */}
            <g className="eye-r">
              <ellipse cx="95" cy="85" rx="8" ry="11" fill="#FFFFFF" stroke="#402010" strokeWidth="1.5" />
              {/* Pupil */}
              <motion.circle 
                animate={state === "thinking" ? { y: [0, -2, 2, 0] } : state === "success" ? { scale: 1.2 } : {}}
                transition={{ duration: 1, repeat: state === "thinking" ? Infinity : 0 }}
                cx="95" 
                cy="84" 
                r="4.5" 
                fill="#101827" 
              />
              {/* Eye sparkle */}
              <circle cx="93" cy="81" r="1.5" fill="#FFFFFF" />
              {/* Blink covers */}
              {blink && <rect x="85" y="70" width="20" height="25" fill="url(#mooseFur)" />}
            </g>

            {/* HIGH END GLASSES (to represent Swedish professional intellect!) */}
            <g className="glasses" stroke="#000000" strokeWidth="2.5" fill="none">
              <rect x="52" y="77" width="23" height="18" rx="6" stroke="#000000" />
              <rect x="85" y="77" width="23" height="18" rx="6" stroke="#000000" />
              <line x1="75" y1="84" x2="85" y2="84" />
              <line x1="42" y1="82" x2="52" y2="82" />
              <line x1="108" y1="82" x2="118" y2="82" />
            </g>

            {/* MOOSE NOSE & SNOUT */}
            <path d="M 50 100 Q 80 82, 110 100 Q 112 118, 80 122 Q 48 118, 50 100 Z" fill="url(#snoutGrad)" stroke="#402010" strokeWidth="1.5" />
            
            {/* Nostrils */}
            <circle cx="71" cy="104" r="2.5" fill="#4A2F1B" />
            <circle cx="89" cy="104" r="2.5" fill="#4A2F1B" />

            {/* INTERACTIVE MOUTH */}
            <motion.g
              variants={state === "speaking" ? undefined : mouthVariants}
              animate={state === "speaking" ? undefined : state}
              className={`mouth lasse-fluid-state-transition ${
                state === "speaking" ? "lasse-css-speaking-mouth" : ""
              }`}
            >
              <path d="M 72 113 Q 80 118, 88 113" fill="none" stroke="#5C1010" strokeWidth="3" strokeLinecap="round" />
            </motion.g>

            {/* Red, warm Swedish blush cheeks */}
            <circle cx="49" cy="98" r="4.5" fill="#FF8A8A" opacity="0.4" />
            <circle cx="111" cy="98" r="4.5" fill="#FF8A8A" opacity="0.4" />
          </motion.g>
        </svg>
      </motion.div>

      {/* Dynamic Status Badging below character component */}
      {size !== "sm" && (
        <span className="text-[11px] font-bold text-center mt-2.5 px-3 py-1 bg-slate-100 border border-slate-200 rounded-full tracking-wide text-indigo-900 shadow-xs flex items-center gap-1.5 font-sans" id="mascot-foot-status">
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              state === "idle" ? "bg-emerald-400" :
              state === "thinking" ? "bg-amber-400" :
              state === "speaking" ? "bg-blue-400" : "bg-purple-400"
            }`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${
              state === "idle" ? "bg-emerald-500" :
              state === "thinking" ? "bg-amber-500" :
              state === "speaking" ? "bg-blue-500" : "bg-purple-500"
            }`}></span>
          </span>
          State: <strong className="uppercase font-mono text-[10px]">{state === "idle" ? "Klar (Idle)" : state === "thinking" ? "Matcher (Thinking)" : state === "speaking" ? "Pratar (Speaking)" : "Succé (Success)"}</strong>
        </span>
      )}
    </div>
  );
}
