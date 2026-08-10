"use client";

import type { ButtonHTMLAttributes } from "react";
import { appleMapsUrl, googleMapsUrl } from "@/lib/contact";

type NavigateButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function NavigateButton({ className, children, ...props }: NavigateButtonProps) {
  function handleClick() {
    const isAppleMobile =
      typeof navigator !== "undefined" && /iPhone|iPad|iPod/i.test(navigator.userAgent);

    window.open(isAppleMobile ? appleMapsUrl() : googleMapsUrl(), "_blank", "noopener,noreferrer");
  }

  return (
    <button type="button" onClick={handleClick} className={className} {...props}>
      {children}
    </button>
  );
}
