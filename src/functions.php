<?php

/* 
 * Main functions file
 */


// Development settings
if(defined(WP_DEBUG) && WP_DEBUG) {
	// Error reporting
	error_reporting(E_ALL);
	ini_set('display_errors', '1');
} else {
	
}


// Config
require "inc/config.php";

// Vendors

// Functions
