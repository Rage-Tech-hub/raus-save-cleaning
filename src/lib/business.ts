export const business = {
  name: "Raus Save Cleaning",
  shortName: "Raus Save",
  city: "London",
  serviceArea: "London",
  phoneDisplay: "020 7946 0958",
  phoneHref: "tel:+442079460958",
  phoneIsPlaceholder: true,
  hours: "To be confirmed",
  email: "To be added",
} as const;

export const navLinks = [
  { label: "Services", href: "#services" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Why us", href: "#why-us" },
  { label: "FAQ", href: "#faq" },
] as const;

export const serviceOptions = [
  "Regular home clean",
  "Deep clean",
  "End of tenancy / move-out",
  "Not sure yet",
] as const;

export type ServiceOption = (typeof serviceOptions)[number];
