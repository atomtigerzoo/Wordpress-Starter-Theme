<!doctype html>
<html class="no-js" <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo('charset'); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="x-ua-compatible" content="ie=edge">
	<title><?php wp_title( '|', true, 'right' ); ?></title>
	<?php
	// Insert styles
	get_template_part('header-styles');
	
	// WP Head
	wp_head();
	?>
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>">
</head>
<body <?= body_class() ?>>

<header>
	<div itemscope itemtype="http://schema.org/Organization">
		<?= '<'. ((is_home()) ? 'h1' : 'span') .' itemprop="brand">' ?>
			<a itemprop="url" href="<?= esc_attr(home_url('/')) ?>" title="<?= get_bloginfo('name', 'display') ?>: <?= get_bloginfo('description', 'display') ?>">
				<?= get_bloginfo('name', 'display') ?>
			</a>
		<?= '</'. ((is_home()) ? 'h1' : 'span') .'>' ?>
	</div>
	
	<div>
		<?php // Sample main navigation
		$args_main = array(
			'theme_location' => 'main-navigation',
			'fallback_cb' => false,
			'container' => false,
			'menu_id' => false,
			'menu_class' => 'nav-main'
		);
		wp_nav_menu($args_main); ?>
	</div>
</header>
