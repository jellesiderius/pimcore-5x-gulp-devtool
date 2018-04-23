var gulp = require('gulp');
var sass = require('gulp-sass');
var bs = require('browser-sync').create();
var fs = require('fs-extra');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');

var path = fs.realpathSync('../');
var folder = path.split("/").pop(-1);

gulp.task('browser-sync', ['sass'], function() {
    bs.init({
        proxy: folder + '.local',
        notify: true
    });
});

gulp.task('sass', function () {
    return gulp.src('../web/skin/sass/**/*.scss')
        .pipe(sass())
        .on('error', swallowError)
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS())
        .pipe(gulp.dest('../web/skin/static/css/'))
        .pipe(bs.reload({stream: true}));
});

gulp.task('watch', ['browser-sync'], function () {
    gulp.watch("../web/skin/**/*.scss", ['sass']);
    gulp.watch("../src/AppBundle/**/*.php").on('change', bs.reload);
    gulp.watch("../app/Resources/**/*.html.php").on('change', bs.reload);
});

function swallowError (error) {

    // If you want details of the error in the console
    console.log(error.toString())

    this.emit('end')
}
