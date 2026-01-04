import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Dark Grey - Primary dark
        dark: {
          DEFAULT: '#323232',
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#6d6d6d',
          600: '#5d5d5d',
          700: '#4f4f4f',
          800: '#454545',
          900: '#323232',
          950: '#1a1a1a',
        },
        // Beige - Light backgrounds
        beige: {
          DEFAULT: '#DDD0C8',
          50: '#F5F0EB',
          100: '#EDE5DE',
          200: '#E5DBD2',
          300: '#DDD0C8',
          400: '#C9B9AD',
          500: '#B5A292',
          600: '#9A8575',
          700: '#7A6959',
          800: '#5A4D42',
          900: '#3A322B',
        },
        // Warm Bronze - Accent
        bronze: {
          DEFAULT: '#B08D57',
          50: '#F7F3ED',
          100: '#EDE4D5',
          200: '#DCCAAD',
          300: '#CAAD7F',
          400: '#B08D57',
          500: '#96743F',
          600: '#7A5E34',
          700: '#5E482A',
          800: '#433320',
          900: '#2A2014',
        },
      },
      fontFamily: {
        display: ['var(--font-merriweather)', 'Georgia', 'serif'],
        body: ['var(--font-work-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config