import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import CookiePopup from "@/components/CookiesPopup";
import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-montserrat antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow mt-16">{children}</main>
        <CookiePopup />
        <Footer />
      </body>
    </html>
  );
}
