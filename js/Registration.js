//Called by the submit button, checks if every paremeter is correct to build a valid table
function validateForm() {
  var email = document.getElementById("email").value;
  var pass = document.getElementById("pass").value;
  var passConf = document.getElementById("passConf").value;

if(typeof email == "undefined"){
  alert("Please fill out your email");
}
if(typeof pass == "undefined"){
  alert("Please fill out your password");
}
if(typeof passConf == "undefined"){
  alert("Please confirm your password");
}

  if (passConf != pass) {
    alert("Passwords do not match");
    return false;
  }
  // Register a new user
  firebase.auth().createUserWithEmailAndPassword(email, pass).then(function() {window.location = "first_time.html";})
    .catch(function(err) {
      // Handle errors
      alert(err.message);
      redirect = false;
    });
}

firebase.auth().onAuthStateChanged(function(user) {
  window.user = user; // user is undefined if no user signed in
});


function validateFormUserInfo() {
  var user = firebase.auth().currentUser;
  if(user == null){
    alert("Not signed in");
    return;
  }

  var firstName = document.getElementById("firstName").value;
  var lastName = document.getElementById("lastName").value;
  var major = document.getElementById("major").value;
  var minor = document.getElementById("minor").value;
  var userId = user.uid;

if(firstName == ""){
  alert("First name is required");
}


    firebase.database().ref('users/' + userId).set({
      firstName: firstName,
      lastName: lastName,
      major : major,
      minor : minor
    });
}

firebase.auth().onAuthStateChanged(function(user) {
  window.user = user; // user is undefined if no user signed in
});

function changeUserPass(newPass){
}

function writeUserData(userId, firstName, lastName, password, major, minor, classes) {

}
