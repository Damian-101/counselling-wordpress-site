        <!-- Option Reference Image -->
<!-- <p>Note: Image Recommended Size Is 230 x 188 (px)</p>
<div class="image-placeholder" id="prevImg" style="background-image:url('<?php echo Customer_Options_Controller::$imgUrl ?>')">
    <button type="button" class="add-img" id="addImg">Add Image</button>
    <input id="imgUrl" name="img_url" type="hidden"/>
</div> -->
<!-- Option Name -->
<label>Option Name</label>
<input type="text" placeholder="Add Option Name" name="customer_option_name" value ="<?php echo Customer_Options_Controller::$customerOptionName ?>"/>
<br>
<button type="submit" class="button button-primary cs-submit-btn">Update</button>