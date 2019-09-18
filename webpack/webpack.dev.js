/**
 *
 */


/**
 * WebPack Dev
 */
const webpack = require( 'webpack' ); // eslint-disable-line no-undef

/** Config commons */
const merge = require( 'webpack-merge' ); // eslint-disable-line no-undef
const common = require( './webpack.common.js' ); // eslint-disable-line no-undef

const isSSL = 0 < process.env.npm_lifecycle_event.indexOf( 'ssl' );  // eslint-disable-line no-undef
const publicPath = isSSL ? 'https://localhost:4000/dist/' : 'http://localhost:4000/dist/';

module.exports = new Promise( ( resolve, reject ) => {
	common
		.then( ( data ) => {
			resolve(
				merge( data, {
					mode: 'development',
					devServer: {
						headers: {
							'Access-Control-Allow-Origin': '*',
						},
						port: 4000,
						hot: true,
						contentBase: './dist',
					},
					output: {
						publicPath
					},
					devtool: '#eval-source-map',
					module: {
						rules: [
							/** SASS/CSS */
							{
								test: /\.scss$/,
								use: [
									{ loader: 'style-loader' },
									{
										loader: 'css-loader',
										options: {
											sourceMap: true,
										},
									},
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
					plugins: [
						new webpack.HotModuleReplacementPlugin(),
					],
				} ),
			);
		} )
		.catch( ( e ) => {
			console.log( e );
			reject();
		} );
} );
