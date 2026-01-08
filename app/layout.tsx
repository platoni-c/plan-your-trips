import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Samuel's",
  description: "Plan your trips based on budget, dates and preferences",
};

export default function RootLayout({children,}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased"
      >
        {children}
      </body>
    </html>
  );
}
