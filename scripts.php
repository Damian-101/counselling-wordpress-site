<?php
class Scripts {
    function __construct(){
        add_action("admin_enqueue_scripts",array($this,"add_admin_scripts"));
        add_action("wp_enqueue_scripts",array($this,"add_front_end_scripts"));
    }
    
    function add_admin_scripts(){
        wp_enqueue_style("customer-options-css",plugin_dir_url(__FILE__) . "view/css/customer-options.css");
        wp_enqueue_style("main-css-admin",plugin_dir_url(__FILE__) . "view/css/index.css");
        wp_enqueue_script("customer-options-js",plugin_dir_url(__FILE__) . "view/js/customer-options.js");
        wp_localize_script( "popup-custom-post-type", "post_count", [wp_count_posts('post')] );
        wp_enqueue_style('jquery', 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js');
        wp_enqueue_script('jquery1', 'https://code.jquery.com/jquery-3.6.0.min.js');
        wp_enqueue_script('jqueryui', 'https://code.jquery.com/ui/1.13.0/jquery-ui.min.js');
        wp_enqueue_script('media-upload');
        wp_enqueue_script('thickbox');
    }
    function add_front_end_scripts(){
        wp_enqueue_style("bekthemes-popup-css",plugin_dir_url(__FILE__) . "bekthemes-popup/assets/css/bekthemes-popup.css");
    }
}

new Scripts;