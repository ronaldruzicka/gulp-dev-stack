const argv = require('yargs').argv;
const config = require('../config');
const eslint = require('gulp-eslint');
const gulp = require('gulp');
const gulpif = require('gulp-if');

// const { gulpfile, src } = config.paths;
const gulpfile = config.paths.gulpfile;
const src = config.paths.src;

const isProd = argv.prod || false;

const lint = (globs) => {
    const opts = !isProd ? {
        'rules': {
            'no-empty': 0,
            'space-in-parens': 0,
            'no-unused-vars': 0,
            'no-multiple-empty-lines': 0
        }
    } : {};
    return gulp.src(globs)
        .pipe(eslint(opts))
        .pipe(eslint.format())
        .pipe(gulpif(isProd, eslint.failOnError()));
};
gulp.task('lint:app', () => lint(src.app.all));
gulp.task('lint:gulpfile', () => lint([gulpfile.entry, gulpfile.tasks]));
gulp.task('lint', ['lint:gulpfile', 'lint:app']);
