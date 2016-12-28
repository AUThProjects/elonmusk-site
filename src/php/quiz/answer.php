<?php

    include("../connect.php");

    $question_id = $_GET["questionId"];
    $answer = $_GET["answer"];
    
    $statement = $pdo->prepare(
        "SELECT correctAnswerId
        FROM quizQuestions
        WHERE id=:questionId");
    $statement->bindParam(":questionId", $question_id);
    $statement->execute();

    $correctAnswerId = $statement->fetch();
    echo $correctAnswerId == $answer;

?>
