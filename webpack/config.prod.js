/**
 * WebPack Prod
 *
 * @package TenUpScaffold
 */

/**
 * Modules
 */
// Node Modules.
const path = require( 'path' );
const glob = require( 'glob-all' );
const merge = require( 'webpack-merge' );
const TerserPlugin = require( 'terser-webpack-plugin' );
const PurgeCssPlugin = require( 'purgecss-webpack-plugin' );
const OptimizeCSSAssetsPlugin = require( 'optimize-css-assets-webpack-plugin' );
// Internal.
const buildConfig = require( './config.build' );
const { wpTheme } = require( './utils' );

/**
 * Merge Config with config.build, resolve in new Promise.
 *
 * @type {Promise<unknown>}
 */
module.exports = new Promise( ( resolve, reject ) => {
	buildConfig.then( ( data ) => {
		resolve(
			merge( data, {
				mode: 'production',
				devtool: '(none)',
				output: {
					filename: '[name].min.js',
				},
				optimization: {
					minimizer: [
						new TerserPlugin( {
							cache: true,
							parallel: true,
							sourceMap: false,
						} ),
						new OptimizeCSSAssetsPlugin( {
							assetNameRegExp: /\.min\.css$/g,
						} ),
					],
				},
				plugins: [
					new PurgeCssPlugin( {
						paths: glob.sync( [
							path.join( __dirname, '../*.php' ),
							path.join( __dirname, '../assets/**/*.js' )
						] ),
						whitelist : wpTheme( 'purgeCss' )
					} )
				]
			} ) // eslint-disable-line comma-dangle
		);
	} ).catch( e => reject( e ) );
} );
