$(document).ready(function () {
    $.ajax({
        url: "php/PhoneQuantity.php",
        type: "GET"
    }).done(function (response) {

        var states = document.getElementsByClassName("estado")
        for (var i = 0; i < states.length; i++) {
            document.getElementsByClassName("estado")[i].setAttribute("code", response[i].quantidade);
            if(response[i].quantidade == 0) {
                $(document.getElementsByClassName("estado")[i]).addClass("estadonothing");
            } 
        };

    })
});

var states = document.getElementsByClassName("estado")
for (var i = 0; i < states.length; i++) {
    states[i].onclick = function () {
        var nome = this.getAttribute('name');
        var code = this.getAttribute('code');

        document.getElementById("titulo").innerHTML = nome;
        document.getElementById("quantidade").innerHTML = "Quantidade de telefones: " + code;
    }
}

