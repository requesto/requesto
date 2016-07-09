//-------------------------------------------------------------------
// PLUGINS
//-------------------------------------------------------------------

var gulp = require("gulp"),
    plugins = require("gulp-load-plugins")(),
    del = require("del"),
    runSequence = require("run-sequence"),
    electron = require('electron-connect').server.create(),
    webpack = require('webpack-stream'),
    webpackConfig = require('./webpack.config');

//-------------------------------------------------------------------
// SETUP
//-------------------------------------------------------------------

var PATH = {
  app: "app",
  dist: "dist",
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
        .pipe(gulp.dest(PATH.dist + "/" + PATH.styles))
});

gulp.task("scripts:dev", function() {
    return gulp.src(PATH.app + "/" + PATH.scripts + "/main.js")
        .pipe(plugins.plumber())
        .pipe(webpack(webpackConfig.DEV))
        .pipe(gulp.dest(PATH.dist + "/" + PATH.scripts))
});

gulp.task("scripts:build", function() {
    return gulp.src(PATH.app + "/" + PATH.scripts + "/main.js")
        .pipe(plugins.plumber())
        .pipe(webpack(webpackConfig.PROD))
        .pipe(gulp.dest(PATH.dist + "/" + PATH.scripts))
});

gulp.task("clean", del.bind(null, [PATH.dist]));

gulp.task("copy", function() {
        gulp.src(PATH.app + "/**/*.html")
            .pipe(gulp.dest(PATH.dist));
        gulp.src(PATH.app + "/" + PATH.images + "/**/*.*")
            .pipe(gulp.dest(PATH.dist + "/" + PATH.images));
});


//-------------------------------------------------------------------
// DEFAULT
//-------------------------------------------------------------------

gulp.task("default",function (cb){
    runSequence("clean","copy",["styles","scripts:dev"],"watch", cb);
});


gulp.task("watch", function() {
    electron.start();
    gulp.watch(PATH.app + "/" + PATH.styles + "/**/*.scss",["styles",electron.restart]);
    gulp.watch(['main.js','app/index.html'], electron.restart);
});
