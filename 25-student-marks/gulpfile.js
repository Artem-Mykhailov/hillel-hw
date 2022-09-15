const { src, dest, series, watch, parallel } = require("gulp");
const concat = require("gulp-concat");
const clean = require("gulp-clean");
const uglify = require("gulp-uglify");
const browserSync = require("browser-sync").create();

function cleanDist() {
  return src("./dist", { read: false, allowEmpty: true }).pipe(clean());
}

function copyJS() {
  return src(["./src/StudentAPI.js", "./src/index.js"], { sourcemaps: true })
    .pipe(concat("index.js"))
    .pipe(uglify())
    .pipe(dest("./dist", { sourcemaps: "." }));
}

function copyVendorJS() {
  return src(["./node_modules/jquery/dist/jquery.min.js"])
    .pipe(concat("vendor.js"))
    .pipe(dest("./dist"));
}

function copyHTML() {
  return src("./src/index.html").pipe(dest("./dist"));
}

function copyCSS() {
  return src("./src/style.css").pipe(dest("./dist"));
}

function serve() {
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
  });

  watch(
    ["./src/**/*.js"],
    { ignoreInitial: false },
    series(copyJS, reloadBrowser)
  );
  watch(
    ["./src/*.css"],
    { ignoreInitial: false },
    series(copyCSS, reloadBrowser)
  );
}

function reloadBrowser(done) {
  browserSync.reload();
  done();
}

function taskBuild() {
  return series(cleanDist, parallel(copyJS, copyHTML, copyCSS, copyVendorJS));
}

function taskServe() {
  return series(taskBuild(), serve);
}

module.exports.build = taskBuild();
module.exports.serve = taskServe();
