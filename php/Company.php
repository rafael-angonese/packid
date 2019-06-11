<?php

try {
    $dbpg = new PDO("pgsql:host=localhost;dbname=packid", "postgres", "root");

    $sqlEmpresas = "select id, name from companies ORDER BY name;";
    
    $pdoStatement = $dbpg->query($sqlEmpresas);

    $empresas = $pdoStatement->fetchAll(PDO::FETCH_ASSOC);

    http_response_code(200);
} catch (PDOException $e) {
    $empresas = ["error" => "error"];
    http_response_code(400);
}

header('Content-Type: application/json');
echo json_encode($empresas);
