var elixir = require('laravel-elixir');
var elixirTypscript = require('elixir-typescript');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function (mix) {
    mix.sass('app.scss');

    mix.copy('node_modules/@angular', 'public/@angular');
    mix.copy('node_modules/rxjs', 'public/rxjs');
    mix.copy('node_modules/core-js', 'public/core-js');
    mix.copy('node_modules/systemjs', 'public/systemjs');
    mix.copy('node_modules/es6-promise', 'public/es6-promise');
    mix.copy('node_modules/es6-shim', 'public/es6-shim');
    mix.copy('node_modules/reflect-metadata/', 'public/reflect-metadata/');
    mix.copy('node_modules/zone.js/', 'public/zone.js/');

    mix.typescript(
        [
            'main.ts',
            'app.component.ts',
            'search.component.ts',
            'products.component.ts'
        ],
        'public/',
        {
            "target": "es5",
            "module": "system",
            "moduleResolution": "node",
            "sourceMap": true,
            "emitDecoratorMetadata": true,
            "experimentalDecorators": true,
            "removeComments": false,
            "noImplicitAny": false
        }
    );
});
