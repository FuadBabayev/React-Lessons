/* eslint-disable */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    //  ! Custom CSS we can write whatever we want
    // screens : {
    //   "sm" : "600px",
    //   "md" : "768px",
    //   "lg" : "992px",
    //   "xl" : "1280px",
    //   "2xl" : "1550px",
    // },
    fontFamily : {
      sans : ["Roboto Mono", 'monospace'],         // ! sans-a yazdiqimiz ucun butun sehife Roboto olacaq
      miltonian : ["Miltonian", "monospace"]
    }
  },
  plugins: [],
}