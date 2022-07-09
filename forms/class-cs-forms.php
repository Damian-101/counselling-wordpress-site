<?php
/**
 * This class will help to add theme functionality to
 * form plugin
 */
abstract class Cs_Forms {
    /**
     * Add Styling
     */
    abstract function add_styles();
    /**
     * Add Scripts
     */
    abstract function add_scripts();


    /**
     * Features
     */
    function popup($formId){
        /**
         * Loop and check if the current form id is defined in any of the 
         * popup custom post types.
         */
        if($formId === $popupsCustomPostTypeId): ?>
            <h1>Popup<h1>
        <?php endif;
    }

}

