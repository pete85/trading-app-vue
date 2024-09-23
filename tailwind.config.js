/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./src/**/*.vue', './public/index.html'],
  corePlugins: {
    preflight: false
  },
  prefix: 'tw-',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

