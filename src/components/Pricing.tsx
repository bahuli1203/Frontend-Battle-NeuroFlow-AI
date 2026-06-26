"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Check, Sparkles, HelpCircle } from "lucide-react";

// --- Types & Matrix configuration ---
type Currency = "usd" | "eur" | "inr";
type Billing = "monthly" | "annual";

const pricingMatrix = {
  starter: {
    usd: 19,
    eur: 17,
    inr: 1499,
  },
  pro: {
    usd: 49,
    eur: 45,
    inr: 3999,
  },
  enterprise: {
    usd: 99,
    eur: 89,
    inr: 7999,
  },
};

const currencySymbols = {
  usd: "$",
  eur: "€",
  inr: "₹",
};

// --- Publish-Subscribe Store for isolated states ---
class PriceStore {
  private currency: Currency = "usd";
  private billing: Billing = "monthly";
  private listeners = new Set<() => void>();

  getState() {
    return { currency: this.currency, billing: this.billing };
  }

  setCurrency(currency: Currency) {
    if (this.currency !== currency) {
      this.currency = currency;
      this.notify();
    }
  }

  setBilling(billing: Billing) {
    if (this.billing !== billing) {
      this.billing = billing;
      this.notify();
    }
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l());
  }
}

// Instantiate single local store for the pricing section
const storeInstance = new PriceStore();

// --- Isolated Price Text Renderer ---
const PriceText = React.memo(({ tier }: { tier: "starter" | "pro" | "enterprise" }) => {
  const [priceState, setPriceState] = useState(() => storeInstance.getState());

  useEffect(() => {
    return storeInstance.subscribe(() => {
      setPriceState(storeInstance.getState());
    });
  }, []);

  // Calculate pricing dynamically
  const displayedPrice = useMemo(() => {
    const base = pricingMatrix[tier][priceState.currency];
    if (priceState.billing === "annual") {
      return base * 0.8; // Apply 20% discount
    }
    return base;
  }, [tier, priceState.currency, priceState.billing]);

  const symbol = currencySymbols[priceState.currency];
  
  // In INR, we round to whole numbers, for USD/EUR we keep 1 decimal if fraction remains
  const formattedVal = priceState.currency === "inr" 
    ? Math.round(displayedPrice).toLocaleString()
    : displayedPrice.toFixed(1).replace(".0", "");

  return (
    <span className="font-heading font-extrabold text-5xl text-white tracking-tight tabular-nums transition-all animate-fade-in">
      {symbol}
      {formattedVal}
      <span className="text-xs font-medium text-muted ml-1.5 uppercase font-sans">
        / {priceState.billing === "monthly" ? "mo" : "yr"}
      </span>
    </span>
  );
});

PriceText.displayName = "PriceText";

// --- Isolated Billing Switcher ---
const BillingSwitcher = React.memo(() => {
  const [billing, setBillingState] = useState<Billing>("monthly");

  const toggle = (mode: Billing) => {
    setBillingState(mode);
    storeInstance.setBilling(mode);
  };

  return (
    <div className="relative flex items-center bg-[#0B1026] p-1 rounded-xl border border-white/5 shadow-inner">
      {/* Moving slider indicator */}
      <div
        className={`absolute top-1 bottom-1 w-[46%] rounded-lg bg-gradient-to-r from-[#7B61FF] to-[#00D4FF] transition-all duration-200 ease-out`}
        style={{
          transform: billing === "monthly" ? "translateX(2%)" : "translateX(112%)",
        }}
      />
      <button
        onClick={() => toggle("monthly")}
        className={`relative z-10 px-4 py-2 text-xs font-semibold rounded-lg transition-colors font-heading ${
          billing === "monthly" ? "text-white" : "text-muted hover:text-white"
        }`}
      >
        Monthly
      </button>
      <button
        onClick={() => toggle("annual")}
        className={`relative z-10 px-4 py-2 text-xs font-semibold rounded-lg transition-colors font-heading flex items-center gap-1.5 ${
          billing === "annual" ? "text-white" : "text-muted hover:text-white"
        }`}
      >
        Annual
        <span className="px-1.5 py-0.5 rounded bg-[#00FFB2]/20 border border-[#00FFB2]/30 text-[9px] text-[#00FFB2] font-extrabold">
          -20%
        </span>
      </button>
    </div>
  );
});

BillingSwitcher.displayName = "BillingSwitcher";

