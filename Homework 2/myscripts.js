"use strict";
function requestImage() {
      //alert(111)
      
      var rad = document.getElementsByName("animal");
      for (var i = 0; i < rad.length; i++) {
            if (rad[i].checked) {
                  //alert('Chosen "' + rad[i].value + '" requesting from server...');
                  document.getElementById("commentary").innerText = "Chose " + rad[i].value
            }
      } 
}

