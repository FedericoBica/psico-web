import bcryptjs from 'bcryptjs';

interface SeedProduct {
  description: string;
  images: string[];
  price: number;
  oldPrice?: number;
  slug: string;
  tags: string[];
  title: string;
  category: string;
  downloadUrl: string;
}

interface SeedUser {
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'user';
}

interface SeedData {
  users: SeedUser[];
  categories: string[];
  products: SeedProduct[];
}

export const initialData: SeedData = {
  users: [
    {
      email: 'admin@psicoweb.com',
      name: 'Admin',
      password: bcryptjs.hashSync('123456'),
      role: 'admin',
    },
    {
      email: 'user@psicoweb.com',
      name: 'Usuario Test',
      password: bcryptjs.hashSync('123456'),
      role: 'user',
    },
  ],

  categories: ['aprendizaje'],

  products: [
    {
      title: 'Guía Completa de Lectura Veloz',
      description:
        'Aprendé técnicas probadas para duplicar tu velocidad de lectura sin perder comprensión. Este e-book te enseña el método de lectura en bloques, cómo eliminar la subvocalización y ejercicios prácticos para entrenar tu cerebro a procesar texto más rápido. Ideal para estudiantes, profesionales y cualquier persona que quiera aprovechar mejor su tiempo.',
      images: ['ebook2.webp'],
      price: 590,
      oldPrice: 890,
      slug: 'guia-completa-lectura-veloz',
      tags: ['lectura', 'aprendizaje', 'productividad', 'estudio'],
      category: 'aprendizaje',
      downloadUrl: 'https://www.example.com/lectura-veloz.pdf',
    },
    {
      title: 'Escritura Creativa: Del Bloqueo a la Página',
      description:
        'Un método paso a paso para desbloquear tu escritura y desarrollar un estilo propio. Cubrimos técnicas de brainstorming, cómo estructurar ideas, superar el síndrome de la página en blanco y construir un hábito de escritura diaria. Incluye más de 30 ejercicios prácticos para escritores de todos los niveles.',
      images: ['ebook1.jpg'],
      price: 690,
      oldPrice: 990,
      slug: 'escritura-creativa-del-bloqueo-a-la-pagina',
      tags: ['escritura', 'creatividad', 'aprendizaje', 'hábitos'],
      category: 'aprendizaje',
      downloadUrl: 'https://www.example.com/escritura-creativa.pdf',
    },
  ],
};