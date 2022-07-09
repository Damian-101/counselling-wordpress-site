<?php


class Customer_Options_Controller extends Add_Customer_Options{

    public static $imgUrl;
    public static $customerOptionName;
    public static $imageSize = "610 x 610";

    function save_fields($post_id){
        if(isset($_POST['customer_option_name'])){
            update_post_meta(
                $post_id ,
                "customer-option-name",
                $_POST['customer_option_name']
            );
        }
    }

    function save_fields_to_database($post_id){
        self::$customerOptionName = get_post_meta($post_id,'customer-option-name',true);
        Manage_Customer_Options::updateTheDatabase($post_id,self::$customerOptionName);
    }

    function delete_customer_option($post_id){
        Manage_Customer_Options::deleteValue($post_id);
    }

    function set_post_title($post_id){
        self::$customerOptionName = get_post_meta($post_id,'customer-option-name',true);
        // unhook this function so it doesn't loop infinitely
        remove_action( 'save_post', [$this,'set_post_title'] );
        if(self::$customerOptionName){
            wp_update_post( array( 'ID' => $post_id, 'post_title' => self::$customerOptionName),true );
        }
        add_action( 'save_post', [$this,'set_post_title'] );

    }

    function custom_fields($post){
        self::$imgUrl = get_post_meta($post->ID,'img-url',true);
        self::$customerOptionName = get_post_meta($post->ID,'customer-option-name',true);
        Controller::add_view("option-name");
    }

}
new Customer_Options_Controller;