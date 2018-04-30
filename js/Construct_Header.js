  var headerDiv = document.createElement("div");
  headerDiv.className = "topnav";
  headerDiv.id = "header";
//  headerDiv.innerHTML = "<ul></ul>";
  document.documentElement.appendChild(headerDiv);
  firebase.auth().onAuthStateChanged(function(user) {
    //var headerDiv = document.createElement("div");

    //var list = document.createElement("LI");
    var val = "<ul>";
    val += "<li><a href=\"homepage.html\">Home</a></li>";
    val += "<li><a href=\"classes.html\">Search</a></li>";
    if (user) {
      window.user = user;
      val += "<li><a href=\"login.html\">Logout</a></li>";
      val += "<li><a href=\"account.html\">My Account</a></li>";
    } else {
      window.user = user;
      val += "<li><a href=\"login.html\">Login</a></li>";
      val += "<li><a href=\"register.html\">Register</a></li>";
    }
    val += "</ul>";
    headerDiv.innerHTML = val;
  });
