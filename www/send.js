
$("#send").click(function (){
    
    var selGuest = $("#selectGuest option:selected").val();
    var selCompany = $("#selectCompany option:selected").val();
    var selTemplate = $("#selectTemplate option:selected").val();

    var message = templates[selTemplate].message;
    var variables = templates[selTemplate].variables;
    var company = companies[selCompany];
    var guest = guests[selGuest];

    for(var i=0;i<variables.length;i++){
        if(guest.hasOwnProperty(variables[i])){
            message = message.replace("$" +variables[i]+"$",guest[variables[i]] );
        }
        if(company.hasOwnProperty(variables[i])){
            message = message.replace("$" +variables[i]+"$",company[variables[i]] );
        }
    }



    $(".container").append(message);
    
});
