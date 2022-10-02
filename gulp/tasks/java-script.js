/**====================================
 *  Java Script Tasks 
 * ===================================*/

// Использует webpack
export const js = () => {
    return gulp.src(path.src.js, {
        sourcemaps: vars.isDev
    })

    .pipe(plugins._if(!vars.useWebpack, plugins.file_include()))

    .pipe(plugins.plumber(
        plugins.notify.onError({
            title: '=== JavaScript ERROR ===',
            message: "Error: <%= error.message %>" 
        })
    ))

    .pipe(plugins._if(vars.useWebpack, plugins.webpack({
        //mode: vars.isBuild ? 'production' : 'development', // production / development / none
        mode: 'production', // production / development / none
        //devtool: 'eval-source-map',
        output: {
            filename: 'script.js',
        },
        optimization: { // Оптимизация
            minimize: false,         // Минификация файла
            //chunkIds: 'natural',
        },
        experiments: {
            topLevelAwait: true
        },

    })))

    .pipe(gulp.dest(path.build.js))

    

    .pipe(plugins._if(vars.isBuild, plugins.rename({
        extname: ".min.js"
    })))

    .pipe(plugins._if(vars.isBuild, plugins.uglify()))

    .pipe(plugins._if(vars.isBuild, gulp.dest(path.build.js)))

    .pipe(plugins.browser_sync.stream())
}



/*export const jsReplaceLibs = () => {
    return gulp.src(path.src.jsLibs)
    .pipe(plugins.plumber(
        plugins.notify.onError({
            title: '=== jsReplaceLibs ERROR ===',
            message: "Error: <%= error.message %>" 
        })
    ))
    .pipe(gulp.dest(path.build.jsLibs)) 
    .pipe(plugins.browser_sync.stream())
}*/

function cb() {}