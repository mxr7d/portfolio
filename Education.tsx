import { useEffect, useRef, useState } from 'react';
import { GraduationCap, Award, Languages, Ship, Trophy, MapPin, Calendar } from 'lucide-react';

const education = [
  {
    degree: 'MSc Logistics and Supply Chain Management',
    school: 'Arden University (Berlin Campus)',
    location: 'Berlin, Germany',
    period: '2023 – 2025',
    grade: 'CGPA: 3.7',
    color: '#00c4a7',
  },
  {
    degree: 'BSc Business Administration',
    school: 'University of Sharjah',
    location: 'Sharjah, UAE',
    period: '2019 – 2023',
    grade: 'Grade: B',
    color: '#006aaf',
  },
];

const certifications = [
  { name: 'Fundamentals of Digital Marketing', issuer: 'Google Garage', year: '2023', color: '#00c4a7' },
  { name: 'AI, Business, and the Future of Work', issuer: 'Lund University', year: '2023', color: '#006aaf' },
  { name: 'Digital Marketing (Advanced Level)', issuer: 'Spoton Training Institute', year: '2022', color: '#00c4a7' },
];

const languages = [
  { name: 'English', level: 'Fluent', proficiency: 95, flag: 'EN' },
  { name: 'Tamil', level: 'Native', proficiency: 100, flag: 'TA' },
  { name: 'Hindi / Urdu', level: 'Fluent', proficiency: 90, flag: 'HI' },
  { name: 'German', level: 'Learning (B1)', proficiency: 40, flag: 'DE' },
];

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="education" ref={sectionRef} className="py-28 bg-[#030d18] relative overflow-hidden">
      <div className="absolute -top-40 left-0 w-96 h-96 bg-[#00c4a7]/3 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className={`transition-all duration-800 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="h-px w-8 bg-[#00c4a7]/50" />
              <span className="text-[#00c4a7] text-sm font-semibold uppercase tracking-[0.2em]">Academic Background</span>
              <div className="h-px w-8 bg-[#00c4a7]/50" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white">Education &amp; Credentials</h2>
          </div>

          {/* Education timeline */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-11 h-11 rounded-xl bg-[#00c4a7]/20 flex items-center justify-center">
                <GraduationCap size={22} className="text-[#00c4a7]" />
              </div>
              <h3 className="text-xl font-bold text-white">Academic Qualifications</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {education.map((edu, i) => (
                <div
                  key={i}
                  className="group relative p-7 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-[#00c4a7]/40 transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                    style={{ background: edu.color }}
                  />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full" style={{ background: `${edu.color}20`, color: edu.color }}>
                        {edu.period}
                      </span>
                      <span className="text-sm font-bold" style={{ color: edu.color }}>{edu.grade}</span>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2 leading-snug">{edu.degree}</h4>
                    <p className="text-slate-400 text-sm">{edu.school}</p>
                    <p className="text-slate-500 text-xs mt-1 flex items-center gap-1">
                      <MapPin size={11} /> {edu.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-11 h-11 rounded-xl bg-[#006aaf]/20 flex items-center justify-center">
                <Award size={22} className="text-[#006aaf]" />
              </div>
              <h3 className="text-xl font-bold text-white">Certifications</h3>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {certifications.map((c, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-5 rounded-xl bg-white/3 border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${c.color}20` }}>
                    <Trophy size={18} style={{ color: c.color }} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-white font-semibold text-sm leading-snug">{c.name}</p>
                    <p className="text-slate-500 text-xs mt-1">{c.issuer} · {c.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-11 h-11 rounded-xl bg-[#00c4a7]/20 flex items-center justify-center">
                <Languages size={22} className="text-[#00c4a7]" />
              </div>
              <h3 className="text-xl font-bold text-white">Languages</h3>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {languages.map((lang) => (
                <div key={lang.name} className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-[#00c4a7]/40 transition-all duration-500 text-center group">
                  <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center bg-gradient-to-br from-[#00c4a7]/20 to-[#006aaf]/20 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-sm">{lang.flag}</span>
                  </div>
                  <p className="text-white font-bold text-base">{lang.name}</p>
                  <p className="text-slate-400 text-xs mt-1">{lang.level}</p>
                  <div className="mt-4 h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#00c4a7] to-[#006aaf] transition-all duration-1000"
                      style={{ width: visible ? `${lang.proficiency}%` : '0%' }}
                    />
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
