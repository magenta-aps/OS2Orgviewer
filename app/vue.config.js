// vue.config.js

process.env.VUE_APP_VERSION = require('./package.json').version

module.exports = {
    outputDir: 'dist',
    publicPath: '', // serve assets under a relative path.
    productionSourceMap: false,
    transpileDependencies: [
        'non-layered-tidy-tree-layout'
    ]
}
