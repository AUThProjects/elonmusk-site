<?php
    include("../connect.php");

    $email = $_POST["email"];
    if (!isset($email)) {
        $email = "";
    }
    $comment = $_POST["comment"];

    $statement = $pdo->prepare(
        "INSERT INTO comments(email, comment)
        VALUES(:email, :comment)");
    $statement->execute(array(
        "email" => $email,
        "comment" => $comment
    ));
?>