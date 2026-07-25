import { useState, useEffect } from 'react';
import { Menu, X, Anchor, FileText } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }); },
      { threshold: 0.4 }
    );
    document.querySelectorAll('section[id]').forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#030d18]/95 backdrop-blur-md shadow-[0_2px_30px_rgba(0,180,150,0.1)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 group"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#00c4a7] to-[#006aaf] flex items-center justify-center shadow-[0_0_20px_rgba(0,196,167,0.4)] group-hover:shadow-[0_0_30px_rgba(0,196,167,0.6)] transition-all">
            <Anchor size={18} className="text-white" />
          </div>
          <span className="font-bold text-white text-lg tracking-tight">
            M.<span className="text-[#00c4a7]">Murad</span>
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <button
              key={l.href}
              onClick={() => handleNav(l.href)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                active === l.href.slice(1)
                  ? 'text-[#00c4a7] bg-[#00c4a7]/10'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {l.label}
            </button>
          ))}
          <a
            href="/resume.html"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 px-4 py-2 rounded-lg border border-[#00c4a7]/30 bg-[#00c4a7]/5 text-[#00c4a7] text-sm font-semibold hover:bg-[#00c4a7]/10 transition-all duration-300 flex items-center gap-1.5"
          >
            <FileText size={15} /> CV
          </a>
          <a
            href="mailto:mohamedmurad035@gmail.com"
            className="ml-2 px-5 py-2 rounded-lg bg-gradient-to-r from-[#00c4a7] to-[#006aaf] text-white text-sm font-semibold hover:shadow-[0_0_20px_rgba(0,196,167,0.5)] transition-all duration-300 hover:scale-105"
          >
            Hire Me
          </a>
        </nav>

        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#030d18]/98 backdrop-blur-md border-t border-white/5 px-6 py-4 flex flex-col gap-2">
          {navLinks.map((l) => (
            <button
              key={l.href}
              onClick={() => handleNav(l.href)}
              className="text-left px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-all text-sm font-medium"
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
