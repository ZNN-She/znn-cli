/**
 * Created by zhangnanning on 2020/7/13.
 */
const webpack = require('webpack');
const path = require('path');
const {merge} = require('webpack-merge');
const webpackDevServer = require('webpack-dev-server');
const baseConfig = require('./base.config.js');
const devConfig = {
    mode: "development",
    devtool: "inline-source-map"
};

const serverOptions = {
    contentBase: '../dist', // 目录
    hot: true, // 热更新
    host: 'localhost', // 端口
    open: true, // 是否打开浏览器
};


const webpackConfig = merge(baseConfig, devConfig);

console.log(webpackConfig.module);

webpackDevServer.addDevServerEntrypoints(webpackConfig, serverOptions);
const compiler = webpack(webpackConfig);
const server = new webpackDevServer(compiler, serverOptions);

server.listen(3000, 'localhost', () => {
    console.log('dev server listening on port 3000');
});

