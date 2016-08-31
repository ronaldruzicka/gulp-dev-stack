import { argv } from 'yargs';
import config from '../config';
import del from 'del';
import gulp from 'gulp';

const {
    src: { styles, app, icon, html },
    dist
} = config.paths;
const isProd = argv.prod || false;

gulp.task('clean', () => del(isProd ? dist.base : [styles.dest, app.dest, icon.dest, html]));
