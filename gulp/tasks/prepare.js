const argv = require('yargs').argv;
const gulp = require('gulp');
const runSequence = require('run-sequence');

// run-sequence until gulp 4.0 is introduced
const isProd = argv.prod || false;

// Consider favicon task as seperate task out of devSequence
const devSequence = ['clean', 'icon', 'copyJs', ['styles', 'js', 'tpl'], ['generate-favicon', 'inject-favicon-markups', 'styleguide']];
const buildSequence = [...devSequence];
const sequence = isProd ? buildSequence : devSequence;

gulp.task('prepare', () => runSequence(...sequence));
