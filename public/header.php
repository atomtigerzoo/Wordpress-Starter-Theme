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
	<link rel="icon" type="image/png" sizes="32x32" href="<?= get_template_directory_uri() ?>/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="<?= get_template_directory_uri() ?>/favicon-16x16.png">
</head>
<body <?= body_class() ?>>