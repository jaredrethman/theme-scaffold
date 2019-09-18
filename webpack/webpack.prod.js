/* eslint-disable no-console */

/** Config commons */
const merge = require('webpack-merge'); // eslint-disable-line

/** Plugins */
const common = require( './webpack.common.js' ); // eslint-disable-line no-undef
const UglifyJsPlugin = require( 'uglifyjs-webpack-plugin' ); // eslint-disable-line no-undef
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' ); // eslint-disable-line no-undef
const OptimizeCSSAssetsPlugin = require( 'optimize-css-assets-webpack-plugin' ); // eslint-disable-line no-undef

module.exports = new Promise( ( resolve, reject ) => {
	common
		.then( ( data ) => {
			resolve(
				merge( data, {
					mode: 'production',
					externals: {
						react: 'React',
						'react-dom': 'ReactDOM',
						lodash: 'lodash',
					},
					devtool: '(none)',
					module: {
						rules: [
							/** SASS */
							{
								test: /\.scss$/,
								use: [
									MiniCssExtractPlugin.loader,
									'css-loader',
									'postcss-loader',
									{
										loader: 'sass-loader',
										options: {
											sassOptions: {
												includePaths: ['./assets/scss'],
											},
											sourceMap: true,
										},
									},
								],
							},
							{
								test: /\.css$/,
								use: [
									MiniCssExtractPlugin.loader,
									'css-loader',
								],
							},
						],
					},
					optimization: {
						minimizer: [
							new UglifyJsPlugin( {
								cache: true,
								parallel: true,
							} ),
							new OptimizeCSSAssetsPlugin( {} ),
						],
					},
					plugins: [
						new MiniCssExtractPlugin( {
							filename: '[name].css',
							chunkFilename: '[id].css',
						} ),
					],
				} ) // eslint-disable-line comma-dangle
			);
		} )
		.catch( e => {
			console.log( e );
			reject();
		} );
} );
