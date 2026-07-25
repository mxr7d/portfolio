import { useEffect, useRef } from 'react';

interface Port { x: number; y: number; pulse: number; pulseSpeed: number; size: number; }
interface Vessel { routeIdx: number; t: number; speed: number; direction: number; }
interface Route { from: number; to: number; cp1x: number; cp1y: number; cp2x: number; cp2y: number; }

function bezierPoint(t: number, p0: number, p1: number, p2: number, p3: number) {
  const u = 1 - t;
  return u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3;
}

export default function GlobeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let W = 0, H = 0;
    let ports: Port[] = [];
    let routes: Route[] = [];
    let vessels: Vessel[] = [];
    let waveOffset = 0;

    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W * window.devicePixelRatio;
      canvas.height = H * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      init();
    };

    const init = () => {
      const count = Math.min(Math.floor(W / 130), 14);
      ports = Array.from({ length: count }, () => ({
        x: Math.random() * W * 0.9 + W * 0.05,
        y: Math.random() * H * 0.8 + H * 0.1,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.025 + 0.012,
        size: Math.random() * 2 + 2,
      }));

      routes = [];
      for (let i = 0; i < ports.length; i++) {
        const j = (i + 1 + Math.floor(Math.random() * (ports.length - 2))) % ports.length;
        const mx = (ports[i].x + ports[j].x) / 2;
        const my = (ports[i].y + ports[j].y) / 2;
        const curveX = (Math.random() - 0.5) * 180;
        const curveY = (Math.random() - 0.5) * 120;
        routes.push({
          from: i, to: j,
          cp1x: mx + curveX, cp1y: my + curveY,
          cp2x: mx - curveX * 0.5, cp2y: my - curveY * 0.5,
        });
      }

      vessels = routes.map((_, i) => ({
        routeIdx: i,
        t: Math.random(),
        speed: Math.random() * 0.0018 + 0.0008,
        direction: Math.random() > 0.5 ? 1 : -1,
      }));
    };

    const drawWave = (y: number, amplitude: number, frequency: number, phase: number, alpha: number) => {
      ctx.beginPath();
      ctx.moveTo(0, y);
      for (let x = 0; x <= W; x += 4) {
        ctx.lineTo(x, y + Math.sin((x * frequency + phase) * 0.01) * amplitude);
      }
      ctx.strokeStyle = `rgba(0,180,200,${alpha})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();
    };

    const drawShip = (x: number, y: number, angle: number, color: string) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      // hull
      ctx.beginPath();
      ctx.moveTo(7, 0);
      ctx.lineTo(-5, -3);
      ctx.lineTo(-7, 0);
      ctx.lineTo(-5, 3);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
      // mast
      ctx.beginPath();
      ctx.moveTo(-1, 0);
      ctx.lineTo(-1, -6);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.2;
      ctx.stroke();
      // sail
      ctx.beginPath();
      ctx.moveTo(-1, -5.5);
      ctx.lineTo(4, -2);
      ctx.lineTo(-1, -1);
      ctx.closePath();
      ctx.fillStyle = `${color}cc`;
      ctx.fill();
      ctx.restore();
    };

    let frame = 0;
    const draw = () => {
      animId = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, W, H);
      frame++;
      waveOffset += 0.4;

      // nautical grid (chart lines)
      ctx.setLineDash([4, 8]);
      ctx.lineWidth = 0.4;
      for (let gx = 0; gx < W; gx += 90) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(0,180,150,0.06)';
        ctx.moveTo(gx, 0); ctx.lineTo(gx, H);
        ctx.stroke();
      }
      for (let gy = 0; gy < H; gy += 70) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(0,180,150,0.06)';
        ctx.moveTo(0, gy); ctx.lineTo(W, gy);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // background waves
      drawWave(H * 0.25, 6, 8, waveOffset, 0.04);
      drawWave(H * 0.5, 9, 6, waveOffset * 0.8, 0.05);
      drawWave(H * 0.75, 5, 10, waveOffset * 1.2, 0.03);

      // ship routes (curved bezier)
      routes.forEach((r) => {
        const a = ports[r.from], b = ports[r.to];
        ctx.beginPath();
        ctx.setLineDash([6, 10]);
        ctx.lineWidth = 0.9;
        const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
        grad.addColorStop(0, 'rgba(0,212,177,0.18)');
        grad.addColorStop(0.5, 'rgba(0,160,220,0.22)');
        grad.addColorStop(1, 'rgba(0,212,177,0.18)');
        ctx.strokeStyle = grad;
        ctx.moveTo(a.x, a.y);
        ctx.bezierCurveTo(r.cp1x, r.cp1y, r.cp2x, r.cp2y, b.x, b.y);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // ports (beacons)
      ports.forEach((p) => {
        p.pulse += p.pulseSpeed;
        const glow = Math.sin(p.pulse) * 0.5 + 0.5;
        // sonar ring
        const ring = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 20 + glow * 14);
        ring.addColorStop(0, `rgba(0,212,177,${glow * 0.18})`);
        ring.addColorStop(1, 'rgba(0,212,177,0)');
        ctx.beginPath();
        ctx.fillStyle = ring;
        ctx.arc(p.x, p.y, 20 + glow * 14, 0, Math.PI * 2);
        ctx.fill();
        // port dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (0.85 + glow * 0.3), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,212,177,${0.65 + glow * 0.35})`;
        ctx.fill();
        // cross marker
        ctx.strokeStyle = `rgba(0,212,177,${0.3 + glow * 0.2})`;
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        ctx.moveTo(p.x - 8, p.y); ctx.lineTo(p.x + 8, p.y);
        ctx.moveTo(p.x, p.y - 8); ctx.lineTo(p.x, p.y + 8);
        ctx.stroke();
      });

      // vessels
      vessels.forEach((v) => {
        v.t += v.speed * v.direction;
        if (v.t > 1) { v.t = 1; v.direction = -1; }
        if (v.t < 0) { v.t = 0; v.direction = 1; }

        const r = routes[v.routeIdx];
        const pa = ports[r.from], pb = ports[r.to];
        const vx = bezierPoint(v.t, pa.x, r.cp1x, r.cp2x, pb.x);
        const vy = bezierPoint(v.t, pa.y, r.cp1y, r.cp2y, pb.y);
        const dt = 0.02;
        const vx2 = bezierPoint(Math.min(1, v.t + dt * v.direction), pa.x, r.cp1x, r.cp2x, pb.x);
        const vy2 = bezierPoint(Math.min(1, v.t + dt * v.direction), pa.y, r.cp1y, r.cp2y, pb.y);
        const angle = Math.atan2(vy2 - vy, vx2 - vx);

        // wake trail
        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
          const bt = Math.max(0, Math.min(1, v.t - v.direction * i * 0.012));
          const wx = bezierPoint(bt, pa.x, r.cp1x, r.cp2x, pb.x);
          const wy = bezierPoint(bt, pa.y, r.cp1y, r.cp2y, pb.y);
          if (i === 0) ctx.moveTo(wx, wy);
          else ctx.lineTo(wx, wy);
        }
        ctx.strokeStyle = `rgba(0,180,200,${0.18})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        drawShip(vx, vy, angle, 'rgba(0,230,190,0.85)');
      });
    };

    resize();
    window.addEventListener('resize', resize);
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0.75 }} />
  );
}
