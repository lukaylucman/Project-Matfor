import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AmbientBackground from './components/AmbientBackground';
import Home from './pages/Home';
import BooleanLogic from './pages/BooleanLogic';
import Probability from './pages/Probability';
import GraphTheory from './pages/GraphTheory';
import FinalQuiz from './pages/FinalQuiz';
import KnowledgeNexus from './pages/KnowledgeNexus';
import VirtualAssistant from './components/VirtualAssistant';
import AchievementPopup from './components/AchievementPopup';
import type { Page } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [currentPage]);

  // Simulate loading screen with 3 seconds duration
  useEffect(() => {
    let startTime: number;
    let animationFrameId: number;
    const duration = 3000;

    const updateProgress = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(Math.floor((progress / duration) * 100), 100);
      setLoadProgress(percentage);

      if (progress < duration) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        setIsLoading(false);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#6A0DAD]/10 to-[#FF5FA2]/10 mix-blend-overlay"></div>
        
        <div className="text-7xl md:text-8xl font-mono font-bold text-white mb-8 relative z-10">
          {loadProgress}%
        </div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text animate-pulse mb-3 z-10 text-center"
        >
          Matematika Informatika
        </motion.h2>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-white/50 text-sm font-medium tracking-wide z-10 flex items-center gap-2"
        >
          by 
          <a 
            href="https://www.instagram.com/mntariif_/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="lowercase hover:text-primary transition-colors cursor-pointer"
          >
            @mntariif_
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative font-sans text-white">
      <AmbientBackground />
      <Navbar currentPage={currentPage} navigate={setCurrentPage} />
      
      <main className="relative z-10 w-full max-w-screen-2xl mx-auto overflow-hidden min-h-screen flex flex-col justify-between">
        <div className="flex-grow">
          <AnimatePresence mode="wait">
            {currentPage === 'home' && <Home key="home" navigate={setCurrentPage} />}
            {currentPage === 'boolean' && <BooleanLogic key="boolean" />}
            {currentPage === 'probability' && <Probability key="probability" />}
            {currentPage === 'graph' && <GraphTheory key="graph" />}
            {currentPage === 'final-quiz' && <FinalQuiz key="final-quiz" navigate={setCurrentPage} />}
            {currentPage === 'nexus' && <KnowledgeNexus key="nexus" />}
          </AnimatePresence>
        </div>
        
        {currentPage !== 'home' && (
          <div className="flex justify-center pb-12 mt-12">
             <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage('home')}
              className="glass-panel text-white px-8 py-3 rounded-full hover:bg-white/10 transition-colors shadow-xl"
            >
              Kembali ke Beranda
            </motion.button>
          </div>
        )}
        <Footer navigate={setCurrentPage} />
      </main>

      {/* Floating Elements */}
      <VirtualAssistant />
      <AchievementPopup />

      {/* Back to top button */}
      <motion.button
         initial={{ opacity: 0 }}
         whileInView={{ opacity: 1 }}
         viewport={{ margin: "-500px" }}
         onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
         className="fixed bottom-24 right-6 md:bottom-8 md:right-8 w-12 h-12 rounded-full glass-panel flex items-center justify-center z-40 text-white/50 hover:text-white hover:bg-white/10 transition-all border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
      </motion.button>
    </div>
  );
}
