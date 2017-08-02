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

// Compile all your Sass
gulp.task('sass', function () {
	gulp.src(['./*.scss'])
		.pipe(sass({
			includePaths: ['./'],
			outputStyle: 'expanded'
		}))
		.pipe(prefix("> 1%", "ie 9"))
		.pipe(gulp.dest('.'));
});

// Uglify JS
gulp.task('uglify', function() {
	gulp.src(['./*.js', '!./gulpfile.js'])
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
});

// HTML Minification
gulp.task('htmlMinify', function() {
  gulp.src('./*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'));
});

// Upload to S3
gulp.task('upload', function() {
	var s3 = require('gulp-s3-upload')(JSON.parse(fs.readFileSync('awsaccess.json')));
	
	gulp.src('./dist/**')
		.pipe(s3({
			Bucket: 'openmined.org',
			ACL: 'public-read'
		}, { maxRetries: 5 }));
});

gulp.task('default', function() {
	// Watch me getting Sassy
	gulp.watch("./*.scss", function(event) {
		gulp.run('sass');
	});
});

gulp.task('deploy', function() {
	// Run SASS compilation
	gulp.run('sass');

	// Copy all CSS files
	gulp.src(['./*.css'])
		.pipe(minifycss())
		.pipe(gulp.dest('dist'));

	// Uglify JS and HTML
	gulp.run('uglify');
	gulp.run('htmlMinify');

	// Copy images
	gulp.src(['images/*']).pipe(gulp.dest('dist/images'));

	gulp.run('upload');
})
