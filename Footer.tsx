import { Anchor, Mail, Phone, Linkedin, MapPin, ArrowUp, FileText } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#020812] border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-[#00c4a7]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#00c4a7] to-[#006aaf] flex items-center justify-center">
                <Anchor size={18} className="text-white" />
              </div>
              <span className="font-bold text-white text-lg">M.<span className="text-[#00c4a7]">Murad</span></span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Supply Chain &amp; Logistics professional specializing in global shipping operations, chartering, process optimization, and data-driven decision making.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Navigate</h4>
            <ul className="space-y-2">
              {['About', 'Experience', 'Skills', 'Education', 'Projects', 'Contact'].map((l) => (
                <li key={l}>
                  <button
                    onClick={() => document.querySelector(`#${l.toLowerCase()}`)?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-slate-500 hover:text-[#00c4a7] text-sm transition-colors"
                  >
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Connect</h4>
            <ul className="space-y-3">
              <li>
                <a href="/resume.html" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-500 hover:text-[#00c4a7] text-sm transition-colors">
                  <FileText size={15} /> Download Resume (PDF)
                </a>
              </li>
              <li>
                <a href="mailto:mohamedmurad035@gmail.com" className="flex items-center gap-2 text-slate-500 hover:text-[#00c4a7] text-sm transition-colors">
                  <Mail size={15} /> mohamedmurad035@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+4917626086012" className="flex items-center gap-2 text-slate-500 hover:text-[#00c4a7] text-sm transition-colors">
                  <Phone size={15} /> +49 176 26086012
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/in/mohamedmurad-scm" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-500 hover:text-[#00c4a7] text-sm transition-colors">
                  <Linkedin size={15} /> linkedin.com/in/mohamedmurad-scm
                </a>
              </li>
              <li className="flex items-center gap-2 text-slate-500 text-sm">
                <MapPin size={15} /> Berlin, Germany
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-xs text-center sm:text-left">
            © {year} Mohamed Murad. All rights reserved. Designed and built with precision.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 text-slate-500 hover:text-[#00c4a7] text-xs font-medium transition-colors group"
          >
            Back to top
            <span className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[#00c4a7]/40 transition-all">
              <ArrowUp size={14} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
