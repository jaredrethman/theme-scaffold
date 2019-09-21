/* eslint-disable no-console */

/** Config commons */
const merge = require( 'webpack-merge' );

/** Plugins */
const common = require( './config.common.js' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

const {NODE_ENV} = process.env;

module.exports = new Promise( ( resolve, reject ) => {
	common
		.then( ( data ) => {
			resolve(
				merge( data, {
					mode: 'development',
					externals: {
						react: 'React',
						'react-dom': 'ReactDOM',
						lodash: 'lodash',
					},
					devtool: 'source-map',
					module: {
						rules: [
							/** SASS */
							{
								test: /\.css$/,
								use: [
									MiniCssExtractPlugin.loader,
									'css-loader',
									'postcss-loader',
								],
							},
						],
					},
					plugins: [
						new MiniCssExtractPlugin( {
							filename: `[name]${ 'production' === NODE_ENV ? '.min' : '' }.css`,
							chunkFilename: `[id]${ 'production' === NODE_ENV ? '.min' : '' }.css`,
						} ),
					],
				} ) // eslint-disable-line comma-dangle
			);
		} )
		.catch( e => {
			console.log( e );
			reject();
		} );
} );
