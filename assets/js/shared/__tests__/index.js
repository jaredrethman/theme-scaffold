/**
 * Shared functions - Tests.
 *
 * @package TenUpScaffold
 * @TODO Delete this, this is purely for demo purposes.
 */

/**
 * Dependencies
 */
// Shared
import shared from '../';

/**
 * Shared test.
 */
describe( 'shared', () => {
	describe( 'testFnThree(variable)', () => {
		// Type of
		test( '(variable = {}) === \'object\'', () => {
			expect( shared.testFnThree( {} ) ).toBe( 'object' );
		} );
		test( '(variable = []) === \'object\'', () => {
			expect( shared.testFnThree( [] ) ).toBe( 'object' );
		} );
		test( '(variable = null) === \'object\'', () => {
			expect( shared.testFnThree( null ) ).toBe( 'object' );
		} );
		test( '(variable = new Object()) === \'object\'', () => {
			expect( shared.testFnThree( new Object() ) ).toBe( 'object' );
		} );
		test( '(variable = () => {}) === \'function\'', () => {
			expect( shared.testFnThree( () => {
			} ) ).toBe( 'function' );
		} );
		test( '(variable =  shared.testFnThree( () => {} ) === \'string\'', () => {
			expect( shared.testFnThree( shared.testFnThree( () => {
			} ) ) ).toBe( 'string' );
		} );
	} );
	describe( 'testFnThree(variable, __instanceof)', () => {
		test( '(variable = new Object(), __instanceof = Object) === Object', () => {
			expect( shared.testFnThree( {}, Object ) ).toBe( true );
		} );
		test( '(variable = new Map(), __instanceof = Map) === Map', () => {
			expect( shared.testFnThree( new Map(), Map ) ).toBe( true );
		} );
		test( '(variable = new Set(), __instanceof = Set) === Set', () => {
			expect( shared.testFnThree( new Set(), Set ) ).toBe( true );
		} );
		test( '(variable = new Set(), __instanceof = Map) !== Map', () => {
			expect( shared.testFnThree( new Set(), Map ) ).not.toBe( true );
		} );
	} );
} );
