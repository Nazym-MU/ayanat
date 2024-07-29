import React, { useEffect, useRef } from 'react';
import { FormattedMessage } from 'react-intl';

function Intro({ scrollY }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let sakuraAnimationId;
    let sakuraParticles = [];

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function createSakura() {
      return {
        x: Math.random() * canvas.width,
        y: -10,
        size: Math.random() * 10 + 2,
        speed: Math.random() * 0.5 + 0.2,
        opacity: Math.random() * 0.5 + 0.3,
      };
    }

    function drawSakura() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (sakuraParticles.length < 20 && Math.random() < 0.05) {
        sakuraParticles.push(createSakura());
      }

      sakuraParticles.forEach((sakura, index) => {
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 192, 203, ${sakura.opacity})`;
        ctx.arc(sakura.x, sakura.y, sakura.size, 0, Math.PI * 2);
        ctx.fill();

        sakura.y += sakura.speed;

        if (sakura.y > canvas.height) {
          sakuraParticles.splice(index, 1);
        }
      });

      sakuraAnimationId = requestAnimationFrame(drawSakura);
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    drawSakura();

    return () => {
      cancelAnimationFrame(sakuraAnimationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <section className="intro">
      <canvas ref={canvasRef} className="sakura-canvas" />
      <div className="intro-content" style={{ transform: `translateY(${scrollY * 0.5}px)` }}>
        <h1 className="brush-stroke">
          <FormattedMessage id="intro.title" defaultMessage="I am Ayanat" />
        </h1>
        <p className="fade-in">
          <FormattedMessage id="intro.description" defaultMessage="Blending traditional techniques with modern vision" />
        </p>
      </div>
    </section>
  );
}

export default Intro;