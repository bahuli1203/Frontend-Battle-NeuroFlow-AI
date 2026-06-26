import React from "react";
import { Cpu } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#172B36] pt-24 pb-12 overflow-hidden border-t border-white/5">
      {/* Glowing border accent */}
      <div className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-[#FF9932] to-transparent opacity-40" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 pb-16">
        {/* Branding column */}
        <div className="md:col-span-4 space-y-6">
          <a href="#" className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-[#FF9932] to-[#FFC801] p-[1px]">
              <div className="w-full h-full bg-[#172B36] rounded-[7px] flex items-center justify-center">
                <Cpu className="w-4 h-4 text-[#FFC801]" />
              </div>
            </div>
            <span className="font-heading font-bold text-lg tracking-tight text-white">
              NeuroFlow<span className="text-[#FFC801]">AI</span>
            </span>
          </a>
          <p className="text-xs text-muted font-sans leading-relaxed max-w-xs">
            Autonomous multi-agent system architecture processing, reasoning, and executing database triggers at planetary scale.
          </p>
          <div className="flex gap-4">
            {/* Twitter SVG */}
            <a href="#" className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 flex items-center justify-center text-muted hover:text-white transition-colors" aria-label="Twitter">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            {/* Github SVG */}
            <a href="#" className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 flex items-center justify-center text-muted hover:text-white transition-colors" aria-label="Github">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </a>
            {/* Linkedin SVG */}
            <a href="#" className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 flex items-center justify-center text-muted hover:text-white transition-colors" aria-label="LinkedIn">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>


        {/* Directory columns */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:col-span-8 gap-8 font-heading">
          <div className="space-y-4">
            <h4 className="font-bold text-xs text-white uppercase tracking-wider">Product</h4>
            <ul className="space-y-2 text-xs text-muted font-sans">
              <li><a href="#features" className="hover:text-[#FFC801] transition-colors">Bento Stack</a></li>
              <li><a href="#dashboard" className="hover:text-[#FFC801] transition-colors">Model Analytics</a></li>
              <li><a href="#pricing" className="hover:text-[#FFC801] transition-colors">Compute Pricing</a></li>
              <li><a href="#workflow-builder" className="hover:text-[#FFC801] transition-colors">Synapse Pipeline</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-xs text-white uppercase tracking-wider">Company</h4>
            <ul className="space-y-2 text-xs text-muted font-sans">
              <li><a href="#" className="hover:text-[#FFC801] transition-colors">About Us</a></li>
              <li><a href="#security" className="hover:text-[#FFC801] transition-colors">Security Core</a></li>
              <li><a href="#" className="hover:text-[#FFC801] transition-colors">Careers (We're hiring)</a></li>
              <li><a href="#" className="hover:text-[#FFC801] transition-colors">Press Kit</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-xs text-white uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2 text-xs text-muted font-sans">
              <li><a href="#" className="hover:text-[#FFC801] transition-colors">System Status</a></li>
              <li><a href="#" className="hover:text-[#FFC801] transition-colors">API References</a></li>
              <li><a href="#" className="hover:text-[#FFC801] transition-colors">Developer Docs</a></li>
              <li><a href="#" className="hover:text-[#FFC801] transition-colors">Node Registry</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-xs text-white uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2 text-xs text-muted font-sans">
              <li><a href="#" className="hover:text-[#FFC801] transition-colors">Privacy Shield</a></li>
              <li><a href="#" className="hover:text-[#FFC801] transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-[#FFC801] transition-colors">SLA Agreement</a></li>
              <li><a href="#" className="hover:text-[#FFC801] transition-colors">GDPR Annex</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-muted font-sans gap-4">
        <span>© {new Date().getFullYear()} NeuroFlow AI Inc. All rights reserved.</span>
        <div className="flex gap-6">
          <a href="#" className="hover:underline">Security Protocols</a>
          <a href="#" className="hover:underline">Status: 99.98%</a>
        </div>
      </div>
    </footer>
  );
}
