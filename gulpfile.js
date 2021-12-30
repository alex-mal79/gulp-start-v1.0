const project_folder = require("path").basename(__dirname);
const source_folder = 'src';
let fs = require('fs');

const path = {
    build:{
        html: project_folder + "/",
        css: project_folder + "/css/",
        cssPlugin: project_folder + "/css/",
        js: project_folder + "/js/",
        jsPlugin: project_folder + "/js/",
        json: project_folder + "/json/",
        img: project_folder + "/img/",
        imgSvg: source_folder + "/img/sprite/",
        fonts: project_folder + "/fonts/"       
    },
    src:{
        html: source_folder + "/*.html",
        css: source_folder + "/scss/style.scss",
        cssPlugin: source_folder + "/css-plugins/*.*",
        js: source_folder + "/js/*.js",
        jsPlugin: source_folder + "/js-plugins/*.*",
        json: source_folder + "/json/*.*",
        img: source_folder + "/img/**/*.+(png|jpg|gif|ico|svg|webp)",
        imgSvg: source_folder + "/img/svg/*.svg",
        fonts: source_folder + "/fonts/*.ttf"
    },
    watch:{
        html: source_folder + "/**/*.html",
        css: source_folder + "/scss/**/*.scss",
        cssPlugin: source_folder + "/css-plugins/*.*",
        js: source_folder + "/js/**/*.js",
        jsPlugin: source_folder + "/js-plugins/*.*",
        json: source_folder + "/json/*.*",
        img: source_folder + "/img/**/*.+(png|jpg|gif|ico|svg|webp)",
        imgSvg: source_folder + "/img/svg/*.svg"
    },
    clean: "./" + project_folder + "/"
}

const {src, dest} = require('gulp');
const gulp = require('gulp');
const browsersync = require("browser-sync").create();
const fileinclude = require("gulp-file-include"); 
const removeHtmlComments = require('gulp-remove-html-comments');
const del = require("del"); 
const scss = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const group_media = require('gulp-group-css-media-queries');
const clean_css = require('gulp-clean-css');
const cssbeautify = require('gulp-cssbeautify');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');
const fonter = require('gulp-fonter');
const svgSprite = require('gulp-svg-sprite');


function cssPlugin(){
    return src(path.src.cssPlugin)
        .pipe(dest(path.build.cssPlugin))
}
function jsPlugin(){
    return src(path.src.jsPlugin)
        .pipe(dest(path.build.jsPlugin))
}
function json(){
    return src(path.src.json)
        .pipe(dest(path.build.json))
}
function browserSync(){
    browsersync.init({
        server:{
            baseDir: "./" + project_folder + "/"
        },
        port: 3000,
        notify: false
    })
}
function html(){
    return src(path.src.html)
        .pipe(fileinclude())
        .pipe(removeHtmlComments())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}
function css(){
    return src(path.src.css)
        .pipe(
            scss({
                outputStyle: "expanded"
            })
        )
        .pipe(
            group_media()
            )
        .pipe(
            autoprefixer({
                grid: true,
                overrideBrowserslist: ["last 5 versions"],
                cascade: true
            })
        )
        .pipe(cssbeautify())
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
        .pipe(clean_css())
        .pipe(
            rename({
                extname: ".min.css"
            })
        )
        .pipe(dest(path.build.css))
}
function js(){
    return src(path.src.js)
        .pipe(fileinclude())
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
        .pipe(
            uglify()
        )
        .pipe(
            rename({
                extname: ".min.js"
            })
        )
        .pipe(dest(path.build.js))
}
function images(){
    return src(path.src.img)
        .pipe(dest(path.build.img))
        .pipe(src(path.src.img))
        .pipe(
            imagemin({
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],
                interlaced: true,
                optimizationLevel: 3 // 0 to 7
            })
        )
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream())
}
function svgSprites(){
    return src(path.src.imgSvg)
        .pipe(
            svgSprite({
                mode: {
                    stack: {
                        sprite: "../sprite.svg"
                    }
                }
            })
        )
        .pipe(dest(path.build.imgSvg))
        .pipe(browsersync.stream())
}
function fonts(){
    src(path.src.fonts)
        .pipe(ttf2woff())
        .pipe(dest(path.build.fonts));
    return src(path.src.fonts)
        .pipe(ttf2woff2())
        .pipe(dest(path.build.fonts));
}
gulp.task('otf2ttf', function(){
    return src([source_folder + '/fonts/*.otf'])
        .pipe(fonter({
            formats: ['ttf']
        }))
        .pipe(dest(source_folder + '/fonts/'));
})
function fontsStyle(params) {
        let file_content = fs.readFileSync(source_folder + '/scss/_fonts.scss');
        if (file_content == '') {
            fs.writeFile(source_folder + '/scss/_fonts.scss', '', cb);
            return fs.readdir(path.build.fonts, function (err, items) {
                if (items) {
                    let c_fontname;
                    for (var i = 0; i < items.length; i++) {
                        let fontname = items[i].split('.');
                        fontname = fontname[0];
                        if (c_fontname != fontname) {
                            fs.appendFile(source_folder + '/scss/_fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
                        }
                        c_fontname = fontname;
                    }
                }
            })
    }
}
function cb(){

}
function watchFiles(params){
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.cssPlugin], cssPlugin);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.jsPlugin], jsPlugin);
    gulp.watch([path.watch.json], json);
    gulp.watch([path.watch.img], images);
    gulp.watch([path.watch.imgSvg], svgSprites);
}
function clean(){
    return del(path.clean)
}

const build = gulp.series(clean, gulp.parallel(js, jsPlugin, json, css, cssPlugin, html, images,        svgSprites, fonts), fontsStyle);
const watch = gulp.parallel(build, watchFiles, browserSync);

exports.fontsStyle = fontsStyle;
exports.fonts = fonts;
exports.images = images;
exports.svgSprites = svgSprites;
exports.js = js;
exports.jsPlugin = jsPlugin;
exports.json = json;
exports.css = css;
exports.cssPlugin = cssPlugin;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;