import type { Metadata } from "next";
import "./globals.css";
import {UserProvider} from "@/app/context/UserContext";
import {TripsProvider} from "@/app/context/TripContext";

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
      <UserProvider>
          <TripsProvider>
              {children}
          </TripsProvider>
      </UserProvider>

      </body>
    </html>
  );
}
