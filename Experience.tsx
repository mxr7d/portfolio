import { useEffect, useRef, useState } from 'react';
import { Ship, MapPin, Calendar, ChevronRight, Anchor } from 'lucide-react';

const experiences = [
  {
    role: 'Chartering Trainee',
    company: 'Stellar Ocean Transport',
    location: 'Dubai, UAE',
    period: '07/2025 – 09/2025',
    color: '#00c4a7',
    icon: Ship,
    highlights: [
      'Managed daily commercial communications between shipowners, charterers, and brokers to streamline contract negotiations and fixture finalizations.',
      'Analyzed complex charter party agreements to ensure compliance, protect commercial interests, and optimize risk allocation.',
      'Evaluated global cargo demands and vessel employment strategies to optimize market positioning and rate assessments.',
      'Monitored freight markets and vessel spot positions to identify and capitalize on highly profitable commercial opportunities.',
      'Executed precise laytime and demurrage calculations to safeguard financial performance and commercial terms.',
      'Successfully bridged theoretical knowledge with practical insight into global shipping operations.',
    ],
  },
  {
    role: 'System Intern',
    company: 'M-HQ',
    location: 'Dubai, UAE',
    period: '10/2023 – 03/2024',
    color: '#006aaf',
    icon: Anchor,
    highlights: [
      'Maintained and audited internal databases to ensure complete data integrity across digital and physical filing systems.',
      'Managed physical and digital file organizational systems for seamless access and retrieval.',
      'Assisted in IT asset management, ensuring 100% compliance with corporate technology policies.',
      'Extracted data and generated comprehensive system reports to identify bottlenecks and support process optimization.',
      'Gained practical expertise in ERP data handling, workflow tracking, and operational process documentation.',
    ],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="py-28 bg-[#030d18] relative overflow-hidden">
      <div className="absolute -top-60 right-0 w-[500px] h-[500px] bg-[#00c4a7]/3 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6">
        <div className={`transition-all duration-800 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="h-px w-8 bg-[#00c4a7]/50" />
              <span className="text-[#00c4a7] text-sm font-semibold uppercase tracking-[0.2em]">Career Voyage</span>
              <div className="h-px w-8 bg-[#00c4a7]/50" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white">Professional Experience</h2>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Timeline nav */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {experiences.map((exp, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`group text-left p-6 rounded-2xl border transition-all duration-500 relative overflow-hidden ${
                    active === i
                      ? 'border-[#00c4a7]/40 bg-gradient-to-br from-[#00c4a7]/10 to-[#006aaf]/5 shadow-[0_0_40px_rgba(0,196,167,0.1)]'
                      : 'border-white/10 bg-white/3 hover:border-white/20 hover:bg-white/5'
                  }`}
                >
                  {active === i && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 rounded-full" style={{ background: exp.color }} />
                  )}
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all"
                      style={{ background: active === i ? `${exp.color}20` : 'rgba(255,255,255,0.05)' }}
                    >
                      <exp.icon size={20} style={{ color: active === i ? exp.color : '#64748b' }} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-white text-base leading-tight">{exp.role}</p>
                      <p className="text-slate-400 text-sm mt-1">{exp.company}</p>
                      <div className="flex items-center gap-3 mt-2 flex-wrap">
                        <span className="flex items-center gap-1 text-slate-500 text-xs">
                          <MapPin size={12} /> {exp.location}
                        </span>
                        <span className="flex items-center gap-1 text-slate-500 text-xs">
                          <Calendar size={12} /> {exp.period}
                        </span>
                      </div>
                    </div>
                    <ChevronRight
                      size={18}
                      className={`ml-auto flex-shrink-0 transition-all ${active === i ? 'text-[#00c4a7] translate-x-1' : 'text-slate-600'}`}
                    />
                  </div>
                </button>
              ))}
            </div>

            {/* Detail panel */}
            <div className="lg:col-span-3">
              {experiences.map((exp, i) => (
                <div
                  key={i}
                  className={`transition-all duration-500 ${active === i ? 'opacity-100 translate-x-0' : 'opacity-0 absolute pointer-events-none'}`}
                  style={{ display: active === i ? 'block' : 'none' }}
                >
                  <div className="p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] h-full">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: exp.color }} />
                      <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: exp.color }}>
                        {exp.period}
                      </span>
                    </div>
                    <h3 className="text-2xl font-black text-white mb-1">{exp.role}</h3>
                    <p className="text-slate-400 font-medium mb-8">{exp.company} · {exp.location}</p>

                    <ul className="space-y-4">
                      {exp.highlights.map((h, j) => (
                        <li key={j} className="flex items-start gap-3 group">
                          <span
                            className="w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center mt-0.5"
                            style={{ background: `${exp.color}20`, color: exp.color }}
                          >
                            <ChevronRight size={12} />
                          </span>
                          <p className="text-slate-300 text-sm leading-relaxed">{h}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
