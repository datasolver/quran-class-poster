import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Settings, 
  ExternalLink, 
  RefreshCw, 
  Eye, 
  Check, 
  Sparkles, 
  HelpCircle, 
  Clipboard, 
  Info,
  Calendar,
  Lock
} from 'lucide-react';

interface RegistrationFormProps {
  googleFormUrl: string;
  setGoogleFormUrl: (url: string) => void;
}

export default function RegistrationForm({ googleFormUrl, setGoogleFormUrl }: RegistrationFormProps) {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [tempInput, setTempInput] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(true);

  // Sync tempInput with googleFormUrl on mount
  useEffect(() => {
    setTempInput(googleFormUrl);
  }, [googleFormUrl]);

  // Reset iframe loading state when URL changes
  useEffect(() => {
    setIframeLoading(true);
  }, [googleFormUrl]);

  const handleSaveUrl = (e: React.FormEvent) => {
    e.preventDefault();
    
    let processedUrl = tempInput.trim();
    
    // Auto-extract URL if the user pasted an full iframe embed code
    const srcMatch = processedUrl.match(/src="([^"]+)"/i);
    if (srcMatch && srcMatch[1]) {
      processedUrl = srcMatch[1];
    }

    // Ensure the URL uses HTTPS and seems valid
    if (processedUrl && !processedUrl.startsWith('http://') && !processedUrl.startsWith('https://')) {
      processedUrl = 'https://' + processedUrl;
    }

    setGoogleFormUrl(processedUrl);
    localStorage.setItem('nmawa_google_form_url', processedUrl);
    
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleResetDefault = () => {
    const defaultUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdy4bT9Xl-vH0Zc_L_84nKz80pMv_L1uIqYjQxL1Fk9hK6wXg/viewform?embedded=true';
    setTempInput(defaultUrl);
    setGoogleFormUrl(defaultUrl);
    localStorage.setItem('nmawa_google_form_url', defaultUrl);
    
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleCopyLink = () => {
    const cleanUrl = googleFormUrl.replace('?embedded=true', '').replace('&embedded=true', '');
    navigator.clipboard.writeText(cleanUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <section id="registration-section" className="scroll-mt-12">
      <div className="max-w-4xl mx-auto px-2 sm:px-4 py-8">
        
        {/* Main Card Wrapper */}
        <div className="bg-brand-green-dark border-4 border-brand-gold rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Islamic Background Accents */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-gold via-transparent to-transparent"></div>
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full border border-brand-gold/10 pointer-events-none"></div>
          <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full border border-brand-gold/10 pointer-events-none"></div>

          {/* Header */}
          <div className="text-center relative z-10 max-w-2xl mx-auto mb-8">
            <span className="inline-flex items-center gap-1.5 bg-brand-green/80 text-brand-gold px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-brand-gold/25 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
              Official Registration
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-3 mb-2 tracking-tight">
              Register Your Interest
            </h2>
            <p className="text-brand-gold-light/85 text-xs sm:text-sm font-light leading-relaxed">
              We are collecting official expressions of interest to plan class sizes, schedule optimal times, and coordinate WhatsApp group groups. Please fill out our registration form below.
            </p>
          </div>

          {/* Quick Stats / Action Banner */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-brand-green/50 border border-brand-gold/20 rounded-2xl p-4 sm:p-5 mb-8 relative z-10">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold shrink-0 border border-brand-gold/25 mt-0.5">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">Cohort Enrollment Proposed</h4>
                <p className="text-xs text-brand-gold-light/75 font-light">Your submitted data will directly help organize the first Western Australia sessions.</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              <button
                onClick={handleCopyLink}
                className="flex-1 sm:flex-none bg-brand-green-dark border border-brand-gold/30 hover:bg-brand-green text-brand-gold-light text-xs font-semibold px-4 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer hover:border-brand-gold/65"
                title="Copy standard share link to clipboard"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Clipboard className="w-3.5 h-3.5" />
                    <span>Copy Form Link</span>
                  </>
                )}
              </button>
              
              <a
                href={googleFormUrl.replace('?embedded=true', '').replace('&embedded=true', '')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none bg-brand-gold hover:bg-brand-gold-light text-brand-green-dark text-xs font-bold px-4 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md"
              >
                <span>Full-screen Form</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Active Google Form Embed Frame */}
          <div className="relative z-10 bg-white rounded-2xl overflow-hidden border border-brand-gold/20 shadow-2xl min-h-[500px] flex flex-col">
            
            {/* Embedded Form Status Control Bar */}
            <div className="bg-[#f4f1ea] border-b border-brand-gold/15 px-4 py-3 flex items-center justify-between text-xs font-semibold text-brand-charcoal">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="tracking-wide">Official Google Form (Secured Connection)</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-brand-charcoal/60">
                <Lock className="w-3 h-3 text-emerald-600" />
                <span>SSL Encrypted</span>
              </div>
            </div>

            {/* Iframe Loading Placeholder */}
            {iframeLoading && (
              <div className="absolute inset-0 bg-[#faf9f6] flex flex-col items-center justify-center py-16 px-4 z-10">
                <div className="relative flex items-center justify-center mb-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-green"></div>
                  <span className="absolute text-brand-gold font-arabic text-xs font-bold leading-none animate-pulse">ن</span>
                </div>
                <h4 className="text-sm font-bold text-brand-charcoal">Loading Registration Form...</h4>
                <p className="text-xs text-brand-charcoal/60 mt-1 max-w-xs text-center font-light">Loading secure form directly from Google servers.</p>
              </div>
            )}

            {/* Google Form Iframe Embed */}
            <iframe
              src={googleFormUrl}
              className="w-full flex-grow border-0 min-h-[680px]"
              onLoad={() => setIframeLoading(false)}
              title="NiMAWA Quran Classes Registration Form"
            >
              Loading…
            </iframe>
          </div>

          {/* Admin Customizer Accordion Panel */}
          <div className="mt-8 pt-6 border-t border-brand-gold/15 relative z-10">
            <div className="flex justify-between items-center">
              <div className="text-left">
                <h4 className="text-xs font-bold text-brand-gold uppercase tracking-wider">Administration Tools</h4>
                <p className="text-[10px] text-brand-gold-light/60">Configure your custom Google Form or replace the target sheet easily.</p>
              </div>
              
              <button
                onClick={() => setIsAdminOpen(!isAdminOpen)}
                className="bg-brand-green/45 hover:bg-brand-green border border-brand-gold/30 hover:border-brand-gold text-brand-gold-light text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Settings className={`w-3.5 h-3.5 transition-transform duration-300 ${isAdminOpen ? 'rotate-90' : ''}`} />
                <span>{isAdminOpen ? 'Close Settings' : 'Customize Form Link'}</span>
              </button>
            </div>

            <AnimatePresence>
              {isAdminOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mt-4 bg-brand-green/30 border border-brand-gold/15 rounded-2xl"
                >
                  <div className="p-4 sm:p-6 space-y-4 text-left">
                    <h5 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4 text-brand-gold" />
                      Configure Your Custom Google Form
                    </h5>
                    
                    <p className="text-xs text-brand-gold-light/80 leading-relaxed font-light">
                      Do you have your own custom Google Form ready? Simply copy the <strong>Share Link</strong> or the entire <strong>Iframe Embed HTML Code block</strong> and paste it below. The system will automatically extract and parse the link, and save it across visits.
                    </p>

                    <form onSubmit={handleSaveUrl} className="space-y-3">
                      <div>
                        <label className="block text-[10px] font-bold text-brand-gold uppercase tracking-wider mb-1.5">
                          https://docs.google.com/forms/d/e/1FAIpQLSeCcbSTywq8fDkxNCDBFSpP93djDdeh0In9M9JWsFg077JJbw/viewform?usp=publish-editor
                        </label>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <input
                            type="text"
                            value={tempInput}
                            onChange={(e) => setTempInput(e.target.value)}
                            placeholder="https://docs.google.com/forms/d/.../viewform?embedded=true"
                            className="flex-grow bg-brand-green-dark border border-brand-gold/35 focus:border-brand-gold text-white rounded-xl px-4 py-2.5 text-xs outline-none transition-colors"
                          />
                          <button
                            type="submit"
                            className="bg-brand-gold hover:bg-brand-gold-light text-brand-green-dark font-bold text-xs px-5 py-2.5 rounded-xl cursor-pointer transition-colors flex items-center justify-center gap-1.5"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                            Update Embed URL
                          </button>
                        </div>
                      </div>

                      {isSaved && (
                        <div className="bg-emerald-950/60 border border-emerald-500/30 text-emerald-200 rounded-xl p-3 text-xs leading-relaxed flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span>Google Form successfully configured and saved to browser memory!</span>
                        </div>
                      )}
                    </form>

                    {/* Step-by-Step Tutorial Cards */}
                    <div className="bg-brand-green-dark/40 border border-brand-gold/10 rounded-xl p-4 space-y-3 text-xs">
                      <h6 className="font-bold text-brand-gold flex items-center gap-1">
                        <Info className="w-3.5 h-3.5" />
                        How to get your Google Form link:
                      </h6>
                      <ul className="list-decimal list-inside space-y-2 text-[#f4f1ea]/80 font-light">
                        <li>Open your form inside <strong>Google Forms</strong> (forms.google.com).</li>
                        <li>Click the purple <strong>Send</strong> button in the top-right corner.</li>
                        <li>
                          To get a clean link, select the <strong>Link tab 🔗</strong> and copy the URL.
                        </li>
                        <li>
                          To embed nicely, select the <strong>HTML Embed tab &lt;&gt;</strong>, copy the entire block, and paste it into the field above.
                        </li>
                        <li>Click <strong>Update Embed URL</strong>. Your new custom form is fully live!</li>
                      </ul>
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={handleResetDefault}
                          className="text-brand-gold hover:text-brand-gold-light underline cursor-pointer text-[10px] font-semibold uppercase tracking-wider"
                        >
                          Reset back to default template Form
                        </button>
                      </div>
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
