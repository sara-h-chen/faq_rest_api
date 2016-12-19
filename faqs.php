<?php

/**
 * gets the HTTP method, path and body of the request
 */
    $method = $_SERVER['REQUEST_METHOD'];
    $request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
    // if you are trying to upload a file to the webserver
    //$input = json_decode(file_get_contents('php://input'), true);
    
    $link = new PDO('sqlite:./data/topics.db') or die("Failed to open the database");
    $result = $link->query("SELECT DISTINCT topic FROM faqs");
    $item = $result->fetchAll(PDO::FETCH_COLUMN);
    $topicList = array('topics'=>$item);

    $result = $link->query("SELECT question,answer FROM faqs");
    //$itemize = $result->fetchAll(PDO::FETCH_ASSOC);
    //$output = array('faqs'=>$itemize);

    header('Content-Type: application/json');
    // Allows the topics to be addressed by their indices, $x
    $topic = $_GET['topic'];
    if ($topic == NULL) {
       $result = $link->query("SELECT * FROM faqs");
       $itemize = $result->fetchAll(PDO::FETCH_ASSOC);
       $output = array('faqs'=>$itemize);
       echo json_encode($output);
    } else { 
       foreach ($topicList as $row) {
          $topic = $row[$topic];
       }

       $result = $link->prepare("SELECT question,answer FROM faqs WHERE topic=?");
       $result->execute(array($topic));
       $itemize = $result->fetchAll(PDO::FETCH_ASSOC);
       $output = array('faqs'=>$itemize);
       echo json_encode($output);
    }

    $q = $_GET['q'];
       $result = $link->prepare("SELECT question,answer FROM faqs WHERE question LIKE '%?%' OR answer LIKE '%?%' OR topic LIKE '%?%'");
       $result->execute(array($q));
       $itemize = $result->fetchAll(PDO::FETCH_ASSOC);
       $output = array('faqs'=>$itemize);
       echo json_encode($output);


