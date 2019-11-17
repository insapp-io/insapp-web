const {src, dest, series, parallel, watch} = require('gulp')
const notify        = require('gulp-notify')
const source        = require('vinyl-source-stream')
const browserify    = require('browserify')
const babelify      = require('babelify')
const ngAnnotate    = require('browserify-ngannotate')
const browserSync   = require('browser-sync').create()
const rename        = require('gulp-rename')
const templateCache = require('gulp-angular-templatecache')
const uglify        = require('gulp-uglify')
const merge         = require('merge-stream')

// Where our files are located
const jsFiles   = "src/js/**/*.js"
const viewFiles = "src/js/**/*.html"

const interceptErrors = function(error) {
    const args = Array.prototype.slice.call(arguments)

    // Send error to notification center with gulp-notify
    notify.onError({
        title: 'Compile Error',
        message: '<%= error.message %>'
    }).apply(this, args)

    // Keep gulp from hanging on this task
    this.emit('end')
}

function views() {
    return src(viewFiles)
        .pipe(templateCache({
            standalone: true
        }))
        .on('error', interceptErrors)
        .pipe(rename("app.templates.js"))
        .pipe(dest('./src/js/config/'))
}

function pack() {
    series(views, function() {
        return browserify('./src/js/app.js')
            .transform(babelify, {presets: ["es2015"]})
            .transform(ngAnnotate)
            .bundle()
            .on('error', interceptErrors)
            //Pass desired output filename to vinyl-source-stream
            .pipe(source('main.js'))
            // Start piping stream to tasks!
            .pipe(dest('./build/'))
    })
}

function html() {
    return src("src/index.html")
        .on('error', interceptErrors)
        .pipe(dest('./build/'))
}

/*
* Build production ready minified JS/CSS files into dist/ folder.
*/
function build() {
    series(html, pack, function() {
        const html = src("build/index.html")
            .pipe(dest('./dist/'));

        const js = gulp.src("build/main.js")
            .pipe(uglify())
            .pipe(dest('./dist/'))

        return merge(html, js)
    })
}

function liveReload() {
    browserSync.init(['./build/**/**.**'], {
        server: "./build",
        port: 4000,
        notify: false,
        ui: {
            port: 4001
        }
    })

    watch("src/index.html", html)
    watch(viewFiles, views)
    watch(jsFiles, pack)
}

module.exports = {
    build,
    default: parallel(html, pack, liveReload)
}