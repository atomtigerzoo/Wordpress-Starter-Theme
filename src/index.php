<?php

/**
 * Index, front page
 */

get_header(); ?>

<div class="page">
	<h1><?= get_the_title() ?></h1>
  <div>
    <?php the_content(); ?>
  </div>
</div>

<?php get_footer();
