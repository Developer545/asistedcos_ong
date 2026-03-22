/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        verde: {
          50:  '#f0faf1',
          100: '#ddf3e0',
          200: '#bde7c3',
          300: '#8fd49a',
          400: '#5ab96a',
          500: '#389e4a',
          600: '#2d7a3a',
          700: '#245f2e',
          800: '#1a4721',
          900: '#112b14',
          950: '#081509',
        },
        azul: {
          600: '#2563eb',
          700: '#1d4ed8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
