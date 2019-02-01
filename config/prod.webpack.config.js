const merge = require('webpack-merge')
const baseConfig = require('./base.webpack.config')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const resolve = path.resolve.bind(this, __dirname, '..')

module.exports = merge(baseConfig({ dev: true }), {
	mode: 'production',
	optimization: {
		runtimeChunk: {
			name: 'bootstrap'
		},
		splitChunks: {
			chunks: 'all',
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendor'
				}
			}
		}
	},
	plugins: [
		new CleanWebpackPlugin(['build'], {
			root: resolve()
		}),
		new OptimizeCssAssetsPlugin({
			assetNameRegExp: /\.css$/g,
			cssProcessor: require('cssnano'),
			cssProcessorOptions: {
				discardComment: {
					removeAll: true,
					canPrint: true
				}
			}
		})
	]
})