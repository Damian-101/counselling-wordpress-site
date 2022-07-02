<?php
class Post_Img {
    function __construct(){
        /**
         * Hooks
         */
        add_action( 'init', [$this,'block_supports'] );
    }
    function block_content( $attributes ) {
        ob_start();
            ?>
            <?php if($attributes['thumbnailImg'] === true) : ?>
                <img src='<?php echo get_the_post_thumbnail_url(get_the_ID()) ?>' alt='<?php echo get_post_meta ( get_the_ID(), '_wp_attachment_image_alt', true ); ?>' class='cs-article-img'/>
            <?php elseif(isset($attributes['img']) === true  ) : ?>
                <img src='<?php echo $attributes['img']['url']?>' alt='<?php echo $attributes['img']['alt']?>' class='cs-article-img'/>
            <?php endif ?>
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

New Post_Img();