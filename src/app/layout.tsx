import type { Metadata } from "next";
import { inter } from "@/config/fonts";
import "./globals.css";
import { Providers } from "@/components";

const BASE_URL = process.env.NEXT_PUBLIC_URL ?? 'https://psicopedagogagimenamedrano.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    template: "%s | Gimena Medrano - Psicopedagoga",
    default: "Gimena Medrano | Psicopedagogía y Recursos Educativos",
  },
  description: "Espacio profesional de Gimena Medrano, Licenciada en Psicopedagogía. Especializada en dificultades de aprendizaje, orientación vocacional y recursos psicopedagógicos para niños, adolescentes y adultos en Uruguay.",
  keywords: [
    "Gimena Medrano",
    "Psicopedagogía",
    "psicopedagoga Uruguay",
    "dificultades de aprendizaje",
    "recursos educativos",
    "orientación vocacional",
    "E-books psicopedagógicos",
    "materiales psicopedagógicos",
    "cuadernos de actividades",
    "desarrollo cognitivo",
    "aprendizaje infantil",
  ],
  openGraph: {
    title: "Gimena Medrano | Psicopedagogía y Recursos Educativos",
    description: "Recursos, artículos y herramientas creadas por la Lic. Gimena Medrano para acompañar el aprendizaje y el desarrollo cognitivo.",
    type: "website",
    locale: "es_UY",
    url: BASE_URL,
    siteName: "Gimena Medrano - Psicopedagoga",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gimena Medrano | Psicopedagogía",
    description: "Recursos, artículos y herramientas para potenciar el aprendizaje y el desarrollo cognitivo.",
  },
  authors: [{ name: "Gimena Medrano", url: BASE_URL }],
  creator: "Gimena Medrano",
  alternates: {
    canonical: BASE_URL,
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Gimena Medrano",
  jobTitle: "Licenciada en Psicopedagogía",
  description: "Psicopedagoga especializada en dificultades de aprendizaje, orientación vocacional y recursos educativos para niños, adolescentes y adultos.",
  url: BASE_URL,
  knowsAbout: [
    "Psicopedagogía",
    "Dificultades de aprendizaje",
    "Orientación vocacional",
    "Desarrollo cognitivo",
    "Recursos educativos",
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "Psicopedagoga",
    occupationLocation: {
      "@type": "Country",
      name: "Uruguay",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}