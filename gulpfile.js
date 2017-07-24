// Gulp
var gulp = require('gulp');

// Sass & CSS stuff
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');

// JavaScript
var uglify = require('gulp-uglify');

// Compile all your Sass
gulp.task('sass', function () {
	gulp.src(['./*.scss'])
		.pipe(sass({
			includePaths: ['./'],
			outputStyle: 'expanded'
		}))
		.pipe(prefix("> 1%", "ie 9"))
		.pipe(minifycss())
		.pipe(gulp.dest('./css'));
});

// Uglify JS
gulp.task('uglify', function() {
	gulp.src(['./*.js', '!./gulpfile.js'])
		.pipe(uglify())
		.pipe(gulp.dest('./js'));
});

gulp.task('default', function() {
	// Watch me getting Sassy
	gulp.watch("./*.scss", function(event) {
		gulp.run('sass');
	});
	// Make my JavaScript ugly
	gulp.watch("./*.js", function(event) {
		gulp.run('uglify');
	});
});
