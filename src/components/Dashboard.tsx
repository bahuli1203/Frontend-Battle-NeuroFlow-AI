"use client";

import React, { useState, useEffect } from "react";
import { BarChart3, Shield, Cpu, RefreshCw, Layers, ArrowUpRight, Zap, Play, Terminal } from "lucide-react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [metrics, setMetrics] = useState({
    ingested: 418290,
    processed: 418242,
    nodes: 12,
    successRate: 99.989,
  });

  const [logs, setLogs] = useState<Array<{ time: string; msg: string; status: string }>>([
    { time: "15:40:22", msg: "Data node US-EAST cluster balancing completed.", status: "ok" },
    { time: "15:40:21", msg: "Syncing Postgres schemas with vector indexes...", status: "info" },
    { time: "15:40:18", msg: "AI model decision matrix re-weighting done.", status: "ok" },
    { time: "15:40:12", msg: "Incoming stream: Ingested 12,890 JSON events.", status: "ok" },
  ]);

  // Real-time counter simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => {
        const added = Math.floor(Math.random() * 8) + 1;
        return {
          ingested: prev.ingested + added,
          processed: prev.processed + added,
          nodes: prev.nodes,
          successRate: parseFloat((99.98 + Math.random() * 0.015).toFixed(3)),
        };
      });

      // Append new log periodically
      const msgs = [
        "Running regression anomaly checks on transactional payloads.",
        "Refreshed Pinecone namespace namespaces/production-db.",
        "Decisions compiled for node: dynamic-route-allocator.",
        "Incoming Webhook trigger received from stripe.com/charge.succeeded.",
        "Synchronized Snowflake cache layers in 14.8ms.",
      ];
      const statuses = ["ok", "info", "ok", "ok", "ok"];
      const randomIdx = Math.floor(Math.random() * msgs.length);
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now
        .getMinutes()
        .toString()
        .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;

      setLogs((prev) => [
        { time: timeStr, msg: msgs[randomIdx], status: statuses[randomIdx] },
        ...prev.slice(0, 4),
      ]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Deterministic local number formatter to prevent Next.js hydration mismatches
  const formatNum = (val: number) => {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <section id="dashboard" className="relative py-32 bg-[#050816] overflow-hidden">
      {/* Aurora glow backdrops */}
      <div className="absolute top-[10%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-[#00D4FF]/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-[#7B61FF]/5 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7B61FF]" />
            <span className="text-xs font-heading font-semibold text-[#7B61FF] tracking-wider uppercase">
              Dashboard Showcase
            </span>
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.15]">
            Operational Command Center
          </h2>
          <p className="text-sm sm:text-base text-muted font-sans max-w-xl mx-auto">
            Interact with live automation telemetry, system parameters, and model metrics updated inside your dashboard browser window.
          </p>
        </div>

        {/* Premium Dashboard Shell */}
        <div className="glass-panel rounded-3xl border border-white/10 shadow-2xl overflow-hidden glass-card-glow-purple flex flex-col md:grid md:grid-cols-12 min-h-[580px]">
          {/* Dashboard Sidebar */}
          <aside className="col-span-12 md:col-span-3 bg-[#0B1026]/80 border-b md:border-b-0 md:border-r border-white/5 p-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#00FFB2] animate-pulse" />
                <span className="text-xs font-heading font-bold uppercase tracking-wider text-white">
                  Cluster-01: Active
                </span>
              </div>

              <div className="space-y-1.5">
                {[
                  { id: "overview", label: "System Overview", icon: <Layers className="w-4 h-4" /> },
                  { id: "analytics", label: "Model Metrics", icon: <BarChart3 className="w-4 h-4" /> },
                  { id: "security", label: "Vault Security", icon: <Shield className="w-4 h-4" /> },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left text-xs font-medium transition-all ${
                      activeTab === item.id
                        ? "bg-[#7B61FF]/10 text-[#7B61FF] border border-[#7B61FF]/20"
                        : "text-muted hover:text-white hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 space-y-4">
              <div className="flex justify-between items-center text-[10px] text-muted uppercase font-bold">
                <span>CPU load</span>
                <span className="text-[#00FFB2]">34%</span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-[#00FFB2] w-[34%]" />
              </div>
            </div>
          </aside>

          {/* Main Dashboard Dashboard Content */}
          <main className="col-span-12 md:col-span-9 p-6 flex flex-col justify-between bg-gradient-to-br from-transparent to-[#0B1026]/20">
            {/* Tab: System Overview */}
            {activeTab === "overview" && (
              <div className="space-y-6 flex-grow flex flex-col justify-between">
                {/* Metrics Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: "Data Ingested", val: formatNum(metrics.ingested), icon: <RefreshCw className="w-4 h-4 text-[#00D4FF]" /> },
                    { label: "Jobs Executed", val: formatNum(metrics.processed), icon: <Zap className="w-4 h-4 text-[#7B61FF]" /> },
                    { label: "Active Nodes", val: metrics.nodes.toString(), icon: <Cpu className="w-4 h-4 text-[#00FFB2]" /> },
                    { label: "Decision Success", val: `${metrics.successRate}%`, icon: <Shield className="w-4 h-4 text-[#00FFB2]" /> },
                  ].map((stat, idx) => (
                    <div key={idx} className="bg-[#050816]/60 border border-white/5 rounded-2xl p-4 flex flex-col justify-between min-h-[100px]">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-heading font-medium text-muted">{stat.label}</span>
                        {stat.icon}
                      </div>
                      <span className="text-xl font-heading font-bold text-white tracking-tight mt-2">{stat.val}</span>
                    </div>
                  ))}
                </div>

                {/* SVG Area Chart */}
                <div className="bg-[#050816]/60 border border-white/5 rounded-2xl p-5 flex flex-col justify-between flex-grow min-h-[220px] relative overflow-hidden">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h4 className="text-xs font-heading font-bold text-white uppercase tracking-wider">
                        Workflow Compute Velocity
                      </h4>
                      <span className="text-[10px] text-muted font-sans">Updated continuously</span>
                    </div>
                    <span className="flex items-center gap-1 text-[11px] text-[#00FFB2] font-semibold bg-[#00FFB2]/10 border border-[#00FFB2]/20 px-2 py-0.5 rounded-full">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                      +12.4%
                    </span>
                  </div>

                  {/* SVG Chart Render */}
                  <div className="relative w-full h-32">
                    <svg className="w-full h-full" viewBox="0 0 500 100" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#7B61FF" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#7B61FF" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      {/* Area */}
                      <path
                        d="M0 80 Q 70 30, 130 50 T 260 20 T 380 45 T 500 10 L 500 100 L 0 100 Z"
                        fill="url(#chartGlow)"
                      />
                      {/* Line */}
                      <path
                        d="M0 80 Q 70 30, 130 50 T 260 20 T 380 45 T 500 10"
                        fill="none"
                        stroke="#7B61FF"
                        strokeWidth="2.5"
                        className="animate-pulse"
                      />
                      {/* Orbit marker */}
                      <circle cx="500" cy="10" r="4" fill="#00FFB2" />
                    </svg>
                  </div>
                </div>

                {/* Console Log Panel */}
                <div className="bg-[#050816] rounded-2xl border border-white/5 p-4 font-mono text-[10px] text-white/70 overflow-hidden min-h-[120px]">
                  <div className="flex items-center gap-2 text-muted mb-3 border-b border-white/5 pb-2">
                    <Terminal className="w-3.5 h-3.5 text-[#00D4FF]" />
                    <span className="uppercase tracking-wider font-bold">Model Engine Synapse Log</span>
                  </div>
                  <div className="space-y-1.5">
                    {logs.map((log, idx) => (
                      <div key={idx} className="flex gap-2.5 items-start leading-relaxed animate-fade-in">
                        <span className="text-[#94A3B8]/40 select-none">{log.time}</span>
                        <span className={log.status === "info" ? "text-[#7B61FF]" : "text-[#00FFB2]"}>
                          {log.status === "info" ? "[SYNC]" : "[OK]"}
                        </span>
                        <span className="truncate">{log.msg}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Model Metrics */}
            {activeTab === "analytics" && (
              <div className="space-y-6 flex-grow flex flex-col justify-between">
                <div className="bg-[#050816]/60 border border-white/5 rounded-2xl p-5 space-y-4">
                  <h4 className="text-xs font-heading font-bold text-white uppercase tracking-wider">
                    Loss Vector / Inference Times
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded-xl">
                      <div className="text-[10px] text-muted mb-1">Mean Square Loss</div>
                      <div className="text-xl font-bold font-heading text-white">0.000412</div>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl">
                      <div className="text-[10px] text-muted mb-1">Inference Latency</div>
                      <div className="text-xl font-bold font-heading text-[#00FFB2]">1.24 ms</div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#050816]/60 border border-white/5 rounded-2xl p-5 flex flex-col justify-between min-h-[200px]">
                  <div className="text-xs font-heading font-bold text-white uppercase tracking-wider mb-2">
                    Vector Database Memory Allocation
                  </div>
                  <div className="h-28 flex items-end justify-between px-6 pt-4">
                    {[60, 82, 45, 90, 78, 95].map((h, i) => (
                      <div key={i} className="w-8 bg-gradient-to-t from-[#7B61FF] to-[#00D4FF] rounded-t-sm" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Vault Security */}
            {activeTab === "security" && (
              <div className="space-y-6 flex-grow flex flex-col justify-between">
                <div className="bg-[#050816]/60 border border-white/5 rounded-2xl p-6 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#00FFB2]/10 border border-[#00FFB2]/20 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-[#00FFB2]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-heading font-bold text-white">Advanced Cryptographic Shield</h4>
                      <p className="text-xs text-muted">All pipelines are processed through hardware security modules (HSM) using key-wrapping.</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs border-b border-white/5 pb-2">
                      <span className="text-white/80">TLS Version</span>
                      <span className="text-[#00D4FF] font-mono font-semibold">v1.3 AES-GCM</span>
                    </div>
                    <div className="flex justify-between items-center text-xs border-b border-white/5 pb-2">
                      <span className="text-white/80">Data Isolation</span>
                      <span className="text-[#00D4FF] font-mono font-semibold">Virtual Private Cloud (VPC)</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-white/80">Compliance Audit</span>
                      <span className="text-[#00FFB2] font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00FFB2]" />
                        SOC2 Vetted
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </section>
  );
}
