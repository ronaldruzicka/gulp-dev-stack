const argv = require('yargs').argv;
const config = require('../config');
const gulp = require('gulp');
const path = require('path');
const svgmin = require('gulp-svgmin');
const svgstore = require('gulp-svgstore');

const dist = config.paths.dist;
const src = config.paths.src;

const isProd = argv.prod || false;

gulp.task('icon', () => {
    return gulp.src(src.icon.entry)
        .pipe(svgmin((file) => {
            const prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            };
        }))
        .pipe(svgstore({
            inlineSvg: true
        }))
        .pipe(gulp.dest(isProd ? dist.icon : src.icon.dest));
        // TODO run 'tpl' task and 'browserSync' after icon task
        // to include svg.svg file into all templates
});
