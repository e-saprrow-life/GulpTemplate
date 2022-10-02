export const sprites = () => {
    /** Позволяет перекрашивать SVG иконки с помощью свойства fill: 
     * Инструкция по использованию тут:
     * https://siteok.org/blog/html/svg-sprajty
    */

    return gulp.src(path.src.svgicons)
    .pipe(plugins.plumber(
        plugins.notify.onError({
            title: '=== SVG ICONS ERROR ===',
            message: "Error: <%= error.message %>" 
        })
    ))

    .pipe(plugins.svgSprite({
        shape: {
            dimension: {
                maxWidth: 500,
                maxHeight: 500
            },
            spacing: {
                padding: 0
            },
            transform: [{
                "svgo": {
                    "plugins": [
                        { removeViewBox: false },
                        { removeUnusedNS: false },
                        { removeUselessStrokeAndFill: true },
                        { cleanupIDs: false },
                        { removeComments: true },
                        { removeEmptyAttrs: true },
                        { removeEmptyText: true },
                        { collapseGroups: true },
                        { removeAttrs: { attrs: '(fill|stroke|style)' } }
                    ]
                }
            }]
        },
        mode: {
            symbol: {
                dest : '',
                sprite: 'sprite/svg-pack.svg'
            }
        },
        svg: { // General options for created SVG files
            xmlDeclaration: false, // Add XML declaration to SVG sprite
        }
    }))
    .pipe(gulp.dest(`${path.src.root}/svg-icons/`))
}





export const spriteHtmlWrite = async () => {
    let filesExist = {
        iconsSVG: plugins.fs.existsSync(`${path.src.root}svg-icons/sprite/svg-pack.svg`),
         svgHTML: plugins.fs.existsSync(`${path.src.root}html/_svg.html`)
    }
    
    if (!filesExist.iconsSVG || !filesExist.svgHTML) return false;

    let spriteSVGcontent = plugins.fs.readFileSync(`${path.src.root}/svg-icons/sprite/svg-pack.svg`, "utf8");
    
    if (spriteSVGcontent) {
        plugins.fs.writeFile(`${path.src.root}html/_svg.html`, '', cb);
        plugins.fs.appendFile(`${path.src.root}html/_svg.html`, createBodySvgFile(spriteSVGcontent), cb);
    } else {
        plugins.fs.writeFile(`${path.src.root}html/_svg.html`, '', cb);
    }
}


function createBodySvgFile(svg) {
    return '<!-- SVG SPRITES PACK -->\n<div class="svg-sprites-pack">\n \t' + svg + '\n</div>'
}


function cb() {}