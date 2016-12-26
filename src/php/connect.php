<?php
    $host = 'localhost';
    $db   = 'elonmuskdb';
    $user = 'dbuser';
    $pass = 'elonmuskrules';
    $charset = 'utf8';

    $dsn = "pgsql:host=$host;dbname=$db;charset=$charset";
    $pdo = new PDO($dsn, $user, $pass);
?>