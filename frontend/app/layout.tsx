import type { Metadata } from "next";
import Head from "next/head";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";

const inter = Roboto_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lottery",
  description: "run a lotto (like csgo)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#9c0926c4" />
        <meta name="theme-color" content="#9c0926c4" />
      </Head>
      <body className={inter.className}>
        <div className="bg-background">
          {children}
        </div>
      </body>
    </html>
  );
}
