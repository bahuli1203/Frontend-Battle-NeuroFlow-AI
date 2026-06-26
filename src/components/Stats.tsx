"use client";

import React, { useEffect, useRef, useState } from "react";
import { Activity, ShieldCheck, Globe, Cpu } from "lucide-react";

interface CounterProps {
  end: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}

export function Counter({ end, decimals = 0, suffix = "", prefix = "" }: CounterProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement | null>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTimestamp: number | null = null;
          const duration = 1800; // 1.8 seconds

          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            // Ease-out quintic animation curve
            const easeProgress = 1 - Math.pow(1 - progress, 4);
            
            setCount(easeProgress * end);

            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };

          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [end]);

  // Custom deterministic number formatter to prevent Next.js hydration mismatches
  const formatNumberValue = (val: number, dec: number) => {
    const formatted = val.toFixed(dec);
    const parts = formatted.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  return (
    <span ref={elementRef} className="tabular-nums">
      {prefix}
      {formatNumberValue(count, decimals)}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const statsData = [
    {
      label: "Platform Uptime",
      value: <Counter end={99.98} decimals={2} suffix="%" />,
      icon: <Activity className="w-5 h-5 text-[#00D4FF]" />,
      desc: "Guaranteed SLA for high-throughput nodes.",
      borderColor: "neon-border-blue-hover",
      glowColor: "glass-card-glow-blue",
    },
    {
      label: "Tasks Automated",
      value: <Counter end={10} suffix="M+" />,
      icon: <Cpu className="w-5 h-5 text-[#7B61FF]" />,
      desc: "Complex multi-agent operations completed.",
      borderColor: "neon-border-purple-hover",
      glowColor: "glass-card-glow-purple",
    },
    {
      label: "Global Enterprises",
      value: <Counter end={5000} suffix="+" />,
      icon: <ShieldCheck className="w-5 h-5 text-[#00FFB2]" />,
      desc: "Vetted SOC2 compliance & data security.",
      borderColor: "neon-border-green-hover",
      glowColor: "glass-card-glow-green",
    },
    {
      label: "Countries Scale",
      value: <Counter end={87} />,
      icon: <Globe className="w-5 h-5 text-[#00D4FF]" />,
      desc: "Federated computing clusters globally distributed.",
      borderColor: "neon-border-blue-hover",
      glowColor: "glass-card-glow-blue",
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Glow Backdrops */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[30vh] bg-[#7B61FF]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, idx) => (
            <div
              key={idx}
              className={`glass-panel border rounded-2xl p-6 transition-all duration-300 ${stat.borderColor} ${stat.glowColor} group hover:-translate-y-1 hover:bg-[#0B1026]/60`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 group-hover:border-white/20 transition-colors">
                  {stat.icon}
                </div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#94A3B8]/60 group-hover:text-white/60 transition-colors">
                  Live Counter
                </span>
              </div>
              <h3 className="font-heading font-bold text-4xl text-white tracking-tight mb-1">
                {stat.value}
              </h3>
              <p className="text-sm font-heading font-medium text-white/80 mb-1">
                {stat.label}
              </p>
              <p className="text-xs text-muted font-sans leading-relaxed">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
