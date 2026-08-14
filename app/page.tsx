import Image from "next/image";
import { NavigateButton } from "@/components/NavigateButton";
import { NavigateIcon, PhoneIcon } from "@/components/Icons";
import { contact, whatsappUrl } from "@/lib/contact";

const tileClass =
  "group flex w-[22%] max-w-[4.4rem] flex-col items-center gap-1 text-black transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none sm:w-[4.5rem]";

const glyphClass =
  "h-[2.35rem] w-[2.35rem] object-contain sm:h-[2.6rem] sm:w-[2.6rem]";

const labelClass =
  "text-[0.62rem] font-normal leading-tight tracking-wide text-black sm:text-[0.68rem]";

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
        <header className="card-header animate-fade-in">
          <Image
            src="/logo.png"
            alt="Rosenberger RE/MAX"
            width={420}
            height={160}
            priority
            className="card-logo"
          />
        </header>

        <div className="card-body">
          <section className="card-hero">
            <div className="avatar-ring animate-soft-rise">
              <Image
                src="/photo.jpg"
                alt={contact.fullName}
                fill
                priority
                sizes="(max-width: 640px) 46vw, 200px"
                className="avatar-photo"
              />
            </div>

            <div className="card-identity animate-fade-up delay-1">
              <h1 className="card-name [font-family:var(--font-serif),serif]">
                <span className="name-shimmer">{contact.fullName}</span>
              </h1>
              <p className="card-title">{contact.title}</p>
            </div>
          </section>

          <section className="card-actions animate-fade-up delay-2">
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
        </div>
      </article>
    </main>
  );
}
