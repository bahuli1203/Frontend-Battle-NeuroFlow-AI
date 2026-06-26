<div align="center">

<br />

# ⬡ NeuroFlow AI

### Real-Time AI Data Automation Platform

**A premium, competition-winning landing page for an AI SaaS platform.**  
Built for the **Frontend Battle** hackathon — engineered to impress, designed to win.

<br />

[![Next.js](https://img.shields.io/badge/Next.js-16.2.9-black?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-0.185-black?style=for-the-badge&logo=threedotjs)](https://threejs.org/)

<br />

</div>

---

## 🌐 Live Preview

> Run locally with `npm run dev` → open [http://localhost:3000](http://localhost:3000)

---

## ✨ Overview

**NeuroFlow AI** is a fully responsive, dark-mode-first AI SaaS landing page designed with an editorial, premium aesthetic. It showcases real-time data automation features through animated bento-grid cards, a 3D interactive hero, and a polished component system — all wired together with a dynamic theme engine and keyboard-driven command palette.

The project was built as a **Frontend Battle hackathon submission**, pushing visual boundaries while maintaining clean, maintainable code.

---

## 🎨 Design System

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| `--arctic-powder` | `#F1F6F4` | Light surface, text on dark |
| `--mystic-mint` | `#D9E8E2` | Subtle highlights, accents |
| `--forsythia` | `#FFC801` | Primary brand gold |
| `--deep-saffron` | `#FF9932` | Secondary orange accent |
| `--nocturnal-expedition` | `#114C5A` | Mid-tone dark teal |
| `--oceanic-noir` | `#172B36` | Primary background |

### Typography

| Font | Source | Usage |
|---|---|---|
| **JetBrains Mono** | Google Fonts | Headings, counters, pricing, labels, nav |
| **Inter** | Google Fonts | Body copy, descriptions, buttons, forms |

### Visual Style
- **Glassmorphism** panels with layered blur and border opacity
- **Gradient meshes** as ambient background lighting
- **Micro-animations** on every interactive element
- **3D perspective tilt** on bento cards and the hero
- **CSS `currentColor`** theming for all custom SVG icons

---

## 🗂️ Project Structure

```
frontend/
├── SVGs/                          # Custom icon source files (14 icons)
│   ├── cube-16-solid.svg          # Brand / platform logo
│   ├── cog-8-tooth.svg            # Settings / pipeline
│   ├── chart-pie.svg              # Analytics / dashboard
│   ├── arrow-trending-up.svg      # Predictive analytics
│   ├── arrow-path.svg             # Workflow engine / refresh
│   ├── search.svg                 # Command palette search
│   ├── x-mark.svg                 # Close / dismiss
│   ├── link.svg / link-solid.svg  # Integrations / security
│   ├── chevron-*.svg              # Navigation chevrons
│   └── ...
│
├── src/
│   ├── app/
│   │   ├── globals.css            # Full design token system + animations
│   │   ├── layout.tsx             # Root layout with fonts & metadata
│   │   └── page.tsx               # Page assembly
│   │
│   ├── components/
│   │   ├── icons/
│   │   │   └── CustomIcons.tsx    # Centralized inlined SVG icon library
│   │   │
│   │   ├── Header.tsx             # Fixed nav with glass scroll effect
│   │   ├── Hero.tsx               # 3D interactive hero + particle field
│   │   ├── Features.tsx           # Bento grid with tilt cards
│   │   ├── Dashboard.tsx          # Live metrics dashboard visualization
│   │   ├── WorkflowBuilder.tsx    # Drag-and-drop visual pipeline UI
│   │   ├── Pricing.tsx            # Tiered pricing cards
│   │   ├── Stats.tsx              # Animated counter statistics
│   │   ├── Testimonials.tsx       # Social proof carousel
│   │   ├── Timeline.tsx           # Product roadmap / milestones
│   │   ├── SocialProof.tsx        # Logo trust strip
│   │   ├── TrustSecurity.tsx      # Security compliance badges
│   │   ├── WorldNetwork.tsx       # Animated global network map
│   │   ├── AutomationVisualization.tsx # Pipeline flow animation
│   │   ├── LiveActivityFeed.tsx   # Real-time activity ticker
│   │   ├── Footer.tsx             # Sitemap + social links
│   │   ├── GlassDock.tsx          # macOS-style magnification dock
│   │   ├── CommandPalette.tsx     # Ctrl+K command search palette
│   │   ├── PageLoader.tsx         # 3D animated loading screen
│   │   └── EasterEgg.tsx          # Hidden matrix mode (IDDQD)
│   │
│   └── context/
│       └── ThemeContext.tsx       # Global dynamic theme engine
│
├── public/                        # Static assets
├── next.config.ts
├── tailwind.config / postcss.config.mjs
└── tsconfig.json
```

---

## 🚀 Features

### 🏠 Hero Section
- **3D Tesseract** — a hypercube rendered in pure CSS 3D transforms, rotating on axis
- **Interactive particle field** — mouse-tracking particle system
- **Mobile tap support** — physics-based ball bounce on touch devices
- Animated headline with gradient text and stagger-in effect

### 🧩 Bento Features Grid
- 6 feature cards in a responsive 12-column bento layout
- **3D perspective tilt** — each card reacts to mouse position
- Mobile **accordion** with smooth height transitions
- Feature cards: AI Agents · Predictive Analytics · Smart Integrations · Enterprise Security · Workflow Engine · Real-Time Insights

### 📊 Dashboard & Visualizations
- Live-updating metric cards with animated counters
- SVG-based animated line graphs and pipeline flows
- `WorldNetwork` — animated global connection map
- `AutomationVisualization` — pipeline data-flow canvas

### ⌨️ Command Palette (`Ctrl+K` / `⌘K`)
- Full fuzzy search across all commands
- Navigation shortcuts, theme switching, matrix mode
- Custom SVG icons for every action item
- Keyboard-navigable with `ESC` to close

### 🚢 GlassDock
- macOS-style bottom dock with **proximity magnification**
- Icons: Features · Dashboard · Pipeline · Pricing · Command Palette · AI Voice Guide
- Disabled magnification on mobile (touch-friendly tap targets)
- Theme-reactive border glow

### 🎨 Dynamic Theme Engine
3 switchable accent themes via `ThemeContext`:
| Theme | Color |
|---|---|
| Deep Saffron | `#FF9932` |
| Mystic Mint | `#D9E8E2` |
| Forsythia | `#FFC801` |

### 🥚 Easter Egg — Matrix Mode
Type `IDDQD` anywhere on the page to trigger the hidden matrix rain animation. Also accessible from the Command Palette → "Initialize Matrix Mode".

### 🔒 Trust & Security Section
- SOC2, GDPR, ISO 27001 compliance badges
- Animated rotating security vault graphic
- TLS 1.3 strict mode indicator

### 💬 Social Proof & Testimonials
- Animated logo trust strip (scrolling marquee)
- Testimonial cards with avatar, rating, and company
- Live activity feed ticker

### 📱 Fully Responsive
- Mobile-first breakpoints throughout
- Touch event support (tap, swipe)
- Collapsing nav with animated hamburger → X icon

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 16.2.9 | App framework (App Router) |
| **React** | 19.2.4 | UI components |
| **TypeScript** | 5 | Type safety |
| **Tailwind CSS** | v4 | Utility-first styling |
| **Three.js** | 0.185 | 3D scene rendering in hero |
| **Lucide React** | 1.21.0 | Base icon fallback set |
| **Custom SVGs** | — | 14 bespoke inlined icons |

---

## 📦 Getting Started

### Prerequisites
- Node.js 18+
- npm / yarn / pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/bahuli1203/Frontend-Battle-NeuroFlow-AI.git
cd Frontend-Battle-NeuroFlow-AI

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

---

## 🎯 Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl+K` / `⌘K` | Open Command Palette |
| `Escape` | Close Command Palette |
| `G F` | Go to Features |
| `G D` | Go to Dashboard |
| `G W` | Go to Workflow Builder |
| `G P` | Go to Pricing |
| `T P` | Switch to Deep Saffron theme |
| `T B` | Switch to Mystic Mint theme |
| `T G` | Switch to Forsythia theme |
| `IDDQD` (type anywhere) | Activate Matrix Easter Egg 🟩 |

---

## 🖼️ Custom Icon System

All icons live in `SVGs/` and are inlined via `src/components/icons/CustomIcons.tsx`.  
Each icon accepts a `className` prop and inherits color via `currentColor` — no hardcoded fills.

| Icon Component | Source SVG | Used In |
|---|---|---|
| `CubeSolidIcon` | `cube-16-solid.svg` | Header logo, GlassDock command |
| `SearchIcon` | `search.svg` | CommandPalette input |
| `XMarkIcon` | `x-mark.svg` | CommandPalette close, mobile menu |
| `Cog8ToothIcon` | `cog-8-tooth.svg` | GlassDock pipeline, Features security |
| `ChartPieIcon` | `chart-pie.svg` | GlassDock dashboard |
| `ArrowTrendingUpIcon` | `arrow-trending-up.svg` | Features analytics |
| `ArrowPathIcon` | `arrow-path.svg` | Features workflow engine |
| `LinkSolidIcon` | `link-solid.svg` | Features security |
| `ChevronDownIcon` | `chevron-down.svg` | Features mobile accordion |
| `ArrowRightIcon` | *(built-in)* | Header CTA, CommandPalette |
| `MenuIcon` | *(built-in)* | Mobile nav toggle |

---

## 🏆 Hackathon Context

**Event:** Frontend Battle  
**Category:** AI SaaS Landing Page  
**Goal:** Build a hackathon-winning, competition-grade frontend that demonstrates mastery of:
- Premium design systems and editorial aesthetics
- 3D CSS and WebGL (Three.js)
- Animation, micro-interactions, and performance
- Accessibility, responsiveness, and keyboard UX
- Clean, scalable React/TypeScript architecture

---

## 📄 License

This project was created for the **Frontend Battle** hackathon.  
Feel free to use as a reference or template for your own projects.

---

<div align="center">

Made with ❤️ for **Frontend Battle** · Built by **Shravani**

⬡ *NeuroFlow AI — Engineered for Planetary-Scale Data Orchestration*

</div>
