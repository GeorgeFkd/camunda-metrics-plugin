const path = require("path");

const CamundaModelerWebpackPlugin = require("camunda-modeler-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    target: "node",
    mode: "production",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "client.js",
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.css$/,
                //["style-loader","css-loader"],"postcss-loader"
                use: [
                    //MiniCssExtractPlugin.loader,
                    "style-loader",
                    "css-loader",

                    // "postcss-loader",
                ],
            },
        ],
    },
    // devServer:{
    //   port:3010,
    //   watchContentBase:true
    // },
    //devtool: "cheap-module-source-map",
    plugins: [
        new CamundaModelerWebpackPlugin(),
        // { filename: "style.css" }
        //new MiniCssExtractPlugin({ filename: "style.css" }),
    ],
};
