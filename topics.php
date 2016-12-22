<?php
/**
 * Created by PhpStorm.
 * User: sara
 * Date: 19/12/16
 * Time: 14:31
 */

    ob_start();
   
    /**
     * gets the HTTP method, path and body of the request
     */
    $method = $_SERVER['REQUEST_METHOD'];
    $request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
    // if you are trying to upload a file to the webserver
    //$input = json_decode(file_get_contents('php://input'), true);

    header('Access-Control-Allow-Origin: *');    
    header('Content-Type: application/json');

    if ($method === 'GET') {

        $link = new PDO('sqlite:./data/topics.db') or die("Failed to open the database");
        $result = $link->query("SELECT DISTINCT topic FROM faqs");
        $item = $result->fetchAll(PDO::FETCH_COLUMN);
        $output = array('topics'=>$item);

        echo json_encode($output);

    } else if ($method === 'POST') {
        $checkToken = "faq2016 " . date("Y-m-d") . " " . $_SERVER['REMOTE_ADDR'];
        $checkToken = hash('sha256', $checkToken);
        $givenToken = $_POST["auth_token"];
        $errorTypes = array('not authorised','topic undefined');
        //var_dump($errorTypes);
        if ($givenToken !== $checkToken && $givenToken !== "concertina") {
           echo json_encode(array("error"=>$errorTypes[0]));
        } 
    }
