import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { DemoProvider } from "@/components/demo/DemoProvider";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
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
  title: {
    default: "SmokDefense — Intelligent Building Systems & Ventilation Technology",
    template: "%s — SmokDefense",
  },
  description:
    "Intelligent ventilation, car park ventilation, CO₂ monitoring, pressurization, fire & smoke dampers, actuators, controllers and building automation systems.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col justify-between bg-canvas text-ink">
        <SmoothScrollProvider>
          <DemoProvider>
            <Nav />
            <div className="flex-1">{children}</div>
            <Footer />
          </DemoProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
