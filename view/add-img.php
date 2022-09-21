<!-- Option Reference Image -->
<tr>
    <th>
        <label for="img_url">Add Image</label>
    </th>
    <td>
        <div class="image-placeholder" id="prevImg" style="background-image:url('<?php echo Counselors_Controller::$imgUrl ?>')">
            <input id="imgUrl" name="img_url" type="hidden" />
        </div>
        <p>Note: Image Recommended Size Is 210 x 210 (px)</p>
        <button type="button" class="add-img button" id="addImg">Add Image</button>
    </td>
</tr>