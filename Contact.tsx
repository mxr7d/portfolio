import { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Send, CheckCircle2, Ship } from 'lucide-react';

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'mohamedmurad035@gmail.com', href: 'mailto:mohamedmurad035@gmail.com', color: '#00c4a7' },
  { icon: Phone, label: 'Phone', value: '+49 176 26086012', href: 'tel:+4917626086012', color: '#006aaf' },
  { icon: MapPin, label: 'Location', value: 'Berlin, Germany', href: '#', color: '#00c4a7' },
  { icon: Linkedin, label: 'LinkedIn', value: 'mohamedmurad-scm', href: 'https://linkedin.com/in/mohamedmurad-scm', color: '#006aaf' },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get('name');
    const email = data.get('email');
    const message = data.get('message');
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name} <${email}>`);
    window.location.href = `mailto:mohamedmurad035@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    form.reset();
  };

  return (
    <section id="contact" ref={sectionRef} className="py-28 bg-[#030d18] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#00c4a7]/5 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className={`transition-all duration-800 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="h-px w-8 bg-[#00c4a7]/50" />
              <span className="text-[#00c4a7] text-sm font-semibold uppercase tracking-[0.2em]">Get In Touch</span>
              <div className="h-px w-8 bg-[#00c4a7]/50" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white">Let's Set Sail Together</h2>
            <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
              Open to supply chain, logistics, and chartering roles. Whether you have a question or an opportunity, my inbox is always open.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Contact cards */}
            <div className="lg:col-span-2 space-y-4">
              {contactInfo.map(({ icon: Icon, label, value, href, color }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-[#00c4a7]/40 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}20` }}>
                    <Icon size={20} style={{ color }} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-slate-500 text-xs uppercase tracking-wider">{label}</p>
                    <p className="text-white font-semibold text-sm truncate group-hover:text-[#00c4a7] transition-colors">{value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-slate-400 text-sm font-medium mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-[#00c4a7]/50 focus:bg-white/8 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-[#00c4a7]/50 focus:bg-white/8 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-400 text-sm font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="What's this about?"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-[#00c4a7]/50 focus:bg-white/8 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-sm font-medium mb-2">Message</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell me about the opportunity..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-[#00c4a7]/50 focus:bg-white/8 transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className={`w-full px-6 py-4 rounded-xl font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 ${
                    sent
                      ? 'bg-[#00c4a7]/20 text-[#00c4a7] border border-[#00c4a7]/40'
                      : 'bg-gradient-to-r from-[#00c4a7] to-[#006aaf] text-white hover:shadow-[0_0_40px_rgba(0,196,167,0.4)] hover:scale-[1.02]'
                  }`}
                >
                  {sent ? (
                    <><CheckCircle2 size={18} /> Message Sent!</>
                  ) : (
                    <>Send Message <Send size={18} /></>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
