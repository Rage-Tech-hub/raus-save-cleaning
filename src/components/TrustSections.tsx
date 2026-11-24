import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Check,
  ClipboardCheck,
  HeartHandshake,
  ListChecks,
  MessageCircleMore,
  Quote,
  ReceiptText,
  ShieldQuestion,
  Sparkles,
} from "lucide-react";
import { BrandMark } from "@/components/Brand";
import { track } from "@/lib/tracking";

const scopeItems = [
  {
    icon: ListChecks,
    title: "Your clean, written down",
    detail: "The rooms and tasks included are agreed before we start.",
  },
  {
    icon: ReceiptText,
    title: "One price, before you book",
    detail: "No teaser rate that changes when the door opens.",
  },
  {
    icon: HeartHandshake,
    title: "One person to speak to",
    detail: "From your first question to the finish check.",
  },
  {
    icon: ClipboardCheck,
    title: "A checklist finish",
    detail: "The agreed list becomes the standard we work to.",
  },
];

const steps = [
  {
    title: "Tell us four things",
    copy: "Your name, the best way to reply, the kind of clean, and your postcode. That is enough to start.",
    tag: "About a minute",
  },
  {
    title: "Get your scope and price",
    copy: "We check coverage and review the details. You get a clear list of what is included and what it costs before you commit.",
    tag: "No payment yet",
  },
  {
    title: "Confirm a time, then done",
    copy: "Choose an available arrival window. We agree access, confirm the plan and get to work.",
    tag: "One contact throughout",
  },
];

const benefits = [
  {
    icon: ClipboardCheck,
    title: "The scope comes first",
    detail: "You see the job in writing before anyone picks up a cloth.",
  },
  {
    icon: ReceiptText,
    title: "The price is not a puzzle",
    detail: "A clear quote for your property. No mysterious extras after the fact.",
  },
  {
    icon: MessageCircleMore,
    title: "A reply, not a runaround",
    detail: "One direct contact for questions, access details and changes.",
  },
  {
    icon: ShieldQuestion,
    title: "Straight answers",
    detail: "If a task is outside the clean, we say so before you book. No silent omissions.",
  },
];

