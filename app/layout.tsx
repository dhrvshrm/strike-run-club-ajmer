import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Providers from "@/components/providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Strike Run Club | Ajmer's Premier Running Community",
  description:
    "Join Ajmer's most vibrant running community. Weekly runs, exciting events, and a supportive community of runners. Run together, grow together.",
  keywords: ["running", "run club", "Ajmer", "fitness", "community", "marathon", "jogging"],
  authors: [{ name: "Strike Run Club" }],
  openGraph: {
    title: "Strike Run Club | Ajmer's Premier Running Community",
    description: "Join Ajmer's most vibrant running community. Run together, grow together.",
    type: "website",
    locale: "en_IN",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F9F9F9" },
    { media: "(prefers-color-scheme: dark)", color: "#0D0D0D" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body style={{ margin: 0 }}>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
