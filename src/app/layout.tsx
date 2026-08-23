import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { Nav } from "@/components/layout/Nav";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display-loaded",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-sans-loaded",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono-loaded",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "SmokDefense — Intelligent Smoke Management",
  description:
    "A centralized digital layer for complex building life-safety systems.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-canvas text-ink">
        <SmoothScrollProvider>
          <Nav />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
