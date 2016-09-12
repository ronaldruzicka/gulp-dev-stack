const argv = require('yargs').argv;
const browserSync = require('browser-sync');
const config = require('../config');
const glob = require('glob');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const gutil = require('gulp-util');
const nunj = require('nunjucks');
const nunjucks = require('gulp-nunjucks');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');

const Environment = nunj.Environment;
const FileSystemLoader = nunj.FileSystemLoader;

// const { src, dist } = config.paths;
const dist = config.paths.dist;
const entry = config.paths.src.tpl.entry;
const src = config.paths.src;

const isProd = argv.prod || false;

function getPagesList() {
    // Get all nunjucks page templates to create a list of available pages
    return glob.sync(entry)
        .map((pathname) => pathname.replace(/\.[^\.]+$/, '').substring(pathname.lastIndexOf('/') + 1, pathname.length - 1))
        .filter((name) => 'index' !== name);
}

gulp.task('tpl', () => {
    const data = {
        '_pages': getPagesList(),
        '_prod': isProd
    };
    const searchPaths = [src.tpl.base, dist.icon];
    const options = {
        noCache: true
    };

    gulp.src(entry)
        // Temporary fix for gulp's error handling within streams, see https://github.com/actum/gulp-dev-stack/issues/7#issuecomment-152490084
        .pipe(plumber({
            errorHandler: (e) => gutil.log(gutil.colors.red(`${e.name} in ${e.plugin}: ${e.message}`))
        }))
        // https://mozilla.github.io/nunjucks/api.html#filesystemloader
        .pipe(nunjucks.compile(data, {
            env: new Environment(
                new FileSystemLoader(searchPaths, options)
            )
        }))
        .pipe(rename((path) => path.extname = '.html'))
        .pipe(gulp.dest(dist.base))
        .pipe(browserSync.stream({ once: true }));
});
