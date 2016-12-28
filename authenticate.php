<?php
/**
 * Created by PhpStorm.
 * User: jrvh15
 * Date: 26/12/16
 * Time: 11:23
 */

/* CREATE LIST OF ALLOWED USERS */
$allowedUsers = array('dcs0spb', 'jrvh15');

if (in_array(($_SERVER['REMOTE_USER']).toLowerCase(), $allowedUsers)) {
    $cookieName = "auth_token";
    $createToken = "faq2016 " . date("Y-m-d") . " " . $_SERVER['REMOTE_ADDR'];
    //echo $createToken;
    $createToken = hash('sha256', $createToken);
    /* Stores cookies for 15 days */
    setcookie($cookieName, $createToken, time() + (86400 * 15), "/");
    header('Location: ../faq2016/admin.html');
} else {
    header('Location: ../faq2016/denied.html');
};