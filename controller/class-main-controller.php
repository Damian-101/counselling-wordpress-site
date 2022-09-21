<?php
class Controller {
    public static function add_view($fileName){
        require_once(PLUGIN_DIR_PATH . "view/$fileName.php");
    }
}


/**
 * customer options
 */
require_once(PLUGIN_DIR_PATH . "model/class-manage-customer-options.php");
require_once(PLUGIN_DIR_PATH . "hooks/class-add-customer-options.php");
require_once(PLUGIN_DIR_PATH . "controller/class-customer-options-controller.php");

/**
 * counselors
 */
require_once(PLUGIN_DIR_PATH . "model/class-manage-counselors.php");
require_once(PLUGIN_DIR_PATH . "hooks/class-add-counselors.php");
require_once(PLUGIN_DIR_PATH . "controller/class-counselors-controller.php");