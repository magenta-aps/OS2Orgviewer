// vue.config.js
module.exports = {
    css: {
        loaderOptions: {
            // pass options to sass-loader
            sass: {
                additionalData: `@import "${ process.env.VUE_APP_THEME_PATH }";`
            }
        }
    },
    outputDir: process.env.BUILD_DIST_FOLDER,
    productionSourceMap: false
}