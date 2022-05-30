<?php

class Counsellor_Route {

    function __construct(){
        add_action( 'rest_api_init',array($this,'route_config'));
    }

    function route_config() {
        register_rest_route( 'cs/v2', '/counsellor', array(
          'methods' => 'GET',
          'callback' => [$this,'add_route'],
          'permission_callback' => '__return_true'
        ) );
      }
    function add_route(WP_REST_Request $data){
      $convertToJson = Manage_Counselors::values();
      return json_decode($convertToJson);
    }
    
}
new Counsellor_Route;