export const createZip = () => {
    plugins.del(`./${path.root_project}.zip`)
    return gulp.src(`${path.build.root}/**/*.*`, {})
    .pipe(plugins.plumber(
        plugins.notify.onError({
            title: '=== ZIP ERROR: ===',
            message: "Error: <%= error.message %>" 
        })
    ))

    .pipe(plugins.zip(`${path.root_project}.zip`, {
        compress: true
    }))
    .pipe(gulp.dest(`./`))
}