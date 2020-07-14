/**
 * Created by zhangnanning on 2020/7/14.
 */
const webpack = require('webpack');
const {merge} = require('webpack-merge');
const baseConfig = require('./base.config.js');
const devConfig = {
    mode: "production",
    plugins: [

    ]
};


const webpackConfig = merge(baseConfig, devConfig);

const compiler = webpack(webpackConfig);

compiler.run((err, stat) => {
    // console.log(err, stat)
});
