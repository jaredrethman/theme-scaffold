/**
 * Example Block
 *
 * @package TenUpScaffold
 */

/**
 * Dependencies
 */
// WordPress
const {
	i18n: {
		__
	},
	blocks: {
		registerBlockType,
		getBlockType,
		unregisterBlockType
	},
} = wp;

/**
 * Components
 */
import edit from './edit';

const BLOCK_NAME = 'tenup/example-block';

// Reload the block on edit (helps to avoid full page refresh when watching)
if ( module.hot && getBlockType( BLOCK_NAME ) ) {
	unregisterBlockType( BLOCK_NAME );
}

registerBlockType(
	BLOCK_NAME, {
		title: __( 'KJBNKJ Block', 'clarion' ),
		description: __( '10up Theme Scaffold example block.', 'clarion' ),
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
		edit,
		save: () => null,
	}
);

