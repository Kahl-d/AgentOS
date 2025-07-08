import React, { useEffect, useRef } from 'react';

// Modern, soft, abstract parallax wallpaper
export default function Wallpaper() {
  const layersRef = useRef([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      layersRef.current.forEach((layer, i) => {
        if (layer) {
          const depth = (i + 1) * 12;
          layer.style.transform = `translate3d(${x * depth}px, ${y * depth}px, 0)`;
        }
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="wallpaper-root" aria-hidden>
      <div
        className="wallpaper-layer wallpaper-blur1"
        ref={el => (layersRef.current[0] = el)}
      />
      <div
        className="wallpaper-layer wallpaper-blur2"
        ref={el => (layersRef.current[1] = el)}
      />
      <div
        className="wallpaper-layer wallpaper-shape1"
        ref={el => (layersRef.current[2] = el)}
      />
      <div
        className="wallpaper-layer wallpaper-shape2"
        ref={el => (layersRef.current[3] = el)}
      />
    </div>
  );
} 