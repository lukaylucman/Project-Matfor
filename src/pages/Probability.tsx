import { motion } from 'motion/react';
import DiceRoller from '../components/DiceRoller';
import DidYouKnow from '../components/DidYouKnow';
import MiniQuiz from '../components/MiniQuiz';
import { useAppContext } from '../contexts/AppProvider';

const QUIZ_QUESTIONS = [
  {
    question: "Kejadian melempar koin merupakan contoh dari peluang...",
    options: ["Peluang Teoretis", "Peluang Empiris", "Peluang Komposit", "Peluang Deterministik"],
    answerIndex: 0,
    explanation: "Jika kita melempar koin dan berasumsi koin itu adil (kemungkinan 50% angka, 50% gambar), itu kita sebut peluang teoretis karena perhitungannya berdasarkan ruang sampel matematikan tanpa melihat hasil pengulangan aktual."
  },
  {
    question: "Jika dalam satu kantong terdapat 2 kelereng merah dan 3 kelereng biru, berapakah peluang terambil kelereng merah?",
    options: ["2/3", "1/2", "2/5", "3/5"],
    answerIndex: 2,
    explanation: "Jumlah kejadian terambil benda merah n(A) adalah 2. Total kejadian dalam sampel n(S) adalah 2 + 3 = 5. Jadi peluangnya 2/5."
  },
  {
    question: "Apa perbedaan peluang empiris dan peluang teoretis?",
    options: [
      "Peluang empiris dari observasi, teoretis dihitung dari ruang sampel",
      "Peluang empiris dihitung dari kalkulus, teoretis dari algoritma",
      "Tidak ada perbedaan",
      "Peluang empiris hanya untuk koin, teoretis untuk dadu"
    ],
    answerIndex: 0,
    explanation: "Peluang empiris didasarkan pada percobaan nyata (frekuensi relatif), sedangkan peluang teoretis dihitung dari rumus berdasarkan kemungkinan yang bisa terjadi."
  }
];

export default function Probability() {
  const { markCompleted } = useAppContext();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto pt-28 pb-20 px-6"
    >
      <div className="mb-12">
        <span className="text-5xl mb-6 block">🎲</span>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">Peluang (Probabilitas)</h1>
        <p className="text-xl text-white/70">Mempelajari konsep probabilitas untuk menentukan kemungkinan terjadinya suatu kejadian.</p>
      </div>

      <section className="space-y-12">
        {/* Pengertian & Rumus */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center text-sm">1</span>
              Pengertian Peluang
            </h2>
            <div className="glass-panel p-6 rounded-2xl text-white/80 leading-relaxed h-full">
              <p>
                Peluang atau probabilitas adalah cara untuk menyatakan besarnya kemungkinan terjadinya suatu peristiwa. Nilai peluang selalu berada di antara batas minimum 0 (kemustahilan) dan batas maksimum 1 (kepastian).
              </p>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-secondary/20 text-secondary flex items-center justify-center text-sm">2</span>
              Rumus Dasar
            </h2>
            <div className="glass-panel p-6 rounded-2xl border border-secondary/20 h-full flex flex-col justify-center relative overflow-hidden text-center">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl"></div>
              
              <p className="text-sm text-white/60 mb-2">Probabilitas suatu kejadian A didefinisikan sebagai:</p>
              <div className="text-4xl font-bold font-mono text-secondary my-4">
                P(A) = <span className="inline-block border-b-2 border-secondary pb-1 mb-1">n(A)</span><br/><span className="inline-block pt-1 text-2xl">n(S)</span>
              </div>
              
              <ul className="text-left text-sm text-white/70 space-y-2 mt-4 inline-block px-4">
                <li><strong className="text-white">P(A)</strong> : Peluang kejadian A</li>
                <li><strong className="text-white">n(A)</strong> : Banyaknya anggota kejadian A</li>
                <li><strong className="text-white">n(S)</strong> : Banyaknya anggota ruang sampel S</li>
              </ul>
            </div>
          </div>
        </div>

        <DidYouKnow text="Konsep peluang sangat esensial dalam Machine Learning dan Kecerdasan Buatan (AI) modern. Model seperti Naive Bayes, Markov Chains, hingga prediksi kata selanjutnya di ChatGPT (LLM) pada dasarnya adalah matematika distribusi probabilitas skala besar!" />

        {/* Jenis Peluang */}
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center text-sm">3</span>
            Jenis Peluang
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="glass-panel p-5 rounded-2xl bg-white/5 border-l-4 border-l-primary">
              <h3 className="font-bold text-lg mb-2 text-primary">Peluang Empiris</h3>
              <p className="text-sm text-white/70">Peluang yang didapatkan berdasarkan hasil eksperimen atau percobaan langsung secara aktual di dunia nyata.</p>
            </div>
            <div className="glass-panel p-5 rounded-2xl bg-white/5 border-l-4 border-l-secondary">
              <h3 className="font-bold text-lg mb-2 text-secondary">Peluang Teoretis</h3>
              <p className="text-sm text-white/70">Peluang yang dihitung dengan asumsi dari ruang sampel secara matematis, tanpa perlu melakukan percobaan langsung.</p>
            </div>
          </div>
        </div>

        {/* Interaktif Dadu */}
        <DiceRoller />

        {/* Contoh Soal */}
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center text-sm">4</span>
            Contoh Soal
          </h2>
          
          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <span className="text-6xl">🎲</span>
              </div>
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                <span className="bg-white/10 px-2 py-1 rounded text-xs">Soal 1</span>
              </h3>
              <p className="text-white/80 mb-6 font-medium text-lg">
                Sebuah dadu dilempar sekali. Tentukan peluang muncul angka genap.
              </p>
              
              <div className="bg-black/30 p-5 rounded-xl border border-white/5 space-y-3 font-mono text-sm shadow-inner">
                <p className="text-white/50 text-xs font-sans uppercase tracking-widest mb-2">Penyelesaian Lengkap</p>
                <div className="flex gap-4">
                  <span className="text-white/50 w-28">Ruang sampel (S):</span>
                  <span className="text-white/90">{`{1, 2, 3, 4, 5, 6}`}  ➔ n(S) = 6</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-white/50 w-28">Kejadian (A):</span>
                  <span className="text-white/90">{`{2, 4, 6}`}  ➔ n(A) = 3</span>
                </div>
                <div className="h-px bg-white/10 my-2"></div>
                <div className="flex gap-4 font-bold items-center mt-2">
                  <span className="text-secondary w-28">P(A) =</span>
                  <span className="text-secondary">3/6 = <span className="text-xl bg-secondary/20 px-2 py-1 rounded ml-1">1/2</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Quiz Component */}
        <MiniQuiz 
          title="Pemahaman Probabilitas" 
          questions={QUIZ_QUESTIONS} 
          onComplete={() => markCompleted('probability')} 
        />

      </section>
    </motion.div>
  );
}
