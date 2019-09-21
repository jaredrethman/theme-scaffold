const webpack = require( 'webpack' );

const {
	open,
	unlink,
	writeFile,
	existsSync,
} = require( 'fs' );
const chalk = require( 'chalk' );
const {log} = console;

const wpTheme = require( '../wp.theme.config' );

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

		log( chalk.underline.cyan( `WebPack-Dev-Server Detected: ${ utils.getUrl() }webpack-dev-server` ) );

		/** Add .wds file when webpack-dev-server starts */
		open( './.wds', 'r', ( err ) => {
			if ( err ) {
				log( chalk.cyan( '+' ), chalk.grey.bold( '｢wptheme｣' ), 'Writing .wds file. (async)' );
				writeFile( './.wds', '', ( err ) => {
					if ( err ) {
						log( err );
					}
					log( chalk.cyan( '+' ), chalk.grey.bold( '｢wptheme｣' ), 'Resolved. `.wds` file created.' );
					/** Add a line break to our terminal output. */
					log( '' );
				} );
			}
		} );

		/**
		 * When user kills process (CTRL c) remove ./.wds
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
			]
		};

	},

	/**
	 * Is current process SSL
	 */
	isSsl(){
		return !!~process.env.npm_lifecycle_event.indexOf( ':s' );
	},

	/**
	 * Get Url
	 */
	getUrl( path = '' ){
		return utils.isSsl() ? `https://localhost:${wpTheme.options.port}/${path}` : `http://localhost:${wpTheme.options.port}/${path}`;
	},

	proxy: {
		/**
		 * Parse Entries from ../wp.theme.config.js.
		 *
		 * @param env
		 * @returns {Array}
		 */
		entries( env = 'development' ){
			const entriesJson = wpTheme.entries;
			log( chalk.underline.cyan( 'WP Theme RC: Parsing entries:' ) );
			if( 1 > entriesJson.length ){
				log( 'No Entries Found.' );
				return [];
			}
			const entries = {};
			const hmrScripts = 'development' === env ? [
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
					if( ~entryJsonKeys.indexOf( 'react' ) && entryJson.react && 'development' === env ){
						entry.unshift( 'react-hot-loader/patch' );
					}
					entry.unshift( ...hmrScripts );
				}
				log( chalk.cyan( '+' ), chalk.grey.bold( '｢wptheme｣' ), chalk.bold( `[${entryJson.name}] added to WebPack entries.` ) );
				entries[ entryJson.name ] = entry;
			}

			return entries;
		}
	}
};

module.exports = utils;
