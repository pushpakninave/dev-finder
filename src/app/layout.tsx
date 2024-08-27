import type { Metadata } from "next";
import { Anek_Devanagari } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider";
import { Header } from "./Header";
import GlobalTabs from "@/components/global-tab";
import NextTopLoader from 'nextjs-toploader';
import { ModeToggle } from "@/components/mode-toggle";
import { Toaster } from "@/components/ui/toaster";

const anekDevanagari = Anek_Devanagari({
  subsets: ['devanagari']
})

export const metadata: Metadata = {
  title: "DevCommit",
  description: "An application to help pair programming with random dev out there online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={anekDevanagari.className}>
        <Providers>
          <Toaster />
          <NextTopLoader />
          <Header />
          <GlobalTabs/>
          <div className="container mx-auto">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
