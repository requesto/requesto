//-------------------------------------------------------------------
// PLUGINS
//-------------------------------------------------------------------

var gulp = require("gulp"),
    plugins = require("gulp-load-plugins")(),
    del = require("del"),
    runSequence = require("run-sequence"),
    electron = require('electron-connect').server.create(),
    webpack = require('webpack'),
    webpackStream = require('webpack-stream'),
    webpackConfig = require('./webpack.config'),
    WebpackDevServer = require('webpack-dev-server');

//-------------------------------------------------------------------
// SETUP
//-------------------------------------------------------------------

var PATH = {
    app: "app",
    dist: "dist",
    test: "test",
    styles: "assets/styles",
    scripts: "assets/scripts",
    images: "assets/images",
    fonts: "assets/fonts"
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
        .pipe(webpackStream(webpackConfig.DEV))
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
        gulp.src(PATH.app + "/" + PATH.fonts + "/**/*.*")
            .pipe(gulp.dest(PATH.dist + "/" + PATH.fonts));
});

gulp.task("watch", function() {
    electron.start();
    gulp.watch(PATH.app + "/" + PATH.styles + "/**/*.scss", ["styles", electron.reload]);
    gulp.watch(PATH.app + "/" + PATH.scripts + "/**/*.js", ["scripts:dev",electron.reload]);
    gulp.watch(PATH.app + "/" + PATH.images + "/**/*", ["copy",electron.reload]);
    gulp.watch("app/index.html",["copy", electron.reload]);
});


//-------------------------------------------------------------------
// DEFAULT
//-------------------------------------------------------------------

gulp.task("default", function(cb) {
    runSequence("clean", "copy", "styles", "scripts:dev", "watch", cb);
});
