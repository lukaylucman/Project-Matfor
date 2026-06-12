// src/components/Navbar.tsx
import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence, useMotionValueEvent } from 'motion/react';
import { ArrowLeft, BookOpen, Music, Music2, Quote, Menu, X } from 'lucide-react';
import type { Page } from '../types';
import { useAppContext } from '../contexts/AppProvider';

interface NavbarProps {
  currentPage: Page;
  navigate: (page: Page) => void;
}

const QUOTES = [
  "\"Matematika bukan tentang menghafal rumus, tetapi memahami pola.\"",
  "\"Kesalahan adalah bagian dari proses belajar.\"",
  "\"Setiap algoritma besar dimulai dari logika sederhana.\"",
  "\"Teknologi adalah kanvas kita, matematika adalah kuasnya.\"",
  "\"Tidak ada jalan pintas untuk pemahaman yang mendalam.\""
];

export default function Navbar({ currentPage, navigate }: NavbarProps) {
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100, damping: 30, restDelta: 0.001
  });
  const { progress, isMusicPlaying, toggleMusic } = useAppContext();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [quote, setQuote] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  useEffect(() => {
    if (!audioRef.current) {
      // Using a generic free-use lofi placeholder link. 
      // It might fail if blocked, but code handles it gracefully.
      audioRef.current = new Audio('/akutenang.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }
    
    if (isMusicPlaying) {
      audioRef.current.play().catch(e => {
        console.log('Audio play protected by browser, waiting for interaction:', e);
        // If autoplay is blocked, wait for user interaction to resume
        const playOnInteract = () => {
          if (isMusicPlaying && audioRef.current) {
             audioRef.current.play().catch(() => {});
          }
          document.removeEventListener('click', playOnInteract);
          document.removeEventListener('keydown', playOnInteract);
          document.removeEventListener('touchstart', playOnInteract);
        };
        document.addEventListener('click', playOnInteract);
        document.addEventListener('keydown', playOnInteract);
        document.addEventListener('touchstart', playOnInteract);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isMusicPlaying]);

  const handleLogoClick = () => {
    if (currentPage !== 'home') {
      navigate('home');
      return;
    }
    
    const newClicks = logoClicks + 1;
    setLogoClicks(newClicks);
    if (newClicks >= 5) {
      setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
      setShowEasterEgg(true);
      setLogoClicks(0); // reset
    }
  };

  // Calculate overall progress
  const totalModules = 4;
  const completedModules = Object.values(progress).filter(Boolean).length;
  const progressPercent = Math.round((completedModules / totalModules) * 100);

  return (
    <>
      <motion.nav 
        className={`fixed z-50 transition-all duration-500 ease-out overflow-hidden ${
          isScrolled 
            ? 'top-4 left-4 right-4 max-w-5xl mx-auto glass-panel border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.5)]' 
            : 'top-0 left-0 right-0 glass-panel border-b border-white/5'
        }`}
        style={{
          borderRadius: isScrolled ? (isMobileMenuOpen ? '28px' : '40px') : '0px',
        }}
        initial={false}
      >
        {/* Overall Module Progress Bar */}
        <div className="w-full h-1 bg-white/5 absolute top-0 left-0">
          <div 
            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={handleLogoClick}
          >
            <BookOpen className="w-6 h-6 text-secondary group-hover:rotate-12 transition-transform" />
            <span className="font-semibold text-lg hover:text-gradient transition-all hidden sm:inline-block">MathFormika.</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Nav Links Desktop */}
            {currentPage === 'home' && (
              <div className="hidden md:flex gap-6 text-sm font-medium text-white/70 mr-4">
                <a href="#latar-belakang" className="hover:text-secondary transition-colors">Latar Belakang</a>
                <a href="#tujuan" className="hover:text-secondary transition-colors">Tujuan</a>
                <a href="#materi" className="hover:text-secondary transition-colors">Materi</a>
              </div>
            )}
            
            <div className="font-mono text-xs text-white/50 hidden sm:block">
              Progress: <span className="text-white font-bold">{progressPercent}%</span>
            </div>

            <button 
              onClick={toggleMusic}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isMusicPlaying ? 'bg-secondary/20 text-secondary' : 'bg-white/5 text-white/50 hover:bg-white/10'}`}
              title="Toggle Music"
            >
              {isMusicPlaying ? <Music className="w-4 h-4 animate-pulse" /> : <Music2 className="w-4 h-4" />}
            </button>

            {currentPage !== 'home' ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('home')}
                className="hidden sm:flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white bg-white/10 px-4 py-2 rounded-full transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Kembali</span>
              </motion.button>
            ) : null}

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden w-10 h-10 flex items-center justify-center text-white/80 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass-panel border-b border-white/5 overflow-hidden"
            >
              <div className="px-6 py-4 flex flex-col gap-4 text-sm font-medium text-white/80">
                {currentPage === 'home' ? (
                  <>
                    <a href="#latar-belakang" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-secondary transition-colors block py-2">Latar Belakang</a>
                    <a href="#tujuan" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-secondary transition-colors block py-2">Tujuan</a>
                    <a href="#materi" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-secondary transition-colors block py-2">Materi</a>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigate('home');
                    }}
                    className="flex items-center gap-2 hover:text-secondary transition-colors py-2 text-left"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Kembali ke Beranda
                  </button>
                )}
                <div className="font-mono text-sm text-white/50 pt-2 border-t border-white/10 sm:hidden">
                  Progress Pembelajaran: <span className="text-white font-bold">{progressPercent}%</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reading Scroll Progress Bar */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary to-secondary origin-left"
          style={{ scaleX }}
        />
      </motion.nav>

      {/* Easter Egg Modal */}
      {showEasterEgg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6 bg-black/60 backdrop-blur-sm" onClick={() => setShowEasterEgg(false)}>
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-panel p-8 rounded-3xl max-w-lg w-full text-center relative border border-secondary/40 shadow-[0_0_50px_rgba(255,95,162,0.2)]"
            onClick={e => e.stopPropagation()}
          >
            <Quote className="w-12 h-12 text-secondary/30 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-6 text-gradient">Easter Egg Found!</h3>
            <p className="text-lg italic font-medium leading-relaxed">
              {quote}
            </p>
            <button 
              onClick={() => setShowEasterEgg(false)}
              className="mt-8 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full transition"
            >
              Tutup
            </button>
          </motion.div>
        </div>
      )}
    </>
  );
}

