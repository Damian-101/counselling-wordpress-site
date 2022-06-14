<?php
/**
 *  ::::::::::::::::::ToDo::::::::::::::::::
 *  Add Load More Feature (use .php file to render the html.Use js only to get pageCount)
 *  Make sure only displaying post for the number of postPerLoad
 *  ::::::::::::::Need To Fix:::::::::::::::
 */

class Cs_All_Articals_Block {
    public $scrolledToBottomCount;
    function __construct(){
        /**
         * Hooks
         */
        add_action('wp_enqueue_scripts',[$this,'add_scripts']);
        add_action( 'init', [$this,'block_supports'] );
        add_action("enqueue_block_editor_assets",array($this,"admin_assets"));
    }

    function add_scripts(){
        wp_localize_script( "articals-block-js", "post_count", [wp_count_posts('post')] );
        wp_localize_script( 'articals-block-js', 'my_ajax_object', array( 'ajax_url' => admin_url( 'admin-ajax.php' ) ) );
    }

    function admin_assets(){
        wp_localize_script( "newblocktype", "post_count", [wp_count_posts('post')] );
    }
    function block_content( $block_attributes, $content ) {
        ob_start();
            ?>
            <div class='cs-all-articals-block container'>
                <div class='cs-all-articals' id="cs_all_articals">
                    <?php
                        // foreach ($postHtml as $artical){
                        //     echo $artical;
                        // }
                    ?>
                </div>
                <button class="btn-content btn--dark btn--load-more btn--border" id="load_posts">Load More</button>
            </div>
        <?php
        return ob_get_clean();
    }

    
    
     
    function block_supports() {
        $styleSheetUrl = plugin_dir_url(__FILE__) . "scss/index.css";
        if ( ! function_exists( 'register_block_type' ) ) {
            // Block editor is not available.
            return;
        }
        register_block_type(
            'cs/articals-block',
            array(
                'api_version'       => 2,
                'title' => "Articals Block",
                'render_callback'   => [$this,'block_content'],
                'category' => "text",
                'style' => 'cs-all-articals',
            )
        );
    }
}

New Cs_All_Articals_Block();