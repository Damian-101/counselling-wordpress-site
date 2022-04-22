<?php


class Customer_Options_Controller extends Add_Customer_Options{
    function custom_fields(){
        Controller::add_view("customer-options","option-name");
    }
}
new Customer_Options_Controller;