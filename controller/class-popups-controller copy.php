<?php


class Popups_Controller extends Add_Popups{
    public static $popupImageurl;
    public static $popupHeading;
    public static $popupPara;
    public static $popupRedirectUrl;
    public static $popupRedirectUrlType;
    function save_fields($post_id){
        if(isset($_POST['popup_heading'])){
            update_post_meta(
                $post_id ,
                "popup-heading",
                $_POST['popup_heading']
            );
        }
        if(isset($_POST['popup_para'])){
            update_post_meta(
                $post_id ,
                "popup-para",
                $_POST['popup_para']
            );
        }
        if(isset($_POST['popup_redirect_url'])){
            update_post_meta(
                $post_id ,
                "popup-redirect-url",
                $_POST['popup_redirect_url']
            );
        }
        if(isset($_POST['popup_redirect_url_type'])){
            update_post_meta(
                $post_id ,
                "popup-redirect-url-type",
                $_POST['popup_redirect_url_type']
            );
        }
        if(isset($_POST['popup_image'])){
            update_post_meta(
                $post_id ,
                "popup-image",
                $_POST['popup_image']
            );
        }
    }

    function getThePosts(){

    }


    function custom_fields($post){
        self::$popupHeading = get_post_meta($post->ID,'popup-heading',true);
        self::$popupImageurl = get_post_meta($post->ID,'popup-image',true);
        self::$popupPara = get_post_meta($post->ID,'popup-para',true);
        self::$popupRedirectUrl = get_post_meta($post->ID,'popup-redirect-url',true);
        self::$popupRedirectUrlType = get_post_meta($post->ID,'popup-redirect-url-type',true);
        ?>
        <h1><?php echo self::$popupRedirectUrlType ?></h1>
        <form action="" >
            <table class='cs-popup-setting-setting form-table' role="presentation">
                    <tbody class='cs-popup-setting__config'>
                        <tr class="cs-popup-setting__config__input-wraper">
                            <th scope="row">
                                <label for="popup_heading">Heading</label>
                            </th>
                            <td>
                                <input name="popup_heading" type="text" class="regular-text" value='<?php echo self::$popupHeading?>'/>
                            </td>
                        <tr>
                        <tr class="cs-popup-setting__config__input-wraper">
                            <th scope="row">
                                <label for="popup_para">Paragraph</label>
                            </th>
                            <td>
                                <textarea name="popup_para" class="regular-text"><?php echo self::$popupPara?></textarea>
                            </td>
                        <tr>
                        <tr class="cs-popup-setting__config__input-wraper">
                            <th scope="row">
                                <label>Redirect Button</label>
                            </th>
                            <td>
                                <?php if ( self::$popupRedirectUrlType === 'link') : ?> 
                                    <input type="url" name="popup_redirect_url" value='<?php echo self::$popupRedirectUrl?>'/>
                                <?php elseif(self::$popupRedirectUrlType === 'page' || self::$popupRedirectUrlType === 'post') : ?>
                                    <select>
                                    <?php
                                        $args = array(
                                            'post_type'=> self::$popupRedirectUrlType,
                                            'orderby'    => 'ID',
                                            'order'    => 'DESC',
                                            'posts_per_page'   => -1,
                                            );
                                            $result = new WP_Query( $args );
                                            if ( $result-> have_posts() ) : ?>
                                            <?php while ( $result->have_posts() ) : $result->the_post(); ?>
                                                <option><?php the_title(); ?></option>
                                            <?php endwhile;
                                            endif; wp_reset_postdata(); ?>
                                    </select>
                                    <?php endif; ?>
                                <select name="popup_redirect_url_type" value='<?php echo self::$popupRedirectUrlType?> '>
                                    <option value="link" <?php if(self::$popupRedirectUrlType === 'link') : ?> selected="selected" <?php endif;?>>Link</option>
                                    <option value="post" <?php if(self::$popupRedirectUrlType === 'post') : ?> selected="selected" <?php endif;?>>Post</option>
                                    <option value="page" <?php if(self::$popupRedirectUrlType === 'page') : ?> selected="selected" <?php endif;?> >Page</option>
                                <select>
                                <p id="tagline-description" class="description">
                                    Keep The Field Blank Not To Add The Button
                                </p>
                            </td>
                        <tr>
                        <tr class="cs-popup-setting__config__input-wraper">
                            <th scope="row">
                                <label for="popup_image">Add Popup Image</label>
                            </th>
                            <td>
                                <input type="file" name="popup_image" accept="image/png, image/jpeg" value='<?php echo self::$popupImageurl?>'/>
                            </td>
                        <tr>
                    </tbody>
                </table>
        </form>
        <?php
    }
    function set_post_title($post_id){}
    function save_fields_to_database($post_id){
    }
    function delete_popup($post_id){}
}
new Popups_Controller;