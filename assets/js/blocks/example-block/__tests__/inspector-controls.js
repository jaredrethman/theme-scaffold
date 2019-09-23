/**
 * Example Component - Tests.
 *
 * @package TenUpScaffold
 */

/**
 * Dependencies
 */
// NPM Modules.
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
// Components
import ExampleBlockInspectorControls from '../inspector-controls';

/**
 * SnapShot test
 */
describe( '<ExampleBlockInspectorControls />', () => {
	/**
	 * Ensure our Snapshot match's up
	 */
	describe( 'snapshot', () => {
		test( 'passed', () => {
			const snapShotTree = renderer.create(
				<ExampleBlockInspectorControls setAttributes={() => {}} />
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
		const mountWrapper = shallow( <ExampleBlockInspectorControls setAttributes={() => {}} /> );
		test( 'exists', () => {
			expect( mountWrapper ).toExist();
		} );
	} );
} );
