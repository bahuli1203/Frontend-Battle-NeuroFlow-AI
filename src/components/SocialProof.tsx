"use client";

import React from "react";

const LOGOS = [
  {
    name: "Tesla",
    svg: (
      <svg className="w-20 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 4.5l1 1.5 9-1.5 9 1.5 1-1.5zM21.5 8H2.5L2 9.5h19.5zM2 13h20v1.5H2zM12 18.5l-8.5-2v1.5l8.5 2 8.5-2v-1.5z" />
      </svg>
    ),
  },
  {
    name: "Spotify",
    svg: (
      <svg className="w-24 h-7 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.565.387-.86.207-2.377-1.454-5.37-1.783-8.893-.98-.336.075-.67-.136-.746-.472-.077-.336.135-.67.472-.746 3.855-.88 7.15-.51 9.816 1.127.295.18.388.566.21.864zm1.224-2.723c-.226.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.08-1.182-.413.125-.85-.107-.975-.52-.125-.413.108-.85.52-.975 3.66-1.11 8.224-.57 11.35 1.353.367.226.487.707.26 1.074zm.106-2.833C14.385 8.78 8.55 8.587 5.166 9.615c-.52.158-1.066-.143-1.224-.662-.158-.52.143-1.067.662-1.224 3.88-1.178 10.334-.954 14.437 1.483.47.28.623.89.344 1.358-.278.47-.888.62-1.358.342z" />
      </svg>
    ),
  },
  {
    name: "Airbnb",
    svg: (
      <svg className="w-24 h-7 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.015 2c-.63 0-1.21.32-1.57.87L3.485 13.91c-.4.62-.48 1.41-.2 2.1.28.7.9 1.21 1.63 1.38l6.47 1.44a1.5 1.5 0 00.64 0l6.47-1.44c.73-.17 1.35-.68 1.63-1.38.28-.69.2-1.48-.2-2.1l-6.96-11.04c-.36-.55-.94-.87-1.57-.87zm0 6.64c.82 0 1.5.68 1.5 1.5s-.68 1.5-1.5 1.5-1.5-.68-1.5-1.5.68-1.5 1.5-1.5z" />
      </svg>
    ),
  },
  {
    name: "OpenAI",
    svg: (
      <svg className="w-24 h-7 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.3 11.2c.2-.5.3-1.1.2-1.6-.1-.5-.4-1-.7-1.3-.3-.3-.8-.6-1.3-.7s-1-.1-1.5.1c-.2-.5-.5-1-.9-1.3-.4-.3-.9-.5-1.4-.6-.5-.1-1.1 0-1.6.2-.5.2-1 .5-1.3.9-.4-.4-.9-.7-1.5-.8s-1.1 0-1.6.2c-.5.2-1 .5-1.3.9-.3-.5-.8-.8-1.3-.9s-1.1-.1-1.6.1c-.5.2-1 .5-1.3.9-.3-.5-.7-.8-1.2-1-.5-.2-1.1-.3-1.6-.2s-1 .3-1.4.6c-.4.3-.7.8-.8 1.3s-.1 1 .1 1.5c-.5.2-1 .5-1.3.9-.3.4-.5.9-.6 1.4-.1.5 0 1.1.2 1.6.2.5.5 1 .9 1.3.4.4.9.7 1.5.8.5.1 1.1 0 1.6-.2.5-.2 1-.5 1.3-.9.4.4.9.7 1.5.8.5.1 1.1 0 1.6-.2.5-.2 1-.5 1.3-.9.3.5.8.8 1.3.9.5.1 1.1.1 1.6-.1.5-.2 1-.5 1.3-.9.3.5.7.8 1.2 1 .5.2 1.1.3 1.6.2s1-.3 1.4-.6c.4-.3.7-.8.8-1.3s.1-1-.1-1.5c.5-.2 1-.5 1.3-.9.3-.4.5-.9.6-1.4.1-.5 0-1.1-.2-1.6z" />
      </svg>
    ),
  },
  {
    name: "Adobe",
    svg: (
      <svg className="w-20 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.92 2H22v20l-8.08-20zM9.9 2H2v20l7.9-20zM12 9.5l4 9.5H8l4-9.5z" />
      </svg>
    ),
  },
];

export default function SocialProof() {
  // Triple the list to ensure seamless marquee wrap
  const doubledLogos = [...LOGOS, ...LOGOS, ...LOGOS];

  return (
    <section className="relative py-12 bg-[#0B1026]/40 border-y border-white/5 overflow-hidden">
      {/* Muted background gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#050816] via-transparent to-[#050816] z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <h2 className="text-xs font-heading font-semibold text-muted uppercase tracking-widest">
          Trusted By Industry Pioneers & Global Enterprises
        </h2>
      </div>

      {/* Infinite scrolling slider */}
      <div className="flex w-full overflow-hidden relative">
        <div className="flex gap-20 items-center justify-around whitespace-nowrap animate-marquee">
          {doubledLogos.map((logo, idx) => (
            <div
              key={idx}
              className="text-[#94A3B8]/40 hover:text-white/80 transition-colors duration-300 flex items-center justify-center shrink-0 cursor-default"
            >
              {logo.svg}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
