const argv = require('yargs').argv;
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync');
const config = require('../config');
const cssGlobbing = require('gulp-css-globbing');
const cssnano = require('cssnano');
const flexbugsFixes = require('postcss-flexbugs-fixes');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const mqpacker = require('css-mqpacker');
const postcss = require('gulp-postcss');
const pxtorem = require('postcss-pxtorem');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

// const { src, dist } = config.paths;
const dist = config.paths.dist;
const src = config.paths.src;

const isProd = argv.prod || false;

gulp.task('styles', () => {
    const postCssPlugins = [
        flexbugsFixes,
        autoprefixer({ browsers: ['last 2 versions'] }),
        pxtorem({
            prop_white_list: ['width', 'height', 'font', 'font-size', 'letter-spacing']
        }),
        mqpacker()
    ];
    const postCssDistPlugins = [
        cssnano({
            'reduceIdents': false
        })
    ];

    gulp.src(src.styles.entry)
        .pipe(cssGlobbing({ extensions: ['.css', '.scss'] }))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(postCssPlugins))
        .pipe(gulpif(!isProd, sourcemaps.write()))
        .pipe(gulp.dest(dist.css))
        .pipe(gulpif(!isProd, browserSync.stream()))
        .pipe(gulpif(isProd, postcss(postCssDistPlugins)))
        .pipe(gulpif(isProd, rename((path) => path.basename += '.min')))
        .pipe(gulpif(isProd, gulp.dest(dist.css)));
});
