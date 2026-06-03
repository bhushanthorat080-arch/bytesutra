import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import Sparkles from 'lucide-react/dist/esm/icons/sparkles';
import Terminal from 'lucide-react/dist/esm/icons/terminal';
import Activity from 'lucide-react/dist/esm/icons/activity';
import Layers from 'lucide-react/dist/esm/icons/layers';
import Play from 'lucide-react/dist/esm/icons/play';
import Zap from 'lucide-react/dist/esm/icons/zap';
import ArrowDown from 'lucide-react/dist/esm/icons/arrow-down';
import Cpu from 'lucide-react/dist/esm/icons/cpu';
import ShieldAlert from 'lucide-react/dist/esm/icons/shield-alert';
import CheckCircle2 from 'lucide-react/dist/esm/icons/check-circle-2';

export const Interactive3DPortal: React.FC = () => {
  // Glow variant selectors
  const [activeEngineGlow, setActiveEngineGlow] = useState<'royal' | 'violet' | 'emerald'>('royal');
  const [selectedSubnode, setSelectedSubnode] = useState<string>('scaling');

  // Track coordinates for rotation angles (-15deg to +15deg)
  const rotateX = useSpring(useMotionValue(0), { stiffness: 100, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 100, damping: 20 });

  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);
  const currentRotationRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Handle desktop cursor hover movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || dragStartRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Relative coordinates between -0.5 and 0.5
    const relativeX = (e.clientX - rect.left) / width - 0.5;
    const relativeY = (e.clientY - rect.top) / height - 0.5;

    // Set rotation multiplier (max 20 degrees deviation)
    rotateX.set(-relativeY * 30);
    rotateY.set(relativeX * 30);
  };

  const handleMouseLeave = () => {
    // Return to zero baseline rotation smoothly
    if (!dragStartRef.current) {
      rotateX.set(0);
      rotateY.set(0);
    }
  };

  // Mobile Swipe/Drag 3D Rotator Interface
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      dragStartRef.current = { x: touch.clientX, y: touch.clientY };
      currentRotationRef.current = { x: rotateX.get(), y: rotateY.get() };
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!dragStartRef.current || e.touches.length !== 1) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - dragStartRef.current.x;
    const deltaY = touch.clientY - dragStartRef.current.y;

    // Convert pixel movement to angle degrees (sensitivity divisor)
    const newRotateY = currentRotationRef.current.y + deltaX * 0.25;
    const newRotateX = currentRotationRef.current.x - deltaY * 0.25;

    // Keep angles within enjoyable thresholds (-45deg to 45deg)
    const clampedY = Math.max(-45, Math.min(45, newRotateY));
    const clampedX = Math.max(-45, Math.min(45, newRotateX));

    rotateX.set(clampedX);
    rotateY.set(clampedY);
  };

  const handleTouchEnd = () => {
    dragStartRef.current = null;
    // Animate back to resting state
    rotateX.set(0);
    rotateY.set(0);
  };

  // Auto oscillating pulse when resting to prompt visitor interaction
  useEffect(() => {
    let frameId: number;
    let angle = 0;
    
    const animateRestState = () => {
      // Only oscillate if no gestures are currently active on desktop/mobile
      if (!dragStartRef.current && rotateX.get() === 0 && rotateY.get() === 0) {
        angle += 0.015;
        // Subtle drift movement
        const driftX = Math.sin(angle) * 7.5;
        const driftY = Math.cos(angle * 0.7) * 7.5;
        
        rotateX.set(driftX);
        rotateY.set(driftY);
      }
      frameId = requestAnimationFrame(animateRestState);
    };

    frameId = requestAnimationFrame(animateRestState);
    return () => cancelAnimationFrame(frameId);
  }, []);

  // Glow classes dictionary
  const themeColors = {
    royal: {
      glow: 'shadow-[0_0_60px_-10px_rgba(30,58,138,0.3)] bg-gradient-to-tr from-blue-900/10 via-sky-600/5 to-transparent',
      border: 'border-blue-500/25',
      accent: 'bg-blue-600 text-blue-50 border-blue-400/30',
      textAccent: 'text-blue-600',
      chipGlow: 'bg-blue-500'
    },
    violet: {
      glow: 'shadow-[0_0_60px_-10px_rgba(124,58,237,0.3)] bg-gradient-to-tr from-purple-900/10 via-amethyst-500/5 to-transparent',
      border: 'border-purple-500/25',
      accent: 'bg-purple-600 text-purple-50 border-purple-400/30',
      textAccent: 'text-purple-600',
      chipGlow: 'bg-purple-500'
    },
    emerald: {
      glow: 'shadow-[0_0_60px_-10px_rgba(34,197,94,0.25)] bg-gradient-to-tr from-emerald-900/10 via-teal-600/5 to-transparent',
      border: 'border-[#22c55e]/25',
      accent: 'bg-emerald-600 text-emerald-50 border-[#22c55e]/30',
      textAccent: 'text-emerald-600',
      chipGlow: 'bg-emerald-500'
    }
  }[activeEngineGlow];

  return (
    <div className="w-full max-w-lg mx-auto px-1 mt-6 mb-16 relative">
      
      {/* Decorative Outer Aura Glow Ring */}
      <div className={`absolute inset-0 rounded-[2.5rem] blur-2xl transition-all duration-1000 -z-10 opacity-70 ${
        activeEngineGlow === 'royal' ? 'bg-blue-500/10' : activeEngineGlow === 'violet' ? 'bg-purple-500/10' : 'bg-[#22c55e]/10'
      }`} />

      {/* Main Perspective Stage Frame */}
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="w-full h-[520px] rounded-[3rem] p-[3px] bg-gradient-to-b from-white/90 via-slate-100/40 to-slate-200/90 shadow-[0_15px_35px_rgba(15,23,42,0.06)] border border-white/80 overflow-hidden relative cursor-grab active:cursor-grabbing perspective-1000 select-none"
      >
        
        {/* Sub-node Quick Switch Controllers Overlay (Stationary inside frame for better UX) */}
        <div className="absolute top-5 left-5 right-5 z-20 flex justify-between items-center bg-white/75 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-white/50 shadow-sm">
          <div className="flex gap-1">
            <span className={`w-2 h-2 rounded-full ${themeColors.chipGlow} animate-ping`} />
            <span className="text-[10px] font-mono tracking-wider font-extrabold text-slate-500 uppercase">
              Holographic Core: Active
            </span>
          </div>

          <div className="flex gap-1">
            {(['royal', 'violet', 'emerald'] as const).map((variant) => (
              <button
                key={variant}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveEngineGlow(variant);
                }}
                className={`w-4 h-4 rounded-full border transition-transform hover:scale-125 cursor-pointer ${
                  variant === 'royal' ? 'bg-blue-600 border-blue-400' : variant === 'violet' ? 'bg-purple-600 border-purple-400' : 'bg-emerald-600 border-emerald-400'
                } ${activeEngineGlow === variant ? 'ring-2 ring-slate-400 ring-offset-2 scale-110' : 'opacity-80'}`}
              />
            ))}
          </div>
        </div>

        {/* 3D TILT ENGINE LAYER (The main rotating card) */}
        <motion.div
          style={{ 
            rotateX, 
            rotateY,
            transformStyle: 'preserve-3d'
          }}
          className={`w-full h-full rounded-[2.85rem] px-6 pt-16 pb-8 relative flex flex-col justify-between transition-colors duration-700 ${themeColors.glow}`}
        >
          {/* BACKGROUND LAYER ELEMENTS (Deep perspective) */}
          <div className="absolute inset-0 bg-white/40 backdrop-blur-xl rounded-[2.85rem] pointer-events-none" />

          {/* Holographic grid overlay to emphasize 3D scale depth */}
          <div 
            style={{ transform: 'translateZ(-40px)' }}
            className={`absolute inset-6 rounded-[2.25rem] border border-dashed text-slate-300 pointer-events-none opacity-40 ${themeColors.border} flex items-center justify-center`}
          >
            <div className="w-11/12 h-5/6 border border-dashed border-slate-200/50 rounded-2xl relative flex items-center justify-center">
              <span className="absolute w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
              <span className="absolute h-full w-px bg-gradient-to-b from-transparent via-slate-200 to-transparent" />
            </div>
          </div>

          {/* FRONT FLOATING MODULES (Protruding forward out of card with translateZ) */}
          
          {/* Main Floating Sphere / Central Engine Wireframe */}
          <div 
            style={{ 
              transform: 'translateZ(65px)',
            }}
            className="w-40 h-40 mx-auto mt-6 rounded-full relative flex items-center justify-center bg-white/80 border border-white shadow-[0_12px_36px_rgba(15,23,42,0.06)] overflow-hidden"
          >
            {/* Spinning vector ring */}
            <div className={`absolute inset-2.5 rounded-full border border-dashed animate-[spin_10s_linear_infinite] opacity-60 ${themeColors.border}`} />
            <div className="absolute inset-6 rounded-full border border-slate-100 flex items-center justify-center animate-[spin_6s_linear_infinite_reverse]">
              <div className="w-2.5 h-2.5 rounded-full bg-[#1e3a8a] absolute -top-1 shadow-[0_0_8px_#38bdf8]" />
            </div>

            {/* Pulsing Core Chip */}
            <motion.div 
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className={`w-20 h-20 rounded-3xl flex flex-col items-center justify-center border text-white shadow-lg shadow-blue-500/5 ${themeColors.accent}`}
            >
              <Cpu className="w-8 h-8 drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)] animate-[pulse_1.5s_infinite]" />
              <span className="text-[8px] font-mono font-bold uppercase mt-1 tracking-widest leading-none">
                Sutra V3
              </span>
            </motion.div>

            {/* Glowing floating satellites */}
            <div className="absolute w-2 h-2 rounded-full bg-[#0ea5e9] -top-3 shadow-md animate-pulse" />
            <div className="absolute w-1.5 h-1.5 rounded-full bg-[#7c3aed] -bottom-2 shadow-md" />
          </div>

          {/* Left Wing Tag: Performance HUD System Status (Floating slightly high) */}
          <div 
            style={{ 
              transform: 'translateZ(90px) translateX(-20px)',
            }}
            className="absolute left-6 top-1/3 bg-white/95 border border-slate-200/50 p-3 rounded-2xl shadow-[0_8px_20px_-3px_rgba(15,23,42,0.08)] flex items-center gap-2.5 max-w-[155px]"
          >
            <div className="p-1.5 rounded-lg bg-[#22c55e]/10">
              <Activity className="w-3.5 h-3.5 text-[#22c55e]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[8px] font-mono font-bold text-slate-400 uppercase tracking-wider">Speed metrics</span>
              <span className="text-[11px] font-extrabold text-slate-800 tracking-tight mt-0.5 leading-none">0.28s Load</span>
            </div>
          </div>

          {/* Right Wing Tag: Verified conversion impact widget */}
          <div 
            style={{ 
              transform: 'translateZ(105px) translateX(25px)',
            }}
            className="absolute right-6 top-[40%] bg-gradient-to-r from-slate-900 to-slate-850 text-white p-3.5 rounded-2xl shadow-[0_12px_24px_-4px_rgba(30,58,138,0.15)] flex items-center gap-2.5 max-w-[160px]"
          >
            <div className="p-1.5 rounded-lg bg-white/10 text-sky-400">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[8px] font-mono text-sky-300 uppercase tracking-widest font-bold">Conversion delta</span>
              <span className="text-[11px] font-black text-white mt-0.5 leading-none">+114% Gain</span>
            </div>
          </div>

          {/* Lower Center Floating Overlay Badge (Highest protrusion translateZ) */}
          <div 
            style={{ 
              transform: 'translateZ(120px) translateY(-5px)',
            }}
            className="mx-auto w-11/12 bg-white border border-slate-200 p-4 rounded-3xl shadow-[0_16px_36px_rgba(15,23,42,0.1)] flex items-center gap-3.5 mt-4"
          >
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
              <Terminal className={`w-4 h-4 ${themeColors.textAccent} font-bold`} />
            </span>
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black text-slate-800 font-sans tracking-tight">Interactive Systems Demo</span>
                <span className="bg-[#22c55e]/10 text-[#22c55e] text-[8px] font-semibold px-1.5 py-0.5 rounded-full uppercase scale-90">Live</span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium leading-relaxed mt-0.5">
                Swipe left / right or drag to tilt & test responsive engine.
              </p>
            </div>
          </div>

          {/* Interactive Navigation Pills for deeper exploration */}
          <div 
            style={{ transform: 'translateZ(50px)' }}
            className="flex gap-2 items-center justify-center mt-6 p-1 bg-slate-200/55 rounded-2xl border border-white/60 backdrop-blur-md"
          >
            {[
              { id: 'scaling', label: 'Scaling Logic' },
              { id: 'security', label: 'Hardened Vault' },
              { id: 'latency', label: 'Sub-second Speed' }
            ].map((node) => (
              <button
                key={node.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSubnode(node.id);
                }}
                className={`relative px-3 py-1.5 rounded-xl text-[10px] font-black tracking-wider uppercase transition-colors pointer-events-auto cursor-pointer ${
                  selectedSubnode === node.id ? 'bg-[#1e3a8a] text-white shadow' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {node.label}
              </button>
            ))}
          </div>

          {/* Dynamic subnode response details in bottom compartment */}
          <div 
            style={{ transform: 'translateZ(30px)' }}
            className="mt-4 px-3 text-center"
          >
            <p className="text-[11px] text-slate-600 leading-relaxed max-w-[340px] mx-auto font-sans font-medium h-[32px] overflow-hidden flex items-center justify-center">
              {selectedSubnode === 'scaling' && "✔ Architecting custom logic using non-blocking microservices to scale seamlessly under heavy demand."}
              {selectedSubnode === 'security' && "✔ Built with edge-side firewalls, advanced access tokens, and robust server-side processing."}
              {selectedSubnode === 'latency' && "✔ High response speeds backed by CDN local nodes, sub-second responses, and lightweight client packages."}
            </p>
          </div>

        </motion.div>

      </div>

      {/* Floating Cue prompting visitor to scroll */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer pointer-events-none"
      >
        <span className="text-[9px] font-mono font-black uppercase tracking-[3px] text-slate-400 select-none">
          Scroll to explore
        </span>
        <ArrowDown className="w-3.5 h-3.5 text-[#1e3a8a]" />
      </motion.div>

    </div>
  );
};
