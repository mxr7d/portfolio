import { useEffect, useRef, useState } from 'react';
import { Ship, Globe, BarChart3, Anchor } from 'lucide-react';

const stats = [
  { icon: Ship, value: 2, suffix: '', label: 'Countries Worked In' },
  { icon: Anchor, value: 37, suffix: '', label: 'MSc CGPA ×10', sub: 'CGPA 3.7' },
  { icon: Globe, value: 3, suffix: '', label: 'Major Projects' },
  { icon: BarChart3, value: 4, suffix: '', label: 'Languages Spoken' },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const step = () => {
          start++;
          setCount(start);
          if (start < target) setTimeout(step, 60);
        };
        step();
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-28 bg-[#041624] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00c4a7]/30 to-transparent" />
      {/* Wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-24 opacity-10"
        style={{
          background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1440 80\'%3E%3Cpath fill=\'%2300c4a7\' d=\'M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z\'/%3E%3C/svg%3E") bottom/100% no-repeat',
        }}
      />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#00c4a7]/3 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6">
        <div className={`transition-all duration-800 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="h-px w-8 bg-[#00c4a7]/50" />
              <span className="text-[#00c4a7] text-sm font-semibold uppercase tracking-[0.2em]">About Me</span>
              <div className="h-px w-8 bg-[#00c4a7]/50" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white">The Navigator Behind the Numbers</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div className="space-y-6">
              <div className="relative">
                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-[#00c4a7] to-[#006aaf] rounded-full" />
                <p className="text-slate-300 text-lg leading-relaxed pl-6">
                  Results-driven Supply Chain and Logistics professional holding an
                  <span className="text-[#00c4a7] font-semibold"> MSc in Logistics and Supply Chain Management</span>.
                  Equipped with hands-on experience in global shipping operations, chartering negotiations, and ERP data management.
                </p>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Proven track record of leveraging data analysis to optimize processes, mitigate risks, and enhance
                operational efficiency in fast-paced corporate environments. A strong cross-functional communicator
                with a global mindset honed across Dubai, Sharjah, and Berlin.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                {['Global Shipping', 'Charter Party Analysis', 'Freight Markets', 'ERP Systems', 'Supply Chain Optimization', 'Risk Management'].map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1.5 rounded-lg bg-[#00c4a7]/10 border border-[#00c4a7]/20 text-[#00c4a7] text-xs font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — stats */}
            <div className="grid grid-cols-2 gap-5">
              {stats.map(({ icon: Icon, value, suffix, label, sub }) => (
                <div
                  key={label}
                  className="group relative p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-[#00c4a7]/40 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,196,167,0.1)] overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#00c4a7]/5 to-transparent rounded-full -translate-y-8 translate-x-8 group-hover:scale-150 transition-transform duration-700" />
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00c4a7]/20 to-[#006aaf]/20 flex items-center justify-center mb-4">
                    <Icon size={20} className="text-[#00c4a7]" />
                  </div>
                  <div className="text-3xl font-black text-white mb-1">
                    {sub ? sub : <CountUp target={value} suffix={suffix} />}
                  </div>
                  <p className="text-slate-500 text-sm">{sub ? 'MSc CGPA' : label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </section>
  );
}
