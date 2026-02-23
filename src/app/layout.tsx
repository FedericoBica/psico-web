import type { Metadata } from "next";
import { inter } from "@/config/fonts";
import "./globals.css";
import { Providers } from "@/components";

export const metadata: Metadata = {
  title: {
    template: "%s - Psico Web",
    default: "Tienda - Psico Web",
  },
  description: "Tienda de E-books",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}