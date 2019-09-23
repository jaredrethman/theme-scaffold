/**
 * Example Component - Tests.
 *
 * @package TenUpScaffold
 */

/**
 * Dependencies
 */
// NPM Modules.
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';
// Component
import ExampleComponent from '../';

/**
 * SnapShot test
 */
describe( '<ExampleComponent />', () => {
	/**
	 * Ensure our Snapshot match up
	 */
	describe( 'snapshot', () => {
		test( 'passed', () => {
			const snapShotTree = renderer.create(
				<ExampleComponent contentType={'post'} />
			).toJSON();
			expect( snapShotTree ).toMatchSnapshot();
		} );
	} );

	/**
	 * Enzyme tests
	 *
	 * @link https://github.com/FormidableLabs/enzyme-matchers/tree/master/packages/jest-enzyme
	 */
	describe( 'enzyme', () => {
		let mountWrapper = mount( <ExampleComponent contentType={'post'} /> );
		test( 'exists', () => {
			const shallowWrapper = shallow( <ExampleComponent contentType={'post'} /> );
			expect( shallowWrapper ).toExist();
		} );
		test( 'contains ul element', () => {
			expect( mountWrapper ).toContainMatchingElement( 'ul' );
		} );
		test( 'contains h3 element', () => {
			expect( mountWrapper ).toContainMatchingElement( 'h3' );
		} );
		test( 'contains 2 x h4 elements', () => {
			expect( mountWrapper ).toContainMatchingElements( 2, 'h4' );
		} );
		test( 'contains 2 x li elements', () => {
			expect( mountWrapper ).toContainMatchingElements( 2, 'li' );
		} );
		test( 'contains <Spinner /> when content is null', () => {
			const { Spinner } = wp.components;
			mountWrapper = mount( <ExampleComponent contentType={'post'} content={ null } /> );
			expect( mountWrapper ).toContainReact( <Spinner /> );
		} );
	} );
} );
