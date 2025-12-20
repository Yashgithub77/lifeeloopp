import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LifeLoop - Your Agentic Life Planner",
  description: "AI-powered co-pilot for adaptive life planning. Set goals, track progress with Google Fit, sync with Google Calendar, and let the agent optimize your schedule.",
  keywords: ["life planner", "AI assistant", "goal tracking", "productivity", "fitness tracker", "Google Calendar", "Google Fit"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased`}
        suppressHydrationWarning
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
