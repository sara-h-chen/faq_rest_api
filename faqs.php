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
header('Content-Type: application/json');

$link = new PDO('sqlite:./data/topics.db') or die("Failed to open the database");

/* Deal with GET requests */
if ($method === 'GET') {

    /* Get the list of topics */
    $result = $link->query("SELECT DISTINCT topic FROM topics");
    $item = $result->fetchAll(PDO::FETCH_COLUMN);
    $topicList = array('topics'=>$item);

    $topic = $_GET['topic'];
    $q = $_GET['q'];
    $ignoredWords = array('/\bif\b/i', '/\bthe\b/i', '/\bhas\b/i', '/\bthat\b/i', '/\bfor\b/i', '/\bor\b/i', '/\bwas\b/i', '/\bare\b/i', '/\ba\b/i', '/\bto\b/i');

    if (!isset($topic) && !isset($q)) {
        /* Return unfiltered data */
        $result = $link->query("SELECT topics.topic, faqs.question, faqs.answer FROM faqs INNER JOIN topics ON faqs.topic_id = topics.id;");
        $itemize = $result->fetchAll(PDO::FETCH_ASSOC);
        $output = array('faqs'=>$itemize);
        echo json_encode($output);

    } else if (isset($topic) && !isset($q)) {
        /* Find index of topic */
        foreach ($topicList as $row) {
            $topic = $row[$topic];
        }
        /* Search database for topic, based on the index */
        $result = $link->prepare("SELECT faqs.question, faqs.answer FROM faqs INNER JOIN topics ON faqs.topic_id = topics.id WHERE topics.topic=?");
        $result->execute(array($topic));
        $itemize = $result->fetchAll(PDO::FETCH_ASSOC);
        $output = array('faqs'=>$itemize);
        echo json_encode($output);

    } else if (!isset($topic) && isset($q)) {
        $q = preg_replace($ignoredWords, "", $q);
        /* Full text search */
        $result = $link->prepare("SELECT topics.topic, faqs.question, faqs.answer FROM faqs INNER JOIN topics ON faqs.topic_id = topics.id WHERE topics.topic LIKE :param OR faqs.answer LIKE :param OR faqs.question LIKE :param");
        $result->bindValue(':param', '%' . $q . '%', PDO::PARAM_STR);
        $result->execute();
        $itemize = $result->fetchAll(PDO::FETCH_ASSOC);
        $output = array('faqs'=>$itemize);
        echo json_encode($output);

    } else {
        /* Full text search */
        $q = preg_replace($ignoredWords, "", $q);
        $result = $link->prepare("SELECT question, answer FROM faqs WHERE topic_id=:t_param AND (question LIKE :q_param)");
        $result->bindValue(':t_param', $topic, PDO::PARAM_STR);
        $result->bindValue(':q_param', '%' . $q . '%', PDO::PARAM_STR);
        $result->execute();
        $itemize = $result->fetchAll(PDO::FETCH_ASSOC);
        $output = array('faqs'=>$itemize);
        echo json_encode($output);
    }
    /* AUTHENTICATE WITH AUTH_TOKEN WHEN TRYING TO UPDATE TABLE IN DB CONTAINING SITE CONTENT */
    /* QUESTIONS CAN BE SUBMITTED BY ANYBODY AND WILL BE SAVED TO AN ALTERNATIVE TABLE IN DB */
} else if ($method === 'POST') {

    $request_body = file_get_contents('php://input');
    $json = json_decode($request_body);
    file_put_contents("Activity.log", $json->question, FILE_APPEND);
    file_put_contents("Activity.log", "|", FILE_APPEND);

    /* IF PARAM ONLY CONTAINS THE VALUE 'QUESTION' THEN SKIP THE AUTHENTICATION */
    if (!isset($json->answer) && (!isset($json->topic))) {
        if (isset($json->question) && !empty($json->question)) {
            $var = $json->question;
            echo json_encode("value");
            $update = $link->prepare("INSERT INTO questions(question) VALUES (:param)");
            $update->bindValue(':param', $var, PDO::PARAM_STR);
            $update->execute();
        } else {
            echo json_encode("{}");
        }

    /* IF PARAM CONTAINS 'ANSWER' OR 'TOPIC' THEN ALTER THE DB */
    } else {

        /* GENERATE AUTH_TOKEN FOR CHECKING */
        $checkToken = "faq2016 " . date("Y-m-d") . " " . $_SERVER['REMOTE_ADDR'];
        $checkToken = hash('sha256', $checkToken);
        $givenToken = $_GET["auth_token"];
        $errorTypes = array('not authorised','topic undefined');

        if (empty($givenToken)) {
            /* Redirect browser */
            header("Location: ../password/authenticate.php");
        }

        if ($givenToken !== $checkToken && $givenToken !== "concertina") {
            header("Location: ../password/authenticate.php");
        }

        $topic = $json->topic;
        $question = $json->question;
        $answer = $json->answer;
        $topic = ucwords(strtolower($topic));

        /* Get topic IDs */
        $getTopics = $link->query("SELECT * FROM topics");

        // TODO: Refactor
        $topic_id = -1;
        while($data = $getTopics->fetch( PDO::FETCH_ASSOC )){
            if ($data['topic'] == $topic) {
                $topic_id = $data['id'];
            }
        }

        if ($topic_id == -1) {
            echo json_encode(array("error"=>$errorTypes[1]));
            exit;
        }

        $update = $link->prepare("INSERT INTO faqs(topic_id, question, answer) VALUES (:t_param, :q_param, :a_param)");
        $update->bindValue(':t_param', $topic_id, PDO::PARAM_STR);
        $update->bindValue(':q_param', $question, PDO::PARAM_STR);
        $update->bindValue(':a_param', $answer, PDO::PARAM_STR);
        $update->execute();
        echo json_encode("Added to DB");
    }
    exit;
};
