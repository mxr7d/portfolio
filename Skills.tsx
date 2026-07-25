import { useEffect, useRef, useState } from 'react';
import { Ship, Database, BarChart3, FileSpreadsheet, Globe, Workflow, ShieldCheck, Boxes, Anchor, TrendingUp, Layers, Cog } from 'lucide-react';

const skillGroups = [
  {
    title: 'Shipping & Chartering',
    icon: Ship,
    color: '#00c4a7',
    skills: [
      { name: 'Charter Party Negotiation', level: 88 },
      { name: 'Laytime & Demurrage Calculation', level: 85 },
      { name: 'Voyage Estimation & Fixture', level: 82 },
      { name: 'Freight Market Analysis', level: 80 },
    ],
  },
  {
    title: 'Supply Chain & Logistics',
    icon: Anchor,
    color: '#006aaf',
    skills: [
      { name: 'Supply Chain Optimization', level: 90 },
      { name: 'Inventory & Warehouse Management', level: 82 },
      { name: 'Incoterms & Trade Compliance', level: 86 },
      { name: 'Vendor & Stakeholder Management', level: 85 },
    ],
  },
  {
    title: 'Data & Analysis',
    icon: BarChart3,
    color: '#00c4a7',
    skills: [
      { name: 'Data Analysis & Visualization', level: 88 },
      { name: 'Excel (Advanced) & Power Query', level: 95 },
      { name: 'SQL & Database Querying', level: 72 },
      { name: 'Process Improvement', level: 84 },
    ],
  },
  {
    title: 'Tools & Systems',
    icon: Cog,
    color: '#006aaf',
    skills: [
      { name: 'ERP Systems (SAP / Oracle)', level: 80 },
      { name: 'Power BI / Tableau', level: 75 },
      { name: 'MS Office Suite', level: 95 },
      { name: 'Google Workspace', level: 90 },
    ],
  },
];

const quickSkills = [
  { icon: Ship, label: 'Chartering' },
  { icon: Anchor, label: 'Shipping Ops' },
  { icon: Boxes, label: 'Inventory Mgmt' },
  { icon: TrendingUp, label: 'Process Optimization' },
  { icon: FileSpreadsheet, label: 'Advanced Excel' },
  { icon: Database, label: 'ERP Systems' },
  { icon: Workflow, label: 'Workflow Design' },
  { icon: Globe, label: 'International Trade' },
  { icon: Layers, label: 'Logistics Strategy' },
  { icon: ShieldCheck, label: 'Risk Management' },
];

function SkillBar({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setTimeout(() => setWidth(level), delay);
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [level, delay]);

  return (
    <div ref={ref}>
      <div className="flex justify-between mb-2">
        <span className="text-slate-300 text-sm font-medium">{name}</span>
        <span className="text-slate-500 text-xs font-mono">{level}%</span>
      </div>
      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out relative"
          style={{ width: `${width}%`, background: `linear-gradient(90deg, ${color}, ${color}aa)` }}
        >
          <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/40 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-28 bg-[#041624] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#006aaf]/3 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className={`transition-all duration-800 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="h-px w-8 bg-[#00c4a7]/50" />
              <span className="text-[#00c4a7] text-sm font-semibold uppercase tracking-[0.2em]">Capabilities</span>
              <div className="h-px w-8 bg-[#00c4a7]/50" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white">Skills &amp; Expertise</h2>
          </div>

          {/* Quick skill chips */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {quickSkills.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#00c4a7]/40 hover:bg-[#00c4a7]/5 transition-all duration-300 group cursor-default"
              >
                <Icon size={16} className="text-slate-400 group-hover:text-[#00c4a7] transition-colors" />
                <span className="text-slate-300 text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>

          {/* Skill bars */}
          <div className="grid md:grid-cols-2 gap-8">
            {skillGroups.map((group) => (
              <div
                key={group.title}
                className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-500"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${group.color}20` }}>
                    <group.icon size={20} style={{ color: group.color }} />
                  </div>
                  <h3 className="text-lg font-bold text-white">{group.title}</h3>
                </div>
                <div className="space-y-5">
                  {group.skills.map((s, i) => (
                    <SkillBar key={s.name} name={s.name} level={s.level} color={group.color} delay={i * 150} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
