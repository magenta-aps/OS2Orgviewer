// vue.config.js
module.exports = {
    css: {
        loaderOptions: {
            // pass options to sass-loader
            sass: {
                additionalData: `@import "${ process.env.VUE_APP_THEME_SCSS }";`
            }
        }
    },
    outputDir: 'dist',
    productionSourceMap: false,
    transpileDependencies: [
        'non-layered-tidy-tree-layout'
    ]
}