<?php
/**
 * Created by PhpStorm.
 * User: sara
 * Date: 18/12/16
 * Time: 16:14
 */

/**************************************************************************/
/*  Tutorial from: coreymaynard.com/blog/creating-a-restful-api-with-php  */
/**************************************************************************/

// Requests from the same server don't have a HTTP_ORIGIN header; this is internal rerouting
if (!array_key_exists('HTTP_ORIGIN', $_SERVER)) {
    $_SERVER['HTTP_ORIGIN'] = $_SERVER['SERVER_NAME'];
}

try {
    $API = new faq_api($_REQUEST['request'], $_SERVER['HTTP_ORIGIN']);
    echo $API->processAPI();
} catch (Exception $e) {
    echo json_encode(Array('error' => $e->getMessage()));
}
