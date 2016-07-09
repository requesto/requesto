require("babel-polyfill");
var webpack = require('webpack');
var path = require('path');

module.exports = {
    DEV: {
        debug: true,
        devtool: '#eval-source-map',
        context: path.join(__dirname, 'app', 'assets/scripts'),
        entry: [
            'webpack/hot/dev-server',
            'webpack-hot-middleware/client',
            './main'
        ],
        output: {
            path: path.join(__dirname, 'app', 'assets/scripts'),
            publicPath: '/assets/scripts',
            filename: "bundle.js"
        },
        module: {
            loaders: [{
                test: /\.js$/,
                include: path.join(__dirname, 'app', 'assets/scripts'),
                loaders: ['babel-loader']
            }]
        },
        resolve: {
            extensions: ["", ".js", ".jsx", '.es6'],
        },
        plugins: [
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin()
        ],
    },
    PROD: {
        cache: false,
        output: {
            filename: "bundle.js",
        },
        devtool: 'cheap-module-source-map',
        module: {
            loaders: [{
                test: /\.js$/,
                include: path.join(__dirname, 'app', 'assets/scripts'),
                loaders: ['babel-loader']
            }]
        },
        resolve: {
            extensions: ["", ".js", ".jsx", '.es6'],
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        ]
    },
    TEST: {
        debug: true,
        devtool: '#eval-source-map',
        context: path.join(__dirname, 'test'),
        output: {
            path: path.join(__dirname, 'test'),
            publicPath: '/',
            filename: "bundle.js"
        },
        entry: [
            'webpack/hot/dev-server',
            'webpack-hot-middleware/client',
            './index'
        ],
        module: {
            loaders: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['babel']
            }]
        },
        resolve: {
            extensions: ["", ".js", ".jsx", '.es6'],
        },
        plugins: [
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin()
        ],
    }
}
