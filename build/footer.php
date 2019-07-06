<?php

/**
 * Footer
 */

// Javascript files
require 'footer-scripts.php';

// Add plugin scripts: always test output!
wp_footer(); ?>

<?php if(!is_user_logged_in()): ?>
	<!-- Tracking -->
<?php endif; ?>

</body>
</html>