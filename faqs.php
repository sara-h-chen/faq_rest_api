<?php
    /*
    session_start();
    if(empty($_SESSION["authenticated"]) || $_SESSION["authenticated"] != 'true') {
       header('Location: ../password/login.php');
       //$_SESSION["authenticated"] = 'true';
       //header('Location: ../faqs.php');
    }*/

     ob_start();


    /* Gets the HTTP method, path and body of the request */
    $method = $_SERVER['REQUEST_METHOD'];

    header('Access-Control-Allow-Origin: *');

    $link = new PDO('sqlite:./data/topics.db') or die("Failed to open the database");

    /* Deal with GET requests */
    if ($method === 'GET') {
        header('Content-Type: application/json');

        /* Get the list of topics */
        $result = $link->query("SELECT DISTINCT topic FROM faqs");
        $item = $result->fetchAll(PDO::FETCH_COLUMN);
        $topicList = array('topics'=>$item);

        $topic = $_GET['topic'];
        $q = $_GET['q'];
        $ignoredWords = array('/\bif\b/i', '/\bthe\b/i', '/\bhas\b/i', '/\bthat\b/i', '/\bfor\b/i', '/\bor\b/i', '/\bwas\b/i', '/\bare\b/i', '/\ba\b/i', '/\bto\b/i');
        $q = preg_replace($ignoredWords, "", $q);

        if (!isset($topic) && !isset($q)) {
           /* Return unfiltered data */
           $result = $link->query("SELECT * FROM faqs");
           $itemize = $result->fetchAll(PDO::FETCH_ASSOC);
           $output = array('faqs'=>$itemize);
           echo json_encode($output);

        } else if (isset($topic) && !isset($q)) {
           /* Find index of topic */
           foreach ($topicList as $row) {
              $topic = $row[$topic];
        }
           /* Search database for topic, based on the index */
           $result = $link->prepare("SELECT question,answer FROM faqs WHERE topic=?");
           $result->execute(array($topic));
           $itemize = $result->fetchAll(PDO::FETCH_ASSOC);
           $output = array('faqs'=>$itemize);
           echo json_encode($output);

        } else if (!isset($topic) && isset($q)) {
           /* Full text search */
           $result = $link->prepare("SELECT * FROM faqs WHERE topic LIKE :param OR answer LIKE :param OR question LIKE :param");
           $result->bindValue(':param', '%' . $q . '%', PDO::PARAM_STR);
           $result->execute();
           $itemize = $result->fetchAll(PDO::FETCH_ASSOC);
           $output = array('faqs'=>$itemize);
           echo json_encode($output);

        } else {
           /* Full text search */
           $result = $link->prepare("SELECT * FROM faqs WHERE topic LIKE :param OR answer LIKE :param OR question LIKE :param");
           $result->bindValue(':param', '%' . $q . '%', PDO::PARAM_STR);
           $result->execute();
           $itemize = $result->fetchAll(PDO::FETCH_ASSOC);

           /* Get index of topic */
           foreach ($topicList as $row) {
              $topic = $row[$topic];
           }
           /* Break up the array; find the 'topic' field for comparison */
           foreach ($itemize as $val) {
              foreach ($val as $key2 => $val2) {
                  if ($val2 == $topic) {
                      echo json_encode($val);
                  }
              }
           }
       }
   /* AUTHENTICATE WITH AUTH_TOKEN WHEN TRYING TO UPDATE TABLE IN DB CONTAINING SITE CONTENT */
   /* QUESTIONS CAN BE SUBMITTED BY ANYBODY AND WILL BE SAVED TO AN ALTERNATIVE TABLE IN DB */
   } else if ($method === 'POST') {

        /* IF PARAM ONLY CONTAINS THE VALUE 'QUESTION' THEN SKIP THE AUTHENTICATION */
        if (!isset($_POST["answer"]) && (!isset($_POST["topic"]))) {
            if (isset($_POST['question']) && !empty($_POST['question'])) {
                $var = $_POST['question'];
                $update = $link->prepare("INSERT INTO questions(question) VALUES (:param)");
                $update->bindValue(':param', $var, PDO::PARAM_STR);
                $update->execute();
            }

        /* IF PARAM CONTAINS 'ANSWER' OR 'TOPIC' THEN ALTER THE DB */
        } else {
            $topic = $_POST['topic'];
            $question = $_POST['question'];
            $answer = $_POST['answer'];
            $update = $link->prepare("INSERT INTO faqs(topic, question, answer) VALUES (:t_param, :q_param, :a_param)");
            $update->bindValue(':t_param', $topic, PDO::PARAM_STR);
            $update->bindValue(':q_param', $question, PDO::PARAM_STR);
            $update->bindValue(':a_param', $answer, PDO::PARAM_STR);
            $update->execute();
            echo "Added to DB";
        }
            exit;
    };

//        if (isset($_POST["answer"]) && isset($_POST["topic"])) {
//// Generate auth_token for checking
//            $checkToken = "faq2016 " . date("Y-m-d") . " " . $_SERVER['REMOTE_ADDR'];
//            //var_dump($checkToken);
//            $checkToken = hash('sha256', $checkToken);
//            //var_dump($checkToken);
//            $givenToken = $_POST["auth_token"];
//            //var_dump($givenToken);
//            $errorTypes = array('not authorised','topic undefined');
//            //var_dump($errorTypes);
//            if ($givenToken !== $checkToken && $givenToken !== "concertina") {
//                echo json_encode(array("error"=>$errorTypes[0]));
//            }
//
//            // Check if topic is valid
//            $link = new PDO('sqlite:./data/topics.db') or die("Failed to open the database");
//            // Get the list of topics
//            $result = $link->query("SELECT DISTINCT topic FROM faqs");
//            $list = $result->fetchAll(PDO::FETCH_COLUMN);
//            //var_dump($list);
//            $topic = $_POST["topic"];
//            if ($topic >= sizeof($list)) {
//                echo json_encode(array("error"=>$errorTypes[1]));
//            }
//
//        } else {
//
//            $receivedData = $_POST["question"];
//            var_dump($receivedData);
//
//        }




