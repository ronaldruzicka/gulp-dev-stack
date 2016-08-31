import { argv } from 'yargs';
import babelify from 'babelify';
import browserify from 'browserify';
import browserSync from 'browser-sync';
import config from '../config';
import gulp from 'gulp';
import gulpif from 'gulp-if';
import gutil from 'gulp-util';
import rename from 'gulp-rename';
import source from 'vinyl-source-stream';
import streamify from 'gulp-streamify';
import uglify from 'gulp-uglify';
import watchify from 'watchify';

const { src, dist, names } = config.paths;
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
