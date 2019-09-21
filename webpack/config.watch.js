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
const BrowserSyncPlugin = require( 'browser-sync-webpack-plugin' );
// Webpack Internal.
const common = require( './config.common.js' );
const { wpTheme } = require( './utils' );

module.exports = new Promise( ( resolve, reject ) => {
	common
		.then( ( data ) => {
			resolve(
				merge( data, {
					mode: 'development',
					output: {
						publicPath: `${ wpTheme( 'devUrl' ) }wp-content/themes/${ process.env.npm_package_name }/dist/`,
					},
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
		} )
		.catch( ( e ) => {
			// eslint-disable-next-line no-console
			console.log( e );
			reject();
		} );
} );
