// node and gulp plugin section
var config = require('./gulp.config.js')();
var gulp = require('gulp');
var less = require('gulp-less');
var expect = require('gulp-expect-file');
var printfileinfo = require('gulp-print');
var args = require('yargs').argv;
var gulpif = require('gulp-if');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var debug = require('gulp-debug');
var uncss = require('gulp-uncss');

var browserSync = require('browser-sync');

// local variable defination section
var projectrootdir = config.projectrootdir;
// var projectrootabsdir = '/home/vagrant/Code/kidsit/';
// lazy load gulp plugins
var $ = require('gulp-load-plugins')({lazy: true});
/**
 * List the available gulp tasks
 */
var jsbuildpath = config.jsbuildpath;


gulp.task('help', $.taskListing);
gulp.task('default', ['help']);
gulp.task('less',function(){
    var pagelessentry = config.pagelessentry;
    log(pagelessentry);
   return gulp
       .src(pagelessentry)
       .pipe(plumber({
            errorhandler: errorhandler
       }))
       // .pipe(expect({ checkRealFile: true },pagelessentry))
       // .pipe(printfileinfo())
       // .pipe(cache('lesscached'))
       // .pipe(progeny({
       //      regexp: /^\s*@import\s*(?:\(\w+\)\s*)?['"]([^'"]+)['"]/
       // }))
       // .pipe(filter(['**/*.less', '!bootstrap/**/*.less']))
       .pipe(debug({
            title: 'LESS'
       }))
       .pipe(sourcemaps.init())
       .pipe(less(
       // {
       //      // plugins: [cleanCss]
       //      // sourceMap: {
       //      //     sourceMapFileInline: true
       //      // }
       // }
       ))
       .pipe(gulpif(args.uncss, uncss({
            html: ['index.html', 'http://homestead.app'],
            ignore: [/header-/,/zoom/,/fade/]
        })))
       // .pipe(remember('lesscached'))
       // .pipe(rename('bootstrap.css'))
       // .on('error',errorhandler)
       .pipe(sourcemaps.write('./')) //projectrootdir+'public/preparebuild/assets/css/'
       .pipe(gulp.dest(projectrootdir));
});
function startBrowserSyncDev () {
    if(browserSync.active){
        return;
    }
    log('starting browser-sync ... for directory: '+projectrootdir);
    var options={
        // proxy: 'homestead.app',
         server: {
            baseDir: projectrootdir,
            directory: true
        },
        files: [projectrootdir+'*.css'], //projectrootdir+'public
        ghostMode: {
            clicks: true,
            location: false,
            forms: true,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'debug',
        logPrefix: 'kidist-browser-sync',
        notify: true,
        reloadDelay: 0
    };
    browserSync(options);

}
gulp.task('watchless',function(){
    log(config.lessfiles);
    gulp.watch(projectrootdir+'*.less', ['less'])
        .on('change',function (event) {
            // var srcPattern = new RegExp('/.*(?=/')
            log(event.type);
        }); 
    startBrowserSyncDev();
    
});

// support functions

/**
 * Log a message or series of messages using chalk's blue color.
 * Can pass in a string, object or array.
 */
function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}
function errorhandler (error) {
    log('*** start of error: ***');
    log(error);
    log('*** end of error! ***');
    this.emit('end');
}