export function PromiseSection() {
  return (
    <section
      className="relative overflow-hidden bg-sage/65 py-16 sm:py-20 lg:py-24"
      aria-labelledby="promise-heading"
    >
      <div
        aria-hidden="true"
        className="absolute top-10 -right-24 size-80 rounded-full border-[54px] border-lime/40"
      />
      <div className="container-shell relative grid gap-10 lg:grid-cols-[1fr_0.82fr] lg:items-center lg:gap-16">
        <div>
          <p className="eyebrow text-forest">
            <Sparkles className="size-3.5" aria-hidden="true" />
            The core offer
          </p>
          <h2
            id="promise-heading"
            className="mt-4 font-display text-[clamp(2.6rem,5.5vw,4.75rem)] leading-[0.92] font-semibold tracking-[-0.055em] text-ink"
          >
            The Clear-Scope <span className="text-forest">Clean.</span>
          </h2>
          <p className="mt-5 max-w-xl text-[1rem] leading-7 text-ink/70">
            You should not have to inspect every corner to know the job was done. We agree the
            details in four steps, so the clean has a standard you can point to.
          </p>

          <div className="mt-8 grid gap-x-7 gap-y-5 sm:grid-cols-2">
            {scopeItems.map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-white text-forest shadow-sm">
                  <item.icon className="size-4" strokeWidth={1.8} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-[0.85rem] font-bold">{item.title}</h3>
                  <p className="mt-1 text-[0.76rem] leading-5 text-ink/62">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <a
            href="#quote"
            onClick={() => track("quote_cta_click", { location: "core_offer" })}
            className="group mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-[0.82rem] font-bold text-white transition hover:bg-forest"
          >
            Start with your postcode
            <ArrowUpRight
              className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        </div>

        <div className="relative">
          <div className="rounded-[26px] border border-white/70 bg-paper p-5 shadow-[0_26px_60px_-34px_rgba(18,56,46,0.45)] sm:p-6">
            <div className="flex items-center justify-between gap-4 border-b border-ink/10 pb-4">
              <div className="flex items-center gap-2.5">
                <BrandMark className="size-8 rounded-[10px]" />
                <div>
                  <p className="text-[0.67rem] font-bold tracking-[0.12em] text-ink uppercase">
                    Clear-scope quote
                  </p>
                  <p className="mt-0.5 text-[0.6rem] text-muted">Prepared for your home</p>
                </div>
              </div>
              <span className="rounded-full bg-sage px-2.5 py-1 text-[0.55rem] font-bold tracking-[0.08em] text-forest uppercase">
                Your plan
              </span>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-4 py-5">
              <div>
                <p className="text-[0.58rem] font-bold tracking-[0.1em] text-muted uppercase">Service</p>
                <p className="mt-1 text-[0.81rem] font-semibold">Deep clean</p>
              </div>
              <div>
                <p className="text-[0.58rem] font-bold tracking-[0.1em] text-muted uppercase">Property</p>
                <p className="mt-1 text-[0.81rem] font-semibold">Your home</p>
              </div>
              <div>
                <p className="text-[0.58rem] font-bold tracking-[0.1em] text-muted uppercase">Area</p>
                <p className="mt-1 text-[0.81rem] font-semibold">London</p>
              </div>
              <div>
                <p className="text-[0.58rem] font-bold tracking-[0.1em] text-muted uppercase">Arrival</p>
                <p className="mt-1 text-[0.81rem] font-semibold">Agreed with you</p>
              </div>
            </div>

            <div className="rounded-2xl border border-dashed border-sage-dark bg-white/75 p-4">
              <p className="text-[0.58rem] font-bold tracking-[0.1em] text-muted uppercase">
                Included in the clean
              </p>
              <div className="mt-3 space-y-2.5">
                {[
                  "Agreed tasks for each room",
                  "Products and equipment confirmed",
                  "Extras approved before work",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-[0.77rem] font-medium">
                    <span className="grid size-4 shrink-0 place-items-center rounded-full bg-sage text-forest">
                      <Check className="size-2.5" strokeWidth={3} aria-hidden="true" />
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-end justify-between gap-4 rounded-2xl bg-lime px-4 py-3.5 text-ink">
              <div>
                <p className="text-[0.56rem] font-bold tracking-[0.1em] uppercase">Your price</p>
                <p className="mt-0.5 text-[0.72rem] text-ink/68">Confirmed before booking</p>
              </div>
              <span className="font-display text-xl font-semibold">Not a guess</span>
            </div>
          </div>
          <p className="mt-3 text-center text-[0.62rem] leading-4 text-ink/50">
            Example quote format only. No price is promised until your property and scope are
            confirmed.
          </p>
        </div>
      </div>
    </section>
  );
}

export function ProcessSection() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-24 bg-[#fcfaf5] py-16 sm:py-20 lg:py-24"
      aria-labelledby="process-heading"
    >
      <div className="container-shell">
        <div className="max-w-2xl">
          <p className="eyebrow text-forest">
            <span className="size-1.5 rounded-full bg-clay" aria-hidden="true" />
            How it works
          </p>
          <h2
            id="process-heading"
            className="mt-4 font-display text-[clamp(2.45rem,4.8vw,3.9rem)] leading-[0.96] font-semibold tracking-[-0.05em]"
          >
            Three steps. No mystery.
          </h2>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
          <div className="relative overflow-hidden rounded-[28px] bg-sand">
            <img
              src="/images/kitchen-clean.jpg"
              alt="A cleaner working in a bright, modern kitchen with a bucket and cloth"
              className="h-[320px] w-full object-cover object-center sm:h-[420px] lg:h-full lg:min-h-[540px]"
              width="1100"
              height="1600"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <span className="rounded-full border border-white/30 bg-white/15 px-3 py-1.5 text-[0.58rem] font-bold tracking-[0.11em] text-white uppercase backdrop-blur-sm">
                London homes
              </span>
              <p className="mt-4 max-w-[17rem] font-display text-[1.65rem] leading-[1.08] font-semibold tracking-[-0.03em] text-white">
                A clean home, without the hovering.
              </p>
              <p className="mt-2 text-[0.61rem] text-white/55">
                Illustrative stock photography. Your team details are confirmed in your quote.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center rounded-[28px] border border-ink/10 bg-paper p-6 sm:p-8 lg:p-10">
            <div className="space-y-0">
              {steps.map((step, index) => (
                <div key={step.title} className="relative flex gap-4 pb-8 last:pb-0 sm:gap-5">
                  {index < steps.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute top-10 left-[19px] h-[calc(100%-2.2rem)] w-px bg-ink/15"
                    />
                  )}
                  <span
                    className={`relative z-10 grid size-10 shrink-0 place-items-center rounded-full font-display text-sm font-semibold ${
                      index === 0 ? "bg-ink text-lime" : "border border-ink/15 bg-paper text-forest"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="pt-0.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-[1.42rem] leading-tight font-semibold tracking-[-0.025em]">
                        {step.title}
                      </h3>
                      <span className="rounded-full bg-sage/70 px-2.5 py-1 text-[0.56rem] font-bold tracking-[0.07em] text-forest uppercase">
                        {step.tag}
                      </span>
                    </div>
                    <p className="mt-2 max-w-md text-[0.83rem] leading-6 text-muted">{step.copy}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col items-start gap-3 border-t border-ink/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="flex items-center gap-2 text-[0.7rem] font-semibold text-muted">
                <BadgeCheck className="size-4 text-forest" aria-hidden="true" />
                No payment before the scope is clear.
              </p>
              <a
                href="#quote"
                onClick={() => track("quote_cta_click", { location: "process" })}
                className="inline-flex items-center gap-1.5 text-[0.77rem] font-bold text-forest underline decoration-forest/30 decoration-2 underline-offset-4 hover:decoration-forest"
              >
                Start step one
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProofSection() {
  return (
    <section
      id="reviews"
      className="scroll-mt-24 bg-ink py-16 text-paper sm:py-20 lg:py-24"
      aria-labelledby="proof-heading"
    >
      <div className="container-shell grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
        <div>
          <p className="eyebrow text-lime">
            <Quote className="size-3.5" aria-hidden="true" />
            Proof, not theatre
          </p>
          <h2
            id="proof-heading"
            className="mt-4 max-w-[13ch] font-display text-[clamp(2.5rem,5vw,4.2rem)] leading-[0.94] font-semibold tracking-[-0.05em]"
          >
            No borrowed stars. No invented quotes.
          </h2>
          <p className="mt-6 max-w-lg text-[0.95rem] leading-7 text-paper/68">
            Raus Save Cleaning does not have a verified public review profile yet. So we are not
            pretending otherwise. When clients share their words, they will appear exactly as
            written, with the platform and date shown. Good or bad.
          </p>
          <div className="mt-7 space-y-2.5">
            {[
              "Real reviews, attributed to a real person.",
              "No stock testimonials or edited praise.",
              "No rating claim until the reviews exist.",
            ].map((item) => (
              <p key={item} className="flex items-center gap-2.5 text-[0.8rem] text-paper/78">
                <span className="grid size-4 shrink-0 place-items-center rounded-full bg-lime text-ink">
                  <Check className="size-2.5" strokeWidth={3} aria-hidden="true" />
                </span>
                {item}
              </p>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="relative overflow-hidden rounded-[28px] bg-paper p-6 text-ink sm:p-8">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-8 right-2 font-display text-[10rem] leading-none font-semibold text-lime/75"
            >
              &ldquo;
            </span>
            <div className="relative">
              <div className="flex items-center justify-between gap-4">
                <p className="text-[0.6rem] font-bold tracking-[0.14em] text-muted uppercase">
                  The review wall
                </p>
                <span className="rounded-full border border-sage-dark/60 px-2.5 py-1 text-[0.56rem] font-bold tracking-[0.1em] text-forest uppercase">
                  Reserved
                </span>
              </div>

              <div className="mt-10 rounded-2xl border border-dashed border-sage-dark bg-white/70 p-6 sm:p-8">
                <p className="font-display text-[1.8rem] leading-[1.06] font-semibold tracking-[-0.03em]">
                  This space is for a real London client&apos;s words.
                </p>
                <p className="mt-3 text-[0.82rem] leading-6 text-muted">
                  We would rather leave it empty than fill it with something made up. Once a review
                  is published, this is where it will live.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["Original words", "First name", "Source + date"].map((label) => (
                    <span
                      key={label}
                      className="rounded-full bg-sage/65 px-3 py-1.5 text-[0.63rem] font-bold text-forest"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 flex items-start gap-2.5 text-[0.66rem] leading-4 text-muted">
                <ShieldQuestion className="mt-0.5 size-3.5 shrink-0 text-forest" aria-hidden="true" />
                <p>
                  Honest note: guest feedback stays here only with the author&apos;s permission and
                  the source shown.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function WhyUs() {
  return (
    <section
      id="why-us"
      className="scroll-mt-24 bg-paper py-16 sm:py-20 lg:py-24"
      aria-labelledby="why-us-heading"
    >
      <div className="container-shell grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow text-forest">
            <span className="size-1.5 rounded-full bg-clay" aria-hidden="true" />
            Why Raus Save
          </p>
          <h2
            id="why-us-heading"
            className="mt-4 max-w-[11ch] font-display text-[clamp(2.5rem,5vw,4rem)] leading-[0.93] font-semibold tracking-[-0.05em]"
          >
            Calm is part of the service.
          </h2>
          <p className="mt-5 max-w-md text-[0.95rem] leading-7 text-muted">
            You have enough people to chase. A good clean should feel straightforward, start to
            finish. That means fewer calls, clearer answers and a home that feels like yours again.
          </p>
          <div className="mt-7 inline-flex items-center gap-2.5 rounded-full border border-ink/10 bg-white px-4 py-2.5 text-[0.7rem] font-semibold">
            <span className="size-2 rounded-full bg-lime" aria-hidden="true" />
            One home. One team. One plan.
          </div>
        </div>

        <div className="grid gap-x-8 sm:grid-cols-2">
          {benefits.map((benefit, index) => (
            <article
              key={benefit.title}
              className={`border-t border-ink/15 py-6 ${index === 0 ? "sm:pt-7" : ""}`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="grid size-10 place-items-center rounded-2xl bg-white text-forest shadow-sm">
                  <benefit.icon className="size-[1.15rem]" strokeWidth={1.8} aria-hidden="true" />
                </span>
                <span className="font-display text-[0.68rem] font-semibold text-ink/30">
                  0{index + 1}
                </span>
              </div>
              <h3 className="mt-4 font-display text-[1.32rem] leading-tight font-semibold tracking-[-0.025em]">
                {benefit.title}
              </h3>
              <p className="mt-2 text-[0.82rem] leading-6 text-muted">{benefit.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
