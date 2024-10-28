"use client";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "@/apollo-client";
import NavMenu from "@/components/NavMenu";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavMenu />
        <ApolloProvider client={apolloClient}>
          <main className="container px-20 py-5">
            {children}

          </main>
        </ApolloProvider>
      </body>
    </html>
  );
}
