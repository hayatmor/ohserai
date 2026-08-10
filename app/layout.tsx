import type { Metadata, Viewport } from "next";
import { Heebo, Libre_Baskerville } from "next/font/google";
import "./globals.css";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const libre = Libre_Baskerville({
  variable: "--font-libre",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "אושר לחמי | יועצת נדל״ן — Rosenberger RE/MAX",
  description:
    "כרטיס ביקור דיגיטלי של אושר לחמי, יועצת נדל״ן ב־Rosenberger RE/MAX. חיוג, וואטסאפ, שמירת איש קשר וניווט למשרד בתל אביב.",
  openGraph: {
    title: "אושר לחמי | יועצת נדל״ן",
    description: "Rosenberger RE/MAX — הלוחמים 1, תל אביב",
    locale: "he_IL",
    type: "profile",
    images: [{ url: "/photo.jpg", width: 786, height: 1024, alt: "אושר לחמי" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "אושר לחמי | יועצת נדל״ן",
    description: "Rosenberger RE/MAX — הלוחמים 1, תל אביב",
    images: ["/photo.jpg"],
  },
  icons: {
    icon: "/photo.jpg",
    apple: "/photo.jpg",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} ${libre.variable} h-full antialiased`}>
      <body className="relative min-h-full font-sans text-foreground">{children}</body>
    </html>
  );
}
