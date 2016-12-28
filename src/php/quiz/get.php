<?php

    include("../connect.php");

    if (isset($_GET["questionsSeen"])) {
        $questions_seen = $_GET["questionsSeen"];
    }
    else {
        $questions_seen = "";
    }

    $statement = $pdo->prepare(
        "SELECT id, question
        FROM quizQuestions 
        WHERE id NOT IN ($questions_seen)");
    $statement->execute();
    $results = $statement->fetchAll();
    $random_number = rand(0, count($results));
    $question = $results[$random_number];

    $statement = $pdo->prepare(
        "SELECT quizAnswers.id, answer
        FROM questionsanswers 
        JOIN quizAnswers ON questionsAnswers.aid=quizAnswers.id 
        WHERE questionsAnswers.qid=$question->id");
    $statement->execute();
    $answers = $statement->fetchAll();

    $response = array();
    $response["question"] = $question;
    $response["answers"] = $answers;
    echo json_encode($response);
    
?>