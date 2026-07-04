import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Volume2, Sparkles, BookOpen, MapPin, Smile } from 'lucide-react';
import { ArabicLetter } from '../types';

export default function InteractiveAlphabet() {
  const letters: ArabicLetter[] = [
    {
      id: 'alif',
      letter: 'ا',
      name: 'Alif',
      transliteration: 'Alif',
      pronunciation: 'Ah / Ee / Oo',
      makhraj: 'Produced from the empty space of the mouth and throat (Jawf). It acts as a long vowel support.',
      example: 'As the "a" in "father" or the starter sound "ah".'
    },
    {
      id: 'baa',
      letter: 'ب',
      name: 'Bā’',
      transliteration: 'Baa',
      pronunciation: 'Ba (soft B)',
      makhraj: 'Produced from the wet parts of the upper and lower lips pressing together strongly.',
      example: 'Like the "b" in "baby" but crisp and firm.'
    },
    {
      id: 'taa',
      letter: 'ت',
      name: 'Tā’',
      transliteration: 'Taa',
      pronunciation: 'Ta (soft T)',
      makhraj: 'Produced by tapping the tip of the tongue against the roots of the upper front teeth.',
      example: 'Similar to the English "t" in "tea" but with a lighter, softer touch.'
    },
    {
      id: 'thaa',
      letter: 'ث',
      transliteration: 'Thaa',
      name: 'Thā’',
      pronunciation: 'Tha (as in thin)',
      makhraj: 'Produced by placing the tip of the tongue gently between the edges of the upper and lower front teeth.',
      example: 'Exactly like the "th" sound in "think" or "three".'
    }
  ];

  const [selectedLetter, setSelectedLetter] = useState<ArabicLetter>(letters[0]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [practiceInput, setPracticeInput] = useState('');
  const [practiceFeedback, setPracticeFeedback] = useState<string | null>(null);

  const handleSpeak = (letter: ArabicLetter) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      window.speechSynthesis.cancel();
      
      // Let's speak the Arabic letter first using an Arabic voice, and then say the name in English.
      const arabicUtterance = new SpeechSynthesisUtterance(letter.letter);
      arabicUtterance.lang = 'ar-SA';
      arabicUtterance.rate = 0.85;

      const englishUtterance = new SpeechSynthesisUtterance(`is pronounced ${letter.transliteration}`);
      englishUtterance.lang = 'en-AU';
      englishUtterance.rate = 0.95;

      arabicUtterance.onend = () => {
        window.speechSynthesis.speak(englishUtterance);
      };

      englishUtterance.onend = () => {
        setIsSpeaking(false);
      };

      englishUtterance.onerror = () => {
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(arabicUtterance);
    } else {
      // Fallback
      setIsSpeaking(true);
      setTimeout(() => setIsSpeaking(false), 1200);
    }
  };

  const handleTestPractice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!practiceInput.trim()) return;

    const query = practiceInput.trim().toLowerCase();
    const correctAnswers: Record<string, string[]> = {
      alif: ['alif', 'ah', 'a'],
      baa: ['baa', 'ba', 'b'],
      taa: ['taa', 'ta', 't'],
      thaa: ['thaa', 'tha', 'th']
    };

    const isCorrect = correctAnswers[selectedLetter.id]?.includes(query);

    if (isCorrect) {
      setPracticeFeedback("Masha'Allah! Correct transliteration! You are ready for class.");
    } else {
      setPracticeFeedback(`Keep trying! The transliteration for this letter is "${selectedLetter.transliteration}".`);
    }

    setPracticeInput('');
    setTimeout(() => setPracticeFeedback(null), 4000);
  };

  return (
    <section className="py-16 bg-brand-green-dark border-y border-brand-gold/20 px-4" id="alphabet-sandbox">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-[11px] font-bold text-brand-gold tracking-widest uppercase bg-brand-gold/15 px-3.5 py-1.5 rounded-full border border-brand-gold/25">
            Interactive Classroom Preview
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mt-4 tracking-tight">
            Try Your Very First Lesson Now!
          </h2>
          <p className="text-brand-gold-light/80 mt-3 max-w-2xl mx-auto text-sm font-light">
            Don't know any Arabic? Let's take your very first steps in 15 seconds. Click the letter cards below to learn their names, articulation points (Makharij), and how to pronounce them.
          </p>
        </div>

        {/* Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Letters List Column (Left) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            <p className="text-xs font-semibold text-brand-gold/80 uppercase tracking-wider mb-2">Select a Letter:</p>
            <div className="grid grid-cols-2 gap-4">
              {letters.map((letItem) => {
                const isSelected = selectedLetter.id === letItem.id;
                return (
                  <button
                    key={letItem.id}
                    onClick={() => {
                      setSelectedLetter(letItem);
                      setPracticeFeedback(null);
                    }}
                    className={`p-6 rounded-2xl flex flex-col items-center justify-center border transition-all text-center group relative cursor-pointer ${
                      isSelected
                        ? 'bg-brand-green text-white border-brand-gold shadow-lg shadow-brand-gold/20'
                        : 'bg-brand-green-medium/25 hover:bg-brand-green-medium/50 border-brand-gold/15 text-white/95'
                    }`}
                  >
                    {/* Arabic Character */}
                    <span className={`text-5xl font-arabic leading-none mb-3 font-semibold ${
                      isSelected ? 'text-brand-gold-light' : 'text-brand-gold group-hover:scale-105 transition-transform'
                    }`}>
                      {letItem.letter}
                    </span>
                    <span className="text-xs font-bold tracking-wide">{letItem.name}</span>
                    <span className={`text-[10px] ${isSelected ? 'text-brand-gold-light/70' : 'text-brand-gold-light/40 font-light'}`}>
                      Level Zero
                    </span>

                    {/* Small dot decoration */}
                    {isSelected && (
                      <span className="absolute top-3 right-3 flex h-2 w-2">
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-gold animate-pulse"></span>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="bg-brand-green text-brand-sand/80 p-5 rounded-2xl border border-brand-gold/20 text-xs leading-relaxed space-y-2 mt-4 font-light">
              <span className="inline-block font-semibold text-brand-gold text-xs uppercase tracking-wider">💡 Study Tip</span>
              <p className="text-[#f4f1ea]/90">
                In Quranic reading, letters sound different depending on the vowels (<em className="italic text-brand-gold-light">Harakaat</em>: Fatha, Kasra, Damma) on them. This class starts by teaching the base shapes first, which are easy and enjoyable to learn!
              </p>
            </div>
          </div>

          {/* Letter Details Dashboard (Right) */}
          <div className="lg:col-span-7 bg-brand-green rounded-3xl border border-brand-gold/25 p-6 md:p-8 shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 opacity-5 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-gold via-transparent to-transparent"></div>

            <div className="space-y-6">
              {/* Header inside details */}
              <div className="flex items-center justify-between border-b border-brand-gold/15 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-green-dark flex items-center justify-center text-brand-gold border border-brand-gold/20 shrink-0">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-brand-gold-light/60 uppercase tracking-widest leading-none">Letter Focus</p>
                    <h3 className="text-xl font-serif font-bold text-white">
                      Letter "{selectedLetter.name}"
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => handleSpeak(selectedLetter)}
                  disabled={isSpeaking}
                  className={`px-4 py-2.5 rounded-xl border font-semibold flex items-center gap-2 text-xs uppercase tracking-wider transition-all cursor-pointer ${
                    isSpeaking
                      ? 'bg-brand-gold text-brand-green-dark border-brand-gold'
                      : 'bg-brand-green-dark hover:bg-brand-gold hover:text-brand-green-dark text-brand-gold border-brand-gold/30'
                  }`}
                  id={`btn-pronounce-${selectedLetter.id}`}
                >
                  <Volume2 className="w-4 h-4" />
                  {isSpeaking ? 'Speaking...' : 'Listen Audio'}
                </button>
              </div>

              {/* Character Presentation */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-4 flex flex-col items-center justify-center p-6 bg-brand-green-dark/70 rounded-2xl border border-brand-gold/20">
                  <span className="text-7xl font-arabic text-brand-gold font-bold select-none leading-none">
                    {selectedLetter.letter}
                  </span>
                  <span className="text-xs text-brand-gold-light/50 font-bold mt-2 tracking-widest uppercase">
                    Shape
                  </span>
                </div>

                <div className="md:col-span-8 space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-brand-gold tracking-wider flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-brand-gold" /> Makhraj (Articulation Point)
                    </span>
                    <p className="text-sm text-brand-charcoal/90 leading-relaxed font-light">
                      {selectedLetter.makhraj}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-brand-gold-light/70 tracking-wider flex items-center gap-1">
                      <Smile className="w-3 h-3" /> Pronunciation Tip
                    </span>
                    <p className="text-xs text-brand-gold-light leading-normal font-light italic">
                      {selectedLetter.example}
                    </p>
                  </div>
                </div>
              </div>

              {/* Self Practice Mini Quiz */}
              <div className="bg-brand-green-dark/60 border border-brand-gold/25 rounded-2xl p-5 mt-4 space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-brand-gold" /> Quick Practice Challenge
                </h4>
                <p className="text-xs text-brand-charcoal/80 font-light">
                  Spell/write out the English transliteration for the letter <span className="font-bold text-brand-gold">"{selectedLetter.letter}"</span> to test your memory! (Hint: It starts with "{selectedLetter.transliteration.charAt(0)}")
                </p>

                <form onSubmit={handleTestPractice} className="flex gap-2">
                  <input
                    type="text"
                    value={practiceInput}
                    onChange={(e) => setPracticeInput(e.target.value)}
                    placeholder="e.g. Alif"
                    className="bg-brand-green border border-brand-gold/30 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold text-white shrink grow max-w-xs placeholder-brand-gold-light/30"
                    id="input-alphabet-practice"
                  />
                  <button
                    type="submit"
                    className="bg-brand-gold hover:bg-brand-gold-light text-brand-green-dark text-xs font-semibold px-4 py-2 rounded-xl transition-all cursor-pointer shrink-0 border border-brand-gold-light/10"
                    id="btn-alphabet-practice-submit"
                  >
                    Check Answer
                  </button>
                </form>

                {practiceFeedback && (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-xs font-semibold ${
                      practiceFeedback.includes("Masha'Allah") ? 'text-emerald-400' : 'text-brand-gold'
                    }`}
                  >
                    {practiceFeedback}
                  </motion.p>
                )}
              </div>
            </div>

            <div className="border-t border-brand-gold/15 pt-4 mt-6 text-center lg:text-left">
              <span className="text-[11px] text-brand-gold-light/40 font-light">
                *The physical class will teach letter combinations, vowel signs (Harakaat), and proper breath control rules.
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
