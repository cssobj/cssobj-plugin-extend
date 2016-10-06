# cssobj-plugin-extend

[![Build Status](https://travis-ci.org/cssobj/cssobj-plugin-extend.svg?branch=master)](https://travis-ci.org/cssobj/cssobj-plugin-extend)

[cssobj](https://github.com/cssobj/cssobj) plugin to extend selector to another selector, like @extend in SCSS or $extend in LESS.

## Install

- npm

```shell
npm i cssobj-plugin-extend
```

Then

```javascript
var cssobj = require('cssobj')
var cssobj_plugin_extend = require('cssobj-plugin-extend')

// then consume the cssobj_plugin_extend below
```

## Quick Start

### **Extend single selector:**

```javascript
cssobj(
{
  'p': {
    fontSize: '12px'
  },
  div:{
    $extend: 'p',
    color: 'red'
  }
},
{
  plugins: [
    cssobj_plugin_extend()
  ]
}
)
```

Result css:

``` css
p,div { font-size: 12px; }
div { color: red; }
```

### **Extend with multiple selector:**


```javascript
cssobj(
{
  '.blue': {
    color: 'blue'
  },
  'p': {
    fontSize: '12px'
  },
  div:{
    $extend: ['p', '.blue'],
    color: 'red'
  }
},
{
  plugins: [
    cssobj_plugin_extend()
  ]
}
)
```

Result css:

``` css
.blue,div { color: blue; }
p,div { font-size: 12px; }
div { color: red; }
```

### **Extend with regexp:**

```javascript
cssobj(
{
  // clearfix hack
  '.clearfix': {
    '&:before, &:after': {
      content: '" "',
      display: 'table'
    },
    '&:after': {
      clear: 'both'
    },
    '&': {
      '*zoom': 1
    }
  },
  div:{
    $extend: /\.clearfix/,
    color: 'red'
  }
},
{
  plugins: [
    cssobj_plugin_extend()
  ]
}
)
```

Result css:

``` css
.clearfix:before, .clearfix:after,div:before, div:after {
  content: " ";
  display: table;
}
.clearfix:after,div:after {
  clear: both;
}
.clearfix,div {
  *zoom: 1;
}
div { color: red; }
```

## Requirement

**cssobj version >= 0.5.5**

## License

MIT

