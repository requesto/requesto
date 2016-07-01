//-------------------------------------------------------------------
// PLUGINS
//-------------------------------------------------------------------

// plugins
var gulp = require("gulp"),
    plugins = require("gulp-load-plugins")(),
    del = require("del"),
    runSequence = require("run-sequence"),
    electron = require('electron-connect').server.create();

//-------------------------------------------------------------------
// SETUP
//-------------------------------------------------------------------

// environments
var app = "app";
var dev = ".tmp";
var prod = "dist";

//folders
var styles = "assets/styles";
var scripts = "assets/scripts";
var images = "assets/images";


var AUTOPREFIXER_BROWSERS = [
    "chrome >= 34",
];

//-------------------------------------------------------------------
// TASKS
//-------------------------------------------------------------------

gulp.task("styles", function() {
    return gulp.src(app + "/" + styles + "/**/*.scss")
        .pipe(plugins.plumber())
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass({
            includePaths: ["./node_modules/frontendler-sass"]
        }).on("error", plugins.sass.logError))
        .pipe(plugins.autoprefixer(AUTOPREFIXER_BROWSERS))
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest(app + "/" + styles))
});


//-------------------------------------------------------------------
// WATCH
//-------------------------------------------------------------------


gulp.task('start', function() {
    electron.start();
    gulp.watch(app + "/" + styles + "/**/*.scss",["styles",electron.restart]);
    gulp.watch(app + "/" + "/**/*.js", electron.restart);
    gulp.watch(['index.js', 'index.html'], electron.reload);
});
