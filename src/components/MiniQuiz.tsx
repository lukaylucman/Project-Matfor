import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, ChevronRight, Award } from 'lucide-react';
import type { QuizQuestion } from '../types';

interface MiniQuizProps {
  title: string;
  questions: QuizQuestion[];
  onComplete: () => void;
}

export default function MiniQuiz({ title, questions, onComplete }: MiniQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    if (idx === questions[currentIndex].answerIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((c) => c + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      if (score + (selectedOption === questions[currentIndex].answerIndex ? 1 : 0) === questions.length) {
         onComplete();
      } else {
         // Even if they didn't get perfect score, we can mark complete or require perfection.
         // For learning, let's mark complete if they finish it.
         onComplete();
      }
    }
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  const currentQ = questions[currentIndex];
  const isCorrect = selectedOption === currentQ.answerIndex;

  if (isFinished) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="glass-panel p-8 rounded-3xl mt-12 text-center border-t-4 border-t-primary"
      >
        <Award className="w-16 h-16 text-primary mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">Kuis Selesai!</h3>
        <p className="text-white/70 mb-6">Skor Anda: <span className="text-2xl font-bold text-white">{score}</span> / {questions.length}</p>
        <div className="flex justify-center gap-4">
          <button onClick={handleRetry} className="glass-panel px-6 py-2 rounded-full hover:bg-white/10 transition">Ulangi Kuis</button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="glass-panel p-6 md:p-8 rounded-3xl mt-12">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold font-sans">Kuis Interaktif: {title}</h3>
        <span className="text-sm bg-white/10 px-3 py-1 rounded-full font-mono">Soal {currentIndex + 1}/{questions.length}</span>
      </div>

      <div className="mb-8">
        <p className="text-lg font-medium mb-6 leading-relaxed">{currentQ.question}</p>
        <div className="space-y-3">
          {currentQ.options.map((opt, idx) => {
            let btnClass = "w-full text-left p-4 rounded-xl border transition-all ";
            if (!isAnswered) {
              btnClass += "border-white/10 hover:border-white/30 hover:bg-white/5";
            } else {
              if (idx === currentQ.answerIndex) btnClass += "bg-green-500/20 border-green-500 text-green-300";
              else if (idx === selectedOption) btnClass += "bg-red-500/20 border-red-500 text-red-300";
              else btnClass += "border-white/5 opacity-50";
            }

            return (
              <button 
                key={idx} 
                className={btnClass}
                onClick={() => handleSelect(idx)}
                disabled={isAnswered}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {isAnswered && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }} 
            className="overflow-hidden"
          >
            <div className={`p-5 rounded-2xl mb-6 ${isCorrect ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
              <div className="flex items-center gap-2 mb-2 font-bold">
                {isCorrect ? (
                  <><CheckCircle2 className="text-green-400" /> <span className="text-green-400">Tepat Sekali!</span></>
                ) : (
                  <><XCircle className="text-red-400" /> <span className="text-red-400">Kurang Tepat</span></>
                )}
              </div>
              <p className="text-white/80 text-sm leading-relaxed">{currentQ.explanation}</p>
            </div>
            <button 
              onClick={handleNext}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-dark font-bold px-8 py-3 rounded-xl hover:bg-white/90 transition-colors ml-auto"
            >
              {currentIndex < questions.length - 1 ? 'Soal Selanjutnya' : 'Lihat Hasil'}
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
