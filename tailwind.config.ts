import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        accent: 'var(--color-accent)',
        background: 'var(--color-background)',
        text: 'var(--color-text)',
      },
      fontFamily: {
        montserrat: 'var(--font-montserrat)',
        lora: 'var(--font-lora)',
      },
      keyframes: {
        slideFromRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        expandFromLeft: {
          '0%': { width: '0' },
          '100%': { width: '40%' }  // w-1/3
        }
      },
      animation: {
        slideFromLeft: 'slideFromLeft 0.5s ease-out forwards',
        expandFromLeft: 'expandFromLeft 0.4s ease-out forwards'
      },
    },
  },
  plugins: [],
} satisfies Config;
