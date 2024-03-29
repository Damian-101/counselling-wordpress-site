<?php
class Manage_Customer_Options{
    /**
     * Manage Customer Options
     */

     /**
      * Initialize The Database
      */
        public static function initializeDatabase(){
         global $wpdb;
        /**
         * Check if the tabel exist
         */
        $results = $wpdb->get_results("SELECT * FROM information_schema.tables 
        WHERE table_schema = 'wordpress' 
        AND table_name = 'cs_customer_options'",ARRAY_A);
        /**
         * If not create a new table
         */
        if(empty($results)){
            $sql = "CREATE TABLE cs_customer_options(
                id int AUTO_INCREMENT PRIMARY KEY,
                PostId int NOT NULL UNIQUE,
                OptionName varchar(255) NOT NULL
            )";
            $results = $wpdb->get_results($sql,ARRAY_A);
        }
     }


     static public function updateTheDatabase($postId,$optionName){
        global $wpdb;
        if($postId && $optionName){
            $sql = "INSERT INTO cs_customer_options (PostId,OptionName) VALUES ('$postId','$optionName') ON DUPLICATE KEY UPDATE OptionName = VALUES(optionName)";
            $results = $wpdb->get_results($sql,ARRAY_A);   
        }
     }
     /**
      * get values from the database 
      */
     static public function values(){
        global $wpdb;
        $sql = "SELECT * FROM cs_customer_options";
        $results = $wpdb->get_results($sql,ARRAY_A);
        /**
         * covert to json
         */
        $results = json_encode($results,JSON_NUMERIC_CHECK);
        return $results;
     }


     /**
      * Remove Row
      */
     static public function deleteValue($postId) {
        global $wpdb;
        if($postId){
            $sql = "DELETE FROM cs_customer_options WHERE PostId = $postId";
            $results = $wpdb->get_results($sql,ARRAY_A);  
        }
     }

     static public function deinitializeDatabase(){
        /**
         * Drop The Table
        */
        $sql = "DROP TABLE cs_customer_options";
        $results = $wpdb->get_results($sql,ARRAY_A);
     }
}