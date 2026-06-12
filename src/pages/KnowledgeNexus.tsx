import { motion } from 'motion/react';
import { Network, Database, Layers, Sparkles } from 'lucide-react';
import { useState } from 'react';

// Concepts mapped to interactive shiny nodes
const CONCEPTS = [
  { id: 'c1', label: 'AND Gate', type: 'boolean', x: 20, y: 30, desc: 'Operasi logika konjungsi. Semua harus benar agar hasilnya benar.' },
  { id: 'c2', label: 'OR Gate', type: 'boolean', x: 40, y: 20, desc: 'Operasi logika disjungsi. Salah satu benar, hasil benar.' },
  { id: 'c3', label: 'Hukum De Morgan', type: 'boolean', x: 30, y: 50, desc: 'Komplemen dari konjungsi sama dengan disjungsi dari komplemen.' },
  { id: 'c4', label: 'Probabilitas', type: 'probability', x: 60, y: 70, desc: 'Secara matematis: n(A) / n(S).' },
  { id: 'c5', label: 'Ruang Sampel', type: 'probability', x: 80, y: 50, desc: 'Himpunan semua kejadian yang mungkin dari eksperimen acak.' },
  { id: 'c6', label: 'Vertex & Edge', type: 'graph', x: 70, y: 20, desc: 'Blok bangunan dasar pembentuk jaringan/graf.' },
  { id: 'c7', label: 'BFS', type: 'graph', x: 50, y: 80, desc: 'Breadth-First Search menggunakan Queue.' },
  { id: 'c8', label: 'DFS', type: 'graph', x: 80, y: 80, desc: 'Depth-First Search menggunakan Stack.' },
];

export default function KnowledgeNexus() {
  const [activeNode, setActiveNode] = useState<typeof CONCEPTS[0] | null>(null);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-6xl mx-auto pt-28 pb-20 px-6"
    >
      <div className="mb-12 text-center">
        <Sparkles className="w-12 h-12 text-secondary mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">Knowledge Nexus</h1>
        <p className="text-xl text-white/70 max-w-2xl mx-auto">
          Pusat data kecerdasan. Jelajahi jaringan konsep-konsep Matematika Informatika yang telah Anda kuasai.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Detail Panel */}
        <div className="w-full md:w-1/3 space-y-6 order-2 md:order-1">
          <div className="glass-panel p-8 rounded-3xl min-h-[300px]">
            <h3 className="text-lg font-bold text-white/50 uppercase tracking-widest mb-6">Data Core</h3>
            
            {activeNode ? (
              <motion.div
                key={activeNode.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className={`p-2 inline-block rounded-xl mb-4 ${
                  activeNode.type === 'boolean' ? 'bg-primary/20 text-primary' : 
                  activeNode.type === 'probability' ? 'bg-secondary/20 text-secondary' : 
                  'bg-white/20 text-white'
                }`}>
                  {activeNode.type === 'boolean' && <Database className="w-6 h-6" />}
                  {activeNode.type === 'probability' && <Layers className="w-6 h-6" />}
                  {activeNode.type === 'graph' && <Network className="w-6 h-6" />}
                </div>
                
                <h2 className="text-2xl font-bold mb-3">{activeNode.label}</h2>
                <p className="text-white/70 leading-relaxed">
                  {activeNode.desc}
                </p>
                <div className="mt-6 font-mono text-xs text-white/40 border-t border-white/10 pt-4">
                  STATUS: ACQUIRED <br/>
                  INTEGRITY: 100%
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col justify-center items-center text-center text-white/30 h-[200px]">
                <Network className="w-12 h-12 mb-4 opacity-50" />
                <p>Klik salah satu node di peta untuk melihat detail memori.</p>
              </div>
            )}
          </div>
        </div>

        {/* Interactive Map */}
        <div className="w-full md:w-2/3 aspect-square md:aspect-auto md:min-h-[500px] glass-panel rounded-3xl relative overflow-hidden bg-black/50 order-1 md:order-2 border-secondary/20 shadow-[0_0_50px_rgba(255,95,162,0.1)] hover:shadow-[0_0_80px_rgba(255,95,162,0.2)] transition-shadow">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
          
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Draw connection lines dynamically */}
            <line x1="20%" y1="30%" x2="40%" y2="20%" stroke="rgba(106,13,173,0.3)" strokeWidth="2" strokeDasharray="5,5" />
            <line x1="20%" y1="30%" x2="30%" y2="50%" stroke="rgba(106,13,173,0.3)" strokeWidth="2" strokeDasharray="5,5" />
            <line x1="40%" y1="20%" x2="30%" y2="50%" stroke="rgba(106,13,173,0.3)" strokeWidth="2" strokeDasharray="5,5" />
            
            <line x1="60%" y1="70%" x2="80%" y2="50%" stroke="rgba(255,95,162,0.3)" strokeWidth="2" strokeDasharray="5,5" />
            
            <line x1="70%" y1="20%" x2="50%" y2="80%" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="5,5" />
            <line x1="70%" y1="20%" x2="80%" y2="80%" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="5,5" />
            <line x1="50%" y1="80%" x2="80%" y2="80%" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="5,5" />
          </svg>

          {CONCEPTS.map((concept, i) => (
            <motion.div
              key={concept.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.1, type: "spring" }}
              whileHover={{ scale: 1.2, zIndex: 10 }}
              onClick={() => setActiveNode(concept)}
              style={{
                left: `${concept.x}%`,
                top: `${concept.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              className="absolute cursor-pointer flex flex-col items-center group"
            >
              <div className={`w-4 h-4 rounded-full shadow-[0_0_20px_4px] transition-all
                ${concept.type === 'boolean' ? 'bg-primary shadow-primary/50' : 
                  concept.type === 'probability' ? 'bg-secondary shadow-secondary/50' : 
                  'bg-white shadow-white/50'}
                ${activeNode?.id === concept.id ? 'ring-4 ring-white/50 scale-125' : ''}  
              `} />
              <div className="absolute top-6 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 px-3 py-1.5 rounded-lg border border-white/10 text-xs font-bold pointer-events-none">
                {concept.label}
              </div>
            </motion.div>
          ))}

           {/* Central Core Decorative */}
           <motion.div 
             animate={{ rotate: 360, scale: [1, 1.05, 1] }} 
             transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-dashed border-white/20 pointer-events-none" 
           />
           <motion.div 
             animate={{ rotate: -360, scale: [1, 1.1, 1] }} 
             transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-dotted border-secondary/30 pointer-events-none" 
           />
        </div>
      </div>
    </motion.div>
  );
}
