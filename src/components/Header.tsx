"use client";

import React, { useState, useEffect } from "react";
import {
  CubeSolidIcon,
  MenuIcon,
  XMarkIcon,
  ArrowRightIcon,
} from "@/components/icons/CustomIcons";

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
          ? "py-4 bg-[#172B36]/80 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/20"
          : "py-6 bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF9932] to-[#FFC801] p-[1px] transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full bg-[#172B36] rounded-[11px] flex items-center justify-center">
              <CubeSolidIcon className="w-5 h-5 text-[#FFC801] group-hover:text-white transition-colors duration-300" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-[#FF9932] to-[#FFC801] rounded-xl blur-md opacity-30 group-hover:opacity-60 transition-opacity duration-300" />
          </div>
          <span className="font-heading font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-[#F1F6F4]">
            NeuroFlow<span className="text-[#FFC801] font-medium font-sans text-sm ml-0.5 px-1.5 py-0.5 rounded-md bg-[#FFC801]/10 border border-[#FFC801]/20">AI</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-heading text-xs uppercase tracking-wider font-semibold">
          <a href="#features" className="text-muted hover:text-white transition-colors duration-200">
            Features
          </a>
          <a href="#dashboard" className="text-muted hover:text-white transition-colors duration-200">
            Dashboard
          </a>
          <a href="#workflow-builder" className="text-muted hover:text-white transition-colors duration-200">
            Workflow
          </a>
          <a href="#pricing" className="text-muted hover:text-white transition-colors duration-200">
            Pricing
          </a>
          <a href="#security" className="text-muted hover:text-white transition-colors duration-200">
            Security
          </a>
        </nav>

        {/* Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#pricing"
            className="text-xs font-semibold uppercase tracking-wider text-[#F1F6F4] hover:text-[#FFC801] transition-colors duration-200"
          >
            Sign In
          </a>
          <a
            href="#pricing"
            className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-[10px] uppercase tracking-wider font-bold rounded-xl group bg-gradient-to-br from-[#FF9932] via-[#FFC801] to-[#D9E8E2] hover:text-white dark:text-white focus:ring-2 focus:outline-none focus:ring-[#FFC801] transition-transform active:scale-95 cursor-pointer select-none"
          >
            <span className="relative px-5 py-2 transition-all ease-in duration-75 bg-[#172B36] rounded-[10px] group-hover:bg-opacity-0 flex items-center gap-1.5 font-heading">
              Deploy Free <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-muted hover:text-white transition-colors"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass-panel-heavy border-b border-white/5 py-6 px-6 flex flex-col gap-6 shadow-2xl animate-fade-in-down">
          <nav className="flex flex-col gap-4 font-heading text-sm uppercase font-semibold">
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="text-muted hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="#dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="text-muted hover:text-white transition-colors"
            >
              Dashboard
            </a>
            <a
              href="#workflow-builder"
              onClick={() => setMobileMenuOpen(false)}
              className="text-muted hover:text-white transition-colors"
            >
              Workflow
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="text-muted hover:text-white transition-colors"
            >
              Pricing
            </a>
            <a
              href="#security"
              onClick={() => setMobileMenuOpen(false)}
              className="text-muted hover:text-white transition-colors"
            >
              Security
            </a>
          </nav>
          <div className="w-full h-[1px] bg-white/5 my-2" />
          <div className="flex flex-col gap-4 font-heading">
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center text-muted hover:text-white transition-colors py-2 uppercase text-xs font-bold"
            >
              Sign In
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 bg-gradient-to-r from-[#FF9932] to-[#FFC801] hover:from-[#FFC801] hover:to-[#D9E8E2] text-white font-medium rounded-xl transition-all shadow-lg text-xs font-bold uppercase"
            >
              Deploy Free
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
