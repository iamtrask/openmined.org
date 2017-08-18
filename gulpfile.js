// Gulp
var gulp = require('gulp');

// Filesystem
var fs = require('fs')

// Sass & CSS stuff
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');

// JavaScript
var uglify = require('gulp-uglify');

// HTML
var htmlmin = require('gulp-htmlmin');

// Cleaner
var clean = require('gulp-clean');

// Compile all your Sass
gulp.task('sass', function () {
	return gulp.src(['./*.scss'])
		.pipe(sass({
			includePaths: ['./'],
			outputStyle: 'expanded'
		}))
		.pipe(prefix("> 1%", "ie 9"))
		.pipe(gulp.dest('.'));
});

// Uglify JS
gulp.task('uglify', function() {
	return gulp.src(['./*.js', '!./gulpfile.js'])
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
});

// HTML Minification
gulp.task('htmlMinify', function() {
  return gulp.src('./*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'));
});

// Upload to S3
gulp.task('upload', function() {
	var s3 = require('gulp-s3-upload')(JSON.parse(fs.readFileSync('awsaccess.json')));

	return gulp.src('./dist/**')
		.pipe(s3({
			Bucket: 'openmined.org',
			ACL: 'public-read'
		}, { maxRetries: 5 }));
});

// Clear out dist
gulp.task('clean', function () {
  return gulp.src('dist', { read: false }).pipe(clean());
});

// Copy CSS
gulp.task('copy-sass', function() {
	return gulp.src(['./*.css'])
		.pipe(minifycss())
		.pipe(gulp.dest('dist'));
});

// Copy images
gulp.task('copy-images', function() {
	return gulp.src(['images/*']).pipe(gulp.dest('dist/images'));
})

gulp.task('default', function() {
	// Watch me getting Sassy
	gulp.watch("./*.scss", function(event) {
		gulp.run('sass');
	});
});

gulp.task('deploy', ['clean', 'sass', 'copy-sass', 'uglify', 'htmlMinify', 'copy-images'], function() {
	gulp.run('upload');
})
