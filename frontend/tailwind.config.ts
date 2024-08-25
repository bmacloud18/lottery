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
      'buttonwhite': '#d4d4d8',
      'background': '#67736f',
      'yellow': '#d4d00d'
    },
  },
  plugins: [],
};
export default config;
