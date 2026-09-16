import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        desk: {
          bg: '#0a0a0a',
          panel: '#111111',
          border: '#222222',
          flat: '#4a9eff',
          risk: '#ff6b6b',
          green: '#00c853',
          red: '#ff1744',
          muted: '#666666',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Consolas', 'Monaco', 'monospace'],
      }
    },
  },
  plugins: [],
}
export default config
