var snapshot;

function get_user_name() {
  var firstName = (snapshot.val() && snapshot.val().firstName) || "";
  var lastName = (snapshot.val() && snapshot.val().lastName) || "";
  return firstName + " " + lastName;
}

function get_user_major() {
  var val = (snapshot.val() && snapshot.val().major) || "";
  return val;
}

function get_user_minor() {
  var val = (snapshot.val() && snapshot.val().minor) || "";
  return val;
}

function get_snapshot() {
  firebase.database().ref('/users/' + user.uid).once('value').then(function(val) {
    snapshot = val;
    start();
  }).catch(function(err) {
    // Handle Errors here.
    alert(err.message);
  });
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    window.user = user;
    get_snapshot();

  } else {
    window.user = user;
    window.location = "login.html";
  }
});

function start() {
  document.getElementById("name").innerHTML = "Name: " + get_user_name();
  document.getElementById("major").innerHTML = "Major: " + get_user_major();
  document.getElementById("minor").innerHTML = "Minor: " + get_user_minor();

}
