# Config

## Vite
Planter Basic uses [Vite](https://vitejs.dev/), a build tool that consists of a feature rich dev server and build command that bundles your code with [Rollup](https://rollupjs.org/guide/en/). Read more in the [Vite Docs](https://vitejs.dev/guide/). The Vite config file for Planter Basic can be found at the project root in `vite.config.js`.

### Static Asset Handling
The default Vite config in Planter Basic sets the public directory to `static/`. Assets in this directory will be served at root path `/` during dev, and copied to the root of the dist directory as-is. That means you can reference assets within `static/` with just `/`. 

For example, you would reference the file `static/planter.png` in your markup like so: `img src="/planter.png">`.

## Linters
We included linters to serve as a starting point for implementing your own rules. The default rules are based on our Ditto code style guide.

## `.eslintrc.js`
By default, ESLint can only be run manually via the `lint:js` script.
Read more about [ESLint](https://eslint.org/docs/user-guide/configuring/).

## `.stylelintrc.js`
By default, StyleLint can only be run manually via the `lint:css` script. Read more about [Stylelint](https://stylelint.io/user-guide/configure).
