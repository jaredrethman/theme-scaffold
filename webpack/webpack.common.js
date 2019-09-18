/**
 * WebPack Common
 * @type {webpack}
 */
const webpack = require( 'webpack' );
// const CleanWebpackPlugin = require( 'clean-webpack-plugin' );

const path = require( 'path' );
const { readFileSync } = require( 'fs' );

const wpThemeRc = JSON.parse( readFileSync( './.wpthemerc', 'utf8' ) );
const proxy = require( './webpack.utils' );

module.exports = new Promise( ( resolve, reject ) => {
	const entry = proxy.entries( wpThemeRc.entries, JSON.stringify( process.env.NODE_ENV ) );
	if( 1 > Object.keys( entry ).length ){
		reject( 'Entries cannot be empty. Check your .wpthemerc file configuration.' );
	}
	resolve( {
		entry,
		output: {
			filename: '[name].js',
			path: path.resolve( __dirname, '../dist' ), // eslint-disable-line no-undef
		},
		resolve: {
			extensions: ['.js', '.jsx', '.scss', '.css'],
			symlinks: false,
		},
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
				/** SVG */
				{
					test: /\.svg$/,
					use: [{
						loader: 'html-loader',
						options: {
							minimize: true,
						},
					}],
				},
				/** Images */
				{
					test: /\.(png|ico|gif|jpe?g)(\?[a-z0-9]+)?$/,
					exclude: /node_modules/,
					loader: 'url-loader',
					options: {
						limit: 1000 /** Bytes */,
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
					test: /\.(png|jpg|gif)$/,
					use: [
						{
							loader: 'file-loader',
							options: {},
						},
					],
				},
			],
		},
		plugins: [
			// new CleanWebpackPlugin( ['dist'] ),
			new webpack.DefinePlugin( {
				NODE_ENV: JSON.stringify( process.env.NODE_ENV ), // eslint-disable-line no-undef
			} ),
		],
	} );
} );
