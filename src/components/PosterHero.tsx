import { motion } from 'motion/react';
import { BookOpen, Calendar, Globe, Award, Sparkles, ArrowRight } from 'lucide-react';
import quranImage from '../assets/images/quran_kareem_illustration_1783151968852.jpg';

interface PosterHeroProps {
  onRegisterClick: () => void;
  registeredCount: number;
}

export default function PosterHero({ onRegisterClick, registeredCount }: PosterHeroProps) {
  return (
    <section className="relative overflow-hidden bg-brand-green text-[#f4f1ea] px-6 py-16 md:py-24 rounded-3xl shadow-2xl mx-2 md:mx-4 mt-4 border-[8px] sm:border-[16px] border-brand-gold">
      {/* Decorative Islamic Geometric Circles (Background pattern) */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-gold/30 via-transparent to-transparent"></div>
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full border border-brand-gold/15 pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full border border-brand-gold/15 pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Organization Brand */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 bg-brand-green-dark text-brand-gold px-5 py-2 rounded-full text-xs font-semibold tracking-[0.2em] uppercase border border-brand-gold/40 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-brand-gold" />
            Nigerian Muslims' Association of WA
          </span>
          <div className="h-[1px] w-32 bg-brand-gold/50 mt-3 mb-2"></div>
          <p className="text-brand-gold-light/80 text-xs font-medium tracking-widest uppercase">Fostering Faith, Unity & Lifelong Learning in Western Australia</p>
        </motion.div>

        {/* Poster Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="space-y-4 w-full"
            >
              <div className="flex flex-wrap justify-center lg:justify-start gap-2.5">
                <span className="bg-brand-gold text-brand-green-dark text-xs font-bold px-3 py-1.5 rounded uppercase tracking-wider">
                  Absolute Beginners
                </span>
                <span className="bg-brand-green-dark text-brand-gold-light text-xs font-bold px-3 py-1.5 rounded border border-brand-gold/30 uppercase tracking-wider">
                  Adults Only (18+)
                </span>
                <span className="bg-brand-gold-light text-brand-green-dark text-xs font-bold px-3 py-1.5 rounded uppercase tracking-wider">
                  Completely Free
                </span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif italic font-bold tracking-tight text-white leading-[1.05] pt-2 gold-glow">
                Tilawat ul Quran
              </h1>

              <div className="flex items-center justify-center lg:justify-start gap-4 py-1">
                <div className="h-[1px] w-12 bg-brand-gold"></div>
                <h2 className="text-xs sm:text-sm md:text-base uppercase tracking-[0.25em] font-sans font-bold text-brand-gold">
                  Absolute Beginners Course
                </h2>
                <div className="h-[1px] w-12 bg-brand-gold"></div>
              </div>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-[#f4f1ea]/90 text-sm md:text-base max-w-xl leading-relaxed font-light italic"
            >
              A dedicated online program for adults to begin their sacred journey with the Qur'an. Have you always wanted to read and memorize the Holy Quran but felt hesitant because you are starting from scratch? Learn correct recitation (<em className="text-brand-gold font-normal">Qir'at</em>) and memorization (<em className="text-brand-gold font-normal">Hifz</em>) in a supportive, judgment-free virtual environment.
            </motion.p>

            {/* Quick Badges Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full max-w-md pt-2"
            >
              <div className="bg-brand-green-dark/60 border border-brand-gold/20 rounded-xl p-4 flex flex-col items-center lg:items-start">
                <Globe className="w-5 h-5 text-brand-gold mb-1.5" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">100% Online</span>
                <span className="text-[10px] text-brand-gold-light/60">Zoom/Google Meet/WhataApp</span>
              </div>
              <div className="bg-brand-green-dark/60 border border-brand-gold/20 rounded-xl p-4 flex flex-col items-center lg:items-start">
                <Calendar className="w-5 h-5 text-brand-gold mb-1.5" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">Twice Weekly</span>
                <span className="text-[10px] text-brand-gold-light/60">Proposed Schedule</span>
              </div>
              <div className="bg-brand-green-dark/60 border border-brand-gold/20 rounded-xl p-4 flex flex-col items-center lg:items-start col-span-2 sm:col-span-1">
                <Award className="w-5 h-5 text-brand-gold mb-1.5" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">Qir'at & Hifz</span>
                <span className="text-[10px] text-brand-gold-light/60">From absolute zero</span>
              </div>
            </motion.div>

            {/* Button CTA */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center gap-5 w-full pt-4"
            >
              <button 
                onClick={onRegisterClick}
                className="w-full sm:w-auto bg-brand-gold text-brand-green-dark hover:bg-brand-gold-light font-bold px-8 py-4 rounded shadow-lg transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-widest group cursor-pointer border border-brand-gold-light/20"
                id="btn-register-hero"
              >
                Join the Cohort
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <div className="flex flex-col items-center sm:items-start">
                <div className="flex items-center gap-1.5">
                  <span className="flex h-2.5 w-2.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-gold"></span>
                  </span>
                  <span className="text-xs font-bold text-white uppercase tracking-wider"> Registration Form </span>
                </div>
                <span className="text-xs text-[#f4f1ea]/80">
                  <strong className="text-brand-gold-light"> Included Below </strong>.
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Visual Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, rotate: 1 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="relative p-3 bg-brand-green-dark border-4 border-brand-gold rounded-xl shadow-2xl max-w-sm w-full"
            >
              <div className="absolute inset-1 rounded border border-brand-gold/20 pointer-events-none"></div>
              
              {/* Actual Generated Image from the platform */}
              <img 
                src={quranImage} 
                alt="Sacred Quran on a Rehal stand with glowing light"
                className="rounded w-full h-auto object-cover border border-brand-gold/30 shadow-inner"
                referrerPolicy="no-referrer"
                id="hero-quran-image"
              />

              {/* Float badge */}
              <div className="absolute -bottom-4 -left-4 bg-brand-green-dark border border-brand-gold text-brand-gold-light py-2.5 px-4 rounded shadow-lg flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-brand-gold" />
                <div className="text-left">
                  <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest leading-none">Starting Level</p>
                  <p className="text-xs font-bold text-white">Absolute Beginners</p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
