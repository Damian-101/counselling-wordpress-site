<?php

class Cs_Blocks_Config {
    function __construct(){
        add_action("enqueue_block_editor_assets",array($this,"admin_assets"));
        add_action("wp_enqueue_scripts",array($this,"frontend_assets"),false);
        add_action('admin_enqueue_scripts', array($this,"csbackend") );
    }
    function admin_assets(){
        wp_enqueue_script("newblocktype",plugin_dir_url(__FILE__) . "build/index.js",array("wp-blocks","wp-block-editor"));
        wp_enqueue_style("css",plugin_dir_url(__FILE__) . "build/index.css",array());
        wp_enqueue_script("swiper-js","https://unpkg.com/swiper@8/swiper-bundle.min.js",array());
        wp_enqueue_script("counselors-block-carousel",plugin_dir_url(__FILE__) . "src/counselors-block/js/carousel.js",array("swiper-js","wp-blocks","wp-block-editor","newblocktype"));
        wp_enqueue_script("recommended-posts-block",plugin_dir_url(__FILE__) . "src/recommended-posts-block/js/add-posts.js",array("swiper-js","wp-blocks","wp-block-editor","newblocktype"));
        // wp_enqueue_script("articals-block",plugin_dir_url(__FILE__) . "src/articals-block/js/articals-block.js",array());
    }
    function frontend_assets(){
        $suffix = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '.min';
        wp_enqueue_script( 'react', 'https://cdnjs.cloudflare.com/ajax/libs/react/0.14.3/react' . $suffix . '.js', array(), null );
        wp_enqueue_script( 'react-dom', 'https://cdnjs.cloudflare.com/ajax/libs/react/0.14.3/react-dom' . $suffix . '.js', array( 'react' ), null );
        // Add Babel file
        wp_enqueue_script( 'babel', 'https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser' . $suffix . '.js', array(), null );
        wp_enqueue_style("front-end-css",plugin_dir_url(__FILE__) . "build/index.css",array());
        wp_enqueue_script("articals-block",plugin_dir_url(__FILE__) . "src/articals-block/js/articals-block.js",array('react','react-dom','babel','wp-element'),false);
        wp_enqueue_script("swiper-js","https://unpkg.com/swiper@8/swiper-bundle.min.js",array());
        wp_enqueue_script("counselors-block-carousel",plugin_dir_url(__FILE__) . "src/counselors-block/js/carousel.js",array());
        wp_enqueue_script("recommended-posts-block",plugin_dir_url(__FILE__) . "src/recommended-posts-block/js/add-posts.js",array());
    }
    function csbackend(){
        wp_enqueue_script("articals-blocks",plugin_dir_url(__FILE__) . "src/articals-block/js/articals-block.js",array("wp-element"),null,true);
    }
}

new Cs_Blocks_Config;