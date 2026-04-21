import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        tech: {
          dark: '#0a0a0f',
          darker: '#050508',
          purple: '#8b5cf6',
          cyan: '#22d3ee',
          yellow: '#fbbf24',
          orange: '#f97316',
          gray: '#27272a',
          light: '#f4f4f5',
          success: '#22c55e',
        },
      },
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;