/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'black': '#000000',

      'dark-blue': '#202A30',
      'red': '#DF0000',
    },
    screens: {
      'sm': '479px',
      // => @media (min-width: 640px) { ... }

      'md': '639px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }

      '3xl': '2000px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      borderColor: { DEFAULT: "#202A30" },
    },
  },
  plugins: [],
}

