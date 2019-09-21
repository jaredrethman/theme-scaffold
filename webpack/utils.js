/**
 * WebPack Dev
 *
 * @package TenUpScaffold
 */

/**
 * Modules
 */
// Node Modules.
const webpack = require( 'webpack' );
const {
	open,
	unlink,
	writeFile,
	existsSync,
} = require( 'fs' );
const chalk = require( 'chalk' );
const {log} = console;
// Internal.
const wpTheme = require( '../wp.theme.config' );
const {
	env: {
		NODE_ENV,
		npm_lifecycle_event, // eslint-disable-line camelcase
		npm_package_name, // eslint-disable-line camelcase
		npm_config_loglevel, // eslint-disable-line camelcase
	}
} = process;

const utils = {
	/**
	 * Helper to grab config from wp.theme.config.js
	 */
	wpTheme( key = null ){
		if( null === key ){
			return wpTheme;
		}
		return wpTheme[ key ];
	},

	/**
	 *
	 * @returns {{devServer: {}}}
	 */
	devConfig () {

		log( chalk.underline.cyan( `\nWebPack-Dev-Server Detected: ${ utils.getUrl() }webpack-dev-server` ) );

		/** Add .wds file when webpack-dev-server starts */
		open( './.wds', 'r', ( err ) => {
			if ( err ) {
				log( chalk.cyan( '+' ), chalk.grey.bold( '｢wptheme｣' ), 'Writing .wds file. (async)' );
				writeFile( './.wds', '', ( err ) => {
					if ( err ) {
						log( err );
					}
					log( chalk.cyan( '+' ), chalk.grey.bold( '｢wptheme｣' ), 'Resolved. ".wds" file created. \n' );
				} );
			}
		} );

		/**
		 * When user kills process (CTRL c) remove .wds file
		 */
		for ( const sig of ['SIGINT', 'SIGTERM', 'exit'] ) {
			process.on( sig, () => {
				if ( process ) {
					if ( existsSync( './.wds' ) ) {
						unlink( './.wds', () => {
							// Quietly delete .wds file
						} );
					}
				} else {
					log( 'No such process found!' );
				}
			} );
		}

		return {
			publicPath: utils.getUrl( 'dist/' ),
			devServer: {
				headers: {
					'Access-Control-Allow-Origin': '*',
				},
				hot: true,
				contentBase: './dist',
				disableHostCheck: true,
				port: wpTheme.options.port,
			},
			plugins: [
				new webpack.HotModuleReplacementPlugin()
			],
		};

	},

	/**
	 * Is current process SSL
	 */
	isSsl(){
		// eslint-disable-next-line camelcase
		return !!~npm_lifecycle_event.indexOf( ':s' );
	},

	/**
	 * Get Url
	 */
	getUrl( path = '' ){
		if( 'watch' === NODE_ENV ){
			// eslint-disable-next-line camelcase
			return `${ utils.wpTheme( 'devUrl' ) }wp-content/themes/${ npm_package_name }/dist/`;
		}
		const { port } = utils.wpTheme( 'options' );
		return utils.isSsl() ? `https://localhost:${ port }/${ path }` : `http://localhost:${ port }/${ path }`;
	},

	/**
	 * Object housing Webpack property proxies
	 */
	proxy: {

		/**
		 * Parse Entries from ../wp.theme.config.js.
		 *
		 * @returns {Array}
		 */
		entries(){
			const entriesJson = wpTheme.entries;
			log( chalk.underline.cyan( 'WP Theme Runtime-Config - Parsing entries:' ) );
			if( 1 > entriesJson.length ){
				log( 'No Entries Found.' );
				return [];
			}
			const entries = {};
			const hmrScripts = 'development' === NODE_ENV ? [
				'webpack-dev-server/client?http://0.0.0.0:4000',
				'webpack/hot/only-dev-server',
			] : [];
			for( let i = 0, m = entriesJson.length; i < m; i++ ){
				const entry = [];
				const entryJson = { ...{
					react: false,
					hmr: true,
				}, ...entriesJson[i] };
				const entryJsonKeys = Object.keys( entryJson );
				if( !~entryJsonKeys.indexOf( 'name' ) ) {
					log( chalk.red.bold( '!' ), chalk.grey.bold( '｢wptheme｣' ), chalk.red( `Name is required. Name missing in wp.theme.config.js at position: ${i}` ) );
					continue;
				}
				if( ~Object.keys( entries ).indexOf( entryJson.name ) ) {
					log( chalk.red( '!' ), chalk.grey.bold( '｢wptheme｣' ), chalk.red( `Name ${entryJson.name} already exists. Unique keys are required.` ) );
					continue;
				}
				if( ~entryJsonKeys.indexOf( 'js' ) ) {
					entry.push( ...entryJson.js );
				}
				if( ~entryJsonKeys.indexOf( 'css' ) ) {
					entry.push( ...entryJson.css );
				}
				if( ~entryJsonKeys.indexOf( 'hmr' ) && entryJson.hmr ){
					if( ~entryJsonKeys.indexOf( 'react' ) && entryJson.react && 'development' === NODE_ENV ){
						entry.unshift( 'react-hot-loader/patch' );
					}
					entry.unshift( ...hmrScripts );
				}
				log( chalk.cyan( '+' ), chalk.grey.bold( '｢wptheme｣' ), chalk.bold( `[${entryJson.name}] added to WebPack entries.` ) );
				entries[ entryJson.name ] = entry;
			}

			return entries;
		},

		/**
		 * Webpack Stats property.
		 *
		 * @returns {{}}
		 */
		stats(){
			// eslint-disable-next-line camelcase
			if( 'verbose' === npm_config_loglevel ){
				return {};
			}
			return utils.wpTheme( 'stats' );
		}
	}
};

module.exports = utils;
