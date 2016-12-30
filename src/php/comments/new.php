<?php
    include("../connect.php");
    
    header('Content-Type: application/json');
    $emailRegex = "/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/";

    if (isset($_POST["email"])) {
        $email = $_POST["email"];
        if (preg_match($emailRegex, $email) != 1) {
            $result = array();
            $result["error"] = "Email is not in valid form.";
            echo json_encode($result);
            return;
        }
        $email = trim($email);
        $email = htmlspecialchars(strip_tags($email)); 
    }
    else {
        $email = "";
    }

    if (!isset($_POST["comment"])) {
        $result = array();
        $result["error"] = "No comment is provided";
        echo json_encode($result);
        return;
    }
    else {
        $comment = $_POST["comment"];
        $comment = trim($comment);
        $comment = htmlspecialchars(strip_tags($comment));
    }

    $statement = $pdo->prepare(
        "INSERT INTO comments(email, comment)
        VALUES(:email, :comment)");
    $statement->bindParam(":email", $email);
    $statement->bindParam(":comment", $comment);
    $statement->execute();
?>
