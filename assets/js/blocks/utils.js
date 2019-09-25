/**
 * Blocks Utils
 *
 * @package TenUpScaffold
 */
// WordPress
const {
	i18n: {
		__,
	},
} = wp;

/**
 *
 */
export const configProxy = ( config ) => {
	if( 'test' === NODE_ENV ){
		config.category = 'common';
	}
	return {
		...config,
		...{
			title: __( 'Example Block' ),
		}
	};
};

export default {
	configProxy
};
