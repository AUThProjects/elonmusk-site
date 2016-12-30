<?php

    include("../connect.php");
    $limit = $_GET['limit'];
    $offset = $_GET['offset'];

    $statement = $pdo->prepare(
        "SELECT * FROM comments ORDER BY id DESC LIMIT :limit OFFSET :offset");
    $statement->bindParam(":limit", $limit);
    $statement->bindParam(":offset", $offset);
    $statement->execute();
    $results = $statement->fetchAll();
    echo json_encode($results);
?>
