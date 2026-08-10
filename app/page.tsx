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
  "group flex flex-1 flex-col items-center justify-center gap-2 rounded-2xl border border-line bg-white/80 px-3 py-4 text-ink shadow-[0_10px_30px_-18px_rgba(17,17,17,0.45)] backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-champagne/50 hover:shadow-[0_16px_36px_-16px_rgba(17,17,17,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne";

const socialClass =
  "inline-flex h-12 w-12 items-center justify-center rounded-full border border-line bg-white/90 text-ink transition duration-300 hover:-translate-y-0.5 hover:border-champagne hover:text-champagne focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne";

export default function Home() {
  return (
    <>
      <div className="grain" aria-hidden="true" />

      <main className="relative z-10 mx-auto flex min-h-dvh w-full max-w-md flex-col px-4 pb-10 pt-5 sm:max-w-lg sm:px-6 sm:pt-8">
        <article className="animate-fade-in overflow-hidden rounded-[1.75rem] bg-white shadow-[0_30px_80px_-36px_rgba(17,17,17,0.55)]">
          {/* Photo + logo overlay */}
          <section className="relative aspect-[3/4] w-full overflow-hidden bg-[#f5f5f5]">
            <Image
              src="/photo.jpg"
              alt={contact.fullName}
              fill
              priority
              sizes="(max-width: 640px) 100vw, 512px"
              className="object-cover object-[center_20%]"
            />

            {/* Logo — transparent, top-left, clear of the face */}
            <div className="absolute left-3 top-3 z-10 sm:left-4 sm:top-4">
              <Image
                src="/logo.png"
                alt="Rosenberger RE/MAX"
                width={420}
                height={160}
                priority
                className="h-auto w-[112px] object-contain drop-shadow-[0_2px_10px_rgba(0,0,0,0.22)] sm:w-[128px]"
              />
            </div>

            {/* Name over the jacket area */}
            <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/70 via-black/35 to-transparent px-6 pb-6 pt-24 text-center sm:px-8 sm:pb-7">
              <h1 className="animate-fade-up text-[2.75rem] font-medium leading-none tracking-tight text-white sm:text-[3.25rem] [font-family:var(--font-name),sans-serif]">
                {contact.fullName}
              </h1>
              <p className="animate-fade-up delay-1 mt-1.5 text-base font-light text-white/90">
                {contact.title}
              </p>
            </div>
          </section>

          {/* Actions below the photo / jacket */}
          <section className="px-4 pb-7 pt-5 sm:px-6 sm:pb-8 sm:pt-6">
            <div className="animate-soft-rise delay-2 flex gap-3">
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
              className="animate-soft-rise delay-3 mt-4 flex w-full items-center justify-center gap-3 rounded-2xl bg-ink px-5 py-3.5 text-sm font-medium text-white transition duration-300 hover:bg-champagne focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
            >
              <WhatsAppIcon className="h-5 w-5" />
              שיחה בוואטסאפ
            </a>

            <div className="animate-soft-rise delay-4 mt-5 flex flex-wrap items-center justify-center gap-3">
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

            <div className="animate-fade-up delay-4 mt-6 border-t border-line pt-5 text-center">
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
        </article>
      </main>
    </>
  );
}
