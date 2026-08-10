import Image from "next/image";
import { NavigateButton } from "@/components/NavigateButton";
import {
  ContactIcon,
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  NavigateIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "@/components/Icons";
import { contact, whatsappUrl } from "@/lib/contact";

const actionClass =
  "group animate-soft-rise inline-flex h-[3.6rem] w-[3.6rem] shrink-0 items-center justify-center rounded-[1.15rem] text-ink transition-all duration-300 hover:-translate-y-1 hover:text-champagne focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne sm:h-16 sm:w-16";

export default function Home() {
  return (
    <>
      <div className="grain" aria-hidden="true" />

      <main className="relative z-10 mx-auto flex min-h-dvh w-full justify-center sm:px-4 sm:py-8">
        <article className="animate-fade-in flex min-h-dvh w-full max-w-[430px] flex-col overflow-hidden bg-white sm:min-h-[780px] sm:rounded-[2rem] sm:shadow-[0_30px_80px_-35px_rgba(17,17,17,0.4)]">
          {/* Photo + logo overlay */}
          <section className="relative aspect-[786/1024] w-full shrink-0 overflow-hidden bg-[#f5f5f5]">
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
            <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-6 pb-7 pt-28 text-center sm:px-8 sm:pb-8">
              <h1 className="animate-fade-up text-5xl font-semibold leading-none sm:text-[3.4rem] [font-family:var(--font-serif),serif]">
                <span className="name-shimmer">{contact.fullName}</span>
              </h1>
              <div
                aria-hidden="true"
                className="gold-divider mx-auto mt-4 h-px w-28 bg-gradient-to-r from-transparent via-champagne-soft to-transparent"
              />
              <p className="animate-fade-up delay-2 mt-3 text-sm font-light tracking-[0.25em] text-white/85 sm:text-base">
                {contact.title}
              </p>
            </div>
          </section>

          {/* Actions below the photo / jacket */}
          <section className="relative flex flex-1 items-center justify-center bg-white px-5 py-8 sm:px-6">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-champagne/45 to-transparent"
            />
            <div className="flex max-w-[360px] flex-wrap items-center justify-center gap-x-5 gap-y-6">
              <a
                href={`tel:${contact.phoneE164}`}
                className={actionClass}
                style={{ animationDelay: "0.3s" }}
                aria-label="חיוג"
                title="חיוג"
              >
                <PhoneIcon className="h-full w-full" />
              </a>

              <a
                href="/api/vcard"
                className={actionClass}
                style={{ animationDelay: "0.38s" }}
                aria-label="שמירת איש קשר"
                title="שמירת איש קשר"
                download
              >
                <ContactIcon className="h-full w-full" />
              </a>

              <NavigateButton
                className={actionClass}
                style={{ animationDelay: "0.46s" }}
                aria-label="ניווט למשרד"
                title="ניווט למשרד"
              >
                <NavigateIcon className="h-full w-full" />
              </NavigateButton>

              <a
                href={whatsappUrl("שלום אושר, אשמח לשוחח לגבי נדל״ן")}
                target="_blank"
                rel="noopener noreferrer"
                className={actionClass}
                style={{ animationDelay: "0.54s" }}
                aria-label="שיחה בוואטסאפ"
                title="WhatsApp"
              >
                <WhatsAppIcon className="h-full w-full" />
              </a>

              <a
                href={`mailto:${contact.email}`}
                className={actionClass}
                style={{ animationDelay: "0.62s" }}
                aria-label="אימייל"
                title="אימייל"
              >
                <MailIcon className="h-full w-full" />
              </a>

              <a
                href={contact.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className={actionClass}
                style={{ animationDelay: "0.7s" }}
                aria-label="Facebook"
                title="Facebook"
              >
                <FacebookIcon className="h-full w-full" />
              </a>

              <a
                href={contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={actionClass}
                style={{ animationDelay: "0.78s" }}
                aria-label="Instagram"
                title="Instagram"
              >
                <InstagramIcon className="h-full w-full" />
              </a>
            </div>
          </section>
        </article>
      </main>
    </>
  );
}
