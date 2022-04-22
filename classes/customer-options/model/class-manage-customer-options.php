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
                Id int,
                OptionName varchar(255),
                OptionImageUrl varchar(255)
            )";
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