import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState<string | null>(null);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'engine' | 'piano' | 'link'>('default');

  const mousePos = useRef({ x: -100, y: -100 });
  const circlePos = useRef({ x: -100, y: -100 });
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }

      // Check what is being hovered
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('button, a, input, textarea, [data-cursor]');
        if (interactive) {
          setIsHovered(true);
          const customAttr = interactive.getAttribute('data-cursor');
          if (customAttr === 'engine') {
            setCursorType('engine');
            setHoverText('IGNITE');
          } else if (customAttr === 'piano') {
            setCursorType('piano');
            setHoverText('PLAY');
          } else if (customAttr === 'view') {
            setCursorType('link');
            setHoverText('EXPLORE');
          } else {
            setCursorType('link');
            setHoverText(null);
          }
        } else {
          setIsHovered(false);
          setHoverText(null);
          setCursorType('default');
        }
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Fast, silky smooth following animation loop
    let animationFrameId: number;

    const render = () => {
      // Lerp factor 0.42 for agile, immediate tracking with light fluid feel
      circlePos.current.x += (mousePos.current.x - circlePos.current.x) * 0.42;
      circlePos.current.y += (mousePos.current.y - circlePos.current.y) * 0.42;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${circlePos.current.x}px, ${circlePos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Precision Core Dot (exactly centered on cursor) */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none transition-[background-color,box-shadow,transform] duration-150 ease-out ${
          cursorType === 'engine'
            ? 'bg-red-500 shadow-[0_0_12px_#ef4444]'
            : cursorType === 'piano'
            ? 'bg-purple-400 shadow-[0_0_12px_#a855f7]'
            : 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]'
        } ${isClicking ? 'scale-75' : ''}`}
      />

      {/* Trailing Ring (Always perfectly aligned circle, light fluid tracking) */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full flex items-center justify-center pointer-events-none transition-[width,height,border-color,background-color,box-shadow] duration-200 ease-out ${
          isHovered
            ? cursorType === 'engine'
              ? 'w-16 h-16 border border-red-500/70 bg-red-950/20 backdrop-blur-[2px] shadow-[0_0_20px_rgba(239,68,68,0.35)]'
              : cursorType === 'piano'
              ? 'w-14 h-14 border border-purple-400/70 bg-purple-950/20 backdrop-blur-[2px] shadow-[0_0_20px_rgba(168,85,247,0.35)]'
              : 'w-12 h-12 border border-cyan-400/60 bg-white/5 backdrop-blur-[2px] shadow-[0_0_16px_rgba(34,211,238,0.25)]'
            : 'w-9 h-9 border border-white/40 bg-transparent'
        } ${isClicking ? 'scale-90 opacity-80' : 'opacity-100'}`}
      >
        {hoverText && (
          <span className="text-[8px] font-mono tracking-widest uppercase font-semibold text-neutral-200 select-none">
            {hoverText}
          </span>
        )}
      </div>
    </div>
  );
};
