import {
  ArrowUpRight,
  CalendarCheck2,
  Check,
  ClipboardList,
  Home,
  MessageCircleMore,
  RefreshCw,
  Sparkles,
  SprayCan,
  Truck,
} from "lucide-react";
import { track } from "@/lib/tracking";

const frictionPoints = [
  {
    number: "01",
    icon: CalendarCheck2,
    title: "The cleaner who never arrived.",
    lead: "A confirmed window should mean something.",
    copy: "You get an agreed arrival window and a direct point of contact. If plans change, you hear it from us first. No waiting around and wondering.",
    tag: "Reliability, not hope",
  },
  {
    number: "02",
    icon: MessageCircleMore,
    title: "The price that grew on the day.",
    lead: "A quote should not need a translator.",
    copy: "You see the tasks included and the price before you book. If extra work is needed, we agree it with you first. No vague starting rate that moves later.",
    tag: "The full scope, first",
  },
  {
    number: "03",
    icon: ClipboardList,
    title: "The clean with a missing list.",
    lead: "A finish line should be visible.",
    copy: "The clean follows the checklist you agreed. If you spot something missed, tell us straight away. We will review it against that scope and agree the next step.",
    tag: "One clear standard",
  },
];

const services = [
  {
    icon: Home,
    kicker: "Keep on top of it",
    title: "Regular home clean",
    description:
      "For the everyday reset. Good for busy flats, family homes and anyone who would rather not spend Saturday with a mop.",
    includes: [
      "Kitchen and bathroom surfaces",
      "Dusting, floors and bins",
      "Weekly, fortnightly or one-off options",
    ],
    cta: "Ask about a regular clean",
    tone: "light" as const,
  },
  {
    icon: SprayCan,
    kicker: "Reset the whole place",
    title: "Deep clean",
    description:
      "For the work a quick tidy misses. A slower, more detailed clean of the rooms that carry the most dirt and grime.",
    includes: [
      "Limescale and built-up grime",
      "Skirting, corners and hard-to-reach spots",
      "Inside appliances where agreed",
    ],
    cta: "Ask about a deep clean",
    tone: "dark" as const,
  },
  {
    icon: Truck,
    kicker: "Move out with less stress",
    title: "End of tenancy",
    description:
      "A room-by-room clean before a handover. Tell us the move-out date and whether the property will be empty.",
    includes: [
      "Room-by-room clean",
      "Kitchen, bathroom and cupboards",
      "Checklist matched to the agreed scope",
    ],
    cta: "Ask about a move-out clean",
    tone: "sage" as const,
  },
];

