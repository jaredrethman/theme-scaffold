/**
 * Example Component - Tests.
 *
 * @package TenUpScaffold
 */

/**
 * Dependencies
 */
// NPM Modules.
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
// Components
import ExampleBlockEdit from '../edit';

/**
 * SnapShot test
 */
describe( '<ExampleBlockEdit />', () => {
	/**
	 * Ensure our Snapshot match's up
	 */
	describe( 'snapshot', () => {
		test( 'passed', () => {
			const snapShotTree = renderer.create(
				<ExampleBlockEdit attributes={{title: wp.i18n.__( 'Test Example Block Edit' )}} setAttributes={() => {}} />
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
		const mountWrapper = mount( <ExampleBlockEdit attributes={{title: wp.i18n.__( 'Test Example Block Edit' )}} setAttributes={() => {}} /> );
		test( 'exists', () => {
			expect( mountWrapper ).toExist();
		} );
		test( 'contains div with className tenup-blocks-content-list', () => {
			expect( mountWrapper ).toContainMatchingElement( '.tenup-blocks-content-list' );
		} );
	} );
} );
