<?php
/**
 * The template for displaying the header.
 *
 * @package TenUpScaffold
 */

?>
<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js">
	<head>
		<meta charset="<?php bloginfo( 'charset' ); ?>" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<meta name="theme-color" content="#d23226" />
		<?php wp_head(); ?>
	</head>
	<body <?php body_class(); ?>>
		<?php wp_body_open(); ?>
		<h1><?php bloginfo( 'name' ); ?></h1>
		<?php /** Below test url-loader, will be inline */ ?>
		<div class="url-loader-test-svg"></div>
		<?php /** Below tests url-loader & purgeCss, see wp.theme.config.js */ ?>
		<div class="url-loader-test-<?php echo true ? 'png' : ''; ?>"></div>
