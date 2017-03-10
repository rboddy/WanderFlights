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
        window.location.replace("http://wanderflights.us/index.html");
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
    
    
    //database pull everything
    
    const preObject = document.getElementById('test');
    
    const dbRefObject = firebase.database().ref().child('flights');
    
//    dbRefObject.on('value', snap => {
//    var json = snap.val();
//    var tr;
//    for (var i = 0; i < json.length; i++) {
//    
//        tr = $('<tr/>');
//        tr.append("<td id='" + 'flight' + i + "'>" + json[i].airliner + "</td>");
//        tr.append("<td id='" + 'price' + i + "'>" + json[i].price+ "</td>");
//        tr.append("<td>" + json[i].Departing + "</td>");
//        tr.append("<td>" + json[i].Arriving + "</td>");
//        tr.append("<td>" + json[i].Connecting + "</td>");
//        tr.append("<td>" + json[i].DepartureTime + "</td>");
//        tr.append("<td>" + json[i].ArrivalTime + "</td>");
//        tr.append("<td>" + json[i].Date + "</td>");
//        tr.append("<td> <button class='btn btn-primary' id='" + i + "' onclick='addToCart(" + i + ")'>Add to Cart</button> </td>")
//        $('table').append(tr);
//    }
//        
//    });
    
    //Database Query on Search or select:
    //search:
    
    var searchBtn = document.getElementById('searchBtn');
    const resultModal = document.getElementById('myModal1');
    const closeBtn = document.getElementById('closeBtn');
    
    closeBtn.onclick = function(){
        resultModal.style.display = "none";
        location.reload();
    }
    
    
    searchBtn.onclick = function searchFlights(){ //search button function start
    
    const departingSearch = document.getElementById('dCityInput');
    const arrivingSearch = document.getElementById('aCityInput');
        
    if (arrivingSearch.value == ''){ //search input check start
    const resultSet = dbRefObject.orderByChild('Departing').equalTo(toTitleCase(departingSearch.value).trim())
        .on('child_added', snap => { //snap callback start
            var flightCollection = [];
            flightCollection.push(snap.val());
            var json = flightCollection;
            var tr;
            for (var i = 0; i < json.length; i++) { //table for loop start

                tr = $('<tr/>');
                tr.append("<td id='" + 'flight' + i + "'>" + json[i].airliner + "</td>");
                tr.append("<td id='" + 'price' + i + "'>" + json[i].price+ "</td>");
                tr.append("<td>" + json[i].Departing + "</td>");
                tr.append("<td>" + json[i].Arriving + "</td>");
                tr.append("<td>" + json[i].Connecting + "</td>");
                tr.append("<td>" + json[i].DepartureTime + "</td>");
                tr.append("<td>" + json[i].ArrivalTime + "</td>");
                tr.append("<td>" + json[i].Date + "</td>");
                tr.append("<td> <button class='btn btn-primary' id='" + i + "' onclick='addToCart(" + i + ")'>Add to Cart</button> </td>")
                $('table').append(tr);
            } // table for loop end
            
            resultModal.style.display = "block";
        }); //snap callback end
    } //search input check end
        
    if (departingSearch.value == ''){ //search input check start
        const resultSet = dbRefObject.orderByChild('Arriving').equalTo(toTitleCase(arrivingSearch.value).trim())
        .on('child_added', snap => { //snap callback start
            var flightCollection = [];
            flightCollection.push(snap.val());
            var json = flightCollection;
            var tr;
            for (var i = 0; i < json.length; i++) { //table for loop start

                tr = $('<tr/>');
                tr.append("<td id='" + 'flight' + i + "'>" + json[i].airliner + "</td>");
                tr.append("<td id='" + 'price' + i + "'>" + json[i].price+ "</td>");
                tr.append("<td>" + json[i].Departing + "</td>");
                tr.append("<td>" + json[i].Arriving + "</td>");
                tr.append("<td>" + json[i].Connecting + "</td>");
                tr.append("<td>" + json[i].DepartureTime + "</td>");
                tr.append("<td>" + json[i].ArrivalTime + "</td>");
                tr.append("<td>" + json[i].Date + "</td>");
                tr.append("<td> <button class='btn btn-primary' id='" + i + "' onclick='addToCart(" + i + ")'>Add to Cart</button> </td>")
                $('table').append(tr);
            } // table for loop end
            
            resultModal.style.display = "block";
        }); //snap callback end
    } //search input check end
        
    if (departingSearch.value != '' && arrivingSearch.value != ''){ //double search input start
        const resultSet = dbRefObject.orderByChild('CityCombo').equalTo(
            toTitleCase(arrivingSearch.value).trim() + ' ' + toTitleCase(departingSearch.value).trim()  
        )
        .on('child_added', snap => { //snap callback start
            var flightCollection = [];
            flightCollection.push(snap.val());
            var json = flightCollection;
            var tr;
            for (var i = 0; i < json.length; i++) { //table for loop start

                tr = $('<tr/>');
                tr.append("<td id='" + 'flight' + i + "'>" + json[i].airliner + "</td>");
                tr.append("<td id='" + 'price' + i + "'>" + json[i].price+ "</td>");
                tr.append("<td>" + json[i].Departing + "</td>");
                tr.append("<td>" + json[i].Arriving + "</td>");
                tr.append("<td>" + json[i].Connecting + "</td>");
                tr.append("<td>" + json[i].DepartureTime + "</td>");
                tr.append("<td>" + json[i].ArrivalTime + "</td>");
                tr.append("<td>" + json[i].Date + "</td>");
                tr.append("<td> <button class='btn btn-primary' id='" + i + "' onclick='addToCart(" + i + ")'>Add to Cart</button> </td>")
                $('table').append(tr);
            } // table for loop end
            
            resultModal.style.display = "block";
        }); //snap callback end
    } // double search input end
        window.onclick = function(event) { //modal clickaway start
        if (event.target == resultModal) { //modal if start 
            resultModal.style.display = "none";
            location.reload();
        } //modal if end
        } // modal clickaway end 
    } // search button function end
    
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
    const priceOfFlight = document.getElementById('price' + id);
    const shoppingCart = document.getElementById('cartList');
    const li = document.createElement('li');
    li.innerText = flightSelected.innerText + " " + priceOfFlight.innerText;
    shoppingCart.appendChild(li)
    window.alert('Your ' + flightSelected.innerText + ' flight has been added to your cart!');
    document.getElementById('defaultCartMessage').classList.add('hide');
    sessionStorage.setItem('cartValue', li.innerText);
}

$(function() {
    if (sessionStorage.getItem('cartValue') != null){
    document.getElementById('defaultCartMessage').classList.add('hide');
    const shoppingCart = document.getElementById('cartList');
    const li = document.createElement('li');
    var cart = sessionStorage.getItem('cartValue');
    li.innerText = cart;
    shoppingCart.appendChild(li);
    document.getElementById('checkoutBtn').classList.remove('hide');
    }
    else {
        document.getElementById('defaultCartMessage').classList.remove('hide');
        document.getElementById('checkoutBtn').classList.add('hide');
    }
});

function checkout(){
    window.location.replace('http://wanderflights.us/checkout.html');
}
function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}


