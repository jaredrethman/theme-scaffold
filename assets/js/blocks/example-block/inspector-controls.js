/**
 * Example Block - Inspector Controls
 *
 * @package TenUpScaffold
 */

/**
 * Dependencies
 */
// React & PropTypes
import React from 'react';
import PropTypes from 'prop-types';
// WordPress
const {
	components: {
		PanelBody,
		SelectControl,
		// ToggleControl
	},
	i18n: {
		__
	},
	blockEditor: {
		InspectorControls,
	},
} = wp;


/**
 * Inspector Controls Function.
 *
 * @param props
 * @returns {*}
 * @constructor
 */
function ExampleBlockInspectorControls( { contentType, types, setAttributes } ) {

	return (
		<InspectorControls>
			<PanelBody title={__( 'Example Title:' )}>
				<SelectControl
					label={__( 'Content Type:' )}
					value={contentType}
					onChange={ contentType => setAttributes( { contentType } )}
					options={ types }
				/>
			</PanelBody>
			{/*<PanelBody title={__( 'Example Title:' )}>
				<ToggleControl
					key={'curate'}
					label={__( 'Curate', 'katerra' )}
					checked={true}
					onChange={( curate ) => setAttributes( {curate} )}
				/>
			</PanelBody>*/}
		</InspectorControls>
	);
}

ExampleBlockInspectorControls.propTypes = {
	contentType: PropTypes.string,
	setAttributes: PropTypes.func.isRequired,
};

ExampleBlockInspectorControls.defaultProps = {
	contentType: 'post',
};

export default ExampleBlockInspectorControls;
