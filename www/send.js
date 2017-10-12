// Logic that sends the message.
// Queries form data and uses it to match with server data (json) to create templated messages.

var message;
// when the user clicks update button, the textarea is updated based on selected guest, company and template.
$("#update").click(function (){
    
    var selGuest = $("#selectGuest option:selected").val();
    var selCompany = $("#selectCompany option:selected").val();
    var selTemplate = $("#selectTemplate option:selected").val();

    message = templates[selTemplate].message;
    var variables = templates[selTemplate].variables;
    var company = companies[selCompany];
    var guest = guests[selGuest];

    // loop through the template structure variables to compose a message.
    for(var i=0;i<variables.length;i++){
        if(message.indexOf("greeting")>=0){            
            // use company time zone to decide greeting - good evening/morning/afternoon 
            // if company data doesn't have timezone key, use the user's default timezone
            var timezone;
            if(company.hasOwnProperty("timezone")){
                timezone = company.timezone;
            }
            else{
                timezone = moment.tz.guess();
            }
            var hrs = moment().tz(timezone).format('H'); // used moment library to work with time zones.
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

        // use timestamp data to find guest checkin and checkout dates. Used in "BookingInfo" template.
        if(variables[i]==="endTimestamp"){
            message = message.replace("$endTimestamp$", moment(guest.reservation.endTimestamp*1000).format("ddd, MMM D YYYY"));
        }
        if(variables[i]==="startTimestamp"){
            message = message.replace("$startTimestamp$", moment(guest.reservation.startTimestamp*1000).format("ddd, MMM D YYYY"));
        }
        if(guest.reservation.hasOwnProperty(variables[i])){
            message = message.replace("$" +variables[i]+"$",guest.reservation[variables[i]] );
        }

        // for rest of the variables in templates.
        if(guest.hasOwnProperty(variables[i])){
            message = message.replace("$" +variables[i]+"$",guest[variables[i]] );
        }
        if(company.hasOwnProperty(variables[i])){
            message = message.replace("$" +variables[i]+"$",company[variables[i]] );
        }
    }

  //  console.log(moment.tz.guess());

    $("#messageInput").html(message);
    
});

$("#send").click(function(){
    $("#messageSent").html("<b>The following message was sent:</b><br>"+message);
});
