import { argv } from 'yargs';
import config from '../config';
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import gulpif from 'gulp-if';

const { gulpfile, src } = config.paths;
const isProd = argv.prod || false;

const lint = (globs) => {
    const opts = !isProd ? {
        'rules': {
            'no-empty': 0,
            'space-in-parens': 0,
            'no-unused-vars': 0,
            'no-multiple-empty-lines': 0
        }
    } : {};
    return gulp.src(globs)
        .pipe(eslint(opts))
        .pipe(eslint.format())
        .pipe(gulpif(isProd, eslint.failOnError()));
};
gulp.task('lint:app', () => lint(src.app.all));
gulp.task('lint:gulpfile', () => lint(gulpfile));
gulp.task('lint', ['lint:gulpfile', 'lint:app']);
