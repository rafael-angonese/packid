myPieChartViolation = function (Min, Max, Off) {

    var button = document.getElementById("filtro");
    filtro.addEventListener("click", function () {
        myPieChart.destroy();
    });

    var ctx = document.getElementById("myPieChartViolation");
    var myPieChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ["Min: " + Min, "Max: " + Max, "Off: " + Off],
            datasets: [{
                data: [Min, Max, Off],
                backgroundColor: ['#36A1EB', '#FF92A8', '#757C81'],
                hoverBackgroundColor: ['#5AB2EE', '#FFA5B7', '#576066'],
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

myAreaChartViolation = function (days, Min, Max, Off) {

    var button = document.getElementById("filtro");
    filtro.addEventListener("click", function () {
        myLineChart.destroy();
    });

    var ctx = document.getElementById("myAreaChartViolation");
    var myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: days,
            datasets: [{
                label: "Min",
                lineTension: 0.0,
                backgroundColor: "rgba(78, 115, 223, 0.05)",
                borderColor: "#36A1EB",
                pointRadius: 3,
                pointBackgroundColor: "#36A1EB",
                pointBorderColor: "#36A1EB",
                pointHoverRadius: 3,
                pointHoverBackgroundColor: "#5AB2EE",
                pointHoverBorderColor: "#5AB2EE",
                pointHitRadius: 10,
                pointBorderWidth: 2,
                data: Min,
            },

            {
                label: "Max",
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
                data: Max,
            },

            {
                label: "Off",
                lineTension: 0.0,
                backgroundColor: "rgba(78, 115, 223, 0.05)",
                borderColor: "#757C81",
                pointRadius: 3,
                pointBackgroundColor: "#757C81",
                pointBorderColor: "#757C81",
                pointHoverRadius: 3,
                pointHoverBackgroundColor: "#576066",
                pointHoverBorderColor: "#576066",
                pointHitRadius: 10,
                pointBorderWidth: 2,
                data: Off,
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