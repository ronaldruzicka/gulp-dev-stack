module.exports = {
    port: 1100,
    paths: {
        gulpfile: './gulpfile.babel.js',
        src: {
            base: './src',
            app: {
                base: './app',
                entry: './src/app/app.js',
                all: './src/app/**/*.js',
                dest: './src/js'
            },
            html: './src/*.html',
            icon: {
                entry: './src/gfx/svg/*.svg',
                dest: './src/gfx/icon'
            },
            styles: {
                base: './src/styles',
                entry: './src/styles/main.scss',
                all: './src/styles/**/*.scss',
                dest: './src/css'
            },
            tpl: {
                base: './src/tpl',
                entry: './src/tpl/*.nunj',
                all: './src/tpl/**/*.nunj'
            },
            favicon: './src/favicon/'
        },
        dist: {
            base: './dist',
            css: './dist/css',
            js: './dist/js',
            html: './dist/*.html',
            icon: './dist/gfx/icon',
            favicon: './dist/favicon'
        },
        styleguide: {
            base: './styleguide',
            source: './src/styles/components',
            destination: './styleguide/styleguide',
            template: './node_modules/styleguide/dist',
            css: './css/style.css',
            copyCss: true,
            js: []
        }
    },
    names: {
        css: {
            src: 'style.css',
            min: 'style.min.css'
        },
        js: {
            src: 'app.js',
            min: 'app.min.js'
        }
    }
};
