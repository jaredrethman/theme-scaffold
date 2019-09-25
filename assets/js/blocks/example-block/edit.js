/**
 * Example Block - Edit
 *
 * @package TenUpScaffold
 */

/**
 * Dependencies
 */
// React Hot Loader, required for HMR.
import {hot} from 'react-hot-loader/root';
// React & PropTypes
import React from 'react';
// WordPress
const {
	i18n: {
		__
	},
	element: {
		useState
	},
	blockEditor: {
		RichText,
		InnerBlocks,
	},
	components: {
		ToggleControl
	}
	//  apiFetch
} = wp;

/**
 * Components
 */
import ExampleBlockInspectorControls from './inspector-controls';
import ExampleComponent from '../../components/example-component';
import PropTypes from 'prop-types';

/**
 * Tester edit component
 * @returns {*}
 * @constructor
 */
function ExampleBlockEdit( { setAttributes, attributes: { title, contentType } } ) {

	const [ option, setOption ] = useState( 0 );

	return (
		<div className='tenup-blocks-content-list'>
			<ToggleControl
				key={'curate'}
				label={__( 'Toggle to test useState()', 'katerra' )}
				checked={option}
				onChange={( option ) => {
					setOption( option );
					return option;
				}}
			/>
			<RichText
				tagName='h3'
				multiline={ false }
				placeholder={ '' }
				value={ title }
				onChange={ title => setAttributes( { title } ) }
			/>
			<pre>assets/js/blocks/example-bock/index.js</pre>
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
			<InnerBlocks
				allowedBlocks={ [ 'core/button', 'core/heading' ] }
			/>
		</div>
	);
}

ExampleBlockEdit.propTypes = {
	attributes: PropTypes.shape( {
		title: PropTypes.string,
		contentType: PropTypes.string,
	} ),
	setAttributes: PropTypes.func,
};

/**
 * Wrap component in React Hot Loader, if HMR is running.
 */
export default 'development' === NODE_ENV ? hot( ExampleBlockEdit ) : ExampleBlockEdit;
