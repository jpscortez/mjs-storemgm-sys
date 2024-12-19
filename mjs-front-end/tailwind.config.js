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
      },
      colors: {
        "dark-50": "#F8FBFF",
        "dark-100": "#E6EFFF",
        "dark-200": "#D0E1FC",
        "dark-300": "#B8CEF4",
        "dark-400": "#97AFD7",
        "dark-500": "#7A92BA",
        "dark-600": "#5F769C",
        "dark-700": "#475C7F",
        "dark-800": "#324462",
        "dark-900": "#202E45",
      }
    },
  },
  plugins: [],
}

