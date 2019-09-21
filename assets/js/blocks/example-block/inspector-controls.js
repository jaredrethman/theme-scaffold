/**
 * Content List Block Component.
 *
 * @package Clarion
 */

import React from 'react';
import PropTypes from 'prop-types';

const {
	components: {
		PanelBody,
		SelectControl,
	},
	i18n: {
		__
	},
	editor: {
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
function ExampleInspectorControls( { contentType, setAttributes } ) {

	return (
		<InspectorControls>
			<PanelBody title={__( 'Example Body Title:', 'clarion' )}>
				<SelectControl
					label={__( 'Content Type:' )}
					value={contentType}
					onChange={ contentType => setAttributes( { contentType } )}
					options={[
						{
							value: 'post',
							label: __( 'Post' ),
						},
						{
							value: 'page',
							label: __( 'Page' ),
						}
					]}
				/>
			</PanelBody>
		</InspectorControls>
	);
}

ExampleInspectorControls.propTypes = {
	contentType: PropTypes.string,
	setAttributes: PropTypes.func.isRequired,
};

ExampleInspectorControls.defaultProps = {
	contentType: 'post',
};

export default ExampleInspectorControls;
