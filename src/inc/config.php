<?php

/**
 * Config
 */

// Development settings
if(defined(WP_DEBUG) && WP_DEBUG) {
	// Enable error reporting
	error_reporting(E_ALL);
	ini_set('display_errors', '1');
} else {
	
}