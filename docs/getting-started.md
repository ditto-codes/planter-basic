# Getting Started

## Overview
Planter Basic is a web project starter that uses [`gulp`](https://gulpjs.com) and comes with starter styles built out with [`Sass`](https://sass-lang.com/). Basic is great for beginner web developers who are looking to take a step towards modern web development without jumping into a complex framework or library.

<!-- callout -->
<!-- TODO: add Planter Basic Skeleton URL -->
Check out [Planter Skeleton](#) for the same project setup, but without the starter code.

## Install
<!-- TODO: update for planter cli -->
With [`degit`](https://github.com/Rich-Harris/degit):
```shell
> degit matthew-ia/planter-basic
```
Or clone [from GitHub](https://github.com/matthew-ia/planter-basic).


## Run Scripts
Run `npm run dev` or `npm start` to start the development server.

In `package.json`, the following scripts are set up for use:
```json
"scripts": {
  "start": "gulp dev",
  "dev": "gulp dev",
  "build": "gulp build",
  "serve": "gulp serve",
  "serve:build": "gulp serve --build",
  "lint:js": "eslint --ext .js --fix \"src/\"",
  "lint:css": "npx stylelint --fix \"src/\"",
  "clean": "gulp clean"
},
```

### Scripts
- `dev` – Runs the development gulp task, which starts watching your files and starts the dev server.
- `build` – Runs the build gulp task, which builds your site for production.
- `start` – An alias for the `dev` script.
- `serve` – Runs an http server. By default, the server root will be `/.planter` in development mode, or `/build` in production mode.
- `serve:build` – Runs the build gulp task, then serves `/build` as the root.
- `lint:js` – Run ESLint on your JS files.
- `lint:css` – Run Stylelint on your SCSS/CSS files.
- `clean` – Removes the output files for a clean slate; by default, this will delete the `/build` directory. 

### Supported Options
Use the flags `--dev` and `--build` to specify the mode to run the `serve` and `clean` scripts. The underlying gulp tasks will use this mode to determine the output directory and file paths. The `clean` script also supports the `--all` flag to clean both the development and production output directories (`/.planter` and `/build` respectively, by default):

```shell
# Serve dev output (/.planter)
> npm run serve --dev

# Serve production output (/build)
> npm run serve --build

# Clean both dev and prod directories
> npm run clean --all
```

## Project Structure

### `/src`
The home for all your project code that will be watched and transformed by the `dev` and `build` scripts.

### `/static`
Static assets, such as images or external scripts. These files won't be procesed by the `dev` or `build` scripts.

### `/build`
This directory will be generated when you run `npm run build` and will include all HTML, JS, CSS, and other static assets, ready for production. 

## Configuration
The tasks and project structure of Planter Basic can be configured with `planter.config.js`. Check out the [Config docs](./config.md) for more details.
