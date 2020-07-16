/**
 * Created by zhangnanning on 2020/7/14.
 */
const webpack = require('webpack');
const {merge} = require('webpack-merge');
const baseConfig = require('./base.config.js');
const devConfig = {
    mode: "production"
};


const webpackConfig = merge(baseConfig, devConfig);

module.exports = webpackConfig;

