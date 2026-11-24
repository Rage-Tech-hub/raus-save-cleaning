import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, Phone, X } from "lucide-react";
import { Brand } from "@/components/Brand";
import { business, navLinks } from "@/lib/business";
import { track } from "@/lib/tracking";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/92 backdrop-blur-xl">
      <div className="container-shell flex h-[72px] items-center justify-between gap-5">
        <a
          href="#top"
          aria-label="Raus Save Cleaning — back to top"
          onClick={() => setMenuOpen(false)}
          className="rounded-lg"
        >
          <Brand />
        </a>

        <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => track("nav_click", { link: link.label, location: "header" })}
              className="text-[0.82rem] font-semibold text-ink/75 transition hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 sm:flex">
          <a
            href={business.phoneHref}
            onClick={() => track("call_click", { location: "header" })}
            title="Preview placeholder number — replace before launch"
            className="hidden min-h-10 items-center gap-2 rounded-full px-3 text-[0.79rem] font-bold text-ink transition hover:bg-ink/5 md:inline-flex"
          >
            <Phone className="size-3.5" aria-hidden="true" />
            {business.phoneDisplay}
          </a>
          <a
            href="#quote"
            onClick={() => {
              setMenuOpen(false);
              track("quote_cta_click", { location: "header" });
            }}
            className="group inline-flex min-h-10 items-center justify-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-[0.79rem] font-bold text-white transition hover:bg-forest"
          >
            Get a quote
            <ArrowUpRight
              className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="grid size-10 place-items-center rounded-full border border-ink/15 text-ink sm:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
        </button>
      </div>

      {menuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-ink/10 bg-paper px-4 pt-3 pb-5 shadow-[0_16px_30px_-22px_rgba(18,56,46,0.4)] sm:hidden"
        >
          <nav aria-label="Mobile navigation" className="mx-auto flex max-w-md flex-col">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => {
                  setMenuOpen(false);
                  track("nav_click", { link: link.label, location: "mobile_menu" });
                }}
                className="border-b border-ink/10 py-3.5 text-[0.92rem] font-semibold"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#quote"
              onClick={() => {
                setMenuOpen(false);
                track("quote_cta_click", { location: "mobile_menu" });
              }}
              className="mt-4 flex min-h-12 items-center justify-center gap-2 rounded-xl bg-ink px-5 py-3 text-sm font-bold text-white"
            >
              Get my clear quote
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
            <a
              href={business.phoneHref}
              onClick={() => {
                setMenuOpen(false);
                track("call_click", { location: "mobile_menu" });
              }}
              className="mt-2 flex min-h-12 items-center justify-center gap-2 rounded-xl border border-ink/15 px-5 py-3 text-sm font-bold text-ink"
            >
              <Phone className="size-4" aria-hidden="true" />
              Call {business.phoneDisplay}
            </a>
            <p className="mt-3 text-center text-[0.65rem] leading-4 text-muted">
              Preview contact details — owner to confirm before launch.
            </p>
          </nav>
        </div>
      )}
    </header>
  );
}
