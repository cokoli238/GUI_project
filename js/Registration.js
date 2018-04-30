var snapshot;
//Called by the submit button, checks if every paremeter is correct to build a valid table
function validateForm() {
  var email = document.getElementById("email").value;
  var pass = document.getElementById("pass").value;
  var passConf = document.getElementById("passConf").value;

  if (typeof email == "undefined") {
    alert("Please fill out your email");
  }
  if (typeof pass == "undefined") {
    alert("Please fill out your password");
  }
  if (typeof passConf == "undefined") {
    alert("Please confirm your password");
  }

  if (passConf != pass) {
    alert("Passwords do not match");
    return false;
  }
  // Register a new user
  firebase.auth().createUserWithEmailAndPassword(email, pass).then(function() {
      window.location = "first_time.html";
    })
    .catch(function(err) {
      // Handle errors
      alert(err.message);
    });
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    window.user = user;
  } else {
    window.user = user;
  }
});


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    window.user = user;
  } else {
    window.user = user;
  }
});
