import { CheckCircle2, Circle } from 'lucide-react';
import { motion } from 'motion/react';
import { useAppContext } from '../contexts/AppProvider';

export default function LearningTimeline() {
  const { progress } = useAppContext();

  const steps = [
    { id: 'boolean', label: 'Aljabar Boolean', done: progress.boolean },
    { id: 'probability', label: 'Peluang', done: progress.probability },
    { id: 'graph', label: 'Teori Graf', done: progress.graph },
    { id: 'finalQuiz', label: 'Kuis Akhir', done: progress.finalQuiz },
    { id: 'nexus', label: 'Knowledge Nexus', done: progress.finalQuiz },
  ];

  return (
    <div className="py-8 w-full max-w-4xl mx-auto">
      <h3 className="text-xl font-bold mb-8 text-center">Alur Pembelajaran Kamu</h3>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative">
        {/* Connecting Line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-white/10 md:hidden z-0"></div>
        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -translate-y-1/2 z-0"></div>

        {steps.map((step, idx) => {
          const isDone = step.done;
          return (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              key={step.id} 
              className="flex md:flex-col items-center gap-4 md:gap-3 relative z-10 w-full md:w-auto py-3 md:py-0"
            >
              {isDone ? (
                <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center shrink-0 border border-green-500/30">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-dark flex items-center justify-center shrink-0 border border-white/20 text-white/30">
                  <Circle className="w-4 h-4" />
                </div>
              )}
              <div className={`font-semibold text-sm ${isDone ? 'text-white' : 'text-white/50'}`}>
                {step.label}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
