import React, { useState } from "react";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { auth } from "../firebase";
import { Lock, Mail, Key, Sparkles, CheckCircle2, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface LoginGuardProps {
  title?: string;
  subtitle?: string;
  onSuccess?: () => void;
}

export default function LoginGuard({ 
  title = "Inloggning krävs", 
  subtitle = "Skapa ett kostnadsfritt konto eller logga in för att fortsätta.",
  onSuccess 
}: LoginGuardProps) {
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [showAuthSuccess, setShowAuthSuccess] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setAuthLoading(true);
    setAuthError(null);
    setShowAuthSuccess(null);
    try {
      const provider = new GoogleAuthProvider();
      // Configure prompt to select account to avoid silent failures
      provider.setCustomParameters({ prompt: 'select_account' });
      await signInWithPopup(auth, provider);
      
      setShowAuthSuccess("Inloggningen med Google lyckades! 🚀✨");
      setTimeout(() => {
        setShowAuthSuccess(null);
        if (onSuccess) onSuccess();
      }, 1500);
    } catch (err: any) {
      console.error("Google Auth error:", err);
      let msg = "Det gick inte att logga in med Google.";
      if (err.code === "auth/popup-blocked") {
        msg = "Inloggningsfönstret blockerades av din webbläsare. Vänligen tillåt popup-fönster eller försök med e-post!";
      } else if (err.code === "auth/cancelled-popup-request" || err.code === "auth/popup-closed-by-user") {
        msg = "Inloggningen avbröts. Försök igen.";
      } else if (err.message) {
        msg = err.message;
      }
      setAuthError(msg);
    } finally {
      setAuthLoading(false);
    }
  };

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
        setShowAuthSuccess("Inloggningen lyckades! Kul att se dig igen. ✨");
        setTimeout(() => {
          setShowAuthSuccess(null);
          if (onSuccess) onSuccess();
        }, 1500);
      } else {
        await createUserWithEmailAndPassword(auth, authEmail.trim(), authPassword);
        setShowAuthSuccess("Konto skapat! Din profil och dina framsteg sparas nu säkert i molnet. 🌲");
        setTimeout(() => {
          setShowAuthSuccess(null);
          if (onSuccess) onSuccess();
        }, 2000);
      }
      setAuthEmail("");
      setAuthPassword("");
    } catch (err: any) {
      console.error("Auth entry fail:", err);
      let msg = err.message || "Ett fel uppstod.";
      if (err.code === 'auth/wrong-password') msg = "Felaktigt lösenord. Försök igen.";
      if (err.code === 'auth/user-not-found') msg = "Det finns inget konto med denna e-post.";
      if (err.code === 'auth/email-already-in-use') msg = "Denna e-postadress används redan.";
      if (err.code === 'auth/weak-password') msg = "Lösenordet måste vara minst 6 tecken långt.";
      if (err.code === 'auth/invalid-email') msg = "Ogiltig e-postadress.";
      setAuthError(msg);
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98, y: -15 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-full max-w-md mx-auto my-8 bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-xl space-y-6"
      id="login-guard-card"
    >
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 mb-2">
          {authMode === 'login' ? <Lock className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
        </div>
        <h2 className="text-lg font-extrabold text-slate-800 tracking-tight leading-snug">{title}</h2>
        <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">{subtitle}</p>
      </div>

      <div className="flex bg-slate-50 border border-slate-150 p-1 rounded-xl">
        <button
          type="button"
          onClick={() => {
            setAuthMode("login");
            setAuthError(null);
          }}
          className={`flex-1 py-2 text-[11px] font-black uppercase text-center rounded-lg cursor-pointer transition-all ${
            authMode === 'login' ? 'bg-white text-slate-800 shadow-xs border border-slate-100' : 'text-slate-450 hover:text-slate-700'
          }`}
        >
          Logga in
        </button>
        <button
          type="button"
          onClick={() => {
            setAuthMode("register");
            setAuthError(null);
          }}
          className={`flex-1 py-2 text-[11px] font-black uppercase text-center rounded-lg cursor-pointer transition-all ${
            authMode === 'register' ? 'bg-white text-slate-800 shadow-xs border border-slate-100' : 'text-slate-450 hover:text-slate-700'
          }`}
        >
          Skapa konto
        </button>
      </div>

      <form onSubmit={handleAuthAction} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">E-postadress</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Mail className="h-4 w-4" />
            </span>
            <input
              type="email"
              required
              value={authEmail}
              onChange={(e) => setAuthEmail(e.target.value)}
              placeholder="namn@domän.se"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 font-sans shadow-inner transition-all"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">Lösenord</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Key className="h-4 w-4" />
            </span>
            <input
              type="password"
              required
              value={authPassword}
              onChange={(e) => setAuthPassword(e.target.value)}
              placeholder="Minst 6 tecken"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 font-sans shadow-inner transition-all"
            />
          </div>
        </div>

        <AnimatePresence>
          {authError && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-3 bg-rose-50 border border-rose-150 rounded-xl text-rose-700 text-[10.5px] flex gap-2 items-start font-medium leading-relaxed"
            >
              <ShieldAlert className="h-4 w-4 shrink-0 text-rose-500 mt-0.5" />
              <span>{authError}</span>
            </motion.div>
          )}

          {showAuthSuccess && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-3 bg-emerald-50 border border-emerald-150 rounded-xl text-emerald-800 text-[10.5px] flex gap-2 items-start font-medium leading-relaxed"
            >
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500 mt-0.5" />
              <span>{showAuthSuccess}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="submit"
          disabled={authLoading}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-bold uppercase tracking-wider rounded-xl text-[10.5px] cursor-pointer transition duration-150 active:scale-98 shadow-md shadow-indigo-600/10 flex items-center justify-center gap-2 mt-2"
        >
          {authLoading ? (
            <>
              <span className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              <span>Behandlar...</span>
            </>
          ) : (
            <span>{authMode === 'login' ? "Logga in" : "Skapa & Spara"}</span>
          )}
        </button>
      </form>

      <div className="relative flex py-1 items-center" id="auth-divider">
        <div className="flex-grow border-t border-slate-200/60"></div>
        <span className="flex-shrink mx-4 text-[10px] text-slate-400 font-extrabold uppercase tracking-wider select-none">Eller</span>
        <div className="flex-grow border-t border-slate-200/60"></div>
      </div>

      <button
        type="button"
        disabled={authLoading}
        onClick={handleGoogleSignIn}
        className="w-full py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold tracking-normal rounded-xl text-xs cursor-pointer transition duration-150 active:scale-98 shadow-xs flex items-center justify-center gap-2 select-none"
        id="google-signin-btn"
      >
        <span className="font-extrabold select-none tracking-tight mr-1">
          <span className="text-blue-500">G</span>
          <span className="text-rose-500">o</span>
          <span className="text-yellow-500">o</span>
          <span className="text-blue-500">g</span>
          <span className="text-green-500">l</span>
          <span className="text-rose-500">e</span>
        </span>
        <span>Logga in med Google</span>
      </button>

      <div className="border-t border-slate-100 pt-4 text-center">
        <p className="text-[10px] text-slate-400 font-mono tracking-tight">
          Svensk Karriär-AI • Öppet via BankID-liknande lösenordsbaserat ID
        </p>
      </div>
    </motion.div>
  );
}
