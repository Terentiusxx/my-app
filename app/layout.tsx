import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import "./globals.css";

const font = Inter({
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dr. Jason Anquandah Portfolio",
  description: "Portfolio website for Dr. Jason Anquandah",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${font.className} antialiased overflow-x-hidden`}
      >
  <Navbar />
  {children}
  <Footer />
      </body>
    </html>
  );
}
