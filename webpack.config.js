const path = require('path')
const fs = require('fs');
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const isDev = process.env.NODE__ENV === 'development';
const isProd =  !isDev;

const PAGES_DIR = `${path.resolve(__dirname, "src")}/pages/`;

const PAGES = fs
    .readdirSync(PAGES_DIR)
    .filter((fileName) => fileName.endsWith(".html"));

const optimization = () => {
    if(isProd){
        const config = {
            minimizer : [
                new TerserWebpackPlugin(),
                new CssMinimizerPlugin()
            ]
        }  
        return config;
    }
}

module.exports = {
    mode: 'development',
    entry: {
        main: './src/js/script.js'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    }, 
    devServer: {
        port: 5555,
        hot: isDev
    },
    plugins: [
        ...PAGES.map(
            (page) =>
            new HTMLWebpackPlugin({
                template: `${PAGES_DIR}/${page}`,
                filename: `${page}`,
            })
        ),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "styles.css",
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "./src/assets",
                    to: "./assets"
                }
            ]
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
        ]
    },
    optimization: optimization()
}