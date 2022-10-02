//import fs from "fs";
//import fonter from "gulp-fonter";
//import ttf2woff2 from "gulp-ttf2woff2";


// Экспорт из OTF в TTF
export const otf2ttf = () => {
    return gulp.src(`${path.src.root}/fonts/*.otf`, {})
    .pipe(plugins.plumber(
        plugins.notify.onError({
            title: '=== FONTS ERROR: otf_to_ttf ===',
            message: "Error: <%= error.message %>" 
        })
    ))

    .pipe(plugins.fonter({
        formats: ['ttf']
    }))
    .pipe(gulp.dest(`${path.src.root}/fonts/`))
}


// Экспорт из TTF в WOFF & WOFF2
export const ttf2woff = () => {
    return gulp.src(`${path.src.root}/fonts/*.ttf`, {})
    .pipe(plugins.plumber(
        plugins.notify.onError({
            title: '=== FONTS ERROR: ttf_to_woff ===',
            message: "Error: <%= error.message %>" 
        })
    ))

    .pipe(plugins.fonter({
        formats: ['woff']
    }))

    .pipe(gulp.dest(`${path.build.fonts}`))

    .pipe(gulp.src(`${path.src.root}/fonts/*.ttf`))
    .pipe(plugins.ttf2woff2())
    .pipe(gulp.dest(`${path.build.fonts}`))

    .pipe(gulp.src(`${path.src.root}/fonts/*.{woff,woff2}`))
    .pipe(gulp.dest(`${path.build.fonts}`))
}


export const writeFonts = () => {
	let fontsFile = `${path.src.root}/scss/fonts.scss`;
	// Если передан флаг --rewrite удаляем файл подключения шрифтов
	vars.fontsRewrite ? plugins.fs.unlink(fontsFile, cb) : null;
	// Проверяем существуют ли файлы шрифтов
	plugins.fs.readdir(path.build.fonts, function (err, fontsFiles) {
		if (fontsFiles) {
			// Проверяем существует ли файл стилей для подключения шрифтов
			if (!plugins.fs.existsSync(fontsFile)) {
				// Если файла нет, создаем его
				plugins.fs.writeFile(fontsFile, '', cb);
				let newFileOnly;
				for (var i = 0; i < fontsFiles.length; i++) {
					// Записываем подключения шрифтов в файл стилей
					let fontFileName = fontsFiles[i].split('.')[0];
					if (newFileOnly !== fontFileName) {
						let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
						let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
                        let fontStyle;

                        // Проверка стиля шрифта
                        if (fontWeight.toLowerCase().indexOf('italic') !== -1) {
                            fontStyle = 'italic'
                        } else {
                            fontStyle = 'normal'
                        }

                        // Проверка толщины
						if (fontWeight.toLowerCase().indexOf('thin') !== -1) {
							fontWeight = 100;
						} else if (fontWeight.toLowerCase().indexOf('extralight') !== -1) {
							fontWeight = 200;
						} else if (fontWeight.toLowerCase().indexOf('light') !== -1 && fontWeight.toLowerCase().indexOf('extralight') === -1) {
							fontWeight = 300;
						} else if (fontWeight.toLowerCase().indexOf('medium') !== -1) {
							fontWeight = 500;
						} else if (fontWeight.toLowerCase().indexOf('semibold') !== -1) {
							fontWeight = 600;
						} else if (fontWeight.toLowerCase().indexOf('bold') !== -1 && fontWeight.toLowerCase().indexOf('semibold') === -1 && fontWeight.toLowerCase().indexOf('extrabold') === -1) {
							fontWeight = 700;
						} else if (fontWeight.toLowerCase().indexOf('extrabold') !== -1 || fontWeight.toLowerCase().indexOf('heavy') !== -1) {
							fontWeight = 800;
						} else if (fontWeight.toLowerCase().indexOf('black') !== -1) {
							fontWeight = 900;
						} else {
							fontWeight = 400;
						}
						plugins.fs.appendFile(fontsFile, `@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: ${fontStyle};\n}\r\n`, cb);
						newFileOnly = fontFileName;
					}
				}
			} else {
				// Если файл есть, выводим сообщение
				console.log("Файл scss/fonts/fonts.scss уже существует. Для обновления файла нужно его удалить!");
			}
		} else {
			// Если шрифтов нет
			plugins.fs.unlink(fontsFile, cb)
		}
	});
	return gulp.src(`${path.src.root}`);
}

function cb() {}