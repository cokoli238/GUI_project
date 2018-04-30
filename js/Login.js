function login() {
  var email = document.getElementById("email").value;
  var pass = document.getElementById("pass").value;

  firebase.auth().signInWithEmailAndPassword(email, pass).then(function() {
      window.history.go(-1);
    })
    .catch(function(err) {
      // Handle Errors here.
      alert(err.message);
    });
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    window.user = user;
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }, function(err) {
      alert(err)
    });
  } else {
    window.user = user;
  }
});
