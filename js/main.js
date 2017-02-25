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

}());