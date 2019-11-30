var path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: path.join(__dirname, 'src/js/main.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            }, {
                test: /\.s?css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },

    plugins: [
        new htmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            hash: true
        })
    ],

    stats: {
        colors: true
    },

    devServer: {
        // contentBase: path.join(__dirname),

        port: 9000
    }

};