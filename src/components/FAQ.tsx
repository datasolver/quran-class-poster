import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQItem } from '../types';

export default function FAQ() {
  const faqs: FAQItem[] = [
    {
      id: 'q1',
      question: "Is this class really 100% free?",
      answer: "Yes, completely! There are no hidden fees, registration charges, or exam costs. This program is fully sponsored by the Nigerian Muslims' Association of Western Australia (NiMAWA) as part of our lifelong educational and spiritual development outreach. Donations to help support material delivery are welcome but never mandatory."
    },
    {
      id: 'q2',
      question: "I don't know any Arabic. Is this class really for me?",
      answer: "Absolutely! This class is designed precisely for you. We start from ground zero: learning how to identify, shape, and pronounce each of the 28 Arabic letters in their individual and connected forms. Our pace is slow, encouraging, and tailored for adults starting from scratch."
    },
    {
      id: 'q3',
      question: "How will online classes be delivered?",
      answer: "We will use Zoom or Google Meet or WhatsApp. You will receive a recurring link to join the live virtual classroom. The slides, virtual boards, and spelling sheets are fully screenshared, and you will have ample opportunity to unmute and recite directly to the teacher for correction."
    },
    {
      id: 'q4',
      question: "What if I miss a live session due to work or family?",
      answer: "We understand that adults have busy work and family schedules. All sessions are recorded and made available in an online folder alongside reading materials, so you can catch up on pronunciation and exercises at your own pace."
    },
    {
      id: 'q5',
      question: "Are there separate sessions for brothers and sisters?",
      answer: "No, for now. That will be considered in the future in shaa Allah!."
    },
    // {
    //   id: 'q6',
    //   question: "Who will be teaching the class?",
    //   answer: "Classes are led by certified Quran teachers (Huffadh and Qari) from the WA Muslim community, experienced in teaching non-Arab adults. They focus on friendly, clear instruction, correct Makharij, and supportive student encouragement."
    // }
  ];

  const [openId, setOpenId] = useState<string | null>('q2'); // Open first or second by default

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-16 px-4 max-w-4xl mx-auto" id="faq-section">
      <div className="text-center mb-10">
        <span className="text-[11px] font-bold text-brand-gold tracking-widest uppercase bg-brand-gold/15 px-3.5 py-1.5 rounded-full border border-brand-gold/25">
          Questions & Answers
        </span>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mt-4 tracking-tight">
          Frequently Asked Questions
        </h2>
        <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="space-y-4">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className="bg-brand-green rounded-2xl border border-brand-gold/20 overflow-hidden transition-all duration-200 hover:border-brand-gold/45"
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full text-left p-5 md:p-6 flex justify-between items-center gap-4 cursor-pointer hover:bg-brand-green-dark/30 transition-colors"
                id={`btn-faq-toggle-${faq.id}`}
              >
                <div className="flex gap-3 items-start">
                  <HelpCircle className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                  <span className="font-bold text-white text-sm md:text-base leading-tight">
                    {faq.question}
                  </span>
                </div>
                <div className={`p-1 bg-brand-green-dark border border-brand-gold/20 rounded-lg shrink-0 transition-transform duration-200 ${
                  isOpen ? 'rotate-180 text-brand-gold' : 'text-brand-gold-light/40'
                }`}>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                  >
                    <div className="px-5 md:px-6 pb-6 pt-2 text-xs md:text-sm text-brand-charcoal/85 leading-relaxed font-light border-t border-brand-gold/15">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
