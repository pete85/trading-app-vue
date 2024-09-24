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
    extend: {},
  },
  plugins: [],
}
