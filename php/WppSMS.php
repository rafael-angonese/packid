<?php

$ano = $_GET["ano"];
$mes = $_GET["mes"];
$empresa = $_GET["empresa"];
$diasInMonth = cal_days_in_month(CAL_GREGORIAN, $mes, $ano);
$dias = $diasInMonth;

if ($mes == date('m')) {
  $dias = date('j');
}

$sqlWpp = "SELECT date_part('month', ss.created_at::date) AS mes,
  date_part('day', ss.created_at::date) AS dia,
  COUNT(*) as quantidade
  FROM sent_alerts
  join sent_sms ss on sent_alerts.id = ss.sent_alert_id
  WHERE (is_whatsapp = true) and (company_id = $empresa)
  and date_part('month', ss.created_at::date) = $mes
  and date_part('year', ss.created_at::date) = $ano
  GROUP BY mes, dia
  ORDER BY mes, dia;";

$sqlSMS = "SELECT date_part('month', ss.created_at::date) AS mes,
  date_part('day', ss.created_at::date) AS dia,
  COUNT(*) as quantidade
  FROM sent_alerts
  join sent_sms ss on sent_alerts.id = ss.sent_alert_id
  WHERE (is_whatsapp = false) and (company_id = $empresa)
  and date_part('month', ss.created_at::date) = $mes
  and date_part('year', ss.created_at::date) = $ano
  GROUP BY mes, dia
  ORDER BY mes, dia;";

if ($empresa == 0) {
  $sqlWpp = "SELECT date_part('month', ss.created_at::date) AS mes,
    date_part('day', ss.created_at::date) AS dia,
    COUNT(*) as quantidade
    FROM sent_alerts
    join sent_sms ss on sent_alerts.id = ss.sent_alert_id
    WHERE (is_whatsapp = true)
    and date_part('month', ss.created_at::date) = $mes
    and date_part('year', ss.created_at::date) = $ano
    GROUP BY mes, dia
    ORDER BY mes, dia;";

  $sqlSMS = "SELECT date_part('month', ss.created_at::date) AS mes,
    date_part('day', ss.created_at::date) AS dia,
    COUNT(*) as quantidade
    FROM sent_alerts
    join sent_sms ss on sent_alerts.id = ss.sent_alert_id
    WHERE (is_whatsapp = false)
    and date_part('month', ss.created_at::date) = $mes
    and date_part('year', ss.created_at::date) = $ano
    GROUP BY mes, dia
    ORDER BY mes, dia;";
}


try {
  $dbpg = new PDO("pgsql:host=localhost;dbname=packid", "postgres", "root");

  $ResponseWpp = [];
  $ResponseSMS = [];

  $totalAlertas = 0;
  $totalWpp = 0;
  $totalSMS = 0;
  $days = [];
  $Wpp = [];
  $SMS = [];

  $pdoStatement = $dbpg->query($sqlWpp);
  while ($row = $pdoStatement->fetch(PDO::FETCH_ASSOC)) {
    $totalWpp += $row['quantidade'];
    $ResponseWpp[] = array(
      "dia" => $row['dia'], "quantidade" => $row['quantidade'],
    );
  }

  $pdoStatement = $dbpg->query($sqlSMS);
  while ($row = $pdoStatement->fetch(PDO::FETCH_ASSOC)) {
    $totalSMS += $row['quantidade'];
    $ResponseSMS[] = array(
      "dia" => $row['dia'], "quantidade" => $row['quantidade'],
    );
  }

  for ($i = 1; $i <= $diasInMonth; $i++) {
    if (in_array($i, array_column($ResponseWpp, 'dia'))) {
      //
    } else {
      $arrayAux = [];
      $arrayAux[] = array(
        "dia" => $i, "quantidade" => 0
      );
      array_splice($ResponseWpp, $i - 1, 0, $arrayAux);
    }
  }

  for ($i = 1; $i <= $diasInMonth; $i++) {
    if (in_array($i, array_column($ResponseSMS, 'dia'))) {
      //
    } else {
      $lala = [];
      $lala[] = array(
        "dia" => $i, "quantidade" => 0
      );
      array_splice($ResponseSMS, $i - 1, 0, $lala);
    }
  }

  $totalAlertas = $totalWpp + $totalSMS;

  for ($i = 1; $i <= $dias; $i++) {
    array_push($days, "dia: " . $i);
    array_push($Wpp, $ResponseWpp[$i - 1]['quantidade']);
    array_push($SMS, $ResponseSMS[$i - 1]['quantidade']);
  }

  $retorno = array(
    "totalAlertas" => $totalAlertas,
    "totalWpp" => $totalWpp,
    "totalSMS" => $totalSMS,
    "days" => $days,
    "Wpp" => $Wpp,
    "SMS" => $SMS,
  );

  http_response_code(200);
} catch (PDOException $e) {
  $retorno = ["error" => "error"];
  http_response_code(400);
}

header('Content-Type: application/json');
echo json_encode($retorno);
