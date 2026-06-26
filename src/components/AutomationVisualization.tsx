"use client";

import React, { useState } from "react";
import { Database, Cpu, Brain, Zap, CheckCircle2 } from "lucide-react";

export default function AutomationVisualization() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      id: 0,
      title: "Data Sources",
      icon: <Database className="w-6 h-6 text-[#FFC801]" />,
      desc: "Ingests raw database queries, user webhooks, logs, and CSV blobs.",
      techs: ["PostgreSQL", "Stripe", "S3 Bucket", "APIs"],
      glowClass: "shadow-[#FFC801]/10 border-[#FFC801]/30",
      textColor: "text-[#FFC801]",
    },
    {
      id: 1,
      title: "AI Processing",
      icon: <Cpu className="w-6 h-6 text-[#FF9932]" />,
      desc: "Tokenizes payloads, aligns vector embeddings, and checks schema structures.",
      techs: ["Embeddings", "Tokenization", "Pinecone"],
      glowClass: "shadow-[#FF9932]/10 border-[#FF9932]/30",
      textColor: "text-[#FF9932]",
    },
    {
      id: 2,
      title: "Decision Engine",
      icon: <Brain className="w-6 h-6 text-[#D9E8E2]" />,
      desc: "Executes LLM reasoning paths and filters anomaly thresholds.",
      techs: ["LLM Agents", "Logic Nodes", "Confidence"],
      glowClass: "shadow-[#D9E8E2]/10 border-[#D9E8E2]/30",
      textColor: "text-[#D9E8E2]",
    },
    {
      id: 3,
      title: "Automation Layer",
      icon: <Zap className="w-6 h-6 text-[#FFC801]" />,
      desc: "Deploys lambda functions, reports analytics, and triggers webhooks.",
      techs: ["Lambda", "Slack Alerts", "GraphQL Sync"],
      glowClass: "shadow-[#FFC801]/10 border-[#FFC801]/30",
      textColor: "text-[#FFC801]",
    },
    {
      id: 4,
      title: "Business Impact",
      icon: <CheckCircle2 className="w-6 h-6 text-[#FF9932]" />,
      desc: "Delivers quantified ROI audits and direct efficiency gains.",
      techs: ["Analytics", "PDF Reports", "ROI Dashboard"],
      glowClass: "shadow-[#FF9932]/10 border-[#FF9932]/30",
      textColor: "text-[#FF9932]",
    },
  ];

  return (
    <section id="process" className="relative py-32 bg-[#172B36] border-y border-white/5 overflow-hidden">
      {/* Background neon elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[30vh] bg-[#FFC801]/2 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-24 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFC801]" />
            <span className="text-xs font-heading font-semibold text-[#FFC801] tracking-wider uppercase">
              Synaptic Ingestion Pipe
            </span>
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.15]">
            Enterprise Architecture
          </h2>
          <p className="text-sm sm:text-base text-muted font-sans max-w-xl mx-auto">
            Watch how incoming client streams compile through the cognitive model stack to output autonomous operations.
          </p>
        </div>

        {/* Horizontal Visualizer on Desktop, Stack on Mobile */}
        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-4 mt-12">
          {/* Animated SVG connecting lines behind nodes (Desktop only) */}
          <div className="hidden lg:block absolute top-[28px] left-[5%] right-[5%] h-1 z-0 pointer-events-none">
            <svg className="w-full h-10 overflow-visible" fill="none">
              <path
                d="M0 5 H900"
                stroke="rgba(255, 255, 255, 0.04)"
                strokeWidth="2"
                strokeDasharray="4,4"
              />
              <path
                d="M0 5 H900"
                stroke="url(#neonFlowGrad)"
                strokeWidth="2.5"
                strokeDasharray="8,14"
                className="animate-pulse"
                style={{
                  strokeDashoffset: -20,
                  animation: "dashFlow 2.5s linear infinite",
                }}
              />
              <defs>
                <linearGradient id="neonFlowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFC801" />
                  <stop offset="35%" stopColor="#FF9932" />
                  <stop offset="70%" stopColor="#D9E8E2" />
                  <stop offset="100%" stopColor="#FFC801" />
                </linearGradient>
              </defs>
            </svg>
            <style>{`
              @keyframes dashFlow {
                to { stroke-dashoffset: -80; }
              }
            `}</style>
          </div>

          {/* Node columns */}
          {steps.map((step, idx) => (
            <div
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className={`w-full lg:w-[19%] glass-panel border rounded-2xl p-5 relative z-10 transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[220px] ${
                activeStep === step.id
                  ? `bg-[#114C5A]/50 border-opacity-100 shadow-xl ${step.glowClass}`
                  : "hover:bg-[#114C5A]/20 hover:border-white/10"
              }`}
              style={{
                transform: activeStep === step.id ? "scale(1.03)" : "scale(1)",
              }}
            >
              {/* Arrow connector on mobile */}
              {idx < steps.length - 1 && (
                <div className="absolute bottom-[-32px] left-1/2 -translate-x-1/2 lg:hidden text-muted text-lg animate-bounce">
                  ↓
                </div>
              )}

              <div>
                <div className="flex justify-between items-center mb-4">
                  <div
                    className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-all ${
                      activeStep === step.id ? "scale-105" : ""
                    }`}
                  >
                    {step.icon}
                  </div>
                  <span className="text-[10px] text-muted font-bold font-mono">
                    STAGE-0{step.id + 1}
                  </span>
                </div>

                <h3
                  className={`font-heading font-extrabold text-sm mb-2 transition-colors ${
                    activeStep === step.id ? step.textColor : "text-white"
                  }`}
                >
                  {step.title}
                </h3>
                <p className="text-[11px] text-muted leading-relaxed font-sans mb-4">
                  {step.desc}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5 mt-auto">
                {step.techs.map((t, i) => (
                  <span
                    key={i}
                    className="text-[8px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-white/70"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
