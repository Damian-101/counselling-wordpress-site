<?php

class Customer_Options_Route {

    function __construct(){
        add_action( 'rest_api_init',array($this,'route_config'));
    }

    function route_config() {
        register_rest_route( 'cs/v2', '/customer_options', array(
          'methods' => 'GET',
          'callback' => [$this,'add_route'],
          'permission_callback' => '__return_true'
        ) );
      }
    function add_route(WP_REST_Request $data){
      $convertToJson = Manage_Customer_Options::values();
      return json_decode($convertToJson);
    }
    
}
new Customer_Options_Route;