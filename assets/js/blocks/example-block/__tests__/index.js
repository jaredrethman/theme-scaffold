/**
 * Example Component - Tests.
 *
 * @package TenUpScaffold
 */
/* eslint-disable no-unused-vars */
/**
 * Dependencies
 */
// Block Register
import ExampleBlock from '../index';

/**
 * Describe: Example Block registration.
 */
describe( 'tenup/example-block', () => {
	/**
	 * Test Block registration.
	 */
	const BLOCK_NAME = 'tenup/example-block';
	const ExampleBlock = wp.blocks.getBlockType( 'tenup/example-block' );
	test( `wp.blocks.getBlockType( '${BLOCK_NAME}' )`, () => {
		expect( ExampleBlock ).not.toBeUndefined();
	} );
	test( `wp.blocks.getBlockAttributes( '${BLOCK_NAME}' ).contentType is 'post'`, () => {
		expect( wp.blocks.getBlockAttributes( 'tenup/example-block' ).contentType ).toBe( 'post' );
	} );
} );
