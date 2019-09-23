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
const { wpTheme } = require( './utils' );

/**
 * Merge Config with common, resolve in new Promise.
 *
 * @type {Promise<unknown>}
 */
module.exports = new Promise( ( resolve, reject ) => {
	common.then( ( data ) => {
		const browserSync = wpTheme( 'browserSync' );
		browserSync.proxy = wpTheme( 'devUrl' );
		resolve(
			merge( data, {
				mode: 'development',
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
					new BrowserSyncPlugin( wpTheme( 'browserSync' ) )
				],
			} ),
		);
	} ).catch( e => reject( e ) );
} );
