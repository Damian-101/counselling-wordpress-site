<?php


class Counselors_Controller extends Add_Counselors{

    public static $imgUrl;
    public static $counselorName;
    public static $qualification;
    public static $imageSize = "210 x 210";

    function save_fields($post_id){
        if(isset($_POST['counselor_name'])){
            update_post_meta(
                $post_id ,
                "counselor-name",
                $_POST['counselor_name']
            );
        }
        if(isset($_POST['qualification'])){
            update_post_meta(
                $post_id ,
                "qualification",
                $_POST['qualification']
            );
        }
        if(isset($_POST['img_url'])){
            update_post_meta(
                $post_id ,
                "img-url",
                $_POST['img_url']
            );
        }
    }

    function save_fields_to_database($post_id){
        self::$counselorName = get_post_meta($post_id,'counselor-name',true);
        self::$imgUrl = get_post_meta($post_id,'img-url',true);
        self::$qualification = get_post_meta($post_id,'qualification',true);
        Manage_Counselors::updateTheDatabase($post_id,self::$counselorName,self::$imgUrl,self::$qualification);
    }

    function delete_counselor($post_id){
        Manage_Counselors::deleteValue($post_id);
    }

    function set_post_title($post_id){
        self::$counselorName = get_post_meta($post_id,'counselor-name',true);
        // unhook this function so it doesn't loop infinitely
        remove_action( 'save_post', [$this,'set_post_title'] );
        if(self::$counselorName){
            wp_update_post( array( 'ID' => $post_id, 'post_title' => self::$counselorName),true );
        }
        add_action( 'save_post', [$this,'set_post_title'] );

    }

    function custom_fields($post){
        self::$imgUrl = get_post_meta($post->ID,'img-url',true);
        self::$counselorName = get_post_meta($post->ID,'counselor-name',true);
        self::$qualification = get_post_meta($post->ID,'qualification',true);
        Controller::add_view("counselors");
    }

}
new Counselors_Controller;