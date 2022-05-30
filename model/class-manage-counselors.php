<?php
class Manage_Counselors{
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
        AND table_name = 'cs_counselors'",ARRAY_A);
        /**
         * If not create a new table
         */
        if(empty($results)){
            $sql = "CREATE TABLE cs_counselors(
                id int AUTO_INCREMENT PRIMARY KEY,
                PostId int NOT NULL UNIQUE,
                CounselorName varchar(255) NOT NULL,
                ImgUrl varchar(255) NOT NULL,
                Qualification varchar(255) NOT NULL
            )";
            $results = $wpdb->get_results($sql,ARRAY_A);
        }
     }


     static public function updateTheDatabase($postId,$counselorName,$imgUrl,$qualification){
        global $wpdb;
        if($postId && $counselorName && $qualification && $imgUrl){
            $counselorName = $wpdb->_real_escape($counselorName);
            $qualification = $wpdb->_real_escape($qualification);
            $imgUrl = $wpdb->_real_escape($imgUrl);
            $sql = "INSERT INTO cs_counselors (PostId,CounselorName,ImgUrl,Qualification) VALUES ('$postId','$counselorName','$imgUrl','$qualification') ON DUPLICATE KEY UPDATE CounselorName = VALUES(counselorName),ImgUrl = VALUES(imgUrl),Qualification = VALUES(qualification);";
            $results = $wpdb->get_results($sql,ARRAY_A);   
        }
     }
     /**
      * get values from the database 
      */
     static public function values(){
        global $wpdb;
        $sql = "SELECT * FROM cs_counselors";
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
            $sql = "DELETE FROM cs_counselors WHERE PostId = $postId";
            $results = $wpdb->get_results($sql,ARRAY_A);  
        }
     }

     static public function deinitializeDatabase(){
        /**
         * Drop The Table
        */
        $sql = "DROP TABLE cs_counselors";
        $results = $wpdb->get_results($sql,ARRAY_A);
     }
}