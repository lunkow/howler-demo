const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
	mode: "development",
	entry: {
        index: {
            import: "./src/index.js",
        },  
	},
	devtool: "inline-source-map",
    devServer: {
        // http://[devServer.host]:[devServer.port]/[output.publicPath]/[output.filename]
        host: '127.0.0.1',
        port: 5500,
        watchFiles: {
            paths: ['./src'],
        },
    },
	plugins: [
		new HtmlWebpackPlugin({
            template: './src/template.ejs',
			  minify: false,
		}),
        new MiniCssExtractPlugin({
            filename: "src/styles/[name].css?v=[contenthash:8]",
        }),
	],
	output: {
		filename: "src/js/[name].js?v=[contenthash:8]",
		path: path.resolve(__dirname, "public"),
		clean: true,
        publicPath: 'http://127.0.0.1:5500/',
	},
    optimization: {
        // for extracting all styles in 1 file
        splitChunks: {
            cacheGroups: {
              styles: {
                name: "styles",
                type: "css/mini-extract",
                chunks: "all",
                enforce: true,
              },
            },
        },
        minimize: false,
    },
	module: {
		rules: [
            {
                test: /\.ejs$/i,
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            minimize: false,
                        },
                    },
                    "template-ejs-loader",
                ],
            },
            {
                test: /\.js$/i,
                use: "babel-loader",
            },
			{
				test: /\.((c|sa|sc)ss)$/i,
				use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
				type: "asset/resource",
                generator: {
                    filename: 'src/images/[name][ext]?v=[contenthash:8]',
                },
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: "asset/resource",
                generator: {
                    filename: 'src/fonts/[name][ext]?v=[contenthash:8]',
                },
			},
            {
				test: /\.(mp3|wav|webm)$/i,
				type: "asset/resource",
                generator: {
                    filename: 'src/audio/[name][ext]',
                },
			},
		],
	},
};