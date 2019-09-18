/**
 * External Deps
 */
const chalk = require( 'chalk' );
const {log} = console;

module.exports = {
	/**
	 * Parse Entries from .wpthemerc.
	 *
	 * @param entriesJson
	 * @param env
	 * @returns {Array}
	 */
	entries( entriesJson = [], env = 'development' ){
		log( chalk.cyan( ':' ), chalk.grey.bold( '｢wpthemerc｣' ), chalk.white.bgBlack( ' Parsing entries... ' ) );
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
				log( chalk.red.bold( '!' ), chalk.grey.bold( '｢wpthemerc｣' ), chalk.red( `Name is required. Name missing in .wpthemerc at position: ${i}` ) );
				continue;
			}
			if( ~Object.keys( entries ).indexOf( entryJson.name ) ) {
				log( chalk.red( '!' ), chalk.grey.bold( '｢wpthemerc｣' ), chalk.red( `Name ${entryJson.name} already exists. Unique keys are required.` ) );
				continue;
			}
			if( ~entryJsonKeys.indexOf( 'js' ) ) {
				entry.push( ...entryJson.js );
			}
			if( ~entryJsonKeys.indexOf( 'css' ) ) {
				entry.push( ...entryJson.css );
			}
			if( ~entryJsonKeys.indexOf( 'scss' ) ) {
				entry.push( ...entryJson.scss );
			}
			if( ~entryJsonKeys.indexOf( 'hmr' ) && entryJson.hmr ){
				if( ~entryJsonKeys.indexOf( 'react' ) && entryJson.react && 'development' === env ){
					entry.unshift( 'react-hot-loader/patch' );
				}
				entry.unshift( ...hmrScripts );
			}
			log( chalk.cyan( '+' ), chalk.grey.bold( '｢wpthemerc｣' ), chalk.underline.bold( `[${entryJson.name}] added to WebPack entries.` ) );
			entries[ entryJson.name ] = entry;
		}

		return entries;
	}
};
