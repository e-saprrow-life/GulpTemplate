    import gulp from "gulp";                            // Импорт основного модуля
    import { path } from "./gulp/config/path.js";       // Импорт путей
    import { plugins } from "./gulp/config/plugins.js"; // Импорт объекта с плагинами


    global.gulp = gulp;         // Передаю в глобальную переменную основной модуль gulp
    global.path = path;         // Передаю в глобальную переменнаю объект path с путями
    global.plugins = plugins;   // Передаю в глобальную переменнаю объект plugins со всеми плагинами
    global.vars = {             
        isDev: process.argv.includes('--dev'),  
        isBuild: process.argv.includes('--build'),
        useWebpack: true, 
        fontsRewrite: true,
    };

    /** == global.vars описание свойств
     *           isDev - Принимает значение true если задача была вызвана с флагом --dev. 
     *                   Запускает Gulp в режиме разработчика.
     *
     *         isBuild - Принимает значение true если задача была вызвана с флагом --build. 
     *                   Запускает Gulp в режиме продакшена.
     * 
     * vars.useWebpack - Использовать плюшки ES6. Если вкл - будут использоваться 
     *                   модульные конструкции ES6 типа import и тд. 
     *                   Если откл то js файлы будут соеденяться с помощью плагина file-include.
     *
     *    fontsRewrite - Принудительно перезаписывает файл fonts.scss каджый раз при вызове функции шрифтов.
     *                   false - файл надо будет удалять вручную. Удобно если в файле вносились 
     *                   какие то изменения и их нужно сохранить
     *  == / Импорт основных модулей ==============================================================*/





/** == Импорт задач =============================================================================== */
    import { cleanBuildFolder } from "./gulp/tasks/clean-build-folder.js";   // Очистить папку итогового проекта
    import { html } from "./gulp/tasks/html.js";                             // Работа с HTML файлами
    import { scss } from "./gulp/tasks/scss.js";                             // Работа с SCSS файлами
    import { js } from "./gulp/tasks/java-script.js";                        // Работа с JS файлами
    import { images } from "./gulp/tasks/images.js";                         // Работа с изображениями
    import { sprites, spriteHtmlWrite } from "./gulp/tasks/sprite.js";       // Работа с иконками
    import { otf2ttf, ttf2woff, writeFonts } from "./gulp/tasks/fonts.js";   // Работа с шрифтами
    import { createZip } from "./gulp/tasks/zip.js";                         // Архивация проекта в ZIP
    import { ftpClearRemoteDir, ftpUpload } from "./gulp/tasks/ftp.js";      // Выгрузка на сервер ао FTP 
    import { liveServer } from "./gulp/tasks/live-server.js";                // Сервер и обновление страницы
/** == / Импорт задач ============================================================================ */





/** == Слушатель изменений в файлах ============================================================== */
    function watcher() {
        gulp.watch(path.watch.html,         html );
        gulp.watch(path.watch.scss,         scss );
        gulp.watch(path.watch.js,           js );
        gulp.watch(path.watch.img,          images );
        gulp.watch(path.watch.svgicons,     gulp.series(sprites, spriteHtmlWrite));
    }
/** == / Слушатель изменений в файлах ============================================================ */





/** == Построение списков задач для выполнения операций ===========================================*/

    // Список задач для режима разработки
    const mainStreamDev = gulp.series(
        cleanBuildFolder, 
        otf2ttf, 
        ttf2woff, 
        writeFonts,
        sprites,
        spriteHtmlWrite,
        images,
        html,
        scss,
        js,
        gulp.parallel(watcher, liveServer)
    );


    // Список задач для продакшн режима
    const mainStreamBuild = gulp.series(
        cleanBuildFolder, 
        otf2ttf, 
        ttf2woff, 
        writeFonts,
        sprites,
        spriteHtmlWrite,
        images,
        html,
        scss,
        js
    );


    // Выгружает папку __dest по FTP в папку с назанием текущего пректа
    const upload = gulp.series(ftpClearRemoteDir, ftpUpload);


    // Быстрый старт. Запускает режим разработки в обход повторного запуска всех функций
    const continueDev = gulp.parallel(watcher, liveServer);

/** == / Построение списков задач для выполнения операций =================================*/





/** == Exports =========================================================================== */
    export { createZip }
    export { ftpClearRemoteDir }
    export { upload }
    export { continueDev }
    export { mainStreamDev }
    export { mainStreamBuild }
/** == / Exports ========================================================================= */