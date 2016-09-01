const argv = require('yargs').argv;
const babelify = require('babelify');
const browserify = require('browserify');
const browserSync = require('browser-sync');
const config = require('../config');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const gutil = require('gulp-util');
const rename = require('gulp-rename');
const source = require('vinyl-source-stream');
const streamify = require('gulp-streamify');
const uglify = require('gulp-uglify');
const watchify = require('watchify');

const dist = config.paths.dist;
const names = config.names;
const src = config.paths.src;

const isProd = argv.prod || false;

const bundle = () => {
    const opts = {
        entries: src.app.entry,
        debug: !isProd,
        transform: 'babelify'
    };
    const bundler = isProd ? browserify(opts) : watchify(browserify(Object.assign({}, watchify.args, opts)));
    const rebundle = () => {
        return bundler.bundle()
            .on('error', (e) => gutil.log(gutil.colors.red(e.name) + e.message.substr(e.message.indexOf(': ') + 1)))
            .pipe(source(names.js.src))
            .pipe(gulpif(isProd, streamify(uglify())))
            .pipe(gulpif(isProd, rename(names.js.min)))
            .pipe(gulp.dest(isProd ? dist.js : src.app.dest))
            .pipe(browserSync.stream());
    };
    bundler
        .on('update', rebundle)
        .on('log', gutil.log);
    return rebundle();
};

gulp.task('js', ['lint'], bundle);
