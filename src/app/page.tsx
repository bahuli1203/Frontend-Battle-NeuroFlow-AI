import React from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import Stats from "@/components/Stats";
import Features from "@/components/Features";
import Dashboard from "@/components/Dashboard";
import AutomationVisualization from "@/components/AutomationVisualization";
import WorkflowBuilder from "@/components/WorkflowBuilder";
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
        <Features />
        <Dashboard />
        <AutomationVisualization />
        <WorkflowBuilder />
        <Timeline />
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


