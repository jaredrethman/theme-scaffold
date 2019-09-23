/**
 * window.wp object override for Jest global.wp.
 *
 * @package TenUpThemeScaffold
 */

/**
 * Dependencies
 */
// WordPress
import * as i18n from '@wordpress/i18n';
import * as data from '@wordpress/data';
import * as hooks from '@wordpress/hooks';
import * as editor from '@wordpress/editor';
import * as blocks from '@wordpress/blocks';
import * as components from '@wordpress/components';
import * as blockEditor from '@wordpress/block-editor';

/**
 * Export overridden wp object.
 */
export default {
	i18n,
	editor,
	hooks,
	blocks,
	components,
	blockEditor,
	data: {
		...data,
		...{
			/**
			 * Mock wp.data.select()
			 */
			select( store ) {
				return {

					/**
					 * wp.data.select().getEntityRecords().
					 *
					 * @param type
					 * @returns {*[]}
					 */
					getEntityRecords(type) {
						if (type === 'postType') {
							return [
								{
									id: 1,
									title: {rendered: i18n.__('Title One', 'theme-scaffold')},
									excerpt: {rendered: i18n.sprintf('<p>%s</p>', i18n.__('Test Excerpt', 'theme-scaffold'))},
								},
								{
									id: 2,
									title: {rendered: i18n.__('Title Two', 'theme-scaffold')},
									excerpt: {rendered: ''},
								}
							];
						}
					}
				}
			}
		}
	}
};
