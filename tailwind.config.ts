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
      fontFamily: {
        grotesque: ['var(--font-grotesque)'],
      },
    },
  },
};
export default config;
