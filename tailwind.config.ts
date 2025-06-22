import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        neoncyan: "#00fff7",
        neonpink: "#ff00ea",
        glass: "rgba(30,41,59,0.7)",
      },
      fontFamily: {
        orbitron: ["Orbitron", "sans-serif"],
        sharetech: ["Share Tech Mono", "monospace"],
      },
      boxShadow: {
        neon: "0 0 8px #00fff7, 0 0 24px #ff00ea",
      },
    },
  },
  plugins: [],
} satisfies Config;
