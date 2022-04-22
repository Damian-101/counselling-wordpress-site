<?php
class Controller {
    public static function add_view($folderName,$fileName){
        require_once(PLUGIN_DIR_PATH . "classes/$folderName/view/$fileName.php");
    }
}

require_once(PLUGIN_DIR_PATH . "classes/customer-options/model/class-manage-customer-options.php");
require_once(PLUGIN_DIR_PATH . "classes/customer-options/hooks/class-add-customer-options.php");
require_once(PLUGIN_DIR_PATH . "classes/customer-options/controller/class-customer-options-controller.php");