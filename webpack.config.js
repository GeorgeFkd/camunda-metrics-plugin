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
    plugins: [
        // { filename: "style.css" }
        new MiniCssExtractPlugin(),
        new CamundaModelerWebpackPlugin(),
    ],
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
                test: /\.(s[ac]|c)ss$/,
                //["style-loader","css-loader"],"postcss-loader"
                use: [
                    MiniCssExtractPlugin.loader,
                    // "style-loader",
                    "css-loader",
                    "sass-loader",

                    // "postcss-loader",
                ],
            },
        ],
    },
    // devServer:{
    //   port:3010,
    //   watchContentBase:true
    // },
    devtool: "source-map",

    // externals: {
    //     fs: "commonjs fs",
    // },
};
