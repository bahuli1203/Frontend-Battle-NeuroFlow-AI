"use client";

import React, { useRef, useState, useEffect } from "react";
import { Layers, BarChart3, Settings2, DollarSign, Command, HelpCircle } from "lucide-react";

interface DockItem {
  label: string;
  icon: React.ReactNode;
  action: () => void;
}

export default function GlassDock() {
  const dockRef = useRef<HTMLDivElement | null>(null);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [scales, setScales] = useState<number[]>([1, 1, 1, 1, 1, 1]);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const items: DockItem[] = [
    {
      label: "Features Stack",
      icon: <Layers className="w-4 h-4 sm:w-5 sm:h-5" />,
      action: () => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      label: "System Dashboard",
      icon: <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />,
      action: () => document.getElementById("dashboard")?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      label: "Pipeline Builder",
      icon: <Settings2 className="w-4 h-4 sm:w-5 sm:h-5" />,
      action: () => document.getElementById("workflow-builder")?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      label: "Compute Pricing",
      icon: <DollarSign className="w-4 h-4 sm:w-5 sm:h-5" />,
      action: () => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      label: "Command Palette",
      icon: <Command className="w-4 h-4 sm:w-5 sm:h-5" />,
      action: () => {
        window.dispatchEvent(
          new KeyboardEvent("keydown", { key: "k", ctrlKey: true })
        );
      },
    },
    {
      label: "Listen to AI Guide",
      icon: <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5" />,
      action: () => {
        const synth = window.speechSynthesis;
        if (synth) {
          if (synth.speaking) {
            synth.cancel();
          } else {
            const utter = new SpeechSynthesisUtterance("Welcome to NeuroFlow AI. Press Control K to open your command matrix.");
            utter.rate = 1.05;
            synth.speak(utter);
          }
        }
      },
    },
  ];

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return; // Disable hover magnification on touch viewports
    
    const mouseX = e.clientX;
    const threshold = 100;

    const newScales = items.map((_, idx) => {
      const btn = buttonRefs.current[idx];
      if (!btn) return 1;

      const rect = btn.getBoundingClientRect();
      const btnCenterX = rect.left + rect.width / 2;
      const distance = Math.abs(mouseX - btnCenterX);

      if (distance < threshold) {
        const power = (threshold - distance) / threshold;
        return 1 + power * 0.35;
      }
      return 1;
    });

    setScales(newScales);
  };

  const handleMouseLeave = () => {
    setScales(items.map(() => 1));
    setActiveTooltip(null);
  };

  const baseSize = isMobile ? 34 : 40;

  return (
    <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-[95vw] pointer-events-none select-none">
      <div
        ref={dockRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="pointer-events-auto flex items-end justify-center gap-2 sm:gap-3.5 px-3.5 py-2 sm:px-5 sm:py-3 rounded-2xl glass-panel-heavy border border-white/10 shadow-2xl glass-card-glow-purple transition-all duration-300"
      >
        {items.map((item, idx) => (
          <div key={idx} className="relative flex flex-col items-center">
            {/* Tooltip (Only on desktop) */}
            {!isMobile && activeTooltip === item.label && (
              <span className="absolute bottom-[130%] text-[9px] font-heading font-semibold text-white px-2 py-1 rounded bg-[#0B1026] border border-white/10 shadow-md whitespace-nowrap animate-fade-in-up uppercase tracking-widest">
                {item.label}
              </span>
            )}

            <button
              ref={(el) => {
                buttonRefs.current[idx] = el;
              }}
              onClick={item.action}
              onMouseEnter={() => !isMobile && setActiveTooltip(item.label)}
              onMouseLeave={() => !isMobile && setActiveTooltip(null)}
              className="relative flex items-center justify-center rounded-xl bg-white/5 border border-white/5 hover:bg-[#7B61FF]/20 hover:border-[#7B61FF]/40 text-muted hover:text-white transition-all duration-100 outline-none"
              style={{
                width: `${baseSize * scales[idx]}px`,
                height: `${baseSize * scales[idx]}px`,
                transform: `scale3d(${scales[idx]}, ${scales[idx]}, 1)`,
                transformOrigin: "bottom center",
                willChange: "transform, width, height",
              }}
              aria-label={item.label}
            >
              {item.icon}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
