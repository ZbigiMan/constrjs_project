
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: __dirname + '/js/app.js',
    output: {
        path: path.resolve(__dirname, 'compiled'),
        filename: 'app.bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: ['/(node_modules)/', '/assets'],
            use: ['babel-loader'],
        }, {
            test: /\.html$/,
            exclude: ['/(node_modules)/', '/assets'],
            use: [{ loader: 'es6-template-string-loader' }],

        },
        {
            test: /\.scss$/,
            exclude: ['/(node_modules)/', '/assets'],
            include: path.join(__dirname, 'styles'),
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader']
            })
        },
        {
            test: /\.(jpe?g|png|gif|svg)$/,
            loader: require.resolve("file-loader")
        }]
    },
    plugins: [
        new ExtractTextPlugin({ filename: 'app.bundle.css' }),
        
    ]
}