export function ProblemSolution() {
  return (
    <section className="relative bg-[#fcfaf5] py-16 sm:py-20 lg:py-24" aria-labelledby="difference-heading">
      <div className="container-shell">
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="eyebrow text-forest">
              <span className="size-1.5 rounded-full bg-clay" aria-hidden="true" />
              The clean, without the chaos
            </p>
            <h2
              id="difference-heading"
              className="mt-4 max-w-[13ch] font-display text-[clamp(2.3rem,4.5vw,3.65rem)] leading-[0.98] font-semibold tracking-[-0.045em]"
            >
              You booked a clean. Not another job.
            </h2>
          </div>
          <p className="max-w-xl text-[0.98rem] leading-7 text-muted lg:justify-self-end">
            The same three problems show up in cleaning reviews again and again: nobody arrives,
            the price changes, or the finish is patchy. We plan the service around those moments.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3 lg:mt-12">
          {frictionPoints.map((point, index) => (
            <article
              key={point.title}
              className={
                index === 0
                  ? "flex flex-col rounded-[24px] bg-ink p-6 text-paper sm:p-7"
                  : "flex flex-col rounded-[24px] border border-ink/10 bg-paper p-6 sm:p-7"
              }
            >
              <div className="flex items-start justify-between gap-4">
                <span
                  className={
                    index === 0
                      ? "grid size-11 place-items-center rounded-2xl bg-lime text-ink"
                      : "grid size-11 place-items-center rounded-2xl bg-sage text-forest"
                  }
                >
                  <point.icon className="size-5" strokeWidth={1.8} aria-hidden="true" />
                </span>
                <span
                  className={
                    index === 0
                      ? "font-display text-xs font-semibold text-paper/45"
                      : "font-display text-xs font-semibold text-ink/35"
                  }
                >
                  {point.number}
                </span>
              </div>
              <p
                className={
                  index === 0
                    ? "mt-6 text-[0.65rem] font-bold tracking-[0.13em] text-lime uppercase"
                    : "mt-6 text-[0.65rem] font-bold tracking-[0.13em] text-clay uppercase"
                }
              >
                {point.lead}
              </p>
              <h3 className="mt-2 font-display text-[1.55rem] leading-[1.06] font-semibold tracking-[-0.03em]">
                {point.title}
              </h3>
              <p
                className={
                  index === 0
                    ? "mt-3 flex-1 text-[0.86rem] leading-6 text-paper/72"
                    : "mt-3 flex-1 text-[0.86rem] leading-6 text-muted"
                }
              >
                {point.copy}
              </p>
              <p
                className={
                  index === 0
                    ? "mt-6 flex items-center gap-2 border-t border-paper/15 pt-4 text-[0.7rem] font-semibold text-paper/70"
                    : "mt-6 flex items-center gap-2 border-t border-ink/10 pt-4 text-[0.7rem] font-semibold text-ink/70"
                }
              >
                <Check className="size-3.5 shrink-0 text-forest" aria-hidden="true" />
                {point.tag}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section id="services" className="scroll-mt-24 bg-white py-16 sm:py-20 lg:py-24" aria-labelledby="services-heading">
      <div className="container-shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-forest">
              <Sparkles className="size-3.5" aria-hidden="true" />
              Three ways to start
            </p>
            <h2
              id="services-heading"
              className="mt-4 max-w-[12ch] font-display text-[clamp(2.4rem,4.6vw,3.8rem)] leading-[0.96] font-semibold tracking-[-0.05em]"
            >
              One home. One clear plan.
            </h2>
          </div>
          <p className="max-w-md text-[0.93rem] leading-6 text-muted md:pb-1">
            Not sure which clean fits? Tell us what needs attention. We&apos;ll point you to the right
            scope, not the biggest one.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {services.map((service) => {
            const isDark = service.tone === "dark";
            const isSage = service.tone === "sage";

            return (
              <article
                key={service.title}
                className={`group flex flex-col rounded-[26px] p-6 transition duration-300 sm:p-7 ${
                  isDark
                    ? "bg-ink text-paper shadow-[0_22px_50px_-30px_rgba(18,56,46,0.7)]"
                    : isSage
                      ? "bg-sage/55 text-ink"
                      : "border border-ink/10 bg-[#fcfaf5] text-ink"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <span
                    className={`grid size-12 place-items-center rounded-2xl ${
                      isDark ? "bg-lime text-ink" : "bg-white text-forest shadow-sm"
                    }`}
                  >
                    <service.icon className="size-[1.35rem]" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  {isDark && (
                    <span className="rounded-full border border-paper/20 px-2.5 py-1 text-[0.58rem] font-bold tracking-[0.12em] text-paper/80 uppercase">
                      The deep reset
                    </span>
                  )}
                </div>

                <p
                  className={`mt-7 text-[0.65rem] font-bold tracking-[0.12em] uppercase ${
                    isDark ? "text-lime" : "text-clay"
                  }`}
                >
                  {service.kicker}
                </p>
                <h3 className="mt-2 font-display text-[1.9rem] leading-[1.03] font-semibold tracking-[-0.035em]">
                  {service.title}
                </h3>
                <p
                  className={`mt-3 text-[0.88rem] leading-6 ${
                    isDark ? "text-paper/72" : "text-muted"
                  }`}
                >
                  {service.description}
                </p>

                <ul className={`mt-6 space-y-2.5 border-t pt-5 ${isDark ? "border-paper/15" : "border-ink/10"}`}>
                  {service.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[0.8rem] leading-5">
                      <span
                        className={`mt-0.5 grid size-4 shrink-0 place-items-center rounded-full ${
                          isDark ? "bg-lime text-ink" : "bg-forest text-white"
                        }`}
                      >
                        <Check className="size-2.5" strokeWidth={3} aria-hidden="true" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-7">
                  <p className={`text-[0.68rem] font-semibold ${isDark ? "text-paper/55" : "text-ink/55"}`}>
                    Quoted to your home. Never guessed.
                  </p>
                  <a
                    href="#quote"
                    onClick={() => track("service_cta_click", { service: service.title })}
                    className={`mt-2 inline-flex items-center gap-1.5 text-[0.78rem] font-bold underline decoration-2 underline-offset-4 ${
                      isDark
                        ? "text-lime decoration-lime/40 hover:decoration-lime"
                        : "text-forest decoration-forest/30 hover:decoration-forest"
                    }`}
                  >
                    {service.cta}
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-5 grid gap-4 rounded-[22px] border border-ink/10 bg-paper p-5 sm:grid-cols-[1.3fr_0.7fr] sm:items-center sm:p-6">
          <div className="flex items-start gap-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-sage text-forest">
              <RefreshCw className="size-4" aria-hidden="true" />
            </span>
            <div>
              <p className="text-[0.84rem] font-bold">Why no price list?</p>
              <p className="mt-1 text-[0.77rem] leading-5 text-muted">
                A two-bed flat and a four-bed house are not the same job. Your quote reflects the
                property, its condition and the tasks you choose.
              </p>
            </div>
          </div>
          <a
            href="#quote"
            onClick={() => track("quote_cta_click", { location: "services_price_note" })}
            className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl bg-ink px-4 py-2.5 text-[0.77rem] font-bold text-white transition hover:bg-forest sm:justify-self-end"
          >
            Get my tailored quote
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
