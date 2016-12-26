<?php
    include("../connect.php");
    print_r($_POST);
    $email = $_POST["email"];
    if (!isset($email)) {
        $email = "";
    }
    $comment = $_POST["comment"];

    $statement = $pdo->prepare(
        "INSERT INTO comments(email, comment)
        VALUES(:email, :comment)");
    $statement->bindParam(":email", $email);
    $statement->bindParam(":comment", $comment);
    $statement->execute();
?>
