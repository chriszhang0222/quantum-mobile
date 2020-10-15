const path = require("path")

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    chainWebpack: config => {
        config.resolve.alias
            .set("@", resolve("src"))
    },
    publicPath: './',
    assetsDir: "static",
    //outputDir: "cordova/cordova-app/www",
    productionSourceMap: false,
    configureWebpack: {
        resolve: {
            alias: {
                'vue$': 'vue/dist/vue.esm.js'
            }
        }
    },
    devServer: {
        proxy: process.env.VUE_APP_SERVER
    }
}
