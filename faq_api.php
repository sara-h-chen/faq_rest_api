<?php
/**
 * Created by PhpStorm.
 * User: sara
 * Date: 18/12/16
 * Time: 16:04
 */

/**************************************************************************/
/*  Tutorial from: coreymaynard.com/blog/creating-a-restful-api-with-php  */
/**************************************************************************/

require_once 'api/api/api.php';
class faq_api extends api {
    protected $User;

    public function __construct($request, $origin)
    {
        parent::__construct($request);

        //create a class for authentication token
        //$APIKey = new Models\APIKey();
        //$User = new Models\User();

//        if (!array_key_exists('apiKey', $this->request)) {
//            throw new Exception('No API Key provided');
//        } else if (!$APIKey->verifyKey($this->request['apiKey'], $origin)) {
//            throw new Exception('Invalid API key');
//        } else if (array_key_exists('token', $this->request) && !$User->get('token', $this->request['token '])) {
//            throw new Exception('Invalid User Token');
//        }
//        $this->User = $User;
    }

    /**
     * List of topics endpoint
     */
    protected function listOfTopics() {
        if ($this->method == 'GET') {
            print "Hello";
            $myPDO = new PDO('sqlite:./data/topics.db');
            $result = $myPDO->query("SELECT DISTINCT topic FROM topics");
            return $result;
        } else {
            return "Only accepts GET requests.";
        }
    }
}