import { cn } from "@/utils/cn";

type BrandProps = {
  className?: string;
  tone?: "ink" | "paper";
  compact?: boolean;
};

export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-[14px] bg-ink text-lime",
        className,
      )}
      aria-hidden="true"
    >
      <svg viewBox="0 0 40 40" className="size-7" fill="none">
        <path
          d="M10.5 27.5c2.2-6.7 6.4-10.2 12.8-10.6-1.6 6.4-5.7 10-12.8 10.6Z"
          fill="currentColor"
        />
        <path
          d="M19.5 28.2c3.2-5.1 7.3-7.1 12.4-6.1-2.5 5.3-6.7 7.5-12.4 6.1Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M13 27.7c2.8-1.3 5.2-3.4 7.1-6.3"
          stroke="#12382e"
          strokeWidth="1.35"
          strokeLinecap="round"
        />
        <path
          d="m28.8 8.2.8 2.4 2.4.8-2.4.8-.8 2.4-.8-2.4-2.4-.8 2.4-.8.8-2.4Z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
}

export function Brand({ className, tone = "ink", compact = false }: BrandProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <BrandMark />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.22rem] leading-none font-semibold tracking-[-0.035em]",
            tone === "paper" ? "text-paper" : "text-ink",
          )}
        >
          Raus Save
        </span>
        {!compact && (
          <span
            className={cn(
              "mt-1 text-[0.62rem] font-bold tracking-[0.22em] uppercase",
              tone === "paper" ? "text-lime/90" : "text-muted",
            )}
          >
            Cleaning · London
          </span>
        )}
      </span>
    </span>
  );
}
