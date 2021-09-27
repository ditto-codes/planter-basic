const gulp = require('gulp');
// Utility
const existsSync = require('fs').existsSync;
const del = require('del');
const argv = require('yargs').argv;
const crypto = require('crypto');
const merge = require('merge-stream');
const named = require('vinyl-named');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const dependents = require('gulp-dependents'); 
const gulpif = require('gulp-if');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
// Styles
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
// JS
const webpack = require('webpack-stream');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
// Markup
const beautify = require('gulp-beautify');
// Server
const browserSync = require('browser-sync').create();

// UTILITIES
// ────────────────────────────────────

function hash() {
  return crypto.randomBytes(3).toString('hex');
}

// Add infix input path (e.g. hash)
function infix(path, infix) {
  return {
    dirname: path.dirname,
    basename: `${path.basename}.${infix}`,
    extname: path.extname,
  }
}

// Handle directory paths
function dir(...path) {
  let dirPath = '';
  for (let dir of path) {
    if (dir !== '') {
      dirPath += `${dir}/`;
    }
  }
  return dirPath;
}

// Prepend all input paths with src folder
function normalizeInputs(inputs) {
  let normalized = [];
  if (Array.isArray(inputs)) {
    for (let input of inputs) {
      normalized.push(`${config.src}/${input}`);
    }
  } else {
    normalized.push(`${config.src}/${inputs}`);
  }
  return normalized;
}

// Generate config defaults
function configDefaults(userConfig) {
  const config = userConfig;
  
  if (!config.site) config.site = {};
  if (!config.dev) config.dev = {};
  if (!config.build) config.build = {};
  if (!config.styles) config.styles = {};
  if (!config.styles.options) config.styles.options = {};
  if (!config.js) config.js = {};
  if (!config.js.options) config.js.options = {};
  if (!config.html) config.html = {};
  if (!config.html.options) config.html.options = {};
  if (!config.placeholders) config.placeholders = {};
  if (!config.defaultTaskOptions) config.defaultTaskOptions = {};
  if (!config.site.title) config.site.title = 'Planter Basic';
  if (!config.src) config.src = './src';
  if (!config.static) config.static = './static';
  if (!config.dev.port) config.dev.port = 3000;
  if (!config.dev.open) config.dev.open = false;
  if (!config.build.root) config.build.root = '';
  if (!config.build.outDir) config.build.outDir = './build';
  if (!config.build.assetsDir) config.build.assetsDir = './assets';
  if (!config.styles.dir) config.styles.dir = 'styles';
  if (!config.styles.input) config.styles.input = ['styles/style.scss'];
  else if(typeof config.styles.input === 'string') config.styles.input = [config.styles.input]
  if (!config.styles.options) config.styles.options = { outputStyle: 'compressed' };
  if (!config.js.input) config.js.input = ['js/main.js'];
  else if(typeof config.js.input === 'string') config.js.input = [config.js.input]
  if (!config.js.dir) config.js.dir = 'js';
  if (!config.js.options.webpack) config.js.options.webpack = { mode: 'production', devtool: 'inline-source-map' };
  if (!config.html.input) config.html.input = '*.html';
  if (!config.html.dir) config.html.dir = '';
  if (!config.html.options.beautify) config.html.options.beautify = { indent_size: 2 };
  if (!config.defaultTaskOptions.hash) config.defaultTaskOptions.hash = true;
}

// Create config object
function createConfig() {
  let config = {};
  // Load defaults from config file
  if (existsSync('./planter.config.js')) {
    config = require('./planter.config.js');
  } 
  configDefaults(config);

  return config;
}

// Set constants
const config = createConfig();
const HASH = hash();
const options = config.defaultTaskOptions;

// Set environment mode
let mode = process.env.NODE_ENV;
if (argv.dev) {
  mode = 'development';
} else if (argv.build || argv._.includes('build')) {
  mode = 'production';
}

// TASKS
// ────────────────────────────────────

// Sass, Autoprefixer
function styles() {
  let inputs = normalizeInputs(config.styles.input);
  let streams = [];

  for (let input of inputs) {
    streams.push(gulp.src(input)
      .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(dependents())
        .pipe(sass(config.styles.options).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulpif(options.hash && mode === 'production',
          rename(path => infix(path, HASH)),
        ))
      .pipe(sourcemaps.write())
      .pipe(gulpif(mode === 'production',
        gulp.dest(`${dir(config.build.outDir, config.build.assetsDir)}`),
        gulp.dest(`.planter/${dir(config.build.assetsDir)}`),
      ))
      .pipe(browserSync.stream()))
  }

  return merge(...streams);
}

