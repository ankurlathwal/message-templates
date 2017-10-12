var message;
$("#update").click(function (){
    
    var selGuest = $("#selectGuest option:selected").val();
    var selCompany = $("#selectCompany option:selected").val();
    var selTemplate = $("#selectTemplate option:selected").val();

    message = templates[selTemplate].message;
    var variables = templates[selTemplate].variables;
    var company = companies[selCompany];
    var guest = guests[selGuest];

    

    for(var i=0;i<variables.length;i++){
        if(message.indexOf("greeting")>=0){            
            var hrs = moment().tz(company.timezone).format('H');
            if(hrs<12){
                message = message.replace("$greeting$","Good Morning");
            }
            else if(hrs>=12 && hrs<16){
                message = message.replace("$greeting$","Good Afternoon");
            }
            else{
                message = message.replace("$greeting$","Good Evening");
            }
        }

        if(variables[i]==="endTimestamp"){
            message = message.replace("$endTimestamp$", moment(guest.reservation.endTimestamp*1000).format("ddd, MMM D YYYY"));
        }
        if(variables[i]==="startTimestamp"){
            message = message.replace("$startTimestamp$", moment(guest.reservation.startTimestamp*1000).format("ddd, MMM D YYYY"));
        }
        if(guest.reservation.hasOwnProperty(variables[i])){
            message = message.replace("$" +variables[i]+"$",guest.reservation[variables[i]] );
        }

        if(guest.hasOwnProperty(variables[i])){
            message = message.replace("$" +variables[i]+"$",guest[variables[i]] );
        }
        if(company.hasOwnProperty(variables[i])){
            message = message.replace("$" +variables[i]+"$",company[variables[i]] );
        }
    }

//    console.log(moment().tz("US/Pacific").format('H'));

    $("#messageInput").html(message);
    
});

$("#send").click(function(){
    $("#messageSent").html("<b>The following message was sent:</b><br>"+message);
});
