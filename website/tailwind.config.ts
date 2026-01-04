import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    screens: {
      '4xl': '1920px',
      '3xl': '1600px',
      '2xl': '1440px',
      xl: '1280px',
      lg: '1024px',
      md: '768px',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '24px',
        '4xl': '240px',
        '3xl': '160px',
        '2xl': '140px',
        xl: '100px',
        lg: '40px',
        md: '40px',
      },
    },
    extend: {
      fontFamily: {
        PlusJakartaSans: ['PlusJakartaSans'],
      },
      colors: {
        primary: {
          50: '#F6FAF7',
          100: '#D1E6D7',
          200: '#ACD1B8',
          300: '#87BD98',
          400: '#63A978',
          500: '#3E9459',
          600: '#198039',
          700: '#156C30',
          800: '#115727',
          900: '#0D431E',
          950: '#092E15',
          1000: '#010502',
        },
        gray: {
          100: '#F4F4F5',
          200: '#E4E4E7',
          300: '#D4D4D8',
          700: '#3F3F46',
          950: '#09090B',
        },
        secondary: '#009850',
        title: '#092E15',
        subTitle: '#3E9459',
      },
      borderRadius: {},
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'collapsible-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-collapsible-content-height)' },
        },
        'collapsible-up': {
          from: { height: 'var(--radix-collapsible-content-height)' },
          to: { height: '0' },
        },
        marquee: {
          from: {
            transform: 'translateX(0)',
          },
          to: {
            transform: 'translateX(calc(-100% - var(--gap)))',
          },
        },
        enterFromRight: {
          from: { opacity: '0', transform: 'translateX(200px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        enterFromLeft: {
          from: { opacity: '0', transform: 'translateX(-200px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        exitToRight: {
          from: { opacity: '1', transform: 'translateX(0)' },
          to: { opacity: '0', transform: 'translateX(200px)' },
        },
        exitToLeft: {
          from: { opacity: '1', transform: 'translateX(0)' },
          to: { opacity: '0', transform: 'translateX(-200px)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'rotateX(-10deg) scale(0.9)' },
          to: { opacity: '1', transform: 'rotateX(0deg) scale(1)' },
        },
        scaleOut: {
          from: { opacity: '1', transform: 'rotateX(0deg) scale(1)' },
          to: { opacity: '0', transform: 'rotateX(-10deg) scale(0.95)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeOut: {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        slideDown: {
          from: { height: '0px' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        slideUp: {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0px' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.3s ease',
        'accordion-up': 'accordion-up 0.3s ease',
        'collapsible-down': 'collapsible-down 0.3s ease',
        'collapsible-up': 'collapsible-up 0.3s ease',
        marquee: 'marquee var(--duration) infinite linear',
        scaleIn: 'scaleIn 200ms ease',
        scaleOut: 'scaleOut 200ms ease',
        fadeIn: 'fadeIn 200ms ease',
        fadeOut: 'fadeOut 500ms ease',
        enterFromLeft: 'enterFromLeft 250ms ease',
        enterFromRight: 'enterFromRight 250ms ease',
        exitToLeft: 'exitToLeft 250ms ease',
        exitToRight: 'exitToRight 250ms ease',
        slideDown: 'slideDown 400ms cubic-bezier(0.87, 0, 0.13, 1)',
        slideUp: 'slideUp 400ms cubic-bezier(0.87, 0, 0.13, 1)',
      },
      spacing: {
        gutter: 'var(--gutter)',
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
