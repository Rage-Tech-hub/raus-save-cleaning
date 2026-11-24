import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowDown,
  Check,
  ClipboardList,
  FlaskConical,
  Info,
  Layers3,
  MousePointerClick,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { BrandMark } from "@/components/Brand";
import { track } from "@/lib/tracking";

type BriefProps = {
  open: boolean;
  onClose: () => void;
};

type Label = "verified" | "inferred" | "unknown" | "estimate";

function Fact({ label, children }: { label: Label; children: ReactNode }) {
  const styles: Record<Label, string> = {
    verified: "bg-sage text-forest border-sage-dark/50",
    inferred: "bg-[#f4ead2] text-[#785526] border-[#d8c49c]",
    unknown: "bg-[#f1e2dc] text-clay border-[#d9b9ad]",
    estimate: "bg-[#e7e8ee] text-[#4c5367] border-[#c8cad8]",
  };
  const text: Record<Label, string> = {
    verified: "VERIFIED",
    inferred: "INFERRED",
    unknown: "UNKNOWN",
    estimate: "ESTIMATE",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-1.5 py-0.5 align-middle text-[0.53rem] font-extrabold tracking-[0.08em] ${styles[label]}`}
    >
      {text[label]}
      <span className="sr-only">: </span>
      <span className="ml-1 font-medium normal-case tracking-normal">{children}</span>
    </span>
  );
}

function SourceLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="font-semibold text-forest underline decoration-forest/30 underline-offset-2 hover:decoration-forest"
    >
      {children}
    </a>
  );
}

function StageHeading({
  number,
  title,
  kicker,
  icon: Icon,
}: {
  number: string;
  title: string;
  kicker: string;
  icon: typeof Search;
}) {
  return (
    <div className="flex items-start gap-3.5">
      <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-ink text-lime">
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <div>
        <p className="text-[0.58rem] font-extrabold tracking-[0.14em] text-muted uppercase">
          Stage {number} · {kicker}
        </p>
        <h3 className="mt-1 font-display text-[1.7rem] leading-[1.08] font-semibold tracking-[-0.03em] text-ink sm:text-[2rem]">
          {title}
        </h3>
      </div>
    </div>
  );
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-ink/10 bg-white p-5 sm:p-6 ${className}`}>
      {children}
    </div>
  );
}

function MiniLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-[0.57rem] font-extrabold tracking-[0.12em] text-muted uppercase">{children}</p>
  );
}

const auditRows = [
  ["Industry + sub-niche", "Residential cleaning: home, deep and end-of-tenancy cleaning in London."],
  ["What they sell", "Proposed service mix; no owned service page or list was found. Owner approval required."],
  ["Price tier signals", "No public price, range or pricing method verified."],
  ["Service area", "London (client-supplied input). Exact boroughs and coverage rules are not confirmed."],
  ["Hours + contact", "No verified hours, phone, email or booking channel found."],
  ["Logo", "No logo file or image found. The current wordmark and leaf mark are placeholders."],
  ["Brand colours", "No CSS or logo file to sample. Palette is proposed, not brand-verified."],
  ["Fonts", "No live site to inspect. Proposed: Fraunces + DM Sans."],
  ["Current positioning", "No current website or owned content found from which to assess positioning."],
  ["Headline / tagline", "No current headline or tagline found."],
  ["Proof assets", "No Google Business Profile, reviews, rating, insurance document, award or licence verified."],
] as const;

const checklistSeed = [
  "Replace 020 7946 0958 with the real tracked call number",
  "Add a real email address and booking/reply hours",
  "Supply the trading name, street address and Google Business Profile URL",
  "Supply the approved logo file (SVG preferred) or approve the temporary wordmark",
  "Confirm or replace the proposed palette and fonts",
  "Approve every promise: scope, price, timing, insurance and finish check",
  "Add the approved guarantee terms and response window",
  "Add 2–3 real reviews with name, source URL, date and permission",
  "Link the verified Google / Trustpilot profile when it exists",
  "Add team or owner photos with permission; replace illustrative stock",
  "Connect the form to email/CRM and confirm what happens to each lead",
  "Publish a privacy notice, data-retention policy and consent wording",
  "Add the verified company number, trading address and VAT position if applicable",
  "Confirm service-area rules and whether all London postcodes are accepted",
  "Install GA4 + call/form conversion tracking and test every event",
  "Add a favicon, domain, canonical URL and final social preview image",
  "Remove the preview labels once every placeholder is resolved",
];

