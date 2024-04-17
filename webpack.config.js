const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'development', // production
    entry: path.resolve(__dirname, 'src', 'app.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js',
        clean: true,
        publicPath: '/',
    },
    devServer: {
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, 'public'),
        },
        port: 9000,
        compress: true
    },
    module: {
        rules: [
            {
                test: /\.scss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({ template: path.resolve(__dirname, './index.html') }),
        new CopyPlugin({
            patterns: [
                { from: "./src/templates", to: "templates" },
                { from: "./src/static/images", to: "static/images" },
                { from: "./node_modules/bootstrap/dist/css/bootstrap.min.css", to: "css" },
                { from: "./node_modules/bootstrap/dist/js/bootstrap.bundle.min.js", to: "js" },
                { from: "./node_modules/chart.js/dist/chart.umd.js", to: "js" },
            ],
        }),
    ],

}