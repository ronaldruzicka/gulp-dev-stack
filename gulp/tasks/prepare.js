import { argv } from 'yargs';
import gulp from 'gulp';
import runSequence from 'run-sequence';

// run-sequence until gulp 4.0 is introduced

const isProd = argv.prod || false;
const devSequence = ['clean', 'icon', ['styles', 'js', 'tpl'],'generate-favicon', 'inject-favicon-markups'];
const buildSequence = [...devSequence];
const sequence = isProd ? buildSequence : devSequence;

gulp.task('prepare', () => runSequence(...sequence));
