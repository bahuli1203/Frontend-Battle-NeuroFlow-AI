"use client";

import React, { useEffect, useRef, useState } from "react";
import { Link2, Sparkles, Send, Globe } from "lucide-react";

interface TimelineStep {
  id: number;
  title: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
}

export default function Timeline() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const steps: TimelineStep[] = [
    {
      id: 0,
      title: "Connect Data Sources",
      desc: "Synchronize database clusters, SaaS webhooks, and raw cloud storage buckets. Auto-mapping constructs schemas in milliseconds.",
      icon: <Link2 className="w-5 h-5" />,
      color: "bg-[#00D4FF]",
    },
    {
      id: 1,
      title: "Train Contextual LLMs",
      desc: "Define cognitive prompts and custom embeddings. Embed enterprise policies directly into autonomous logic buffers.",
      icon: <Sparkles className="w-5 h-5" />,
      color: "bg-[#7B61FF]",
    },
    {
      id: 2,
      title: "Deploy Agent Workflows",
      desc: "Compile automated workflows that react to streaming queries. Connect triggers directly to execution blocks.",
      icon: <Send className="w-5 h-5" />,
      color: "bg-[#00FFB2]",
    },
    {
      id: 3,
      title: "Scale Globally",
      desc: "Orchestrate multi-tenant operations across 87 countries. Leverage edge executors to achieve sub-50ms transaction latency.",
      icon: <Globe className="w-5 h-5" />,
      color: "bg-[#00D4FF]",
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

      // Calculate which quadrant of the timeline is in the middle of viewport
      const percentage = scrolledIntoSection / (sectionHeight - window.innerHeight / 2);
      const stepIdx = Math.min(Math.max(Math.floor(percentage * steps.length), 0), steps.length - 1);
      
      setActiveStep(stepIdx);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="timeline" ref={sectionRef} className="relative py-32 bg-[#050816] overflow-hidden">
      {/* Glow highlight */}
      <div className="absolute top-[40%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-[#7B61FF]/3 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="max-w-2xl mx-auto text-center mb-24 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7B61FF]" />
            <span className="text-xs font-heading font-semibold text-[#7B61FF] tracking-wider uppercase">
              Onboarding Roadmap
            </span>
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white tracking-tight leading-[1.15]">
            Initialization Sequence
          </h2>
          <p className="text-xs sm:text-sm text-muted font-sans max-w-md mx-auto">
            From empty configuration files to production-ready edge automation, here is how you launch.
          </p>
        </div>

        {/* Timeline Path */}
        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-[23px] md:left-1/2 md:-translate-x-1/2 top-4 bottom-4 w-[2px] bg-white/5 z-0" />
          
          {/* Filled Progress Line based on activeStep */}
          <div
            className="absolute left-[23px] md:left-1/2 md:-translate-x-1/2 top-4 w-[2px] bg-gradient-to-b from-[#00D4FF] via-[#7B61FF] to-[#00FFB2] z-0 transition-all duration-500 ease-out"
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
                        ? "bg-[#0B1026] border-[#00D4FF] scale-110 shadow-lg shadow-[#00D4FF]/20 text-[#00D4FF]"
                        : isActive
                        ? "bg-[#0B1026] border-[#7B61FF] text-[#7B61FF]"
                        : "bg-[#050816] border-white/5 text-muted"
                    }`}
                  >
                    {step.icon}
                  </div>

                  {/* Content panel */}
                  <div className={`pl-16 md:pl-0 w-full md:w-[45%] ${isEven ? "md:text-right" : "md:text-left"}`}>
                    <div
                      className={`glass-panel border rounded-2xl p-6 transition-all duration-300 ${
                        isCurrent
                          ? "bg-[#0B1026]/90 border-white/10 shadow-xl"
                          : "bg-[#0B1026]/40 hover:bg-[#0B1026]/60 border-transparent"
                      }`}
                    >
                      <span className={`text-[10px] font-bold font-mono tracking-wider ${isCurrent ? "text-[#00FFB2]" : "text-muted"}`}>
                        SEQUENCE-0{step.id + 1}
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
