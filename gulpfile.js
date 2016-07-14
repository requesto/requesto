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

    new WebpackDevServer(webpack(webpackConfig.DEV), {
        publicPath: webpackConfig.DEV.output.publicPath,
        hot: true,
        historyApiFallback: true,
        stats: {
            colors: true
        }
    }).listen(3000, 'localhost', function(err, result) {
        if (err) {
            return console.log(err);
        }
        console.log('Listening at http://localhost:3000/');
    });

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
});


//-------------------------------------------------------------------
// DEFAULT
//-------------------------------------------------------------------

gulp.task("default", function(cb) {
    runSequence("clean","copy","styles","scripts:dev","watch", cb);
});


gulp.task("watch", function() {
    electron.start();
    gulp.watch(PATH.app + "/" + PATH.styles + "/**/*.scss", ["styles", electron.reload]);
    gulp.watch(["app/index.html",PATH.app + "/" + PATH.images + "/**/*"], ["copy", electron.reload]);
    gulp.watch(['main.js'], electron.reload);
});
