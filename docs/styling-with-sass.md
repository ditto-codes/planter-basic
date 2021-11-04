# Styling with Sass
Planter Basic's styles provide a working default and are easily extensible for your project. Using [`Sass`](https://sass-lang.com/), we've set up a system of tokens and basic styles to get you started.

## Global Styles
`style.scss`

The project's global styles use `style.scss` as entry file for all partials, tokens, mixins, and functions. By default, the existing sub-directories of `src/styles` use [index files](https://sass-lang.com/documentation/at-rules/import#index-files) to import their contents into `style.scss`.

Note: import order matters when using tokens, mixins, and functions as intended. (Make sure they come first!)

## Base
`_base.scss`

The base styles include high-level element overrides and global typographic defaults. Most of these styles utilize the tokens.

## Tokens
`/tokens`

Tokens are a set of variables that allow you to easily reuse values across your styles to maintain consistency and quickly make sweeping changes. The `tokens` directory contains all the token files used across the global styles. Planter Basic's tokens are meant to exist as a system of design tokens and provide a framework that designers are familiar with.

## Mixins
`/mixins`

Mixins are reusable styles that can be used in the stylesheets. Planter Basic provides a set of useful mixins for breakpoints, as well as some pulled from Bootstrap such as `rfs` and flex grid classes.

Learn more about [Sass mixins](https://sass-lang.com/documentation/at-rules/mixin).

### Breakpoint Mixins

Planter Basic includes breakpoint mixins that makes writing responsive styles easier. The mixins work with the breakpoint map to generate media queries.

```scss
// src/styles/tokens/_breakpoints.scss
$breakpoints: (
  xs: 0,
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px,
  xxl: 1400px
);
```

```scss
// Basic usage example
.foo {
  color: black;
  @include breakpoint(sm, up) {
    color: red;
  }
}
/* Output:

.foo {
  color: black;
  @media (min-width: 576px) {
    color: red;
  }
}

*/
```

```scss
// Breakpoint directions:
//   - `up` and `min` map to a `min-width` media query
//   - `down` and `max` map to a `max-width` media query

// Usage: breakpoint(size, direction)
//    size: breakpoint size key
//    direction: responsive direction
@include breakpoint(sm, up) { /* ... */ }
@include breakpoint(lg, down) { /* ... */ }

// Using sizes with default direction ('up' a.k.a. min-width)
@include breakpoint(sm) { /* ... */ }

// Between two sizes
// Usage: breakpoint(minSize, maxSize, between)
@include breakpoint(sm, md, between) { /* ... */ }

// Direction aliases
@include bp-up(sm) { /* ... */ }
@include bp-down(md) { /* ... */ }

// Alternative direction alias syntax: min, max
@include bp-min(md) { /* ... */ }
@include bp-max(sm) { /* ... */ }

// Alias for between two sizes
@include bp-between(sm, md) { /* ... */ }

// General shorthand alias for `breakpoint` mixin
@include bp(sm) { /* ... */ }
@include bp(sm, up) { /* ... */ }
@include bp(sm, md, between) { /* ... */ }
```

The default direction can be changed in the mixin delcaration by replacing the `direction` argument's default value with a different breakpoint key. 

```scss
// src/styles/mixins/_breakpoints.scss
@mixin breakpoint($breakpoint, $direction: <default>) {
  // ...
}
```

### RFS
[RFS](https://github.com/twbs/rfs) is a responsive unit resizing tool that makes things like responsive heading styles easy. 

Using the `font-size` shorthand from `rfs`:
```scss
// src/styles/_base.scss
h1 {
  @include font-size($h1-font-size);
}
```

More about the `rfs()` mixin and the available shorthands are included in the [Bootstrap RFS docs](https://getbootstrap.com/docs/5.1/getting-started/rfs/#using-the-mixins).

### Grid (Flex)
The optional grid mixins are used to generate [Bootstrap's grid classes](https://getbootstrap.com/docs/5.0/layout/grid/), e.g., `.container`, `.row`, `.col` and their breakpoint variants. `styles/_grid.scss` uses the mixins in `_container.scss` and `_grid.scss`. By default, these grid classes are disabled but can be enabled in `styles/tokens/_grid.scss` by `$enable-grid-classes: true;`.

## Functions
`_functions.scss`

Learn more about [Sass functions](https://sass-lang.com/documentation/at-rules/function).

### Spacing
Planter Basic includes a spacing function, which allows you to use shorthands to access the spacing tokens, as well as generate values using the spacer token with modifiers. The shorthands that you can pass as arguments match the keys used in `$spacer-size-map`.

```scss
// src/tokens/_spacing.scss

// Base spacing value
$spacer: .5rem !default;    // 8px

// Spacing sizes
$spacer-1:  $spacer * .5;   // 4px
$spacer-2:  $spacer * 1;    // 8px
$spacer-3:  $spacer * 2;    // 16px
$spacer-4:  $spacer * 3;    // 24px
$spacer-5:  $spacer * 4;    // 32px
$spacer-6:  $spacer * 6;    // 48px
$spacer-7:  $spacer * 8;    // 64px
$spacer-8:  $spacer * 9;    // 72px

// Spacing map
// Use the map's keys to access the spacing sizing within space()
$spacer-size-map: (
  xs: $spacer-1,
  sm: $spacer-2,
  md: $spacer-3,
  lg: $spacer-4,
  xl: $spacer-5,
  xxl: $spacer-6,
  massive: $spacer-7,
  super: $spacer-8
);
```

```scss
// Access your spacing tokens by key
.foo {
  padding: space(sm); // -> padding: 8px
}

// Supports multiple arguments
.bar {
  padding: space(sm md sm); // -> padding: 8px 16px 8px
}

// Using modifiers (multiples of your base `$spacer` value)
.some {
  padding: space(1 2 1); // -> padding: calc($spacer * 1) calc($spacer * 2) calc($spacer * 1)
}

// Mixing keys and modifiers works too
.other {
  padding: space(sm 2 md); // -> padding: 8px calc($spacer * 2) 16px
}
```

`sp()` is also provided as an alias for `space()`
```scss
.foo {
  padding: sp(sm); // -> padding: 8px
}
```

## Button
`_button.scss`

The only component styles included in Planter Basic are for Button, which serve as an example of how tokens can be used. The styles include a few button type and size variants, which are shown in `demo.html`.

## Grid
`_grid.scss`

Planter Basic includes optional grid (flexbox) classes from Bootstrap and their mixin and variable depedencies, making it easy for you to customize without bringing _all_ of Bootstrap.

This file generates Bootstrap `.container`, `.row`, `.col` classes and their breakpoint variants, using the [grid mixins](#grid-flex) (`styles/mixins/_grid.scss`). By default, these grid classes are disabled but can be enabled in `styles/tokens/_grid.scss` by `$enable-grid-classes: true;`.

Learn more about [Bootstrap's grid classes](https://getbootstrap.com/docs/5.0/layout/grid/).

## Normalize
`_normalize.scss`

Styles that offer useful defaults and normalization across browsers. 

Learn more about [Noramlize.css](https://github.com/necolas/normalize.css)

