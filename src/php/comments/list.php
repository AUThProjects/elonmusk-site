<?php

    include("../connect.php");

    $statement = $pdo->prepare(
        "SELECT * FROM comments");
    $statement->execute();
    $results = $statement->fetchAll();
    echo json_encode($results);
    
?>
