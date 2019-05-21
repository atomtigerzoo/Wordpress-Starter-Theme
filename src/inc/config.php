<?php

/**
 * Config
 */


/**
 * Enable errors in WP_DEBUG mode
 */
if(defined('WP_DEBUG') && WP_DEBUG) {
	error_reporting(E_ALL);
	ini_set('display_errors', '1');
} else {
	// do something here in production mode
}
