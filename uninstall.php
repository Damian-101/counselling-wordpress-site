<?php

if (!defined('WP_UNINSTALL_PLUGIN')) {
    die;
}
require_once(plugin_dir_path(__FILE__) . "counselling-site.php");


if ( defined( 'WP_UNINSTALL_PLUGIN' ) ) {
    ManageCustomerOptions::deinitializeDatabase();
}