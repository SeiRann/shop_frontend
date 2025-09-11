"use client";
import "./globals.css";
import { GlobalProvider } from "./context/globalContext";
import Link from "next/link";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <GlobalProvider>
                    {children}
                </GlobalProvider>
            </body>
        </html>
    );
}
