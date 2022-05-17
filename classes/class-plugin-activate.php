<?php
class Plugin_Activate{
    function __construct(){
        register_activation_hook(MAIN_FILE_PATH, array($this,"activate"));
    }
    function activate(){
        Manage_Customer_Options::initializeDatabase();
        Manage_Counselors::initializeDatabase();
    }
}

new Plugin_Activate;