/**
 * Shared functions - Tests.
 *
 * @package TenUpScaffold
 * @TODO Delete this, this is purely for demo purposes.
 */

/**
 * Dependencies
 */
// Enzyme
import Enzyme from 'enzyme';
import ReactV16EnzymeAdapter from 'enzyme-adapter-react-16';
// Internal global overrides
import wp from './global/wp';

/**
 * @type {{components, data, i18n}}
 */
global.wp = wp;

/**
 * @type {string}
 */
global.NODE_ENV = 'test';

// Set Enzyme adapter
Enzyme.configure( { adapter: new ReactV16EnzymeAdapter() } );
