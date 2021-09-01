
const
    PATH_PRODUCTION = './../../../brockerprod/webmarket',
    gulp = require('gulp'),
    replace = require('gulp-replace'),
    htmlmin = require('gulp-htmlmin'),
    concat = require('gulp-concat'),
    terser = require('gulp-terser'),
    path = require('path');

// Preparamos todo para publicar en GIT y el test LOCAL
function produccion() {

    return new Promise( resolve => {

        var version = new Date * 1;

        gulp.task('js', function () {
            gulp.src('./js/*')
                .pipe(concat('main.js'))
                .pipe(replace(/^/, '(function(){'))
                .pipe(replace(/$/, '})();'))
                .pipe(terser({
                    toplevel: false,
                    compress: {
                        drop_console: true,
                        booleans_as_integers: true,
                        passes: 3
                    }
                }))
                .pipe(gulp.dest(PATH_PRODUCTION+'/static/js/'));
        });

        gulp.task('css', function () {
            gulp.src('./css/*')
                .pipe(gulp.dest(PATH_PRODUCTION+'/static/css/'));
        });

        gulp.task('html', function () {
            gulp.src('./../templates/panel.html')
                .pipe(replace('<script src="../static/js/tablas.js"></script>', ''))
                .pipe(replace('<script src="../static/js/operaciones.js"></script>', ''))
                .pipe(replace('<script src="../static/js/curvas.js"></script>', ''))
                .pipe(replace('<script src="../static/js/sort.tabla.js"></script>', ''))
                .pipe(replace('<script src="../static/js/api.js"></script>', ''))
                .pipe(replace('<script src="../static/js/favoritos.js"></script>', ''))
                .pipe(replace('<script src="../static/js/menu.js"></script>', ''))
                .pipe(replace('<script src="../static/js/websocket.js"></script>', ''))
                .pipe(replace('<script src="../static/js/perfil.js"></script>', ''))
                .pipe(replace('<script src="../static/js/ordenes.js"></script>', ''))
                .pipe(replace('<script src="../static/test.js"></script>', ''))
                .pipe(htmlmin({ 
                    removeComments : true,
                    collapseWhitespace: true,
                    html5: true
                }))
                .pipe(gulp.dest(PATH_PRODUCTION+'/templates/'));
        });

        gulp.parallel(
            gulp.task('js'), 
            gulp.task('html'), 
            gulp.task('css')
        )();

        resolve();
    });

};

// Generar codigo producction
produccion().then(v => console.log('FIN'));


