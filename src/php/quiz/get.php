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
        "SELECT quizAnswers.id, answer
        FROM questionsanswers 
        JOIN quizAnswers ON questionsAnswers.aid=quizAnswers.id 
        WHERE questionsAnswers.qid=".$question['id']);
    $statement->execute();
    $answers = $statement->fetchAll();

    $response = array();
    $response["question"] = $question;
    $response["answers"] = $answers;
    echo json_encode($response);
    
?>