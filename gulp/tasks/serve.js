const argv = require('yargs').argv;
const browserSync = require('browser-sync');
const config = require('../config');
const copyToClipboard = require('copy-paste').copy;
const gulp = require('gulp');
const gutil = require('gulp-util');

const dist = config.paths.dist;
const gulpfile = config.paths.gulpfile;
const port = config.port;
const src = config.paths.src;

// For production (minified files) run "gulp --prod"
const isProd = argv.prod || false;

gulp.task('serve', ['prepare'], () => {
    browserSync({
        open: false,
        port,
        server: isProd ? dist.base : src.base
    }, () => copyToClipboard(`localhost:${port}`, () => gutil.log(gutil.colors.green('Local server address has been copied to your clipboard'))));

    const sanitize = (pathname) => pathname.replace(/^\.\//, '');
    const watch = (pathname, tasks) => gulp.watch(sanitize(pathname), tasks);

    if (!isProd) {
        watch(src.app.all, ['lint']);
        watch(src.styles.all, ['styles']);
        watch(src.tpl.all, ['tpl']);
        watch(gulpfile, ['lint:gulpfile']);
    }
});
