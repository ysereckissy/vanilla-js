const path = require('path');

module.exports = {
    entry: {
        app: ['@babel/polyfill','./src/app.js'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.bundle.js'
    },
    mode: "none",
    module: {
        rules: [{
            test: /\.(js)$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }]
    },
    devServer: {
        port: 9000,
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        hot: true
    },
    devtool: 'source-map'
}