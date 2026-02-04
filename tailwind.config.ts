import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{vue,ts}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', '"Trebuchet MS"', 'Verdana', 'sans-serif'],
        body: ['"IBM Plex Sans"', '"Segoe UI"', 'Tahoma', 'sans-serif'],
      },
      colors: {
        ink: '#0F172A',
        fog: '#E2E8F0',
        haze: '#F8FAFC',
        ember: '#F97316',
        cinder: '#1F2937',
        leaf: '#22C55E',
      },
      boxShadow: {
        soft: '0 10px 30px -15px rgba(15, 23, 42, 0.35)',
      },
    },
  },
  plugins: [],
};

export default config;
