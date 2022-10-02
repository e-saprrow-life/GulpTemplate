/* == SCSS Tasks ============================================ */

export const scss = () => {
    return gulp.src(path.src.scss, {
        sourcemaps: vars.isDev
    })

    .pipe(plugins.plumber(
        plugins.notify.onError({
            title: '=== SCSS ERROR ===',
            message: "Error: <%= error.message %>" 
        })
    ))

    //.pipe(plugins.replace(/@img\//g, '../img/'))

    .pipe(plugins.sass({
        outputStyle: 'expanded'
        /* compressed - скомпрессирован. Удаляет любые комменты
         * expanded - без сжатия
        */
    }))

    //== only build mode:
    .pipe(plugins._if(vars.isBuild, plugins.group_media_queries()))

    //== only build mode:
    .pipe(plugins._if(vars.isBuild, plugins.webp_css({
        webpClass: '.webp',
        noWebpCalss: '.no-webp'
    })))

    .pipe(plugins.autoprefixer({
        grid: true, // Поддержка гридов
        overrideBrowserslist: ["last 3 versions"], // Поддержка трех последних версий
        cascade: true 
    }))


    .pipe(gulp.dest(path.build.css))

    .pipe(plugins._if(vars.isBuild, plugins.clean_css())) /*bm*/ 
    .pipe(plugins._if(vars.isBuild, plugins.rename({extname: ".min.css"}))) /*bm*/ 
    .pipe(plugins._if(vars.isBuild, gulp.dest(path.build.css))) /*bm*/ 

    .pipe(plugins.browser_sync.stream())
}