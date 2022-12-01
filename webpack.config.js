const path = require("path");
const BundleAnalyzerPlugin =
    require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const CamundaModelerWebpackPlugin = require("camunda-modeler-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//env var
module.exports = {
    target: "node",
    // mode: "production",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "client.js",
    },
    plugins: [
        // { filename: "style.css" }
        new BundleAnalyzerPlugin(),
        new MiniCssExtractPlugin(),
        new CamundaModelerWebpackPlugin(),
    ],
    //! so i dont need to say .jsx everywhere
    resolve: {
        extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
    },
    module: {
        rules: [
            {
                test: /\.ts[x]?$/,
                exclude: /node_modules/,
                use: ["ts-loader"],
            },
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
                    //"css-loader",
                    { loader: "css-loader", options: { modules: true } },
                    // {
                    //     loader: "typings-for-css-modules-loader",
                    //     options: { modules: true, namedExport: true },
                    // },
                    //"sass-loader",

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
};
