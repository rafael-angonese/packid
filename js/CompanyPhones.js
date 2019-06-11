$(document).ready(function () {
    $.ajax({
        url: "php/CompanyPhones.php",
        type: "GET"
    }).done(function (response) {

        var empresas = response;
        
        empresas.forEach(function(item){
            $('tbody').append('<tr>' +
            '<td>' + item.nome +'</td>' +
            '<td>' + item.empresa + '</td></tr>')
          });

    })
});

