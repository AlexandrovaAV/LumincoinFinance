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
        static: {
            directory: path.join(__dirname, 'public'),
        },
        port: 9000,
    },
    plugins: [
        new HtmlWebpackPlugin({ template: path.resolve(__dirname, './index.html') }),
        new CopyPlugin({
            patterns: [
                { from: "./src/templates", to: "templates" },
            ],
        }),
    ],

}