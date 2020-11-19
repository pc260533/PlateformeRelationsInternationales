const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    entry: "./ts/main.ts",

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        chunkFilename: "[name].bundle.js",
        publicPath: "/dist/",
    },

    mode: "development",

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json", ".html"],
    },


    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ["awesome-typescript-loader"]
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.s[ac]ss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[path][name].[ext]",
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: ["html-loader"]
            }
        ]
    },

    plugins: ([
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new CleanWebpackPlugin(),
    ])

};