<?php

// 404.php

get_header();

?>
<div class="container mx-auto mt-12 space-y-4 text-center">
    <div class="text-4xl">🥺</div>
    <h1 class="text-2xl">404 &ndash; Page not found</h1>
    <div class="mt-12 mx-auto space-y-2 lg:w-1/3">
        <p>
            The page you requested could not be found.<br>
        </p>
        <p>
            Please consider starting again from the <a href="/">home page</a> or try <a href="/?s">our search</a> if you know what you were looking for.
        </p>
        <p class="text-red-700 font-semibold">
            Sorry for the inconvenience!
        </p>
    </div>
</div>

<?php get_footer();