// --- Isolated Currency Switcher ---
const CurrencySwitcher = React.memo(() => {
  const [currency, setCurrencyState] = useState<Currency>("usd");

  const select = (curr: Currency) => {
    setCurrencyState(curr);
    storeInstance.setCurrency(curr);
  };

  return (
    <div className="flex bg-[#0B1026] p-1 rounded-xl border border-white/5 shadow-inner gap-1">
      {(["usd", "eur", "inr"] as Currency[]).map((c) => (
        <button
          key={c}
          onClick={() => select(c)}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg uppercase tracking-wider transition-all font-heading ${
            currency === c
              ? "bg-white/10 text-white border border-white/10 shadow-md"
              : "text-muted hover:text-white border border-transparent"
          }`}
        >
          {c}
        </button>
      ))}
    </div>
  );
});

CurrencySwitcher.displayName = "CurrencySwitcher";

// --- Isolated Cost Savings Calculator ---
const SavingsCalculator = React.memo(() => {
  const [employees, setEmployees] = useState(50);
  const [automations, setAutomations] = useState(5000);

  // Time saved in hours: Employees * 8 hrs + Automations * 0.25 hrs
  const hoursSaved = employees * 8 + (automations * 15) / 60;
  // Avg employee hourly loaded cost of $35
  const costSaved = hoursSaved * 35;
  // Annual savings:
  const annualSavings = costSaved * 12;
  // ROI: (annualSavings - 49 * 12) / (49 * 12) * 100
  const roi = Math.round(((annualSavings - 49 * 12) / (49 * 12)) * 100);

  // Deterministic local integer formatter to prevent Next.js hydration mismatches
  const formatInt = (val: number) => {
    return Math.round(val).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="mt-20 p-8 glass-panel border border-white/5 rounded-3xl max-w-3xl mx-auto glass-card-glow-blue space-y-8">
      <div className="text-center space-y-1">
        <h3 className="font-heading font-extrabold text-lg text-white">Cost & ROI Estimator</h3>
        <p className="text-xs text-muted">Estimate time and monetary savings by automating workflows on NeuroFlow AI.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* Employee Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-white/80">Active Team Members</span>
              <span className="text-[#00D4FF] font-mono">{employees} Employees</span>
            </div>
            <input
              type="range"
              min="5"
              max="500"
              value={employees}
              onChange={(e) => setEmployees(parseInt(e.target.value))}
              className="w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-[#00D4FF]"
            />
          </div>

          {/* Automations Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-white/80">Monthly Automations</span>
              <span className="text-[#7B61FF] font-mono">{formatInt(automations)} /mo</span>
            </div>
            <input
              type="range"
              min="500"
              max="50000"
              step="500"
              value={automations}
              onChange={(e) => setAutomations(parseInt(e.target.value))}
              className="w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-[#7B61FF]"
            />
          </div>
        </div>

        {/* Output Grid */}
        <div className="grid grid-cols-2 gap-4 bg-[#050816]/60 p-4 border border-white/5 rounded-2xl">
          <div className="flex flex-col justify-center">
            <span className="text-[10px] text-muted uppercase font-bold tracking-wider">Time Saved</span>
            <span className="text-lg font-heading font-bold text-white mt-1 tabular-nums">
              {formatInt(hoursSaved)} hrs<span className="text-[10px] text-muted font-sans font-medium ml-1">/mo</span>
            </span>
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-[10px] text-muted uppercase font-bold tracking-wider">Estimated Savings</span>
            <span className="text-lg font-heading font-bold text-[#00FFB2] mt-1 tabular-nums">
              ${formatInt(costSaved)}<span className="text-[10px] text-muted font-sans font-medium ml-1">/mo</span>
            </span>
          </div>
          <div className="flex flex-col justify-center col-span-2 pt-2 border-t border-white/5 mt-2">
            <span className="text-[10px] text-muted uppercase font-bold tracking-wider">Annual System ROI</span>
            <span className="text-xl font-heading font-extrabold text-white mt-1 text-glow-purple tabular-nums">
              +{formatInt(roi)}% <span className="text-xs text-muted font-sans font-normal ml-1">Return Vector</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

SavingsCalculator.displayName = "SavingsCalculator";

// --- Main Pricing Component (Fully Memoized Structure) ---
export default function Pricing() {
  const tiers = [
    {
      id: "starter" as const,
      name: "Starter Nodes",
      desc: "Perfect for developer sandboxes, workflows experiments, and LLM diagnostics.",
      features: [
        "Up to 5 active agent nodes",
        "10,000 automated runs/mo",
        "Standard data connectors (S3, Postgres)",
        "24-hour scheduled sync cycles",
        "Community support & docs access",
      ],
      cta: "Deploy Sandbox Node",
      popular: false,
      glow: "glass-card-glow-blue",
      border: "rgba(255,255,255,0.05)",
    },
    {
      id: "pro" as const,
      name: "Professional Cloud",
      desc: "Designed for high-growth startups and full enterprise workflow orchestration.",
      features: [
        "Unlimited workflow agent nodes",
        "500,000 automated runs/mo",
        "500+ integrations (Snowflake, Stripe)",
        "Sub-second Webhook sync loops",
        "Priority Slack support channel",
        "Custom schema parsing maps",
      ],
      cta: "Initialize Production Cloud",
      popular: true,
      glow: "glass-card-glow-purple",
      border: "rgba(123, 97, 255, 0.4)",
    },
    {
      id: "enterprise" as const,
      name: "Autonomous Grid",
      desc: "Dedicated computing instances for high-throughput compliance workloads.",
      features: [
        "Dedicated GPU cluster nodes",
        "Unlimited automated run loops",
        "Custom database pipelines & scripts",
        "Sub-millisecond inference speeds",
        "Dedicated architect SLA",
        "SOC2/GDPR compliance shielding",
      ],
      cta: "Contact Architecture Team",
      popular: false,
      glow: "glass-card-glow-green",
      border: "rgba(0, 255, 178, 0.4)",
    },
  ];

  return (
    <section id="pricing" className="relative py-32 bg-[#050816]">
      {/* Background neon flares */}
      <div className="absolute top-[20%] left-[20%] w-[35vw] h-[35vw] rounded-full bg-[#7B61FF]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[20%] w-[30vw] h-[30vw] rounded-full bg-[#00FFB2]/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FFB2]" />
            <span className="text-xs font-heading font-semibold text-[#00FFB2] tracking-wider uppercase">
              Predictable Matrix Pricing
            </span>
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.15]">
            Planetary Compute Scale
          </h2>
          <p className="text-sm sm:text-base text-muted font-sans max-w-xl mx-auto">
            Scale seamlessly across multi-agent nodes. Switch currency or billing modes in real-time with zero global re-renders.
          </p>
        </div>

        {/* Pricing Controls: Isolated Switchers */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <BillingSwitcher />
          <CurrencySwitcher />
        </div>

        {/* Pricing Tier Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`glass-panel border rounded-3xl p-8 flex flex-col justify-between relative transition-all duration-300 ${
                tier.popular ? "bg-[#0B1026]/75 scale-102 z-10" : "bg-[#0B1026]/40 hover:-translate-y-1"
              } ${tier.glow}`}
              style={{ borderColor: tier.border }}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#7B61FF] to-[#00D4FF] text-[10px] font-bold text-white uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 fill-white/20" />
                  Most Popular
                </div>
              )}

              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-heading font-extrabold text-xl text-white tracking-tight">
                    {tier.name}
                  </h3>
                </div>
                <p className="text-xs text-muted leading-relaxed font-sans min-h-[48px]">
                  {tier.desc}
                </p>

                {/* Price Display: Fully Isolated Sub-component */}
                <div className="py-4 border-y border-white/5">
                  <PriceText tier={tier.id} />
                </div>

                <ul className="space-y-3.5 pt-4">
                  {tier.features.map((feat, index) => (
                    <li key={index} className="flex items-start gap-2.5 text-xs text-white/80">
                      <div className="flex items-center justify-center w-4 h-4 rounded-full bg-[#00FFB2]/10 border border-[#00FFB2]/20 mt-0.5 shrink-0">
                        <Check className="w-3 h-3 text-[#00FFB2]" />
                      </div>
                      <span className="font-sans leading-tight">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <button
                  className={`w-full py-3.5 rounded-xl font-heading font-semibold text-xs transition-all active:scale-98 ${
                    tier.popular
                      ? "bg-gradient-to-r from-[#7B61FF] to-[#00D4FF] hover:from-[#00D4FF] hover:to-[#00FFB2] text-white shadow-lg shadow-[#7B61FF]/15"
                      : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                  }`}
                >
                  {tier.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cost Savings Calculator */}
        <SavingsCalculator />
      </div>
    </section>
  );
}
