import { ArrowUpRight, Phone } from "lucide-react";
import { business } from "@/lib/business";
import { track } from "@/lib/tracking";

export function StickyBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-ink/15 bg-paper/96 px-3 pt-2.5 pb-[max(0.65rem,env(safe-area-inset-bottom))] shadow-[0_-8px_30px_-18px_rgba(18,56,46,0.45)] backdrop-blur-lg md:hidden"
      aria-label="Quick contact"
    >
      <div className="mx-auto grid max-w-md grid-cols-[0.85fr_1.15fr] gap-2">
        <a
          href={business.phoneHref}
          onClick={() => track("call_click", { location: "sticky_mobile" })}
          title="Preview placeholder number — replace before launch"
          className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-ink/15 bg-white px-3 text-[0.79rem] font-bold text-ink"
        >
          <Phone className="size-4" aria-hidden="true" />
          Call
        </a>
        <a
          href="#quote"
          onClick={() => track("quote_cta_click", { location: "sticky_mobile" })}
          className="flex min-h-12 items-center justify-center gap-1.5 rounded-xl bg-ink px-3 text-[0.79rem] font-bold text-white"
        >
          Get a quote
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
