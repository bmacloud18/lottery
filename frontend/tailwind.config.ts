import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        'loop-scroll': 'loop-scroll 15s linear infinite',
      },
      keyframes: {
        'loop-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(50%)' },
        }
      }
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'green': '#14532d',
      'red': '#b91c1c',
      'black': '#262626',
      'yellow': '#d4d00d',
      'blue': '#0b46e6',
      'orange': '#e37f0e',
      'purple': '#9a19e0',
      'cyan': '#2da6e3',
      'pink': '#f211cd',
      'lime': '#27de16',
      'indigo': '#49318c'
    },
  },
  plugins: [],
};
export default config;
