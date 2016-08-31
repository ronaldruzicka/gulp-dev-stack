import { argv } from 'yargs';
import autoprefixer from 'autoprefixer';
import browserSync from 'browser-sync';
import config from '../config';
import cssGlobbing from 'gulp-css-globbing';
import cssnano from 'cssnano';
import flexbugsFixes from 'postcss-flexbugs-fixes';
import gulp from 'gulp';
import gulpif from 'gulp-if';
import mqpacker from 'css-mqpacker';
import postcss from 'gulp-postcss';
import pxtorem from 'postcss-pxtorem';
import rename from 'gulp-rename';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';

const { src, dist, names } = config.paths;
const isProd = argv.prod || false;

gulp.task('styles', () => {
    let postCssPlugins = [
        flexbugsFixes,
        autoprefixer({ browsers: ['last 2 versions'] }),
        pxtorem({
            prop_white_list: ['width', 'height', 'font', 'font-size', 'letter-spacing']
        }),
        mqpacker()
    ];
    let postCssProd = [
        cssnano({
            'reduceIdents': false
        })
    ];

    gulp.src(src.styles.entry)
        .pipe(cssGlobbing({ extensions: ['.css', '.scss'] }))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(postCssPlugins))
        .pipe(rename(names.css.src))
        .pipe(gulpif(!isProd, sourcemaps.write()))
        .pipe(gulpif(!isProd, gulp.dest(src.styles.dest)))
        .pipe(gulpif(!isProd, browserSync.stream()))
        .pipe(gulpif(isProd, postcss(postCssProd)))
        .pipe(gulpif(isProd, rename(names.css.min)))
        .pipe(gulpif(isProd, gulp.dest(dist.css)));
});
