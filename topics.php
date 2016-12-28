<?php
/**
 * Created by PhpStorm.
 * User: jrvh15
 * Date: 19/12/16
 * Time: 14:31
 */

    ob_start();
   

    /* Gets the HTTP method, path and body of the request */
    $method = $_SERVER['REQUEST_METHOD'];
    //$input = json_decode(file_get_contents('php://input'), true);

    header('Access-Control-Allow-Origin: *');
    // TODO: Uncomment this
//    header('Content-Type: application/json');

    if ($method === 'GET') {

        $link = new PDO('sqlite:./data/topics.db') or die("Failed to open the database");
        $result = $link->query("SELECT topic FROM topics");
        $item = $result->fetchAll(PDO::FETCH_COLUMN);
        $output = array('topics'=>$item);

        echo json_encode($output);

    } else if ($method === 'POST') {

        $checkToken = "faq2016 " . date("Y-m-d") . " " . $_SERVER['REMOTE_ADDR'];
        $checkToken = hash('sha256', $checkToken);
        $givenToken = $_GET["auth_token"];
	
	if (empty($givenToken) && empty($_COOKIE['auth_token'])) {
            /* Redirect browser */
//            header("Location: ../authenticate.php");
            header("Location: ../password/authenticate.php");
        }

        $errorTypes = array('not authorised','topic undefined');

        if ($givenToken !== $checkToken && $givenToken !== "concertina") {
           echo json_encode(array("error"=>$errorTypes[0]));
           exit;
        }

        if (empty($_POST['topic'])) {
            echo json_encode(array("error"=>$errorTypes[1]));
            exit;
        }

        $link = new PDO('sqlite:./data/topics.db') or die("Failed to open the database");

        $topic = $_POST['topic'];
        $topic = ucwords(strtolower($topic));
//        echo $topic;
        $update = $link->prepare("INSERT INTO topics(topic) VALUES (:t_param)");
        $update->bindValue(':t_param', $topic, PDO::PARAM_STR);
        $update->execute();
        echo "Added to DB";

    }
