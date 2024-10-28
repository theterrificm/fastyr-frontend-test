"use client";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "@/apollo-client";
import NavMenu from "@/components/NavMenu";
import localFont from "next/font/local";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

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
        <SidebarProvider>
          <ApolloProvider client={apolloClient}>
            <AppSidebar />
            {/* Sidebar button */}
            <SidebarTrigger/>
            <main className="container px-20">
              <NavMenu />
              {children}
            </main>
          </ApolloProvider>

        </SidebarProvider>
      </body>
    </html>
  );
}
