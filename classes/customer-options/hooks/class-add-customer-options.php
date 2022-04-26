<?php

/**
 * Create A Custom Post Type Sections To Add Block Settings
 */

Abstract class Add_Customer_Options{
    //controller
    function __construct(){
        add_action("init",[$this,"create_custom_post_type"]);
        add_action("add_meta_boxes",[$this,'add_custom_fields'],2);
        add_action("save_post",[$this,"save_fields"]);
        add_action('save_post',array($this,"set_post_title"));
        add_action('save_post',array($this,"save_fields_to_database"));
    }

    function create_custom_post_type() {
        $labels = array(
            'name' => _x( 'Customer Options', 'Post Type General Name', 'textdomain' ),
            'singular_name' => _x( 'Customer Option', 'Post Type Singular Name', 'textdomain' ),
            'menu_name' => _x( 'Customer Options', 'Admin Menu text', 'textdomain' ),
            'name_admin_bar' => _x( 'Customer Options', 'Add New on Toolbar', 'textdomain' ),
            'archives' => __( 'Customer Option Archives', 'textdomain' ),
            'attributes' => __( 'Customer Option Attributes', 'textdomain' ),
            'parent_item_colon' => __( 'Parent Customer Option:', 'textdomain' ),
            'all_items' => __( 'All Customer Options', 'textdomain' ),
            'add_new_item' => __( 'Add New Customer Option', 'textdomain' ),
            'add_new' => __( 'Add New', 'textdomain' ),
            'new_item' => __( 'New Customer Option', 'textdomain' ),
            'edit_item' => __( 'Edit Customer Option', 'textdomain' ),
            'update_item' => __( 'Update Customer Option', 'textdomain' ),
            'view_item' => __( 'View Customer Option', 'textdomain' ),
            'view_items' => __( 'View Customer Options', 'textdomain' ),
            'search_items' => __( 'Search Customer Option', 'textdomain' ),
            'not_found' => __( 'Not found', 'textdomain' ),
            'not_found_in_trash' => __( 'Not found in Trash', 'textdomain' ),
            'featured_image' => __( 'Featured Image', 'textdomain' ),
            'set_featured_image' => __( 'Set featured image', 'textdomain' ),
            'remove_featured_image' => __( 'Remove featured image', 'textdomain' ),
            'use_featured_image' => __( 'Use as featured image', 'textdomain' ),
            'insert_into_item' => __( 'Insert into Customer Option', 'textdomain' ),
            'uploaded_to_this_item' => __( 'Uploaded to this Customer Option', 'textdomain' ),
            'items_list' => __( 'Customer Options list', 'textdomain' ),
            'items_list_navigation' => __( 'Customer Options list navigation', 'textdomain' ),
            'filter_items_list' => __( 'Filter Customer Options list', 'textdomain' ),
        );
        $args = array(
            'label' => __( 'Customer Option', 'textdomain' ),
            'description' => __( '', 'textdomain' ),
            'labels' => $labels,
            'menu_icon' => 'dashicons-tag',
            'supports' => array( ''),
            'taxonomies' => array(),
            'public' => true,
            'show_ui' => true,
            'show_in_menu' => true,
            'menu_position' => 5,
            'show_in_admin_bar' => true,
            'show_in_nav_menus' => true,
            'can_export' => true,
            'has_archive' => true,
            'hierarchical' => false,
            'exclude_from_search' => false,
            'show_in_rest' => true,
            'publicly_queryable' => true,
            'capability_type' => 'post',
        );
        register_post_type( 'customer_option', $args );
    }
    //add custom fields
    function add_custom_fields(){
		add_meta_box(
			'customer_option',
			'Customer Option',
			array($this,'custom_fields'),
			'customer_option',
			'normal',
			'low',
			''
		);
	}

    //show custom fields
    Abstract function custom_fields($post);
    Abstract function save_fields($post_id);
    Abstract function set_post_title($post_id);
    Abstract function save_fields_to_database($post_id);
}