/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./popup/*.html"],
  theme: {
    extend: {
      keyframes: {
        propel: {
          '0%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(25%)' },
          '50%': { transform: 'translateX(-25%)' },
          '75%': { transform: 'translateX(25%)' },
          '100%': { transform: 'translateX(-25%)' },
        },
      },
    },
    plugins: [],
  }
}
