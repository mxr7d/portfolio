import { useEffect, useRef, useState } from 'react';
import { ChevronDown, MapPin, Mail, Linkedin, Ship, FileText } from 'lucide-react';
import GlobeCanvas from './GlobeCanvas';

const words = ['Chartering Specialist', 'Supply Chain Strategist', 'Logistics Professional', 'Shipping Operations Expert'];

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  useEffect(() => {
    const current = words[wordIdx];
    if (!deleting && displayed === current) {
      timeoutRef.current = setTimeout(() => setDeleting(true), 2400);
    } else if (deleting && displayed === '') {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
    } else {
      timeoutRef.current = setTimeout(() => {
        setDisplayed(deleting ? current.slice(0, displayed.length - 1) : current.slice(0, displayed.length + 1));
      }, deleting ? 45 : 80);
    }
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [displayed, deleting, wordIdx]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#030d18]">
      {/* Deep ocean gradient layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030d18] via-[#041624] to-[#030d18]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(0,100,140,0.18),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_85%_85%,rgba(0,60,100,0.12),transparent)]" />

      {/* Nautical chart grid */}
      <div
        className="absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,196,167,0.9) 1px,transparent 1px),linear-gradient(90deg,rgba(0,196,167,0.9) 1px,transparent 1px)',
          backgroundSize: '70px 70px',
        }}
      />
      {/* Diagonal chart lines */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, rgba(0,196,167,1) 0, rgba(0,196,167,1) 1px, transparent 0, transparent 50%)',
          backgroundSize: '50px 50px',
        }}
      />

      <GlobeCanvas />

      {/* Content */}
      <div
        className={`relative z-10 text-center max-w-4xl mx-auto px-6 transition-all duration-1000 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00c4a7]/35 bg-[#00c4a7]/5 backdrop-blur-sm mb-8">
          <Ship size={14} className="text-[#00c4a7]" />
          <span className="text-[#00c4a7] text-sm font-medium tracking-wider uppercase">
            Available for Chartering & Logistics Roles
          </span>
        </div>

        {/* Name */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-4 tracking-tight leading-none">
          Mohamed
          <span className="block bg-gradient-to-r from-[#00c4a7] via-[#00a8d4] to-[#006aaf] bg-clip-text text-transparent">
            Murad
          </span>
        </h1>

        {/* Typewriter */}
        <div className="h-12 flex items-center justify-center mb-6">
          <p className="text-xl md:text-2xl font-semibold text-slate-300">
            {displayed}
            <span className="inline-block w-0.5 h-6 bg-[#00c4a7] ml-1 animate-pulse" />
          </p>
        </div>

        {/* Location */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-slate-400 mb-10">
          <span className="flex items-center gap-1.5 text-sm">
            <MapPin size={15} className="text-[#00c4a7]" />
            Berlin, Germany
          </span>
          <span className="text-slate-700 hidden sm:block">|</span>
          <span className="text-sm">MSc Logistics &amp; Supply Chain Management</span>
          <span className="text-slate-700 hidden sm:block">|</span>
          <span className="text-sm">Arden University</span>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <a
            href="#experience"
            onClick={(e) => { e.preventDefault(); document.querySelector('#experience')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#00c4a7] to-[#006aaf] text-white font-bold text-base hover:shadow-[0_0_40px_rgba(0,196,167,0.45)] transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
            <Ship size={18} /> View My Voyage
          </a>
          <a
            href="/resume.html"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-xl border border-[#00c4a7]/40 bg-[#00c4a7]/5 backdrop-blur-sm text-[#00c4a7] font-semibold text-base hover:bg-[#00c4a7]/10 hover:border-[#00c4a7]/60 transition-all duration-300 flex items-center gap-2"
          >
            <FileText size={18} /> Download CV
          </a>
          <a
            href="mailto:mohamedmurad035@gmail.com"
            className="px-8 py-4 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm text-white font-semibold text-base hover:bg-white/10 hover:border-[#00c4a7]/50 transition-all duration-300 flex items-center gap-2"
          >
            <Mail size={18} /> Get In Touch
          </a>
        </div>

        {/* Social */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://linkedin.com/in/mohamedmurad-scm"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-slate-400 hover:text-[#00c4a7] transition-colors text-sm group"
          >
            <Linkedin size={16} className="group-hover:scale-110 transition-transform" />
            <span>linkedin.com/in/mohamedmurad-scm</span>
          </a>
          <span className="text-slate-700">|</span>
          <a
            href="mailto:mohamedmurad035@gmail.com"
            className="flex items-center gap-2 text-slate-400 hover:text-[#00c4a7] transition-colors text-sm group"
          >
            <Mail size={16} className="group-hover:scale-110 transition-transform" />
            <span>mohamedmurad035@gmail.com</span>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 hover:text-[#00c4a7] transition-colors group"
      >
        <span className="text-xs uppercase tracking-widest">Set Sail</span>
        <ChevronDown size={20} className="animate-bounce" />
      </button>
    </section>
  );
}
