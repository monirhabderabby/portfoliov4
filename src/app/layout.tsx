// Package
import { ClerkProvider } from "@clerk/nextjs";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import Head from "next/head";

// CSS
import NProgress from "@/components/animation/NProgress";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

export const metadata: Metadata = {
  title: "Monir Hossain",
  description: "Full Stack Web Developer",
  keywords:
    "Full Stack Developer, Web Development, Next.js, React.js, Node.js, Express.js, MongoDB, JavaScript, Frontend Development, Backend Development, software engineer, responsive design, web applications. database management, UI/UX Design, Server-Side Rendering, Client-Side Rendering, Single Page applications.Cross platform development, restful apis, devops, version control, code optimization, TypeScript, Frontend Frameworks , Backend Frameworks, MERN Stack, MEAN Stack,  SEO Best Practices, Open Source Contribution, Web Security, API Integration, Error Handling, Code Versioning, monirrabby",
  openGraph: {
    images:
      "https://res.cloudinary.com/dzlrpspps/image/upload/v1700748344/Portfolio%20Website/monir_hossain.png",
  },
  publisher: "Monir Hossain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
        </Head>
        <body>
          <NProgress />
          <Toaster />
          <main className="min-h-screen w-full">{children}</main>
          <SpeedInsights />
        </body>
      </html>
    </ClerkProvider>
  );
}
