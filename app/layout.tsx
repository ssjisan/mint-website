import "bootstrap/dist/css/bootstrap.min.css";
import type { Metadata } from "next";
import { Libre_Baskerville, Google_Sans_Flex } from "next/font/google";
import "./globals.scss";
import Script from "next/script";

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-libreBaskerville",
  display: "swap",
});

const googleSansFlex = Google_Sans_Flex({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-google-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mint | Built for Exceptionals",
  description: "Internet Built on 25 Years of Trust.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="The believer’s shade on the Day of Resurrection will be his charity. Prophet Muhammad ﷺ (Tirmidhi 604)"
        />
        <meta name="author" content="Giving Grace Foundation" />
        <meta
          name="keywords"
          content="ggf, givinggrace, giving grace, donation bangladesh, donation bd"
        />

        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>

      <body
        className={`${libreBaskerville.variable} ${googleSansFlex.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
