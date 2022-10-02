import * as nodePath from 'path';

const root_folder = nodePath.basename(nodePath.resolve());
const src_folder = './__src'; 
const build_folder = './_dist'; 

export const path = {
    build: {
         root: `${build_folder}/`,
         html: `${build_folder}/`,
          css: `${build_folder}/css/`,
           js: `${build_folder}/js/`,
       jsLibs: `${build_folder}/js/libs`,
          img: `${build_folder}/img/`,
        fonts: `${build_folder}/fonts/`,
    },

    src: {
        root: `${src_folder}/`,
        html: [`${src_folder}/*.html`, `!${src_folder}/_*.html`],
        scss: `${src_folder}/scss/style.scss`, 
          js: `${src_folder}/js/script.js`, 
      jsLibs: `${src_folder}/js/libs/*.js`,
         img: `${src_folder}/img/**/*.{jpg,jpeg,png,webp,gif}`, 
         svg: `${src_folder}/img/**/*.svg`, 
    svgicons: `${src_folder}/svg-icons/*.svg`,
    },

    watch: {
         html: `${src_folder}/**/*.html`,
         scss: `${src_folder}/scss/**/*.scss`, 
           js: `${src_folder}/js/**/*.js`, 
       jsLibs: `${src_folder}/js/libs/*.js`,
          img: `${src_folder}/img/**/*.{jpg,jpeg,png,webp,gif,svg}`, 
     svgicons: `${src_folder}/svg-icons/*.svg`,
    },

    root_src: src_folder,
    root_build: build_folder,
    root_project: root_folder,
    ftp: 'uploads'
}