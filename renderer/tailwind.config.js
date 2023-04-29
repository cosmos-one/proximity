const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './renderer/pages/**/*.{js,ts,jsx,tsx}',
    './renderer/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      // use colors only specified
      white: colors.white,
      gray: colors.gray,
      blue: colors.blue,
      black: colors.black,
    },
    extend: {
      colors: {
        green: "#00ff00",
        blue: "#0000ff",
        red: "#ff0000",
        lightgreen: "#00ff0088",
        hlgreen: "#00ff0033"
      },
      typography: ({ theme }) => ({
        green: {
          css: {
            '--tw-prose-headings': theme('colors.green'),
          }
        }
      })
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
