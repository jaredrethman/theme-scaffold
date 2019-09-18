/**
 * WebPack Dev
 */
const webpack = require( 'webpack' );

/** Config commons */
const merge = require( 'webpack-merge' );
const common = require( './webpack.common.js' );

const isSSL = 0 < process.env.npm_lifecycle_event.indexOf( 'ssl' );
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
			// eslint-disable-next-line no-console
			console.log( e );
			reject();
		} );
} );
