# Styling with Sass
Planter Basic's styles provide a working default and are easily extensible for your project. Using [`Sass`](https://sass-lang.com/), we've set up a system of tokens and basic styles to get you started.

## Global Styles
`style.scss`

The project's global styles use `style.scss` as entry file for all partials, tokens, mixins, and functions. By default, the existing sub-directories of `/styles` use [index files](https://sass-lang.com/documentation/at-rules/import#index-files) to import their contents into `style.scss`.

Note: import order matters when using tokens, mixins, and functions as intended. (Make sure they come first!)

## Base
`_base.scss`

The base styles include high-level element overrides and global typographic defaults. Most of these styles utilize the tokens.

## Tokens
`/tokens`

Tokens are a set of variables that allow you to easily reuse values across your styles to maintain consistency and quickly make sweeping changes. The `tokens` directory contains all the token files used across the global styles. Planter Basic's tokens are meant to exist as a system of design tokens and provide a framework that designers are familiar with.

## Mixins
`/mixins`

Mixins are reusable styles that can be used in your stylesheets. Planter Basic provides a set of useful mixins for breakpoints, as well as some pulled from Bootstrap such as `rfs` and flex grid classes.

Learn more about [Sass mixins](https://sass-lang.com/documentation/at-rules/mixin).

### Breakpoint Mixins

- max direction always subtracts .02
- change default direction at the top `@mixin breakpoint($breakpoint, $direction: <default>) {...}`
- notate wrapper mixins to "rename" the breakpoint function calls

```scss
@include breakpoint(sm, up);
@include breakpoint(lg, down);
@include breakpoint(sm, md, between);

@include bp-up(sm)
@include bp-down(md)

@include bp-max(sm)
@include bp-min(md)

@include bp-between(sm, md)

//default direction is set at top of /mixins/_breakpoints.scss
@include bp(sm)
@include bp(sm, up)
@include bp(sm, md, between)
```

### RFS
[RFS](https://github.com/twbs/rfs) is a responsive unit resizing tool that makes things like responsive heading styles easy. 

Using the `font-size` shorthand from `rfs`:
```scss
// _base.scss
h1 {
  @include font-size($h1-font-size);
}
```

More about the `rfs()` mixin and the available shorthands are included in the [Bootstrap RFS docs](https://getbootstrap.com/docs/5.1/getting-started/rfs/#using-the-mixins).

### Grid (Flex)
The optional grid mixins are used to generate [Bootstrap's grid classes](https://getbootstrap.com/docs/5.0/layout/grid/), e.g., `.container`, `.row`, `.col` and their breakpoint variants. `src/styles/_grid.scss` uses the mixins in `_container.scss` and `_grid.scss`. By default, these grid classes are disabled but can be enabled in `/tokens/_grid.scss` by `$enable-grid-classes: true;`.

## Functions
`_functions.scss`

## Grid
`_grid.scss`

## Normalize
`_normalzie.scss`

