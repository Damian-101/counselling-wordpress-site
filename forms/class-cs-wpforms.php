<?php

class Cs_Wpforms{
    function __construct(){
        add_action("wp_enqueue_scripts",array($this,"styles"));
        add_action("enqueue_block_editor_assets",array($this,"styles"));
        
    }
    /**
    * Add Styles (Front End / Guternberg)
    */
    function styles(){
        wp_enqueue_style( 'cs-wpforms-css', plugin_dir_url(__FILE__) . "assets/css/wp-forms.css", false );
    }
}
new Cs_Wpforms;