// Webpack, Babel
function js() {
  let inputs = normalizeInputs(config.js.input);

  return gulp.src(inputs, { since: gulp.lastRun(js) })
    .pipe(plumber())
    .pipe(named())
    .pipe(webpack(config.js.options.webpack))
    .pipe(sourcemaps.init())
      .pipe(babel({
        presets: [ '@babel/env' ]
      }))
      .pipe(gulpif(mode === 'production', uglify()))
      .pipe(gulpif(options.hash && mode === 'production',
        rename(path => infix(path, HASH)),
      ))
    .pipe(sourcemaps.write())
    .pipe(gulpif(mode === 'production',
      gulp.dest(`${dir(config.build.outDir, config.build.assetsDir)}`),
      gulp.dest(`.planter/${dir(config.build.assetsDir)}`),
    ))
    .pipe(browserSync.stream());
}

// Process HTML: inject tags for output CSS and JS, replace built-in placeholders
function html() {
  let js = '';
  let css = '';
  const infix = options.hash && mode === 'production' ? HASH : '';

  // Create link tags for output CSS
  for (let input of config.styles.input) {
    let basename = input.split('/').pop().split('.')[0];
    css += `<link href="${config.build.assetsDir}/${basename}${infix}.css" rel="stylesheet">\n`;
  }
  // Create script tags for output JS
  for (let input of config.js.input) {
    let basename = input.split('/').pop().split('.')[0];
    js += `<script src="${config.build.assetsDir}/${basename}${infix}.js"></script>\n`;
  }

  // Get user defined placeholders
  const placeholderKeys = Object.keys(config.placeholders);
  if (placeholderKeys.length === 0) return;
  
  // Start task stream
  let task = gulp.src(`${config.src}/${config.html.input}`, { since: gulp.lastRun(html) })
    .pipe(plumber())

  // Replace internal placeholders
  task = task
    .pipe(replace('%TITLE%', config.site.title))
    .pipe(replace('%CSS%', css))
    .pipe(replace('%JS%', js))
  
  // Replace user defined placeholders
  for (let key of placeholderKeys)  {
    task = task.pipe(replace(key, config.placeholders[key]))
  }

  // Format HTML with Beautify
  task = task.pipe(gulpif(config.html.beautify, 
    beautify.html((()=>{
      if (config.html.beautify === true) return {};
      else if (typeof config.html.beautify === 'object' && config.html.beautify !== null) {
        return config.html.beautify;
      }
    })())
  ))
  
  // Finish task
  return task.pipe(gulpif(mode === 'production',
    gulp.dest(`${config.build.outDir}/`),
    gulp.dest(`.planter/`),
  )).pipe(browserSync.stream());
}

// Copy static path and its contents to the build path
function static() {
  return gulp.src(`${config.static}/*`)
    .pipe(gulpif(mode === 'production',
      gulp.dest(`${config.build.outDir}/`),
      gulp.dest(`.planter/`),
    ));
}

// Watch src files and run build tasks in dev mode
function watch() {
  const options = { ignoreInitial: false };
    
  gulp.watch(`${config.src}/${dir(config.styles.dir)}**/*.scss`, options, styles)
    .on('change', browserSync.reload);
    
  gulp.watch(`${config.src}/${dir(config.js.dir)}**/*.js`, options, js)
    .on('change', browserSync.reload);

  gulp.watch(`${config.static}/*`, options, static)
    .on('change', browserSync.reload);
    
  gulp.watch(`${config.src}/${dir(config.html.dir)}**/*.html`, options, html)
    .on('change', browserSync.reload);

}

// Serve output via Browsersync server
function serve() {
  let dir = '.planter';
  if (argv.build) dir = config.build.outDir;
  
  let browserSync_options = {
    server: {
      baseDir: [dir],
    },
    ...config.dev 
  };

  if (argv.open === true || argv.open === false) {
    browserSync_options.open = argv.open;
  }

  return browserSync.init(browserSync_options);
}

// Clean output directories
function clean(cb) {
  if (argv.dev) {
    del.sync(`.planter/*`);
  }
  else if(argv.all) {
    del.sync(`.planter/*`);
    del.sync(`${config.build.outDir}/*`);
  } else {
    del.sync(`${config.build.outDir}/*`);  
  }
  
  cb();
}

// Export public gulp tasks
// ────────────────────────────────────

exports.styles = styles
exports.js = js;
exports.watch = watch;
exports.clean = clean;
exports.html = html;
exports.serve = serve;
exports.static = static;
exports.build = gulp.series(clean, styles, js, html, static);
exports.dev = gulp.parallel(serve, watch);