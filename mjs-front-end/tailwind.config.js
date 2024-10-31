/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxHeight: {
        80: '20rem',
        60: '15rem',
        '60': '15rem',
        128: '32rem',
        '128': '32rem',
      }
    },
  },
  plugins: [],
}

