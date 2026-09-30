import React, { useEffect, useRef } from 'react';

/**
 * Living Ambient Energy Field & Particle Background for ResoX AI
 * - Dominant living warm orange ambient glow drifting continuously
 * - Secondary slow purple and cyan orbital glows
 * - Floating luminous particles with constellation connections
 * - Subtle cyber grid on dark graphite background
 * - 100% pointer-events: none, completely non-blocking, GPU-accelerated
 */
export const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    const mouse = { x: null, y: null, radius: 150 };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    // Palette: Orange Dominant (70%), Subtle Purple (20%), Faint Cyan (10%)
    const colorWeights = [
      'rgba(255, 106, 0, ',   // Electric Orange
      'rgba(255, 122, 0, ',   // Vibrant Warm Orange
      'rgba(255, 148, 51, ',  // Bright Amber Orange
      'rgba(255, 170, 77, ',  // Soft Orange Glow
      'rgba(139, 92, 246, ',  // Subtle Purple
      'rgba(0, 240, 255, ',   // Faint Cyan
    ];

    const particleCount = Math.min(Math.floor((width * height) / 16000), 65);
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.2 + 1.2,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        colorBase: colorWeights[Math.floor(Math.random() * colorWeights.length)],
        alpha: Math.random() * 0.5 + 0.25,
        pulseSpeed: Math.random() * 0.02 + 0.008,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Render connecting constellation lines in warm amber/orange
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const lineAlpha = (1 - dist / 110) * 0.14;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 122, 0, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        // Wrap boundaries seamlessly
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Gentle interactive mouse drift
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius && dist > 0) {
            const force = (mouse.radius - dist) / mouse.radius;
            const dirX = dx / dist;
            const dirY = dy / dist;
            p.x -= dirX * force * 1.8;
            p.y -= dirY * force * 1.8;
          }
        }

        // Breathing pulse
        p.alpha += Math.sin(Date.now() * p.pulseSpeed) * 0.008;
        const currentAlpha = Math.max(0.18, Math.min(0.85, p.alpha));

        // Soft radial glow aura
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        gradient.addColorStop(0, `${p.colorBase}${currentAlpha})`);
        gradient.addColorStop(1, `${p.colorBase}0)`);
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Bright particle core
        ctx.beginPath();
        ctx.fillStyle = `${p.colorBase}${Math.min(1, currentAlpha + 0.35)})`;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Living Orange Energy Glow Field (Continuous slow organic movement) */}
      <div className="bg-glow-orb-orange-main" />

      {/* Secondary Orbital Ambient Glows */}
      <div className="bg-glow-orb-purple-subtle" />
      <div className="bg-glow-orb-cyan-subtle" />

      {/* Subtle Graphite Cyber Grid */}
      <div className="cyber-ambient-grid" />

      {/* Interactive Constellation Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ mixBlendMode: 'screen', opacity: 0.85 }}
      />
    </div>
  );
};

export default ParticleBackground;
