const config = require('../config');
const del = require('del');
const gulp = require('gulp');

// const { dist, styleguide } = config.paths;
const dist = config.paths.dist;
const styleguide = config.paths.styleguide;

gulp.task('clean', () => del([dist.base, styleguide.base]));
