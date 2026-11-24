import { useState } from "react";
import { ArrowUpRight, MessageCircleQuestion, Minus, Phone, Plus } from "lucide-react";
import { business } from "@/lib/business";
import { track } from "@/lib/tracking";

const faqs = [
  {
    question: "Which parts of London do you cover?",
    answer:
      "We take cleaning enquiries from across London. Add your postcode to the quote form and we will confirm coverage before you book. If your area is not a fit, we will tell you straight away.",
  },
  {
    question: "How do you work out the price?",
    answer:
      "The price depends on your property, its condition and the tasks you want done. You get a scope and a price before you book. There is no vague hourly teaser and no automatic extra charge added on the day. If more work is needed, we agree it with you first.",
  },
  {
    question: "What exactly is included in the clean?",
    answer:
      "The exact rooms and tasks are written into your quote. A regular clean covers the usual kitchen, bathroom, floors and dusting. A deep clean goes further into build-up and hard-to-reach areas. Anything outside the agreed scope is discussed before work starts.",
  },
  {
    question: "Do I need to be home?",
    answer:
      "It is your choice. When we reply to your enquiry, tell us whether you plan to be there, leave a key or use a building concierge. We will confirm the access plan before you book. You should only share access details through a method you are comfortable with.",
  },
  {
    question: "Are cleaning products and equipment included?",
    answer:
      "We confirm this as part of your scope so it cannot be a last-minute surprise. If you have a product preference, sensitivity or allergy, tell us when we reply and we will work around it where possible.",
  },
  {
    question: "What if something is missed?",
    answer:
      "Tell us as soon as you notice, with a photo if you can. We will compare it with the agreed checklist and agree a fair next step. Any re-clean or refund terms must be set out in your written quote, so ask for them before you book.",
  },
  {
    question: "Can I ask for insurance or vetting details?",
    answer:
      "Yes. Ask for the current documentation when you enquire. We will share what is verified and applicable to your booking. This page does not make a claim that has not been confirmed by the business owner.",
  },
  {
    question: "Can you help at short notice?",
    answer:
      "We cannot promise same-day availability. Tell us your preferred date and deadline in the form, and we will confirm what is possible. If we cannot meet the date, we will say so clearly.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-24 bg-[#fcfaf5] py-16 sm:py-20 lg:py-24" aria-labelledby="faq-heading">
      <div className="container-shell grid gap-10 lg:grid-cols-[0.76fr_1.24fr] lg:gap-16">
        <div>
          <p className="eyebrow text-forest">
            <MessageCircleQuestion className="size-3.5" aria-hidden="true" />
            Straight answers
          </p>
          <h2
            id="faq-heading"
            className="mt-4 max-w-[10ch] font-display text-[clamp(2.5rem,5vw,3.9rem)] leading-[0.94] font-semibold tracking-[-0.05em]"
          >
            Questions, not homework.
          </h2>
          <p className="mt-5 max-w-sm text-[0.92rem] leading-7 text-muted">
            The things worth asking before a cleaner arrives. If your question is not here, ask us
            directly.
          </p>

          <div className="mt-7 rounded-2xl border border-ink/10 bg-white p-4">
            <p className="text-[0.62rem] font-bold tracking-[0.11em] text-muted uppercase">
              Prefer to talk?
            </p>
            <a
              href={business.phoneHref}
              onClick={() => track("call_click", { location: "faq" })}
              title="Preview placeholder number — replace before launch"
              className="mt-2 flex items-center gap-2 font-display text-[1.32rem] font-semibold tracking-[-0.02em] text-ink hover:text-forest"
            >
              <Phone className="size-4 text-forest" aria-hidden="true" />
              {business.phoneDisplay}
            </a>
            <p className="mt-1.5 text-[0.64rem] leading-4 text-muted">
              Preview number. Owner to confirm hours and contact details.
            </p>
          </div>
        </div>

        <div className="divide-y divide-ink/10 border-y border-ink/10">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question}>
                <h3>
                  <button
                    type="button"
                    onClick={() => {
                      setOpenIndex(isOpen ? null : index);
                      if (!isOpen) track("faq_open", { question: faq.question });
                    }}
                    className="flex w-full items-start justify-between gap-5 py-5 text-left text-[0.88rem] font-bold text-ink transition hover:text-forest sm:py-6"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span className="max-w-[38rem] leading-6">{faq.question}</span>
                    <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-sage/70 text-forest">
                      {isOpen ? (
                        <Minus className="size-3.5" aria-hidden="true" />
                      ) : (
                        <Plus className="size-3.5" aria-hidden="true" />
                      )}
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-label={faq.question}
                  hidden={!isOpen}
                  className="pb-5 sm:pb-6"
                >
                  <p className="max-w-[39rem] pr-10 text-[0.82rem] leading-6 text-muted">{faq.answer}</p>
                </div>
              </div>
            );
          })}
          <div className="py-5">
            <a
              href="#quote"
              onClick={() => track("quote_cta_click", { location: "faq_end" })}
              className="inline-flex items-center gap-1.5 text-[0.78rem] font-bold text-forest underline decoration-forest/30 decoration-2 underline-offset-4 hover:decoration-forest"
            >
              Ask your question with a quote request
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
