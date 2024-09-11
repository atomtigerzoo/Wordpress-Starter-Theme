/** @type {import('tailwindcss').Config} */

const publicPath = './public';

module.exports = {
  content: [
    `${publicPath}/**/*.php`,
    `${publicPath}/**/*.js`,
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
