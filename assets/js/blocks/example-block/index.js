/**
 * Example Block
 *
 * @package TenUpScaffold
 * @TODO This block can't contain HMR, only
 */
/**
 * Dependencies
 */
// Internal
import edit from './edit';
import {configProxy} from '../utils';
// Example block CSS.
import './index.css';
// WordPress
const {
	i18n: {
		__
	},
	blocks: {
		getBlockType,
		registerBlockType,
		unregisterBlockType,
	},
	blockEditor: {
		InnerBlocks
	}
} = wp;
/**
 * Un-register/Register component.
 */
/** @type {string} */
const BLOCK_NAME = 'tenup/example-block';
if ( getBlockType( BLOCK_NAME ) ) {
	unregisterBlockType( BLOCK_NAME );
}
registerBlockType( BLOCK_NAME, configProxy( {
	...{
		description: __( '10up Thehkgvkhgme gg oui example.' ),
		category: 'tenup',
		icon: 'screenoptions',
		attributes: {
			title: {
				type: 'string',
				default: __( 'Example Block' ),
			},
			contentType: {
				type: 'string',
				default: 'post',
			},
		},
	},
	edit,
	/**
	 * @returns {*}
	 */
	save() {
		return (
			<div>
				<InnerBlocks.Content />
			</div>
		);
	},
} ) );
