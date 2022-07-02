<?php

class Cs_Counselors_Block {
    public $scrolledToBottomCount;
    public $blockName = "cs/articals-block";
    function __construct(){
        /**
         * Hooks
         */
        add_action( 'init', [$this,'block_supports'] );
    }


    function block_content( $attributes,$content) {
        /**
         * fetch the counsellor values
         */
        $args = array(
            'post_type' => 'counselors',
            'post_status' => 'publish',
            'posts_per_page' => -1
        );
        $posts = new WP_Query( $args );
        /**
         * Attributes
         */
        $showCounselorInfo = filter_var($attributes['showCounselorInfo'], FILTER_VALIDATE_BOOLEAN);
        $hideCounselorInfo = filter_var($attributes['hideCounselorInfo'], FILTER_VALIDATE_BOOLEAN);
        ob_start();
        ?>
            <div class='cs-all-articals-block container'>
                <?php echo $content; ?>
                <div class="cs-counsellors">
                    <div class="swiper-wrapper">
                        <?php
                            while ( $posts->have_posts() ) : $posts->the_post();
                            ?>
                            <div class="swiper-slide">
                                <div class='cs-counsellors__counsellor' id="cs-articals-block">
                                <img src='<?php echo get_post_custom_values('img-url',$posts->ID)[0] ?>' class="cs-counsellors__counsellor-img" />
                                <?php if($showCounselorInfo){?>
                                    <h5 class="cs-counsellors__counsellor-name"><?php the_title(); ?></h5>
                                <?php } ?>
                                <?php if($showCounselorInfo === true && $hideCounselorInfo === false){?>
                                    <h6 class="cs-counsellors__counsellor-qualification"><?php echo get_post_custom_values('qualification',$posts->ID)[0] ?></h6>
                                <?php } ?>
                                </div>
                            </div>
                        <?php
                        endwhile;
                    ?>
                    </div>
                </div>
            </div>
        <?php
        return ob_get_clean();
    }

    
    
     
    function block_supports() {
        $block = dirname(__FILE__) . '/block.json';
        if ( ! function_exists( 'register_block_type' ) ) {
            //Block editor is not available.
            return;
        }
        register_block_type(
            $block,
            array(
                'render_callback'   => [$this,'block_content'],
            )
        );
    }
}

New Cs_Counselors_Block();