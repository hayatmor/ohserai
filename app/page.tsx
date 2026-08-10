import Image from "next/image";
import { NavigateButton } from "@/components/NavigateButton";
import {
  ContactIcon,
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  WhatsAppIcon,
} from "@/components/Icons";
import { contact, googleMapsUrl, whatsappUrl } from "@/lib/contact";

const primaryActionClass =
  "group flex flex-1 flex-col items-center justify-center gap-2 rounded-2xl border border-line bg-white/70 px-3 py-4 text-ink shadow-[0_10px_30px_-18px_rgba(17,17,17,0.45)] backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-champagne/50 hover:shadow-[0_16px_36px_-16px_rgba(17,17,17,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne";

const socialClass =
  "inline-flex h-12 w-12 items-center justify-center rounded-full border border-line bg-white/80 text-ink transition duration-300 hover:-translate-y-0.5 hover:border-champagne hover:text-champagne focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne";

export default function Home() {
  return (
    <>
      <div className="grain" aria-hidden="true" />

      <main className="relative z-10 mx-auto flex min-h-dvh w-full max-w-lg flex-col px-4 pb-10 pt-6 sm:max-w-xl sm:px-6 lg:max-w-5xl lg:px-8 lg:py-12">
        <div className="flex flex-1 flex-col lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch lg:gap-10">
          {/* Hero visual */}
          <section className="animate-fade-in relative overflow-hidden rounded-[1.75rem] bg-white shadow-[0_30px_80px_-40px_rgba(17,17,17,0.55)] lg:min-h-[720px]">
            <div className="relative aspect-[3/4] w-full lg:absolute lg:inset-0 lg:aspect-auto lg:h-full">
              <Image
                src="/photo.jpg"
                alt={contact.fullName}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-[center_18%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <p className="animate-fade-up text-[0.7rem] uppercase tracking-[0.28em] text-champagne-soft [font-family:var(--font-libre),serif]">
                  Rosenberger RE/MAX
                </p>
                <h1 className="animate-fade-up delay-1 mt-2 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  {contact.fullName}
                </h1>
                <p className="animate-fade-up delay-2 mt-2 text-base font-light text-white/90 sm:text-lg">
                  {contact.title}
                </p>
              </div>
            </div>
          </section>

          {/* Content column */}
          <section className="mt-6 flex flex-col justify-center lg:mt-0">
            <div className="animate-soft-rise delay-1 mx-auto mb-7 w-full max-w-[220px] sm:max-w-[240px] lg:mx-0">
              <Image
                src="/logo.jpg"
                alt="Rosenberger RE/MAX"
                width={1024}
                height={493}
                className="h-auto w-full object-contain"
                priority
              />
            </div>

            <p className="animate-fade-up delay-2 max-w-md text-center text-[0.95rem] leading-7 text-muted lg:text-right">
              ליווי מקצועי בקניית ומכירת נדל״ן — בשקיפות, דיוק ונוכחות אישית.
            </p>

            {/* Primary actions */}
            <div className="animate-soft-rise delay-3 mt-8 flex gap-3">
              <a href={`tel:${contact.phoneE164}`} className={primaryActionClass} aria-label="חיוג">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-white transition group-hover:bg-champagne">
                  <PhoneIcon className="h-5 w-5" />
                </span>
                <span className="text-sm font-medium">חיוג</span>
              </a>

              <a href="/api/vcard" className={primaryActionClass} aria-label="שמירת איש קשר" download>
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-white transition group-hover:bg-champagne">
                  <ContactIcon className="h-5 w-5" />
                </span>
                <span className="text-sm font-medium">שמירת איש קשר</span>
              </a>

              <NavigateButton className={primaryActionClass} aria-label="ניווט למשרד">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-white transition group-hover:bg-champagne">
                  <PinIcon className="h-5 w-5" />
                </span>
                <span className="text-sm font-medium">ניווט למשרד</span>
              </NavigateButton>
            </div>

            <a
              href={whatsappUrl("שלום אושר, אשמח לשוחח לגבי נדל״ן")}
              target="_blank"
              rel="noopener noreferrer"
              className="animate-soft-rise delay-4 mt-5 flex w-full items-center justify-center gap-3 rounded-2xl bg-ink px-5 py-3.5 text-sm font-medium text-white transition duration-300 hover:bg-champagne focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
            >
              <WhatsAppIcon className="h-5 w-5" />
              שיחה בוואטסאפ
            </a>

            {/* Secondary links */}
            <div className="animate-soft-rise delay-4 mt-5 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <a href={`mailto:${contact.email}`} className={socialClass} aria-label="אימייל">
                <MailIcon className="h-5 w-5" />
              </a>
              <a
                href={contact.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className={socialClass}
                aria-label="Facebook"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a
                href={contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={socialClass}
                aria-label="Instagram"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
            </div>

            <div className="animate-fade-up delay-4 mt-8 border-t border-line pt-6 text-center lg:text-right">
              <a
                href={googleMapsUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-ink"
              >
                <PinIcon className="h-4 w-4 text-champagne" />
                <span>{contact.addressFull}</span>
              </a>
              <p className="mt-2 text-sm text-muted/80" dir="ltr">
                {contact.phoneDisplay} · {contact.email}
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
