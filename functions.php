<?php
/**
 * WP Theme constants and setup functions
 *
 * @package TenUpScaffold
 */

namespace TenUpScaffold;

/**
 * Constants
 */
/** Runtime */
define( __NAMESPACE__ . '\URL', trailingslashit( get_template_directory_uri() ) );
/** Compile time */
const VER      = '0.1.0';
const PATH     = __DIR__ . '/';
const PATH_INC = PATH . 'includes/';

/**
 * Requires
 */
require_once PATH_INC . 'assets.php';
require_once PATH_INC . 'core.php';
require_once PATH_INC . 'overrides.php';
require_once PATH_INC . 'template-tags.php';
require_once PATH_INC . 'utility.php';
require_once PATH_INC . 'blocks.php';

// Run the setup functions.
Core\setup();
Blocks\setup();

// Require Composer autoloader if it exists.
if ( file_exists( PATH . 'vendor/autoload.php' ) ) {
	require_once 'vendor/autoload.php';
}

if ( ! function_exists( 'wp_body_open' ) ) {

	/**
	 * Shim for the the new wp_body_open() function that was added in 5.2
	 */
	function wp_body_open() {
		do_action( 'wp_body_open' );
	}
}