const tests = [
  {
    rank: "01",
    name: "Verified proof next to the quote form",
    hypothesis:
      "Once 3+ genuine reviews and a verifiable Google rating exist, adding them near the form will outperform the current honest empty review wall.",
    metric: "quote_submit rate",
    evidence:
      "Competitors lead with large review volumes; positive review language centres on punctuality, thoroughness and politeness.",
  },
  {
    rank: "02",
    name: "Outcome headline vs reliability headline",
    hypothesis:
      "Test the current 'A cleaner home. None of the chasing.' against a scope-led headline such as 'The clean you agreed. In writing.' The latter may appeal more to anxious end-of-tenancy buyers.",
    metric: "quote_form_start and quote_submit",
    evidence:
      "Review pain clusters around no-shows, unclear price and incomplete work, so certainty is the strongest message.",
  },
  {
    rank: "03",
    name: "Two-step quote vs four fields",
    hypothesis:
      "Asking service + postcode first, then contact details after coverage is checked, may lift starts while protecting lead quality.",
    metric: "form step 1 → step 2 completion",
    evidence:
      "The category is quote-led rather than instant-book. Coverage first is logical but reduces instant form completes; test carefully.",
  },
];

const trackingEvents = [
  ["quote_form_start", "First field interaction", "Micro-conversion"],
  ["quote_submit", "Successful validated form submit", "PRIMARY"],
  ["quote_form_error", "Failed validation attempt", "Diagnostic"],
  ["call_click", "Any tel: link on page", "SECONDARY"],
  ["service_cta_click", "Service card CTA to quote", "Intent"],
  ["quote_cta_click", "Header / hero / footer quote CTA", "Intent"],
  ["faq_open", "FAQ item opened", "Objection diagnostic"],
  ["nav_click", "Header, footer or mobile nav", "Engagement"],
];

