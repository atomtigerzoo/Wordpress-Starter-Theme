let mix = require('laravel-mix');
require('laravel-mix-clean');

/**
 * Mix scripts and configuration for assets compilation
 * 
 * ProxyURL:
 * This is the URL that should be proxied by Browsersync to
 * display the site in the browser on https://localhost:3000
 * 
 * Vendor libraries/scripts:
 * Comment out the block below to enable vendor scripts and add
 * more entries/paths if used. Set the 'MIXASSETS_VENDORS_USED'
 * accordingly inside functions.php to enable enqueing by
 * Wordpress.
 * 
 * File names:
 * Use the defaults for quick and easy setup. Changes here need
 * updates in `mix-assets.php` accordingly.
 * 
 * Public folder:
 * The folder in which the Wordpress theme files are placed.
 * 
 * Dist folder:
 * The folder in which the compiled assets are placed. Do not 
 * place any other files in this folder as they might be deleted
 * on (re-)builds/dev.
 */

// The URL to proxy to Browsersync
const proxyUrl = 'https://wp-starter.ddev.site ';

// Folder names of the Wordpress theme folder (public) and the 
// compiled assets folder (dist) - only change if know why 😬
const publicFolder = 'public';
const distFolder = 'dist';


// Mix options
mix.setPublicPath(`${publicFolder}/${distFolder}`); // this is not meant to be the public path from above!
mix.version(); // enable versioning

mix.webpackConfig({
    // ❓ Enable the following if you need to debug webpack compilation
    // stats: {
    //     children: true
    // }
});


mix
    /*
        🚀 Vendor/Library scripts
        When in use, change 'MIXASSETS_VENDORS_USED' to 'true' in functions.php
    */
    // .combine[
    //     "node_modules/alpinejs/dist/cdn.min.js",
    // ], `${distPath}/js/vendor.js`)

    // App/User scripts
    .js([
        'resources/js/app.js'
    ], `js/app.js`)

    // PostCSS & TailwindCSS
    .postCss('resources/css/theme.css', `css`, [
        require('tailwindcss'),
    ]);


// Clean up previous built files
mix.clean({
    cleanOnceBeforeBuildPatterns: [
        `js/**/*.js`,
        `css/**/*.css`,
        `mix-manifest.json`,
    ]
});


// Browsersync options
mix.browserSync({
    proxy: proxyUrl,
    open: false,
    notify: false,
    files: [
        `${publicFolder}/**/*.php`,
        `${publicFolder}/${distFolder}/**/*.js`,
        `${publicFolder}/${distFolder}/**/*.css`,
    ]
});
