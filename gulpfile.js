var gulp = require('gulp');
var sync = require('browser-sync').create();
var sass = require('gulp-sass');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {
    sync.init({
        server: "./"
    });
    gulp.watch("scss/**/*.scss", ['sass']);
    gulp.watch(["js/**/*.js", "*.html"]).on('change', sync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("scss/**/*.scss")
        .pipe(sass())
        .on('error', console.error.bind(console))
        .pipe(gulp.dest("css"))
        .pipe(sync.stream());
});

gulp.task('default', ['serve']);
