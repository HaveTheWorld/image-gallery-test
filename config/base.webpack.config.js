const path = require('path')
const ExtractCssChunksWebpackPlugin = require('extract-css-chunks-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin')

const resolve = path.resolve.bind(this, __dirname, '..')
const componentsPath = resolve('src/components')

const sassResourcesLoader = {
	loader: 'sass-resources-loader',
	options: {
		resources: [
			resolve('src/assets/sass/variables.sass')
		]
	}
}

module.exports = ({ dev }) => ({
	entry: {
		main: resolve('src/index.js')
	},
	output: {
		path: resolve('build'),
		filename: dev ? 'js/[name].js' : 'js/[name].[contenthash:8].js',
		chunkFilename: dev ? 'js/[name].chunk.js' : 'js/[name].[contenthash:8].js',
		publicPath: '/'
	},
	module: {
		rules: [
			// javascript
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
							'@babel/preset-react'
						],
						plugins: [
							['@babel/plugin-proposal-class-properties', { loose: true }],
							'react-hot-loader/babel'							
						]
					}
				}
			},
			// sass global
			{
				test: /\.(sass|scss)$/,
				exclude: componentsPath,
				use: [
					ExtractCssChunksWebpackPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: true
						}
					},
					'sass-loader',
					sassResourcesLoader
				]
			},
			// sass modules
			{
				test: /\.(sass|scss)$/,
				include: componentsPath,
				use: [
					ExtractCssChunksWebpackPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
							modules: true,
							camelCase: true,
							localIdentName: dev ? '[local]__[hash:base64:5]' : '[hash:base64]'
						}
					},
					'sass-loader',
					sassResourcesLoader
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: resolve('src/index.html')
		}),
		new ExtractCssChunksWebpackPlugin({
			filename: dev ? 'css/[name].css' : 'css/[name].[contenthash: 8].css',
			chunkFilename: dev ? 'css/[name].chunk.css' : 'css/[name].[contenthash: 8].css',
			orederWarning: false
		})
	],
	resolve: {
		plugins: [
			new DirectoryNamedWebpackPlugin({
				honorIndex: true,
				exclude: /node_modules/
			})
		],
		alias: {
			'@': resolve('src')
		}
	}
})