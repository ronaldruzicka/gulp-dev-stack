const argv = require('yargs').argv;
const gulp = require('gulp');
const requireDir = require('require-dir');

const isProd = argv.prod || false;
process.env.NODE_ENV = isProd ? 'production' : 'development';

requireDir('./gulp/tasks');

// API
gulp.task('default', ['serve']);
gulp.task('build', ['prepare']);
gulp.task('css', ['styles']);
