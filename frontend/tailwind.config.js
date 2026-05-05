/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        canvas: '#09090b',
        panel: '#121214',
        elevated: '#1a1a1e',
        line: '#27272a',
        accent: {
          DEFAULT: '#2dd4bf',
          dim: '#0d9488',
          glow: '#5eead4',
        },
        muted: '#a1a1aa',
        danger: '#f87171',
      },
      boxShadow: {
        panel: '0 0 0 1px rgba(255,255,255,0.06), 0 24px 48px -12px rgba(0,0,0,0.65)',
        glow: '0 0 40px -8px rgba(45, 212, 191, 0.35)',
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '48px 48px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
