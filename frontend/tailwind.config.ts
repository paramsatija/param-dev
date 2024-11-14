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
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        blue: {
          50: '#ffffff',    // white
          100: '#f9fafb',   // gray-50
          200: '#f3f4f6',   // gray-100
          300: '#e5e7eb',   // gray-200
          400: '#d1d5db',   // gray-300
          500: '#9ca3af',   // gray-400
          600: '#6b7280',   // gray-500
          700: '#4b5563',   // gray-600
          800: '#374151',   // gray-700
          900: '#1f2937',   // gray-800
        },
      },
    },
  },
  plugins: [],
};

export default config;
