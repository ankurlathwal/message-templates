var guests,companies,templates;

$(document).ready(function() {  
        var getUser = new XMLHttpRequest();
        var status = false;
        getUser.open("GET", "/init", true);
        getUser.onload = function (e) {
          if (getUser.readyState === 4) {
            if (getUser.status === 200) {
                var res = JSON.parse(getUser.responseText);
                guests = res[0];
                companies = res[1];
                templates = res[2];
                console.log(guests[2].firstName);
                for(var i=0;i<guests.length;i++){
                    $("#selectGuest").append("<option value="+ i +">"+ guests[i].firstName +" "+ guests[i].lastName +"</option>");
                }
                for(var i=0;i<companies.length;i++){
                    $("#selectCompany").append("<option value="+ i +">"+ companies[i].company +","+ companies[i].city +"</option>");  
                }
                for(var i=0;i<templates.length;i++){                
                  $("#selectTemplate").append("<option value="+ i +">"+ templates[i].type + "</option>");
                }  
            } else {
              console.error(getUser.statusText);
            }
          }
        }
        getUser.onerror = function (e) {
          console.error(getUser.statusText);
        };
        getUser.send(null);    
    });







