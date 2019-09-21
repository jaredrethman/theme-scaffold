/**
 * Example Block - Edit
 *
 * @package TenUpScaffold
 */

/**
 * Dependencies
 */
// React & PropTypes
import React from 'react';
// React Hot Loader, required for HMR.
import {hot} from 'react-hot-loader/root';
// WordPress
const {
	editor: {
		RichText,
	},
} = wp;

/**
 * Components
 */
import ExampleInspectorControls from './inspector-controls';
import ExampleComponent from '../../components/example-component';

/**
 * Tester edit component
 * @returns {*}
 * @constructor
 */
function Tester( { setAttributes, attributes: { title, contentType } } ) {

	return (
		<div className='tenup-blocks-content-list'>
			<RichText
				tagName='h3'
				multiline={ false }
				placeholder={ '' }
				value={ title }
				onChange={ title => setAttributes( { title } ) }
			/>
			<pre>assets/js/blocks/example-block/index.js</pre>
			<ExampleComponent contentType={ contentType } />
			<ExampleInspectorControls setAttributes={ setAttributes } contentType={ contentType } />
		</div>
	);
}

/**
 * Wrap component in React Hot Loader, if HMR is running.
 */
if ( 'development' === NODE_ENV ) {
	// eslint-disable-next-line no-func-assign
	Tester = hot( Tester );
}

export default Tester;
