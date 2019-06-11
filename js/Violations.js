$(document).ready(function () {

  var data = $("#datepicker").datepicker("getDate");
  var ano = data.getFullYear();
  var mes = data.getMonth();
  mes++;
  var empresa = document.getElementById("nameid").value

  $.ajax({
    url: "php/Violations.php",
    type: "GET",
    data: {
      ano: ano,
      mes: mes,
      empresa: empresa
    },
  }).done(function (response) {

    var totalMin = response.totalMin;
    var totalMax = response.totalMax;
    var totalOff = response.totalOff;
    var days = response.days;
    var Min = response.Min;
    var Max = response.Max;
    var Off = response.Off;

    document.getElementById("totalMin").innerHTML = totalMin;
    document.getElementById("totalMax").innerHTML = totalMax;
    document.getElementById("totalOff").innerHTML = totalOff;

    myPieChartViolation(totalMin, totalMax, totalOff);
    myAreaChartViolation(days, Min, Max, Off);

  })
});

getViolation = function () {

  var data = $("#datepicker").datepicker("getDate");
  var ano = data.getFullYear();
  var mes = data.getMonth();
  mes++;
  var empresa = document.getElementById("nameid").value

  $.ajax({
    url: "php/Violations.php",
    type: "GET",
    data: {
      ano: ano,
      mes: mes,
      empresa: empresa
    },
  }).done(function (response) {

    var totalMin = response.totalMin;
    var totalMax = response.totalMax;
    var totalOff = response.totalOff;
    var days = response.days;
    var Min = response.Min;
    var Max = response.Max;
    var Off = response.Off;

    document.getElementById("totalMin").innerHTML = totalMin;
    document.getElementById("totalMax").innerHTML = totalMax;
    document.getElementById("totalOff").innerHTML = totalOff;

    myPieChartViolation(totalMin, totalMax, totalOff);
    myAreaChartViolation(days, Min, Max, Off);

  })

};
