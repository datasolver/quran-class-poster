import { motion } from 'motion/react';
import { BookOpen, Check, Heart, HelpCircle, Users, Video } from 'lucide-react';

export default function Features() {
  const highlights = [
    {
      icon: <Users className="w-6 h-6 text-brand-gold" />,
      title: "Designed Only for Adults",
      description: "We understand that learning Arabic as an adult can feel daunting. There is no judgment here. Our teachers use sympathetic, highly tailored adult learning techniques."
    },
    {
      icon: <Video className="w-6 h-6 text-brand-gold" />,
      title: "100% Online & Flexible",
      description: "Held twice a week online. Since classes are designed for busy working professionals and parents, sessions are recorded so you never fall behind."
    },
    {
      icon: <BookOpen className="w-6 h-6 text-brand-gold" />,
      title: "Qir'at (Correct Recitation)",
      description: "Master the correct articulation points of Arabic letters (Makharij). Read letters, combine words, and master basic Tajweed guidelines step-by-step."
    },
    {
      icon: <Heart className="w-6 h-6 text-brand-gold" />,
      title: "Hifz (Memorisation)",
      description: "Memorise select short Surahs from Juz' Amma, ready for your daily Salat."
    }
  ];

  const valueProps = [
    "No prior knowledge of Arabic letters or Islamic script is required.",
    "Proposed class timing to avoid working hours (evening or weekend sessions).",
    "Completely free of charge — sponsored by NiMAWA and community donors.",
    "Access to simplified visual PDFs and practice materials designed for English speakers."
  ];

  return (
    <section className="py-16 px-4 max-w-6xl mx-auto" id="features-section">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">
          Why Join This Beginners' Program?
        </h2>
        <div className="w-20 h-1 bg-brand-gold mx-auto mt-4 rounded-full"></div>
        <p className="text-brand-gold-light/80 mt-4 max-w-2xl mx-auto text-sm md:text-base font-light italic">
          This proposed initiative by the Nigerian Muslims' Association of Western Australia (NiMAWA) aims to empower our community members to confidently connect with the speech of Allah.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {highlights.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className="bg-brand-green p-6 md:p-8 rounded-2xl border border-brand-gold/20 hover:border-brand-gold/50 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row gap-4 items-start"
          >
            <div className="p-3 bg-brand-green-dark rounded-xl border border-brand-gold/10 shrink-0">
              {item.icon}
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-brand-gold-light tracking-wide">{item.title}</h3>
              <p className="text-brand-charcoal/80 text-sm leading-relaxed font-light">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Trust banner/Quick Check */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-12 bg-brand-green-dark border border-brand-gold/30 p-6 md:p-8 rounded-2xl relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-brand-gold/5 to-transparent pointer-events-none"></div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-4 space-y-2">
            <span className="text-[10px] uppercase font-bold text-brand-gold tracking-widest flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5" /> What to expect
            </span>
            <h3 className="text-xl font-serif font-bold text-white">
              Perfect for absolute starters
            </h3>
            <p className="text-xs text-brand-gold-light/70 font-light">
              We assume zero literacy in Arabic. We guide you from Alif to your first full verse recitation.
            </p>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {valueProps.map((prop, idx) => (
              <div key={idx} className="flex gap-2.5 items-start bg-brand-green/40 p-3 rounded-lg border border-brand-gold/10">
                <div className="bg-brand-gold/20 text-brand-gold rounded-full p-0.5 shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <p className="text-xs text-brand-charcoal leading-normal font-medium">{prop}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
