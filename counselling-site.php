<?php
/**
 * Plugin Name: Counselling Site
 */


define("MAIN_FILE_PATH",__FILE__);
//Add Constants
require_once(plugin_dir_path(__FILE__) . "constants.php");
//Add Scripts
require_once(PLUGIN_DIR_PATH . "scripts.php");
require_once(PLUGIN_DIR_PATH . "classes/class-plugin-activate.php");

// contollers 
require_once(PLUGIN_DIR_PATH . "classes/customer-options/controller/class-main-controller.php");
