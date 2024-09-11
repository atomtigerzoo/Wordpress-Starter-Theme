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
    <h1 class="font-semibold text-xl text-center text-sky-700">✨ WP Starter 2.0 ✨</h1>

    <?php get_template_part('parts/footer'); ?>
</body>
</html>