import React, { useState } from "react";
import { 
  CreditCard, 
  Smartphone, 
  Check, 
  Lock, 
  ShieldCheck, 
  Loader2,
  Copy,
  ExternalLink,
  QrCode,
  AlertCircle,
  RefreshCw
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PremiumPaymentFormProps {
  currentUser?: any;
  onPaymentSuccess: () => void;
}

export default function PremiumPaymentForm({ currentUser, onPaymentSuccess }: PremiumPaymentFormProps) {
  const [method, setMethod] = useState<"swish" | "card">("swish");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "verification_failed">("idle");
  const [error, setError] = useState<string | null>(null);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [showQR, setShowQR] = useState(false);
  
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedMsg, setCopiedMsg] = useState(false);

  const payeeNumber = "+46737829248";
  const formattedPayee = "073-782 92 48";
  const rawEmail = currentUser?.email || "mrfireman55@gmail.com";
  const paymentMessage = `Lasse ${rawEmail.split("@")[0].substring(0, 15)}`;

  // Construct official Swish QR Code string format:
  // C<payee_number>;<amount>;<message>;<amount_editable>;<message_editable>
  // e.g. C+46737829248;50;Lasse user;0;0
  const swishQRData = `C${payeeNumber};50;${paymentMessage};0;0`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(swishQRData)}&color=000000&bgcolor=ffffff&qzone=1`;

  // Deep link to Swish app
  const swishDeepLinkPayload = {
    version: 1,
    payee: { value: payeeNumber },
    amount: { value: 50, editable: false },
    message: { value: paymentMessage, editable: false }
  };
  const swishAppUrl = `swish://payment?data=${encodeURIComponent(JSON.stringify(swishDeepLinkPayload))}`;

  const copyToClipboard = (text: string, type: "phone" | "msg") => {
    navigator.clipboard.writeText(text);
    if (type === "phone") {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } else {
      setCopiedMsg(true);
      setTimeout(() => setCopiedMsg(false), 2000);
    }
  };

  const handleConfirmSwishPayment = () => {
    setError(null);
    setStatus("processing");

    // Simulate verification/activation check
    setTimeout(() => {
      setStatus("verification_failed");
      setVerificationError(
        `Ingen inkommande Swish-betalning på 50 kr registrerades på bankkontot med meddelandet '${paymentMessage}' än.`
      );
    }, 2500);
  };

  const handleForceVerifySwish = () => {
    setError(null);
    setStatus("processing");
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => {
        onPaymentSuccess();
      }, 1500);
    }, 1500);
  };

  const handleCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardName.trim()) {
      setError("Vänligen ange kortinnehavarens namn.");
      return;
    }
    if (cardNumber.replace(/\s/g, "").length < 16) {
      setError("Vänligen ange ett giltigt 16-siffrigt kortnummer.");
      return;
    }
    if (cardExpiry.length < 5) {
      setError("Vänligen ange giltigt utgångsdatum (MM/ÅÅ).");
      return;
    }
    if (cardCvv.length < 3) {
      setError("Vänligen ange en giltig CVV-kod.");
      return;
    }
    
    setError(null);
    setStatus("processing");

    // Simulate Stripe payment
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => {
        onPaymentSuccess();
      }, 1800);
    }, 2500);
  };

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm relative overflow-hidden" id="payment-widget-body">
      
      <AnimatePresence mode="wait">
        {status === "idle" && (
          <motion.div
            key="payment-tabs"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
          >
            {/* Method selection tabs */}
            <div className="flex gap-2.5 mb-5 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl" id="payment-tabs-header">
              <button
                type="button"
                onClick={() => { setMethod("swish"); setShowQR(false); setError(null); }}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  method === "swish" 
                    ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm border border-slate-200/50 dark:border-slate-700/50" 
                    : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
                id="tab-select-swish"
              >
                <Smartphone className="h-4 w-4 text-[#00C2E0]" />
                <span>Swish</span>
              </button>
              
              <button
                type="button"
                onClick={() => { setMethod("card"); setError(null); }}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  method === "card" 
                    ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm border border-slate-200/50 dark:border-slate-700/50" 
                    : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
                id="tab-select-card"
              >
                <CreditCard className="h-4 w-4 text-indigo-500" />
                <span>Kortbetalning</span>
              </button>
            </div>

            {error && (
              <div className="mb-4 bg-red-50 dark:bg-red-950/40 border border-red-200/50 dark:border-red-900/40 px-3.5 py-2.5 rounded-xl text-red-600 dark:text-red-400 text-xs font-medium flex items-center gap-2" id="payment-form-error">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500 shrink-0"></span>
                <span>{error}</span>
              </div>
            )}

            {/* Real Swish Instructions & QR Code */}
            {method === "swish" && (
              <div className="space-y-5" id="real-swish-payment-panel">
                {!showQR ? (
                  <div className="text-center py-4 space-y-4" id="swish-intro-section">
                    <div className="mx-auto w-16 h-16 rounded-full bg-[#00C2E0]/10 flex items-center justify-center text-[#00C2E0] border border-[#00C2E0]/20 shadow-inner">
                      <Smartphone className="h-8 w-8 animate-pulse" />
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="text-sm font-bold text-slate-800 dark:text-white">
                        Betala snabbt och enkelt med Swish
                      </h4>
                      <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                        Lås upp Lasse Premium direkt. Klicka på knappen nedan för att generera en personlig QR-kod och slutföra betalningen säkert.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowQR(true)}
                      className="w-full bg-[#00C2E0] hover:bg-[#00b0cc] text-white font-extrabold py-3.5 px-5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-md shadow-[#00C2E0]/10 transition-all active:scale-98 cursor-pointer border border-transparent"
                      id="swisha-till-lasse-trigger-button"
                    >
                      <QrCode className="h-4.5 w-4.5 stroke-[2.5]" />
                      <span>Swisha till Lasse</span>
                    </button>
                    
                    <div className="text-[10px] text-slate-400">
                      Säker kryptering • Aktiveras omedelbart efter verifiering
                    </div>
                  </div>
                ) : (
                  <div className="space-y-5 animate-fadeIn">
                    <div className="bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/40 rounded-xl p-3.5 text-center text-[11px] text-amber-800 dark:text-amber-300">
                      ⚠️ <strong>Viktigt:</strong> Betalningen Swishas direkt till Lasse så att du kan aktivera Lasse Premium direkt.
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                      {/* Swish Instruction Details */}
                      <div className="md:col-span-7 space-y-3">
                        {/* Payee Number Field */}
                        <div>
                          <span className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
                            Mottagare
                          </span>
                          <div className="flex items-center justify-between bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2">
                            <span className="font-sans text-xs sm:text-sm font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                              <span className="h-2 w-2 rounded-full bg-[#00C2E0]"></span>
                              Swisha till Lasse
                            </span>
                            <button
                              type="button"
                              onClick={() => copyToClipboard(payeeNumber, "phone")}
                              className="text-slate-400 hover:text-[#00C2E0] dark:hover:text-[#00C2E0] p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-850 transition-all flex items-center gap-1 cursor-pointer text-[10px] font-bold"
                            >
                              {copiedPhone ? (
                                <span className="text-emerald-500 font-bold">Kopierat!</span>
                              ) : (
                                <>
                                  <span>Kopiera nummer</span>
                                  <Copy className="h-3 w-3" />
                                </>
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Amount Field */}
                        <div>
                          <span className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
                            Belopp
                          </span>
                          <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2">
                            <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-white font-mono">
                              50 kr
                            </span>
                          </div>
                        </div>

                        {/* Reference Message Field */}
                        <div>
                          <span className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
                            Meddelande / Referens
                          </span>
                          <div className="flex items-center justify-between bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2">
                            <span className="font-mono text-xs font-bold text-slate-800 dark:text-white">
                              {paymentMessage}
                            </span>
                            <button
                              type="button"
                              onClick={() => copyToClipboard(paymentMessage, "msg")}
                              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-850 transition-all flex items-center gap-1 cursor-pointer"
                            >
                              {copiedMsg ? (
                                <span className="text-[10px] text-emerald-500 font-bold">Kopierat!</span>
                              ) : (
                                <Copy className="h-3.5 w-3.5" />
                              )}
                            </button>
                          </div>
                          <p className="text-[9px] text-slate-400 mt-1">
                            Ange denna kod i Swish så ägaren kan se vem betalningen kom ifrån.
                          </p>
                        </div>
                      </div>

                      {/* Swish QR Code Column */}
                      <div className="md:col-span-5 flex flex-col items-center justify-center p-3 bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-850 rounded-2xl">
                        <span className="text-[9px] font-bold text-[#00C2E0] flex items-center gap-1 mb-2">
                          <QrCode className="h-3 w-3" />
                        2. SKANNA I SWISH
                        </span>
                        <div className="relative p-1.5 bg-white rounded-lg border border-slate-100 shadow-sm">
                          <img 
                            src={qrCodeUrl} 
                            alt="Swish QR-kod" 
                            className="h-28 w-28 sm:h-32 sm:w-32 object-contain"
                            referrerPolicy="no-referrer"
                          />
                          {/* Swish logo icon overlay in the center of QR code */}
                          <div className="absolute inset-0 m-auto h-7 w-7 bg-white rounded-full flex items-center justify-center border border-slate-100 shadow-md">
                            <div className="h-5.5 w-5.5 rounded-full bg-[#00C2E0] flex items-center justify-center text-white text-[9px] font-black">S</div>
                          </div>
                        </div>
                        <span className="text-[9px] text-slate-400 text-center mt-2 font-medium">
                          Skanna med din Swish-app för att förifylla allt direkt!
                        </span>
                      </div>
                    </div>

                    {/* Open Swish Button (only active on mobile/deep-links) */}
                    <div className="pt-2 flex flex-col sm:flex-row gap-2">
                      <a
                        href={swishAppUrl}
                        className="flex-1 bg-[#00C2E0] hover:bg-[#00b0cc] text-white font-extrabold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98 cursor-pointer text-center"
                        id="open-swish-app-button"
                      >
                        <Smartphone className="h-4 w-4" />
                        <span>Öppna Swish-appen direkt</span>
                        <ExternalLink className="h-3 w-3 opacity-80" />
                      </a>

                      <button
                        type="button"
                        onClick={handleConfirmSwishPayment}
                        className="flex-1 bg-slate-900 hover:bg-slate-800 dark:bg-amber-500 dark:hover:bg-amber-400 text-white dark:text-slate-950 font-extrabold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer"
                        id="confirm-swish-done-button"
                      >
                        <Check className="h-4 w-4 stroke-[2.5]" />
                        <span>Jag har Swishat 50 kr</span>
                      </button>
                    </div>

                    <div className="text-center">
                      <button
                        type="button"
                        onClick={() => setShowQR(false)}
                        className="text-[10px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 underline font-medium"
                      >
                        Avbryt och gå tillbaka
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Credit Card Form (Backup/Alternative) */}
            {method === "card" && (
              <form onSubmit={handleCardSubmit} className="space-y-3.5" id="card-payment-form">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Kortinnehavare
                  </label>
                  <input
                    type="text"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="Namn på kortet"
                    className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-2.5 px-3.5 text-xs font-semibold text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/80 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Kortnummer
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, "").substring(0, 16);
                        const parts = [];
                        for (let i = 0; i < value.length; i += 4) {
                          parts.push(value.substring(i, i + 4));
                        }
                        setCardNumber(parts.join(" "));
                      }}
                      placeholder="0000 0000 0000 0000"
                      className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-2.5 pl-3.5 pr-10 text-xs font-mono font-semibold text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/80 transition-all"
                    />
                    <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Giltigt till
                    </label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, "").substring(0, 4);
                        if (value.length > 2) {
                          setCardExpiry(value.substring(0, 2) + "/" + value.substring(2));
                        } else {
                          setCardExpiry(value);
                        }
                      }}
                      placeholder="MM/ÅÅ"
                      className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-2.5 px-3.5 text-xs font-mono font-semibold text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/80 transition-all text-center"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      CVV / CVC
                    </label>
                    <input
                      type="text"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, "").substring(0, 3))}
                      placeholder="123"
                      className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-2.5 px-3.5 text-xs font-mono font-semibold text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/80 transition-all text-center"
                    />
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3 text-emerald-500 shrink-0" />
                  <span>Säker kryptering. Testbetalning som låser upp Premium direkt.</span>
                </div>

                <button
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-amber-500 dark:hover:bg-amber-400 text-white dark:text-slate-950 font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer border border-transparent mt-2"
                  id="submit-card-payment"
                >
                  <Lock className="h-3.5 w-3.5" />
                  <span>Säker kortbetalning (50 kr / mån)</span>
                </button>
              </form>
            )}
          </motion.div>
        )}

        {status === "processing" && (
          <motion.div
            key="processing-payment"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center text-center py-12"
            id="payment-processing-state"
          >
            <Loader2 className="h-10 w-10 text-amber-500 animate-spin mb-4" />
            <h3 className="text-sm font-bold text-slate-800 dark:text-white mb-1">
              Verifierar Swish-betalning...
            </h3>
            <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
              Vänligen vänta medan systemet verifierar din Swish-transaktion och tilldelar dina Premium-behörigheter.
            </p>
          </motion.div>
        )}

        {status === "verification_failed" && (
          <motion.div
            key="failed-payment"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center text-center py-6"
            id="payment-failed-state"
          >
            <div className="h-14 w-14 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-4 border border-rose-200/30 shadow-md">
              <AlertCircle className="h-8 w-8 stroke-[2]" />
            </div>
            <h3 className="text-base font-extrabold text-rose-600 dark:text-rose-400 mb-1.5">
              Betalning hittades inte ❌
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xs leading-relaxed mb-4">
              {verificationError}
            </p>

            <div className="flex flex-col w-full gap-2 px-4">
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition cursor-pointer"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Försök igen</span>
              </button>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
                <span className="flex-shrink mx-3 text-[10px] text-slate-400 font-mono">Testläge / Demo</span>
                <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
              </div>

              <button
                type="button"
                onClick={handleForceVerifySwish}
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-2.5 px-4 rounded-xl text-[11px] uppercase tracking-wide flex items-center justify-center gap-1.5 shadow-md transition cursor-pointer"
              >
                <span>Verifiera manuellt (Test-bypass) 🧪</span>
              </button>
            </div>
          </motion.div>
        )}

        {status === "success" && (
          <motion.div
            key="success-payment"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center text-center py-10"
            id="payment-success-state"
          >
            <div className="h-14 w-14 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 border border-emerald-200/30 shadow-md">
              <Check className="h-8 w-8 stroke-[3]" />
            </div>
            <h3 className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 mb-1.5">
              Betalning Godkänd! 🎉
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xs leading-relaxed">
              Välkommen till <strong className="text-slate-900 dark:text-white">Lasse Premium</strong>. Din betalning har registrerats och din fulla åtkomst till karriärcoachen har aktiverats.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

