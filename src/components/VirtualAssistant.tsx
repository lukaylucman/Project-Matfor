import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, X, Sparkles } from 'lucide-react';

const TIPS = [
  "Jangan lupa untuk mencoba fitur interaktif pada setiap materi!",
  "Fokuslah pada pemahaman konsep, bukan menghafal rumus.",
  "Kamu bisa mengulangi kuis berkali-kali untuk mengingat materi.",
  "Gunakan progress bar di bagian atas untuk melacak kemajuanmu.",
  "Istirahat sejenak jika matamu mulai lelah menatap layar.",
  "Klik logo website 5 kali untuk menemukan kejutan! Shh..."
];

export default function VirtualAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    // Optionally open automatically once after a few seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const nextTip = () => {
    setTipIndex((prev) => (prev + 1) % TIPS.length);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 glass-panel p-4 rounded-2xl w-64 md:w-72 border border-primary/30 shadow-[0_10px_40px_rgba(106,13,173,0.3)] origin-bottom-right"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                <Sparkles className="w-4 h-4" />
                <span>Asisten Virtual</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white transition">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-white/80 text-sm leading-relaxed mb-3">
              {TIPS[tipIndex]}
            </p>
            <button 
              onClick={nextTip}
              className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition"
            >
              Tip Selanjutnya
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-lg text-white"
      >
        <Bot className="w-7 h-7" />
      </motion.button>
    </div>
  );
}
