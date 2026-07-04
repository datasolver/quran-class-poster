/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Sparkles, Heart, ArrowUp, Calendar, MapPin, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import PosterHero from './components/PosterHero';
import Features from './components/Features';
// import InteractiveAlphabet from './components/InteractiveAlphabet';
import RegistrationForm from './components/RegistrationForm';
import FAQ from './components/FAQ';
import NmawaAbout from './components/NmawaAbout';

export default function App() {
  const BASE_SIMULATED_COUNT = 34;
  const [registeredCount, setRegisteredCount] = useState(BASE_SIMULATED_COUNT);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Scroll event to show/hide the back-to-top button
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Compute total registrations (simulated count + local storage count)
    const saved = localStorage.getItem('nmawa_quran_registrations');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setRegisteredCount(BASE_SIMULATED_COUNT + parsed.length);
        }
      } catch (e) {
        console.error('Error parsing registrations count', e);
      }
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleRegisterSuccess = (updatedCount: number) => {
    setRegisteredCount(updatedCount);
  };

  const scrollToRegistration = () => {
    const element = document.getElementById('registration-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-brand-ivory text-brand-charcoal selection:bg-brand-gold/30 selection:text-brand-green-dark relative islamic-pattern-bg">
      {/* Upper Subtle Announcement Ribbon */}
      <div className="bg-brand-green-dark text-brand-sand py-2 px-4 border-b border-brand-gold/20 text-center text-[11px] font-semibold tracking-wider uppercase flex items-center justify-center gap-2">
        <span className="flex h-1.5 w-1.5 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-gold"></span>
        </span>
        Proposed Online Course for NiMAWA members • Free Trial & Materials Included
      </div>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-2 sm:px-4 py-6 space-y-6">
        
        {/* Simple Brand Header - Strictly informative, non-navigational */}
        <header className="px-4 py-4 flex items-center justify-between border-b border-brand-gold/15">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-green-dark flex items-center justify-center text-brand-gold border-2 border-brand-gold/30 shadow-md">
              <span className="font-arabic text-xl font-bold leading-none pt-0.5 animate-pulse">ن</span>
            </div>
            <div>
              <h2 className="text-sm font-bold text-brand-gold tracking-[0.15em] leading-none">NiMAWA</h2>
              <p className="text-[10px] text-brand-gold-light/65 font-medium mt-1">Nigerian Muslims' Association of Western Australia</p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-xs font-semibold text-brand-gold-light/75">
            <div className="flex items-center gap-1.5 bg-brand-green-dark border border-brand-gold/15 px-3 py-1.5 rounded-lg">
              <MapPin className="w-3.5 h-3.5 text-brand-gold" />
              <span>WA, Australia</span>
            </div>
            <div className="flex items-center gap-1.5 bg-brand-green-dark border border-brand-gold/15 px-3 py-1.5 rounded-lg">
              <Globe className="w-3.5 h-3.5 text-brand-gold" />
              <span>Online</span>
            </div>
          </div>
        </header>

        {/* Hero Poster Frame */}
        <PosterHero 
          onRegisterClick={scrollToRegistration} 
          registeredCount={registeredCount} 
        />

        {/* Core Value/Offer Highlights */}
        <Features />

        {/* Interactive Classroom Sandbox
        <InteractiveAlphabet /> */}

        {/* Interactive RSVP Form */}
        <RegistrationForm 
          onSuccess={handleRegisterSuccess} 
          currentCount={registeredCount} 
        />

        {/* FAQs */}
        <FAQ />

        {/* Association About Box */}
        <NmawaAbout />

      </main>

      {/* Modern, Simple Footer */}
      <footer className="bg-brand-charcoal text-brand-sand/60 py-12 px-6 mt-16 border-t border-brand-sand/10 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <p className="text-brand-gold-light font-serif font-semibold text-lg">
            Nigerian Muslims' Association of Western Australia (NiMAWA)
          </p>
          <p className="text-xs max-w-md mx-auto leading-relaxed font-light">
            Together we would learn, grow, and strengthen our connection with the speech of Allah. This class is currently proposed; register your interest to support its deployment.
          </p>
          <div className="w-12 h-0.5 bg-brand-gold/30 mx-auto rounded-full my-4"></div>
          <p className="text-[10px] font-light">
            © {new Date().getFullYear()} NiMAWA. All rights reserved. • Contact: 0420 511 218 
          </p>
        </div>
      </footer>

      {/* Float to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 bg-brand-green hover:bg-brand-green-dark border border-brand-gold text-brand-gold-light p-3 rounded-full shadow-xl transition-colors cursor-pointer z-50"
            aria-label="Scroll to top"
            id="btn-scroll-top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
