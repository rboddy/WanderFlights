(function(){

    // Initialize Firebase
      var config = {
        apiKey: "AIzaSyAomjmzFD_zM1ZLCRk2RnBe2xC-7mCG2IM",
        authDomain: "wanderflights-b7b7c.firebaseapp.com",
        databaseURL: "https://wanderflights-b7b7c.firebaseio.com",
        storageBucket: "wanderflights-b7b7c.appspot.com",
        messagingSenderId: "218425156975"
      };
      firebase.initializeApp(config);
    
    //get elements:
    
    const logoutBtn = document.getElementById('logoutBtn');
    const loginTab = document.getElementById('loginTab');
    
    //add listeners:
    
     //logout Listener
    
    logoutBtn.addEventListener('click', e => {
        firebase.auth().signOut();
    });
    
    //add realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser){
            console.log(firebaseUser);
            logoutBtn.classList.remove('hide');
            loginTab.classList.add('hide');
        }
        else {
            console.log("Not Logged In");
            logoutBtn.classList.add('hide');
            loginTab.classList.remove('hide');
        }
    });
    
    
    //database pull
    
    const preObject = document.getElementById('test');
    
    const dbRefObject = firebase.database().ref().child('flights');
    
    dbRefObject.on('value', snap => {
    var json = snap.val();
    var tr;
    for (var i = 0; i < json.length; i++) {
    
        tr = $('<tr/>');
        tr.append("<td id='" + 'flight' + i + "'>" + json[i].airliner + "</td>");
        tr.append("<td>" + json[i].price+ "</td>");
        tr.append("<td>" + json[i].Departing + "</td>");
        tr.append("<td>" + json[i].Arriving + "</td>");
        tr.append("<td>" + json[i].Connecting + "</td>");
        tr.append("<td>" + json[i].DepartureTime + "</td>");
        tr.append("<td>" + json[i].ArrivalTime + "</td>");
        tr.append("<td>" + json[i].Date + "</td>");
        tr.append("<td> <button class='btn btn-primary' id='" + i + "' onclick='addToCart(" + i + ")'>Add to Cart</button> </td>")
        $('table').append(tr);
    }
        
    });
    
    //modal stuff below:
    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the button that opens the modal
    var btn = document.getElementById("cartBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    btn.onclick = function() {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    

}());

function addToCart(id) {
    const flightSelected = document.getElementById('flight' + id);
    window.alert(flightSelected.innerText);
}
