"use client";

import React, { useEffect, useState } from "react";
import { Terminal, Shield, RefreshCw } from "lucide-react";

interface FeedLog {
  id: number;
  time: string;
  msg: string;
  type: "success" | "info" | "warning";
}

export default function LiveActivityFeed() {
  const [logs, setLogs] = useState<FeedLog[]>([
    { id: 1, time: "16:20:05", msg: "Data node US-EAST cluster balance verified.", type: "success" },
    { id: 2, time: "16:20:02", msg: "Refreshed semantic vector namespaces inside Pinecone vault.", type: "info" },
    { id: 3, time: "16:19:59", msg: "Incoming stream: Ingested 4,892 payment payloads.", type: "success" },
    { id: 4, time: "16:19:54", msg: "Security token wrapped and deployed to HSM.", type: "success" },
  ]);

  useEffect(() => {
    const feeds = [
      { msg: "Lead scored successfully via HubSpot webhook API.", type: "success" as const },
      { msg: "Autonomous multi-agent workflow node US-WEST-2 deployed.", type: "success" as const },
      { msg: "Data synchronized: Synced S3 CSV data block into Postgres.", type: "success" as const },
      { msg: "Revenue forecast vector updated for Q3 operational review.", type: "info" as const },
      { msg: "Inference exception resolved: Retrained model cluster weights.", type: "success" as const },
      { msg: "Security audit trigger: Sandboxed environment rotation ok.", type: "info" as const },
      { msg: "Decisions compiled for node: anomaly-detection-relay.", type: "success" as const },
    ];

    const interval = setInterval(() => {
      const randomFeed = feeds[Math.floor(Math.random() * feeds.length)];
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now
        .getMinutes()
        .toString()
        .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;

      const newLog: FeedLog = {
        id: Date.now(),
        time: timeStr,
        msg: randomFeed.msg,
        type: randomFeed.type
      };

      setLogs((prev) => [newLog, ...prev.slice(0, 5)]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto glass-panel border border-white/5 rounded-3xl p-6 shadow-2xl glass-card-glow-purple font-mono text-xs">
      <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4 text-muted text-[10px]">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-[#FF9932]" />
          <span className="uppercase tracking-widest font-heading font-extrabold text-white/90">
            Synapse Live Feed console
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFC801] animate-ping" />
          <span className="uppercase text-[#FFC801] font-heading font-bold">Streaming</span>
        </div>
      </div>

      <div className="space-y-3 min-h-[160px] flex flex-col justify-start">
        {logs.map((log) => (
          <div key={log.id} className="flex gap-3 items-start leading-relaxed text-[11px] animate-fade-in text-white/80">
            <span className="text-white/30 select-none">{log.time}</span>
            <span className={log.type === "info" ? "text-[#D9E8E2]" : "text-[#FFC801]"}>
              {log.type === "info" ? "[INFO]" : "[✓]"}
            </span>
            <span className="truncate flex-1 font-sans">{log.msg}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[9px] text-muted font-sans font-medium uppercase tracking-wider">
        <span>Latency: &lt;1.24ms</span>
        <span>Secure VPC Stream</span>
      </div>
    </div>
  );
}
