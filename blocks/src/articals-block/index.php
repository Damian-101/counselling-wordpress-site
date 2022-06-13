<?php
/**
 * 	 ::::::::::::::::::ToDo::::::::::::::::::
 *	 Fetch and render the posts to the front end ::::::DONE
 *	 Add load more on scroll skeleton to the component
 *	 if needed === add a loading 
 *   check if there are more post and set the data-has-articals attribute ::::::DONE
 * 	 ::::::::::::::Need To Fix:::::::::::::::
 *   Post Are Not Loading Correctly ::::::DONE
 */

class Cs_All_Articals_Block {
    public $scrolledToBottomCount;
    function __construct(){
        /**
         * Hooks
         */
        add_action('wp_enqueue_scripts',[$this,'add_scripts']);
        add_action( 'init', [$this,'block_supports'] );
    }

    function add_scripts(){
        
        wp_localize_script( "articals-block-js", "post_count", [wp_count_posts('post')] );
    }
    function block_content( $block_attributes, $content ) {
        $stickyPosts = get_option("sticky_posts");
        $showPostCount = 6;
        if(count($stickyPosts) >= 6){
            $showPostCount = 1;
        }else{
            $showPostCount = $showPostCount - count($stickyPosts);
        }
        $posts = new WP_Query([
            'post_type' => 'post',
            'posts_per_page' => $showPostCount,
        ]);
        $postHtml = [];
        $stickyarticalHtmlArr = [];
        if($posts->have_posts()){
            while($posts->have_posts()){
                $post = $posts->the_post();
                $postId = get_the_ID();
                $postThumbnailImgUrl = get_the_post_thumbnail_url($postId);
                $thumbnail_id = get_post_thumbnail_id($postId);
                $postThumbnailImgAlt = get_post_meta($thumbnail_id, '_wp_attachment_image_alt', true);
                $postTitle = get_the_title($postId);
                $postExcerpt = get_the_excerpt($postId);
                $postLink = get_permalink($postId);
                    $postHtml[] = "<div class='cs-all-artical added_first' data-artical-name='$postTitle'>
                    <a href='$postLink;' class='cs-all-articals__link'>
                        <div class='cs-all-articals__artical'>
                            <img src='$postThumbnailImgUrl' alt='$postThumbnailImgAlt' class='cs-all-articals__artical-img' />
                            <div class='cs-all-articals__artical-bottom'>
                                <h4 class='cs-all-articals__artical-bottom__title'>$postTitle</h4>
                                <h6 class='cs-all-articals__artial-bottom__para'>$postExcerpt</h6>
                            </div>
                        </div>
                    </a>
                </div>";
            }
        }
        ob_start();
            ?>
            <div class='cs-all-articals-block container'>
                <?php 
                    $hasArticals;
                    if(count($postHtml) >= wp_count_posts('post')->{'publish'}){
                        $hasArticals = 'false';
                    }else{
                        $hasArticals = 'true';
                    }
                ?>
                <div class='cs-all-articals' id="cs_all_articals" data-has-articals=<?php echo $hasArticals ?>>
                    <?php
                        foreach ($postHtml as $artical){
                            echo $artical;
                        }
                    ?>
                </div>
                <?php
                if($hasArticals === 'true'){ ?>
                    <button class="btn-content btn--dark btn--load-more btn--border" id="load_posts">Load More</button><?php
                }?>
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