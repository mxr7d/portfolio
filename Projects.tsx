import { useEffect, useRef, useState } from 'react';
import { FolderGit2, ArrowUpRight, TrendingUp, Megaphone, Ship, Users, BarChart3, Target } from 'lucide-react';

const projects = [
  {
    title: 'Market Entry Strategy for Under Armour',
    category: 'Strategic Planning',
    icon: Target,
    color: '#00c4a7',
    description:
      'Conducted market analysis to identify international expansion opportunities and developed a strategic entry plan incorporating competitor analysis and consumer insights.',
    highlights: [
      'Identified international expansion opportunities through comprehensive market analysis.',
      'Built a strategic entry plan blending competitor analysis with consumer insights.',
      'Presented findings to professors, demonstrating strategic planning skills.',
    ],
    tags: ['Market Analysis', 'Competitor Research', 'Consumer Insights', 'Strategy'],
    metrics: [
      { label: 'Markets Analyzed', value: 'Multi' },
      { label: 'Entry Plan', value: 'Full' },
    ],
  },
  {
    title: 'International Marketing Campaign',
    category: 'Marketing',
    icon: Megaphone,
    color: '#006aaf',
    description:
      'Designed a product launch strategy including digital marketing and market positioning, with competitor research, target demographics, and multi-channel execution.',
    highlights: [
      'Designed a product launch strategy with digital marketing and market positioning.',
      'Conducted competitor research and defined key target demographics.',
      'Created promotional materials and executed a multi-channel marketing approach.',
    ],
    tags: ['Digital Marketing', 'Market Positioning', 'Multi-Channel', 'Promotions'],
    metrics: [
      { label: 'Channels', value: 'Multi' },
      { label: 'Launch Strategy', value: 'End-to-End' },
    ],
  },
  {
    title: 'Supply Chain Optimization Simulation',
    category: 'Supply Chain',
    icon: Ship,
    color: '#00c4a7',
    description:
      'Collaborated with a global team to enhance supply chain efficiency, analyzing simulation results and applying data-driven insights to reduce operational costs and improve logistics.',
    highlights: [
      'Collaborated with a global team to enhance supply chain efficiency.',
      'Analyzed simulation results and adjusted strategies to reduce operational costs.',
      'Applied data-driven insights to improve logistics processes.',
    ],
    tags: ['Simulation', 'Cost Reduction', 'Data-Driven', 'Global Team'],
    metrics: [
      { label: 'Team', value: 'Global' },
      { label: 'Cost Focus', value: 'Reduced' },
    ],
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-28 bg-[#041624] relative overflow-hidden">
      <div className="absolute -bottom-40 right-0 w-96 h-96 bg-[#006aaf]/3 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className={`transition-all duration-800 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="h-px w-8 bg-[#00c4a7]/50" />
              <span className="text-[#00c4a7] text-sm font-semibold uppercase tracking-[0.2em]">Selected Work</span>
              <div className="h-px w-8 bg-[#00c4a7]/50" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white">Featured Projects</h2>
            <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
              Academic projects applying strategic planning, marketing, and supply chain theory to real-world business challenges.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <div
                key={i}
                className="group relative p-7 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-[#00c4a7]/40 transition-all duration-500 overflow-hidden flex flex-col"
              >
                <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" style={{ background: p.color }} />

                <div className="relative flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${p.color}20` }}>
                      <p.icon size={22} style={{ color: p.color }} />
                    </div>
                    <ArrowUpRight size={20} className="text-slate-600 group-hover:text-[#00c4a7] group-hover:rotate-45 transition-all duration-300" />
                  </div>

                  <span className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: p.color }}>
                    {p.category}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-3 leading-snug">{p.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-5">{p.description}</p>

                  <ul className="space-y-2 mb-5 flex-1">
                    {p.highlights.map((h, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-md flex-shrink-0 flex items-center justify-center mt-0.5" style={{ background: `${p.color}20`, color: p.color }}>
                          <ArrowUpRight size={10} />
                        </span>
                        <p className="text-slate-400 text-xs leading-relaxed">{h}</p>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-400 text-[11px] font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/resume.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00c4a7] to-[#006aaf] text-white font-semibold text-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,196,167,0.4)] hover:scale-105"
            >
              <FolderGit2 size={18} /> Download CV
            </a>
            <a
              href="mailto:mohamedmurad035@gmail.com?subject=Project Discussion"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 bg-white/5 hover:bg-[#00c4a7]/10 hover:border-[#00c4a7]/40 text-white font-semibold text-sm transition-all duration-300 group"
            >
              Discuss a Project
              <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
