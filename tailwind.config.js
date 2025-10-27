// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default <Partial<Config>>({
  content: [
    './app/**/*.{vue,js,ts}',
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
  ],

  safelist: [{ pattern: /^bg-\[radial-gradient/ }],

  darkMode: 'class',

  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: { lg: '1120px', xl: '1120px', '2xl': '1120px' },
    },
    extend: {
      /* Paleta preto/vermelho */
      colors: {
        primary: { DEFAULT: '#e11d48', hover: '#be123c' }, // vermelho
        'primary-70': 'rgba(225, 29, 72, 0.70)',            // p/ hover:border-primary-70
        'brand-black': '#0b0b0c',
        'brand-surface': '#121316',
      },

      borderRadius: {
        xl: '18px',
        '2xl': '18px',
      },

      boxShadow: {
        card: '0 10px 15px -5px rgba(0,0,0,.08), 0 4px 6px -2px rgba(0,0,0,.05)',
        cardHover: '0 20px 25px -5px rgba(0,0,0,.10), 0 10px 10px -5px rgba(0,0,0,.06)',
      },

      /* Animações */
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        fadeUp: { from: { opacity: '0', transform: 'translateY(16px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        fadeDown: { from: { opacity: '0', transform: 'translateY(-16px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideLeft: { from: { opacity: '0', transform: 'translateX(20px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        slideRight: { from: { opacity: '0', transform: 'translateX(-20px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        scaleIn: { from: { opacity: '0', transform: 'scale(.96)' }, to: { opacity: '1', transform: 'scale(1)' } },
        pop: { '0%': { transform: 'scale(.96)' }, '60%': { transform: 'scale(1.02)' }, '100%': { transform: 'scale(1)' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-6px)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        gradientX: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        blob: {
          '0%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(10px,-12px) scale(1.05)' },
          '66%': { transform: 'translate(-12px,8px) scale(.98)' },
          '100%': { transform: 'translate(0,0) scale(1)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn .6s ease-out both',
        'fade-up': 'fadeUp .6s ease-out both',
        'fade-down': 'fadeDown .6s ease-out both',
        'slide-left': 'slideLeft .6s ease-out both',
        'slide-right': 'slideRight .6s ease-out both',
        'scale-in': 'scaleIn .5s ease-out both',
        pop: 'pop .5s ease-out both',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 1.8s linear infinite',
        'gradient-x': 'gradientX 16s ease infinite',
        blob: 'blob 12s ease-in-out infinite',
      },
    },
  },

  plugins: [],
})
