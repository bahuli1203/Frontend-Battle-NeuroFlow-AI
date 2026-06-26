import React from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import Stats from "@/components/Stats";
import LiveActivityFeed from "@/components/LiveActivityFeed";
import Features from "@/components/Features";
import Dashboard from "@/components/Dashboard";
import AutomationVisualization from "@/components/AutomationVisualization";
import WorkflowBuilder from "@/components/WorkflowBuilder";
import WorldNetwork from "@/components/WorldNetwork";
import TrustSecurity from "@/components/TrustSecurity";
import Timeline from "@/components/Timeline";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import GlassDock from "@/components/GlassDock";
import CommandPalette from "@/components/CommandPalette";
import EasterEgg from "@/components/EasterEgg";
import PageLoader from "@/components/PageLoader";

export default function Home() {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "NeuroFlow AI",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "19.00",
      "priceCurrency": "USD"
    },
    "description": "Transform data into decisions at the speed of thought. AI-powered workflow automation platform designed for modern enterprises.",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.95",
      "reviewCount": "1240"
    }
  };

  return (
    <>
      {/* Dynamic Brand Word Typing Page Loader */}
      <PageLoader />

      {/* Search Engine Structured Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      <Header />
      
      <main className="flex-1 w-full pb-20">
        <Hero />
        <SocialProof />
        
        <Stats />
        
        {/* Telemetry Console Stream */}
        <section className="py-20 relative bg-[#172B36] overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[30vh] bg-[#FF9932]/2 rounded-full blur-[120px] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-8">
            <div className="max-w-xl mx-auto text-center mb-4">
              <h2 className="text-xs font-heading font-semibold text-muted uppercase tracking-widest">
                Real-Time Telemetry Stream
              </h2>
            </div>
            <LiveActivityFeed />
          </div>
        </section>

        <Features />
        <Dashboard />
        <AutomationVisualization />
        <WorkflowBuilder />
        
        {/* Low-latency network connectivity map */}
        <WorldNetwork />
        
        <Timeline />
        
        {/* Compliance audit trust badges */}
        <TrustSecurity />

        <Pricing />
        <Testimonials />
      </main>

      <Footer />

      {/* Futuristic WoW-Factor Overlays */}
      <GlassDock />
      <CommandPalette />
      <EasterEgg />
    </>
  );
}


