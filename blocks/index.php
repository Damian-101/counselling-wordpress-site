<?php

class Cs_Blocks_Config {
    function __construct(){
        add_action("enqueue_block_editor_assets",array($this,"admin_assets"));
        add_action("wp_enqueue_scripts",array($this,"frontend_assets"),false);
    }
    function admin_assets(){
        wp_enqueue_script("newblocktype",plugin_dir_url(__FILE__) . "build/index.js",array("wp-blocks","wp-block-editor"));
        wp_enqueue_style("css",plugin_dir_url(__FILE__) . "build/index.css",array());
    }
    function frontend_assets(){
        wp_enqueue_style("front-end-css",plugin_dir_url(__FILE__) . "build/index.css",array());
    }
}

new Cs_Blocks_Config;