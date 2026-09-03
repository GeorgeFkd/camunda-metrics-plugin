const path = require("path");
const BundleAnalyzerPlugin =
    require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const CamundaModelerWebpackPlugin = require("camunda-modeler-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
//env var
module.exports = {
    target: "node",
    // mode: "production",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "client.js",
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    // The Camunda Modeler pipes every console.* call through
                    // Sentry's CaptureConsole integration, which deep-serialises
                    // each argument (whole XML Documents included) and queues it
                    // as a breadcrumb. The debug logging scattered through this
                    // plugin therefore froze the UI for seconds on every render.
                    // Strip all console.* from the production bundle.
                    compress: { drop_console: true },
                },
            }),
        ],
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