function LaunchChecklist() {
  const [checked, setChecked] = useState<Set<number>>(new Set());
  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="text-[0.66rem] font-bold text-muted">
          {checked.size} of {checklistSeed.length} marked
        </span>
        <button
          type="button"
          onClick={() => setChecked(new Set())}
          className="text-[0.62rem] font-bold text-forest underline decoration-forest/30 underline-offset-2"
        >
          Reset list
        </button>
      </div>
      <ul className="grid gap-x-5 gap-y-2.5 sm:grid-cols-2">
        {checklistSeed.map((item, index) => {
          const isChecked = checked.has(index);
          return (
            <li key={item}>
              <label className="flex cursor-pointer items-start gap-2.5 text-[0.73rem] leading-5 text-ink/78">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {
                    setChecked((current) => {
                      const next = new Set(current);
                      if (next.has(index)) next.delete(index);
                      else next.add(index);
                      return next;
                    });
                  }}
                  className="mt-0.5 size-3.5 shrink-0 rounded border-ink/30 accent-forest"
                />
                <span className={isChecked ? "text-muted line-through decoration-ink/25" : ""}>{item}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function StrategyBrief({ open, onClose }: BriefProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.setTimeout(() => closeRef.current?.focus(), 50);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex justify-end">
      <button
        type="button"
        aria-label="Close strategy brief"
        onClick={() => {
          track("brief_close", { method: "backdrop" });
          onClose();
        }}
        className="absolute inset-0 bg-ink/55 backdrop-blur-sm"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="brief-title"
        className="relative flex h-full w-full max-w-[1040px] flex-col bg-paper shadow-[-18px_0_80px_rgba(18,56,46,0.25)]"
      >
        <header className="flex shrink-0 items-center justify-between gap-4 border-b border-ink/10 bg-paper/95 px-4 py-3.5 backdrop-blur sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <BrandMark className="size-9 sm:size-10" />
            <div className="min-w-0">
              <p className="text-[0.56rem] font-extrabold tracking-[0.13em] text-muted uppercase">
                Raus Save Cleaning
              </p>
              <p
                id="brief-title"
                className="truncate font-display text-[1.05rem] leading-tight font-semibold tracking-[-0.02em] sm:text-[1.2rem]"
              >
                Owner strategy brief
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden rounded-full border border-clay/25 bg-[#f4e6e1] px-2.5 py-1 text-[0.55rem] font-extrabold tracking-[0.09em] text-clay uppercase sm:inline-flex">
              Owner review · not public
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={() => {
                track("brief_close", { method: "button" });
                onClose();
              }}
              className="grid size-9 place-items-center rounded-full border border-ink/15 bg-white text-ink transition hover:bg-sage/40"
              aria-label="Close strategy brief"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>
        </header>

        <div className="brief-scroll flex-1 overflow-y-auto overscroll-contain">
          <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-9">
            <div className="relative overflow-hidden rounded-[26px] bg-ink p-6 text-paper sm:p-8">
              <div
                aria-hidden="true"
                className="absolute -right-20 -bottom-16 size-64 rounded-full border-[44px] border-lime/15"
              />
              <div className="relative">
                <p className="eyebrow text-lime">
                  <Sparkles className="size-3.5" aria-hidden="true" />
                  Conversion strategy · stages 1–5
                </p>
                <h2 className="mt-3 max-w-[20ch] font-display text-[2rem] leading-[0.98] font-semibold tracking-[-0.045em] sm:text-[2.7rem]">
                  Make certainty the product.
                </h2>
                <p className="mt-4 max-w-2xl text-[0.83rem] leading-6 text-paper/72">
                  This brief records what is verified, what is inferred and what the owner must
                  supply. The page is a working draft: contact details, service promises, proof and
                  legal details need approval before launch.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {[
                    "No verified GBP",
                    "No verified reviews",
                    "No verified logo",
                    "No verified contact",
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-paper/20 bg-paper/8 px-2.5 py-1 text-[0.58rem] font-bold text-paper/70"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2 rounded-xl border border-ink/10 bg-white px-3.5 py-3 text-[0.63rem] text-muted">
              <Info className="size-3.5 shrink-0 text-forest" aria-hidden="true" />
              <span className="font-semibold text-ink">Fact labels:</span>
              <Fact label="verified">source-backed</Fact>
              <Fact label="inferred">reasoned</Fact>
              <Fact label="unknown">owner input required</Fact>
              <Fact label="estimate">not a verified benchmark</Fact>
            </div>

            <nav aria-label="Brief sections" className="mt-5 flex flex-wrap gap-2">
              {[
                ["01", "Audit", "#brief-stage-1"],
                ["02", "Competitors", "#brief-stage-2"],
                ["03", "Positioning", "#brief-stage-3"],
                ["04", "Page build", "#brief-stage-4"],
                ["05", "Launch plan", "#brief-stage-5"],
              ].map(([number, label, href]) => (
                <a
                  key={href}
                  href={href}
                  className="rounded-full border border-ink/12 bg-white px-3 py-1.5 text-[0.65rem] font-bold text-ink/75 transition hover:border-forest/30 hover:text-forest"
                >
                  <span className="mr-1.5 text-forest">{number}</span>
                  {label}
                </a>
              ))}
            </nav>

            <section id="brief-stage-1" className="scroll-mt-24 pt-10">
              <StageHeading number="01" title="Business & brand audit" kicker="The starting point" icon={Search} />
              <div className="mt-5 grid gap-4">
                <Card>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <MiniLabel>Name supplied</MiniLabel>
                      <p className="mt-1 font-display text-xl font-semibold">Raus Save Cleaning</p>
                      <p className="mt-1 text-[0.7rem] text-muted">
                        London. No website, Google Business Profile, Yelp link, goal or traffic
                        source supplied.
                      </p>
                    </div>
                    <Fact label="verified">client input</Fact>
                  </div>

                  <div className="mt-5 rounded-xl bg-paper-deep/70 p-3.5">
                    <p className="text-[0.72rem] leading-5 text-ink/75">
                      <strong>Search check:</strong> exact searches for “Raus Save Cleaning”,
                      “RausSave Cleaning” and “Raus Save” + cleaning London returned no matching
                      owned website or profile. Results included unrelated businesses such as R&amp;S
                      Cleaning &amp; Delivery and RA Sofa Cleaning. These are <strong>not</strong>{" "}
                      the same business and were not used as evidence about Raus Save.
                    </p>
                    <p className="mt-2 text-[0.64rem] text-muted">
                      <Fact label="verified">no owned match found in the search results reviewed</Fact>{" "}
                      <Fact label="unknown">anything not supplied by the owner</Fact>
                    </p>
                  </div>

                  <dl className="mt-5 divide-y divide-ink/8">
                    {auditRows.map(([label, value]) => (
                      <div key={label} className="grid gap-1 py-2.5 sm:grid-cols-[165px_1fr] sm:gap-4">
                        <dt className="text-[0.65rem] font-bold text-ink/75">{label}</dt>
                        <dd className="text-[0.7rem] leading-5 text-muted">
                          {value}
                          {" "}
                          {label === "Service area" ? (
                            <Fact label="verified">client input</Fact>
                          ) : label === "Industry + sub-niche" ? (
                            <Fact label="inferred">name + category</Fact>
                          ) : (
                            <Fact label="unknown">owner to confirm</Fact>
                          )}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </Card>

                <Card>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <MiniLabel>Logo & visual identity</MiniLabel>
                      <p className="mt-1 text-[0.8rem] font-bold">No actual logo was found.</p>
                    </div>
                    <span className="grid size-10 place-items-center rounded-[12px] bg-ink text-lime">
                      <Layers3 className="size-4" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border border-dashed border-ink/20 p-3.5">
                      <p className="text-[0.67rem] font-bold">Current placeholder mark</p>
                      <p className="mt-1 text-[0.66rem] leading-5 text-muted">
                        Leaf + sparkle badge and “Raus Save Cleaning” wordmark. Temporary, supplied
                        by the designer. Replace with the owner&apos;s artwork if it exists.
                      </p>
                    </div>
                    <div className="rounded-xl border border-dashed border-ink/20 p-3.5">
                      <p className="text-[0.67rem] font-bold">Proposed palette</p>
                      <div className="mt-2 flex gap-1.5" aria-label="Proposed colour swatches">
                        {[
                          ["#12382E", "Ink"],
                          ["#174B3C", "Forest"],
                          ["#DFF38A", "Lime"],
                          ["#F7F4EB", "Paper"],
                          ["#DCE8DF", "Sage"],
                        ].map(([hex, name]) => (
                          <span key={hex} className="min-w-0 flex-1" title={`${name} ${hex}`}>
                            <span
                              className="block h-9 rounded-md border border-ink/10"
                              style={{ backgroundColor: hex }}
                            />
                            <span className="mt-1 block truncate text-[0.52rem] font-bold text-muted">
                              {hex}
                            </span>
                          </span>
                        ))}
                      </div>
                      <p className="mt-2 text-[0.6rem] leading-4 text-muted">
                        Approximate and inferred. Not sampled from brand assets. Owner approval
                        required.
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 rounded-xl bg-paper p-3.5">
                    <p className="text-[0.66rem] font-bold">WCAG AA check</p>
                    <p className="mt-1 text-[0.65rem] leading-5 text-muted">
                      Ink #12382E on paper #F7F4EB = <strong>11.71:1</strong>; white on ink ={" "}
                      <strong>12.88:1</strong>; ink on lime = <strong>10.62:1</strong>; muted body
                      text on paper = <strong>4.84:1</strong>. All exceed 4.5:1 for normal text.{" "}
                      <Fact label="verified">calculated from proposed hex values</Fact>
                    </p>
                  </div>
                </Card>

                <Card>
                  <MiniLabel>Pre-launch conversion blockers · ranked</MiniLabel>
                  <p className="mt-1 text-[0.68rem] text-muted">
                    There is no current site to audit. These are the absence risks that would most
                    likely suppress revenue on this page.{" "}
                    <Fact label="inferred">standard local-service conversion review</Fact>
                  </p>
                  <ol className="mt-4 grid gap-3 sm:grid-cols-2">
                    {[
                      ["01", "No reachable, trustworthy contact", "Phone, address, hours and ownership proof are all unverified. This is a direct lead blocker."],
                      ["02", "No proof at the point of decision", "When there are no real reviews yet, the offer must carry more weight than a rating would."],
                      ["03", "No published scope or price logic", "London buyers compare hourly and fixed prices. Vague 'from' rates invite suspicion."],
                      ["04", "No local search foundation", "No Google Business Profile or owned web presence means missed high-intent map and organic demand."],
                      ["05", "No usable risk reversal", "Guarantee, insurance, vetting and complaint terms are unknown. Nothing should be invented."],
                    ].map(([num, title, copy]) => (
                      <li key={num} className="rounded-xl border border-ink/8 bg-paper/70 p-3">
                        <span className="text-[0.56rem] font-extrabold tracking-[0.08em] text-forest">{num}</span>
                        <p className="mt-1 text-[0.72rem] font-bold">{title}</p>
                        <p className="mt-1 text-[0.65rem] leading-5 text-muted">{copy}</p>
                      </li>
                    ))}
                  </ol>
                </Card>
              </div>
            </section>

            <section id="brief-stage-2" className="scroll-mt-24 pt-12">
              <StageHeading number="02" title="London market & competitors" kicker="What buyers compare" icon={MousePointerClick} />
              <p className="mt-4 max-w-3xl text-[0.76rem] leading-6 text-muted">
                Providers were selected from London cleaning searches because they offer a comparable
                domestic / deep / end-of-tenancy mix, publish London rates or guarantees, and have
                enough public review content to identify recurring pain points. National directories
                and companies without a London service fit were excluded.{" "}
                <Fact label="inferred">selection criteria</Fact>
              </p>

              <div className="mt-5 overflow-x-auto rounded-2xl border border-ink/10 bg-white">
                <table className="w-full min-w-[820px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-ink/10 bg-paper-deep/60 text-[0.55rem] font-extrabold tracking-[0.1em] text-muted uppercase">
                      <th className="px-4 py-3">Provider</th>
                      <th className="px-3 py-3">Rating / proof</th>
                      <th className="px-3 py-3">Offer & price signal</th>
                      <th className="px-3 py-3">Primary CTA</th>
                      <th className="px-3 py-3">Standout</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink/8 align-top">
                    <tr>
                      <td className="px-4 py-4">
                        <p className="text-[0.72rem] font-bold">Housekeep</p>
                        <a
                          href="https://housekeep.com"
                          target="_blank"
                          rel="noreferrer"
                          className="mt-1 block text-[0.6rem] font-semibold text-forest underline decoration-forest/30 underline-offset-2"
                        >
                          housekeep.com ↗
                        </a>
                        <p className="mt-1 text-[0.55rem] text-muted">London/UK digital platform</p>
                      </td>
                      <td className="px-3 py-4 text-[0.65rem] leading-5">
                        4.6 on Trustpilot, 12k+ reviews.{" "}
                        <Fact label="verified">Trustpilot snapshot</Fact>
                      </td>
                      <td className="px-3 py-4 text-[0.65rem] leading-5">
                        Regular cleaning published from £18.50/hr.{" "}
                        <Fact label="verified">secondary price guide</Fact>
                      </td>
                      <td className="px-3 py-4 text-[0.65rem] leading-5">
                        Online booking / matching.{" "}
                        <Fact label="inferred">product model</Fact>
                      </td>
                      <td className="px-3 py-4 text-[0.65rem] leading-5">
                        App-led convenience and scale. Some reviews flag no-shows and hidden cost
                        confusion.
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4">
                        <p className="text-[0.72rem] font-bold">Fantastic Services</p>
                        <a
                          href="https://www.fantasticservices.com/"
                          target="_blank"
                          rel="noreferrer"
                          className="mt-1 block text-[0.6rem] font-semibold text-forest underline decoration-forest/30 underline-offset-2"
                        >
                          fantasticservices.com ↗
                        </a>
                        <p className="mt-1 text-[0.55rem] text-muted">London/UK multi-service platform</p>
                      </td>
                      <td className="px-3 py-4 text-[0.65rem] leading-5">
                        4.6 on Trustpilot, 53k+ reviews.{" "}
                        <Fact label="verified">Trustpilot snapshot</Fact>
                      </td>
                      <td className="px-3 py-4 text-[0.65rem] leading-5">
                        Deep cleaning £23/hr, or £18/hr with a paid club.{" "}
                        <Fact label="verified">secondary price guide</Fact>
                      </td>
                      <td className="px-3 py-4 text-[0.65rem] leading-5">
                        Quote / online booking.{" "}
                        <Fact label="inferred">from service pages</Fact>
                      </td>
                      <td className="px-3 py-4 text-[0.65rem] leading-5">
                        Huge review volume and broad availability. Reviews cite booking friction,
                        lateness, upsells and uneven quality.
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4">
                        <p className="text-[0.72rem] font-bold">Premium Clean Ltd</p>
                        <a
                          href="https://premiumclean.co.uk/"
                          target="_blank"
                          rel="noreferrer"
                          className="mt-1 block text-[0.6rem] font-semibold text-forest underline decoration-forest/30 underline-offset-2"
                        >
                          premiumclean.co.uk ↗
                        </a>
                        <p className="mt-1 text-[0.55rem] text-muted">London specialist</p>
                      </td>
                      <td className="px-3 py-4 text-[0.65rem] leading-5">
                        5.0 from 1,352 Google reviews, as displayed by the business.{" "}
                        <Fact label="verified">their own page</Fact>
                      </td>
                      <td className="px-3 py-4 text-[0.65rem] leading-5">
                        End-of-tenancy from £150 for a studio; 100% deposit-back guarantee claimed.{" "}
                        <Fact label="verified">provider page + guide</Fact>
                      </td>
                      <td className="px-3 py-4 text-[0.65rem] leading-5">
                        Quote form / book.{" "}
                        <Fact label="inferred">site copy</Fact>
                      </td>
                      <td className="px-3 py-4 text-[0.65rem] leading-5">
                        Explicit deposit-back guarantee and a clear tenancy niche. Strongest direct
                        guarantee message in the set.
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4">
                        <p className="text-[0.72rem] font-bold">Maid2Clean</p>
                        <a
                          href="https://www.maid2clean.co.uk/"
                          target="_blank"
                          rel="noreferrer"
                          className="mt-1 block text-[0.6rem] font-semibold text-forest underline decoration-forest/30 underline-offset-2"
                        >
                          maid2clean.co.uk ↗
                        </a>
                        <p className="mt-1 text-[0.55rem] text-muted">London/UK cleaner network</p>
                      </td>
                      <td className="px-3 py-4 text-[0.65rem] leading-5">
                        Rating not verified for the London page.{" "}
                        <Fact label="unknown">rating</Fact>
                      </td>
                      <td className="px-3 py-4 text-[0.65rem] leading-5">
                        Weekly cleaning from £16.49/hr; postcode variation.{" "}
                        <Fact label="verified">secondary price guide</Fact>
                      </td>
                      <td className="px-3 py-4 text-[0.65rem] leading-5">
                        Find a cleaner.{" "}
                        <Fact label="inferred">service model</Fact>
                      </td>
                      <td className="px-3 py-4 text-[0.65rem] leading-5">
                        Price-led matching, cleaner replacement, no long-term contract.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-2 text-[0.6rem] leading-4 text-muted">
                Ratings and pricing change. Re-check every figure before using it in ads or public
                copy. All competitor offers are summaries, not copied copy. None of their creative or
                assets are used in this build.
              </p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <Card>
                  <MiniLabel>What negative reviews keep surfacing</MiniLabel>
                  <ul className="mt-3 space-y-3">
                    {[
                      ["No-shows and last-minute changes", "Late cancellations, cleaners failing to arrive and poor proactive communication appear in Housekeep and Fantastic Services review summaries."],
                      ["Price confusion", "Hidden fees, a quote that changed, or a charge that nearly doubled were reported. EOT reviews also mention prices rising on the day."],
                      ["Inconsistent finish", "Whole areas missed, low attention to detail and rushed work recur across large-platform and specialist EOT reviews."],
                      ["Hard-to-use guarantees", "Some EOT customers said the promised re-clean window was impractical or unresponsive."],
                    ].map(([title, copy]) => (
                      <li key={title} className="border-l-2 border-clay/40 pl-3">
                        <p className="text-[0.7rem] font-bold">{title}</p>
                        <p className="mt-1 text-[0.64rem] leading-5 text-muted">{copy}</p>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-[0.6rem] leading-4 text-muted">
                    <Fact label="verified">Trustpilot review summaries + public EOT reviews</Fact>{" "}
                    Patterns, not claims about every customer.
                  </p>
                </Card>

                <Card>
                  <MiniLabel>What five-star reviews value</MiniLabel>
                  <ul className="mt-3 space-y-2.5">
                    {[
                      "“Arrived on time” and reliable attendance",
                      "“Thorough”, “paid attention to detail”, “spotless”",
                      "“Polite”, “friendly” and respectful in the home",
                      "Easy online booking and quick support",
                      "A clear price with no ugly surprises",
                    ].map((item) => (
                      <li key={item} className="flex gap-2 text-[0.68rem] leading-5 text-ink/75">
                        <Check className="mt-0.5 size-3 shrink-0 text-forest" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-[0.6rem] leading-4 text-muted">
                    Themes paraphrased from public reviews on{" "}
                    <SourceLink href="https://www.trustpilot.com/review/fantasticservices.com">
                      Fantastic Services
                    </SourceLink>{" "}
                    and{" "}
                    <SourceLink href="https://www.trustpilot.com/review/housekeep.com">
                      Housekeep
                    </SourceLink>
                    . No competitor review is used as a Raus Save testimonial.
                  </p>
                </Card>
              </div>
            </section>

            <section id="brief-stage-3" className="scroll-mt-24 pt-12">
              <StageHeading number="03" title="Gaps & positioning" kicker="Choose the wedge" icon={ClipboardList} />
              <div className="mt-5 grid gap-4">
                <Card>
                  <MiniLabel>Client weaknesses · ranked bluntly</MiniLabel>
                  <ol className="mt-3 grid gap-2.5 sm:grid-cols-2">
                    {[
                      "No owned web presence, verified profile or discoverable contact path.",
                      "No real proof: reviews, rating, photos, team, insurance or guarantee.",
                      "No price architecture or scope language to earn trust at quote stage.",
                      "No defined booking, response-time or cancellation policy.",
                      "No local SEO foundation yet: domain, GBP, posts and review flow.",
                    ].map((item, index) => (
                      <li key={item} className="flex gap-2.5 rounded-xl bg-paper/75 p-3 text-[0.67rem] leading-5 text-ink/75">
                        <span className="font-display text-sm font-semibold text-clay">0{index + 1}</span>
                        {item}
                      </li>
                    ))}
                  </ol>
                </Card>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Card className="border-forest/25 bg-sage/45">
                    <MiniLabel>Positioning</MiniLabel>
                    <p className="mt-2 font-display text-[1.35rem] leading-[1.15] font-semibold tracking-[-0.02em]">
                      For Londoners who are tired of managing a cleaner, Raus Save Cleaning is the
                      residential cleaning service that sticks to the plan: a written scope, a clear
                      price and one person to call.
                    </p>
                    <p className="mt-3 text-[0.65rem] leading-5 text-ink/65">
                      <Fact label="inferred">built from review pain points</Fact> Buyer anxiety is
                      not about sparkle. It is about whether anyone turns up, what the finish line
                      is, and what the final price will be.
                    </p>
                  </Card>
                  <Card className="border-lime/60 bg-lime/20">
                    <MiniLabel>Core offer · proposed</MiniLabel>
                    <p className="mt-2 font-display text-[1.35rem] leading-[1.15] font-semibold tracking-[-0.02em]">
                      The Clear-Scope Clean.
                    </p>
                    <p className="mt-2 text-[0.68rem] leading-5 text-ink/75">
                      Four-field enquiry → postcode coverage check → written scope and price →
                      agreed access and arrival window → checklist finish. No vague rate, no
                      invented guarantee, no pressure extras.
                    </p>
                    <p className="mt-2 text-[0.62rem] leading-4 text-muted">
                      Every claim above needs owner sign-off. A guarantee is deliberately absent
                      until terms are provided.
                    </p>
                  </Card>
                </div>

                <Card>
                  <div className="grid gap-5 sm:grid-cols-3">
                    <div>
                      <MiniLabel>Primary conversion action</MiniLabel>
                      <p className="mt-2 text-[0.8rem] font-bold">Clear quote request</p>
                      <p className="mt-1 text-[0.65rem] leading-5 text-muted">
                        Matches a considered, property-specific purchase. Minimal fields; coverage
                        verified before a booking promise.
                      </p>
                    </div>
                    <div>
                      <MiniLabel>Secondary action</MiniLabel>
                      <p className="mt-2 text-[0.8rem] font-bold">Click to call</p>
                      <p className="mt-1 text-[0.65rem] leading-5 text-muted">
                        Useful for urgent move-outs and older buyers. Only deploy with a real,
                        answered, tracked number.
                      </p>
                    </div>
                    <div>
                      <MiniLabel>Why it should outperform</MiniLabel>
                      <p className="mt-2 text-[0.8rem] font-bold">Certainty, not adjectives</p>
                      <p className="mt-1 text-[0.65rem] leading-5 text-muted">
                        Competitors lean on scale and star counts. This page makes the process,
                        boundaries and absence of fake proof the differentiator.
                      </p>
                    </div>
                  </div>
                </Card>

                <div className="rounded-2xl border border-clay/30 bg-[#f7ece7] p-5">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="mt-0.5 size-5 shrink-0 text-clay" aria-hidden="true" />
                    <div>
                      <p className="text-[0.76rem] font-bold text-[#6e3a2a]">Approval gate</p>
                      <p className="mt-1 text-[0.7rem] leading-5 text-[#7a5346]">
                        Before launch, the owner must approve the positioning, written-scope promise,
                        price language, response standards and any guarantee. A real phone, address,
                        hours, form destination and review permissions are mandatory. The current
                        build is a clearly labelled draft pending those items.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="brief-stage-4" className="scroll-mt-24 pt-12">
              <StageHeading number="04" title="The page build" kicker="How the strategy shows up" icon={Layers3} />
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <Card>
                  <MiniLabel>Section order</MiniLabel>
                  <ol className="mt-3 space-y-2 text-[0.68rem] leading-5 text-ink/75">
                    {[
                      "Hero: outcome, London area, quote form, call, scope proof",
                      "Micro-proof strip: process promises, not unverified numbers",
                      "Pain → response: no-show, price changes, missing finish",
                      "Services: home, deep, end-of-tenancy; no invented prices",
                      "Core offer: The Clear-Scope Clean + example quote format",
                      "How it works: three low-risk steps",
                      "Proof: honest review wall; no fake testimonials",
                      "Why us, FAQ, final quote block, contact + service area",
                    ].map((item, index) => (
                      <li key={item} className="flex gap-2.5">
                        <span className="text-[0.58rem] font-extrabold text-forest">0{index + 1}</span>
                        {item}
                      </li>
                    ))}
                  </ol>
                </Card>
                <Card>
                  <MiniLabel>Build + SEO decisions</MiniLabel>
                  <ul className="mt-3 space-y-2.5 text-[0.67rem] leading-5 text-ink/75">
                    {[
                      "Mobile-first single page; four quote fields, sticky call + quote bar.",
                      "Semantic landmarks, visible focus, 44px+ CTAs, labelled fields and accordions.",
                      "Images have descriptive alt text, dimensions and lazy loading below the fold.",
                      "LocalBusiness JSON-LD contains only name, London area and country — no fake rating, address or phone.",
                      "Title targets 'Home & End of Tenancy Cleaning London'; description mirrors the quote action.",
                      "Stock photography is labelled illustrative; no invented team photos.",
                      "No fabricated rating line or review count in the hero.",
                      "The 020 7946 0958 number is a reserved drama placeholder, not a real business line.",
                    ].map((item) => (
                      <li key={item} className="flex gap-2">
                        <Check className="mt-0.5 size-3 shrink-0 text-forest" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </section>

            <section id="brief-stage-5" className="scroll-mt-24 pt-12">
              <StageHeading number="05" title="Launch plan" kicker="Deliverables & tests" icon={FlaskConical} />
              <div className="mt-5 grid gap-4">
                <Card>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <MiniLabel>Pre-launch checklist</MiniLabel>
                      <p className="mt-1 text-[0.68rem] leading-5 text-muted">
                        Tick items as the owner supplies them. All are required before the page is
                        promoted.
                      </p>
                    </div>
                    <Fact label="unknown">owner input</Fact>
                  </div>
                  <div className="mt-4">
                    <LaunchChecklist />
                  </div>
                </Card>

                <Card>
                  <MiniLabel>A/B test plan · ranked by expected impact</MiniLabel>
                  <div className="mt-4 space-y-3">
                    {tests.map((test) => (
                      <div key={test.rank} className="rounded-xl border border-ink/8 bg-paper/70 p-4">
                        <div className="flex items-start gap-3">
                          <span className="font-display text-[1.3rem] leading-none font-semibold text-forest">
                            {test.rank}
                          </span>
                          <div>
                            <p className="text-[0.74rem] font-bold">{test.name}</p>
                            <p className="mt-1 text-[0.65rem] leading-5 text-muted">{test.hypothesis}</p>
                            <p className="mt-2 text-[0.59rem] leading-4 text-ink/55">
                              <strong>Primary metric:</strong> {test.metric} · <strong>Evidence:</strong>{" "}
                              {test.evidence}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 text-[0.6rem] leading-4 text-muted">
                    <Fact label="estimate">test planning</Fact> Run each test for at least four weeks
                    and until both variants have enough quote submits to judge the primary metric.
                    Do not test a fake review or unapproved guarantee.
                  </p>
                </Card>

                <Card>
                  <MiniLabel>Tracking plan</MiniLabel>
                  <div className="mt-3 overflow-x-auto">
                    <table className="w-full min-w-[540px] border-collapse text-left">
                      <thead className="border-b border-ink/10 text-[0.54rem] font-extrabold tracking-[0.09em] text-muted uppercase">
                        <tr>
                          <th className="py-2 pr-4">Event</th>
                          <th className="py-2 pr-4">Trigger</th>
                          <th className="py-2">Role</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-ink/8">
                        {trackingEvents.map(([eventName, trigger, role]) => (
                          <tr key={eventName}>
                            <td className="py-2.5 pr-4 font-mono text-[0.62rem] font-semibold text-forest">{eventName}</td>
                            <td className="py-2.5 pr-4 text-[0.64rem] leading-5 text-ink/70">{trigger}</td>
                            <td className="py-2.5 text-[0.58rem] font-extrabold tracking-[0.06em] text-muted uppercase">
                              {role}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-3 text-[0.63rem] leading-5 text-muted">
                    Send <code className="rounded bg-paper px-1 py-0.5 text-[0.6rem]">quote_submit</code>{" "}
                    and <code className="rounded bg-paper px-1 py-0.5 text-[0.6rem]">call_click</code>{" "}
                    to GA4 and Google Ads as key events. Add form destination, spam protection, consent
                    and lead-source capture before any paid traffic. Include UTMs and a hidden source
                    field.
                  </p>
                  <div className="mt-3 rounded-xl bg-lime/25 p-3.5">
                    <p className="text-[0.66rem] font-bold">Benchmarks</p>
                    <p className="mt-1 text-[0.63rem] leading-5 text-ink/70">
                      <Fact label="estimate">planning range</Fact> Local-service landing pages often
                      target a 2–5% form/conversion rate on cold paid traffic and 5%+ on branded or
                      high-intent organic traffic. Calls add separately. This is a planning estimate,
                      not a verified London cleaning benchmark or a performance promise. Establish a
                      four-week own baseline first.
                    </p>
                  </div>
                </Card>

                <Card>
                  <MiniLabel>Source notes</MiniLabel>
                  <ul className="mt-3 space-y-2 text-[0.65rem] leading-5 text-muted">
                    <li>
                      <SourceLink href="https://www.trustpilot.com/review/housekeep.com">
                        Housekeep on Trustpilot
                      </SourceLink>{" "}
                      — rating and review-pattern evidence. Review pages are dynamic; snapshot figures
                      change.
                    </li>
                    <li>
                      <SourceLink href="https://www.trustpilot.com/review/fantasticservices.com">
                        Fantastic Services on Trustpilot
                      </SourceLink>{" "}
                      — rating, service complaints and positive themes.
                    </li>
                    <li>
                      <SourceLink href="https://www.bestinbritain.org/guides/best-cleaning-service-london">
                        Best in Britain London cleaning price guide
                      </SourceLink>{" "}
                      — secondary source for the £16.49–£23/hr price signals.
                    </li>
                    <li>
                      <SourceLink href="https://premiumclean.co.uk/cheap-end-of-tenancy-cleaning-london/">
                        Premium Clean end-of-tenancy page
                      </SourceLink>{" "}
                      — provider-displayed 5.0 / 1,352 Google reviews and deposit-back claim.
                    </li>
                    <li>
                      <SourceLink href="https://www.trustpilot.com/review/end-of-tenancy-london.co.uk">
                        End of Tenancy London reviews
                      </SourceLink>{" "}
                      — corroborating EOT complaint patterns.
                    </li>
                    <li>
                      Searches reviewed: “Raus Save Cleaning London”, “RausSave Cleaning”, “Raus Save
                      cleaning London Instagram”, plus London cleaning-service and Trustpilot review
                      queries. No owned Raus Save presence was found.
                    </li>
                  </ul>
                </Card>

                <div className="rounded-2xl bg-ink p-5 text-paper sm:p-6">
                  <p className="eyebrow text-lime">
                    <Sparkles className="size-3.5" aria-hidden="true" />
                    Bottom line
                  </p>
                  <p className="mt-2 font-display text-[1.55rem] leading-[1.12] font-semibold tracking-[-0.025em]">
                    The page is ready to review. The business is not yet ready to advertise until
                    the contact, proof and promise placeholders are resolved.
                  </p>
                  <a
                    href="#top"
                    onClick={onClose}
                    className="mt-4 inline-flex items-center gap-1.5 text-[0.72rem] font-bold text-lime underline decoration-lime/30 underline-offset-4 hover:decoration-lime"
                  >
                    Back to the page
                    <ArrowDown className="size-3.5 rotate-180" aria-hidden="true" />
                  </a>
                </div>

                <p className="pb-4 text-center text-[0.57rem] leading-4 text-muted">
                  Research brief built for owner review. No competitor copy, imagery or review was
                  reused. All prices and ratings must be re-verified before publication.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
