<?php
class Scripts {
    function __construct(){
        add_action("admin_enqueue_scripts",array($this,"add_admin_scripts"));
    }
    
    function add_admin_scripts(){
        wp_enqueue_style("customer-options-css",plugin_dir_url(__FILE__) . "view/css/customer-options.css");
        wp_enqueue_script("customer-options-js",plugin_dir_url(__FILE__) . "view/js/customer-options.js");
        wp_enqueue_script("popup-custom-post-type",plugin_dir_url(__FILE__) . "view/js/popup-custom-post-type.js");
        wp_enqueue_script("main-css-admin",plugin_dir_url(__FILE__) . "view/css/index.css");
        wp_localize_script( "popup-custom-post-type", "post_count", [wp_count_posts('post')] );
        wp_enqueue_style('jquery', 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js');
        wp_enqueue_script('jquery1', 'https://code.jquery.com/jquery-3.6.0.min.js');
        wp_enqueue_script('jqueryui', 'https://code.jquery.com/ui/1.13.0/jquery-ui.min.js');
        wp_enqueue_script('media-upload');
        wp_enqueue_script('thickbox');
    }
}

new Scripts;