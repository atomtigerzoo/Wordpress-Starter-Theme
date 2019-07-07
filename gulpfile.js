/*
 * Main gulp file for all actions
 *
 * @version 0.3
 */

/*
 * ++++ Gulp and plugins
 */

// Load gulp and plugins
const gulp = require('gulp');
const babel = require('gulp-babel');
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
const del = require('del');
const pngquant = require('imagemin-pngquant');
const postcss = require('gulp-postcss');
const cssImport = require('postcss-import');
const postcssPresetEnv = require('postcss-preset-env');
const postcssCustomMedia = require('postcss-custom-media');
const sourcemaps = require('gulp-sourcemaps');

// Autoload other gulp plugins
const plugins = require('gulp-load-plugins')();


/*
 * Load configuration file
 */
const config = require('./gulpconfig.json');


/*
 * Paths
 */
const path = {
  fonts: './src/fonts',
  js: './src/assets/js',
  jsTemp: './src/assets/js-transpiled',
  postcss: './src/assets/css',
  src: './src',
  
  // Build folder
  build: './build'
};


/*
 * ++++ Methods
 */

/*
 * Transpile Javascript and concat everything for development
 */
function babelConcatMainJS() {
  return gulp.src([
    `${path.js}/*.js`,
    // Exclude files or folders that should not be transpiled:
    // `!${path.js}/some-script-to-be-excluded.js`,
  ])
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(concat('scripts.build.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.jsTemp))

    .pipe(browserSync.stream());
}
exports.babelConcatMainJS = babelConcatMainJS;


/*
 * Empty complete build folder
 */
function cleanBuildFolder() {
  return del([`${path.build}/*`]);
}
exports.cleanBuildFolder = cleanBuildFolder;


/*
 * Remove unused files and folders from build folder
 */
function cleanAfterBuild() {
  return del([
    `${path.build}/assets`,
    `${path.build}/themestyle.css` // This is the uncompressed version ;)
    // Add folders or files here if you would like to delete them
    // from your build folder:
    // path.build + '/logs/*',
  ]);
}
exports.cleanAfterBuild = cleanAfterBuild;


/*
 * Concat & minify all css files found inside the 'build:cssMain'-Tag
 */
function concatenateAndMinifyBuildCSS() {
  return gulp.src(`${path.build}/header-styles.php`)
    // Remove Wordpress path for minification
    .pipe(plugins.replace(
      '<?php echo get_template_directory_uri(); ?>',
      ''
    ))
    
    // Minify
    .pipe(plugins.usemin({
      // Only transform files from the following tag
      cssMain: [
        plugins.cleanCss(),
        'concat',
        plugins.rev()
      ]
    }))
    
    // Add Wordpress path again
    .pipe(plugins.replace(
      'href="/themestyle-build',
      'href="<?php echo get_template_directory_uri(); ?>/themestyle-build'
    ))

    .pipe(gulp.dest(path.build));
}
exports.concatenateAndMinifyBuildCSS = concatenateAndMinifyBuildCSS;


/*
 * Concatenate and minify javascript
 */
function concatenateAndMinifyBuildJS() {
  return gulp.src(`${path.build}/footer-scripts.php`)
    // Remove Wordpress path
    .pipe(plugins.replace(
      '<?php echo get_template_directory_uri(); ?>',
      ''
    ))
    // Uglify
    .pipe(plugins.usemin({
      jsFooter: [
        plugins.uglify({ compress: true }),
        'concat',
        plugins.rev()
      ]
    }))
    // Add Wordpress path again with build path
    .pipe(plugins.replace(
      '/assets-build/',
      '<?php echo get_template_directory_uri(); ?>/assets-build/'
    ))
    .pipe(gulp.dest(path.build));
}
exports.concatenateAndMinifyBuildJS = concatenateAndMinifyBuildJS;


/*
 * Copy all files from source to build
 */
function copySrcToBuild() {
  return gulp.src([
    `${path.src}/**/.*`,
    `${path.src}/**/*`
  ])
    .pipe(gulp.dest(
      `${path.build}/`
    ));
}
exports.copySrcToBuild = copySrcToBuild;


/*
 * Compile CSS with PostCSS
 */
function css() {
  return gulp.src(`${path.postcss}/*.css`)
    .pipe(
      postcss([
        cssImport({ from: `${path.postcss}/themestyle` }),
        postcssCustomMedia(),
        postcssPresetEnv({
          stage: 2,
          features: {
            'nesting-rules': true
          }
        })
      ])
    )
    // Minify
    .pipe(gulp.dest(`${path.src}/`))
    .pipe(browserSync.stream());
}
exports.css = css;


/*
 * Optimise images in build folder
 */
function optimiseImages() {
  return gulp.src(`${path.build}/img/*`)
    .pipe(plugins.imagemin({
      // JPG
      progressive: true,
      // SVG
      multipass: false,
      svgoPlugins: [{ removeViewBox: false }],
      // PNG
      optimizationLevel: 3,
      use: [pngquant()]
    }))
    .pipe(gulp.dest(`${path.build}/img/`));
}
exports.optimiseImages = optimiseImages;


/*
 * Update version in CSS for Wordpress (for new builds)
 */
function updateThemeVersion() {
  const d = new Date();

  const buildDate = d.getFullYear() +
                (`0${d.getMonth() + 1}`).slice(-2) +
                (`0${d.getDate()}`).slice(-2) +
                (`0${d.getHours()}`).slice(-2) +
                (`0${d.getMinutes()}`).slice(-2);
  
  return gulp.src(`${path.build}/style.css`)
    .pipe(plugins.replace('__DEVEL__', `-build.${buildDate}`))
    .pipe(gulp.dest(path.build));
}
exports.updateThemeVersion = updateThemeVersion;


/**
 * + + + + + + + + + + + +
 * Tasks
 *
 */

/*
 * Default
 * Compile, transpile and serve the browsersync
 * version of the theme for development.
 */
gulp.task('default', gulp.series(babelConcatMainJS, css, () => {
  browserSync.init({
    proxy: config.proxyUrl,
    notify: config.notifyBS
  });
  
  gulp.watch(`${path.src}/assets/css/**/*.css`, gulp.series(css));

  gulp.watch(`${path.js}/**/*.js`, gulp.series('babelConcatMainJS'));

  gulp.watch([
    `${path.jsTemp}/*.js`,
    `${path.src}/**/*.php`,
    
    // Exclude folders/files from watch task here:
    `!${path.src}/logs/**/*`,
    `!${path.fonts}/**/*`
  ]).on('change', browserSync.reload);
}));


/*
 * Build task
 */
gulp.task('build', gulp.series(
  // Run CSS & JS transpilation in src-folder again
  css,
  babelConcatMainJS,
  // Clean build and copy src
  cleanBuildFolder,
  copySrcToBuild,
  // Build everything together
  concatenateAndMinifyBuildJS,
  concatenateAndMinifyBuildCSS,
  optimiseImages,
  updateThemeVersion,
  // Clean unused and temp files
  cleanAfterBuild
));


/*
 * Clean build folder shortcut
 */
gulp.task('clean', gulp.series(cleanBuildFolder));
