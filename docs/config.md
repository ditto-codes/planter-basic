# Config
All configuration files can be found at the project root.

## `planter.config.js`
The `planter.config.js` file is the main config file for your project, which allows you to configure various project and build options which are consumed by the gulpfile. This config isn't required to run your project, but without it the gulp tasks will assume defaults for things like input and output directories.

<!-- TODO: add missing coments -->
```js
module.exports = {
  // Comment here about build options
  build: {
    assetsDir: './assets',
    outDir: './build',
    root: '',
  },
  defaultTaskOptions: {
    hash: true,
  }
  dev: {
    // This gets passed as the Browsersync options object,
    // so any valid HTML options for Browsersync are valid.
    port: 5000,
    open: false,
    ghostMode: false,
  },
  html: {
    // A directory path relative to 'src' where your HTML is, and any
    // '.html' files within it will be watched for changes and used as input
    dir: '',
    // Additional options for processing HTML
    options: {
      // This gets passed as the beautify options object,
      // so any valid HTML options for beautify are valid here
      beautify: {
        // This is the only default beautify option
        indent_size: 2,
      }
    },
  }
  js: {
    // A directory path relative to 'src' where your JS is, and any
    // '.js' files within it will be watched for changes
    dir: 'js',
    // An array of entry files (relative to 'dir')
    input: ['main.js'],
    // Additional options for processing JS
    options: {
      // This gets passed as the webpack options object,
      // so any valid options for Webpack are valid here
      webPack: {
        mode:'production',
        devtool:'inline-source-map',
      },
    },
  }
  // The source directory
  src: './src',
  // The static asset directory
  static: './static',
  styles: {
    // A directory path relative to 'src' where your SCSS is, and any
    // '.scss' files within it will be watched for changes
    dir: 'styles',
    // An array of entry files (relative to 'dir').
    input: ['styles/style.scss'],
    // This gets passed as the Sass options object,
    // so any valid options for Sass ('gulp-sass') are valid here
    options: {
      outputStyle: 'compressed',
    },
  }
  // Placeholder definitions to be used anywhere in your HTML
  // '%CSS%' and '%JS%' are internal placeholders that cannot be overridden
  placeholders: {
    '%TITLE%': 'Planter'
  },
}
```

### Placeholders
Placeholders are string variables that you can define in your `planter.config.js` to be replaced in your HTML files during the build task. 

For example, you can use a placeholder to alias paths. Assuming your config looks like this:
```js
module.exports = {
  placeholders: {
    '%images%': './static/some/path/to/images',
  },
}
```
You could use this placeholder across your HTML files:
```html
<img src="%images%/cow.png">
<img src="%images%/pangolin.png">
<img src="%images%/goat.png">
```
<!-- only include the "doing more" if we end up showing a "component" example -->
<!-- TODO: add doing more with placeholders link if applicable -->
See our [Doing More with Placeholders](#) guide for some advanced usage of placeholders.

## `gulpfile.js`

**Primary tasks**: `dev`, `build`, `clean`. These main tasks are set up to be run from the npm scripts defined in `package.json`.

**Secondary tasks**: `html`, `styles`, `js`, `serve`, `static`, `watch`. These secondary tasks that are run by the primary tasks, but can also be run in isolation if necessary. 

Read more about [gulp](https://gulpjs.com/docs/en/getting-started/javascript-and-gulpfiles).

## Linters
<!-- TODO: add code style guide link -->
We included linters to serve as a starting point for implementing your own rules. The default rules are based on our internal [code style guide](#).

## `.eslintrc.js`
By default, ESLint can only be run manually via the `lint:js` script.
Read more about [ESLint](https://eslint.org/docs/user-guide/configuring/).


## `.stylelintrc.js`
By default, StyleLint can only be run manually via the `lint:css` script. Read more about [Stylelint](https://stylelint.io/user-guide/configure).

