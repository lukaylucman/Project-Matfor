import { motion } from 'motion/react';
import GraphVisualizer from '../components/GraphVisualizer';
import DidYouKnow from '../components/DidYouKnow';
import MiniQuiz from '../components/MiniQuiz';
import { useAppContext } from '../contexts/AppProvider';

const QUIZ_QUESTIONS = [
  {
    question: "Manakah konsep yang TEPAT merepresentasikan simpul (titik) pada Graf?",
    options: ["Edge", "Vertex", "Path", "Weight"],
    answerIndex: 1,
    explanation: "Vertex atau simpul adalah nokta atau titik penyusun sebuah graf, sedangkan garis penghubungnya dinamakan Edge."
  },
  {
    question: "Apa tujuan utama penggunaan algoritma Breadth-First Search (BFS)?",
    options: [
      "Mencari jalur paling dalam ke dead-end",
      "Menelusuri graf secara melebar level demi level",
      "Mencari edge terpanjang dalam graf",
      "Menghasilkan bilangan acak berdasarkan koneksi"
    ],
    answerIndex: 1,
    explanation: "Sesuai namanya (Breadth/Lebar), BFS menelusuri atau meng-eksplorasi tetangga terdekat pada level yang sama terlebih dahulu sebelum turun ke level yang lebih jauh."
  },
  {
    question: "Apa bentuk representasi graf yang menyimpan data tetangga di array of list dinamis (misal array dari LinkedList)?",
    options: ["Adjacency Matrix", "Weight Matrix", "Adjacency List", "Graph Nodes"],
    answerIndex: 2,
    explanation: "Adjacency List menggunakan array index untuk merepresentasikan vertex, dan masing-masing index menyimpan list dinamis yang berisi tetangga dari vertex tersebut."
  }
];

