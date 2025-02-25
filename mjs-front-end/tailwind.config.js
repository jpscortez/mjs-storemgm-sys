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
      },
      screens: {
        print: { raw: 'print' },
      }
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.shark-teeth-bottom': {
          position: 'absolute',
          left: '0',
          bottom: '0',
          width: '100%',
          height: '4rem', /* Adjust the height for the shark teeth */
          backgroundColor: '#FFF', /* Same color as the div */
          clipPath: 'polygon(0 100%, 2.5% 80%, 5% 100%, 7.5% 80%, 10% 100%, 12.5% 80%, 15% 100%, 17.5% 80%, 20% 100%, 22.5% 80%, 25% 100%, 27.5% 80%, 30% 100%, 32.5% 80%, 35% 100%, 37.5% 80%, 40% 100%, 42.5% 80%, 45% 100%, 47.5% 80%, 50% 100%, 52.5% 80%, 55% 100%, 57.5% 80%, 60% 100%, 62.5% 80%, 65% 100%, 67.5% 80%, 70% 100%, 72.5% 80%, 75% 100%, 77.5% 80%, 80% 100%, 82.5% 80%, 85% 100%, 87.5% 80%, 90% 100%, 92.5% 80%, 95% 100%, 97.5% 80%, 100% 100%)', /* Quadrupled the frequency of teeth */
        },
      });
    },
  ],
}

