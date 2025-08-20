"use client";
import "./globals.css";
import { GlobalContext } from "./context/globalContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GlobalContext value={{ isLoggedIn: false }}>
      <html lang="en">
        <body>
          <a href="/">Home</a>
          {children}
        </body>
      </html>
    </GlobalContext>
  );
}
