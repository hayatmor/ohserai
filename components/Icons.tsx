type IconProps = {
  className?: string;
};

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Frame() {
  return <rect {...stroke} x="2.5" y="2.5" width="19" height="19" rx="5.2" />;
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <Frame />
      <path
        {...stroke}
        d="M17.5 14.71v1.65a1.1 1.1 0 0 1-1.2 1.1 10.88 10.88 0 0 1-4.75-1.69 10.7 10.7 0 0 1-3.3-3.3A10.88 10.88 0 0 1 6.57 7.7 1.1 1.1 0 0 1 7.66 6.5h1.65a1.1 1.1 0 0 1 1.1.95c.07.53.2 1.05.39 1.55a1.1 1.1 0 0 1-.25 1.16l-.7.7a8.8 8.8 0 0 0 3.3 3.3l.7-.7a1.1 1.1 0 0 1 1.16-.25c.5.19 1.02.31 1.55.39a1.1 1.1 0 0 1 .94 1.11Z"
      />
    </svg>
  );
}

export function ContactIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <Frame />
      <circle {...stroke} cx="12" cy="9.6" r="2.6" />
      <path {...stroke} d="M7.4 17.2c.55-2.2 2.3-3.3 4.6-3.3s4.05 1.1 4.6 3.3" />
    </svg>
  );
}

export function PinIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <Frame />
      <path {...stroke} d="M16.4 10.3c0 3.3-4.4 6.6-4.4 6.6s-4.4-3.3-4.4-6.6a4.4 4.4 0 0 1 8.8 0Z" />
      <circle {...stroke} cx="12" cy="10.3" r="1.65" />
    </svg>
  );
}

export function NavigateIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <Frame />
      <path {...stroke} d="M7.05 11.45 17.5 6.5l-4.95 10.45-1.1-4.4-4.4-1.1Z" />
    </svg>
  );
}

export function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <Frame />
      <path
        {...stroke}
        d="M12 5.7a6.3 6.3 0 0 0-5.39 9.52L5.84 18.3l3.15-.77A6.3 6.3 0 1 0 12 5.7Z"
      />
      <path
        {...stroke}
        d="M9.69 9.48c.14-.28.35-.35.56-.35h.28c.21 0 .35.14.42.28l.56 1.4c.07.21 0 .42-.14.56l-.49.49c.56 1.12 1.47 2.03 2.59 2.59l.49-.49c.14-.14.35-.21.56-.14l1.4.56c.14.07.28.21.28.42v.28c0 .21-.07.42-.35.56-.42.21-1.05.35-1.75.14-1.26-.35-2.52-1.26-3.5-2.38-.91-1.05-1.47-2.31-1.4-3.22 0-.28.21-.56.49-.7Z"
      />
    </svg>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <Frame />
      <rect {...stroke} x="6" y="8" width="12" height="8.5" rx="1.2" />
      <path {...stroke} d="m6.6 8.9 5.4 3.7 5.4-3.7" />
    </svg>
  );
}

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <Frame />
      <path
        {...stroke}
        d="M15.3 6.5h-1.65a2.75 2.75 0 0 0-2.75 2.75v1.65H9.25v2.2h1.65v4.4h2.2v-4.4h1.65l.55-2.2h-2.2V9.25a.55.55 0 0 1 .55-.55h1.65V6.5Z"
      />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <Frame />
      <rect {...stroke} x="6.4" y="6.4" width="11.2" height="11.2" rx="3.1" />
      <circle {...stroke} cx="12" cy="12" r="2.6" />
      <circle cx="15.15" cy="8.85" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  );
}
