const browserSync = require('browser-sync');
const config = require('../config');
const gulp = require('gulp');
const kss = require('kss');
const path = require('path');

// const { dist, styleguide } = config;
const dist = config.paths.dist;
const styleguide = config.paths.styleguide;

const styleguideOptions = {
    source: [
        styleguide.source
    ],
    destination: styleguide.destination,
    template: styleguide.template,

    // The css and js paths are URLs, like '/misc/jquery.js'.
    // The following paths are relative to the generated style guide.
    css: [
        path.relative(styleguide.destination, styleguide.css)
    ],
    js: []
};

// kss-node 2.3.1 and later.
gulp.task('styleguide', () => {
    kss(styleguideOptions, () => {
        browserSync.reload();
    });
});
// TODO: make it work in production build
