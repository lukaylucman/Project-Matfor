import { motion, AnimatePresence } from 'motion/react';
import { Award, X } from 'lucide-react';
import { useAppContext } from '../contexts/AppProvider';
import { useEffect } from 'react';

export default function AchievementPopup() {
  const { achievementPopup, clearAchievementPopup } = useAppContext();

  useEffect(() => {
    if (achievementPopup) {
      const timer = setTimeout(() => {
        clearAchievementPopup();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [achievementPopup, clearAchievementPopup]);

  return (
    <div className="fixed top-20 right-6 z-50 pointer-events-none">
      <AnimatePresence>
        {achievementPopup && (
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.9 }}
            className="glass-panel p-4 rounded-xl border border-secondary/50 shadow-[0_10px_40px_rgba(255,95,162,0.3)] flex items-center gap-4 pointer-events-auto"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center p-[2px]">
              <div className="w-full h-full bg-dark rounded-full flex items-center justify-center text-secondary">
                <Award className="w-6 h-6" />
              </div>
            </div>
            <div>
              <p className="text-xs text-secondary font-bold uppercase tracking-wider mb-0.5">Achievement Unlocked!</p>
              <p className="font-semibold">{achievementPopup}</p>
            </div>
            <button onClick={clearAchievementPopup} className="ml-2 text-white/50 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
