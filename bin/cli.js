#!/usr/bin/env node
// 必须在文件头添加如上内容指定运行环境为node

const path = require('path')

const babelPathWith = (moduleName) => path.resolve(__dirname, '..', 'node_modules', '@babel', moduleName)

require(babelPathWith('register'))({
  plugins: [
    babelPathWith('plugin-transform-runtime')
  ],
  presets: [
    babelPathWith('preset-env')
  ],
  extensions: [".es6", ".es", ".jsx", ".js", ".mjs"],
  ignore: [/my-vue-cli[\\/]node_modules/],
  cache: false,
})
// require('./cli.js')
module.exports = require('./start.js')
