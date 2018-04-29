//Called by the submit button, checks if every paremeter is correct to build a valid table
function validateForm() {
  var email = document.forms["regForm"]["email"].value;
  var pass = document.forms["regForm"]["pass"].value;
  var passConf = document.forms["regForm"]["passConf"].value;
  var major = document.forms["regForm"]["major"].value;
  var minor = document.forms["regForm"]["minor"].value;
  var firstName = document.forms["regForm"]["firstName"].value;
  var lastName = document.forms["regForm"]["lastName"].value;

  if (!email.includes("@")) {
    alert("Not a valid email");
    return false;
  }
  if (passConf != pass) {
    alert("Passwords do not match");
    return false;
  }

  // Register a new user
  firebase.auth().createUserWithEmailAndPassword(email, pass)
    .catch(function(err) {
      // Handle errors
    });

  var currentUser = firebase.auth().currentUser;
  currentUser.updateProfile({
    displayName: (firstName + lastName)
  });

  return true;
}

firebase.auth().onAuthStateChanged(function(user) {
  window.user = user; // user is undefined if no user signed in
});

function isEmail() {
  var email = document.forms["regForm"]["email"].value;
  if (!email.includes("@")) {
    //return false;
  }
  return true;
}

function isValidPass() {
  var pass = document.forms["regForm"]["pass"].value;
  var passConf = document.forms["regForm"]["passConf"].value;
  if (passConf != pass) {
    //alert("Passwords do not match");
    //return false;
  }
  return true;
}
