// Set some consts according to configuration
const additional_data_theme = process.env.VUE_APP_THEME_SCSS ? ` @import "${ process.env.VUE_APP_THEME_SCSS }";` : '@import "/src/assets/default-theme.scss";'

// vue.config.js
module.exports = {
    css: {
        loaderOptions: {
            // pass options to sass-loader
            sass: {
                additionalData: additional_data_theme
            }
        }
    },
    outputDir: 'dist',
    productionSourceMap: false,
    transpileDependencies: [
        'non-layered-tidy-tree-layout'
    ]
}