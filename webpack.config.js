const MinifyPlugin = require('babel-minify-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const optimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const NODE_ENV = process.env.NODE_ENV;

const ENV = NODE_ENV || 'dev'
const configEnv = require(`./config/config-${ENV}.json`);

const masterTemplate = {
    dev: './src/views/index.pug',
    prod: './src/views/index.build.pug',
};

let plugins = [];

plugins.push(new HtmlWebpackPlugin({
    template: path.resolve(__dirname, `${masterTemplate[ENV]}`),
    minify: {
        html5: true,
        collapseWhitespace: true,
        removeComments: true
    },
    hash: true,
    inject: true,
}));

plugins.push(new CopyWebpackPlugin([
    { from: 'src/assets/', to: 'assets/' }
]));

plugins.push(new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optionalh
    filename: 'style.css',
    chunkFilename: '[id].css'
}));

// Seta variavel global no bundle
plugins.push(new webpack.DefinePlugin({
    SERVICE_URL: JSON.stringify(configEnv.URL),
    ENV: JSON.stringify(ENV)
}));

var config = {
    entry: {
        app: './src/main.js',
        vendor: ['reflect-metadata']
    },
    output: {
        filename: 'bundle.js?[hash]',
        path: path.resolve(__dirname, 'dist')
    },
    module: [
        './src/assets/img'
    ],
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader' },
                    { loader: 'sass-loader' },
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]?[hash]',
                            context: path.resolve(__dirname, './src/assets/img/'),
                        },
                    },
                ],
            },
            {
                test: /\.(pug)$/,
                use: [
                    'html-loader', {
                        loader: 'pug-html-loader',
                        options: {
                            data: {},
                            pretty: true,
                        },
                    },
                ],
            }
        ]
    },
    plugins,
    optimization: {
        runtimeChunk: "single", // enable "runtime" chunk
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "all"
                }
            }
        },
        minimizer: [
            new MinifyPlugin(),
            new optimizeCSSAssetsPlugin({
                cssProcessor: require('cssnano'),
                cssProcessorOptions: {
                    autoprefixer: true,
                    discardUnused: true,
                    discardComments: {
                        removeAll: true
                    }
                },
                canPrint: true
            })
        ]
    },
    devServer: {
        // historyApiFallback: true,
        noInfo: true,
        contentBase: path.resolve(__dirname, '/'),
        port: 8000,
        //watchContentBase: true,
    }
}

module.exports = (env, argv) => {
    if (argv.mode === 'development') {
        config.devtool = 'source-map';
    }

    if (argv.mode === 'production') {
        //...
    }

    return config;
};