"use client";

import React from "react";
import { Star } from "lucide-react";

interface TestimonialItem {
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  avatar: React.ReactNode;
  floatClass: string;
  borderColor: string;
}

export default function Testimonials() {
  const testimonials: TestimonialItem[] = [
    {
      name: "Marcus Vance",
      role: "VP of Data Infrastructure",
      company: "Aether Dynamics",
      quote: "NeuroFlow AI transformed our data pipelines. We reduced database transaction latency by 45% and automated standard compliance pipelines in less than two weeks.",
      rating: 5,
      avatar: (
        <svg className="w-10 h-10 rounded-full border border-white/10" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="50" fill="#D9E8E2" fillOpacity="0.2" />
          <circle cx="50" cy="40" r="20" fill="#D9E8E2" />
          <path d="M20 80C20 65 35 60 50 60C65 60 80 65 80 80" fill="#D9E8E2" />
        </svg>
      ),
      floatClass: "animate-float",
      borderColor: "border-[#D9E8E2]/20",
    },
    {
      name: "Elena Rostova",
      role: "Principal AI Scientist",
      company: "Vectra Labs",
      quote: "The multi-agent orchestration layer is spectacular. Decoupling workflow logic from raw prompts allowed us to scale models dynamically with absolute security confidence.",
      rating: 5,
      avatar: (
        <svg className="w-10 h-10 rounded-full border border-white/10" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="50" fill="#FF9932" fillOpacity="0.2" />
          <circle cx="50" cy="40" r="18" fill="#FF9932" />
          <path d="M25 78C25 65 36 58 50 58C64 58 75 65 75 78" fill="#FF9932" />
        </svg>
      ),
      floatClass: "animate-float-delayed",
      borderColor: "border-[#FF9932]/20",
    },
    {
      name: "Silas Kincaid",
      role: "Chief Technology Officer",
      company: "Chronos Financial",
      quote: "Switching from hardcoded Lambda triggers to NeuroFlow's natural language engine was like magic. Our operations team can deploy pipelines in plain English.",
      rating: 5,
      avatar: (
        <svg className="w-10 h-10 rounded-full border border-white/10" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="50" fill="#FFC801" fillOpacity="0.2" />
          <circle cx="50" cy="40" r="20" fill="#FFC801" />
          <path d="M20 82C20 66 33 60 50 60C67 60 80 66 80 82" fill="#FFC801" />
        </svg>
      ),
      floatClass: "animate-float",
      borderColor: "border-[#FFC801]/20",
    },
  ];

  return (
    <section id="testimonials" className="relative py-32 bg-[#172B36] overflow-hidden">
      {/* Background nebulas */}
      <div className="absolute top-[20%] left-[20%] w-[35vw] h-[35vw] rounded-full bg-[#FF9932]/3 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[20%] w-[30vw] h-[30vw] rounded-full bg-[#FFC801]/3 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-24 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFC801]" />
            <span className="text-xs font-heading font-semibold text-[#FFC801] tracking-wider uppercase">
              Consensus & Trust
            </span>
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.15]">
            Approved By Architects
          </h2>
          <p className="text-sm sm:text-base text-muted font-sans max-w-xl mx-auto">
            Read comments from global developers operating autonomous systems inside critical production setups.
          </p>
        </div>

        {/* Floating cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start pt-6">
          {testimonials.map((test, idx) => (
            <div
              key={idx}
              className={`glass-panel border rounded-3xl p-8 transition-all duration-300 hover:bg-[#114C5A]/40 hover:scale-102 flex flex-col justify-between min-h-[300px] ${test.floatClass} ${test.borderColor}`}
              style={{
                animationDelay: `${idx * 0.8}s`,
              }}
            >
              <div>
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: test.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FFC801] text-[#FFC801]" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-white/95 leading-relaxed italic mb-8 font-sans">
                  "{test.quote}"
                </p>
              </div>

              <div className="flex items-center gap-4 border-t border-white/5 pt-6">
                {test.avatar}
                <div>
                  <h4 className="font-heading font-bold text-xs text-white">{test.name}</h4>
                  <p className="text-[10px] text-muted">
                    {test.role}, <span className="text-[#D9E8E2]">{test.company}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
