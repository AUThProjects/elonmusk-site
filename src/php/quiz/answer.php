<?php

    include("../connect.php");

    header('Content-Type: application/json');
    if (!isset($_GET["questionId"])) {
        $result = array();
        $result["error"] = "No question is provided";
        echo json_encode($result);
        return;
    }
    if (!isset($_GET["answer"])) {
        $result = array();
        $result["error"] = "No answer is provided";
        echo json_encode($result);
        return;
    }

    $question_id = $_GET["questionId"];
    $answer = $_GET["answer"];
    
    $statement = $pdo->prepare(
        "SELECT correctAnswerId
        FROM quizQuestions
        WHERE id=:questionId");
    $statement->bindParam(":questionId", $question_id);
    $statement->execute();

    $correctAnswerId = $statement->fetch();
    if (!$correctAnswerId) {
        $result = array();
        $result["error"] = "Question was not found";
        echo json_encode($result);
        return;
    }

    $result = array();
    $result["result"] = $correctAnswerId["correctanswerid"] == $answer;
    echo json_encode($result);

?>
