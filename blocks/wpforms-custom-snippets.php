<?php
/*
Plugin Name: WPForms Custom Code Snippets
Plugin URI: https://wpforms.com/
Description: Plugin for adding custom code snippets
Author: WPForms Team
Version: 1.0
Author URI: https://wpforms.com/
*/

require_once(plugin_dir_path(__FILE__) . "forms/class-cs-forms.php");
class Cs_WpForms_Conifg extends Cs_Forms{
    function __construct(){
        add_action( 'wpforms_frontend_output_success',[$this,'on_output_success'], 10, 3);
        add_action("wp_enqueue_scripts",array($this,"add_styles"),9); 
        add_action("enqueue_block_editor_assets",array($this,"add_styles"),9); 
    }

    function add_styles(){
        wp_enqueue_style("cs_wpForms_styles",plugin_dir_url(__FILE__) . "forms/assets/css/wp-forms.css",array(),"1.0","all");
    }

    function add_scripts(){
        return null;
    }

    function on_output_success(  $form_data, $fields, $entry_id ) {
        // Reset the fields to blank
        unset(
        $_GET[ 'wpforms_return' ],
        $_POST[ 'wpforms' ][ 'id' ]
        );
    
        // If you want to preserve the user entered values in form fields - remove the line below.
        // unset( $_POST[ 'wpforms' ][ 'fields' ] );
    
        // Actually render the form.
        wpforms()->frontend->output( $form_data[ 'id' ] );
        //Render The Popup
        echo "<script>console.log('hello')</script>";
    }

}

new Cs_WpForms_Conifg;