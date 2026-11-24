import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProblemSolution, Services } from "@/components/Services";
import { ProcessSection, PromiseSection, ProofSection, WhyUs } from "@/components/TrustSections";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { StickyBar } from "@/components/StickyBar";
import { StrategyBrief } from "@/components/StrategyBrief";
import { track } from "@/lib/tracking";

export default function App() {
  const [briefOpen, setBriefOpen] = useState(false);

  useEffect(() => {
    const hasBriefHash = window.location.hash === "#brief";
    if (hasBriefHash) {
      setBriefOpen(true);
      track("brief_open", { source: "direct_hash" });
    }
  }, []);

  const openBrief = () => {
    track("brief_open", { source: "footer" });
    setBriefOpen(true);
  };

  const closeBrief = () => {
    setBriefOpen(false);
    if (window.location.hash === "#brief") {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    }
  };

  return (
    <div className="min-h-screen bg-paper">
      <a
        href="#main"
        className="fixed top-2 left-2 z-[90] -translate-y-24 rounded-lg bg-ink px-4 py-2.5 text-sm font-bold text-white transition focus:translate-y-0"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <ProblemSolution />
        <Services />
        <PromiseSection />
        <ProcessSection />
        <ProofSection />
        <WhyUs />
        <Faq />
        <FinalCta />
      </main>
      <Footer onOpenBrief={openBrief} />
      <StickyBar />
      <StrategyBrief open={briefOpen} onClose={closeBrief} />
    </div>
  );
}
