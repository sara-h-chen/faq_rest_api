<?php

/**
 * gets the HTTP method, path and body of the request
 */
    $method = $_SERVER['REQUEST_METHOD'];
    $request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
    // if you are trying to upload a file to the webserver
    //$input = json_decode(file_get_contents('php://input'), true);
    
    $link = new PDO('sqlite:./data/topics.db') or die("Failed to open the database");
    $result = $link->query("SELECT * FROM faqs");
