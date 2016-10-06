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
cssobj(obj, {
  plugins: [ cssobj_plugin_extend(option) ]
})
```

## Quick Start

### **Extend single selector:**

```javascript
var obj = {
  'p': {
    fontSize: '12px'
  },
  div:{
    $extend: 'p',
    color: 'red'
  }
}
```

Result css:

``` css
p,div { font-size: 12px; }
div { color: red; }
```

### **Extend with multiple selector:**


```javascript
var obj = {
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
}
```

Result css:

``` css
.blue,div { color: blue; }
p,div { font-size: 12px; }
div { color: red; }
```

### **Extend with regexp:**

```javascript
var obj = {
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
}
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

## API

#### cssobj_plugin_extend(option)

return function as cssobj plugin.

##### option.keyName

Default value: **$extend**, which means the intended key checking by this plugin is `$extend`, you can set it to any value start with `'$'`.

```javascript
var obj = {
  p: {color: 'red'},
  div: {$ext: 'p'}
}

// use $ext as keyName
cssobj(obj, {plugins: [cssobj_plugin_extend({keyName: '$ext'})]})
```


## Requirement

**cssobj version >= 0.5.5**

## License

MIT

