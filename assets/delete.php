<?php
/**
 * Created by PhpStorm.
 * User: jrvh15
 * Date: 26/12/16
 * Time: 22:28
 */

ob_start();

header('Access-Control-Allow-Origin: *');

$checkToken = "faq2016 " . date("Y-m-d") . " " . $_SERVER['REMOTE_ADDR'];
$checkToken = hash('sha256', $checkToken);
$givenToken = $_POST["auth_token"];

if (empty($givenToken) && empty($_COOKIE['auth_token'])) {
    /* Redirect browser */
//            header("Location: authenticate.php");
    header("Location: ../password/authenticate.php");
}

$errorTypes = array('not authorised');

if ($givenToken !== $checkToken && $givenToken !== "concertina") {
    echo json_encode(array("error"=>$errorTypes[0]));
    exit;
}

$link = new PDO('sqlite:../data/topics.db') or die("Failed to open the database");

if (isset($_GET['id'])) {
    $toDelete = $_GET['id'];
//    var_dump($toDelete);
    $result = $link->prepare("DELETE FROM questions WHERE id=(:delete_param)");
    $result->bindValue(':delete_param', $toDelete, PDO::PARAM_STR);
    $result->execute();
    echo "Deleted";
    header('Location: ../admin.html');
} else if (isset($_GET['topic'])){
    $toDelete = $_GET['topic'];
    var_dump($toDelete);
    $toDelete = ucwords(strtolower($toDelete));
    $result = $link->prepare("DELETE FROM topics WHERE topic=(:delete_param)");
    $result->bindValue(':delete_param', $toDelete, PDO::PARAM_STR);
    $result->execute();
    header('Location: ../admin.html');
}
