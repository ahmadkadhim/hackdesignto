var gulp            = require('gulp'),
    changed         = require('gulp-changed'),
    uglify          = require('gulp-uglify'),
    sass            = require('gulp-sass'),
    bower           = require('gulp-bower'),
    sourcemaps      = require('gulp-sourcemaps'),
    concatCss       = require('gulp-concat-css'),
    neat            = require('node-neat').includePaths,
    filter          = require('gulp-filter'),
    autoprefixer    = require('gulp-autoprefixer'),
    minifycss       = require('gulp-minify-css'),
    rename          = require('gulp-rename');

var config = {
  jsSrc: 'assets/js/**/*.js',
  jsDest: 'public/js',
  sassDir: 'assets/scss',
  sassSrc: 'assets/scss/style.scss',
  cssDest: 'public/stylesheets/css/',
  bower: './bower_components',
};

var noPartials = function (file) {
    var isWin = /^win/.test(process.platform);
    if (isWin) {
        return !/\\_/.test(file.path);
    }
    return !/\/_/.test(file.path);
};


gulp.task('bower', function() { 
    return bower()
         .pipe(gulp.dest(config.bower)) 
});

gulp.task('sass', function () {
    return gulp.src(config.sassSrc)
      .pipe(filter(noPartials))
      .pipe(sourcemaps.init())

      .pipe(sass({
        includePaths: require('node-neat').includePaths
      })
      // .on('error', sass.logError)
      )
      .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))        
      .pipe(sourcemaps.write())
      // .pipe(concatCss(config.cssDest))
      .pipe(gulp.dest(config.cssDest))
      .pipe(rename({suffix: '.min'}))
      .pipe(minifycss())
    ;
});


gulp.task('watch', function() {
     gulp.watch(config.sassDir + '/**/*.scss', ['sass']); 
});

  gulp.task('default', ['bower', 'sass', 'watch'], function() {
    return gulp.src(config.jsSrc)
        // the `changed` task needs to know the destination directory
        // upfront to be able to figure out which files changed
        .pipe(changed(config.jsDest))
        // only files that has changed will pass through here
        .pipe(uglify())
        .pipe(gulp.dest(config.jsDest));
});