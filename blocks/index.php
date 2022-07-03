<?php
class Cs_Blocks_Config {
    function __construct(){
        add_action("enqueue_block_editor_assets",array($this,"admin_assets"));
        add_action("wp_enqueue_scripts",array($this,"frontend_assets"));
        add_action('wp_enqueue_scripts',[$this,'localize_scripts']);
    }
    function admin_assets(){
        wp_enqueue_script("class-all-articles",plugin_dir_url(__FILE__) . "src/articals-block/js/class-all-articles.js",array());
        wp_enqueue_script("newblocktype",plugin_dir_url(__FILE__) . "build/index.js",array("wp-blocks","wp-block-editor","class-all-articles"));
        wp_enqueue_style("css",plugin_dir_url(__FILE__) . "build/index.css",array());
        wp_enqueue_script("swiper-js","https://unpkg.com/swiper@8/swiper-bundle.min.js",array());
        wp_enqueue_script("counselors-block-carousel",plugin_dir_url(__FILE__) . "src/counselors-block/js/carousel.js",array("swiper-js","wp-blocks","wp-block-editor","newblocktype"));
        wp_enqueue_script("recommended-posts-block",plugin_dir_url(__FILE__) . "src/recommended-posts-block/js/add-posts.js",array("swiper-js","wp-blocks","wp-block-editor","newblocktype"));
        wp_localize_script( "newblocktype", "post_count", [wp_count_posts('post')] );
        wp_localize_script( "newblocktype", "thumbnailUrl", [get_the_post_thumbnail_url(get_the_ID())] );
    }
    function frontend_assets(){
        wp_enqueue_style("front-end",plugin_dir_url(__FILE__) . "build/index.css");
        wp_enqueue_script("swiper-js","https://unpkg.com/swiper@8/swiper-bundle.min.js",array());
        wp_enqueue_script("counselors-block-carousel",plugin_dir_url(__FILE__) . "src/counselors-block/js/carousel-front-end.js",array());
        wp_enqueue_script("recommended-posts-block",plugin_dir_url(__FILE__) . "src/recommended-posts-block/js/add-posts.js",array());
    }

    
    function localize_scripts(){
    }
}

new Cs_Blocks_Config;

require_once(plugin_dir_path(__FILE__) . "src/articals-block/index.php");
require_once(plugin_dir_path(__FILE__) . "src/counselors-block/index.php");
require_once(plugin_dir_path(__FILE__) . "src/post-img-block/index.php");