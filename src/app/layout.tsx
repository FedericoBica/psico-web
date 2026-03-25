import type { Metadata } from "next";
import { inter } from "@/config/fonts";
import "./globals.css";
import { Providers } from "@/components";

export const metadata: Metadata = {
  title: {
    template: "%s | Gimena Medrano - Psicopedagoga",
    default: "Gimena Medrano | Psicopedagogía y Recursos Educativos",
  },
  description: "Espacio profesional de Gimena Medrano, Licenciada en Psicopedagogía. Especializada en procesos de aprendizaje, orientación y recursos terapéuticos para el desarrollo integral.",
  keywords: [
    "Gimena Medrano", 
    "Psicopedagogía", 
    "psicopedagoga Uruguay", 
    "dificultades de aprendizaje", 
    "recursos educativos", 
    "orientación vocacional",
    "E-books psicopedagógicos"
  ],
  
  openGraph: {
    title: "Gimena Medrano | Psicopedagogía",
    description: "Recursos, artículos y herramientas para potenciar el aprendizaje y el desarrollo cognitivo.",
    type: "website",
    locale: "es_UY",
    url: "https://psicopedagogagimenamedrano.com", 
    siteName: "Gimena Medrano - Psicopedagoga",
  },

  // Para que los buscadores no tengan duda del autor
  authors: [{ name: "Gimena Medrano" }],
  creator: "Gimena Medrano",
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