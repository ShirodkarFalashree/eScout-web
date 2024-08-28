/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg1: 'rgb(108, 0, 162)',
        bg2: 'rgb(0, 17, 82)',
        color1: 'rgb(18, 113, 255)',
        color2: 'rgb(221, 74, 255)',
        color3: 'rgb(100, 220, 255)',
        color4: 'rgb(200, 50, 50)',
        color5: 'rgb(180, 180, 50)',
        colorInteractive: 'rgb(140, 100, 255)',
      },
    },
  },
  plugins: [],
}
