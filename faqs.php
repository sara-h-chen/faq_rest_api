<?php
    /*
    session_start();
    if(empty($_SESSION["authenticated"]) || $_SESSION["authenticated"] != 'true') {
       header('Location: ../password/login.php');
       //$_SESSION["authenticated"] = 'true';
       //header('Location: ../faqs.php');
    }*/
     ob_start();

     /**
     * gets the HTTP method, path and body of the request
     */
    $method = $_SERVER['REQUEST_METHOD'];
    $request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
    // Uncomment if you want to upload a file to the webserver
    //$input = json_decode(file_get_contents('php://input'), true);

    header('Content-Type: application/json');

    // Deal with GET requests
    if ($method === 'GET') {
        $link = new PDO('sqlite:./data/topics.db') or die("Failed to open the database");
        // Get the list of topics
        $result = $link->query("SELECT DISTINCT topic FROM faqs");
        $item = $result->fetchAll(PDO::FETCH_COLUMN);
        $topicList = array('topics'=>$item);

        $topic = $_GET['topic'];
        $q = $_GET['q'];
        $ignoredWords = array('if', 'the', 'has', 'that', 'it', 'for', 'or', 'was', 'are', 'a', 'to');
        $q = str_replace($ignoredWords, '', $q);

        if ($topic == NULL && $q == NULL) {
           // Return unfiltered data
           $result = $link->query("SELECT * FROM faqs");
           $itemize = $result->fetchAll(PDO::FETCH_ASSOC);
           $output = array('faqs'=>$itemize);
           echo json_encode($output);

        } else if ($topic !== NULL && $q == NULL) { 
           // Find index of topic
           foreach ($topicList as $row) {
              $topic = $row[$topic];
        }
           // Search database for topic, based on the index
           $result = $link->prepare("SELECT question,answer FROM faqs WHERE topic=?");
           $result->execute(array($topic));
           $itemize = $result->fetchAll(PDO::FETCH_ASSOC);
           $output = array('faqs'=>$itemize);
           echo json_encode($output);
   
        } else if ($topic == NULL && $q !== NULL) {
           // Full text search
           $result = $link->prepare("SELECT * FROM faqs WHERE topic LIKE :param OR answer LIKE :param OR question LIKE :param");
           $result->bindValue(':param', '%' . $q . '%', PDO::PARAM_STR);
           $result->execute();
           $itemize = $result->fetchAll(PDO::FETCH_ASSOC);
           $output = array('faqs'=>$itemize);
           echo json_encode($output);

        } else {
           // Full text search
           $result = $link->prepare("SELECT * FROM faqs WHERE topic LIKE :param OR answer LIKE :param OR question LIKE :param");
           $result->bindValue(':param', '%' . $q . '%', PDO::PARAM_STR);
           $result->execute();
           $itemize = $result->fetchAll(PDO::FETCH_ASSOC);

           // Get index of topic
           foreach ($topicList as $row) {
              $topic = $row[$topic];
           }
          // Break up the array; find the 'topic' field for comparison
           foreach ($itemize as $val) {
              foreach ($val as $key2 => $val2) {
                  if ($val2 == $topic) {
                      echo json_encode($val);
                  }
              }
           }
       }
   // Authenticate with auth_token
   } else if ($method === 'POST') {

       // Generate auth_token for checking
       $checkToken = "faq2016 " . date("Y-m-d") . " " . $_SERVER['REMOTE_ADDR'];
       //var_dump($checkToken);
       $checkToken = hash('sha256', $checkToken);
       //var_dump($checkToken);
       $givenToken = $_POST["auth_token"];
       //var_dump($givenToken);
       $errorTypes = array('not authorised','topic undefined');
       //var_dump($errorTypes);
       if ($givenToken !== $checkToken && $givenToken !== "concertina") {
           echo json_encode(array("error"=>$errorTypes[0]));
       }

       // Check if topic is valid
       $link = new PDO('sqlite:./data/topics.db') or die("Failed to open the database");
       // Get the list of topics
       $result = $link->query("SELECT DISTINCT topic FROM faqs");
       $list = $result->fetchAll(PDO::FETCH_COLUMN);
       //var_dump($list);
       $topic = $_POST["topic"];
       if ($topic >= sizeof($list)) {
           echo json_encode(array("error"=>$errorTypes[1]));
       }
      
   }


