"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Terminal, Palette, ArrowRight, X } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { setTheme } = useTheme();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const executeCommand = (action: () => void) => {
    action();
    setIsOpen(false);
    setSearch("");
  };

  const commands = [
    {
      category: "Navigation",
      items: [
        {
          name: "Go to Features Stack",
          desc: "Explore details of raw telemetry nodes",
          shortcut: "G F",
          action: () => {
            document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
          },
        },
        {
          name: "Go to System Dashboard",
          desc: "View real-time database logs",
          shortcut: "G D",
          action: () => {
            document.getElementById("dashboard")?.scrollIntoView({ behavior: "smooth" });
          },
        },
        {
          name: "Go to Pipeline Builder",
          desc: "Construct custom logic triggers",
          shortcut: "G W",
          action: () => {
            document.getElementById("workflow-builder")?.scrollIntoView({ behavior: "smooth" });
          },
        },
        {
          name: "Go to Matrix Pricing",
          desc: "Compare starter and pro compute rates",
          shortcut: "G P",
          action: () => {
            document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
          },
        },
      ],
    },
    {
      category: "Theme Customization",
      items: [
        {
          name: "Switch to Quantum Purple",
          desc: "Set accent theme to neon purple",
          icon: <Palette className="w-4 h-4 text-[#7B61FF]" />,
          shortcut: "T P",
          action: () => setTheme("purple"),
        },
        {
          name: "Switch to Cyber Blue",
          desc: "Set accent theme to glowing blue",
          icon: <Palette className="w-4 h-4 text-[#00D4FF]" />,
          shortcut: "T B",
          action: () => setTheme("blue"),
        },
        {
          name: "Switch to Emerald AI",
          desc: "Set accent theme to emerald green",
          icon: <Palette className="w-4 h-4 text-[#00FFB2]" />,
          shortcut: "T G",
          action: () => setTheme("green"),
        },
      ],
    },
    {
      category: "Experimental Override",
      items: [
        {
          name: "Initialize Matrix Mode",
          desc: "Cheat-code IDDQD override effect",
          icon: <Terminal className="w-4 h-4 text-emerald-400" />,
          shortcut: "M A T",
          action: () => {
            // Dispatch a keydown cheat event to window
            const event = new KeyboardEvent("keydown", { key: "d" });
            window.dispatchEvent(event);
            // Simulate typing iddqd
            const keys = ["i", "d", "d", "q", "d"];
            keys.forEach((k) => {
              window.dispatchEvent(new KeyboardEvent("keydown", { key: k }));
            });
          },
        },
      ],
    },
  ];

  // Filter commands
  const filteredCommands = commands
    .map((cat) => ({
      ...cat,
      items: cat.items.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.desc.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((cat) => cat.items.length > 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      {/* Search Container */}
      <div className="w-full max-w-2xl overflow-hidden glass-panel-heavy rounded-2xl border border-white/10 shadow-2xl max-h-[80vh] flex flex-col">
        {/* Input Header */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-white/5 bg-[#050816]/80">
          <Search className="w-5 h-5 text-muted" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent border-0 outline-none text-sm text-white placeholder-muted focus:ring-0"
          />
          <kbd className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-muted font-sans flex items-center gap-0.5">
            ESC
          </kbd>
          <button onClick={() => setIsOpen(false)} className="p-1 text-muted hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-[#050816]/40">
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cat, idx) => (
              <div key={idx} className="space-y-2">
                <h4 className="text-[10px] font-heading font-semibold text-muted uppercase tracking-widest px-2">
                  {cat.category}
                </h4>
                <div className="space-y-1">
                  {cat.items.map((item, itemIdx) => (
                    <button
                      key={itemIdx}
                      onClick={() => executeCommand(item.action)}
                      className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 text-left transition-all border border-transparent hover:border-white/5 group"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-muted group-hover:text-white transition-colors">
                          {"icon" in item ? (item.icon as React.ReactNode) : <Search className="w-4 h-4" />}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-white font-heading group-hover:text-[#00D4FF] transition-colors">
                            {item.name}
                          </p>
                          <p className="text-[10px] text-muted font-sans leading-none mt-1">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] text-muted uppercase font-mono px-2 py-0.5 bg-white/5 border border-white/10 rounded">
                          {item.shortcut}
                        </span>
                        <ArrowRight className="w-4 h-4 text-muted opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 space-y-2">
              <p className="text-xs text-muted">No commands match your query.</p>
              <p className="text-[10px] text-muted/60">Try searching for navigation keywords or theme switches.</p>
            </div>
          )}
        </div>

        {/* Footer HUD info */}
        <div className="px-4 py-3 bg-[#050816]/90 border-t border-white/5 flex items-center justify-between text-[10px] text-muted">
          <span>Search or navigate commands seamlessly</span>
          <div className="flex items-center gap-1.5">
            <span>Shortcut:</span>
            <kbd className="bg-white/5 px-1 rounded font-sans border border-white/10">Ctrl+K</kbd>
            <span>or</span>
            <kbd className="bg-white/5 px-1 rounded font-sans border border-white/10">⌘K</kbd>
          </div>
        </div>
      </div>
    </div>
  );
}
