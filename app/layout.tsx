import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Scootopia",
  description: "Do and volume calculator for programmatic advertisers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} h-full antialiased dark`}>
      <body className="h-full flex flex-col bg-background text-foreground max-w-480 w-full px-32 mx-auto">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
