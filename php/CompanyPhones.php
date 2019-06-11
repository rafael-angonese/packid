<?php

try {
    $dbpg = new PDO("pgsql:host=localhost;dbname=packid", "postgres", "root");

    $sqlEmpresaTel = "SELECT ss.id AS empresa,
	ss.name AS nome,
    COUNT(*) as quantidade
    FROM telefone_alertas
    join companies ss on telefone_alertas.company_id = ss.id
    GROUP BY empresa
	ORDER BY nome;";

    $pdoStatement = $dbpg->query($sqlEmpresaTel);

    $empresasTels = $pdoStatement->fetchAll(PDO::FETCH_ASSOC);

    http_response_code(200);
} catch (PDOException $e) {
    $empresasTels = ["error" => "error"];
    http_response_code(400);
}

header('Content-Type: application/json');
echo json_encode($empresasTels);
