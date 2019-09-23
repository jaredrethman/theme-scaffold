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
// eslint-disable-next-line no-unused-vars
// WordPress
const {
	blockEditor: {
		RichText,
	},
	i18n: {
		__
	}
} = wp;

/**
 * Components
 */
import ExampleBlockInspectorControls from './inspector-controls';
import ExampleComponent from '../../components/example-component';

/**
 * Tester edit component
 * @returns {*}
 * @constructor
 */
function ExampleBlockEdit( { setAttributes, attributes: { title, contentType } } ) {

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
			<ExampleBlockInspectorControls setAttributes={ setAttributes } contentType={ contentType } types={[
				{
					value: 'post',
					label: __( 'Post' ),
				},
				{
					value: 'page',
					label: __( 'Page' ),
				}
			]} />
		</div>
	);
}

/**
 * Wrap component in React Hot Loader, if HMR is running.
 */
export default 'development' === NODE_ENV ? hot( ExampleBlockEdit ) : ExampleBlockEdit;
