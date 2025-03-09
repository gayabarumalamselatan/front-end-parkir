/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        mainColor: "#004BA0",
        sidebarBg: "rgba(0, 75, 160, 0.1)"
      },
      borderRadius:{
        mainCard: 20
      },
      boxShadow:{
        cardShadow: "0px 4px 18px -8px rgba(0,0,0,0.45)"
      }
    },
  },
  plugins: [],
}

