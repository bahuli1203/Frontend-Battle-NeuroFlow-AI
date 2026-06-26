"use client";

import React, { useState, useRef } from "react";
import { ShieldCheck, Lock, CheckCircle2, ShieldAlert, Award } from "lucide-react";

interface BadgeNode {
  title: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
}

export default function TrustSecurity() {
  const badges: BadgeNode[] = [
    { title: "SOC2 Type II", desc: "Enterprise operational process audits completed annually.", icon: <ShieldCheck className="w-6 h-6 text-[#FFC801]" />, color: "rgba(255, 200, 1, 0.15)" },
    { title: "GDPR Ready", desc: "Data privacy compliance shielding fully configured.", icon: <Lock className="w-6 h-6 text-[#FF9932]" />, color: "rgba(255, 153, 50, 0.15)" },
    { title: "ISO 27001", desc: "Certified information system protection protocols.", icon: <Award className="w-6 h-6 text-[#D9E8E2]" />, color: "rgba(217, 232, 226, 0.15)" },
    { title: "HIPAA Vault", desc: "Medical data encryption and privacy sandbox safe.", icon: <ShieldAlert className="w-6 h-6 text-[#FFC801]" />, color: "rgba(255, 200, 1, 0.15)" },
    { title: "99.98% SLA", desc: "Platform operational uptime guarantees on edge clusters.", icon: <CheckCircle2 className="w-6 h-6 text-[#FF9932]" />, color: "rgba(255, 153, 50, 0.15)" },
  ];

  return (
    <section id="security" className="relative py-32 bg-[#172B36] border-t border-white/5 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[30vh] bg-[#FF9932]/2 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-24 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF9932]" />
            <span className="text-xs font-heading font-semibold text-[#FF9932] tracking-wider uppercase">
              Compliance & Auditing
            </span>
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.15]">
            Enterprise Trust & Security
          </h2>
          <p className="text-sm sm:text-base text-muted font-sans max-w-xl mx-auto">
            All automated jobs and data pipelines route through hardware security modules (HSM) using strict VPC segregation.
          </p>
        </div>

        {/* Badges Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-stretch">
          {badges.map((badge, idx) => (
            <BadgeCard key={idx} badge={badge} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BadgeCard({ badge }: { badge: BadgeNode }) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // Calculate rotation (-12 to 12 degrees)
    const rotateX = (y - 0.5) * -12;
    const rotateY = (x - 0.5) * 12;

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
      className="glass-panel border border-white/5 rounded-2xl p-5 flex flex-col justify-between items-center text-center transition-all duration-200 hover:-translate-y-1 hover:bg-[#114C5A]/10 group"
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        willChange: "transform",
        boxShadow: `0 0 30px -10px ${badge.color}`
      }}
    >
      <div 
        className="w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-105"
        style={{ backgroundColor: `${badge.color}25`, border: `1px solid ${badge.color}35` }}
      >
        {badge.icon}
      </div>

      <h3 className="font-heading font-extrabold text-sm text-white mb-2 uppercase tracking-wide group-hover:text-[#FFC801] transition-colors">
        {badge.title}
      </h3>
      <p className="text-[11px] text-muted leading-relaxed font-sans mt-auto">
        {badge.desc}
      </p>
    </div>
  );
}
