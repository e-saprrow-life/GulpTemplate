/** == Плагины: ==================================================================== */
import fs from "fs";     // File System
import del from "del";   // Удаляет файлы и папки

import plumber from "gulp-plumber";
import replace from "gulp-replace";
import file_include from "gulp-file-include";
import _if from "gulp-if"; // .pipe(if_plugin(условие, function)) 
import webpack from "webpack-stream";
import uglify from "gulp-uglify";



// == scss ========================================
import dart_sass from "sass";
import gulp_sass from "gulp-sass";
const sass = gulp_sass(dart_sass);
import clean_css from "gulp-clean-css";
import webp_css from "gulp-webpcss";
import autoprefixer from "gulp-autoprefixer";
import group_media_queries from "gulp-group-css-media-queries";
// == /scss ======================================


// == images =====================================
import webp from "gulp-webp";
import imagemin from "gulp-imagemin";
// == / imagess ===================================


// == SVG =========================================
import svgSprite from "gulp-svg-sprite";
// == / SVG =======================================


// == Fonts =======================================
import fonter from "gulp-fonter";
import ttf2woff2 from "gulp-ttf2woff2";
// == / Fonts =====================================



// == ZIP ========================================
import zip from "gulp-zip";
// == / ZIP ======================================


// == FTP ========================================
import vinyl_ftp from "vinyl-ftp";
import util from "gulp-util";
// == / FTP ======================================


import webp_html_nosvg from "gulp-webp-html-nosvg";
import version_number from "gulp-version-number";

import notify from "gulp-notify";
import browser_sync from "browser-sync";
import rename from "gulp-rename";
import newer from "gulp-newer";
import beautify from "gulp-html-beautify";


/* Экспорт */
export const plugins = {
    fs: fs, 
    del: del,
    plumber: plumber,
    replace: replace,
    file_include: file_include,
    _if: _if,
    webpack: webpack,
    uglify: uglify,
    sass: sass,
    clean_css: clean_css,
    webp_css: webp_css,
    autoprefixer: autoprefixer,
    group_media_queries: group_media_queries,
    webp: webp,
    imagemin: imagemin,
    svgSprite: svgSprite,
    browser_sync: browser_sync,
    webp_html_nosvg: webp_html_nosvg,
    version_number: version_number,
    notify: notify,
    rename: rename,
    newer: newer,
    fonter: fonter,
    ttf2woff2: ttf2woff2,
    zip: zip,
    vinyl_ftp: vinyl_ftp,
    util: util,
    beautify: beautify
    //webpack: webpack,
    //webpack_stream: webpack_stream
}