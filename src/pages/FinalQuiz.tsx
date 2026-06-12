import { motion } from 'motion/react';
import type { Page } from '../types';
import { useAppContext } from '../contexts/AppProvider';
import { CheckCircle2, Lock, ArrowRight } from 'lucide-react';
import MiniQuiz from '../components/MiniQuiz';

interface FinalQuizProps {
  key?: string | number;
  navigate: (page: Page) => void;
}

const FINAL_QUESTIONS = [
  {
    question: "Manakah dari berikut ini yang merupakan Hukum De Morgan?",
    options: [
      "A + A = A",
      "(A + B)' = A' · B'",
      "A · 1 = A",
      "A + A' = 1"
    ],
    answerIndex: 1,
    explanation: "Hukum De Morgan menyatakan bahwa (A + B)' = A' · B' dan (A · B)' = A' + B'."
  },
  {
    question: "Jika sebuah dadu dilempar sekali, berapakah peluang munculnya angka prima (2, 3, 5)?",
    options: [
      "1/6",
      "2/6",
      "3/6 (atau 1/2)",
      "4/6"
    ],
    answerIndex: 2,
    explanation: "Ada 3 angka prima pada dadu (2, 3, 5) dari total 6 sisi. Jadi peluangnya adalah 3/6 atau 1/2."
  },
  {
    question: "Algoritma penelusuran graf mana yang menggunakan struktur data antrean (Queue)?",
    options: [
      "Depth-First Search (DFS)",
      "Breadth-First Search (BFS)",
      "Dijkstra",
      "A* Search"
    ],
    answerIndex: 1,
    explanation: "BFS menelusuri simpul secara terstruktur level-by-level, dan struktur data yang ideal untuk itu adalah Queue (First-In-First-Out)."
  }
];

export default function FinalQuiz({ navigate }: FinalQuizProps) {
  const { progress, markCompleted } = useAppContext();
  const allModulesDone = progress.boolean && progress.probability && progress.graph;

  const handleQuizComplete = () => {
    markCompleted('finalQuiz');
  };

  if (!allModulesDone) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto pt-32 pb-20 px-6 text-center"
      >
        <Lock className="w-20 h-20 text-white/20 mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-4">Kuis Terkunci</h1>
        <p className="text-white/60 mb-8 max-w-lg mx-auto">
          Anda belum menyelesaikan seluruh modul pembelajaran. Silakan pelajari dan selesaikan kuis mini di akhir setiap materi terlebih dahulu.
        </p>
        <div className="glass-panel p-6 rounded-2xl text-left inline-block">
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              {progress.boolean ? <CheckCircle2 className="text-green-400 w-5 h-5 shrink-0" /> : <div className="w-5 h-5 rounded-full border border-white/20 shrink-0"></div>}
              <span>Aljabar Boolean</span>
            </li>
            <li className="flex items-center gap-3">
              {progress.probability ? <CheckCircle2 className="text-green-400 w-5 h-5 shrink-0" /> : <div className="w-5 h-5 rounded-full border border-white/20 shrink-0"></div>}
              <span>Peluang (Probabilitas)</span>
            </li>
            <li className="flex items-center gap-3">
              {progress.graph ? <CheckCircle2 className="text-green-400 w-5 h-5 shrink-0" /> : <div className="w-5 h-5 rounded-full border border-white/20 shrink-0"></div>}
              <span>Teori Graf</span>
            </li>
          </ul>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto pt-28 pb-20 px-6"
    >
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">Kuis Akhir Pembelajaran</h1>
        <p className="text-xl text-white/70">Tunjukkan pemahaman Anda dan dapatkan Sertifikat Kelulusan.</p>
      </div>

      <MiniQuiz 
        title="Evaluasi Komprehensif" 
        questions={FINAL_QUESTIONS}
        onComplete={handleQuizComplete}
      />

      {progress.finalQuiz && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-12 text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Selamat! Anda Lulus Kuis Akhir.</h3>
          <button 
            onClick={() => navigate('nexus')}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-full font-bold shadow-[0_0_20px_rgba(255,95,162,0.4)]"
          >
            Akses Knowledge Nexus
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
