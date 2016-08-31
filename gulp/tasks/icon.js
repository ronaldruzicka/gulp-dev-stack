import { argv } from 'yargs';
import config from '../config';
import gulp from 'gulp';
import path from 'path';
import svgmin from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';

const { src, dist } = config.paths;
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
