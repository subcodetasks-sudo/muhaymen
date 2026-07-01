import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const zain = localFont({
  src: "../fonts/alfont_com_zain-mob-long500.ttf",
  variable: "--font-zain",
  weight: "500",
  display: "swap",
});

export const fontClassName = `${geistSans.variable} ${geistMono.variable} ${zain.variable} h-full antialiased`;
