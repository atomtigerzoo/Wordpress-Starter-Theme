<script src="<?php echo get_template_directory_uri(); ?>/assets-build/js/scripts-8971778a9c.js"></script>

<?php // Scripts for logged in users
if(is_user_logged_in()):
	//echo '<script type="text/javascript" src="'. get_template_directory_uri() .'/assets/js/some-script.js"></script>';
endif;

// Development stuff
if(defined(WP_DEBUG) && WP_DEBUG):
	// Do something
endif;
