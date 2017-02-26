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
        }
        else {
            console.log("Not Logged In");
            logoutBtn.classList.add('hide');
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
        tr.append("<td>" + json[i].airliner + "</td>");
        tr.append("<td>" + json[i].price+ "</td>");
        tr.append("<td>" + json[i].Departing + "</td>");
        tr.append("<td>" + json[i].Arriving + "</td>");
        tr.append("<td>" + json[i].Connecting + "</td>");
        tr.append("<td>" + json[i].DepartureTime + "</td>");
        tr.append("<td>" + json[i].ArrivalTime + "</td>");
        tr.append("<td>" + json[i].Date + "</td>");
        tr.append("<td> <button class='btn btn-primary'>Add to Cart</button> </td>")
        $('table').append(tr);
    }
    });
    

}());
