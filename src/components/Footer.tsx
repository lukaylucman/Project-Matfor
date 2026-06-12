import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calculator, 
  Mail, 
  MapPin, 
  GraduationCap, 
  Instagram, 
  ChevronRight,
  Quote,
  Heart,
  Sparkles
} from 'lucide-react';
import type { Page } from '../types';

interface FooterProps {
  navigate: (page: Page) => void;
}

const QUOTES = [
  "Belajar bukan tentang menjadi sempurna, tetapi tentang menjadi lebih baik setiap harinya.",
  "Pendidikan adalah senjata paling mematikan di dunia, karena dengan itu Anda dapat mengubah dunia.",
  "Jangan pernah berhenti belajar, karena hidup tak pernah berhenti mengajarkan.",
  "Ilmu komputer bukan tentang komputer, melainkan tentang kehidupan itu sendiri."
];

export default function Footer({ navigate }: FooterProps) {
  // Easter egg
  const [logoClicks, setLogoClicks] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  
  // Quotes
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % QUOTES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleLogoClick = () => {
    setLogoClicks(prev => prev + 1);
    if (logoClicks + 1 === 5) {
      setShowEasterEgg(true);
      setTimeout(() => {
        setShowEasterEgg(false);
        setLogoClicks(0);
      }, 5000);
    }
  };

  const navLinks = [
    { label: 'Beranda', page: 'home' },
    { label: 'Aljabar Boolean', page: 'boolean' },
    { label: 'Peluang', page: 'probability' },
    { label: 'Graf', page: 'graph' },
    { label: 'Kuis Interaktif', page: 'final-quiz' },
    { label: 'Knowledge Nexus', page: 'nexus' },
  ];

  return (
    <footer className="relative mt-20 bg-gradient-to-b from-[#0a0a0a]/80 to-black/90 border-t border-white/5 overflow-hidden">
      {/* Background Particles Soft */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
            className="absolute bg-primary/30 rounded-full blur-[3px]"
            style={{
              width: Math.random() * 8 + 3 + 'px',
              height: Math.random() * 8 + 3 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-16 relative z-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16 relative">
          
          {/* 1. Identitas Website */}
          <div className="space-y-6">
            <motion.div 
              className="inline-flex items-center gap-3 cursor-pointer select-none group"
              onClick={handleLogoClick}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_20px_rgba(106,13,173,0.3)] group-hover:shadow-[0_0_30px_rgba(255,95,162,0.5)] transition-all">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold font-sans tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-colors">
                  MathFormika
                </h2>
              </div>
            </motion.div>
            <p className="text-sm text-white/60 leading-relaxed font-medium">
              Website Pembelajaran Matematika Informatika
            </p>
            <p className="text-sm text-white/50 leading-relaxed">
              Interactive learning media designed to help students understand Informatics Mathematics concepts in a more engaging, accessible, and enjoyable way.
            </p>
          </div>

          {/* 2 & 3. Profil Penyusun & Kontak */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              Profil Penyusun
            </h3>
            <div className="flex items-center gap-4 mb-6 p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 hover:bg-white/10 transition-all group">
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-full blur-md opacity-40 group-hover:opacity-80 transition-opacity"></div>
                <img 
                  src="/profile.jpg" 
                  alt="Mentari Febriani Saputri" 
                  className="relative w-12 h-12 rounded-full border border-white/10 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://ui-avatars.com/api/?name=Mentari+Febriani+Saputri&background=121212&color=FF5FA2&rounded=true";
                  }}
                />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white group-hover:text-primary transition-colors">Mentari Febriani Saputri</h4>
                <p className="text-xs text-secondary font-mono mt-0.5">NIM: 2507111</p>
                <p className="text-[10px] text-white/50 mt-1 uppercase tracking-wider">Pend. Ilmu Komputer</p>
              </div>
            </div>
            
            <ul className="space-y-4">
              <li>
                <a href="mailto:mentarifenrianisaputri15@gmail.com" className="flex items-center gap-3 text-sm text-white/60 hover:text-primary transition-colors group">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary transition-colors shadow-none group-hover:shadow-[0_0_10px_rgba(106,13,173,0.3)]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span>mentarifenrianisaputri15@gmail.com</span>
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60 hover:text-secondary transition-colors group">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-secondary/20 group-hover:text-secondary transition-colors shadow-none group-hover:shadow-[0_0_10px_rgba(255,95,162,0.3)]">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>Bandung, Indonesia</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors group">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/20 group-hover:text-white transition-colors shadow-none group-hover:shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <span>Universitas Pendidikan Indonesia</span>
              </li>
            </ul>
          </div>

          {/* 5. Navigasi Cepat & 4. Social Media */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white mb-4">Navigasi Cepat</h3>
            <ul className="grid grid-cols-2 md:grid-cols-1 gap-2">
              {navLinks.map((link) => (
                <li key={link.page}>
                  <button 
                    onClick={() => {
                      navigate(link.page as Page);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors group py-1"
                  >
                    <ChevronRight className="w-4 h-4 text-primary opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <h3 className="text-sm font-bold text-white mb-3">Terhubung</h3>
              <div className="flex gap-3 justify-center md:justify-start">
                {[
                  { icon: Instagram, label: 'Instagram', action: () => window.location.href = "https://www.instagram.com/mntariif_/" },
                  { icon: Mail, label: 'Gmail', action: () => window.location.href = "mailto:mentarifenrianisaputri15@gmail.com" },
                ].map((social, i) => (
                  <div key={i} className="relative group">
                    <button 
                      onClick={social.action}
                      className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-gradient-to-br hover:from-primary hover:to-secondary hover:border-transparent transition-all shadow-none hover:shadow-[0_0_15px_rgba(255,95,162,0.4)]"
                    >
                      <social.icon className="w-4 h-4" />
                    </button>
                    {/* Tooltip */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/90 text-xs py-1 px-2 rounded font-medium border border-white/10 pointer-events-none whitespace-nowrap z-20">
                      {social.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 6. Motivasi */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white mb-4">Inspirasi Hari Ini</h3>
            <div className="p-6 rounded-2xl glass-panel border border-white/5 relative overflow-hidden group hover:border-primary/20 transition-colors h-[180px] flex flex-col justify-center">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[40px] -mr-16 -mt-16 transition-all group-hover:bg-secondary/20"></div>
              <Quote className="w-8 h-8 text-white/10 mb-2 relative z-10" />
              <div className="relative z-10 w-full">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={quoteIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    className="text-sm font-medium text-white/80 italic leading-relaxed"
                  >
                    "{QUOTES[quoteIndex]}"
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* 7. Copyright & Pemisah */}
        <div className="py-6 border-t border-transparent relative">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-30"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <div>
              <p className="text-xs text-white/50 mb-1">
                &copy; 2026 Website Pembelajaran Matematika Informatika. Seluruh hak cipta dilindungi.
              </p>
              <p className="text-xs text-white/40">
                Disusun oleh <span className="text-white/70 font-medium">Mentari Febriani Saputri (2507111)</span>.
              </p>
            </div>
            
            <div className="flex items-center gap-2 text-xs text-white/50 bg-white/5 px-4 py-2 rounded-full border border-white/5">
              <span>Dibuat dengan dedikasi untuk mendukung pembelajaran</span>
              <Heart className="w-3 h-3 text-secondary animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Easter Egg Notification */}
      <AnimatePresence>
        {showEasterEgg && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 glass-panel border border-secondary/50 p-4 rounded-2xl shadow-[0_0_40px_rgba(255,95,162,0.4)] flex items-center gap-4 max-w-[90vw] w-[420px]"
          >
            <div className="w-12 h-12 rounded-full bg-secondary/20 flex flex-shrink-0 items-center justify-center border border-secondary/30">
              <Sparkles className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <strong className="block text-secondary mb-1 text-sm">Secret Unlocked! ✨</strong>
              <p className="text-xs font-medium text-white/80 leading-relaxed">
                "Terus semangat belajar! Masa depan dibangun dari ilmu yang dipelajari hari ini."
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
