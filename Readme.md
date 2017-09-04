# 🙏 Theme-init for Wordpress theme development

***

## 📄 Installation

- Clone (or download) this repository
- Copy `gulpconfig.json.default` to `gulpconfig.json`
- Edit `gulpconfig.json` to match your development proxy-url and name
  If you change the css-style filename, change it according in /src/assets/css/
  to match the filename given inside the config
- Edit `bower.json` and `package.json` (project name, your details, etc) if 
  you like to change it
- Run `yarn install` to download and install all packages
- If everything went fine see *Gulp tasks* below
- Develop your theme, install more yarn/npm or bower packages
- Be happy and contribute if you like 😍 


## 🔨 Gulp tasks

There are three gulp tasks you can run:

- `gulp`
This will start browsersync, compiles Post-CSS, transpiles the JavaScript and 
will then watch for changes in the */src* directory and reload browsersync.

- `gulp clean`
This will clean your build folder if something went wrong after a build or if 
you just wanted to test a build and keep it from your git.

- `gulp build`
This will copy everything from */src* to */build*, compiles Post-CSS, transpiles 
JavaScript, minify both CSS and JS, concatenate everything, minimises your images, 
bumps the version number etc. This is the folder you want to use in production!
Afterwards you can deploy/copy/upload the */build* folder or add it to your git 
tracking if you like. 


## 💬 Legal

- Author: Henning Stein <stein@atomtigerzoo.com>
- License: http://creativecommons.org/licenses/by-sa/4.0/
