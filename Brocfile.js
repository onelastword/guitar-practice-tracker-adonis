'use strict';
const Merge = require('broccoli-merge-trees');
const Sass = require('broccoli-sass-source-maps');
const Autoprefixer = require('broccoli-autoprefixer');
const CssOptimizer = require('broccoli-csso');
const Babel = require('broccoli-babel-transpiler');
const rm = require('broccoli-stew').rm;
const browserify = require('broccoli-browserify-cache');

const stylePaths = [
  'resources/styles',
  'node_modules',
];

const appNoSass = rm('resources/javascript', '**/*.scss');

const babelScript = new Babel(appNoSass);

const appScript = browserify(babelScript, {
  entries: ['./index'],
  outputFile: 'app.js',
});

const compiledSass = new Sass(stylePaths, 'app.scss', 'app.css', {});
const optimizedCSS = new CssOptimizer(compiledSass);
const styles = new Autoprefixer(optimizedCSS);

module.exports = new Merge([styles, appScript]);
