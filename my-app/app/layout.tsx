import "./globals.css";
import Navbar from "@/components/Navbar";
import type {Metadata} from "next";
import {Roboto} from "next/font/google";

// Set fonts
// const inter = Inter({subsets: ["latin"]});
const roboto = Roboto({weight: "300", subsets: ["latin"]});

// Metadata
export const metadata: Metadata = {
  title: "Next.js project",
  description:
    "Next tutorial with all the basics of the framework. Typescript and TailwindCSS used as well",
  keywords: "Next.js, Typescript, TailwindCSS",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Navbar />
        <main className="max-w-3xl mx-auto py-10">{children}</main>
      </body>
    </html>
  );
}
