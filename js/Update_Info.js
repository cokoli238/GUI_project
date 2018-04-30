var snapshot;
//Called by the submit button, checks if every paremeter is correct to build a valid table
function validateFormUserInfo() {
  var user = firebase.auth().currentUser;
  if (user == null) {
    alert("Not signed in");
    return;
  }

  var firstName = document.getElementById("firstName").value;
  var lastName = document.getElementById("lastName").value;
  var major = document.getElementById("major").value;
  var minor = document.getElementById("minor").value;
  var userId = user.uid;
  var classes = get_user_classes();

  if (firstName == "") {
    alert("First name is required");
    return;
  }
  firebase.database().ref('users/' + userId).set({
    firstName: firstName,
    lastName: lastName,
    major: major,
    minor: minor,
    classes: classes
  }).then(function() {
    window.location = "account.html";
  }).catch(function(err) {
    // Handle errors
    alert(err.message);
  });


}

function get_user_classes() {
  var val = (snapshot.val() && snapshot.val().classes) || "[]";
  return val;
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    window.user = user;
    get_snapshot();
  } else {
    window.user = user;
  }
});

function changeUserPass(newPass) {}

function writeUserData(userId, firstName, lastName, password, major, minor, classes) {

}

function get_user_first_name() {
  return (snapshot.val() && snapshot.val().firstName) || "";
}

function get_user_last_name() {
  return (snapshot.val() && snapshot.val().lastName) || "";
}

function get_user_major() {
  var val = (snapshot.val() && snapshot.val().major) || "Computer Science";
  return val;
}

function get_user_minor() {
  var val = (snapshot.val() && snapshot.val().minor) || "None";
  return val;
}

function get_snapshot() {
  firebase.database().ref('/users/' + window.user.uid).once('value').then(function(val) {
    snapshot = val;
    update_user_info();
  }).catch(function(err) {
    // Handle Errors here.
    alert(err.message);
  });
}

function update_user_info() {
  document.getElementById("firstName").value = get_user_first_name();
  document.getElementById("lastName").value = get_user_last_name();
  document.getElementById("major").value = get_user_major();
  document.getElementById("minor").value = get_user_minor();
}
