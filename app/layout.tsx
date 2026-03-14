import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import InstallPrompt from "@/components/install-prompt"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://instatask-go.vercel.app"),

  title: {
    default: "InstaTask",
    template: "%s | InstaTask",
  },

  description:
    "Uber for tasks. Post small jobs and find nearby workers instantly.",

  applicationName: "InstaTask",

  manifest: "/manifest.json",

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },

  openGraph: {
    title: "InstaTask",
    description: "Find nearby helpers or earn by helping others.",
    url: "https://instatask-go.vercel.app",
    siteName: "InstaTask",
    images: [
      {
        url: "https://instatask-go.vercel.app/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: "#FF6A00",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
      </head>

      <body className={`${inter.variable} font-sans antialiased`}>
        {children}

        {/* Install banner */}
        <InstallPrompt />

        {/* Analytics */}
        <Analytics />
      </body>
    </html>
  )
}