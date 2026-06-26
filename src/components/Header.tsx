"use client";

import React, { useState, useEffect } from "react";
import { Cpu, Menu, X, ArrowRight } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-4 bg-[#050816]/75 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/20"
          : "py-6 bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7B61FF] to-[#00D4FF] p-[1px] transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full bg-[#050816] rounded-[11px] flex items-center justify-center">
              <Cpu className="w-5 h-5 text-[#00D4FF] group-hover:text-white transition-colors duration-300" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-[#7B61FF] to-[#00D4FF] rounded-xl blur-md opacity-30 group-hover:opacity-60 transition-opacity duration-300" />
          </div>
          <span className="font-heading font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-[#94A3B8]">
            NeuroFlow<span className="text-[#00D4FF] font-medium font-sans text-sm ml-0.5 px-1.5 py-0.5 rounded-md bg-[#00D4FF]/10 border border-[#00D4FF]/20">AI</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-muted hover:text-white transition-colors duration-200">
            Features
          </a>
          <a href="#dashboard" className="text-sm text-muted hover:text-white transition-colors duration-200">
            Dashboard
          </a>
          <a href="#pricing" className="text-sm text-muted hover:text-white transition-colors duration-200">
            Pricing
          </a>
          <a href="#process" className="text-sm text-muted hover:text-white transition-colors duration-200">
            Workflow
          </a>
          <a href="#testimonials" className="text-sm text-muted hover:text-white transition-colors duration-200">
            Enterprise
          </a>
        </nav>

        {/* Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#pricing"
            className="text-sm font-medium text-[#F8FAFC] hover:text-[#00D4FF] transition-colors duration-200"
          >
            Sign In
          </a>
          <a
            href="#pricing"
            className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium rounded-xl group bg-gradient-to-br from-[#7B61FF] via-[#00D4FF] to-[#00FFB2] hover:text-white dark:text-white focus:ring-2 focus:outline-none focus:ring-[#00D4FF] transition-transform active:scale-95"
          >
            <span className="relative px-5 py-2 transition-all ease-in duration-75 bg-[#050816] rounded-[10px] group-hover:bg-opacity-0 flex items-center gap-1.5 font-heading">
              Deploy Free <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-muted hover:text-white transition-colors"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass-panel-heavy border-b border-white/5 py-6 px-6 flex flex-col gap-6 shadow-2xl animate-fade-in-down">
          <nav className="flex flex-col gap-4">
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg text-muted hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="#dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg text-muted hover:text-white transition-colors"
            >
              Dashboard
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg text-muted hover:text-white transition-colors"
            >
              Pricing
            </a>
            <a
              href="#process"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg text-muted hover:text-white transition-colors"
            >
              Workflow
            </a>
            <a
              href="#testimonials"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg text-muted hover:text-white transition-colors"
            >
              Enterprise
            </a>
          </nav>
          <div className="w-full h-[1px] bg-white/5 my-2" />
          <div className="flex flex-col gap-4">
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center text-muted hover:text-white transition-colors py-2"
            >
              Sign In
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 bg-gradient-to-r from-[#7B61FF] to-[#00D4FF] hover:from-[#00D4FF] hover:to-[#00FFB2] text-white font-heading font-medium rounded-xl transition-all shadow-lg shadow-[#7B61FF]/20"
            >
              Deploy Free
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
