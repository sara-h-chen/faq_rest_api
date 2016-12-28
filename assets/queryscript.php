<?php
/**
 * Created by PhpStorm.
 * User: jrvh15
 * Date: 26/12/16
 * Time: 13:54
 */

ob_start();

//$input = json_decode(file_get_contents('php://input'), true);

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$link = new PDO('sqlite:../data/topics.db') or die("Failed to open the database");
$result = $link->query("SELECT COUNT(*) FROM questions");
$tickets = $result->fetchAll(PDO::FETCH_COLUMN);
$all_output['tickets'] = $tickets;

$result = $link->query("SELECT COUNT(*) FROM topics");
$tickets = $result->fetchAll(PDO::FETCH_COLUMN);
$all_output['topics'] = $tickets;

$result = $link->query("SELECT COUNT(*) FROM (SELECT question FROM faqs)");
$tickets = $result->fetchAll(PDO::FETCH_COLUMN);
$all_output['questions'] = $tickets;

$result = $link->query("SELECT COUNT(*) FROM (SELECT answer FROM faqs)");
$tickets = $result->fetchAll(PDO::FETCH_COLUMN);
$all_output['answers'] = $tickets;

$result = $link->query("SELECT id, question FROM questions");
$questions = $result->fetchAll(PDO::FETCH_ASSOC);
$output = $questions;
$all_output['open_tickets'] = $output;

echo json_encode($all_output);