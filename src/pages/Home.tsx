import { motion } from 'motion/react';
import { Compass, Sparkles, Target, Zap, BookOpen, GraduationCap } from 'lucide-react';
import type { Page } from '../types';
import LearningTimeline from '../components/LearningTimeline';
import ElectricBorder from '../components/ElectricBorder';
import Shuffle from '../components/Shuffle';

interface HomeProps {
  key?: string | number;
  navigate: (page: Page) => void;
}

export default function Home({ navigate }: HomeProps) {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="min-h-screen pt-24 pb-16 flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex justify-center mb-2"
          >
            <div className="relative inline-block">
              <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-[#6A0DAD] to-[#FF5FA2] blur-xl opacity-80 animate-pulse"></div>
              <img 
                src="/upi.png"
                alt="Logo UPI"
                className="relative w-16 h-16 md:w-20 md:h-20 z-10 object-contain drop-shadow-lg"
                onError={(e) => {
                  e.currentTarget.src = "https://upload.wikimedia.org/wikipedia/commons/4/47/Logo_Universitas_Pendidikan_Indonesia_%28UPI%29.png";
                }}
              />
            </div>
          </motion.div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-secondary/30 text-secondary text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Tugas Akhir Semester 2</span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl leading-tight tracking-wide font-starborn font-normal flex flex-col items-center">
            <span>
              <Shuffle
                text="Website Pembelajaran"
                shuffleDirection="right"
                duration={0.7}
                animationMode="evenodd"
                shuffleTimes={3}
                ease="power3.out"
                stagger={0.03}
                triggerOnce={true}
                triggerOnHover={true}
                tag="span"
              />
            </span>
            <span className="mt-2 md:mt-4 inline-block font-starborn font-normal text-gradient-animated">
              <Shuffle
                text="Matematika Informatika"
                shuffleDirection="right"
                duration={0.7}
                animationMode="evenodd"
                shuffleTimes={4}
                ease="power3.out"
                stagger={0.03}
                threshold={0.1}
                triggerOnce={true}
                triggerOnHover={true}
                respectReducedMotion={true}
                tag="span"
              />
            </span>
          </h1>

          <p className="text-sm text-white/60 max-w-2xl mx-auto leading-relaxed">
            Interactive learning media to help students understand the concepts of Informatics Mathematics more engagingly and easily.
          </p>

          <div className="flex flex-col items-center mt-12 gap-4 md:gap-6">
            <div className="relative group cursor-pointer">
              {/* Animated decorative layer behind the profile picture */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary p-[3px] blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] profile-bg-morph-1"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-secondary to-primary p-[3px] blur-xl opacity-50 group-hover:opacity-90 transition-opacity duration-500 rounded-[50%_50%_30%_70%/50%_50%_70%_50%] profile-bg-morph-2"></div>
              
              <img 
                src="/profile.jpg" 
                alt="Mentari Febriani Saputri" 
                className="relative w-32 h-32 md:w-48 md:h-48 border-4 border-dark/50 shadow-2xl z-10 object-cover rounded-[40%_60%_70%_30%/40%_50%_60%_50%] profile-animate-hover"
                onError={(e) => {
                  e.currentTarget.src = "https://ui-avatars.com/api/?name=Mentari+Febriani+Saputri&background=121212&color=FF5FA2&size=200";
                }}
              />
            </div>
            
            <div className="glass-panel px-6 py-4 md:px-8 md:py-6 rounded-2xl relative z-20">
              <h3 className="font-semibold text-lg md:text-xl text-white">Mentari Febriani Saputri</h3>
              <p className="text-secondary text-sm md:text-base mb-2">NIM: 2507111</p>
              <p className="text-xs md:text-sm text-white/50">Pendidikan Ilmu Komputer<br/>Universitas Pendidikan Indonesia</p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="mt-12 inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-full font-semibold shadow-[0_0_20px_rgba(255,95,162,0.4)] hover:shadow-[0_0_30px_rgba(255,95,162,0.6)] transition-shadow"
          >
            <Compass className="w-5 h-5" />
            Telusuri Pembelajaran
          </motion.button>
        </motion.div>
      </section>

      {/* Timeline */}
      <section id="timeline" className="py-12 px-6 max-w-6xl mx-auto">
        <LearningTimeline />
      </section>

      {/* Latar Belakang & Tujuan */}
      <section id="latar-belakang" className="py-20 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="glass-panel p-8 rounded-3xl"
        >
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6 text-primary">
            <BookOpen className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Latar Belakang</h2>
          <p className="text-white/70 leading-relaxed text-sm">
            Matematika Informatika merupakan mata kuliah penting yang menjadi dasar dalam memahami logika komputasi, pemodelan masalah, dan pengambilan keputusan dalam bidang ilmu komputer. Oleh karena itu, diperlukan media pembelajaran yang interaktif agar mahasiswa lebih mudah memahami materi secara visual dan praktikal.
          </p>
        </motion.div>

        <motion.div 
          id="tujuan"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="glass-panel p-8 rounded-3xl"
        >
          <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center mb-6 text-secondary">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Tujuan Website</h2>
          <ul className="space-y-3 text-white/70 text-sm">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
              <span>Membantu mahasiswa memahami materi Matematika Informatika.</span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
              <span>Menyediakan contoh soal dan pembahasannya.</span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
              <span>Menampilkan pembelajaran yang lebih menarik melalui animasi interaktif.</span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
              <span>Menjadi media belajar mandiri bagi mahasiswa.</span>
            </li>
          </ul>
        </motion.div>
      </section>

      {/* Daftar Materi Slider/Grid */}
      <section id="materi" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Modul Pembelajaran</h2>
          <p className="text-white/60 max-w-2xl mx-auto">Pilih modul pembelajaran interaktif di bawah ini untuk memulai penguasaan Anda di bidang Matematika Informatika.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <CardMateri 
            title="Aljabar Boolean"
            icon="🧠"
            desc="Mempelajari logika biner dan operasi logika yang menjadi dasar dalam perancangan sistem digital."
            color="from-[#FF5FA2] to-[#ff8cbfff]"
            ebColor="#FF5FA2"
            onClick={() => navigate('boolean')}
            delay={0.1}
          />
          <CardMateri 
            title="Peluang"
            icon="🎲"
            desc="Mempelajari konsep probabilitas untuk menentukan kemungkinan terjadinya suatu kejadian."
            color="from-[#6A0DAD] to-[#9d4edd]"
            ebColor="#6A0DAD"
            onClick={() => navigate('probability')}
            delay={0.2}
          />
          <CardMateri 
            title="Graf"
            icon="🕸️"
            desc="Mempelajari representasi hubungan antar objek menggunakan simpul dan sisi dengan visualisasi algoritma."
            color="from-[#FF5FA2] to-[#ff8cbfff]"
            ebColor="#FF5FA2"
            onClick={() => navigate('graph')}
            delay={0.3}
          />
        </div>
      </section>

      {/* Final Quiz entry */}
      <section className="py-12 px-6 max-w-3xl mx-auto text-center">
         <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-10 rounded-[2rem] relative overflow-hidden"
         >
           <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 blur-3xl opacity-30"></div>
           <GraduationCap className="w-16 h-16 text-secondary mx-auto mb-6 relative z-10" />
           <h3 className="text-2xl md:text-3xl font-bold mb-4 relative z-10">Kuis Akhir & Knowledge Nexus</h3>
           <p className="text-white/70 mb-8 max-w-lg mx-auto relative z-10">Selesaikan seluruh modul materi untuk membuka kuis akhir. Uji kemampuanmu dan aktifkan Knowledge Nexus!</p>
           
           <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('final-quiz')}
              className="relative z-10 flex items-center justify-center gap-2 bg-white text-dark w-full sm:w-auto mx-auto px-8 py-4 rounded-full font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all"
           >
              Mulai Kuis Akhir
           </motion.button>
         </motion.div>
      </section>
    </div>
  );
}

