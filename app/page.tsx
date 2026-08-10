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

const tileClass =
  "group animate-soft-rise flex w-[4.6rem] flex-col items-center gap-2 text-black transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none sm:w-[5rem]";

const glyphClass =
  "h-[3.4rem] w-[3.4rem] transition-transform duration-300 group-focus-visible:outline group-focus-visible:outline-2 group-focus-visible:outline-offset-4 group-focus-visible:outline-black sm:h-[3.7rem] sm:w-[3.7rem]";

const labelClass = "text-[0.72rem] font-normal tracking-wide text-black";

export default function Home() {
  return (
    <>
      <div className="grain" aria-hidden="true" />

      <main className="relative z-10 mx-auto flex min-h-dvh w-full justify-center sm:px-4 sm:py-8">
        <article className="animate-fade-in flex min-h-dvh w-full max-w-[430px] flex-col overflow-hidden bg-white sm:min-h-[800px] sm:rounded-[2rem] sm:shadow-[0_30px_80px_-35px_rgba(17,17,17,0.4)]">
          {/* Photo with logo header and name band */}
          <section className="relative aspect-[712/900] w-full shrink-0 overflow-hidden bg-[#f5f5f5]">
            <Image
              src="/photo.jpg"
              alt={contact.fullName}
              fill
              priority
              sizes="(max-width: 640px) 100vw, 430px"
              className="object-cover object-[center_18%]"
            />

            <div className="absolute left-3 top-3 z-10 sm:left-4 sm:top-4">
              <Image
                src="/logo.png"
                alt="Rosenberger RE/MAX"
                width={420}
                height={160}
                priority
                className="h-auto w-[128px] object-contain drop-shadow-[0_2px_12px_rgba(0,0,0,0.25)] sm:w-[145px]"
              />
            </div>

            {/* Name band at the bottom of the photo */}
            <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-5 pb-5 pt-28 text-center sm:px-6 sm:pb-6">
              <h1 className="animate-fade-up text-[1.9rem] font-bold leading-tight sm:text-[2.15rem] [font-family:var(--font-serif),serif]">
                <span className="name-shimmer">
                  {contact.fullName}, {contact.title}
                </span>
              </h1>
              <div
                aria-hidden="true"
                className="gold-divider mx-auto mt-3 h-px w-[86%] bg-gradient-to-r from-transparent via-champagne-soft to-transparent"
              />
            </div>
          </section>

          {/* Icon row */}
          <section className="flex flex-1 items-center justify-center bg-white px-4 py-7 sm:px-5 sm:py-8">
            <div className="flex flex-wrap items-start justify-center gap-x-3 gap-y-6 sm:gap-x-4">
              <a
                href={whatsappUrl("שלום אושר, אשמח לשוחח לגבי נדל״ן")}
                target="_blank"
                rel="noopener noreferrer"
                className={tileClass}
                style={{ animationDelay: "0.3s" }}
              >
                <WhatsAppIcon className={glyphClass} />
                <span className={labelClass}>Whatsapp</span>
              </a>

              <a
                href={contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={tileClass}
                style={{ animationDelay: "0.38s" }}
              >
                <InstagramIcon className={glyphClass} />
                <span className={labelClass}>instagram</span>
              </a>

              <a
                href={contact.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className={tileClass}
                style={{ animationDelay: "0.46s" }}
              >
                <FacebookIcon className={glyphClass} />
                <span className={labelClass}>facebook</span>
              </a>

              <a
                href={`mailto:${contact.email}`}
                className={tileClass}
                style={{ animationDelay: "0.54s" }}
              >
                <MailIcon className={glyphClass} />
                <span className={labelClass}>אימייל</span>
              </a>

              <a
                href={`tel:${contact.phoneE164}`}
                className={tileClass}
                style={{ animationDelay: "0.62s" }}
              >
                <PhoneIcon className={glyphClass} />
                <span className={labelClass}>חיוג</span>
              </a>

              <a href="/api/vcard" className={tileClass} style={{ animationDelay: "0.7s" }} download>
                <ContactIcon className={glyphClass} />
                <span className={labelClass}>שמירת כרטיס</span>
              </a>

              <NavigateButton className={tileClass} style={{ animationDelay: "0.78s" }}>
                <NavigateIcon className={glyphClass} />
                <span className={labelClass}>ניווט למשרד</span>
              </NavigateButton>
            </div>
          </section>
        </article>
      </main>
    </>
  );
}
