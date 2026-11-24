type EventPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

/**
 * Lightweight analytics shim. Replace the console/dataLayer call with your
 * tag manager or CRM endpoint at launch. Event names match the tracking plan
 * in the owner brief.
 */
export function track(event: string, payload: EventPayload = {}) {
  const detail = {
    event,
    ...payload,
    page_location: typeof window !== "undefined" ? window.location.href : "",
    timestamp: Date.now(),
  };

  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push(detail);
    window.dispatchEvent(new CustomEvent("raussave:track", { detail }));
  }

  if (typeof window !== "undefined") {
    console.info("[Raus Save tracking]", detail);
  }
}
