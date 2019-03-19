const gulp = require("gulp");
const gulpIf = require("gulp-if");
const less = require("gulp-less");
const concat = require("gulp-concat");
const sourcemaps = require("gulp-sourcemaps");
const cleanCss = require("gulp-clean-css");
const minify = require("gulp-minify")
const autoprefixer = require("gulp-autoprefixer");

const isDev = process.env.NODE_ENV !== 'prod';

gulp.task('less', () => {
   return gulp.src(['src/less/index.less', 'src/less/style.less'])
       .pipe(gulpIf(isDev, sourcemaps.init()))
       .pipe(less())
       .pipe(concat('styles.css'))
       .pipe(cleanCss())
       .pipe(autoprefixer('last 2 versions'))
       .pipe(gulpIf(isDev, sourcemaps.write()))
       .pipe(gulp.dest('public/css'));
});

gulp.task('js', () => {
    return gulp.src(['src/js/index.js', 'src/js/scripts.js'])
        .pipe(gulpIf(isDev, sourcemaps.init()))
        .pipe(concat('scripts.js'))
        .pipe(minify())
        .pipe(gulpIf(isDev, sourcemaps.write()))
        .pipe(gulp.dest('public/js'));
});

gulp.task('watch:less', () => {
    return gulp.watch(['src/less/index.less', 'src/less/style.less'], ['less']);
})

gulp.task('default', ['less', 'js', 'watch:less']);