import { useState } from 'react';
import { motion } from 'motion/react';
import { Dices, BarChart3, RotateCcw } from 'lucide-react';

export default function DiceRoller() {
  const [rolling, setRolling] = useState(false);
  const [dots, setDots] = useState(1);
  const [history, setHistory] = useState<number[]>([]);
  const [allRolls, setAllRolls] = useState<number[]>([]);

  const rollDice = () => {
    if (rolling) return;
    setRolling(true);
    let counter = 0;
    
    // Rapidly change numbers to simulate rolling
    const interval = setInterval(() => {
      setDots(Math.floor(Math.random() * 6) + 1);
      counter++;
      if (counter > 15) {
        clearInterval(interval);
        const finalValue = Math.floor(Math.random() * 6) + 1;
        setDots(finalValue);
        setRolling(false);
        setHistory(prev => [finalValue, ...prev].slice(0, 5)); // Keep last 5
        setAllRolls(prev => [...prev, finalValue]);
      }
    }, 50);
  };

  const resetStats = () => {
    setHistory([]);
    setAllRolls([]);
    setDots(1);
  };

  const getDotsPositions = (val: number) => {
    switch(val) {
      case 1: return ['col-start-2 row-start-2'];
      case 2: return ['col-start-1 row-start-1', 'col-start-3 row-start-3'];
      case 3: return ['col-start-1 row-start-1', 'col-start-2 row-start-2', 'col-start-3 row-start-3'];
      case 4: return ['col-start-1 row-start-1', 'col-start-3 row-start-1', 'col-start-1 row-start-3', 'col-start-3 row-start-3'];
      case 5: return ['col-start-1 row-start-1', 'col-start-3 row-start-1', 'col-start-2 row-start-2', 'col-start-1 row-start-3', 'col-start-3 row-start-3'];
      case 6: return ['col-start-1 row-start-1', 'col-start-3 row-start-1', 'col-start-1 row-start-2', 'col-start-3 row-start-2', 'col-start-1 row-start-3', 'col-start-3 row-start-3'];
      default: return [];
    }
  }

  const isEven = dots % 2 === 0;
  const totalRolls = allRolls.length;
  const evenCount = allRolls.filter(r => r % 2 === 0).length;
  const evenProb = totalRolls > 0 ? (evenCount / totalRolls * 100).toFixed(1) : 0;

  return (
    <div className="glass-panel p-6 rounded-3xl mt-8 flex flex-col md:flex-row gap-8 items-start bg-gradient-to-br from-white/5 to-[#6A0DAD]/10 border-[#6A0DAD]/20">
      <div className="flex-1 space-y-4 w-full">
        <div className="flex items-center gap-2 mb-2">
          <Dices className="text-primary w-6 h-6" />
          <h3 className="text-xl font-bold">Simulasi Peluang Dadu</h3>
        </div>
        <p className="text-white/70 text-sm">Tekan tombol untuk melempar dadu. Mari lihat apakah peluang yang dihitung secara teoretis sesuai dengan percobaan empiris (langsung).</p>
        
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={rollDice}
            disabled={rolling}
            className="flex-1 bg-primary hover:bg-primary/80 text-white font-semibold py-3 px-6 rounded-xl shadow-[0_0_15px_rgba(106,13,173,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {rolling ? 'Mengacak...' : 'Lempar Dadu'}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetStats}
            disabled={totalRolls === 0 || rolling}
            className="p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 disabled:opacity-50 transition-all text-white/70 hover:text-white"
            title="Reset"
          >
            <RotateCcw className="w-6 h-6" />
          </motion.button>
        </div>

        {totalRolls > 0 && (
          <div className="pt-4 border-t border-white/10 mt-4">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="w-4 h-4 text-secondary" />
              <p className="text-sm font-semibold text-white/90">Statistik Empiris (N = {totalRolls})</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-black/30 p-3 rounded-lg border border-white/5">
                <p className="text-xs text-white/50 mb-1">Peluang Genap (Teoretis)</p>
                <p className="text-lg font-mono font-bold text-white">50%</p>
              </div>
              <div className="bg-black/30 p-3 rounded-lg border border-white/5">
                <p className="text-xs text-white/50 mb-1">Peluang Genap (Empiris)</p>
                <p className={`text-lg font-mono font-bold ${Math.abs(Number(evenProb) - 50) < 10 ? 'text-green-400' : 'text-secondary'}`}>
                  {evenProb}%
                </p>
              </div>
            </div>

            <p className="text-xs text-white/50 mb-2">Riwayat Pelemparan (Terbaru):</p>
            <div className="flex gap-2">
              {history.map((h, i) => (
                <div key={i} className="w-8 h-8 rounded bg-black/40 flex items-center justify-center text-sm font-mono opacity-80 border border-white/10">
                  {h}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8 glass-panel rounded-2xl w-full bg-black/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent pointer-events-none"></div>
        
        <div className="w-24 h-24 bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] p-3 grid grid-cols-3 grid-rows-3 gap-1 relative overflow-hidden transform transition-transform">
          {getDotsPositions(dots).map((pos, i) => (
            <div key={i} className={`bg-slate-800 w-4 h-4 rounded-full self-center justify-self-center ${pos} shadow-inner`}></div>
          ))}
        </div>
        
        <div className="mt-8 text-center h-16 flex flex-col justify-center relative z-10 w-full">
          {!rolling && totalRolls > 0 ? (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-black/40 p-3 rounded-xl border border-white/10 mx-auto w-full max-w-[200px]">
              <p className="text-3xl font-bold font-mono text-white tracking-widest">{dots}</p>
              <span className={`text-xs px-2 py-1 flex items-center justify-center mx-auto mt-2 w-max rounded-md ${isEven ? 'bg-secondary/20 text-secondary' : 'bg-primary/20 text-primary'}`}>
                Angka {isEven ? 'Genap' : 'Ganjil'}
              </span>
            </motion.div>
          ) : (
            <p className="text-white/40 font-medium text-sm animate-pulse">{rolling ? 'Melempar...' : 'Menunggu lemparan dadu...'}</p>
          )}
        </div>
      </div>
    </div>
  );
}
