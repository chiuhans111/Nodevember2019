var path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
    mode: 'production',
    entry: path.join(__dirname, 'src/js/main.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                // exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            }, {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader']
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|png|svg|jpg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 1024, //bytes
                        name: '[name].[hash:7].[ext]',
                        outputPath: 'assets',
                        esModule: false,
                    }
                }
            },




        ]
    },

    plugins: [
        new htmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            hash: true,
        }),
        new VueLoaderPlugin(),
        new CopyPlugin([
            {
                from: path.join(__dirname, '/src/assets'),
                to: path.join(__dirname, '/dist/assets')
            }
        ])
    ],

    stats: {
        colors: true
    },

   

    devServer: {
        // contentBase: path.join(__dirname),
        publicPath: '/nodevember2019',
        port: 9000
    }

};