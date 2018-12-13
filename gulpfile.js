var gulp = require('gulp');
var sass = require('gulp-sass');
var bs = require('browser-sync').create();
var cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
var htmlreplace = require('gulp-html-replace');

gulp.task('browser-sync', ['sass'], function() {
    bs.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('sass', function () {
    return gulp.src('scss/*.scss')
                .pipe(sass().on('error', sass.logError))
                .pipe(cleanCSS({compatibility: 'ie8'}))
                .pipe(gulp.dest('dist/css'))
                .pipe(bs.reload({stream: true}));
});

gulp.task('minify', () => {
    return gulp.src('./*.html')
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', ['browser-sync'], function () {
    gulp.watch("scss/*.scss", ['sass']);
    gulp.watch("*.html").on('change', bs.reload);
});