<?php

/**
 * Functions to include the assets built by Laravel mix
 */

// Only change if really needed or changed in 'webpack.mix.js'
const MIXASSETS_FILES_CSS = 'dist/css/theme.css';
const MIXASSETS_FILES_JS = 'dist/js/app.js';
const MIXASSETS_FILES_VENDOR = 'dist/js/vendor.js';


/**
 * Enqueue styles and scripts
 */
add_action('wp_enqueue_scripts', function() {
    mixAssetsEnqueueStyles();
    mixAssetsEnqueueVendors();
    mixAssetsEnqueueScripts();
});


/**
 * Returns the full path to a frontend asset as specified in mix-manifest.json
 *
 * @param string $assetName The name of the asset, e.g. css/theme.css
 * @return string The full path to the asset without the public directory
 * @throws Error if mix-manifest.json is not found or the requested asset is not found
 */
function getCompiledAssetPath(string $assetName) : string {
    static $manifest = null;
    static $last_modified = 0;

    $manifest_file = get_template_directory() . '/../mix-manifest.json';
    $current_modified = filemtime($manifest_file);

    if ($manifest === null || $current_modified > $last_modified) {
        $manifest_content = file_get_contents($manifest_file);
        $manifest = json_decode($manifest_content, true);
        $last_modified = $current_modified;

        if (!$manifest || !is_array($manifest)) {
            error_log('Error: mix-manifest.json not found or unreadable.');
            return false;
        }
    }

    $theme_public_dir = '/' . THEME_PUBLIC_DIR . '/';
    $prefixedAssetsName = $theme_public_dir . $assetName;

    if (!isset($manifest[$prefixedAssetsName])) {
        error_log('Error: Provided asset "'. $prefixedAssetsName . '" not found in mix-manifest.json.');
        return false;
    }

    return str_replace($theme_public_dir, '/', $manifest[$prefixedAssetsName]);
}


/**
 * Enqueues the vendor JavaScript file for the theme
 */
function mixAssetsEnqueueVendors(): void {
    if (!MIXASSETS_VENDORS_USED) {
        return;
    }
    
    $vendorScripts = getCompiledAssetPath(MIXASSETS_FILES_VENDOR);
    
    if (!$vendorScripts) {
        return;
    }
    
    wp_enqueue_script('theme-scripts-vendor', get_template_directory_uri() . $vendorScripts, [], null, ['in_footer' => true]);
}

/**
 * Enqueues the main theme styles file for the theme
 */
function mixAssetsEnqueueStyles() : void {
    $styleFile = getCompiledAssetPath(MIXASSETS_FILES_CSS);
    if (!$styleFile) {
        return;
    }
    wp_enqueue_style('theme-style', get_template_directory_uri() . $styleFile, [], null, 'all');
}

/**
 * Enqueues the user/app JavaScript file for the theme
 */
function mixAssetsEnqueueScripts() : void {
    $scriptsFile = getCompiledAssetPath(MIXASSETS_FILES_JS);
    if ($scriptsFile) {
        wp_enqueue_script('theme-scripts', get_template_directory_uri() . $scriptsFile, [], null, ['strategy' => 'defer', 'in_footer' => true]);
    }
}
