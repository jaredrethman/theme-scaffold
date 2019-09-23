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
			<PanelBody title={__( 'Example Body Title:' )}>
				<SelectControl
					label={__( 'Content Type:' )}
					value={contentType}
					onChange={ contentType => setAttributes( { contentType } )}
					options={ types }
				/>
			</PanelBody>
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
