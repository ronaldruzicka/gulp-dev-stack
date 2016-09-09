const argv = require('yargs').argv;
const browserSync = require('browser-sync');
const config = require('../config');
const copyToClipboard = require('copy-paste').copy;
const gulp = require('gulp');
const gutil = require('gulp-util');
const runSequence = require('run-sequence');

const dist = config.paths.dist;
const gulpfile = config.paths.gulpfile;
const port = config.port;
const src = config.paths.src;
const styleguide = config.paths.styleguide;

// For production (minified files) run "gulp --prod"
const isProd = argv.prod || false;

gulp.task('serve', ['prepare'], () => {
    console.log(isProd);
    const baseDir = isProd ? dist.base : [src.base, styleguide.base];

    browserSync({
        open: false,
        port,
        server: { baseDir }
    }, () => copyToClipboard(`localhost:${port}`, () => gutil.log(gutil.colors.green('Local server address has been copied to your clipboard'))));

    const sanitize = (pathname) => pathname.replace(/^\.\//, '');
    const watch = (pathname, tasks) => gulp.watch(sanitize(pathname), tasks);

    if (!isProd) {
        watch(src.app.all, ['lint']);
        watch(src.styles.all, () => runSequence(['styles', 'styleguide']));
        watch(src.tpl.all, ['tpl']);
        watch(gulpfile, ['lint:gulpfile']);
    }
});
