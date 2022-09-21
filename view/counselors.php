<table class='form-table' role="presentation">
    <tbody>
        <tr>
            <th>
                <label for="counselor_name">Counselor Name</label>
            </th>
            <td>
                <input type="text" class="regular-text" placeholder="Add Counselor Name" name="counselor_name" value ="<?php echo Counselors_Controller::$counselorName ?>" disabled/>
            </td>
        </tr>
        <tr>
            <th>
                <label for="qualification">Qualification</label>
            </th>
            <td>
                <input type="text" class="regular-text" placeholder="Add Qualification" name="qualification" value ="<?php echo Counselors_Controller::$qualification ?>" disabled/>
            </td>
        </tr>
        <?php Controller::add_view("add-img"); ?>
    </tbody>
</table>
<br>
<br>