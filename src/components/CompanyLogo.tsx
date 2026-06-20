import React, { useState } from "react";
import { motion } from "motion/react";

interface CompanyLogoProps {
  companyName: string;
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

export default function CompanyLogo({ companyName }: CompanyLogoProps) {
  const [hasFailed, setHasFailed] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Derive elegant initial letters
  const initials = companyName
    .replace(/\b(ab|as|ltd|gmbh|inc|group|sverige|sweden|kommun|bolag)\b/gi, '')
    .trim()
    .split(/\s+/)
    .map(word => word[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const finalInitials = initials || companyName.slice(0, 2).toUpperCase();
  const domain = getCompanyDomain(companyName);
  const faviconUrl = `https://www.google.com/s2/favicons?sz=128&domain=${domain}`;

  return (
    <div className="h-12 w-12 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center shrink-0 shadow-xs overflow-hidden relative select-none">
      {!hasFailed ? (
        <motion.img
          key={companyName} // Reset animation & status when company changes
          src={faviconUrl}
          alt={companyName}
          referrerPolicy="no-referrer"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.8 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasFailed(true)}
          className="h-6 w-6 object-contain relative z-10 transition-transform duration-300 hover:scale-110"
        />
      ) : null}

      {/* Elegant fallback gradient matching premium corporate vibes */}
      {(hasFailed || !isLoaded) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-tr from-sky-500 via-indigo-500 to-indigo-600 text-white flex items-center justify-center text-[11px] font-black uppercase tracking-wider"
        >
          {finalInitials}
        </motion.div>
      )}
    </div>
  );
}
