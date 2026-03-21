/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        verde: {
          50:  '#f0f7eb',
          100: '#d9edcc',
          200: '#b3db99',
          300: '#7cbf5a',
          400: '#53a332',
          500: '#3a8220',
          600: '#2d6b1a',
          700: '#245516',
          800: '#1c4211',
          900: '#12290a',
        },
        azul: {
          50:  '#eff4fd',
          100: '#d4e2f9',
          200: '#a9c5f3',
          300: '#6fa0ea',
          400: '#3d7cdf',
          500: '#1e5cb8',
          600: '#184a96',
          700: '#133a76',
          800: '#0e2b57',
          900: '#091c38',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Montserrat', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
