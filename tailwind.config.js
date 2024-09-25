/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.vue',
    './public/index.html',
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  corePlugins: {
    preflight: false,
  },
  prefix: 'tw-',
  theme: {
    extend: {
      boxShadow: {
        slate600: '0 6px 10px -1px rgba(100, 116, 139, 0.5), 0 4px 8px -1px rgba(100, 116, 139, 0.06)',
        slate400: '0 6px 10px -1px rgba(148, 163, 184, 0.5), 0 4px 8px -1px rgba(148, 163, 184, 0.06)',
      },
    },
  },
  plugins: [],
}
