import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { ProgressState } from '../types';
import confetti from 'canvas-confetti';

interface AppContextType {
  progress: ProgressState;
  achievements: string[];
  markCompleted: (module: keyof ProgressState) => void;
  isMusicPlaying: boolean;
  toggleMusic: () => void;
  achievementPopup: string | null;
  clearAchievementPopup: () => void;
}

const defaultProgress: ProgressState = {
  boolean: false,
  probability: false,
  graph: false,
  finalQuiz: false,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

const ACHIEVEMENT_MAP: Record<keyof ProgressState, string> = {
  boolean: '🧠 Boolean Explorer',
  probability: '🎲 Probability Master',
  graph: '🕸️ Graph Navigator',
  finalQuiz: '🏆 Mathematics Informatics Champion',
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<ProgressState>(defaultProgress);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  const [achievementPopup, setAchievementPopup] = useState<string | null>(null);

  useEffect(() => {
    const savedP = localStorage.getItem('mi_progress');
    const savedA = localStorage.getItem('mi_achievements');
    if (savedP) setProgress(JSON.parse(savedP));
    if (savedA) setAchievements(JSON.parse(savedA));
  }, []);

  const saveProgress = (newP: ProgressState, newA: string[]) => {
    localStorage.setItem('mi_progress', JSON.stringify(newP));
    localStorage.setItem('mi_achievements', JSON.stringify(newA));
    setProgress(newP);
    setAchievements(newA);
  };

  const markCompleted = (module: keyof ProgressState) => {
    if (progress[module]) return; // Already completed

    const nextProgress = { ...progress, [module]: true };
    const moduleAchievement = ACHIEVEMENT_MAP[module];
    let nextAchievements = [...achievements];

    if (!nextAchievements.includes(moduleAchievement)) {
      nextAchievements.push(moduleAchievement);
      setAchievementPopup(moduleAchievement);
      
      // Fire confetti!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF5FA2', '#6A0DAD', '#FFFFFF']
      });
    }

    saveProgress(nextProgress, nextAchievements);
  };

  const clearAchievementPopup = () => setAchievementPopup(null);

  const toggleMusic = () => {
    setIsMusicPlaying((prev) => !prev);
  };

  return (
    <AppContext.Provider
      value={{
        progress,
        achievements,
        markCompleted,
        isMusicPlaying,
        toggleMusic,
        achievementPopup,
        clearAchievementPopup,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
}

