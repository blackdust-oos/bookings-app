/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        warm: "#FEF4E6", 
        customBrown: '#7A4504',
        customBlue: '#0D6EFD',
        customBlue1:'#E7F0FF',
        navyBlue: '#000031',
        customGray: "#f5f5f5", 
        customGreen: "#34d399", 
        dark1: '#344054'
      },
    },
  },
  plugins: [],
}
