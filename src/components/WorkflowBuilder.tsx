"use client";

import React, { useState } from "react";
import { Database, FileJson, Mail, MessageSquare, Terminal, Sparkles, Cpu, Play, Check } from "lucide-react";

interface WorkflowNode {
  id: number;
  label: string;
  desc: string;
  icon: React.ReactNode;
  y: number; // Y coordinate in SVG viewBox (0-400)
}

export default function WorkflowBuilder() {
  const [selectedInput, setSelectedInput] = useState<number>(1); // Default Webhook
  const [selectedAI, setSelectedAI] = useState<number>(0); // Default Summarizer
  const [selectedOutput, setSelectedOutput] = useState<number>(0); // Default Slack

  const inputs: WorkflowNode[] = [
    { id: 0, label: "CRM Sync", desc: "Salesforce / Hubspot updates", icon: <Database className="w-5 h-5 text-[#00D4FF]" />, y: 80 },
    { id: 1, label: "Webhook Ingestion", desc: "Real-time client transactions", icon: <FileJson className="w-5 h-5 text-[#00D4FF]" />, y: 180 },
    { id: 2, label: "Postgres DB Stream", desc: "Live row inserts & logs", icon: <Terminal className="w-5 h-5 text-[#00D4FF]" />, y: 280 },
  ];

  const aiNodes: WorkflowNode[] = [
    { id: 0, label: "Agent Summarizer", desc: "Extract key intents & vectors", icon: <Sparkles className="w-5 h-5 text-[#7B61FF]" />, y: 130 },
    { id: 1, label: "Anomaly Classifier", desc: "Detect transaction threats", icon: <Cpu className="w-5 h-5 text-[#7B61FF]" />, y: 230 },
  ];

  const outputs: WorkflowNode[] = [
    { id: 0, label: "Slack Notify", desc: "Post alert to operations channel", icon: <MessageSquare className="w-5 h-5 text-[#00FFB2]" />, y: 80 },
    { id: 1, label: "Email Dispatch", desc: "Draft secure SMTP client alert", icon: <Mail className="w-5 h-5 text-[#00FFB2]" />, y: 180 },
    { id: 2, label: "AWS Lambda Run", desc: "Trigger serverless payload node", icon: <Play className="w-5 h-5 text-[#00FFB2]" />, y: 280 },
  ];


  const activeInputNode = inputs.find((n) => n.id === selectedInput)!;
  const activeAINode = aiNodes.find((n) => n.id === selectedAI)!;
  const activeOutputNode = outputs.find((n) => n.id === selectedOutput)!;

  // Path formulations
  const getPathD = (x1: number, y1: number, x2: number, y2: number) => {
    const controlPointX = x1 + (x2 - x1) * 0.5;
    return `M ${x1} ${y1} C ${controlPointX} ${y1}, ${controlPointX} ${y2}, ${x2} ${y2}`;
  };

  const path1 = getPathD(140, activeInputNode.y, 230, activeAINode.y);
  const path2 = getPathD(370, activeAINode.y, 460, activeOutputNode.y);

  return (
    <section id="workflow-builder" className="relative py-32 bg-[#050816] overflow-hidden">
      {/* Background neon elements */}
      <div className="absolute top-[20%] left-[20%] w-[35vw] h-[35vw] rounded-full bg-[#00FFB2]/3 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[20%] w-[30vw] h-[30vw] rounded-full bg-[#7B61FF]/3 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-20 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FFB2]" />
            <span className="text-xs font-heading font-semibold text-[#00FFB2] tracking-wider uppercase">
              Interactive Builder
            </span>
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.15]">
            Synapse Workflow Builder
          </h2>
          <p className="text-sm sm:text-base text-muted font-sans max-w-xl mx-auto">
            Design pipeline automation triggers directly in the UI. Toggle nodes below to view visual connections instantly.
          </p>
        </div>

        {/* Builder Workspace Wrapper */}
        <div className="glass-panel border border-white/10 rounded-3xl p-6 sm:p-10 relative overflow-hidden glass-card-glow-green max-w-4xl mx-auto">
          {/* Relative workspace */}
          <div className="relative w-full h-[400px] hidden md:block">
            {/* SVG Connecting Paths (Background) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 600 400" preserveAspectRatio="none">
              <defs>
                <linearGradient id="activeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00D4FF" />
                  <stop offset="50%" stopColor="#7B61FF" />
                  <stop offset="100%" stopColor="#00FFB2" />
                </linearGradient>
              </defs>

              {/* Passive static path templates */}
              {inputs.map((inp) =>
                aiNodes.map((ai) => (
                  <path
                    key={`static-1-${inp.id}-${ai.id}`}
                    d={getPathD(140, inp.y, 230, ai.y)}
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.02)"
                    strokeWidth="1.5"
                  />
                ))
              )}
              {aiNodes.map((ai) =>
                outputs.map((out) => (
                  <path
                    key={`static-2-${ai.id}-${out.id}`}
                    d={getPathD(370, ai.y, 460, out.y)}
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.02)"
                    strokeWidth="1.5"
                  />
                ))
              )}

              {/* Highlight active path lines */}
              <path d={path1} fill="none" stroke="url(#activeGrad)" strokeWidth="3" className="opacity-70 animate-pulse" />
              <path d={path2} fill="none" stroke="url(#activeGrad)" strokeWidth="3" className="opacity-70 animate-pulse" />

              {/* Moving neon data pulses along active path */}
              <path
                d={path1}
                fill="none"
                stroke="#00D4FF"
                strokeWidth="3.5"
                strokeDasharray="10, 15"
                style={{
                  strokeDashoffset: 100,
                  animation: "dashFlowBuilder 2.5s linear infinite",
                }}
              />
              <path
                d={path2}
                fill="none"
                stroke="#00FFB2"
                strokeWidth="3.5"
                strokeDasharray="10, 15"
                style={{
                  strokeDashoffset: 100,
                  animation: "dashFlowBuilder 2.5s linear infinite",
                }}
              />
            </svg>
            <style>{`
              @keyframes dashFlowBuilder {
                to { stroke-dashoffset: 0; }
              }
            `}</style>

            {/* Inputs Column */}
            <div className="absolute left-0 top-0 bottom-0 w-36 flex flex-col justify-between py-6 z-10">
              <span className="text-[10px] text-[#00D4FF] font-heading font-extrabold uppercase tracking-widest text-center">
                Inputs
              </span>
              {inputs.map((node) => (
                <button
                  key={node.id}
                  onClick={() => setSelectedInput(node.id)}
                  className={`w-full flex flex-col items-center p-3 rounded-2xl glass-panel border text-center transition-all cursor-pointer ${
                    selectedInput === node.id
                      ? "bg-[#0B1026] border-[#00D4FF] shadow-lg shadow-[#00D4FF]/10 scale-102"
                      : "bg-[#050816]/40 border-transparent hover:border-white/5 hover:bg-white/5"
                  }`}
                  style={{ height: "72px" }}
                >
                  <div className="flex items-center gap-2">
                    {node.icon}
                    <span className="text-[11px] font-heading font-bold text-white">{node.label}</span>
                  </div>
                  <span className="text-[8px] text-muted leading-tight mt-1 truncate w-full">{node.desc}</span>
                </button>
              ))}
            </div>

            {/* AI Nodes Column (Center) */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-36 flex flex-col justify-center gap-24 py-6 z-10">
              <span className="text-[10px] text-[#7B61FF] font-heading font-extrabold uppercase tracking-widest text-center">
                AI Processors
              </span>
              {aiNodes.map((node) => (
                <button
                  key={node.id}
                  onClick={() => setSelectedAI(node.id)}
                  className={`w-full flex flex-col items-center p-3 rounded-2xl glass-panel border text-center transition-all cursor-pointer ${
                    selectedAI === node.id
                      ? "bg-[#0B1026] border-[#7B61FF] shadow-lg shadow-[#7B61FF]/10 scale-102"
                      : "bg-[#050816]/40 border-transparent hover:border-white/5 hover:bg-white/5"
                  }`}
                  style={{ height: "72px" }}
                >
                  <div className="flex items-center gap-2">
                    {node.icon}
                    <span className="text-[11px] font-heading font-bold text-white">{node.label}</span>
                  </div>
                  <span className="text-[8px] text-muted leading-tight mt-1 truncate w-full">{node.desc}</span>
                </button>
              ))}
            </div>

            {/* Outputs Column */}
            <div className="absolute right-0 top-0 bottom-0 w-36 flex flex-col justify-between py-6 z-10">
              <span className="text-[10px] text-[#00FFB2] font-heading font-extrabold uppercase tracking-widest text-center">
                Actions
              </span>
              {outputs.map((node) => (
                <button
                  key={node.id}
                  onClick={() => setSelectedOutput(node.id)}
                  className={`w-full flex flex-col items-center p-3 rounded-2xl glass-panel border text-center transition-all cursor-pointer ${
                    selectedOutput === node.id
                      ? "bg-[#0B1026] border-[#00FFB2] shadow-lg shadow-[#00FFB2]/10 scale-102"
                      : "bg-[#050816]/40 border-transparent hover:border-white/5 hover:bg-white/5"
                  }`}
                  style={{ height: "72px" }}
                >
                  <div className="flex items-center gap-2">
                    {node.icon}
                    <span className="text-[11px] font-heading font-bold text-white">{node.label}</span>
                  </div>
                  <span className="text-[8px] text-muted leading-tight mt-1 truncate w-full">{node.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Fallback Layout on Mobile Viewports */}
          <div className="md:hidden space-y-6">
            <div>
              <span className="text-[10px] text-[#00D4FF] font-bold uppercase tracking-wider block mb-2">1. Ingest Data</span>
              <div className="grid grid-cols-1 gap-2">
                {inputs.map((node) => (
                  <button
                    key={node.id}
                    onClick={() => setSelectedInput(node.id)}
                    className={`p-3 rounded-xl border flex items-center gap-3 text-left transition-all ${
                      selectedInput === node.id ? "bg-[#0B1026] border-[#00D4FF] text-[#00D4FF]" : "bg-white/5 border-white/5 text-white"
                    }`}
                  >
                    {node.icon}
                    <div>
                      <h4 className="text-xs font-bold font-heading">{node.label}</h4>
                      <p className="text-[9px] text-muted mt-0.5">{node.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[10px] text-[#7B61FF] font-bold uppercase tracking-wider block mb-2">2. Analyze payload</span>
              <div className="grid grid-cols-1 gap-2">
                {aiNodes.map((node) => (
                  <button
                    key={node.id}
                    onClick={() => setSelectedAI(node.id)}
                    className={`p-3 rounded-xl border flex items-center gap-3 text-left transition-all ${
                      selectedAI === node.id ? "bg-[#0B1026] border-[#7B61FF] text-[#7B61FF]" : "bg-white/5 border-white/5 text-white"
                    }`}
                  >
                    {node.icon}
                    <div>
                      <h4 className="text-xs font-bold font-heading">{node.label}</h4>
                      <p className="text-[9px] text-muted mt-0.5">{node.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[10px] text-[#00FFB2] font-bold uppercase tracking-wider block mb-2">3. Execute Action</span>
              <div className="grid grid-cols-1 gap-2">
                {outputs.map((node) => (
                  <button
                    key={node.id}
                    onClick={() => setSelectedOutput(node.id)}
                    className={`p-3 rounded-xl border flex items-center gap-3 text-left transition-all ${
                      selectedOutput === node.id ? "bg-[#0B1026] border-[#00FFB2] text-[#00FFB2]" : "bg-white/5 border-white/5 text-white"
                    }`}
                  >
                    {node.icon}
                    <div>
                      <h4 className="text-xs font-bold font-heading">{node.label}</h4>
                      <p className="text-[9px] text-muted mt-0.5">{node.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Active Summary Overlay */}
          <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-xs gap-4 relative z-20">
            <div className="flex items-center gap-2.5 font-mono text-muted text-[10px]">
              <span className="text-[#00D4FF] font-semibold">{activeInputNode.label}</span>
              <span>→</span>
              <span className="text-[#7B61FF] font-semibold">{activeAINode.label}</span>
              <span>→</span>
              <span className="text-[#00FFB2] font-semibold">{activeOutputNode.label}</span>
            </div>

            <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#7B61FF] to-[#00D4FF] text-white font-heading font-semibold text-xs rounded-xl shadow-lg hover:shadow-[#7B61FF]/15 transition-all">
              <Check className="w-3.5 h-3.5" />
              Deploy Pipeline Node
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
