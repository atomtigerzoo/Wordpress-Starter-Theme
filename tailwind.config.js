/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');
const publicPath = './public';

module.exports = {
  content: [
    `${publicPath}/**/*.php`,
    `${publicPath}/**/*.js`,
  ],
  theme: {
    extend: {
      // fontFamily: {
      //   sans: [
      //     'Anton',
      //     ...defaultTheme.fontFamily.sans,
      //   ]
      // },
    },
  },
  plugins: [],
}
