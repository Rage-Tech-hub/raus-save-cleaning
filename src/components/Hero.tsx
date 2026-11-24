import {
  ArrowDown,
  ArrowUpRight,
  ClipboardCheck,
  Clock3,
  MapPin,
  Phone,
  Sparkles,
} from "lucide-react";
import { QuoteForm } from "@/components/QuoteForm";
import { business } from "@/lib/business";
import { track } from "@/lib/tracking";

const heroProof = [
  { icon: ClipboardCheck, label: "Scope agreed first" },
  { icon: ArrowUpRight, label: "Clear quote before booking" },
  { icon: MapPin, label: "Homes across London" },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div aria-hidden="true" className="hero-grain absolute inset-0 opacity-30" />
      <div
        aria-hidden="true"
        className="absolute -top-20 -right-40 size-[30rem] rounded-full bg-lime/25 blur-[90px]"
      />
      <div className="container-shell relative grid gap-10 pt-8 pb-10 lg:grid-cols-[1.14fr_0.86fr] lg:items-start lg:gap-12 lg:pt-12 lg:pb-14">
        <div className="reveal">
          <p className="eyebrow rounded-full border border-ink/12 bg-white/55 px-3 py-2 text-forest backdrop-blur-sm">
            <Sparkles className="size-3.5" aria-hidden="true" />
            Home, deep &amp; move-out cleaning
          </p>

          <h1 className="mt-6 max-w-[13ch] font-display text-[clamp(3rem,7vw,5.35rem)] leading-[0.93] font-semibold tracking-[-0.06em] text-ink">
            A cleaner home.
            <span className="relative mt-1 block text-forest">
              None of the chasing.
              <svg
                aria-hidden="true"
                viewBox="0 0 420 16"
                className="absolute -bottom-2 left-0 h-3 w-[86%] text-lime"
                preserveAspectRatio="none"
              >
                <path
                  d="M4 10.8c82-5.9 220-7.4 411-3.1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="7"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="mt-7 max-w-[34rem] text-[1.02rem] leading-7 text-muted sm:text-[1.08rem]">
            Home, deep and end-of-tenancy cleaning across London. You&apos;ll see the scope and
            quote before you book, so the only thing left at the end is a clean home.
          </p>

          <div className="mt-7 hidden flex-col gap-3 sm:flex sm:flex-row sm:items-center">
            <a
              href="#quote"
              onClick={() => track("quote_cta_click", { location: "hero" })}
              className="group inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-bold text-white transition hover:bg-forest"
            >
              Get my clear quote
              <ArrowUpRight
                className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
            <a
              href={business.phoneHref}
              onClick={() => track("call_click", { location: "hero" })}
              title="Preview placeholder number — replace before launch"
              className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-ink/15 bg-white/50 px-5 py-3.5 text-sm font-bold text-ink transition hover:border-ink/30 hover:bg-white"
            >
              <Phone className="size-4" aria-hidden="true" />
              <span>
                Call <span className="whitespace-nowrap">{business.phoneDisplay}</span>
              </span>
            </a>
          </div>

          <div className="mt-7 hidden flex-wrap gap-x-5 gap-y-2.5 sm:flex">
            {heroProof.map((item) => (
              <div key={item.label} className="flex items-center gap-1.5 text-[0.72rem] font-semibold text-ink/75">
                <span className="grid size-4 place-items-center rounded-full bg-sage">
                  <item.icon className="size-2.5" strokeWidth={2.3} aria-hidden="true" />
                </span>
                {item.label}
              </div>
            ))}
          </div>

          <div className="relative mt-9 hidden overflow-hidden rounded-[26px] bg-sand sm:block sm:max-w-[34rem]">
            <img
              src="/images/team-clean.jpg"
              alt="Two professional cleaners working together in a bright modern kitchen"
              className="h-[214px] w-full object-cover object-[center_38%]"
              width="1100"
              height="1500"
              loading="eager"
              decoding="async"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent p-4 pt-14 sm:p-5">
              <p className="max-w-[18rem] font-display text-[1.18rem] leading-snug font-medium text-white">
                The clean you agreed. Not an approximation.
              </p>
              <span className="hidden shrink-0 rounded-full border border-white/30 bg-white/15 px-3 py-1.5 text-[0.62rem] font-bold tracking-[0.09em] text-white uppercase backdrop-blur-sm sm:inline-flex">
                Illustrative photo
              </span>
            </div>
          </div>
        </div>

        <div id="quote" className="reveal reveal-delay-1 scroll-mt-24 lg:pt-3">
          <QuoteForm idPrefix="hero-quote" source="hero" />
          <div className="mt-4 flex items-start gap-2 px-1 text-[0.7rem] leading-5 text-muted">
            <Clock3 className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
            <p>
              Send it in a minute. We&apos;ll check your postcode and reply with availability, the
              agreed scope and your price.
            </p>
          </div>
          <a
            href="#services"
            className="mt-5 inline-flex items-center gap-1.5 px-1 text-[0.74rem] font-bold text-forest hover:underline hover:underline-offset-4"
          >
            Not sure which clean you need?
            <ArrowDown className="size-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="border-y border-ink/10 bg-ink text-paper">
        <div className="container-shell grid grid-cols-2 gap-x-4 gap-y-4 py-4 md:grid-cols-4 md:py-0">
          {[
            ["01", "A clear scope", "You know what's included."],
            ["02", "One point of contact", "Ask a real person."],
            ["03", "London-based enquiries", "Your postcode checked first."],
            ["04", "Proof, not theatre", "Real reviews only."],
          ].map(([number, title, detail]) => (
            <div
              key={number}
              className="flex items-start gap-2.5 py-1 md:border-r md:border-paper/15 md:px-5 md:py-5 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
            >
              <span className="mt-0.5 font-display text-[0.72rem] font-semibold text-lime">{number}</span>
              <div>
                <p className="text-[0.72rem] leading-4 font-bold text-paper">{title}</p>
                <p className="mt-0.5 text-[0.64rem] leading-4 text-paper/60">{detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
