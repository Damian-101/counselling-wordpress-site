<?php

/**
 * Create A Custom Post Type Sections To Add Block Settings
 */

Abstract class Add_Popups{
    //controller
    function __construct(){
        add_action("init",[$this,"create_custom_post_type"]);
        add_action("add_meta_boxes",[$this,'add_custom_fields'],2);
        add_action("save_post",[$this,"save_fields"]);
        add_action('save_post',array($this,"set_post_title"));
        add_action('save_post',array($this,"save_fields_to_database"));
        add_action('delete_post',array($this,"delete_popup"));
    }

    function create_custom_post_type() {
        $labels = array(
            'name' => _x( 'popups', 'Post Type General Name', 'textdomain' ),
            'singular_name' => _x( 'Popup', 'Post Type Singular Name', 'textdomain' ),
            'menu_name' => _x( 'popups', 'Admin Menu text', 'textdomain' ),
            'name_admin_bar' => _x( 'popups', 'Add New on Toolbar', 'textdomain' ),
            'archives' => __( 'Popup Archives', 'textdomain' ),
            'attributes' => __( 'Popup Attributes', 'textdomain' ),
            'parent_item_colon' => __( 'Parent Popup:', 'textdomain' ),
            'all_items' => __( 'All popups', 'textdomain' ),
            'add_new_item' => __( 'Add New Popup', 'textdomain' ),
            'add_new' => __( 'Add New', 'textdomain' ),
            'new_item' => __( 'New Popup', 'textdomain' ),
            'edit_item' => __( 'Edit Popup', 'textdomain' ),
            'update_item' => __( 'Update Popup', 'textdomain' ),
            'view_item' => __( 'View Popup', 'textdomain' ),
            'view_items' => __( 'View popups', 'textdomain' ),
            'search_items' => __( 'Search Popup', 'textdomain' ),
            'not_found' => __( 'Not found', 'textdomain' ),
            'not_found_in_trash' => __( 'Not found in Trash', 'textdomain' ),
            'featured_image' => __( 'Featured Image', 'textdomain' ),
            'set_featured_image' => __( 'Set featured image', 'textdomain' ),
            'remove_featured_image' => __( 'Remove featured image', 'textdomain' ),
            'use_featured_image' => __( 'Use as featured image', 'textdomain' ),
            'insert_into_item' => __( 'Insert into Popup', 'textdomain' ),
            'uploaded_to_this_item' => __( 'Uploaded to this Popup', 'textdomain' ),
            'items_list' => __( 'popups list', 'textdomain' ),
            'items_list_navigation' => __( 'popups list navigation', 'textdomain' ),
            'filter_items_list' => __( 'Filter popups list', 'textdomain' ),
        );
        $args = array(
            'label' => __( 'Popup', 'textdomain' ),
            'description' => __( '', 'textdomain' ),
            'labels' => $labels,
            'menu_icon' => 'dashicons-tag',
            'supports' => array( ''),
            'taxonomies' => array(),
            'public' => true,
            'title' => true,
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
        register_post_type( 'popups', $args );
    }
    //add custom fields
    function add_custom_fields(){
		add_meta_box(
			'popups',
			'popups',
			array($this,'custom_fields'),
			'popups',
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
    Abstract function delete_popup($post_id);
}