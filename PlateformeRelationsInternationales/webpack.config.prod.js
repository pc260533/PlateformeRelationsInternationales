const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.config.common");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(commonConfig, {
    mode: "production",
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    }
})