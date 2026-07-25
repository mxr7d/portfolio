import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-0.5 z-[60] bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-[#00c4a7] via-[#00a8d4] to-[#006aaf] transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%`, boxShadow: '0 0 10px rgba(0,196,167,0.6)' }}
      />
    </div>
  );
}
