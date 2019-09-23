/**
 * Example Component - Tests.
 *
 * @package TenUpScaffold
 */

/**
 * Dependencies
 */
// Block Register
// eslint-disable-next-line no-unused-vars
import exampleBlock from '../';

/**
 * SnapShot test
 */
describe( 'tenup/example-block', () => {
	/**
	 * Test Block registration.
	 */
	const BLOCK_NAME = 'tenup/example-block';
	const Reg = wp.blocks.getBlockType( 'tenup/example-block' );
	test( `wp.blocks.getBlockType( '${BLOCK_NAME}' )`, () => {
		expect( Reg ).not.toBeUndefined();
	} );
	test( `wp.blocks.getBlockAttributes( '${BLOCK_NAME}' ).contentType is 'post'`, () => {
		expect( wp.blocks.getBlockAttributes( 'tenup/example-block' ).contentType ).toBe( 'post' );
	} );
} );
