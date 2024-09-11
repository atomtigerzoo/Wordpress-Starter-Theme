# 🎈 WP Starter 2.0

**A starter for Wordpress theme development using [TailwindCSS](https://tailwindcss.com/) and [Laravel Mix](https://laravel-mix.com)
to get you up and running fast. Should cover 80% of your usecases.**

<img src="public/screenshot.png" width="65%">

***

## 📄 Prerequisites
- A running Wordpress devevelopment environment
- A terminal or console
- [NVM](https://github.com/nvm-sh/nvm) and possibly NodejS

## 🔨 Development
- Clone/download this repository into your Wordpress theme folder
- Change into the cloned folder

- Inside `webpack.mix.js` change `bsProxyUrl` to the URL from where
  your are running your Wordpress development environment (the URL 
  where you are able to log in into your Wordpress dashboard)

- Run `nvm use` to use the correct nodejs version required
- Run `npm install` to install all dependencies

- Run `npm run dev` to start the development server
- Visit http://localhost:3000 in your browser

- Develop your theme, install more packages, etc pp.
- Feel happy, go skate and contribute if you like 😍 

### 🐱‍💻 NPM tasks

- `npm run dev`
This will start mix, browsersync, compiles all assets and will then
watch for changes in the */src* directory and reload browsersync on 
http://localhost:3000

- `npm run build`
This will do the same as above (without browsersync preview/server)
and minify all assets. Afterwards you can use or deploy the theme
folder.

***

## Legal

Provided as is without warranty or guarantee of any kind. Feel free
to contribute to this project or open issues.

- Author: Henning Stein <stein@atomtigerzoo.com>
- License: http://creativecommons.org/licenses/by-sa/4.0/
