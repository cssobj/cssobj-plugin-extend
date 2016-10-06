//cssobj plugin extend

// support for $extend key as value plugin
function extendSel(result, sourceNode, targetSel) {
  var isRegExp = {}.toString.call(targetSel)=='[object RegExp]'
  result.nodes.forEach(function(node) {
    if(sourceNode.extendedNodes.indexOf(node)>-1) return
    var selTextPart = node.selTextPart
    if(!selTextPart || sourceNode.parentRule !== node.parentRule) return
    sourceNode.selTextPart.forEach(function(source) {
      var extArr = selTextPart.filter(function(v) {
        return isRegExp
          ? v.match(targetSel)
          : v==targetSel
      }).map(function(v) {
        return isRegExp ? v.replace(targetSel, source) : source
      })
      if(extArr.length) {
        ![].push.apply(selTextPart, extArr)
        sourceNode.extendedNodes.push(node)
      }
    })
  })
}

export default function cssobj_plugin_extend (option) {
  option = option || {}
  var $key = option.keyName || '$extend'
  return {
    post: function (result) {
      result.nodes.forEach(function(node) {
        node.extendedNodes = node.extendedNodes || []
        ![].concat(node.rawVal[$key]).forEach(function(val) {
          val && extendSel(result, node, val)
        })
      })
      return result
    }
  }
}
