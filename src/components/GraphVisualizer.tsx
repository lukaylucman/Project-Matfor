import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play } from 'lucide-react';

type NodeID = 'A' | 'B' | 'C' | 'D';

export default function GraphVisualizer() {
  const [activeNodes, setActiveNodes] = useState<NodeID[]>([]);
  const [running, setRunning] = useState(false);
  const [algorithm, setAlgorithm] = useState<'BFS'|'DFS'|null>(null);

  const nodes: { id: NodeID, x: number, y: number }[] = [
    { id: 'A', x: 50, y: 20 },
    { id: 'B', x: 20, y: 70 },
    { id: 'C', x: 80, y: 70 },
    { id: 'D', x: 50, y: 120 },
  ];

  const edges: { from: NodeID, to: NodeID }[] = [
    { from: 'A', to: 'B' },
    { from: 'A', to: 'C' },
    { from: 'B', to: 'D' },
    { from: 'C', to: 'D' },
  ];

  const runTraversal = async (type: 'BFS' | 'DFS') => {
    if (running) return;
    setRunning(true);
    setAlgorithm(type);
    setActiveNodes([]);

    const sequence: NodeID[] = type === 'BFS' ? ['A', 'B', 'C', 'D'] : ['A', 'B', 'D', 'C'];
    
    // Add nodes one by one with delay
    for (let i = 0; i < sequence.length; i++) {
      await new Promise(r => setTimeout(r, 800));
      setActiveNodes(prev => [...prev, sequence[i]]);
    }
    
    setTimeout(() => {
      setRunning(false);
    }, 500);
  };

  const isEdgeActive = (from: NodeID, to: NodeID) => {
    return activeNodes.includes(from) && activeNodes.includes(to);
  };
  
  const isNodeActive = (id: NodeID) => activeNodes.includes(id);

  return (
    <div className="glass-panel p-6 md:p-8 rounded-3xl mt-8 flex flex-col md:flex-row gap-8 items-center relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#FF5FA2] to-transparent opacity-50"></div>
      
      <div className="flex-1 space-y-6 relative z-10 w-full">
        <div>
          <h3 className="text-2xl font-bold mb-2">Visualisasi Traversal</h3>
          <p className="text-white/60 text-sm">Pilih algoritma untuk melihat bagaimana graf ditelusuri dari simpul ke simpul. Simpul A bertindak sebagai awal mula telusur (Root).</p>
        </div>

        <div className="flex flex-col gap-3">
          <motion.button
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => runTraversal('BFS')}
            disabled={running}
            className={`flex items-center justify-between p-4 rounded-xl font-semibold border transition-all ${algorithm === 'BFS' ? 'bg-secondary/20 border-secondary text-white' : 'glass-panel border-white/5 hover:border-white/20'}`}
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center text-xs">BFS</span>
              <span>Breadth-First Search</span>
            </div>
            {!running && <Play className="w-4 h-4 text-white/50" />}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => runTraversal('DFS')}
            disabled={running}
            className={`flex items-center justify-between p-4 rounded-xl font-semibold border transition-all ${algorithm === 'DFS' ? 'bg-primary/20 border-primary text-white' : 'glass-panel border-white/5 hover:border-white/20'}`}
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs">DFS</span>
              <span>Depth-First Search</span>
            </div>
            {!running && <Play className="w-4 h-4 text-white/50" />}
          </motion.button>
        </div>

        <div className="min-h-[40px] pt-2">
          <AnimatePresence mode="wait">
            {activeNodes.length > 0 && (
              <motion.div 
                key={activeNodes.join('')}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2 text-sm font-mono bg-black/40 p-3 rounded-lg border border-white/5"
              >
                <span className="text-white/50 uppercase text-xs mr-2">{algorithm} Hasil:</span>
                {activeNodes.map((n, i) => (
                  <span key={i} className="flex items-center">
                    <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${algorithm === 'BFS' ? 'bg-secondary' : 'bg-primary'} text-white`}>{n}</span>
                    {i < activeNodes.length - 1 && <span className="mx-2 text-white/30">→</span>}
                  </span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex-1 w-full flex justify-center bg-black/20 p-8 rounded-2xl relative">
        <svg viewBox="0 0 100 140" className="w-full max-w-[280px] drop-shadow-xl" style={{ overflow: 'visible' }}>
          {/* Draw Edges */}
          {edges.map((e, i) => {
            const start = nodes.find(n => n.id === e.from)!;
            const end = nodes.find(n => n.id === e.to)!;
            const active = isEdgeActive(e.from, e.to);
            return (
              <motion.line
                key={i}
                x1={start.x} y1={start.y} x2={end.x} y2={end.y}
                stroke={active ? (algorithm === 'BFS' ? '#FF5FA2' : '#6A0DAD') : '#ffffff'}
                strokeOpacity={active ? 1 : 0.15}
                strokeWidth={active ? 3 : 2}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5 }}
              />
            )
          })}
          
          {/* Draw Nodes */}
          {nodes.map((n, i) => {
            const active = isNodeActive(n.id);
            const isCurrent = activeNodes[activeNodes.length - 1] === n.id;
            return (
              <g key={i}>
                <motion.circle
                  cx={n.x} cy={n.y} r={12}
                  fill={active ? (algorithm === 'BFS' ? '#FF5FA2' : '#6A0DAD') : '#1e1e1e'}
                  stroke={active ? '#fff' : '#444'}
                  strokeWidth="2"
                  animate={{ 
                    scale: isCurrent ? 1.2 : active ? 1 : 1,
                    fillOpacity: active ? 1 : 0.8
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
                
                {isCurrent && (
                   <motion.circle
                    cx={n.x} cy={n.y} r={18}
                    fill="none"
                    stroke={algorithm === 'BFS' ? '#FF5FA2' : '#6A0DAD'}
                    strokeWidth="1.5"
                    initial={{ scale: 0.8, opacity: 1 }}
                    animate={{ scale: 1.8, opacity: 0 }}
                    transition={{ repeat: Infinity, duration: 1 }}
                 />
                )}

                <text 
                  x={n.x} y={n.y} 
                  dy="0.3em" textAnchor="middle" 
                  fill={active ? "#fff" : "#888"} 
                  fontSize="10" 
                  fontWeight="bold"
                  className="font-mono select-none"
                >
                  {n.id}
                </text>
              </g>
            )
          })}
        </svg>
      </div>
    </div>
  );
}
