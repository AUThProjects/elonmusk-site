<?php
  include("../connect.php");

  $statement = $pdo->prepare(
      "SELECT count(*) as comments_count FROM comments");
  $statement->execute();
  $results = $statement->fetchAll();
  echo json_encode($results[0]);
?>
