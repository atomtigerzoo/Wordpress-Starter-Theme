<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo('charset'); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="x-ua-compatible" content="ie=edge">
	<title><?php wp_title( '|', true, 'right' ); ?></title>
	<?php
	get_template_part('parts/header');
	
	// WP Head
	wp_head();
	?>
</head>
<body <?= body_class() ?>>