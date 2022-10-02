/* === Images Tasks =======================================================*/

export const images = () => {
    plugins.del(`${path.build.img}**/*.*`)
    return gulp.src(path.src.img)
    .pipe(plugins.plumber(
        plugins.notify.onError({
            title: '=== Images ERROR ===',
            message: "Error: <%= error.message %>" 
        })
    ))
    .pipe(plugins._if(vars.isBuild,
                    plugins.newer(path.build.img)))

    .pipe(plugins._if(vars.isBuild, 
                    plugins.webp()))

    .pipe(gulp.dest(path.build.img))

    .pipe(plugins._if(vars.isBuild, 
                      gulp.src(path.src.img)))


    .pipe(plugins._if(vars.isBuild, plugins.newer(path.build.img)))


    /*.pipe(plugins._if(vars.isBuild, 
        plugins.imagemin({
            progressive: true,
            svgoPlugins: [{ 
                removeViewBox: false 
            }],
            interLaced: true,
            optimizationLevel: 5 // 0 - 7 
    })))*/


    .pipe(plugins._if(vars.isBuild, gulp.dest(path.build.img)))

    .pipe(gulp.src(path.src.svg))
    .pipe(gulp.dest(path.build.img))

    .pipe(plugins.browser_sync.stream())
}