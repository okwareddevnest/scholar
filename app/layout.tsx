import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from '../components/footer'; // Import the footer component

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Scholar - Homework Helper",
  description: "Your intelligent homework assistant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
