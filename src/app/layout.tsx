import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import HeaderLayout from "@/components/site/HeaderLayout";

const SITE_URL = "https://taiwoegbelekeportfoliowebsite.vercel.app";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Egbeleke Taiwo — Full-Stack Software Engineer",
  description:
    "Full-stack software engineer specializing in backend architecture, scalable APIs, and modern web applications.",
  verification: {
    google: "zYVYlXi26hLoFRbLgcfO4w8vwSgDoLdIECzetbH6gVg",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: ["/icon.png"],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Egbeleke Taiwo",
    jobTitle: "Full-Stack Software Engineer",
    url: SITE_URL,
    description:
      "Full-stack software engineer specializing in backend architecture, custom API development, and serverless web applications.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lagos",
      addressCountry: "NG",
    },
    knowsAbout: [
      "JavaScript",
      "TypeScript",
      "Node.js",
      "Express.js",
      "Next.js",
      "Firebase",
      "Tailwind CSS",
      "MongoDB",
    ],
  };

  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "scroll-smooth",
        jetbrainsMono.variable,
        "font-sans",
        geist.variable
      )}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex min-h-full flex-col overflow-x-hidden bg-ink font-sans text-paper antialiased selection:bg-signal selection:text-ink">
        <Suspense fallback={<div className="h-16 w-full" />}>
          <HeaderLayout>
        

        <main className="flex-1">{children}</main>
        </HeaderLayout>
        </Suspense>
        <Toaster
          theme="dark"
          position="bottom-right"
          toastOptions={{
            style: {
              background: "rgba(18, 18, 20, 0.9)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "#f3f4f6",
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "12px",
            },
          }}
        />
      </body>
    </html>
  );
}