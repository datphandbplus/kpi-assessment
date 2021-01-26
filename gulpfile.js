var gulp = require('gulp');
var ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');
const JSON_FILES = ['src/*.json', 'swagger.json', 'src/**/*.json', 'a.key', 'b.crt', 'package.json', 'favicon.ico'];

function scripts() {
    const tsResult = tsProject.src().pipe(tsProject());
    return tsResult.js.pipe(gulp.dest('dist'));
}

function watch() {
    gulp.watch('src/**/*.ts', scripts);
    gulp.watch('config/*.ts', scripts);
    gulp.watch('test/**/*.ts', scripts);
}

function assets() {
    return gulp.src(JSON_FILES).pipe(gulp.dest('dist'));
}

exports.scripts = scripts;
exports.watch = watch;

var build_watch = gulp.series(gulp.parallel(scripts, assets), watch);
var build = gulp.series(gulp.parallel(scripts, assets));

gulp.task('build', build);

/*
 * Define default task that can be called by just running `gulp` from cli
 */
gulp.task('default', build_watch);