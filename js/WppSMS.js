$(document).ready(function () {

  var data = $("#datepicker").datepicker("getDate");
  var ano = data.getFullYear();
  var mes = data.getMonth();
  mes++;
  var empresa = document.getElementById("nameid").value

  $.ajax({
    url: "php/WppSMS.php",
    type: "GET",
    data: {
      ano: ano,
      mes: mes,
      empresa: empresa
    },
  }).done(function (response) {

    var totalAlertas = response.totalAlertas;
    var totalWpp = response.totalWpp;
    var totalSMS = response.totalSMS;
    var days = response.days;
    var wpp = response.Wpp;
    var sms = response.SMS;

    document.getElementById("totalAlertas").innerHTML = totalAlertas;
    document.getElementById("totalWpp").innerHTML = totalWpp;
    document.getElementById("totalSMS").innerHTML = totalSMS;

    myPieChart(totalWpp, totalSMS);
    myAreaChart(days, wpp, sms);

  })
});

getWppSMS = function () {

  var data = $("#datepicker").datepicker("getDate");
  var ano = data.getFullYear();
  var mes = data.getMonth();
  mes++;
  var empresa = document.getElementById("nameid").value

  $.ajax({
    url: "php/WppSMS.php",
    type: "GET",
    data: {
      ano: ano,
      mes: mes,
      empresa: empresa
    },
  }).done(function (response) {

    var totalAlertas = response.totalAlertas;
    var totalWpp = response.totalWpp;
    var totalSMS = response.totalSMS;
    var days = response.days;
    var wpp = response.Wpp;
    var sms = response.SMS;

    document.getElementById("totalAlertas").innerHTML = totalAlertas;
    document.getElementById("totalWpp").innerHTML = totalWpp;
    document.getElementById("totalSMS").innerHTML = totalSMS;

    myPieChart(totalWpp, totalSMS);
    myAreaChart(days, wpp, sms);

  })

};


