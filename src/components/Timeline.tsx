"use client";

import React, { useEffect, useRef, useState } from "react";
import { Database, Brain, Zap, CheckCircle2 } from "lucide-react";

interface TimelineStep {
  id: number;
  title: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
  textColor: string;
}

export default function Timeline() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const steps: TimelineStep[] = [
    {
      id: 0,
      title: "Raw Data Ingestion",
      desc: "Connect and stream raw database queries, user webhooks, logs, and files. Auto-mapping constructs schemas in milliseconds.",
      icon: <Database className="w-5 h-5" />,
      color: "bg-[#FFC801]",
      textColor: "text-[#FFC801]"
    },
    {
      id: 1,
      title: "AI Semantic Understanding",
      desc: "Tokenize inputs, align vector embeddings, and route payloads through cognitive models for intent scoring.",
      icon: <Brain className="w-5 h-5" />,
      color: "bg-[#FF9932]",
      textColor: "text-[#FF9932]"
    },
    {
      id: 2,
      title: "Autonomous Automation Engine",
      desc: "Map decisions directly to serverless code blocks, trigger lambdas, and synchronize API database layers.",
      icon: <Zap className="w-5 h-5" />,
      color: "bg-[#D9E8E2]",
      textColor: "text-[#D9E8E2]"
    },
    {
      id: 3,
      title: "Quantified Business Results",
      desc: "Deliver automated ROI dashboards, compile PDF reports, and scale edge instances with sub-50ms latency.",
      icon: <CheckCircle2 className="w-5 h-5" />,
      color: "bg-[#FFC801]",
      textColor: "text-[#FFC801]"
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = rect.height;
      const scrolledIntoSection = -rect.top;
      
      if (scrolledIntoSection < 0) {
        setActiveStep(0);
        return;
      }

      // Calculate progress and activate corresponding step
      const percentage = scrolledIntoSection / (sectionHeight - window.innerHeight / 2);
      const stepIdx = Math.min(Math.max(Math.floor(percentage * steps.length), 0), steps.length - 1);
      
      setActiveStep(stepIdx);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="timeline" ref={sectionRef} className="relative py-32 bg-[#172B36] overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-[40%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-[#FF9932]/3 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="max-w-2xl mx-auto text-center mb-24 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFC801]" />
            <span className="text-xs font-heading font-semibold text-[#FFC801] tracking-wider uppercase">
              Scroll Storytelling
            </span>
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white tracking-tight leading-[1.15]">
            Platform Lifecycle
          </h2>
          <p className="text-xs sm:text-sm text-muted font-sans max-w-md mx-auto">
            From raw input queries to structured business impact, trace how payloads travel through the platform.
          </p>
        </div>

        {/* Timeline Path */}
        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-[23px] md:left-1/2 md:-translate-x-1/2 top-4 bottom-4 w-[2px] bg-white/5 z-0" />
          
          {/* Filled Progress Line based on activeStep */}
          <div
            className="absolute left-[23px] md:left-1/2 md:-translate-x-1/2 top-4 w-[2px] bg-gradient-to-b from-[#FFC801] via-[#FF9932] to-[#D9E8E2] z-0 transition-all duration-500 ease-out"
            style={{
              height: `${(activeStep / (steps.length - 1)) * 100}%`,
              maxHeight: "95%",
            }}
          />

          <div className="space-y-16">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              const isActive = idx <= activeStep;
              const isCurrent = idx === activeStep;

              return (
                <div
                  key={step.id}
                  className={`flex flex-col md:flex-row relative z-10 ${
                    isEven ? "md:flex-row-reverse" : ""
                  } md:items-center`}
                >
                  {/* Step Bubble marker */}
                  <div
                    className={`absolute left-0 md:left-1/2 md:-translate-x-1/2 w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      isCurrent
                        ? "bg-[#114C5A] border-[#FFC801] scale-110 shadow-lg shadow-[#FFC801]/10 text-[#FFC801]"
                        : isActive
                        ? "bg-[#114C5A] border-[#FF9932] text-[#FF9932]"
                        : "bg-[#172B36] border-white/5 text-muted"
                    }`}
                  >
                    {step.icon}
                  </div>

                  {/* Content panel */}
                  <div className={`pl-16 md:pl-0 w-full md:w-[45%] ${isEven ? "md:text-right" : "md:text-left"}`}>
                    <div
                      className={`glass-panel border rounded-2xl p-6 transition-all duration-300 ${
                        isCurrent
                          ? "bg-[#114C5A]/45 border-white/10 shadow-xl"
                          : "bg-[#114C5A]/10 hover:bg-[#114C5A]/25 border-transparent"
                      }`}
                    >
                      <span className={`text-[10px] font-bold font-heading tracking-wider ${isCurrent ? step.textColor : "text-muted"}`}>
                        STEP-0{step.id + 1}
                      </span>
                      <h3 className="font-heading font-extrabold text-base text-white mt-1 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-xs text-muted leading-relaxed font-sans">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  {/* Spacer for desktop symmetry */}
                  <div className="hidden md:block w-[10%]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
