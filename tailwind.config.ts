import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
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
  			text: 'var(--color-text)'
  		},
  		fontFamily: {
  			montserrat: [
  				'var(--font-montserrat)',
  				'sans-serif'
  			],
  			lora: [
  				'var(--font-lora)',
  				'serif'
  			]
  		},
  		keyframes: {
  			slideFromRight: {
  				'0%': {
  					transform: 'translateX(100%)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'translateX(0)',
  					opacity: '1'
  				}
  			},
  			expandFromLeft: {
  				'0%': {
  					width: '0'
  				},
  				'100%': {
  					width: '40%'
  				}
  			},
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			slideFromLeft: 'slideFromLeft 0.5s ease-out forwards',
  			expandFromLeft: 'expandFromLeft 0.4s ease-out forwards',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
