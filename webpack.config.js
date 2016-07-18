var webpack = require('webpack');
var path = require('path');

module.exports = {
    DEV: {
        devtool: 'eval',
        context: path.join(__dirname, 'app', 'assets/scripts'),
        entry: [
            'webpack-dev-server/client?http://localhost:3000',
            'webpack/hot/only-dev-server',
            './main'
        ],
        output: {
            path: path.join(__dirname, 'dist', 'assets/scripts'),
            publicPath: 'http://localhost:3000',
            filename: "bundle.js"
        },
        module: {
            loaders: [{
                test: /\.js$/,
                include: path.join(__dirname, 'app', 'assets/scripts'),
                loaders: ['react-hot', 'babel'],
            }]
        },
        resolve: {
            extensions: ["", ".js", ".jsx", '.es6'],
        },
        plugins: [
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin()
        ]
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
                exclude: /(node_modules|bower_components)/,
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
