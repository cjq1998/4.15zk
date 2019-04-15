const gulp = require("gulp");
const gulpSass = require("gulp-sass"); //编译scss
const gulpBabel = require("gulp-babel"); //编译js
const htmlmin = require("gulp-htmlmin"); //编译html
const cssmin = require("gulp-clean-css"); //压缩css
const uglify = require("gulp-uglify"); //压缩js
const concat = require("gulp-concat"); //合并
const server = require("gulp-webserver");
const url = require("url");
const { join } = require("path");
contst { readFileSync } = require("fs")
    //编译scss
gulp.task("devScss", () => {
    return gulp.src("./src/css/*.scss")
        .pipe(gulpSass())
        .pipe(cssmin({ compatibility: 'ie8' })) //压缩css
        // .pipe(concat(all.css)) //合并
        .pipe(gulp.dest("./dist/css"))
})

//编译js
gulp.task("devJs", () => {
    return gulp.src("./src/js/*.js")
        .pipe(gulpBabel({
            presets: ['@babel/env']
        }))
        .pipe(uglify()) //压缩js
        // .pipe(concat('all.js'))
        .pipe(gulp.dest("./dist/js"))
})

//编译html

// gulp.task("devHtml", () => {
//     return gulp.src("./src/*.html")
//         .pipe(htmlmin({
//             collapseWhitespace: true,
//             removeEmptyAttributes: true,
//             removeScriptTypeAttributes: true,
//             removeStyleLinkTypeAttributes: true,
//             removeAttributeQuotes: true,
//             collapseBooleanAttributes: true
//         }))
//         .pipe(gulp.dest("dist"))
// })

gulp.task("devServer", () => {
    gulp.src("./src")
        .pipe(server({
            port: 8080,
            livereload: true,
            middleware(req, res, next) {
                let { pathname, query } = url.parse(req.url, true);
                pathname = pathname === "/" ? "index.html" : pathname;
                if (pathname === "/getData") {
                    res.end(JSON.stringify(data))
                } else {
                    res.end(readFileSync(join(__dirname, "src", pathname)));
                }
            }
        }))
})

gulp.task("watch", () => {
    return gulp.watch("./src/css/*.scss", gulp.series("devScss"));
    return gulp.watch("./src/js/*.js", gulp.series("devJs"));
})

gulp.task("default", gulp.series("devScss", "devJs", "devServer", "watch"));