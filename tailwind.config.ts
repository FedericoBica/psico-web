import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        // Un verde pálido, relajante y profesional
        'sage': {
          50: '#f4f7f4',
          100: '#e7ede7',
          200: '#d1dbd1',
          500: '#8ca38c', // Color principal para acentos
          600: '#768a76', // Para hover
        },
      },
      animation: {
          'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }, // Se mueve la mitad para un loop infinito fluido
        },
      },
  },
  plugins: [],
  }
}
export default config;
