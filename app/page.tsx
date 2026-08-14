import Image from "next/image";
import { NavigateButton } from "@/components/NavigateButton";
import { NavigateIcon, PhoneIcon } from "@/components/Icons";
import { contact, whatsappUrl } from "@/lib/contact";

const tileClass =
  "group flex w-[22%] max-w-[4.4rem] flex-col items-center gap-1 text-black transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none sm:w-[4.5rem]";

const glyphClass =
  "h-[2.35rem] w-[2.35rem] object-contain sm:h-[2.6rem] sm:w-[2.6rem]";

const labelClass = "text-[0.62rem] font-normal leading-tight tracking-wide text-black sm:text-[0.68rem]";

function DanaIcon({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={64}
      height={64}
      className={glyphClass}
      unoptimized
    />
  );
}

export default function Home() {
  return (
    <main className="card-shell">
      <article className="business-card">
        {/* Photo fills remaining space — no empty cream gap */}
        <section className="card-photo">
          <Image
            src="/photo.jpg"
            alt={contact.fullName}
            fill
            priority
            sizes="(max-width: 640px) 100vw, 400px"
            className="object-cover object-[center_18%]"
          />

          <div className="absolute left-3 top-3 z-10 sm:left-4 sm:top-4">
            <Image
              src="/logo.png"
              alt="Rosenberger RE/MAX"
              width={420}
              height={160}
              priority
              className="h-auto w-[108px] object-contain drop-shadow-[0_2px_12px_rgba(0,0,0,0.25)] sm:w-[128px]"
            />
          </div>

          <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-4 pb-4 pt-20 text-center sm:px-5 sm:pb-5">
            <h1 className="text-[1.55rem] font-bold leading-tight sm:text-[1.85rem] [font-family:var(--font-serif),serif]">
              <span className="name-shimmer">
                {contact.fullName} - {contact.title}
              </span>
            </h1>
            <div
              aria-hidden="true"
              className="gold-divider mx-auto mt-2.5 h-px w-[86%] bg-gradient-to-r from-transparent via-champagne-soft to-transparent"
            />
          </div>
        </section>

        {/* Compact icon strip — fixed height, no stretch */}
        <section className="card-actions">
          <div className="flex w-full flex-wrap items-start justify-center gap-x-2 gap-y-3 sm:gap-x-3 sm:gap-y-3.5">
            <a
              href={whatsappUrl("שלום אושר, אשמח לשוחח לגבי נדל״ן")}
              target="_blank"
              rel="noopener noreferrer"
              className={tileClass}
            >
              <DanaIcon src="/izi-icons/whatsapp.svg" alt="WhatsApp" />
              <span className={labelClass}>Whatsapp</span>
            </a>

            <a
              href={contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={tileClass}
            >
              <DanaIcon src="/izi-icons/instagram.svg" alt="Instagram" />
              <span className={labelClass}>instagram</span>
            </a>

            <a
              href={contact.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className={tileClass}
            >
              <DanaIcon src="/izi-icons/facebook.svg" alt="Facebook" />
              <span className={labelClass}>facebook</span>
            </a>

            <a href={`mailto:${contact.email}`} className={tileClass}>
              <DanaIcon src="/izi-icons/email.svg" alt="אימייל" />
              <span className={labelClass}>אימייל</span>
            </a>

            <a href={`tel:${contact.phoneE164}`} className={tileClass}>
              <PhoneIcon className={`${glyphClass} text-black`} />
              <span className={labelClass}>חיוג</span>
            </a>

            <a href="/api/vcard" className={tileClass} download>
              <DanaIcon src="/izi-icons/digital-card.svg" alt="שמירת כרטיס" />
              <span className={labelClass}>שמירת כרטיס</span>
            </a>

            <NavigateButton className={tileClass}>
              <NavigateIcon className={`${glyphClass} text-black`} />
              <span className={labelClass}>ניווט למשרד</span>
            </NavigateButton>
          </div>
        </section>
      </article>
    </main>
  );
}
