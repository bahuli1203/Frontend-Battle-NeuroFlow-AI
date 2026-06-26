import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NeuroFlow AI | Real-Time AI Data Automation Platform",
  description: "Transform data into decisions at the speed of thought. Next-generation autonomous AI workflows and predictive analytics built for modern enterprises.",
  metadataBase: new URL("https://neuroflow-ai-demo.vercel.app"),
  openGraph: {
    title: "NeuroFlow AI | Real-Time AI Data Automation Platform",
    description: "Transform data into decisions at the speed of thought. Next-generation autonomous AI workflows and predictive analytics built for modern enterprises.",
    url: "https://neuroflow-ai-demo.vercel.app",
    siteName: "NeuroFlow AI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NeuroFlow AI Data Automation Platform Platform Showcase",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NeuroFlow AI | Real-Time AI Data Automation Platform",
    description: "Transform data into decisions at the speed of thought. Next-generation autonomous AI workflows and predictive analytics built for modern enterprises.",
    images: ["/og-image.png"],
    creator: "@neuroflow_ai",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} ${inter.variable} h-full antialiased dark`}
      style={{ colorScheme: "dark" }}
    >
      <body className="min-h-full flex flex-col bg-[#172B36] text-[#F1F6F4] font-sans selection:bg-[#FF9932]/30 selection:text-white overflow-x-hidden">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}


