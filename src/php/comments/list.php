<?php

    include("../connect.php");

    $statement = $pdo->prepare(
        "SELECT * FROM comments");
    $statement->execute();
    $results = $statement->fetchAll();
    echo JSON.stringify($results);
    
?>