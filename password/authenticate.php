<?php
/**
 * Created by PhpStorm.
 * User: jrvh15
 * Date: 26/12/16
 * Time: 11:23
 */

/* CREATE LIST OF ALLOWED USERS */

header('Content-Type: application/json');

$allowedUsers = array('dcs0spb', 'jrvh15');

if (in_array(strtolower($_SERVER['REMOTE_USER']), $allowedUsers)) {
    $cookieName = "auth_token";
    $createToken = "faq2016 " . date("Y-m-d") . " " . $_SERVER['REMOTE_ADDR'];
    $createToken = hash('sha256', $createToken);
    /* Stores cookies for 15 days */
    setcookie($cookieName, $createToken, time() + (86400 * 15), "/");
    echo json_encode(array("success"=>"authorised"));
} else {
    echo json_encode(array("error"=>"not authorised"));
};
