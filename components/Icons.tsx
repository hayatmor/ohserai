type IconProps = {
  className?: string;
};

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        {...stroke}
        d="M8.2 3.8h2.1c.5 0 .9.3 1 .8l.6 2.4c.1.4 0 .8-.3 1.1l-1.1 1.1a12.4 12.4 0 0 0 5.3 5.3l1.1-1.1c.3-.3.7-.4 1.1-.3l2.4.6c.5.1.8.5.8 1v2.1c0 .9-.7 1.6-1.6 1.5A15.2 15.2 0 0 1 3.7 5.4c-.1-.9.6-1.6 1.5-1.6Z"
      />
    </svg>
  );
}

export function ContactIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <circle {...stroke} cx="12" cy="8.2" r="3.2" />
      <path {...stroke} d="M5.5 19.2c.9-3 3.2-4.5 6.5-4.5s5.6 1.5 6.5 4.5" />
    </svg>
  );
}

export function PinIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path {...stroke} d="M12 21s6-5.4 6-10a6 6 0 1 0-12 0c0 4.6 6 10 6 10Z" />
      <circle {...stroke} cx="12" cy="11" r="2.1" />
    </svg>
  );
}

export function NavigateIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <rect {...stroke} x="7" y="2.8" width="10" height="18.4" rx="2.2" />
      <path {...stroke} d="M10.2 14.2c1.1-2.2 2.5-3.5 3.6-4.2" />
      <path {...stroke} d="M12.2 8.4h2.6v2.6" />
      <path {...stroke} d="M9.5 18.2h5" />
    </svg>
  );
}

export function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        {...stroke}
        d="M12 3.4a8.1 8.1 0 0 0-7 12.2L4.2 20l4.5-.9A8.1 8.1 0 1 0 12 3.4Z"
      />
      <path
        {...stroke}
        d="M9.1 9.3c.2-.5.4-.5.7-.5h.5c.2 0 .4.1.5.4l.7 1.7c.1.2 0 .4-.1.6l-.4.5c-.1.1-.1.3 0 .4.4.7 1.1 1.4 1.9 1.9.1.1.3.1.4 0l.5-.4c.2-.1.4-.2.6-.1l1.7.7c.3.1.4.3.4.5v.5c0 .3 0 .5-.5.7-.5.2-1.3.4-2.2.1-1.5-.4-3.1-1.6-4.3-3.1-1-1.3-1.7-2.8-1.7-3.9 0-.5.2-.8.3-1Z"
      />
    </svg>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <rect {...stroke} x="3.2" y="6.2" width="17.6" height="11.6" rx="1.6" />
      <path {...stroke} d="m4.2 7.4 7.8 5.4 7.8-5.4" />
      <path {...stroke} d="M8.2 4.6h7.6v2.2" />
    </svg>
  );
}

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <rect {...stroke} x="3.4" y="3.4" width="17.2" height="17.2" rx="4" />
      <path {...stroke} d="M13.2 20.6v-7.2h2.4l.4-2.6h-2.8V9.4c0-.7.2-1.2 1.3-1.2h1.5V5.9c-.3 0-1.1-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.1H8.1v2.6h2V20.6" />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <rect {...stroke} x="3.4" y="3.4" width="17.2" height="17.2" rx="5" />
      <circle {...stroke} cx="12" cy="12" r="4" />
      <circle cx="17.1" cy="6.9" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}
