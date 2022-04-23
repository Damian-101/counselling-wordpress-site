<?php


class Customer_Options_Controller extends Add_Customer_Options{

    public static $imgUrl;
    public static $customerOptionName;

    function save_fields($post_id){
        update_post_meta(
            $post_id ,
            "img-url",
            $_POST['img_url']
        );
        update_post_meta(
            $post_id ,
            "customer-option-name",
            $_POST['customer_option_name']
        );
    }

    function custom_fields($post){
        self::$imgUrl = get_post_meta($post->ID,'img-url',true);
        self::$customerOptionName = get_post_meta($post->ID,'customer-option-name',true);

        Controller::add_view("customer-options","option-name");
    }
}
new Customer_Options_Controller;