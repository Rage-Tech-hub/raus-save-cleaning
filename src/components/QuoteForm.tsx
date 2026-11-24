import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { ArrowUpRight, Check, ShieldCheck, Sparkles } from "lucide-react";
import { serviceOptions } from "@/lib/business";
import { track } from "@/lib/tracking";
import { cn } from "@/utils/cn";

type FormValues = {
  name: string;
  contact: string;
  service: string;
  postcode: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

type QuoteFormProps = {
  idPrefix: string;
  className?: string;
  source: string;
};

const initialValues: FormValues = {
  name: "",
  contact: "",
  service: "",
  postcode: "",
};

export function QuoteForm({ idPrefix, className, source }: QuoteFormProps) {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const startedRef = useRef(false);

  const updateField = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));

    if (!startedRef.current) {
      startedRef.current = true;
      track("quote_form_start", { source });
    }
  };

  const validate = () => {
    const nextErrors: FormErrors = {};
    if (values.name.trim().length < 2) nextErrors.name = "Please add your name.";
    if (values.contact.trim().length < 6) {
      nextErrors.contact = "Add a phone number or email we can reply to.";
    }
    if (!values.service) nextErrors.service = "Choose the closest service.";
    if (values.postcode.trim().length < 3) nextErrors.postcode = "Add your postcode.";

    if (values.contact.trim().length >= 6 && !/^[+()\d\s@.\-_a-zA-Z]+$/.test(values.contact)) {
      nextErrors.contact = "Please check your phone number or email.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) {
      track("quote_form_error", { source });
      return;
    }

    track("quote_submit", { source, service: values.service, postcode_area: values.postcode.slice(0, 4) });

    try {
      window.localStorage.setItem(
        "raus-save-last-enquiry",
        JSON.stringify({
          ...values,
          contact: "[stored locally for preview only]",
          source,
          submittedAt: new Date().toISOString(),
        }),
      );
    } catch {
      // The confirmation still works if storage is unavailable.
    }

    setSubmitted(true);
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setSubmitted(false);
    startedRef.current = false;
  };

  if (submitted) {
    const firstName = values.name.trim().split(" ")[0] || "there";
    return (
      <div
        className={cn(
          "flex min-h-[430px] flex-col items-center justify-center rounded-[26px] bg-white p-7 text-center text-ink sm:p-10",
          className,
        )}
        role="status"
        aria-live="polite"
      >
        <span className="grid size-14 place-items-center rounded-full bg-sage text-ink">
          <Check className="size-6" strokeWidth={2.4} aria-hidden="true" />
        </span>
        <p className="mt-6 text-[0.64rem] font-bold tracking-[0.16em] text-muted uppercase">
          Request ready
        </p>
        <h3 className="mt-2 font-display text-3xl leading-tight font-semibold tracking-[-0.035em]">
          Thanks, {firstName}.
        </h3>
        <p className="mt-3 max-w-sm text-[0.93rem] leading-6 text-muted">
          Your details are noted. At launch, this request will go straight to the Raus Save team
          for coverage and price confirmation.
        </p>
        <div className="mt-6 w-full rounded-2xl bg-paper px-4 py-3 text-left text-xs leading-5 text-muted">
          <span className="font-bold text-ink">Preview note:</span> this is a working demo form. No
          data left your browser or was sent to a booking system.
        </div>
        <button
          type="button"
          onClick={reset}
          className="mt-5 inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-bold text-forest underline decoration-sage-dark decoration-2 underline-offset-4 hover:decoration-forest"
        >
          Send another request
        </button>
      </div>
    );
  }

  const fieldClass =
    "mt-2 w-full rounded-xl border border-[#d9d5c9] bg-[#fbfaf5] px-3.5 py-3 text-[0.93rem] text-ink transition placeholder:text-[#829087] hover:border-[#b9c2b9] focus:border-forest focus:bg-white focus:outline-none focus:ring-2 focus:ring-sage-dark/45";

  return (
    <div
      className={cn(
        "rounded-[26px] border border-white/70 bg-white p-5 text-ink soft-shadow sm:p-6 lg:p-7",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow text-forest">
            <Sparkles className="size-3.5" aria-hidden="true" />
            Your clear quote
          </p>
          <h3 className="mt-2 font-display text-[1.7rem] leading-[1.06] font-semibold tracking-[-0.035em] sm:text-[1.85rem]">
            Tell us what you need.
          </h3>
        </div>
        <span className="mt-0.5 shrink-0 rounded-full bg-sage/60 px-2.5 py-1 text-[0.62rem] font-bold tracking-[0.08em] text-forest uppercase">
          ~60 sec
        </span>
      </div>
      <p className="mt-2 text-[0.86rem] leading-5 text-muted">
        Four quick details. We&apos;ll confirm coverage, scope and price before you book.
      </p>

      <form className="mt-5" onSubmit={handleSubmit} noValidate>
        <div className="grid gap-3.5 sm:grid-cols-2">
          <div>
            <label htmlFor={`${idPrefix}-name`} className="text-[0.74rem] font-bold tracking-[0.01em]">
              Your name
            </label>
            <input
              id={`${idPrefix}-name`}
              name="name"
              type="text"
              autoComplete="name"
              value={values.name}
              onChange={updateField}
              placeholder="e.g. Alex"
              className={fieldClass}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? `${idPrefix}-name-error` : undefined}
              required
            />
            {errors.name && (
              <p id={`${idPrefix}-name-error`} className="mt-1.5 text-xs font-medium text-clay">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor={`${idPrefix}-contact`}
              className="text-[0.74rem] font-bold tracking-[0.01em]"
            >
              Phone or email
            </label>
            <input
              id={`${idPrefix}-contact`}
              name="contact"
              type="text"
              autoComplete="off"
              value={values.contact}
              onChange={updateField}
              placeholder="Best way to reply"
              className={fieldClass}
              aria-invalid={Boolean(errors.contact)}
              aria-describedby={errors.contact ? `${idPrefix}-contact-error` : undefined}
              required
            />
            {errors.contact && (
              <p id={`${idPrefix}-contact-error`} className="mt-1.5 text-xs font-medium text-clay">
                {errors.contact}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor={`${idPrefix}-service`}
              className="text-[0.74rem] font-bold tracking-[0.01em]"
            >
              What do you need?
            </label>
            <select
              id={`${idPrefix}-service`}
              name="service"
              value={values.service}
              onChange={updateField}
              className={cn(fieldClass, !values.service && "text-[#6f7e75]")}
              aria-invalid={Boolean(errors.service)}
              aria-describedby={errors.service ? `${idPrefix}-service-error` : undefined}
              required
            >
              <option value="" disabled>
                Choose a clean
              </option>
              {serviceOptions.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
            {errors.service && (
              <p id={`${idPrefix}-service-error`} className="mt-1.5 text-xs font-medium text-clay">
                {errors.service}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor={`${idPrefix}-postcode`}
              className="text-[0.74rem] font-bold tracking-[0.01em]"
            >
              Postcode
            </label>
            <input
              id={`${idPrefix}-postcode`}
              name="postcode"
              type="text"
              autoComplete="postal-code"
              value={values.postcode}
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  postcode: event.target.value.toUpperCase().slice(0, 8),
                }))
              }
              placeholder="e.g. SE1"
              className={cn(fieldClass, "uppercase")}
              aria-invalid={Boolean(errors.postcode)}
              aria-describedby={errors.postcode ? `${idPrefix}-postcode-error` : undefined}
              required
            />
            {errors.postcode && (
              <p id={`${idPrefix}-postcode-error`} className="mt-1.5 text-xs font-medium text-clay">
                {errors.postcode}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="group mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-ink px-5 py-3 text-sm font-bold text-white transition hover:bg-forest active:scale-[0.99]"
        >
          Get my clear quote
          <ArrowUpRight
            className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </button>

        <p className="mt-3 flex items-start justify-center gap-1.5 text-center text-[0.68rem] leading-4 text-muted">
          <ShieldCheck className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
          No payment. No obligation. We only use your details to reply.
        </p>
      </form>
    </div>
  );
}
