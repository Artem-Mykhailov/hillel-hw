const { src, dest, series, watch } = require("gulp");
const concat = require("gulp-concat");
const clean = require("gulp-clean");
const uglify = require("gulp-uglify");

function cleanDist() {
  return src("./dist", { read: false, allowEmpty: true }).pipe(clean());
}

function copyJS() {
  return src(["./src/GalleryAPI.js", "./src/script.js"], { sourcemaps: true })
    .pipe(concat("index.js"))
    .pipe(uglify())
    .pipe(dest("./dist", { sourcemaps: true }));
}
function copyHTML() {
  return src("./src/index.html").pipe(dest("./dist"));
}
function copyCSS() {
  return src("./src/style.css").pipe(dest("./dist"));
}

function watchFiles(params) {
  return watch(["./src/**/*.js"], { ignoreInitial: false }, () => copyJS());
}

module.exports.build = series(cleanDist, copyJS, copyHTML, copyCSS);
module.exports.serve = series(cleanDist, copyJS, copyHTML, copyCSS, watchFiles);
