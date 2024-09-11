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
 * Public path:
 * The folder in which the Wordpress theme files are placed.
 * 
 * Dist path:
 * The folder in which the compiled assets are placed. Do not 
 * place any other files in this folder as it will be deleted
 * on builds/dev.
 */

// The URL to proxy to Browsersync
const bsProxyUrl = 'https://wp-starter.ddev.site ';

// (Public) Theme folder [only change if you're about to know why]
const publicPath = 'public';

// The folder for compiled assets built by mix
const distPath = `${publicPath}/dist`;


mix
    /*
        Vendor/Library scripts
        When in use, change 'MIXASSETS_VENDORS_USED' to 'true' in functions.php
    */
    // .scripts([
    //     "node_modules/alpinejs/dist/cdn.min.js",
    // ], `${distPath}/js/vendor.js`)

    // App/User scripts
    .scripts([
        "resources/js/app.js"
    ], `${distPath}/js/app.js`)

    // PostCSS & TailwindCSS
    .postCss("resources/css/theme.css", `${distPath}/css`, [
        require("tailwindcss"),
    ]);


// Mix options
mix.setPublicPath('./'); // this is not the public path from above!
mix.version(); // enable versioning


// Clean up previous built files
mix.clean({
    cleanOnceBeforeBuildPatterns: [
        `${distPath}/js/**`,
        `${distPath}/css/**`,
    ]
});


// Browsersync options
mix.browserSync({
    proxy: bsProxyUrl,
    open: false,
    notify: false,
    files: [
        `${publicPath}/**/*.php`,
        `${publicPath}/**/*.js`,
        `${publicPath}/**/*.css`,
    ]
});
