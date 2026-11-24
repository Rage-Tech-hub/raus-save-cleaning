import { ArrowUpRight, Check, Clock3, MapPin, Phone } from "lucide-react";
import { QuoteForm } from "@/components/QuoteForm";
import { business } from "@/lib/business";
import { track } from "@/lib/tracking";

export function FinalCta() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden bg-forest py-16 text-paper sm:py-20 lg:py-24"
      aria-labelledby="final-cta-heading"
    >
      <div aria-hidden="true" className="hero-grain absolute inset-0 opacity-25" />
      <div
        aria-hidden="true"
        className="absolute -bottom-44 -left-40 size-[32rem] rounded-full border-[74px] border-lime/15"
      />
      <div className="container-shell relative grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-16">
        <div>
          <p className="eyebrow text-lime">
            <span className="size-1.5 rounded-full bg-lime" aria-hidden="true" />
            Ready when you are
          </p>
          <h2
            id="final-cta-heading"
            className="mt-4 max-w-[10ch] font-display text-[clamp(2.8rem,6vw,5.1rem)] leading-[0.91] font-semibold tracking-[-0.06em]"
          >
            Come home to done.
          </h2>
          <p className="mt-5 max-w-lg text-[0.98rem] leading-7 text-paper/70">
            A few details now. A clear scope and price next. Then a clean home, without the
            follow-up list.
          </p>

          <div className="mt-7 space-y-2.5">
            {[
              "Four quick details, about a minute",
              "Scope and price before you book",
              "London postcodes checked first",
            ].map((item) => (
              <p key={item} className="flex items-center gap-2.5 text-[0.82rem] font-medium text-paper/82">
                <span className="grid size-4 shrink-0 place-items-center rounded-full bg-lime text-ink">
                  <Check className="size-2.5" strokeWidth={3} aria-hidden="true" />
                </span>
                {item}
              </p>
            ))}
          </div>

          <div className="mt-9 grid gap-4 border-t border-paper/15 pt-6 sm:grid-cols-3">
            <a
              href={business.phoneHref}
              onClick={() => track("call_click", { location: "final_cta" })}
              title="Preview placeholder number — replace before launch"
              className="group"
            >
              <span className="flex items-center gap-1.5 text-[0.59rem] font-bold tracking-[0.11em] text-paper/45 uppercase">
                <Phone className="size-3" aria-hidden="true" />
                Call
              </span>
              <span className="mt-1.5 block text-[0.83rem] font-bold text-paper group-hover:text-lime">
                {business.phoneDisplay}
              </span>
              <span className="mt-1 block text-[0.57rem] text-paper/45">Preview number</span>
            </a>
            <div>
              <span className="flex items-center gap-1.5 text-[0.59rem] font-bold tracking-[0.11em] text-paper/45 uppercase">
                <MapPin className="size-3" aria-hidden="true" />
                Service area
              </span>
              <span className="mt-1.5 block text-[0.83rem] font-bold text-paper">London homes</span>
              <span className="mt-1 block text-[0.57rem] text-paper/45">Coverage confirmed by postcode</span>
            </div>
            <div>
              <span className="flex items-center gap-1.5 text-[0.59rem] font-bold tracking-[0.11em] text-paper/45 uppercase">
                <Clock3 className="size-3" aria-hidden="true" />
                Hours
              </span>
              <span className="mt-1.5 block text-[0.83rem] font-bold text-paper">{business.hours}</span>
              <span className="mt-1 block text-[0.57rem] text-paper/45">Owner to confirm</span>
            </div>
          </div>
        </div>

        <div id="final-quote" className="scroll-mt-24">
          <QuoteForm idPrefix="final-quote-form" source="final_cta" />
          <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-[0.65rem] leading-5 text-paper/55">
            <ArrowUpRight className="size-3.5 shrink-0" aria-hidden="true" />
            No payment, no obligation, and no invented five-star promises.
          </p>
        </div>
      </div>
    </section>
  );
}
