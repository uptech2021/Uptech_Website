import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UpTech Incorporated — Digital Services",
  description: "UpTech Incorporated is a leading web agency and the creator of Ourlime, a platform for building sustainable relationships and managing private communities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body data-grad="subtle">
        {children}
      </body>
    </html>
  );
}
