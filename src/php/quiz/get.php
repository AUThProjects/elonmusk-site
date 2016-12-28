<?php

    include("../connect.php");
    if (isset($_GET["questionsSeen"])) {
        $questions_seen = $_GET["questionsSeen"];
        
        $query = 
            "SELECT id, question
            FROM quizQuestions 
            WHERE id NOT IN ($questions_seen)";
    }
    else {
        $query = 
            "SELECT id, question
            FROM quizQuestions";
    }

    $statement = $pdo->prepare($query);
    $statement->execute();
    $results = $statement->fetchAll();
    $random_number = rand(0, count($results) - 1);
    $question = $results[$random_number];

    $statement = $pdo->prepare(
        "SELECT quizAnswers.id, answer_image, answer_text
        FROM questionsanswers 
        JOIN quizAnswers ON questionsAnswers.aid=quizAnswers.id 
        WHERE questionsAnswers.qid=".$question['id']);
    $statement->execute();
    $answers = $statement->fetchAll();

    $response = array();
    $response["question"] = $question;
    
    //print_r($answers);

    for ($i=0; $i< 4; $i++) {
        $answers[$i]["answer_image"] = "../../../images/" . $answers[$i]["answer_image"];
    }

    $response["answers"] = $answers;
    echo json_encode($response);
    
?>