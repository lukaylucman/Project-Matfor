import { motion } from 'motion/react';
import InteractiveTruthTable from '../components/InteractiveTruthTable';
import DidYouKnow from '../components/DidYouKnow';
import MiniQuiz from '../components/MiniQuiz';
import { useAppContext } from '../contexts/AppProvider';

const QUIZ_QUESTIONS = [
  {
    question: "Apa hasil dari operasi A + 1 menurut Hukum Dominasi?",
    options: ["A", "0", "1", "A'"],
    answerIndex: 2,
    explanation: "Menurut Hukum Dominasi, ketika suatu variabel di-OR-kan dengan 1 (True), berapapun nilai variabel tersebut, hasilnya akan selalu 1."
  },
  {
    question: "Manakah simbol yang mewakili gerbang NOT (Inverter)?",
    options: ["+", "·", "A'", "A + B"],
    answerIndex: 2,
    explanation: "Simbol aksen (') atau garis di atas variabel melambangkan operasi NOT (komplemen)."
  },
  {
    question: "Jika A=1 dan B=0, berapakah hasil dari A · B?",
    options: ["1", "0", "Error", "A"],
    answerIndex: 1,
    explanation: "Dalam operasi AND, jika ada satu saja input bernilai 0 (FALSE), maka hasilnya adalah 0."
  }
];

export default function BooleanLogic() {
  const { markCompleted } = useAppContext();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto pt-28 pb-20 px-6"
    >
      <div className="mb-12">
        <span className="text-5xl mb-6 block">🧠</span>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">Aljabar Boolean</h1>
        <p className="text-xl text-white/70">Mempelajari logika biner dan operasi logika yang menjadi dasar dalam perancangan sistem digital.</p>
      </div>

      <section className="space-y-12">
        {/* Pengertian */}
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center text-sm">1</span>
            Pengertian Aljabar Boolean
          </h2>
          <div className="glass-panel p-6 rounded-2xl text-white/80 leading-relaxed">
            <p>
              Aljabar Boolean adalah cabang matematika yang berhubungan dengan variabel biner dan logika operasi. Variabel ini hanya memiliki dua nilai yang mungkin: <strong>1 (Benar/TRUE)</strong> dan <strong>0 (Salah/FALSE)</strong>. Sistem ini menjadi dasar dari semua sirkuit digital dan pemrograman komputer modern.
            </p>
          </div>
          
          <DidYouKnow text="Aljabar Boolean dinamai dari George Boole, seorang matematikawan Inggris abad ke-19. Konsep ini sekarang sangat krusial; tanpa Aljabar Boolean, prosesor komputer dan smartphone yang kita gunakan saat ini tidak akan bisa diciptakan karena mereka semua dibangun menggunakan jutaan gerbang logika mikroskopis!" />
        </div>

        {/* Operasi Dasar */}
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-secondary/20 text-secondary flex items-center justify-center text-sm">2</span>
            Operasi Dasar
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <h3 className="font-bold text-xl mb-2 text-primary">AND (·)</h3>
              <p className="text-sm text-white/60">Menghasilkan nilai 1 jika dan hanya jika <strong>semua</strong> input bernilai 1. Dianalogikan dengan perkalian logika.</p>
            </div>
            <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-secondary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <h3 className="font-bold text-xl mb-2 text-secondary">OR (+)</h3>
              <p className="text-sm text-white/60">Menghasilkan nilai 1 jika <strong>salah satu</strong> atau lebih input bernilai 1. Dianalogikan dengan penjumlahan logika.</p>
            </div>
            <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <h3 className="font-bold text-xl mb-2">NOT (')</h3>
              <p className="text-sm text-white/60">Dikenal sebagai Inverter. Membalik nilai input. Jika input 1 menjadi 0, dan sebaliknya.</p>
            </div>
          </div>

          <InteractiveTruthTable />
        </div>

        {/* Hukum-Hukum */}
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center text-sm">3</span>
            Hukum-Hukum Boolean
          </h2>
          <div className="glass-panel rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
              <div className="p-6 space-y-4">
                <LawItem name="Hukum Identitas" formula="A + 0 = A, A · 1 = A" />
                <LawItem name="Hukum Dominasi" formula="A + 1 = 1, A · 0 = 0" />
                <LawItem name="Hukum Idempoten" formula="A + A = A, A · A = A" />
              </div>
              <div className="p-6 space-y-4 bg-white/5">
                <LawItem name="Hukum Komplemen" formula="A + A' = 1, A · A' = 0" />
                <LawItem name="Hukum Involusi" formula="(A')' = A" />
                <LawItem name="Hukum De Morgan" formula="(A + B)' = A' · B', <br/>(A · B)' = A' + B'" />
              </div>
            </div>
          </div>
        </div>

        {/* Contoh Soal */}
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-secondary/20 text-secondary flex items-center justify-center text-sm">4</span>
            Contoh Soal
          </h2>
          
          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-primary">
              <h3 className="font-semibold text-lg mb-2">Contoh Soal 1</h3>
              <p className="text-white/70 mb-4 bg-black/30 p-3 rounded-lg font-mono">
                Sederhanakan: A + A·B
              </p>
              <div className="space-y-2 text-sm text-white/80">
                <p className="text-white/50 text-xs uppercase tracking-wider mb-2">Penyelesaian:</p>
                <p className="font-mono ml-4">A + A·B</p>
                <p className="font-mono ml-4">= A(1 + B) <span className="text-white/40 ml-2">--- Distributif</span></p>
                <p className="font-mono ml-4">= A(1) <span className="text-white/40 ml-2">--- Hukum Dominasi (1+B=1)</span></p>
                <p className="font-mono ml-4">= A <span className="text-white/40 ml-2">--- Hukum Identitas</span></p>
                <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20 text-primary-light">
                  <span className="font-semibold text-primary">Kesimpulan:</span> Hasil penyederhanaan adalah <strong>A</strong>. (Ini juga dikenal sebagai Hukum Absorpsi).
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Quiz Component */}
        <MiniQuiz 
          title="Pemahaman Aljabar Boolean" 
          questions={QUIZ_QUESTIONS} 
          onComplete={() => markCompleted('boolean')} 
        />

      </section>
    </motion.div>
  );
}

function LawItem({ name, formula }: { name: string, formula: string }) {
  return (
    <div>
      <p className="text-xs text-secondary font-semibold uppercase tracking-wider mb-1">{name}</p>
      <p className="font-mono text-white/90 bg-black/40 px-3 py-2 rounded-lg" dangerouslySetInnerHTML={{ __html: formula }}></p>
    </div>
  )
}
