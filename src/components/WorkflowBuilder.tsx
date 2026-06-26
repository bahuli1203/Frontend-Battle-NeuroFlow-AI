"use client";

import React, { useState, useRef } from "react";
import { Database, Brain, Cpu, MessageSquare, Terminal, Check } from "lucide-react";

interface NodeItem {
  id: string;
  label: string;
  desc: string;
  icon: React.ReactNode;
  x: number;
  y: number;
  color: string;
}

export default function WorkflowBuilder() {
  const workspaceRef = useRef<HTMLDivElement | null>(null);
  const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // CRM -> AI Agent -> Analysis -> Slack -> Reports
  const [nodes, setNodes] = useState<NodeItem[]>([
    { id: "crm", label: "CRM Ingestion", desc: "Stripe & Salesforce webhook trigger", icon: <Database className="w-5 h-5 text-white" />, x: 60, y: 180, color: "#FF9932" },
    { id: "agent", label: "AI Agent", desc: "LLM semantic intent alignment", icon: <Brain className="w-5 h-5 text-white" />, x: 220, y: 80, color: "#FFC801" },
    { id: "analysis", label: "Analysis Node", desc: "Real-time anomaly model check", icon: <Cpu className="w-5 h-5 text-white" />, x: 380, y: 280, color: "#D9E8E2" },
    { id: "slack", label: "Slack Notify", desc: "Operations notification alert", icon: <MessageSquare className="w-5 h-5 text-white" />, x: 540, y: 80, color: "#FF9932" },
    { id: "reports", label: "Reports Output", desc: "Compile enterprise executive PDF", icon: <Terminal className="w-5 h-5 text-white" />, x: 700, y: 180, color: "#FFC801" }
  ]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>, nodeId: string) => {
    e.preventDefault();
    if (!workspaceRef.current) return;
    
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;

    const rect = workspaceRef.current.getBoundingClientRect();
    const pointerX = e.clientX - rect.left;
    const pointerY = e.clientY - rect.top;

    setDraggedNodeId(nodeId);
    setDragOffset({
      x: pointerX - node.x,
      y: pointerY - node.y
    });

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>, nodeId: string) => {
    if (draggedNodeId !== nodeId || !workspaceRef.current) return;

    const rect = workspaceRef.current.getBoundingClientRect();
    const pointerX = e.clientX - rect.left;
    const pointerY = e.clientY - rect.top;

    let newX = pointerX - dragOffset.x;
    let newY = pointerY - dragOffset.y;

    // Clamp inside standard workspace viewport
    newX = Math.max(40, Math.min(workspaceRef.current.clientWidth - 100, newX));
    newY = Math.max(40, Math.min(workspaceRef.current.clientHeight - 40, newY));

    setNodes(prev => prev.map(n => n.id === nodeId ? { ...n, x: newX, y: newY } : n));
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>, nodeId: string) => {
    if (draggedNodeId === nodeId) {
      setDraggedNodeId(null);
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const getPathD = (x1: number, y1: number, x2: number, y2: number) => {
    const controlPointX = x1 + (x2 - x1) * 0.5;
    return `M ${x1} ${y1} C ${controlPointX} ${y1}, ${controlPointX} ${y2}, ${x2} ${y2}`;
  };

  return (
    <section id="workflow-builder" className="relative py-32 bg-[#172B36] overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-[20%] left-[20%] w-[35vw] h-[35vw] rounded-full bg-[#FF9932]/3 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[20%] w-[30vw] h-[30vw] rounded-full bg-[#FFC801]/3 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-20 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFC801]" />
            <span className="text-xs font-heading font-semibold text-[#FFC801] tracking-wider uppercase">
              AI Workflow Playground
            </span>
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.15]">
            Build Automations Visually
          </h2>
          <p className="text-sm sm:text-base text-muted font-sans max-w-xl mx-auto">
            Drag and orchestrate nodes dynamically. Click and pull components to recalculate pipeline paths in real-time.
          </p>
        </div>

        {/* Builder Workspace Wrapper */}
        <div className="glass-panel border border-white/5 rounded-3xl p-6 sm:p-8 relative overflow-hidden glass-card-glow-purple max-w-4xl mx-auto">
          {/* Main Visual Drag Sandbox */}
          <div 
            ref={workspaceRef}
            className="relative w-full h-[400px] overflow-hidden rounded-2xl bg-[#172B36]/50 border border-white/5 select-none touch-none grid-bg-cyber"
          >
            {/* SVG Connecting Paths (drawn dynamically between sorted nodes) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
              <defs>
                <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FF9932" />
                  <stop offset="50%" stopColor="#FFC801" />
                  <stop offset="100%" stopColor="#D9E8E2" />
                </linearGradient>
              </defs>

              {/* Dynamic Connecting Lines */}
              {nodes.map((node, index) => {
                if (index === nodes.length - 1) return null;
                const nextNode = nodes[index + 1];
                const pathD = getPathD(node.x + 60, node.y + 24, nextNode.x + 60, nextNode.y + 24);

                return (
                  <g key={`flow-${node.id}`}>
                    {/* Background faint path */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke="rgba(255, 255, 255, 0.05)"
                      strokeWidth="2.5"
                    />
                    {/* Color highlighted path */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke="url(#flowGrad)"
                      strokeWidth="3.5"
                      className="opacity-70"
                    />
                    {/* Animated running data packets along segments */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke="#FFC801"
                      strokeWidth="4"
                      strokeDasharray="12, 45"
                      style={{
                        strokeDashoffset: 100,
                        animation: "flowDash 2s linear infinite"
                      }}
                    />
                  </g>
                );
              })}
            </svg>
            <style>{`
              @keyframes flowDash {
                to { stroke-dashoffset: 0; }
              }
            `}</style>

            {/* Draggable Node Components */}
            {nodes.map((node) => {
              const isDragging = draggedNodeId === node.id;
              return (
                <div
                  key={node.id}
                  onPointerDown={(e) => handlePointerDown(e, node.id)}
                  onPointerMove={(e) => handlePointerMove(e, node.id)}
                  onPointerUp={(e) => handlePointerUp(e, node.id)}
                  className={`absolute w-36 cursor-grab active:cursor-grabbing rounded-2xl glass-panel border p-3 flex flex-col items-center text-center transition-all ${
                    isDragging
                      ? "shadow-2xl scale-105 z-30"
                      : "z-20 hover:bg-white/5 hover:border-white/10"
                  }`}
                  style={{
                    left: `${node.x}px`,
                    top: `${node.y}px`,
                    borderColor: isDragging ? node.color : "rgba(255, 255, 255, 0.05)",
                    boxShadow: isDragging ? `0 0 25px ${node.color}25` : "none"
                  }}
                >
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-2 shadow-inner"
                    style={{ backgroundColor: `${node.color}20`, border: `1px solid ${node.color}35` }}
                  >
                    <div style={{ color: node.color }}>
                      {node.icon}
                    </div>
                  </div>
                  <h4 className="font-heading font-extrabold text-[11px] text-white tracking-wide">
                    {node.label}
                  </h4>
                  <p className="text-[8px] text-muted font-sans mt-1 leading-tight line-clamp-2">
                    {node.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Bottom Summary Bar */}
          <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-xs gap-4 relative z-20">
            <div className="flex flex-wrap justify-center items-center gap-2.5 font-heading text-muted text-[10px] uppercase">
              {nodes.map((node, idx) => (
                <React.Fragment key={`sum-${node.id}`}>
                  <span className="font-bold text-white/80">{node.label}</span>
                  {idx < nodes.length - 1 && <span className="text-[#FF9932]">→</span>}
                </React.Fragment>
              ))}
            </div>

            <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#FF9932] to-[#FFC801] text-white font-heading font-semibold text-xs rounded-xl shadow-lg hover:shadow-[#FF9932]/10 transition-all select-none">
              <Check className="w-3.5 h-3.5" />
              Deploy Pipeline Node
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
