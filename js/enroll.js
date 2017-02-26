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
    
    const emailTxt = document.getElementById('emailTxt');
    const passwordTxt = document.getElementById('passwordTxt');
    const cPassword = document.getElementById('cPassword');
    const loginBtn = document.getElementById('loginButton');
    const enrollBtn = document.getElementById('enrollButton');
    const submitBtn = document.getElementById('submitButton');
    const logoutBtn = document.getElementById('logoutBtn');
    
    //add listeners:
    
    //Login in Listener
    
    loginBtn.addEventListener('click', e => {
        //get email and pass
        const email = emailTxt.value;
        const password = passwordTxt.value;
        const auth = firebase.auth();
        //Sign in:
        
        const promise = auth.signInWithEmailAndPassword(email, password);
        promise.catch(e => console.log(e.message));
        
    });
    
    //Enroll Listener
    
    submitBtn.addEventListener('click', e => {
        //get email and pass
        const email = emailTxt.value;
        const password = passwordTxt.value;
        const auth = firebase.auth();
        //Sign in:
        
        const promise = auth.createUserWithEmailAndPassword(email, password);
        promise.catch(e => console.log(e.message));
        
    });
    
    //logout Listener
    
    logoutBtn.addEventListener('click', e => {
        firebase.auth().signOut();
    });
    
    //add realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser){
            console.log(firebaseUser);
            logoutBtn.classList.remove('hide');
            window.location.replace("http://wanderflights.us/index.html");
        }
        else {
            console.log("Not Logged In");
            logoutBtn.classList.add('hide');
        }
    });

}());

$(document).ready(function() {
    $('#enrollButton').click(function() {
        $('#confirmPass').show();
        $('#enrollCancel').show();
        $('#submitButton').show();
        $('#loginButton').hide();
        $('#enrollButton').hide();
    });
    
    $('#enrollCancel').click(function() {
        $('#confirmPass').hide();
        $('#enrollCancel').hide();
        $('#submitButton').hide();
        $('#loginButton').show();
        $('#enrollButton').show();
        
    });
});