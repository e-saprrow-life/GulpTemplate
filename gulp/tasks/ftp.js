import {ftp_conf} from "../config/ftp.js";



export const ftpClearRemoteDir = async (cb) => {
    ftp_conf.log = plugins.util.log;
    const ftp_connect = plugins.vinyl_ftp.create(ftp_conf);
    ftp_connect.rmdir( `/${path.ftp}/${path.root_project}`, function (err) {})
}


export const ftpUpload = () => {
    ftp_conf.log = plugins.util.log;
    const ftp_connect = plugins.vinyl_ftp.create(ftp_conf);
    return gulp.src(`${path.build.root}/**/*.*`, {})
    .pipe(plugins.plumber(
        plugins.notify.onError({
            title: '=== FTP ERROR: ===',
            message: "Error: <%= error.message %>" 
        })
    ))
    .pipe(ftp_connect.dest(`/${path.ftp}/${path.root_project}`))
}