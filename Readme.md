# Theme Init for Wordpress theme development

***

## Installation

- Clone (or download) this repository
- Run `npm install` to download and install all packages
- If everything went fine see *Gulp tasks* for development/build
- Edit `gulpfile.js` to your needs
- Develop your theme, install more npm or bower packages
- Be happy and contribute if you like


## Gulp tasks

There a three gulp tasks you can run:

- `gulp`
This will start browsersync, compiles your SASS and transpiles your Javascript
and will then watch for changes in the /src directory and reload browsersync.

- `gulp clean`
This will clean your build folder if something went wrong after a build or if you
just wanted to test a build and keep it from your git.

- `gulp build`
This will copy everything from /src to /build, compiles SASS, transpiles Javascript,
minify both CSS and JS, concatenate everything, bump the version number etc. After 
all tasks you can deploy the build folder or add it to git if you like. 


## Legal

- Author: Henning Stein <stein@atomtigerzoo.com>
- License: http://creativecommons.org/licenses/by-sa/4.0/
