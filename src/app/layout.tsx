import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "../contexts/AppContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Color Chooser - Kombinace barev květináčů",
  description: "Aplikace pro vizualizaci kombinací barev květináčů",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs">
      <body className={inter.className}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
