/**
 * WebPack Dev
 *
 * @package TenUpScaffold
 */

/**
 * Modules
 */
// NPM Modules
const merge = require( 'webpack-merge' );
// Webpack Internal.
const common = require( './config.common.js' );
const { devConfig, getUrl } = require( './utils' );

module.exports = new Promise( ( resolve, reject ) => {
	common
		.then( ( data ) => {

			const { devServer, plugins } = devConfig( process );

			resolve(
				merge( data, {
					mode: 'development',
					output: {
						publicPath: getUrl( 'dist/' ),
					},
					devServer,
					devtool: 'source-map',
					module: {
						rules: [
							/** SASS/CSS */
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
		} )
		.catch( ( e ) => {
			// eslint-disable-next-line no-console
			console.log( e );
			reject();
		} );
} );
