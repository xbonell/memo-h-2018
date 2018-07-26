var _if          = require('gulp-if');
var autoprefixer = require('autoprefixer');
var flexbugsfix  = require('postcss-flexbugs-fixes');
var gulp         = require('gulp');
var postcss      = require('gulp-postcss');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var mqpacker     = require('css-mqpacker');
var yargs        = require('yargs');

var PRODUCTION = !!(yargs.argv.production);
var sassFiles = './src/scss/**/*.scss';

gulp.task('sass', function () {
  return gulp.src(sassFiles)
    .pipe(_if(!PRODUCTION, sourcemaps.init()))
    .pipe(sass({ outputStyle: _if(!PRODUCTION, 'nested', 'compressed') }).on('error', sass.logError))
    .pipe(postcss([
      autoprefixer({ browsers: ['last 2 versions', '> 5%'] }),
      flexbugsfix(),
      mqpacker({ sort: true })
    ]))
    .pipe(_if(!PRODUCTION, sourcemaps.write()))
    .pipe(gulp.dest('./dist/css/'));
});

gulp.task('watch', function () {
  gulp.watch(sassFiles, ['sass']);
});

gulp.task('default', ['sass','watch']);