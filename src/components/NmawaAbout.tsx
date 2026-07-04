import { motion } from 'motion/react';
import { Mail, ShieldCheck, MapPin, Globe, Sparkles, Heart } from 'lucide-react';

export default function NmawaAbout() {
  return (
    <section className="py-16 bg-brand-green text-[#f4f1ea] px-6 rounded-3xl mx-2 md:mx-4 mb-8 border-[6px] sm:border-[10px] border-brand-gold shadow-2xl relative overflow-hidden">
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-gold/20 via-transparent to-transparent"></div>
      
      <div className="max-w-5xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left column: Text */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          <div className="flex flex-col items-center lg:items-start space-y-2">
            <span className="inline-flex items-center gap-1.5 bg-brand-green-dark text-brand-gold px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase border border-brand-gold/30 shadow-inner">
              <ShieldCheck className="w-3.5 h-3.5" /> Organized & Supported By
            </span>
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-white pt-1 tracking-tight leading-tight">
              Nigerian Muslims' Association <br className="hidden sm:inline" />
              of Western Australia (NiMAWA)
            </h3>
          </div>

          <p className="text-brand-charcoal/85 text-xs md:text-sm font-light leading-relaxed max-w-xl italic">
            NiMAWA is a registered community organization dedicated to supporting Nigerian Muslims living in Western Australia. We foster a strong Islamic identity, provide support networks, and host regular social and educational activities. Our goals are to promote religious instruction, support families, and build a cohesive, active community based on the teachings of the Quran and Sunnah.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left pt-2">
            <div className="flex gap-3 items-start bg-brand-green-dark/60 p-4 rounded-xl border border-brand-gold/20">
              <MapPin className="w-5 h-5 text-brand-gold shrink-0" />
              <div>
                <p className="text-xs font-bold text-white uppercase tracking-wider">Location</p>
                <p className="text-[11px] text-brand-gold-light/80 font-light">Perth, Western Australia (WA)</p>
              </div>
            </div>

            <div className="flex gap-3 items-start bg-brand-green-dark/60 p-4 rounded-xl border border-brand-gold/20">
              <Mail className="w-5 h-5 text-brand-gold shrink-0" />
              <div>
                <p className="text-xs font-bold text-white uppercase tracking-wider">Enquiries</p>
                <a href="mailto:jamiuekundayo@gmail.com" className="text-[11px] text-brand-gold-light hover:underline font-mono">
                  jamiuekundayo@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Info list / decorative badge */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="bg-brand-green-dark/40 border border-brand-gold/25 p-6 rounded-2xl w-full max-w-sm space-y-5 relative">
            <div className="absolute top-2 right-2 text-brand-gold opacity-10">
              <Sparkles className="w-16 h-16" />
            </div>

            <h4 className="text-xs font-serif font-bold text-brand-gold border-b border-brand-gold/15 pb-2.5 uppercase tracking-wider flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-brand-gold" /> Our Community Commitments
            </h4>

            <ul className="space-y-4 text-xs font-light text-brand-gold-light/90">
              <li className="flex gap-3 items-start">
                <span className="text-brand-gold text-lg leading-none font-bold select-none">•</span>
                <p><strong className="font-bold text-white uppercase tracking-wider text-[10px] block mb-0.5">Welcoming Atmosphere</strong> A safe, supportive network of fellow Western Australia Muslim adults.</p>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-brand-gold text-lg leading-none font-bold select-none">•</span>
                <p><strong className="font-bold text-white uppercase tracking-wider text-[10px] block mb-0.5">Interactive Focus</strong> Practical learning where everyone gets customized teacher reviews.</p>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-brand-gold text-lg leading-none font-bold select-none">•</span>
                <p><strong className="font-bold text-white uppercase tracking-wider text-[10px] block mb-0.5">Spiritual Growth</strong> Empowering you to recite and connect with the words of Allah.</p>
              </li>
            </ul>

            <div className="bg-brand-gold/10 border border-brand-gold/25 rounded-xl p-3 text-center text-[10px] tracking-[0.15em] text-brand-gold-light uppercase font-semibold">
              Together on the Straight Path
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
