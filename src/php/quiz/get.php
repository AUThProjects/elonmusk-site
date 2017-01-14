<?php

    include("../connect.php");
    
    header('Content-Type: application/json');
    if (isset($_GET["questionsSeen"]) && strlen(trim($_GET["questionsSeen"]))!=0) {
        $questions_seen = $_GET["questionsSeen"];
        $questions_seen = trim($questions_seen);

        $questionIds = explode(',', $questions_seen);
        $inQuery = implode(',', array_fill(0, count($questionIds), '?'));
        $query = 
            "SELECT id, question
            FROM quizQuestions 
            WHERE id NOT IN (" . $inQuery .")";
        
        $statement = $pdo->prepare($query);
        foreach ($questionIds as $k => $id) {
            $statement->bindValue(($k+1), $id);
        }
    }
    else {
        $query = 
            "SELECT id, question
            FROM quizQuestions";    
        $statement = $pdo->prepare($query);
    }
    $statement->execute();
    $results = $statement->fetchAll();
    $resultsSize = count($results);
    if ($resultsSize == 0) {
        $result = array();
        $result["error"] = "No questions left";
        echo json_encode($result);
        return;
    }

    $random_number = rand(0, $resultsSize - 1);
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
    
    $answerSize = count($answers);
    for ($i=0; $i < $answerSize; $i++) {
        $answers[$i]["answer_image"] = "../../images/quiz/" . $answers[$i]["answer_image"];
        list($width, $height) = getimagesize($answers[$i]["answer_image"]);

        $pieces = explode(".", $answers[$i]["answer_image"]);
        $answers[$i]["answer_width"] = $pieces[count($pieces) - 1] == "svg"? "300" : $width;
        $answers[$i]["answer_height"] = $height;
    }

    $response["answers"] = $answers;
    echo json_encode($response);
    
?>