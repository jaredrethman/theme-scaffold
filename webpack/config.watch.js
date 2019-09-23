/**
 * WebPack Watch
 *
 * @package TenUpScaffold
 */

/**
 * Modules
 */
// Node Modules.
const merge = require( 'webpack-merge' );
const BrowserSyncPlugin = require( 'browser-sync-webpack-plugin' );
// Internal.
const common = require( './config.common.js' );
const { getUrl } = require( './utils' );

/**
 * Merge Config with common, resolve in new Promise.
 *
 * @type {Promise<unknown>}
 */
module.exports = new Promise( ( resolve, reject ) => {
	common.then( ( data ) => {
		resolve(
			merge( data, {
				mode: 'development',
				output: {
					publicPath: getUrl( 'dist/' )
				},
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
					],
				},
				plugins: [
					new BrowserSyncPlugin( {
						host: 'localhost',
						port: 3000,
						proxy: 'http://10pl8.test',
						open: false,
						files: [
							'**/*.php',
							'dist/**/*.js',
							'dist/**/*.css',
							'dist/**/*.svg',
							'dist/**/*.{jpg,jpeg,png,gif}',
							'dist/**/*.{eot,ttf,woff,woff2,svg}'
						]
					}, {
						injectCss: true,
						reload: false,
					} )
				],
			} ),
		);
	} ).catch( e => reject( e ) );
} );
