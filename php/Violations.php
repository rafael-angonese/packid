<?php

$ano = $_GET["ano"];
$mes = $_GET["mes"];
$empresa = $_GET["empresa"];
$diasInMonth = cal_days_in_month(CAL_GREGORIAN, $mes, $ano);
$dias = $diasInMonth;

if ($mes == date('m')) {
  $dias = date('j');
}

$sqlMin = "SELECT date_part('month', ss.created_at::date) AS mes,
    date_part('day', ss.created_at::date) AS dia,
    COUNT(*) as quantidade
    FROM sent_alerts
    join sent_sms ss on sent_alerts.id = ss.sent_alert_id
    WHERE (violation = 'min') and (company_id = $empresa)
    and date_part('month', ss.created_at::date) = $mes
    and date_part('year', ss.created_at::date) = $ano
    GROUP BY mes, dia
    ORDER BY mes, dia;";

$sqlMax = "SELECT date_part('month', ss.created_at::date) AS mes,
    date_part('day', ss.created_at::date) AS dia,
    COUNT(*) as quantidade
    FROM sent_alerts
    join sent_sms ss on sent_alerts.id = ss.sent_alert_id
    WHERE (violation = 'max') and (company_id = $empresa)
    and date_part('month', ss.created_at::date) = $mes
    and date_part('year', ss.created_at::date) = $ano
    GROUP BY mes, dia
    ORDER BY mes, dia;";

$sqlOff = "SELECT date_part('month', ss.created_at::date) AS mes,
    date_part('day', ss.created_at::date) AS dia,
    COUNT(*) as quantidade
    FROM sent_alerts
    join sent_sms ss on sent_alerts.id = ss.sent_alert_id
    WHERE (violation = 'off') and (company_id = $empresa)
    and date_part('month', ss.created_at::date) = $mes
    and date_part('year', ss.created_at::date) = $ano
    GROUP BY mes, dia
    ORDER BY mes, dia;";

if ($empresa == 0) {
  $sqlMin = "SELECT date_part('month', ss.created_at::date) AS mes,
    date_part('day', ss.created_at::date) AS dia,
    COUNT(*) as quantidade
    FROM sent_alerts
    join sent_sms ss on sent_alerts.id = ss.sent_alert_id
    WHERE (violation = 'min')
    and date_part('month', ss.created_at::date) = $mes
    and date_part('year', ss.created_at::date) = $ano
    GROUP BY mes, dia
    ORDER BY mes, dia;";

  $sqlMax = "SELECT date_part('month', ss.created_at::date) AS mes,
    date_part('day', ss.created_at::date) AS dia,
    COUNT(*) as quantidade
    FROM sent_alerts
    join sent_sms ss on sent_alerts.id = ss.sent_alert_id
    WHERE (violation = 'max')
    and date_part('month', ss.created_at::date) = $mes
    and date_part('year', ss.created_at::date) = $ano
    GROUP BY mes, dia
    ORDER BY mes, dia;";

  $sqlOff = "SELECT date_part('month', ss.created_at::date) AS mes,
    date_part('day', ss.created_at::date) AS dia,
    COUNT(*) as quantidade
    FROM sent_alerts
    join sent_sms ss on sent_alerts.id = ss.sent_alert_id
    WHERE (violation = 'off')
    and date_part('month', ss.created_at::date) = $mes
    and date_part('year', ss.created_at::date) = $ano
    GROUP BY mes, dia
    ORDER BY mes, dia;";
}

try {
  $dbpg = new PDO("pgsql:host=localhost;dbname=packid", "postgres", "root");

  $ResponseMin = [];
  $ResponseMax = [];
  $ResponseOff = [];

  $totalMin = 0;
  $totalMax = 0;
  $totalOff = 0;
  $days = [];
  $Min = [];
  $Max = [];
  $Off = [];

  $pdoStatement = $dbpg->query($sqlMin);
  while ($row = $pdoStatement->fetch(PDO::FETCH_ASSOC)) {
    $totalMin += $row['quantidade'];
    $ResponseMin[] = array(
      "dia" => $row['dia'], "quantidade" => $row['quantidade'],
    );
  }

  $pdoStatement = $dbpg->query($sqlMax);
  while ($row = $pdoStatement->fetch(PDO::FETCH_ASSOC)) {
    $totalMax += $row['quantidade'];
    $ResponseMax[] = array(
      "dia" => $row['dia'], "quantidade" => $row['quantidade'],
    );
  }

  $pdoStatement = $dbpg->query($sqlOff);
  while ($row = $pdoStatement->fetch(PDO::FETCH_ASSOC)) {
    $totalOff += $row['quantidade'];
    $ResponseOff[] = array(
      "dia" => $row['dia'], "quantidade" => $row['quantidade'],
    );
  }

  for ($i = 1; $i <= $diasInMonth; $i++) {
    if (in_array($i, array_column($ResponseMin, 'dia'))) {
      //
    } else {
      $lala = [];
      $lala[] = array(
        "dia" => $i, "quantidade" => 0
      );
      array_splice($ResponseMin, $i - 1, 0, $lala);
    }
  }

  for ($i = 1; $i <= $diasInMonth; $i++) {
    if (in_array($i, array_column($ResponseMax, 'dia'))) {
      //
    } else {
      $lala = [];
      $lala[] = array(
        "dia" => $i, "quantidade" => 0
      );
      array_splice($ResponseMax, $i - 1, 0, $lala);
    }
  }

  for ($i = 1; $i <= $diasInMonth; $i++) {
    if (in_array($i, array_column($ResponseOff, 'dia'))) {
      //
    } else {
      $lala = [];
      $lala[] = array(
        "dia" => $i, "quantidade" => 0
      );
      array_splice($ResponseOff, $i - 1, 0, $lala);
    }
  }

  for ($i = 1; $i <= $dias; $i++) {
    array_push($days, "dia: " . $i);
    array_push($Min, $ResponseMin[$i - 1]['quantidade']);
    array_push($Max, $ResponseMax[$i - 1]['quantidade']);
    array_push($Off, $ResponseOff[$i - 1]['quantidade']);
  }

  $retorno = array(
    "totalMin" => $totalMin,
    "totalMax" => $totalMax,
    "totalOff" => $totalOff,
    "days" => $days,
    "Min" => $Min,
    "Max" => $Max,
    "Off" => $Off
  );

  http_response_code(200);
} catch (PDOException $e) {
  $retorno = ["error" => "error"];
  http_response_code(400);
  //echo $e->getMessage();
}

header('Content-Type: application/json');
echo json_encode($retorno);
