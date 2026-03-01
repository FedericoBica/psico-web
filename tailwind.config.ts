import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      colors: {
        // ── Paleta cliente ──────────────────────────────
        // Gris: #e3e3e3 | Verde: #9ead6b | Verde sec: #c9d894
        gray: {
          light:   '#f7f7f5',
          DEFAULT: '#e3e3e3',
          mid:     '#c9c9c9',
          text:    '#777777',
          dark:    '#444444',
        },
        green: {
          xlight:  '#eef3da',   // fondo muy suave
          light:   '#c9d894',   // verde secundario
          DEFAULT: '#9ead6b',   // verde principal
          dark:    '#7a9347',   // hover / activo
          xdark:   '#5c7233',   // para textos sobre fondo claro
        },
        // alias cortos para uso directo
        brand: {
          gray:    '#e3e3e3',
          green:   '#9ead6b',
          lime:    '#c9d894',
          text:    '#2d2d2d',
          soft:    '#f7f7f5',
        },
        // mantener sage por compatibilidad con componentes existentes
        sage: {
          50:  '#f5f8ec',
          100: '#eef3da',
          200: '#c9d894',
          300: '#b8ca7a',
          400: '#a8bc6e',
          500: '#9ead6b',
          600: '#7a9347',
          700: '#5c7233',
          800: '#435426',
          900: '#2d3819',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':  'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-out both',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [],
  
}
export default config;
