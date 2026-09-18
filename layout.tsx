import "./globals.css";
import React from "react";

export const metadata = {
  title: "Radhika Jewellers - AI Studio",
  description: "AI Jewelry Try-On & Catalog Studio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0e0e10] text-neutral-200 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
