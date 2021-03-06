﻿/*
This file is the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. https://go.microsoft.com/fwlink/?LinkId=518007
*/

/// <binding AfterBuild='default' />
var gulp = require('gulp');
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");

gulp.task("minify", function () {
    return gulp.src("wwwroot/js/**/*.js")
        .pipe(uglify())
        .pipe(concat("timezones.min.js"))
        .pipe(gulp.dest("wwwroot/dist"));
});

gulp.task('default', ["minify"]);