function CardMateri({ title, icon, desc, color, ebColor = "#FF5FA2", onClick, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -10 }}
      className="h-full flex cursor-pointer group"
      onClick={onClick}
    >
      <ElectricBorder
        color={ebColor}
        speed={1}
        chaos={0.12}
        borderRadius={32}
        className="flex flex-col h-full relative overflow-hidden transition-all text-white w-full rounded-[2rem] bg-white/5 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.1)] border-0"
      >
        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${color} rounded-bl-full opacity-20 group-hover:opacity-40 transition-opacity blur-2xl z-0`}></div>
        
        <div className="p-8 flex flex-col h-full flex-grow relative z-10 w-full">
          <div className="text-5xl mb-6">{icon}</div>
          <h3 className="text-2xl font-bold mb-3">{title}</h3>
          <p className="text-white/60 mb-8 flex-grow leading-relaxed">{desc}</p>
          
          <button className="w-full py-4 rounded-xl font-medium text-white transition-all bg-gradient-to-r from-primary/10 to-secondary/10 border border-white/5 group-hover:border-secondary/50 group-hover:shadow-[0_0_15px_rgba(255,95,162,0.3)]">
            Pelajari Sekarang
          </button>
        </div>
      </ElectricBorder>
    </motion.div>
  )
}
