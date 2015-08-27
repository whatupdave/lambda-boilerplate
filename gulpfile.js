var babel = require("gulp-babel")
var del = require('del')
var gulp = require("gulp")
var install = require('gulp-install')
var lambda = require('gulp-awslambda')
var mocha = require('gulp-mocha')
var rename = require('gulp-rename')
var runSequence = require('run-sequence')
var watch = require('gulp-watch')
var zip = require('gulp-zip')

require('babel/register')
runSequence.use(gulp)

gulp.task('default', function() {
  gulp.watch(
    ['src/**/*.js', 'test/*.js'],
    ['test']
  )
})

gulp.task('env', function() {
  gulp.src('./.env.deploy')
    .pipe(rename('.env'))
    .pipe(gulp.dest('./dist'))
});

gulp.task('test', function() {
  return gulp.src(['test/*.js'])
    .pipe(mocha())
})

gulp.task('clean', function(cb) {
  del(['./dist', './dist.zip'], cb)
})

gulp.task("compile", function () {
  return gulp.src("src/**/*.js")
    .pipe(babel({ optional: ["runtime"] }))
    .pipe(gulp.dest("dist"))
})

gulp.task('node-mods', function() {
  return gulp.src('./package.json')
    .pipe(gulp.dest('dist/'))
    .pipe(install({production: true}))
})

gulp.task('zip', function() {
  return gulp.src(['dist/**/*', 'dist/.env'])
    .pipe(zip('dist.zip'))
    .pipe(gulp.dest('./'))
})

gulp.task('lambda-zip', function(callback) {
  return runSequence(
    ['clean'],
    ['compile', 'node-mods', 'env'],
    ['zip'],
    callback
  )
})

gulp.task('upload', function(callback) {
  return gulp.src('./dist.zip')
    .pipe(lambda(require('./lambda-config.js'), {}))
})

gulp.task('deploy', function(callback) {
  return runSequence(
    ['lambda-zip'],
    ['upload'],
    callback
  )
})
