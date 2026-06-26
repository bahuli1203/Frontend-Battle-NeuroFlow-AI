"use client";

import React, { useState } from "react";
import { Globe, ArrowRight } from "lucide-react";

interface CityNode {
  name: string;
  x: number;
  y: number;
  latency: string;
  description: string;
}

export default function WorldNetwork() {
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  const cities: CityNode[] = [
    { name: "New York", x: 270, y: 110, latency: "22ms", description: "VPC Ingestion Node US-EAST" },
    { name: "London", x: 450, y: 90, latency: "8ms", description: "Edge Router Node UK" },
    { name: "Berlin", x: 480, y: 95, latency: "9ms", description: "Compliance Vault Node EU" },
    { name: "Mumbai", x: 630, y: 170, latency: "14ms", description: "Compute Cluster Node AP-SOUTH" },
    { name: "Singapore", x: 690, y: 210, latency: "5ms", description: "Low-latency API Cluster AP-EAST" },
  ];

  // SVG coordinate connections
  const connections = [
    { from: "New York", to: "London" },
    { from: "London", to: "Berlin" },
    { from: "Berlin", to: "Mumbai" },
    { from: "Mumbai", to: "Singapore" },
    { from: "Singapore", to: "New York" },
  ];

  const getPathD = (x1: number, y1: number, x2: number, y2: number) => {
    // Generate curved bezier connecting route
    const dx = x2 - x1;
    const dy = y2 - y1;
    const cx1 = x1 + dx * 0.3;
    const cy1 = y1 - dy * 0.1;
    const cx2 = x1 + dx * 0.7;
    const cy2 = y2 + dy * 0.1;
    return `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;
  };

  return (
    <section id="network" className="relative py-32 bg-[#172B36] overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-[20%] left-[-10%] w-[35vw] h-[35vw] rounded-full bg-[#FF9932]/3 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-[#FFC801]/3 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-20 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFC801]" />
            <span className="text-xs font-heading font-semibold text-[#FFC801] tracking-wider uppercase">
              Planetary Scale Network
            </span>
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.15]">
            Global Low-Latency Grid
          </h2>
          <p className="text-sm sm:text-base text-muted font-sans max-w-xl mx-auto">
            Our federated computing cluster routes automated reasoning tasks across edge vaults, keeping average speeds sub-50ms.
          </p>
        </div>

        {/* Map Grid Canvas Box */}
        <div className="glass-panel border border-white/5 rounded-3xl p-6 sm:p-10 relative overflow-hidden glass-card-glow-blue max-w-4xl mx-auto min-h-[380px] flex flex-col justify-between">
          <div className="relative w-full h-[280px] hidden md:block">
            {/* SVG Background Map Grids */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 900 280">
              <defs>
                <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FF9932" />
                  <stop offset="50%" stopColor="#FFC801" />
                  <stop offset="100%" stopColor="#D9E8E2" />
                </linearGradient>
              </defs>

              {/* Faint Grid Lines */}
              {Array.from({ length: 12 }).map((_, i) => (
                <line
                  key={`line-h-${i}`}
                  x1="0"
                  y1={i * 24}
                  x2="900"
                  y2={i * 24}
                  stroke="rgba(255, 255, 255, 0.015)"
                  strokeWidth="1"
                />
              ))}
              {Array.from({ length: 30 }).map((_, i) => (
                <line
                  key={`line-v-${i}`}
                  x1={i * 30}
                  y1="0"
                  x2={i * 30}
                  y2="280"
                  stroke="rgba(255, 255, 255, 0.015)"
                  strokeWidth="1"
                />
              ))}

              {/* Draw Route Connections */}
              {connections.map((conn, idx) => {
                const c1 = cities.find(c => c.name === conn.from)!;
                const c2 = cities.find(c => c.name === conn.to)!;
                const pathD = getPathD(c1.x, c1.y, c2.x, c2.y);

                return (
                  <g key={`conn-${idx}`}>
                    {/* Glowing static line */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke="url(#routeGrad)"
                      strokeWidth="1.5"
                      className="opacity-40"
                    />
                    {/* Running pulse packet */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke="#FFC801"
                      strokeWidth="2.5"
                      strokeDasharray="10, 80"
                      style={{
                        strokeDashoffset: 100,
                        animation: "dashRoute 4s linear infinite",
                        animationDelay: `${idx * 0.8}s`
                      }}
                    />
                  </g>
                );
              })}
            </svg>
            <style>{`
              @keyframes dashRoute {
                to { stroke-dashoffset: 0; }
              }
            `}</style>

            {/* City Nodes */}
            {cities.map((city) => {
              const isHovered = hoveredCity === city.name;
              return (
                <div
                  key={city.name}
                  onMouseEnter={() => setHoveredCity(city.name)}
                  onMouseLeave={() => setHoveredCity(null)}
                  className="absolute cursor-pointer flex flex-col items-center group"
                  style={{ left: `${city.x - 6}px`, top: `${city.y - 6}px` }}
                >
                  {/* Pulsing Dot */}
                  <div className="relative flex items-center justify-center">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#FF9932]/10 border border-[#FF9932] flex items-center justify-center transition-all group-hover:scale-110">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FF9932]" />
                    </div>
                    <div className="absolute w-6 h-6 bg-[#FF9932]/15 rounded-full animate-ping pointer-events-none" />
                  </div>

                  {/* City Label */}
                  <span className="text-[9px] font-heading font-extrabold text-white mt-1.5 bg-[#172B36]/80 px-2 py-0.5 rounded border border-white/5 shadow group-hover:text-[#FFC801] transition-colors">
                    {city.name}
                  </span>

                  {/* Floating tooltip latency info */}
                  <div
                    className={`absolute bottom-8 w-44 p-3 glass-panel border border-white/10 rounded-xl transition-all duration-200 pointer-events-none z-30 text-[10px] ${
                      isHovered ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-2 scale-95"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-heading font-extrabold text-white">{city.name}</span>
                      <span className="text-[#FFC801] font-bold font-mono">{city.latency}</span>
                    </div>
                    <p className="text-[9px] text-muted leading-tight font-sans">{city.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Grid Layout for Cities List (fallback) */}
          <div className="md:hidden grid grid-cols-2 gap-4 pb-6 border-b border-white/5">
            {cities.map((city) => (
              <div key={city.name} className="p-3 bg-white/5 border border-white/5 rounded-xl flex items-center justify-between text-[11px]">
                <div>
                  <h4 className="font-bold text-white">{city.name}</h4>
                  <p className="text-[9px] text-muted">{city.description}</p>
                </div>
                <span className="font-mono text-[#FF9932] font-semibold">{city.latency}</span>
              </div>
            ))}
          </div>

          {/* Bottom Display */}
          <div className="flex flex-col sm:flex-row justify-between items-center text-xs gap-4 pt-4 relative z-20">
            <div className="flex items-center gap-2 font-heading font-semibold text-white/90">
              <Globe className="w-4 h-4 text-[#FFC801] animate-spin-slow" />
              <span>127 Countries Connected Globally</span>
            </div>
            <div className="text-[10px] font-mono text-muted uppercase">
              Average Stream Route: <span className="text-[#FF9932] font-bold">11.4ms</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
