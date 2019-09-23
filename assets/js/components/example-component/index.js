/**
 * Example Component.
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
	data: {
		select,
		withSelect,
	},
	components: {
		Spinner
	},
	i18n: {
		__
	}
} = wp;

/**
 * Example Component.
 *
 * @param entities
 * @returns {*}
 * @constructor
 */
function ExampleComponent( { content } ) {

	const contentReturn = null !== content ? ( 1 > content.length ? '' : content.map( ( v ) => {
		return (
			<li key={v.id}>
				<h4>{v.title.rendered}</h4>
				<span dangerouslySetInnerHTML={ { __html: v.excerpt.rendered } } />
			</li>
		);
	} ) ) : <Spinner />;

	return (
		<div className='tenup-blocks-content-list__items'>
			<h3>{ __( 'Example Component:', 'theme-scaffold' ) }</h3>
			<ul>{contentReturn}</ul>
		</div>
	);
}

/**
 * Example Component propTypes.
 * @type {{content: *}}
 */
ExampleComponent.propTypes = {
	content: PropTypes.arrayOf(
		PropTypes.shape( {
			title: PropTypes.shape( {
				rendered: PropTypes.string,
			} ),
			excerpt: PropTypes.shape( {
				rendered: PropTypes.string,
			} ),
		} )
	),
};
/**
 * Example Component defaultProps
 * @type {{content: []}}
 */
ExampleComponent.defaultProps = {
	content: [],
};

export default withSelect( (  __select, { contentType, content }  ) => {
	if( null === content ){
		return {
			content
		};
	}
	return {
		// Ensure we don't use the argument version
		content: select( 'core' ).getEntityRecords( 'postType', contentType, {
			// eslint-disable-next-line camelcase
			per_page: 5,
		} )
	};
} )( ExampleComponent );
