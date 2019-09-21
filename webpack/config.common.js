/**
 * WebPack Common
 *
 * @package TenUpScaffold
 */

/**
 * Modules
 */
// NPM Modules
const path = require( 'path' );
const webpack = require( 'webpack' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );
// Webpack Internal.
const { proxy } = require( './utils' );

/**
 * Wrap common config inside a new Promise.
 *
 * @type {Promise<unknown>}
 */
module.exports = new Promise( ( resolve, reject ) => {
	const entry = proxy.entries( JSON.stringify( process.env.NODE_ENV ) );
	if( 1 > Object.keys( entry ).length ){
		reject( 'Entries cannot be empty. Check property "entries" in your wp.theme.config.js file configuration.' );
	}
	resolve( {
		entry,
		output: {
			filename: '[name].js',
			path: path.resolve( __dirname, '../dist' ), // eslint-disable-line no-undef
		},
		resolve: {
			extensions: ['.js', '.jsx', '.css'],
			symlinks: false,
		},
		// stats: wpTheme( 'stats' ),
		module: {
			rules: [
				/** JS/JSX */
				{
					test: /\.(js|jsx)$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
					},
				},
				/** Fonts */
				{
					test: /\.(woff|woff2|eot|ttf|otf)$/,
					exclude: /node_modules/,
					use: ['url-loader'],
				},
				/** Images */
				{
					test: /\.(png|ico|gif|jpe?g|svg)$/,
					exclude: /node_modules/,
					use: [
						{
							loader: 'url-loader',
							options: {
								limit: 3000 /** Bytes */,
							},
						},
					],
				},
			],
		},
		plugins: [
			new CleanWebpackPlugin(),
			new webpack.DefinePlugin( {
				NODE_ENV: JSON.stringify( process.env.NODE_ENV ), // eslint-disable-line no-undef
			} ),
		],
	} );
} );
