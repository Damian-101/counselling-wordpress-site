<?php
/**
 * Plugin Name: Counselling Site
 */

/**
 * Variables
 */
define("MAIN_FILE_PATH",__FILE__);

/**
 * Add Constants
 */
require_once(plugin_dir_path(__FILE__) . "constants.php");

/**
 * Add Scripts
 */
require_once(PLUGIN_DIR_PATH . "scripts.php");

/**
 * On plugin activate
 */
require_once(PLUGIN_DIR_PATH . "classes/class-plugin-activate.php");

/**
 * Contollers
 */
require_once(PLUGIN_DIR_PATH . "controller/class-main-controller.php");

/**
 * Routes
 */
require_once(PLUGIN_DIR_PATH . "routes/class-customer-options-route.php");
require_once(PLUGIN_DIR_PATH . "routes/class-counsellor-route.php");

/**
 * Blocks
 */
require_once(PLUGIN_DIR_PATH . "blocks/index.php");
