<?php


class Popups_Controller extends Add_Popups{
    public static $imgUrl;
    public static $popupHeading;
    public static $popupPara;
    public static $popupRedirectUrl;
    public static $popupRedirectUrlType;
    public static $imageSize = "210 x 210";
    
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
        if(isset($_POST['img_url'])){
            update_post_meta(
                $post_id ,
                "popup-image",
                $_POST['img_url']
            );
        }
    }

    function getThePosts(){

    }


    function custom_fields($post){
        self::$popupHeading = get_post_meta($post->ID,'popup-heading',true);
        self::$imgUrl = get_post_meta($post->ID,'popup-image',true);
        self::$popupPara = get_post_meta($post->ID,'popup-para',true);
        self::$popupRedirectUrl = get_post_meta($post->ID,'popup-redirect-url',true);
        self::$popupRedirectUrlType = get_post_meta($post->ID,'popup-redirect-url-type',true);
        ?>
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
                            <td id="cs_redirect_button_link_wraper">
                                <input type="url" name="popup_redirect_url" value='<?php echo self::$popupRedirectUrl?>' id="cs_redirect_button_link"/>
                                <select id="popup_redirect_url_type_select" name="popup_redirect_url_type" value='<?php echo self::$popupRedirectUrlType?> '>
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
                                <?php Controller::add_view("add-img"); ?>
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