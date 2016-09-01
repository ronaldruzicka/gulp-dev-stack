const argv = require('yargs').argv;
const config = require('../config');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const runSequence = require('run-sequence');

const dist = config.paths.dist;

// run-sequence until gulp 4.0 is introduced
const isProd = argv.prod || false;
// Consider favicon task as seperate task out of devSequence
const devSequence = ['clean', 'icon', ['styles', 'js', 'tpl'], 'generate-favicon', 'inject-favicon-markups'];
const buildSequence = [...devSequence];
const sequence = isProd ? buildSequence : devSequence;

gulp.task('prepare', () => runSequence(...sequence));
