//=== HTML Tasks ============================================
export const html = () => {
    return gulp.src(path.src.html)
    .pipe(plugins.plumber(
        plugins.notify.onError({
            title: '=== HTML ERROR ===',
            message: "Error: <%= error.message %>" 
        })
    ))

    .pipe(plugins.file_include())

    .pipe(plugins.replace(/@img\//g, 'img/'))
    .pipe(plugins.replace(/@js\//g, 'js/'))

    .pipe(plugins._if(vars.isBuild, plugins.webp_html_nosvg()))

    .pipe(plugins._if(vars.isBuild, plugins.version_number({
        "value": "%DT%",
        "append": {
            "key": "_v",
            "cover": 0,
            "to": [
                "css",
                "js",
            ]
        },
        "output": {
            "file": 'gulp/version.json'
        }
    })))
    .pipe(plugins.beautify({
        "indent_size": 4
    }))
    .pipe(gulp.dest(path.build.html))
    .pipe(plugins.browser_sync.stream())
}