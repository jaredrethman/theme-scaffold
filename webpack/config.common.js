/**
 * WebPack Common
 *
 * @package TenUpScaffold
 */

/**
 * Modules
 */
// NPM Modules.
const path = require( 'path' );
const webpack = require( 'webpack' );
const StyleLintPlugin = require( 'stylelint-webpack-plugin' );
// Internal.
const { proxy } = require( './utils' );
const {NODE_ENV} = process.env;

/**
 * Wrap common config inside a new Promise.
 *
 * @type {Promise<unknown>}
 */
module.exports = new Promise( ( resolve, reject ) => {

	const entry = proxy.entry();
	const stats = proxy.stats();
	const output = proxy.output();
	const externals = proxy.externals();

	if( 1 > Object.keys( entry ).length ){
		reject( 'Entries cannot be empty. Check property "entries" in your wp.theme.config.js file configuration.' );
	}
	resolve( {
		entry,
		stats,
		output,
		externals,
		resolve: {
			extensions: [ '.js', '.css' ],
			symlinks: false,
		},
		module: {
			rules: [
				/** JS/JSX */
				{
					test: /\.js$/,
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
			new webpack.DefinePlugin( {
				NODE_ENV: JSON.stringify( NODE_ENV ),
			} ),
			new StyleLintPlugin( {
				context: path.resolve( __dirname, './assets/css/' ),
				files: '**/*.css',
			} ),
		],
	} );
} );
