/**
 * WebPack Dev
 *
 * @package TenUpScaffold
 */

/**
 * Modules
 */
// Node Modules.
const merge = require( 'webpack-merge' );
// Internal.
const common = require( './config.common.js' );
const { devConfig } = require( './utils' );

/**
 * Merge Config with common, resolve in new Promise.
 *
 * @type {Promise<unknown>}
 */
module.exports = new Promise( ( resolve, reject ) => {
	common.then( ( data ) => {
		const { devServer, plugins, publicPath } = devConfig();
		resolve(
			merge( data, {
				mode: 'development',
				output: {
					publicPath,
				},
				devServer,
				devtool: 'source-map',
				module: {
					rules: [
						/** CSS */
						{
							test: /\.css$/,
							use: [
								{ loader: 'style-loader' },
								{
									loader: 'css-loader',
									options: {
										sourceMap: true,
									},
								},
							],
						},
						/** JS/JSX */
						{
							test: /\.(js|jsx)$/,
							exclude: /node_modules/,
							use: {
								loader: 'babel-loader',
								options: {
									plugins: ['react-hot-loader/babel'],
								}
							}
						},
						{
							test: /\.js$/,
							exclude: /node_modules/,
							use: ['babel-loader', 'eslint-loader'],
						}
					],
				},
				plugins,
			} ),
		);
	} ).catch( e => reject( e ) );
} );
