import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './layout/**/*.{js,ts,jsx,tsx,mdx}',
    './modules/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      screens: {
        xl: '80rem',
      },
    },
    extend: {
      colors: {
        background: {
          dark: 'var(--color-background)',
          light: 'var(--color-background-light)',
        },
        title: {
          light: 'var(--color-text-light)',
          dark: 'var(--color-text-dark)',
          darker: 'var(--color-text-darker)',
        },
        button: {
          background: 'var(--color-button-background)',
        },
        border: {
          dark: 'var(--color-border)',
        },
      },
      fontFamily: {
        grotesque: ['var(--font-grotesque)'],
      },
    },
  },
};
export default config;
