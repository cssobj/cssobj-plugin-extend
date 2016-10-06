// rollup.config.js

export default {
  entry: 'src/cssobj-plugin-extend.js',
  moduleName: 'cssobj_plugin_extend',
  moduleId: 'cssobj_plugin_extend',
  targets: [
    { format: 'iife', dest: 'dist/cssobj-plugin-extend.iife.js' },
    { format: 'amd',  dest: 'dist/cssobj-plugin-extend.amd.js'  },
    { format: 'cjs',  dest: 'dist/cssobj-plugin-extend.cjs.js'  },
    { format: 'es',   dest: 'dist/cssobj-plugin-extend.es.js'   }
  ]
}
