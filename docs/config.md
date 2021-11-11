# Config
All configuration files can be found at the project root.

## `planter.config.js`
The `planter.config.js` file is the main config file for your project, which allows you to configure various project and build options which are consumed by the gulpfile. This config isn't required to run your project, but without it the gulp tasks will assume defaults for things like input and output directories.

```js
module.exports = {
  build: {
    // The output directory for the build task
    outDir: './build',
    // The directory for the bundled assets, relative to outDir
    assetsDir: './assets',
    // Add a hash to bundled asset filenames
    hashAssets: true,
  },
  dev: {
    // This gets passed as the Browsersync options object,
    // so any valid HTML options for Browsersync are valid.
    // These are the defaults set internally.
    port: 5000,
    open: false,
    ghostMode: false,
  },
  html: {
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
    // Example (no default keys are set)
    '%TITLE%': 'Planter'
  },
}
```

### Placeholders
Placeholders are string variables that you can define in your `planter.config.js` to be replaced in your HTML files during the build task.


#### Example: Page Title
Planter Basic has `%TITLE%` defined by default as an example written into the `<head>`of `index.html`.
```js
module.exports = {
  placeholders: {
    '%TITLE%': 'My Cool Site',
  },
}
```
```html
<!-- src/<page>.html -->
<head>
  <title>%TITLE%</title>
</header>

<!-- Output -->
<head>
  <title>My Cool Site</title>
</header>
```

#### Example: Paths
You can use a placeholder to alias paths assuming your config looks like this:
```js
module.exports = {
  placeholders: {
    '%images%': './static/some/path/to/images',
  },
}
```
You could use this placeholder across your HTML files:
```html
<!-- src/<page>.html -->
<img src="%images%/cow.png">
<img src="%images%/pangolin.png">
<img src="%images%/goat.png">

<!-- Output -->
<img src="./static/some/path/to/images/cow.png">
<img src="./static/some/path/to/images/pangolin.png">
<img src="./static/some/path/to/images/goat.png">
```

#### Example: HTML Strings
You can even use placeholders with HTML strings for simple templating.
```js
module.exports = {
  placeholders: {
    '%FOOTER%': `
      <footer>
        <ul>
          <li><a href="/index.html">Home</a></li>
          <li><a href="/about.html">About</a></li>
          <li><a href="/contact.html">Contact</a></li>
        </ul>
        <div>&copy; 2021 Ditto Labs</div>
      </footer>
    `,
  },
}
```

Add the `%FOOTER%` placeholder to all your pages, rather than copying and pasting the code block.
```html
<!-- src/<page>.html -->
<body>
  <!-- some content... -->
  %FOOTER%
</body>

<!-- Output -->
<body>
  <!-- some content... -->
  <footer>
    <ul>
      <li><a href="/index.html">Home</a></li>
      <li><a href="/about.html">About</a></li>
      <li><a href="/contact.html">Contact</a></li>
    </ul>
    <div>&copy; 2021 Ditto Labs</div>
  </footer>
</body>
```

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

