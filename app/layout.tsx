import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KUPPI LAB | MCQ Practice Platform",
  description:
    "Sharpen your knowledge with the KUPPI LAB smart MCQ practice system and take your learning to the next level.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${plusJakarta.className}`}>
      <body>{children}</body>
    </html>
  );
}
