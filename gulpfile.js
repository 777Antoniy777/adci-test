"use strict";
var gulp = require("gulp");
var posthtml = require("gulp-posthtml");
var fileinclude = require('gulp-file-include');
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var cssmin = require("gulp-csso");
var rename = require("gulp-rename");
var image = require("gulp-image");
var objectfit = require(`postcss-object-fit-images`);
var webpack = require('webpack-stream');
var svgsprite = require('gulp-svg-sprite');
var sourcemaps = require(`gulp-sourcemaps`);
var del = require("del");
var server = require("browser-sync").create();

// css
gulp.task("css", function () {
  return gulp.src("src/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer(),
      objectfit()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(cssmin())
    .pipe(rename("style.min.css"))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

// js
gulp.task("js", function () {
  return gulp.src("src/js/**/*.js")
    .pipe(webpack())
    .pipe(rename("all.js"))
    .pipe(gulp.dest("build/js"))
    .pipe(server.stream());
});

// img (jpg, png, svg)
gulp.task("images", function() {
  return gulp.src([
    "src/img/**/*.{png,jpg,svg}", 
    "!src/img/icons-sprite/*.svg"])
    .pipe(image({
      pngquant: true,
      optipng: false,
      zopflipng: false,
      jpegRecompress: false,
      mozjpeg: {
        progressive: true,
        optimize: true,
        quality: 95
      },
      guetzli: false,
      gifsicle: false,
      svgo: true,
      concurrent: 10,
      quiet: true
    }))
    .pipe(gulp.dest("build/img/"));
});

// svg sprite
gulp.task('sprite', function () {
  return gulp.src('src/img/icons-sprite/*.svg')
		.pipe(svgsprite({
      mode: {
        stack: {
          sprite: "../sprite.svg"
        }
			}
		}))
		.pipe(gulp.dest('build/img/sprite/'));
});

// html
gulp.task("html", function() {
  return gulp.src(["src/pages/*.html"])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: 'src/pages/'
    }))
    .pipe(posthtml())
    .pipe(gulp.dest("build"));
});

gulp.task("server", function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  // watchers
  gulp.watch("src/img/**/*.{png,jpg,svg}", {
    ignored: "src/img/icons-sprite/*.svg"
  }, gulp.series("images")).on("change", server.reload);
  gulp.watch("src/img/icons-sprite/*.svg", gulp.series("sprite", "reload"));
  gulp.watch("src/sass/**/*.{scss,sass}", gulp.series("css"));
  gulp.watch("src/js/*/**.js", gulp.series("js"));
  gulp.watch("src/**/*.html", gulp.series("html", "reload"));
});

gulp.task("reload", function(done) {
  server.reload();
  done();
});

gulp.task("copy", function() {
  return gulp.src([
    "src/fonts/**/*.{woff,woff2}"
  ], {
    base: "src"
  })
  .pipe(gulp.dest("build"));
});

gulp.task("clean", function() {
  return del("build");
});

gulp.task("build", gulp.series(
  "clean",
  "js",
  "sprite",
  "images",
  "css",
  "copy",
  "html"
));

gulp.task("start", gulp.series(
  "build",
  "server"
));
