<?php


class Customer_Options_Controller extends Add_Customer_Options{

    public static $imgUrl;
    public static $customerOptionName;

    function save_fields($post_id){
        if($_POST['img_url']){
            update_post_meta(
                $post_id ,
                "img-url",
                $_POST['img_url']
            );
        }
        if($_POST['customer_option_name']){
            update_post_meta(
                $post_id ,
                "customer-option-name",
                $_POST['customer_option_name']
            );
        }
    }

    function save_fields_to_database($post_id){
        self::$imgUrl = get_post_meta($post_id,'img-url',true);
        self::$customerOptionName = get_post_meta($post_id,'customer-option-name',true);
        Manage_Customer_Options::updateTheDatabase($post_id,self::$customerOptionName,self::$imgUrl);
    }

    function set_post_title($post_id){
        self::$customerOptionName = get_post_meta($post_id,'customer-option-name',true);
        // echo "<script>alert('$a')</script>";
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
        Controller::add_view("customer-options","option-name");
    }

}
new Customer_Options_Controller;