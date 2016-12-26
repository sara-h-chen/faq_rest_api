<?php
/**
 * Created by PhpStorm.
 * User: jrvh15
 * Date: 26/12/16
 * Time: 11:23
 */

/* CREATE LIST OF ALLOWED USERS */
$allowedUsers = array('dcs0spb', 'jrvh15');


if (in_array($_SERVER['REMOTE USER'],$allowedUsers)) {
    $cookieName = "authentication";
    $createToken = "faq2016 " . date("Y-m-d") . " " . $_SERVER['REMOTE_ADDR'];
    $createToken = hash('sha256', $createToken);
    setcookie($cookieName, $createToken, time() + (86400 * 30), "/");
} else {
    echo ("Error: Authentication failed");
};