//-------------------------------------------------------------------
// PLUGINS
//-------------------------------------------------------------------

var gulp = require("gulp"),
    plugins = require("gulp-load-plugins")(),
    del = require("del"),
    runSequence = require("run-sequence"),
    electron = require('electron-connect').server.create(),
    webpackStream = require('webpack-stream'),
    webpackConfig = require('./webpack.config');

//-------------------------------------------------------------------
// SETUP
//-------------------------------------------------------------------

var PATH = {
  app: "app",
  test: "test",
  styles: "assets/styles",
  scripts: "assets/scripts",
  images: "assets/images"
}

var AUTOPREFIXER_BROWSERS = ["chrome >= 34"];

//-------------------------------------------------------------------
// TASKS
//-------------------------------------------------------------------

gulp.task("styles", function() {
    return gulp.src(PATH.app + "/" + PATH.styles + "/**/*.scss")
        .pipe(plugins.plumber())
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass({
            includePaths: ["./node_modules/frontendler-sass"]
        }).on("error", plugins.sass.logError))
        .pipe(plugins.autoprefixer(AUTOPREFIXER_BROWSERS))
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest(PATH.app + "/" + PATH.styles))
});

gulp.task("scripts:dev", function() {
    return gulp.src(PATH.app + "/" + PATH.scripts + "/main.js")
        .pipe(plugins.plumber())
        .pipe(webpackStream(webpackConfig.DEV))
        .pipe(gulp.dest(PATH.app + "/" + PATH.scripts))
});

gulp.task("scripts:build", function() {
    return gulp.src(PATH.app + "/" + PATH.scripts + "/main.js")
        .pipe(plugins.plumber())
        .pipe(webpackStream(webpackConfig.PROD))
        .pipe(gulp.dest(dev + PATH.scripts))
});


//-------------------------------------------------------------------
// DEFAULT
//-------------------------------------------------------------------


gulp.task('default', function() {
    electron.start();
    gulp.watch(PATH.app + "/" + PATH.styles + "/**/*.scss",["styles",electron.restart]);
    gulp.watch(PATH.app + "/" + PATH.scripts + "/**/*.js", ["scripts:dev"]);
    gulp.watch(['index.js', 'index.html'], electron.restart);
});
