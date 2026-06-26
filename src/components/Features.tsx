"use client";

import React, { useState, useRef } from "react";
import { Brain, TrendingUp, Cpu, ShieldAlert, BarChart3, MessageSquarePlus, ChevronDown, CheckCircle2 } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface FeatureItem {
  id: number;
  title: string;
  shortDesc: string;
  longDesc: string;
  icon: React.ReactNode;
  color: string;
  borderColor: string;
  glowColor: string;
  visual: React.ReactNode;
  gridClass: string;
}

export default function Features() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { themeColorStr } = useTheme();

  // Bento Features Data
  const features: FeatureItem[] = [
    {
      id: 0,
      title: "AI Agents Engine",
      shortDesc: "Autonomous workflows powered by LLMs.",
      longDesc: "Deploy context-aware cognitive agents that interact with databases, execute logic nodes, and self-correct workflow exceptions in real-time.",
      icon: <Brain className="w-5 h-5 text-[#00D4FF]" />,
      color: "from-[#00D4FF] to-[#7B61FF]",
      borderColor: "rgba(0, 212, 255, 0.25)",
      glowColor: "rgba(0, 212, 255, 0.15)",
      gridClass: "md:col-span-8 md:row-span-1",
      visual: (
        <div className="relative w-full h-full min-h-[160px] bg-gradient-to-br from-[#0B1026] to-[#050816] rounded-xl border border-white/5 p-4 overflow-hidden flex flex-col justify-between">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] uppercase tracking-widest text-[#00D4FF] font-bold">Agent Status</span>
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#00FFB2]/10 border border-[#00FFB2]/20 text-[9px] text-[#00FFB2] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FFB2] animate-ping" />
              Active
            </span>
          </div>
          <div className="space-y-2">
            <div className="h-6 rounded bg-white/5 border border-white/10 flex items-center px-2 justify-between text-[10px] text-white/80">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7B61FF]" />
                Extracting CSV Payload...
              </span>
              <span className="text-muted">98% Match</span>
            </div>
            <div className="h-6 rounded bg-white/5 border border-white/10 flex items-center px-2 justify-between text-[10px] text-white/80">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]" />
                Running Vector Search...
              </span>
              <span className="text-muted">0.03ms</span>
            </div>
          </div>
          <div className="h-8 rounded-lg bg-[#00D4FF]/10 border border-[#00D4FF]/20 flex items-center justify-center text-xs text-[#00D4FF] font-medium font-heading">
            14.2k operations/sec
          </div>
        </div>
      ),
    },
    {
      id: 1,
      title: "Predictive Analytics",
      shortDesc: "Forecast trends before they happen.",
      longDesc: "Leverage advanced regression models and anomaly detection pipelines to accurately project key metrics and database volumes up to 90 days out.",
      icon: <TrendingUp className="w-5 h-5 text-[#7B61FF]" />,
      color: "from-[#7B61FF] to-[#00FFB2]",
      borderColor: "rgba(123, 97, 255, 0.25)",
      glowColor: "rgba(123, 97, 255, 0.15)",
      gridClass: "md:col-span-4 md:row-span-1",
      visual: (
        <div className="relative w-full h-full min-h-[160px] bg-gradient-to-br from-[#0B1026] to-[#050816] rounded-xl border border-white/5 p-4 flex flex-col justify-between overflow-hidden">
          <div className="text-[10px] uppercase tracking-widest text-[#7B61FF] font-bold mb-2">Trend Velocity</div>
          {/* Mini dynamic chart */}
          <div className="h-20 w-full flex items-end gap-1.5 pt-2 border-b border-white/5 pb-1">
            <div className="w-full bg-[#7B61FF]/10 h-[30%] rounded-sm transition-all duration-300 hover:bg-[#7B61FF]/40" />
            <div className="w-full bg-[#7B61FF]/20 h-[45%] rounded-sm transition-all duration-300 hover:bg-[#7B61FF]/40" />
            <div className="w-full bg-[#7B61FF]/30 h-[60%] rounded-sm transition-all duration-300 hover:bg-[#7B61FF]/40" />
            <div className="w-full bg-[#00D4FF]/40 h-[80%] rounded-sm transition-all duration-300 hover:bg-[#00D4FF]/60" />
            <div className="w-full bg-gradient-to-t from-[#00FFB2]/50 to-[#00FFB2] h-[95%] rounded-sm animate-pulse" />
          </div>
          <div className="text-center text-[10px] text-[#00FFB2] font-semibold mt-1">
            +38.4% Efficiency Vector
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: "Smart Integrations",
      shortDesc: "Connect 500+ services instantly.",
      longDesc: "Zero-latency synchronization with your database stack, cloud providers, and SaaS applications with simple automated mapping triggers.",
      icon: <Cpu className="w-5 h-5 text-[#00FFB2]" />,
      color: "from-[#00FFB2] to-[#00D4FF]",
      borderColor: "rgba(0, 255, 178, 0.25)",
      glowColor: "rgba(0, 255, 178, 0.15)",
      gridClass: "md:col-span-4 md:row-span-1",
      visual: (
        <div className="relative w-full h-full min-h-[160px] bg-gradient-to-br from-[#0B1026] to-[#050816] rounded-xl border border-white/5 p-4 flex flex-col justify-between overflow-hidden">
          <span className="text-[10px] uppercase tracking-widest text-[#00FFB2] font-bold">Network Synapses</span>
          <div className="flex items-center justify-around py-4">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-heading text-xs text-white">AWS</div>
            <div className="w-4 h-[1px] bg-gradient-to-r from-white/10 to-[#00FFB2] animate-pulse" />
            <div className="w-10 h-10 rounded-full bg-[#00FFB2]/10 border border-[#00FFB2]/30 flex items-center justify-center font-heading text-xs text-[#00FFB2]">Core</div>
            <div className="w-4 h-[1px] bg-gradient-to-r from-[#00FFB2] to-white/10" />
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-heading text-xs text-white">GCP</div>
          </div>
          <span className="text-[9px] text-muted text-center">Auto-mapping active</span>
        </div>
      ),
    },
    {
      id: 3,
      title: "Enterprise Security",
      shortDesc: "SOC2, GDPR, ISO compliant infrastructure.",
      longDesc: "Military-grade data protection including end-to-end TLS 1.3 encryption, automatic key-rotation, and sandboxed execution environments for safety.",
      icon: <ShieldAlert className="w-5 h-5 text-[#7B61FF]" />,
      color: "from-[#7B61FF] to-[#00D4FF]",
      borderColor: "rgba(123, 97, 255, 0.25)",
      glowColor: "rgba(123, 97, 255, 0.15)",
      gridClass: "md:col-span-8 md:row-span-1",
      visual: (
        <div className="relative w-full h-full min-h-[160px] bg-gradient-to-br from-[#0B1026] to-[#050816] rounded-xl border border-white/5 p-4 flex flex-col justify-between overflow-hidden">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] uppercase tracking-widest text-[#7B61FF] font-bold">Certifications</span>
            <span className="text-[10px] text-[#00FFB2] font-mono">SECURE</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {["SOC2 Type II", "GDPR Ready", "ISO 27001"].map((cert, index) => (
              <div key={index} className="px-2.5 py-3 rounded-lg bg-white/5 border border-white/10 flex flex-col items-center gap-1 text-center">
                <CheckCircle2 className="w-4 h-4 text-[#00FFB2]" />
                <span className="text-[9px] font-medium text-white/80">{cert}</span>
              </div>
            ))}
          </div>
          <span className="text-[9px] text-muted text-center pt-1">Shielded via hardware HSM keys</span>
        </div>
      ),
    },
    {
      id: 4,
      title: "Real-Time Insights",
      shortDesc: "Live dashboards and instant event alerts.",
      longDesc: "Push live analytical pipelines straight to your console with microsecond synchronization times and automatic multi-channel incident notifications.",
      icon: <BarChart3 className="w-5 h-5 text-[#00D4FF]" />,
      color: "from-[#00D4FF] to-[#00FFB2]",
      borderColor: "rgba(0, 212, 255, 0.25)",
      glowColor: "rgba(0, 212, 255, 0.15)",
      gridClass: "md:col-span-7 md:row-span-1",
      visual: (
        <div className="relative w-full h-full min-h-[160px] bg-gradient-to-br from-[#0B1026] to-[#050816] rounded-xl border border-white/5 p-4 flex flex-col justify-between overflow-hidden">
          <div className="flex justify-between items-center">
            <span className="text-[10px] uppercase tracking-widest text-[#00D4FF] font-bold">Event Feed</span>
            <span className="w-2 h-2 rounded-full bg-[#00FFB2] animate-pulse" />
          </div>
          <div className="space-y-1.5 my-2">
            <div className="flex items-center gap-2 text-[9px] border-b border-white/5 pb-1">
              <span className="text-[#00FFB2]">[12:44:01]</span>
              <span className="text-white/80">Anomaly resolved inside billing cluster</span>
            </div>
            <div className="flex items-center gap-2 text-[9px] border-b border-white/5 pb-1">
              <span className="text-[#00D4FF]">[12:43:59]</span>
              <span className="text-white/80">Scaling cluster nodes +3 via auto-scale</span>
            </div>
            <div className="flex items-center gap-2 text-[9px]">
              <span className="text-[#7B61FF]">[12:43:50]</span>
              <span className="text-white/80">Ingesting raw schema payload from AWS S3</span>
            </div>
          </div>
          <span className="text-[9px] text-[#00D4FF]">Connected to server-sent events</span>
        </div>
      ),
    },
    {
      id: 5,
      title: "Natural Language Automation",
      shortDesc: "Describe workflows in plain English.",
      longDesc: "Type what process you want done, and our neural model compiles, tests, and deploys the corresponding logic flow instantly.",
      icon: <MessageSquarePlus className="w-5 h-5 text-[#00FFB2]" />,
      color: "from-[#00FFB2] to-[#7B61FF]",
      borderColor: "rgba(0, 255, 178, 0.25)",
      glowColor: "rgba(0, 255, 178, 0.15)",
      gridClass: "md:col-span-5 md:row-span-1",
      visual: (
        <div className="relative w-full h-full min-h-[160px] bg-gradient-to-br from-[#0B1026] to-[#050816] rounded-xl border border-white/5 p-4 flex flex-col justify-between overflow-hidden">
          <span className="text-[10px] uppercase tracking-widest text-[#00FFB2] font-bold">Semantic Compiler</span>
          <div className="bg-white/5 border border-white/10 rounded-lg p-2 text-[10px] text-white/70 italic my-1 font-mono">
            "When a customer pays more than $100, send their email to Slack and database."
          </div>
          <div className="flex items-center gap-2 justify-end">
            <span className="text-[9px] text-[#00FFB2] font-semibold">Compiled</span>
            <div className="h-1.5 w-16 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#00FFB2] to-[#00D4FF] w-full" />
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="features" ref={containerRef} className="relative py-32 bg-[#050816]">
      {/* Background radial elements */}
      <div className="absolute top-[30%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-[#7B61FF]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[30%] left-[10%] w-[30vw] h-[30vw] rounded-full bg-[#00D4FF]/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-20 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FFB2]" />
            <span className="text-xs font-heading font-semibold text-[#00FFB2] tracking-wider uppercase">
              Bento Intelligence Stack
            </span>
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.15]">
            Engineered For Planetary-Scale <br />
            Data Orchestration
          </h2>
          <p className="text-sm sm:text-base text-muted font-sans max-w-xl mx-auto">
            A cohesive suite of real-time AI layers and predictive engines operating inside a single, zero-latency system grid.
          </p>
        </div>

        {/* 1. DESKTOP BENTO GRID LAYOUT */}
        <div className="hidden md:grid grid-cols-12 gap-6 auto-rows-auto">
          {features.map((feat) => (
            <BentoCard
              key={feat.id}
              feat={feat}
              isActive={activeIndex === feat.id}
              onSelect={() => setActiveIndex(feat.id)}
            />
          ))}
        </div>

        {/* 2. MOBILE ACCORDION LAYOUT (Syncs Active Index seamlessly) */}
        <div className="md:hidden space-y-4">
          {features.map((feat) => (
            <div
              key={feat.id}
              className={`glass-panel border rounded-2xl overflow-hidden transition-all duration-300`}
              style={{
                borderColor: activeIndex === feat.id ? themeColorStr : "rgba(255, 255, 255, 0.05)",
                boxShadow: activeIndex === feat.id ? `0 0 25px -10px ${themeColorStr}30` : "none",
              }}
            >
              <button
                onClick={() => setActiveIndex(feat.id)}
                className="w-full flex items-center justify-between p-5 text-left bg-gradient-to-r from-white/[0.02] to-transparent"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 border border-white/10">
                    {feat.icon}
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-sm text-white">{feat.title}</h3>
                    <p className="text-[11px] text-muted">{feat.shortDesc}</p>
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-muted transition-transform duration-300 ${
                    activeIndex === feat.id ? "rotate-180 text-white" : ""
                  }`}
                />
              </button>

              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  activeIndex === feat.id ? "max-h-[500px] border-t border-white/5" : "max-h-0"
                }`}
              >
                <div className="p-5 space-y-5 bg-[#050816]/40">
                  <p className="text-xs text-muted leading-relaxed font-sans">{feat.longDesc}</p>
                  <div className="w-full aspect-[4/3] max-w-[320px] mx-auto">{feat.visual}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

interface BentoCardProps {
  feat: FeatureItem;
  isActive: boolean;
  onSelect: () => void;
}

function BentoCard({ feat, isActive, onSelect }: BentoCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const { themeColorStr } = useTheme();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // Calculate rotation (-10 to 10 degrees)
    const rotateX = (y - 0.5) * -10;
    const rotateY = (x - 0.5) * 10;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onSelect}
      className={`glass-panel border rounded-2xl p-6 transition-all duration-200 cursor-pointer flex flex-col justify-between group overflow-hidden ${
        feat.gridClass
      } ${
        isActive
          ? "bg-[#0B1026]/75 border-opacity-90"
          : "hover:bg-[#0B1026]/40 hover:border-white/10"
      }`}
      style={{
        borderColor: isActive ? themeColorStr : "rgba(255, 255, 255, 0.05)",
        boxShadow: isActive ? `0 0 40px -10px ${themeColorStr}30` : "none",
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translate3d(0, ${isActive ? "-4px" : "0px"}, 0)`,
        willChange: "transform",
      }}
    >
      {/* Glow highlight */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${themeColorStr}15, transparent 40%)`,
        }}
      />

      <div className="flex items-start justify-between mb-8 relative z-10">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 group-hover:border-white/20 transition-colors">
          {feat.icon}
        </div>
        <span
          className={`text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 rounded border transition-colors ${
            isActive
              ? "bg-white/10 border-white/20 text-white"
              : "bg-white/0 border-transparent text-[#94A3B8]/60"
          }`}
        >
          {isActive ? "Active Grid Focus" : "Select to Focus"}
        </span>
      </div>

      <div className="space-y-2 mb-6 relative z-10">
        <h3 className="font-heading font-bold text-lg text-white group-hover:text-[#00D4FF] transition-colors duration-200">
          {feat.title}
        </h3>
        <p className="text-xs text-muted leading-relaxed font-sans">
          {isActive ? feat.longDesc : feat.shortDesc}
        </p>
      </div>

      <div className="relative z-10 w-full overflow-hidden transition-all duration-300">
        {feat.visual}
      </div>
    </div>
  );
}
