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
		withSelect
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

	content = null === content ? <Spinner /> : content.map( ( v ) => {
		return (
			<li key={v.id}>
				<h3>{v.title.rendered}</h3>
				<span dangerouslySetInnerHTML={ { __html: v.excerpt.rendered } } />
			</li>
		);
	} );

	return (
		<div className='tenup-blocks-content-list__items'>
			<h4>{ __( 'Example Component:' ) }</h4>
			<ul>{content}</ul>
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

export default withSelect( (  select, { contentType }  ) => {
	return {
		content: select( 'core' ).getEntityRecords( 'postType', contentType, {
			// eslint-disable-next-line camelcase
			per_page: 5,
		} )
	};
} )( ExampleComponent );
