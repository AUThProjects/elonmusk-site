<?php

    include("../connect.php");
    $limit = $_GET['limit'];
    $offset = $_GET['offset'];

    if (isset($_GET['limit']) && isset($_GET['offset'])) {
      $statement = $pdo->prepare(
          "SELECT * FROM comments ORDER BY id DESC LIMIT :limit OFFSET :offset");
      $statement->bindParam(":limit", $limit);
      $statement->bindParam(":offset", $offset);
    }
    else {
      $statement = $pdo->prepare(
          "SELECT * FROM comments ORDER BY id DESC");
    }
    $statement->execute();
    $results = $statement->fetchAll();
    echo json_encode($results);
?>
