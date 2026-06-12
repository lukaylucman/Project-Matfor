import { useState } from 'react';
import { motion } from 'motion/react';
import { Zap } from 'lucide-react';

export default function InteractiveTruthTable() {
  const [a, setA] = useState(false);
  const [b, setB] = useState(false);

  const resAnd = a && b;
  const resOr = a || b;
  const resNotA = !a;

  return (
    <div className="glass-panel p-6 rounded-3xl mt-8">
      <div className="flex items-center gap-3 mb-6">
        <Zap className="text-secondary w-5 h-5" />
        <h3 className="text-xl font-semibold">Tabel Kebenaran Interaktif</h3>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <p className="text-sm text-white/60 mb-4">Klik tombol di bawah untuk mengubah nilai input A dan B, lalu amati perubahannya.</p>
          <div className="flex gap-4">
            <button 
              onClick={() => setA(!a)}
              className={`flex-1 py-3 rounded-xl font-mono text-lg font-bold transition-all ${a ? 'bg-primary text-white shadow-[0_0_15px_rgba(106,13,173,0.5)]' : 'glass-panel text-white/50 hover:bg-white/10'}`}
            >
              A = {a ? '1 (TRUE)' : '0 (FALSE)'}
            </button>
            <button 
              onClick={() => setB(!b)}
              className={`flex-1 py-3 rounded-xl font-mono text-lg font-bold transition-all ${b ? 'bg-secondary text-white shadow-[0_0_15px_rgba(255,95,162,0.5)]' : 'glass-panel text-white/50 hover:bg-white/10'}`}
            >
              B = {b ? '1 (TRUE)' : '0 (FALSE)'}
            </button>
          </div>
        </div>

        <div className="glass-panel p-4 rounded-xl overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
          <table className="w-full text-left font-mono text-sm relative z-10">
            <thead>
              <tr className="border-b border-white/10 text-white/50">
                <th className="pb-2">Operasi</th>
                <th className="pb-2">Simbol</th>
                <th className="pb-2">Hasil</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/5">
                <td className="py-3 font-semibold text-primary">AND</td>
                <td className="py-3">A · B</td>
                <td className="py-3">
                  <motion.div 
                    key={String(resAnd)}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`inline-block px-3 py-1 rounded-md ${resAnd ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}
                  >
                    {resAnd ? '1' : '0'}
                  </motion.div>
                </td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-3 font-semibold text-secondary">OR</td>
                <td className="py-3">A + B</td>
                <td className="py-3">
                  <motion.div 
                    key={String(resOr)}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`inline-block px-3 py-1 rounded-md ${resOr ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}
                  >
                    {resOr ? '1' : '0'}
                  </motion.div>
                </td>
              </tr>
              <tr>
                <td className="py-3 font-semibold text-white/80">NOT</td>
                <td className="py-3">A'</td>
                <td className="py-3">
                  <motion.div 
                    key={String(resNotA)}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`inline-block px-3 py-1 rounded-md ${resNotA ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}
                  >
                    {resNotA ? '1' : '0'}
                  </motion.div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
