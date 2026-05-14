import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jiten Parekh | Govt. Approved Jewelry Valuer & Gemologist",
  description: "Certified jewelry valuation services for taxation, insurance, loans, and legal purposes. 39+ years of expertise in the jewelry field.",
  keywords: "Jewelry Valuer, Gemologist, GII, Govt Approved Valuer, Jiten Parekh, Jewelry Valuation India, Diamond Valuation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
