var core = require('cssobj-core')
var expect = require('chai').expect
var util = require('util')
var cssobj_plugin_gencss = require('cssobj-plugin-gencss')
var cssobj_plugin_extend = require('../dist/cssobj-plugin-extend.cjs.js')

function setup (obj, option) {
  return core({
    plugins: [
      cssobj_plugin_extend(option),
      cssobj_plugin_gencss({indent: ''})
    ]
  })(obj)
}

describe('test cssobj-plugin-map', function () {
  it('test empty option', function() {
    var ret = setup(
      {
        p: {
          font: 123
        },
        div:{
          $extend: 'p'
        }
      }
    )

    expect(ret.css).equal(
      `p,div {
font: 123;
}
`)

  })

  it('test option.keyName', function() {
    var ret = setup(
      {
        p: {
          font: 123
        },
        div:{
          $ext: 'p'
        }
      },
      {
        keyName: '$ext'
      }
    )

    expect(ret.css).equal(
      `p,div {
font: 123;
}
`)

  })

  it('test $extend normal string', function() {
    var ret = setup(
      {
        p: {
          font: 123
        },
        div:{
          $extend: 'p'
        }
      }
    )

    expect(ret.css).equal(
`p,div {
font: 123;
}
`)

  })

  it('test $extend normal string, back reference', function() {
    var ret = setup(
      {
        div:{
          $extend: 'p'
        },
        p: {
          font: 123
        },
      }
    )

    expect(ret.css).equal(
`p,div {
font: 123;
}
`)

  })

  it('test $extend normal string, with other prop', function() {
    var ret = setup(
      {
        p: {
          font: 123
        },
        div:{
          $extend: 'p',
          color: 'red'
        }
      }
    )

    expect(ret.css).equal(
`p,div {
font: 123;
}
div {
color: red;
}
`)

  })


  it('test $extend normal string, with multiple match', function() {
    var ret = setup(
      {
        p: [
          {
            font: 123
          },
          {
            font: 456
          }
        ],
        div:{
          $extend: 'p',
          color: 'red'
        }
      }
    )

    expect(ret.css).equal(
`p,div {
font: 123;
}
p,div {
font: 456;
}
div {
color: red;
}
`)

  })

  it('test $extend with regexp', function() {
    var ret = setup(
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
        p: {
          font: 123
        },
        div:{
          $extend: [/\.clearfix\b/, 'p'],
          color: 'red'
        }
      }
    )

    expect(ret.css).equal(
      `.clearfix:before, .clearfix:after,div:before, div:after {
content: " ";
display: table;
}
.clearfix:after,div:after {
clear: both;
}
.clearfix,div {
*zoom: 1;
}
p,div {
font: 123;
}
div {
color: red;
}
`)

  })
})
