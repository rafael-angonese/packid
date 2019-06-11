$(document).ready(function () {
    $.ajax({
        url: "php/Company.php",
        type: "GET"
    }).done(function (response) {

        var selectbox = $('#nameid');
        $.each(response, function (i, empresa) {
            selectbox.append('<option value="' + empresa.id + '">' + empresa.name + '</option>');
        });

    })
});

