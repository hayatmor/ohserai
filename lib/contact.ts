export const contact = {
  firstName: "אושר",
  lastName: "לחמי",
  fullName: "אושר לחמי",
  title: "יועצת נדל״ן",
  organization: "Rosenberger RE/MAX",
  phoneDisplay: "052-680-8007",
  phoneE164: "+972526808007",
  phoneDigits: "972526808007",
  email: "osherlachmi@gmail.com",
  addressStreet: "הלוחמים 1",
  addressCity: "תל אביב",
  addressFull: "הלוחמים 1, תל אביב",
  facebook: "https://www.facebook.com/share/1Ebrge2CGf/",
  instagram: "https://www.instagram.com/osherlachmi",
  mapsQuery: "הלוחמים 1, תל אביב",
} as const;

export function whatsappUrl(message?: string) {
  const base = `https://wa.me/${contact.phoneDigits}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function googleMapsUrl() {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.mapsQuery)}`;
}

export function appleMapsUrl() {
  return `https://maps.apple.com/?q=${encodeURIComponent(contact.mapsQuery)}`;
}
