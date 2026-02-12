import { Geist, Geist_Mono, Teko } from "next/font/google";
import "./globals.css";

import Menu from "@/components/menu/Menu";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const mwFont = Teko({
  variable: "--font-mw",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata = {
  title: "NextJS x GSAP Responsive Navigation",
  description: "part of a learning experience by yeshwin",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${mwFont.variable}`}
    >
      <body>
        <Menu />
        {children}
      </body>
    </html>
  );
}
