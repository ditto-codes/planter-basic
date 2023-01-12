# Getting Started

Planter Basic is a web project starter that uses [`Vite`](https://vitejs.dev/) and comes with starter styles built out with [`Sass`](https://sass-lang.com/). Basic is great for beginner web developers who are looking to take a step towards modern web development without jumping into a complex framework or library.

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
  "start": "npm run dev",
  "dev": "vite",
  "build": "vite build",
  "lint:js": "eslint --ext .js --fix \"src/\"",
  "lint:css": "npx stylelint --fix \"src/\""
}
```

### Scripts
- `dev` – Runs the development vite task, which starts watching your files and starts the dev server.
- `build` – Runs the build vite task, which builds your site for production.
- `start` – An alias for the `dev` script.
- `lint:js` – Run ESLint on your JS files.
- `lint:css` – Run Stylelint on your SCSS/CSS files.

## Project Structure

### Pages
Any `.html` file at the root of `/src` will be treated as a page. Pages can use the internal placeholders: `%TITLE%`, `%CSS%`, and `%JS%`. When running `dev` and `build`, `%CSS%` will be replaced with `<link href="./<name>.css" rel="stylesheet">`, and `%JS%` will be replaced with `<script src="<name>.js"></script>`.
```html
<html lang="en">
  <head>
    %CSS%
  </head>
  <body>
    <div>Some content</div>
    %JS%
  </body>
</html>
```

### `/src`
The home for all your project code that will be watched and transformed by the `dev` and `build` scripts.

### `/static`
Static assets, such as images or external scripts. These files won't be procesed by the `dev` or `build` scripts.

### `/build`
This directory will be generated when you run `npm run build` and will include all HTML, JS, CSS, and other static assets, ready for production. 

## Configuration
The tasks and project structure of Planter Basic can be configured with `planter.config.js`. Check out the [Config docs](./config.md) for more details.
