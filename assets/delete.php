<?php
/**
 * Created by PhpStorm.
 * User: jrvh15
 * Date: 26/12/16
 * Time: 22:28
 */

ob_start();

header('Access-Control-Allow-Origin: *');

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
