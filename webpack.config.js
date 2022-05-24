const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const Webpack = require("webpack");

const config = {
    mode: "development",

    devtool: "cheap-eval-source-map",

    entry: {
        index: path.resolve(__dirname, "./src/js/index.js"),
        detail: path.resolve(__dirname, "./src/js/detail.js"),
        collections: path.resolve(__dirname, "./src/js/collections.js"),
    },

    devServer: {
        watchOptions: {
            ignored: /node_modules/,
        },
        hot: true,
        open: true,
        host: "localhost",
        port: 4000,
    },

    module: {
        rules: [{
                test: /\m?.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    // options: {
                    //     "presets": ["env"],

                    // },
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|jpg|jpeg|gif|ico)$/i,
                loader: "url-loader",
                options: {
                    limit: 1024,
                    outputPath: "img/",
                },
            },
            {
                test: /\.tpl$/,
                loader: "ejs-loader",
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [require("autoprefixer")],
                        },
                    },
                    "sass-loader",
                ],
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./src/index.html"),
            filename: "index.html",
            chunksSortMode: "manual",
            title: "首页",
            chunks: ["index"],
            excludeChunks: ["node_modules"],
            hash: true,
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./src/detail.html"),
            filename: "detail.html",
            chunksSortMode: "manual",
            chunks: ["detail"],
            title: "详情",
            excludeChunks: ["node_modules"],
            hash: true,
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./src/collections.html"),
            filename: "collections.html",
            chunksSortMode: "manual",
            chunks: ["collections"],
            title: "我的收藏",
            excludeChunks: ["node_modules"],
            hash: true,
        }),
        new CleanWebpackPlugin(),
        new Webpack.HotModuleReplacementPlugin(),
    ],

    output: {
        filename: "js/[name]-[hash].js",
        path: path.resolve(__dirname, "./dist"),
    },
};

module.exports = config;