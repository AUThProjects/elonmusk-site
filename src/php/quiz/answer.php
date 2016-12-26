<?php

    include("../connect.php");

    $queston_id = $_GET["questionId"];
    $answer = $_GET["answer"];
    
    $statement = $pdo->prepare(
        "SELECT correctAnswerId
        FROM quizQuestions
        WHERE id=:questionId");
    $statement->bindParam(":question_id", $queston_id);
    $statement->execute();

    $correctAnswerId = $statement->fetch();
    echo $correctAnswerId == $answer;

?>
