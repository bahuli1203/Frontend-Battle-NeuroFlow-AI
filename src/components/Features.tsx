"use client";

import React, { useState, useRef } from "react";
import {
  ArrowTrendingUpIcon,
  CubeSolidIcon,
  LinkSolidIcon,
  ChevronDownIcon,
  ChartPieIcon,
  ArrowPathIcon,
  TerminalIcon,
  Cog8ToothIcon,
} from "@/components/icons/CustomIcons";
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
      title: "AI Agents",
      shortDesc: "Deploy context-aware cognitive agents that self-correct.",
      longDesc: "Deploy autonomous cognitive agents that query database schemas, handle API connections, and self-correct workflow exceptions in real-time.",
      icon: <ChartPieIcon className="w-5 h-5 text-[#FF9932]" />,
      color: "from-[#FF9932] to-[#FFC801]",
      borderColor: "rgba(255, 153, 50, 0.25)",
      glowColor: "rgba(255, 153, 50, 0.15)",
      gridClass: "md:col-span-8 md:row-span-1",
      visual: (
        <div className="relative w-full h-full min-h-[170px] bg-gradient-to-br from-[#114C5A]/40 to-[#172B36] rounded-xl border border-white/5 p-4 overflow-hidden flex flex-col justify-between">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] uppercase tracking-widest text-[#FF9932] font-heading font-bold">Agent Cells</span>
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#FFC801]/10 border border-[#FFC801]/20 text-[9px] text-[#FFC801] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFC801] animate-ping" />
              Active
            </span>
          </div>
          {/* Floating particles animation */}
          <div className="relative h-16 w-full overflow-hidden flex items-center justify-around">
            <div className="absolute top-[20%] left-[20%] w-2 h-2 rounded-full bg-[#FF9932]/70 animate-float" />
            <div className="absolute bottom-[30%] left-[45%] w-3 h-3 rounded-full bg-[#FFC801]/50 animate-float-delayed" />
            <div className="absolute top-[40%] right-[25%] w-2 h-2 rounded-full bg-[#D9E8E2]/60 animate-float" />
            <div className="absolute bottom-[10%] right-[10%] w-1.5 h-1.5 rounded-full bg-[#FF9932] animate-float-delayed" />
            
            {/* Visual synapse mesh placeholder */}
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xs text-white/80 font-mono">Agent-A</div>
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xs text-white/80 font-mono">Agent-B</div>
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xs text-white/80 font-mono">Agent-C</div>
          </div>
          <div className="h-8 rounded-lg bg-[#FF9932]/10 border border-[#FF9932]/20 flex items-center justify-center text-xs text-[#FF9932] font-semibold font-heading">
            18.4k tasks evaluated/sec
          </div>
        </div>
      ),
    },
    {
      id: 1,
      title: "Predictive Analytics",
      shortDesc: "Project database volumes and scale dynamically.",
      longDesc: "Leverage regression pipelines to project key transaction metrics and automatically scale compute nodes to handle traffic surges up to 90 days out.",
      icon: <ArrowTrendingUpIcon className="w-5 h-5 text-[#FF9932]" />,
      color: "from-[#FF9932] to-[#D9E8E2]",
      borderColor: "rgba(255, 153, 50, 0.25)",
      glowColor: "rgba(255, 153, 50, 0.15)",
      gridClass: "md:col-span-4 md:row-span-1",
      visual: (
        <div className="relative w-full h-full min-h-[170px] bg-gradient-to-br from-[#114C5A]/40 to-[#172B36] rounded-xl border border-white/5 p-4 flex flex-col justify-between overflow-hidden">
          <div className="text-[10px] uppercase tracking-widest text-[#FF9932] font-heading font-bold mb-1">Compute Forecast</div>
          {/* Animated SVG line graph */}
          <div className="h-20 w-full relative">
            <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
              <path
                d="M0,35 Q 20,20 40,28 T 80,10 T 100,5"
                fill="none"
                stroke="#FF9932"
                strokeWidth="1.5"
                strokeDasharray="100"
                strokeDashoffset="100"
                className="animate-pulse"
                style={{
                  animation: "drawPath 3s ease-out forwards infinite",
                }}
              />
            </svg>
            <style>{`
              @keyframes drawPath {
                to { stroke-dashoffset: 0; }
              }
            `}</style>
          </div>
          <div className="text-center text-[10px] text-[#FFC801] font-semibold mt-1">
            +42.6% Automation Velocity
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: "Smart Integrations",
      shortDesc: "Synchronize database streams in milliseconds.",
      longDesc: "Establish zero-latency connections between AWS clusters, GCP APIs, Snowflake, Stripe, Slack, and your internal vector databases.",
      icon: <CubeSolidIcon className="w-5 h-5 text-[#FFC801]" />,
      color: "from-[#FFC801] to-[#D9E8E2]",
      borderColor: "rgba(255, 200, 1, 0.25)",
      glowColor: "rgba(255, 200, 1, 0.15)",
      gridClass: "md:col-span-4 md:row-span-1",
      visual: (
        <div className="relative w-full h-full min-h-[170px] bg-gradient-to-br from-[#114C5A]/40 to-[#172B36] rounded-xl border border-white/5 p-4 flex flex-col justify-between overflow-hidden">
          <span className="text-[10px] uppercase tracking-widest text-[#FFC801] font-heading font-bold">Sync Nodes</span>
          <div className="flex items-center justify-around py-4">
            <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-heading text-[10px] text-white">AWS</div>
            {/* Animated connection nodes */}
            <div className="w-3 h-3 rounded-full bg-[#FFC801] animate-ping" />
            <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-heading text-[10px] text-white">GCP</div>
          </div>
          <span className="text-[9px] text-muted text-center">Sync latency &lt;1.8ms</span>
        </div>
      ),
    },
    {
      id: 3,
      title: "Enterprise Security",
      shortDesc: "SOC2, GDPR, and ISO compliant shielding.",
      longDesc: "Sandboxed workflow execution and automatic hardware HSM wrap-key rotations protect core data indexes with zero-trust isolation.",
      icon: <LinkSolidIcon className="w-5 h-5 text-[#FF9932]" />,
      color: "from-[#FF9932] to-[#D9E8E2]",
      borderColor: "rgba(255, 153, 50, 0.25)",
      glowColor: "rgba(255, 153, 50, 0.15)",
      gridClass: "md:col-span-8 md:row-span-1",
      visual: (
        <div className="relative w-full h-full min-h-[170px] bg-gradient-to-br from-[#114C5A]/40 to-[#172B36] rounded-xl border border-white/5 p-4 flex flex-col justify-between overflow-hidden">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] uppercase tracking-widest text-[#FF9932] font-heading font-bold">Shield Vault</span>
            <span className="text-[10px] text-[#FFC801] font-mono">ENCRYPTED</span>
          </div>
          <div className="flex justify-around items-center py-2">
            {/* Rotating Shield Graphic */}
            <div className="w-14 h-14 rounded-full border border-[#FF9932]/20 flex items-center justify-center animate-spin-slow">
              <Cog8ToothIcon className="w-6 h-6 text-[#FF9932]" />
            </div>
            <div className="space-y-1 text-right text-[10px] font-mono">
              <div>• TLS 1.3 Strict</div>
              <div>• SOC2 Audited</div>
              <div>• ISO 27001 Certified</div>
            </div>
          </div>
          <span className="text-[9px] text-muted text-center pt-1">Automated hardware Key Rotations</span>
        </div>
      ),
    },
    {
      id: 4,
      title: "Workflow Engine",
      shortDesc: "Orchestrate complex visual flow pipelines.",
      longDesc: "Construct, test, and release visually designed pipeline schemas. Execute triggers on serverless edge executor instances instantly.",
      icon: <ArrowPathIcon className="w-5 h-5 text-[#FFC801]" />,
      color: "from-[#FFC801] to-[#FF9932]",
      borderColor: "rgba(255, 200, 1, 0.25)",
      glowColor: "rgba(255, 200, 1, 0.15)",
      gridClass: "md:col-span-7 md:row-span-1",
      visual: (
        <div className="relative w-full h-full min-h-[170px] bg-gradient-to-br from-[#114C5A]/40 to-[#172B36] rounded-xl border border-white/5 p-4 flex flex-col justify-between overflow-hidden">
          <span className="text-[10px] uppercase tracking-widest text-[#FFC801] font-heading font-bold">Pipeline Runs</span>
          {/* SVG Pipelines with animated data packets */}
          <svg className="w-full h-12" fill="none">
            <path d="M10 20 H300" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
            <path d="M10 20 H300" stroke="#FFC801" strokeWidth="3" strokeDasharray="15,40" style={{ animation: "dashFlowFeatures 3s linear infinite" }} />
          </svg>
          <style>{`
            @keyframes dashFlowFeatures {
              to { stroke-dashoffset: -55; }
            }
          `}</style>
          <span className="text-[9px] text-[#FFC801] font-mono">Status: Pipe Ingestion OK</span>
        </div>
      ),
    },
    {
      id: 5,
      title: "Real-Time Insights",
      shortDesc: "Live dashboards and instant event alerts.",
      longDesc: "Push streaming analytical pipelines directly to a logging board with microsecond synchronization times and event notification webhooks.",
      icon: <TerminalIcon className="w-5 h-5 text-[#FF9932]" />,
      color: "from-[#FF9932] to-[#FFC801]",
      borderColor: "rgba(255, 153, 50, 0.25)",
      glowColor: "rgba(255, 153, 50, 0.15)",
      gridClass: "md:col-span-5 md:row-span-1",
      visual: (
        <div className="relative w-full h-full min-h-[170px] bg-gradient-to-br from-[#114C5A]/40 to-[#172B36] rounded-xl border border-white/5 p-4 flex flex-col justify-between overflow-hidden">
          <div className="flex justify-between items-center">
            <span className="text-[10px] uppercase tracking-widest text-[#FF9932] font-heading font-bold">Terminal Telemetry</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFC801] animate-pulse" />
          </div>
          <div className="space-y-1 font-mono text-[9px] text-[#D9E8E2]">
            <div className="truncate text-white/80"><span className="text-[#FF9932]">✓</span> Data schema validated</div>
            <div className="truncate text-white/80"><span className="text-[#FF9932]">✓</span> Transferred 48.2k events</div>
            <div className="truncate text-white/85"><span className="text-[#FFC801]">ℹ</span> Synced Pinecone index</div>
          </div>
          <span className="text-[9px] text-muted">Microsecond cluster reporting</span>
        </div>
      ),
    },
  ];

  return (
    <section id="features" ref={containerRef} className="relative py-32 bg-[#172B36]">
      {/* Background radial elements */}
      <div className="absolute top-[30%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-[#FF9932]/3 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[30%] left-[10%] w-[30vw] h-[30vw] rounded-full bg-[#FFC801]/3 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-20 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFC801]" />
            <span className="text-xs font-heading font-semibold text-[#FFC801] tracking-wider uppercase">
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
                <ChevronDownIcon
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
                <div className="p-5 space-y-5 bg-[#172B36]/40">
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
          ? "bg-[#114C5A]/45 border-opacity-90"
          : "hover:bg-[#114C5A]/20 hover:border-white/10"
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
        <h3 className="font-heading font-bold text-lg text-white group-hover:text-[var(--accent-color)] transition-colors duration-200">
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
