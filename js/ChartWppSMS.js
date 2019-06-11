myPieChart = function (totalWpp, totalSMS) {

  var button = document.getElementById("filtro");
  filtro.addEventListener("click", function () {
    myPieChart.destroy();
  });

  var ctx = document.getElementById("myPieChart");
  var myPieChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ["WhatsApp: " + totalWpp, "SMS: " + totalSMS],
      datasets: [{
        data: [totalWpp, totalSMS],
        backgroundColor: ['#40BDA7', '#FF92A8'],
        hoverBackgroundColor: ['#74CFBF', '#FFA5B7'],
        hoverBorderColor: "rgba(234, 236, 244, 1)",
      }],
    },
    options: {
      maintainAspectRatio: false,
      tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        caretPadding: 10,
        callbacks: {
          label: function (tooltipItems, data) {
            var i, label = [], l = data.datasets.length;
            for (i = 0; i < l; i += 1) {
              label[i] = tooltipItems.yLabel + data.labels[tooltipItems.index];
            }
            return label;
          }
        }
      },
      layout: {
        padding: {
          left: 10,
          right: 25,
          top: 25,
          bottom: 20
        }
      },
      legend: {
        display: true,
        labels: {
          fontSize: 16,
        }
      },
      cutoutPercentage: 80,
    },
  });

};

myAreaChart = function (days, wpp, sms) {

  var button = document.getElementById("filtro");
  filtro.addEventListener("click", function () {
    myLineChart.destroy();
  });

  var ctx = document.getElementById("myLineChart");
  var myLineChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: days,
      datasets: [{
        label: "WhatsApp",
        lineTension: 0.0,
        backgroundColor: "rgba(78, 115, 223, 0.05)",
        borderColor: "#40BDA7",
        pointRadius: 3,
        pointBackgroundColor: "#40BDA7",
        pointBorderColor: "#40BDA7",
        pointHoverRadius: 3,
        pointHoverBackgroundColor: "#74CFBF",
        pointHoverBorderColor: "#74CFBF",
        pointHitRadius: 10,
        pointBorderWidth: 2,
        data: wpp,
      },

      {
        label: "SMS",
        lineTension: 0.0,
        backgroundColor: "rgba(78, 115, 223, 0.05)",
        borderColor: "#FF92A8",
        pointRadius: 3,
        pointBackgroundColor: "#FF92A8",
        pointBorderColor: "#FF92A8",
        pointHoverRadius: 3,
        pointHoverBackgroundColor: "#FFA5B7",
        pointHoverBorderColor: "#FFA5B7",
        pointHitRadius: 10,
        pointBorderWidth: 2,
        data: sms,
      }],
    },
    options: {
      maintainAspectRatio: false,
      layout: {
        padding: {
          left: 10,
          right: 25,
          top: 25,
          bottom: 20
        }
      },
      scales: {
        xAxes: [{
          time: {
            unit: 'date'
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          ticks: {
            fontSize: 16,
            maxTicksLimit: 8
          }
        }],
        yAxes: [{
          ticks: {
            maxTicksLimit: 5,
            padding: 10,
            fontSize: 16,
          },
          gridLines: {
            color: "rgb(234, 236, 244)",
            zeroLineColor: "rgb(234, 236, 244)",
            drawBorder: false,
            borderDash: [2],
            zeroLineBorderDash: [2]
          }
        }],
      },
      legend: {
        labels: {
          fontSize: 16,
        }
      },
      tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        titleMarginBottom: 10,
        titleFontColor: '#6e707e',
        titleFontSize: 18,
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 20,
        yPadding: 20,
        displayColors: false,
        intersect: false,
        mode: 'index',
        caretPadding: 10,
      }
    }

  });

};