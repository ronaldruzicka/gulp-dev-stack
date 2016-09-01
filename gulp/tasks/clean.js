const argv = require('yargs').argv;
const config = require('../config');
const del = require('del');
const gulp = require('gulp');

const app = config.paths.src.app;
const html = config.paths.src.html;
const icon = config.paths.src.icon;
const dist = config.paths.dist;
const styles = config.paths.src.styles;

const distDest = dist.base;
const srcDest = [styles.dest, app.dest, icon.dest, html];

const isProd = argv.prod || false;
/**
 * Removes either /dist or all built targets in /src
 * Based on --prod param
 * Used in `prepare` pipeline
 */
gulp.task('clean', () => {
    del(isProd ? distDest : srcDest);
});

/**
 * Removes /dist and all built targets in /src
 * Use standalone as `gulp unbuild`
 */
gulp.task('unbuild', () => del([...srcDest, distDest]));
