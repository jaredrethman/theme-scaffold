<?php
/**
 * Gutenberg Blocks setup
 *
 * @package ThemeScaffold\Blocks
 */

namespace TenUpScaffold\Blocks;

use TenUpScaffold\{
	enqueue
};

/**
 * Set up blocks
 *
 * @return void
 */
function setup() {
	$n = function( $function ) {
		return __NAMESPACE__ . "\\$function";
	};

	add_action( 'enqueue_block_editor_assets', $n( 'blocks_editor_scripts' ) );
	add_filter( 'block_categories', $n( 'blocks_categories' ), 10, 2 );
}

/**
 * Enqueue editor-only JavaScript/CSS for blocks.
 *
 * @return void
 */
function blocks_editor_scripts() {
	enqueue\script( 'blocks-editor', [ 'wp-data', 'wp-components', 'wp-i18n' ], true );
	enqueue\style( 'blocks-editor' );
}

/**
 * Filters the registered block categories.
 *
 * @param array  $categories Registered categories.
 * @param object $post       The post object.
 *
 * @return array Filtered categories.
 */
function blocks_categories( $categories, $post ) {
	if ( ! in_array( $post->post_type, array( 'post', 'page' ), true ) ) {
		return $categories;
	}

	return array_merge(
		$categories,
		array(
			array(
				'slug'  => 'tenup',
				'title' => __( 'Custom Blocks', 'tenup' ),
			),
		)
	);
}
