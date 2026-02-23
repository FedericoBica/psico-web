import bcryptjs from 'bcryptjs';

interface SeedProduct {
  description: string;
  images: string[];
  price: number;
  slug: string;
  tags: string[];
  title: string;
  category: ValidCategory;
  downloadUrl: string;
}

interface SeedUser {
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'user';
}

type ValidCategory = 'lectura' | 'juegos' | 'escritura';

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

  categories: ['juguetes', 'juegos', 'lubricantes', 'bdsm'],

  products: [
    {
      title: 'E-book de Ejemplo',
      description: 'Descripción del e-book de ejemplo.',
      images: ['https://res.cloudinary.com/demo/image/upload/sample.jpg'],
      price: 990,
      slug: 'ebook-de-ejemplo',
      tags: ['psicologia'],
      category: 'juegos',
      downloadUrl: 'https://www.example.com/ebook.pdf',
    },
  ],
};