const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssClean = require('gulp-clean-css');
const imageMin = require('gulp-imagemin');

gulp.task('copyHtml', ()=> {
    gulp.src('./src/index.html')
        .pipe(gulp.dest('./dist/'))
})

gulp.task('imagemin', () => {
    gulp.src('./src/img/*')
        .pipe(imageMin())
        .pipe(gulp.dest('./dist/img'))
})

gulp.task('sass', () => {
    gulp.src('./src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssClean({compatibility: 'ie8'}))
        .pipe(gulp.dest('./dist/css/'))
})

gulp.task('watch', () => {
    gulp.watch('./src/index.html', ['copyHtml']);
    gulp.watch('./src/sass/*.scss', ['sass']);
})

gulp.task('default', ['copyHtml', 'sass','imagemin', 'watch'])