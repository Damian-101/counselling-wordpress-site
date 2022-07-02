<?php
class Cs_All_Articals_Block {
    public $scrolledToBottomCount;
    public $blockName = "cs/articals-block";
    function __construct(){
        /**
         * Hooks
         */
        add_action('wp_enqueue_scripts',[$this,'add_scripts']);
        add_action( 'init', [$this,'block_supports'] );
        add_action("enqueue_block_editor_assets",array($this,"admin_assets"));
    }

    function add_scripts(){
        if(has_block($this->blockName)){
            wp_enqueue_script("class-all-articles",plugin_dir_url(__FILE__) . "js/class-all-articles.js",array());
        wp_enqueue_script("articals-block-js",plugin_dir_url(__FILE__) . "js/articals-block.js",array("class-all-articles",'wp-util'));   
        }
        wp_localize_script( "articals-block-js", "post_count", [wp_count_posts('post')] );
        wp_localize_script( 'articals-block-js', 'my_ajax_object', array( 'ajax_url' => admin_url( 'admin-ajax.php' ) ) );
    }

    function admin_assets(){
        wp_localize_script( "newblocktype", "post_count", [wp_count_posts('post')] );
    }
    function block_content( $attributes ) {
        ob_start();
            ?>
            <div class='cs-all-articals-block container'>
                <div class='cs-all-articals' id="cs_all_articals" 
                    data-align="<?php echo $attributes['align'] ?>" 
                    data-ininit-scroll = "<?php echo $attributes['infinitScroll'] ? 1 : 0 ?>" 
                    data-show-excerpt = "<?php echo $attributes['showExcerpt'] ? 1 : 0 ?>">
                </div>
                <div id="cs_pagination"></div>
            </div>
        <?php
        return ob_get_clean();
    }

    
    
     
    function block_supports() {
        $styleSheetUrl = dirname(__FILE__) . '/block.json';
        if ( ! function_exists( 'register_block_type' ) ) {
            // Block editor is not available.
            return;
        }
        register_block_type(
            $styleSheetUrl,
            array(
                'render_callback'   => [$this,'block_content'],
            )
        );
    }
}

New Cs_All_Articals_Block();