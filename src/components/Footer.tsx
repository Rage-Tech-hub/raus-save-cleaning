import { ArrowUpRight, AtSign, FileText, Mail, MapPin, Phone } from "lucide-react";
import { Brand } from "@/components/Brand";
import { business, navLinks } from "@/lib/business";
import { track } from "@/lib/tracking";

type FooterProps = {
  onOpenBrief: () => void;
};

export function Footer({ onOpenBrief }: FooterProps) {
  return (
    <footer className="border-t border-ink/10 bg-paper pb-28 md:pb-0" aria-labelledby="footer-heading">
      <div className="container-shell pt-12 pb-8 sm:pt-16">
        <h2 id="footer-heading" className="sr-only">
          Raus Save Cleaning footer
        </h2>
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.7fr_0.85fr_0.8fr]">
          <div>
            <Brand />
            <p className="mt-5 max-w-xs font-display text-[1.35rem] leading-[1.15] font-medium tracking-[-0.025em] text-ink">
              A cleaner home. None of the chasing.
            </p>
            <p className="mt-3 max-w-xs text-[0.78rem] leading-5 text-muted">
              Home, deep and end-of-tenancy cleaning for London homes. Start with your postcode.
            </p>
            <a
              href="#quote"
              onClick={() => track("quote_cta_click", { location: "footer" })}
              className="group mt-5 inline-flex min-h-10 items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-[0.74rem] font-bold text-white transition hover:bg-forest"
            >
              Get my clear quote
              <ArrowUpRight
                className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </div>

          <nav aria-label="Footer navigation">
            <p className="text-[0.6rem] font-bold tracking-[0.13em] text-muted uppercase">Explore</p>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => track("nav_click", { link: link.label, location: "footer" })}
                    className="text-[0.78rem] font-semibold text-ink/70 transition hover:text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#reviews"
                  onClick={() => track("nav_click", { link: "Reviews", location: "footer" })}
                  className="text-[0.78rem] font-semibold text-ink/70 transition hover:text-ink"
                >
                  Reviews
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <p className="text-[0.6rem] font-bold tracking-[0.13em] text-muted uppercase">Contact</p>
            <ul className="mt-4 space-y-3.5">
              <li>
                <a
                  href={business.phoneHref}
                  onClick={() => track("call_click", { location: "footer" })}
                  title="Preview placeholder number — replace before launch"
                  className="flex items-start gap-2.5 text-[0.78rem] font-semibold text-ink/80 hover:text-ink"
                >
                  <Phone className="mt-0.5 size-3.5 shrink-0 text-forest" aria-hidden="true" />
                  <span>
                    {business.phoneDisplay}
                    <span className="mt-0.5 block text-[0.58rem] font-normal text-muted">
                      Preview number · owner to replace
                    </span>
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-[0.78rem] font-semibold text-ink/80">
                <MapPin className="mt-0.5 size-3.5 shrink-0 text-forest" aria-hidden="true" />
                <span>
                  {business.serviceArea}
                  <span className="mt-0.5 block text-[0.58rem] font-normal text-muted">
                    Coverage confirmed by postcode
                  </span>
                </span>
              </li>
              <li className="flex items-start gap-2.5 text-[0.78rem] font-semibold text-ink/80">
                <Mail className="mt-0.5 size-3.5 shrink-0 text-forest" aria-hidden="true" />
                <span>
                  {business.email}
                  <span className="mt-0.5 block text-[0.58rem] font-normal text-muted">
                    Owner to add before launch
                  </span>
                </span>
              </li>
              <li className="flex items-start gap-2.5 text-[0.78rem] font-semibold text-ink/80">
                <AtSign className="mt-0.5 size-3.5 shrink-0 text-forest" aria-hidden="true" />
                <span>
                  Social profile
                  <span className="mt-0.5 block text-[0.58rem] font-normal text-muted">
                    No verified profile supplied
                  </span>
                </span>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[0.6rem] font-bold tracking-[0.13em] text-muted uppercase">Owner area</p>
            <button
              type="button"
              onClick={onOpenBrief}
              className="mt-4 flex w-full items-start gap-2.5 rounded-2xl border border-ink/12 bg-white p-4 text-left transition hover:border-ink/25"
            >
              <FileText className="mt-0.5 size-4 shrink-0 text-forest" aria-hidden="true" />
              <span>
                <span className="block text-[0.76rem] font-bold text-ink">
                  Strategy brief, stages 1–5
                </span>
                <span className="mt-1 block text-[0.63rem] leading-4 text-muted">
                  Research, positioning, placeholders, A/B tests and tracking.
                </span>
              </span>
            </button>
            <p className="mt-3 text-[0.6rem] leading-4 text-muted">
              A pre-launch preview. No Google Business Profile, review count, insurance detail or
              street address has been verified.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-ink/10 pt-5 text-[0.61rem] leading-4 text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Raus Save Cleaning. London, UK.</p>
          <p className="max-w-2xl sm:text-right">
            Preview build for owner review. Contact details, claims, hours, availability and imagery
            are placeholders and require approval before publishing.
          </p>
        </div>
      </div>
    </footer>
  );
}
