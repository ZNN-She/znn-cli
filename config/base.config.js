const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const env = process.env.NODE_ENV;
console.log('NODE_ENV=', env);

const config = {
    entry: {
        index: path.resolve(__dirname, '../src/index.js')
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: env === 'production' ? '[name][chunkhash:8].js' : '[name].js' // 热更新的时候不能使用hash值 其他同理
    },
    mode: 'production', //env, // production development none
    //   watch: env === "development" ? true : false, // watch
    //   devtool: env === "development" ? 'inline-source-map' : "", // 是否有source-map映射
    // devServer: { // 移到server.js里
    //   contentBase: './dist',
    //   hot: env === "development" ? true : false // 热更新
    // },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/, // 排除文件 提高打包速度
                use: 'babel-loader'
                // use: {
                //     loader: 'babel-loader',
                //     options: {
                //         presets: ['@babel/preset-env', '@babel/preset-react'] // 这部分也可以移到 .babelrc 文件重
                //     }
                // }
            },
            {
                test: /\.css$/,
                // use: [ 'style-loader', 'css-loader' ], // style-laoder 和 mini-css-extract-plugin不可以同时使用, style-laoder是把样式插入到head里面, 不生成css文件
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ] // style-laoder 和 mini-css-extract-plugin不可以同时使用, style-laoder是把样式插入到head里面, MiniCssExtractPlugin提取生成css文件
            },
            {
                test: /\.less/,
                // use: ['style-loader', 'css-loader', 'less-loader'], // style-laoder 和 mini-css-extract-plugin不可以同时使用, style-laoder是把样式插入到head里面, 不生成css文件
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { importLoaders: 1 } }, // 配合postcss-loader做些优化  官网说明: When postcss-loader is used standalone (without css-loader) don't use @import in your CSS, since this can lead to quite bloated bundles
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: (loader) => [
                                require('postcss-import')({ root: loader.resourcePath }),
                                // require('postcss-cssnext')(), // 包含autoprefixer功能
                                require('autoprefixer')({
                                    overrideBrowserslist: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4']
                                }),
                                require('cssnano')() // 去空格等
                            ],
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                use: [
                {
                  loader: 'file-loader',
                  options: {
                    name () {
                      if (env === 'development') {
                        return '[path][name].[ext]'
                      }

                      return '[hash].[ext]'
                    },
                    outputPath: path.resolve(__dirname, '../dist/images/')
                  }
                }
                // {
                //   loader: 'url-loader', // 可以指定大小以下的图片转换base64
                //   options: {
                //     limit: 10000
                //   }
                // }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: env === 'production' ? '[name]_[hash:8].[ext]' : '[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../src/index.html'),
            filename: 'index.html',
            chunks: ['index'],
            inject: true,
            favicon: path.join(__dirname, '../src/favicon.ico') // 网页标题旁的小图标
        }), // 可以通过HtmlWebpackPlugin实现多页打包
        new MiniCssExtractPlugin({
            filename: env === 'production' ? '[name]_[contenthash:8].css' :'[name].css'
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'), //引入cssnano配置压缩选项
            cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }],
            },
            canPrint: true //是否将插件信息打印到控制台
        })
    ]
};

module.exports = config;
