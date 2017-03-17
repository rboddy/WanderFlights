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
        sessionStorage.clear();
        window.location.replace("http://" + window.location.host + "/index.html");
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

//payment button redirect below:
const paymentBtn = document.getElementById('payNow');

paymentBtn.addEventListener('click', e => {
   window.location.replace('http://127.0.0.1:49504/receipt.html'); 
});

$(function() {
    const flight = document.getElementById('flight');
    flight.innerHTML = sessionStorage.getItem('flightSelected');
});

function checkout(){
    window.location.replace('http://' + window.location.host + '/checkout.html');
}
function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}


