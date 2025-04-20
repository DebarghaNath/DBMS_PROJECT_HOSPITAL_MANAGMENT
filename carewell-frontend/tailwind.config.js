/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: '#3b82f6',
        secondary: '#10b981',
        danger: '#ef4444',
        dark: '#1e293b',
        light: '#f8fafc',
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
