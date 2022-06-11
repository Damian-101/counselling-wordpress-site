<?php
/**
 * 	 ::::::::::::::::::ToDo::::::::::::::::::
 *	 Fetch and render the posts to the front end ::::::DONE
 *	 Add load more on scroll skeleton to the component
 *	 if needed === add a loading 
 */

class Cs_All_Articals_Block {
    public $scrolledToBottomCount;
    function __construct(){
        /**
         * Hooks
         */
            add_action( 'init', [$this,'block_supports'] );
    }

    function block_content( $block_attributes, $content ) {
        $post_arg = [
            'numberposts'      => 6,
            'category'         => 0,
            'orderby'          => 'date',
            'order'            => 'DESC',
            'include'          => array(),
            'exclude'          => array(),
            'meta_key'         => '',
            'meta_value'       => '',
            'post_type'        => 'post',
            'suppress_filters' => true,
        ];
        $posts = get_posts($post_arg);
        $nonStickyarticalHtmlArr = [];
        $stickyarticalHtmlArr = [];
        foreach ($posts as $post){
            $postThumbnailImgUrl = get_the_post_thumbnail_url($post->ID);
            $thumbnail_id = get_post_thumbnail_id($post->ID);
            $postThumbnailImgAlt = get_post_meta($thumbnail_id, '_wp_attachment_image_alt', true);
            $postTitle = get_the_title($post->ID);
            $postExcerpt = get_the_excerpt($post->ID);
            $postLink = get_permalink($post->ID);
            $isSticky = is_sticky($post->ID);
            if($isSticky === false){
                $nonStickyarticalHtmlArr[] = "<div class='cs-all-artical'>
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
            }else if($isSticky === true){
                $stickyarticalHtmlArr[] = "<div class='cs-all-artical'>
                <a href='$postLink;' class='cs-all-articals__link'>
                    <div class='cs-all-articals__artical'>
                        <img src='$postThumbnailImgUrl' alt='$postThumbnailImgAlt' class='cs-all-articals__artical-img' />
                        <div class='cs-all-articals__artical-bottom'>
                            <h4 class='cs-all-articals__artical-bottom__title'>$postTitle</h4>
                            <h6 class='cs-all-articals__artial-bottom__para'>$postExcerpt</h6>
                        </div>
                    </div>
                </a>
            </div>
            ";
            }
        }
        ob_start();
            ?>
            <div class='cs-all-articals-block container' id="ajax-posts">
                <div class='cs-all-articals'>
                    <?php
                        /**
                         * Sticky Posts
                         */
                        foreach ($stickyarticalHtmlArr as $artical){
                            echo $artical;
                        }
                        /**
                         * Other Posts
                         */
                        foreach ($nonStickyarticalHtmlArr as $artical){
                            echo $artical;
                        }
                    ?>
                </div>
                <button class="btn-content btn--dark btn--load-more btn--border" id="#more_posts">Load More</button>
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