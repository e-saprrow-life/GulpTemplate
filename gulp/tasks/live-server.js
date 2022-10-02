export const liveServer = (done) => {
    plugins.browser_sync.init({
        server: {
            baseDir: path.build.html
        },
        notify: false,
        port: 3000,
    })
}