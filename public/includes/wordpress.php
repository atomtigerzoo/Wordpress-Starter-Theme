<?php

/**
 * Wordpress specific functions and settings
 */


/**
 * Register menus for Wordpress
 */
// register_nav_menus([
//     // 'main-navigation' => 'Main navigation',
// ]);


/*
  Enable featured images
 */
// add_theme_support('post-thumbnails');


/**
 * Image sizes
 */
// add_image_size('huge', 1900, 1400, false);


/*
  Wrap a `figure` container element around embeds
 */
add_filter('embed_oembed_html', function($content) {
    return '<figure class="oembed-wrap">' . $content . '</figure>';
}, 10, 3);


/*
  Set search form to HTML5 format
 */
add_filter('search_form_format', function() {
    return 'html5';
}, 10);


/*
  Disable WordPress emojis in theme frontend
 */
add_action('init', function() {
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('wp_print_styles', 'print_emoji_styles');
    remove_filter('the_content_feed', 'wp_staticize_emoji');
    remove_filter('comment_text_rss', 'wp_staticize_emoji');
    add_filter('emoji_svg_url', '__return_false');
});