export default function GraphTheory() {
  const { markCompleted } = useAppContext();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto pt-28 pb-20 px-6"
    >
      <div className="mb-12">
        <span className="text-5xl mb-6 block">🕸️</span>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">Teori Graf</h1>
        <p className="text-xl text-white/70">Mempelajari representasi hubungan antar objek menggunakan simpul dan sisi.</p>
      </div>

      <section className="space-y-12">
        
        {/* Pengertian */}
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center text-sm">1</span>
            Pengertian Graf
          </h2>
          <div className="glass-panel p-6 rounded-2xl text-white/80 leading-relaxed grid md:grid-cols-2 gap-6 relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 opacity-5 w-40 h-40">
              <svg viewBox="0 0 100 100"><circle cx={20} cy={20} r={10} /><circle cx={80} cy={80} r={10} /><line x1={20} y1={20} x2={80} y2={80} stroke="currentColor" strokeWidth={2}/></svg>
            </div>
            <div>
              <p className="mb-4">
                Graf adalah sekumpulan noktah (simpul) dan garis (sisi) yang menghubungkan sekumpulan simpul tersebut. Graf digunakan untuk merepresentasikan objek-objek diskrit beserta hubungan di antara objek-objek tersebut.
              </p>
            </div>
            <div className="space-y-4">
              <div className="bg-black/30 p-4 rounded-xl border border-white/5 flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 mt-1 font-bold">V</div>
                <div>
                  <h4 className="font-bold text-white mb-1">Vertex (Simpul)</h4>
                  <p className="text-sm text-white/60">Titik penyusun graf, mewakili entitas/objek. Himpunan vertex dilambangkan dengan V.</p>
                </div>
              </div>
              <div className="bg-black/30 p-4 rounded-xl border border-white/5 flex gap-4 items-start">
                <div className="w-8 h-8 rounded bg-secondary/20 text-secondary flex items-center justify-center shrink-0 mt-1 font-bold">—</div>
                <div>
                  <h4 className="font-bold text-white mb-1">Edge (Sisi)</h4>
                  <p className="text-sm text-white/60">Garis yang menghubungkan dua objek/simpul, mewakili koneksi. Himpunan edge dilambangkan dengan E.</p>
                </div>
              </div>
            </div>
          </div>
          
          <DidYouKnow text="Banyak aplikasi di kehidupan sehari-hari menggunakan Teori Graf. Google Maps menggunakannya untuk mencari rute terpendek dengan algoritma Dijkstra. Facebook dan LinkedIn menggunakannya untuk memberikan rekomendasi teman (Mutual Friends)." />
        </div>

        {/* Jenis & Representasi */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
             <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-secondary/20 text-secondary flex items-center justify-center text-sm">2</span>
              Jenis Graf
            </h2>
            <ul className="space-y-3">
              {[
                { name: 'Graf Berarah', desc: 'Edgenya memiliki arah (panah) tertentu.' },
                { name: 'Graf Tak Berarah', desc: 'Edgenya tidak memiliki arah, koneksi dua sisi.' },
                { name: 'Graf Berbobot', desc: 'Tiap edge diberikan nilai atau bobot tertentu.' },
                { name: 'Graf Sederhana', desc: 'Tidak memiliki loop atau edge ganda.' },
              ].map((item, i) => (
                 <li key={i} className="glass-panel p-4 rounded-xl flex flex-col hover:bg-white/5 transition-colors">
                   <strong className="text-white mb-1">{item.name}</strong>
                   <span className="text-sm text-white/60">{item.desc}</span>
                 </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center text-sm">3</span>
              Representasi Graf
            </h2>
            <ul className="space-y-4">
              <li className="glass-panel p-5 rounded-xl border-l-4 border-primary bg-gradient-to-r from-primary/10 to-transparent">
                <strong className="text-white text-lg block mb-2">Adjacency Matrix</strong>
                <p className="text-sm text-white/70">Matriks 2D V x V di mana sel (i, j) bernilai 1 jika terdapat edge dari simpul i ke simpul j, dan 0 jika tidak ada.</p>
              </li>
              <li className="glass-panel p-5 rounded-xl border-l-4 border-secondary bg-gradient-to-r from-secondary/10 to-transparent">
                <strong className="text-white text-lg block mb-2">Adjacency List</strong>
                <p className="text-sm text-white/70">Daftar array atau List dinamis, di mana setiap index i menyimpan daftar tetangga yang terhubung langsung dengan simpul i.</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Algoritma Penelusuran */}
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center text-sm">4</span>
            Algoritma Dasar & Contoh Penelusuran
          </h2>
          
          <div className="glass-panel p-6 md:p-8 rounded-[2rem] text-white/80 border border-white/5">
            <p className="mb-6 leading-relaxed">Selain struktur, Graf terkenal dengan algoritmanya. Dua algoritma paling penting untuk menelusuri (traversal) seluruh simpul pada graf secara sistematis adalah <strong>BFS</strong> (mencari melebar) dan <strong>DFS</strong> (mencari mendalam).</p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
               <div className="bg-black/30 p-5 rounded-2xl border border-white/5 relative overflow-hidden group">
                 <div className="absolute right-0 top-0 text-6xl opacity-10 blur-sm translate-x-4 -translate-y-4 font-black transition-transform group-hover:scale-110">B</div>
                 <h4 className="text-xl font-bold text-secondary mb-2">BFS (Breadth-First Search)</h4>
                 <p className="text-sm">Menelusuri graf secara melebar. Mengunjungi simpul mulai dari akar (root), lalu mengunjungi <strong>seluruh tetangga terdekat</strong> terlebih dahulu secara selevel sebelum melanjutkan ke level berikutnya. Menggunakan antrean (Queue).</p>
               </div>
               <div className="bg-black/30 p-5 rounded-2xl border border-white/5 relative overflow-hidden group">
                 <div className="absolute right-0 top-0 text-6xl opacity-10 blur-sm translate-x-4 -translate-y-4 font-black transition-transform group-hover:scale-110">D</div>
                 <h4 className="text-xl font-bold text-primary mb-2">DFS (Depth-First Search)</h4>
                 <p className="text-sm">Menelusuri graf secara mendalam. Akan berjalan sejauh mungkin pada satu jalur (branch) menuju dasar/dead-end, sebelum melakukan <i>backtrack</i> dan mencoba cabang yang lain. Menggunakan tumpukan (Stack).</p>
               </div>
            </div>

            <div className="h-px w-full bg-white/10 my-8"></div>

            <h3 className="font-bold text-xl mb-4 text-white">Contoh Soal Penelusuran Traversal</h3>
            <p className="font-mono text-sm bg-white/5 inline-block px-3 py-2 rounded-lg mb-6">Diketahui Edges: A-B, A-C, B-D, C-D</p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-2">
              <div>
                <p className="text-sm text-secondary font-bold mb-1 uppercase tracking-wider">Hasil BFS mulai dari A:</p>
                <p className="font-mono text-lg font-bold bg-secondary/10 px-4 py-2 rounded-lg inline-block border border-secondary/20 shadow-inner">A → B → C → D</p>
              </div>
              <div>
                <p className="text-sm text-primary font-bold mb-1 uppercase tracking-wider">Hasil DFS mulai dari A:</p>
                <p className="font-mono text-lg font-bold bg-primary/10 px-4 py-2 rounded-lg inline-block border border-primary/20 shadow-inner">A → B → D → C</p>
              </div>
            </div>

            {/* Interactive Graph implementation */}
            <GraphVisualizer />
            
          </div>
        </div>

        {/* Quiz Component */}
        <MiniQuiz 
          title="Pemahaman Teori Graf" 
          questions={QUIZ_QUESTIONS} 
          onComplete={() => markCompleted('graph')} 
        />

      </section>
    </motion.div>
  );
}
