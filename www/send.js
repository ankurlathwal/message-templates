
$("#send").click(function (){
    var selGuest = $("#selectGuest option:selected").val();
    var selCompany = $("#selectCompany option:selected").val();
    var selTemplate = $("#selectTemplate option:selected").val();

    var firstName = guests[selGuest].firstName;
    var lastName = guests[selGuest].lastName;
    var message = templates[selTemplate].message;

    message = message.replace("$firstName$",firstName);
    message = message.replace("$lastName$",lastName);
    $(".container").append(message);
    
});
