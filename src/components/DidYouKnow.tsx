import { Lightbulb } from 'lucide-react';
import { motion } from 'motion/react';

interface DidYouKnowProps {
  text: string;
}

export default function DidYouKnow({ text }: DidYouKnowProps) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="glass-panel p-5 rounded-2xl border-l-4 border-l-secondary bg-gradient-to-r from-secondary/10 to-transparent my-8 flex gap-4 items-start"
    >
      <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary shrink-0">
        <Lightbulb className="w-5 h-5" />
      </div>
      <div>
        <h4 className="font-bold text-secondary mb-1">Tahukah Kamu?</h4>
        <p className="text-white/80 text-sm leading-relaxed">{text}</p>
      </div>
    </motion.div>
  );
}
