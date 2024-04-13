/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      fontFamily:{
        poppins:["poppins","sans-serif"]
      },
      backgroundColor:{
        customLightBlack:'rgba(18,18,18)',
        customGray:'rgb(32,30,30)',
        customOpacityBlackBg:'rgba(0,0,0,0.25)'
      },
      colors:{
        customGray:'rgb(152,152,152)'
      },
      height:{
        "1/10":"10%",
        "9/10":"90%",
        "3/20":"15%",
        "1/5":"20%"

      }
    },
  },
  plugins: [],
}

