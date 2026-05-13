import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#f5f7fb',
        ink: '#132238',
        muted: '#63748a',
        line: '#d4deea',
        surface: '#ffffff',
        surfaceAlt: '#eef4fb',
        brand: {
          DEFAULT: '#0f9fff',
          strong: '#0b6fb1',
          soft: '#d7efff',
        },
      },
      fontFamily: {
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: [
          'Inter Tight',
          'Inter',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
      },
      boxShadow: {
        shell: '0 24px 80px rgba(19, 34, 56, 0.08)',
      },
    },
  },
  plugins: [],
}

export default config
