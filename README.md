# MathRam! A WolfRam Alpha API wrapper.

This package allows you to query the wolfram alpha API for free, while providing the premium features!

# Installation

Using NPM:

```
npm i mathram
```

## Usage

There is basically one function, `query()` to query the wolfram alpha api.

```js
const { query } = require("mathram");

let answer = await query("derivative sin^2 x");
```

## [View Docs](https://mathram.lmao.ninja/modules/index.html)
