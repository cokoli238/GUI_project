  //document.getElementById("header").remove();
  var head = document.getElementById("header");
  if(head != null){
  head.innerHTML = "";
  }
  var headerDiv = document.createElement("div");
  var blankDiv = document.createElement("div");
  blankDiv.id = "blankheader";
  headerDiv.className = "topnav";
  headerDiv.id = "header";
  headerDiv.style.position = "fixed";
  headerDiv.style.display = "block";
  headerDiv.style.height = "90px";
  headerDiv.style.width = "100%";
  headerDiv.style.margin = "0 auto";
  headerDiv.style.overflow = "visible"
  blankDiv.style.height = "100px";
  blankDiv.style.width = "100%";


  document.documentElement.appendChild(headerDiv);



  document.documentElement.appendChild(blankDiv);
  //  headerDiv.innerHTML = "<ul></ul>";

  firebase.auth().onAuthStateChanged(function(user) {
    var head = document.getElementById("header");
    if(head != null){
    head.innerHTML = "";
    }
    //var headerDiv = document.createElement("div");
    var titleDiv = document.createElement("div");
    titleDiv.style.float = "left";
    var title = document.createElement("Label");
    title.innerHTML = "My Advisor";
    title.style.color = "white";
    title.style.fontSize = "50px";
    title.style.paddingLeft = "150px";
    titleDiv.style.paddingTop = "12px";
    title.style.fontFamily = "sans-serif";
    titleDiv.style.position = "fixed";
    titleDiv.style.display = "block";
    titleDiv.appendChild(title);

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

    var x = document.createElement("IMG");
    x.src = "UMass-Lowell-logo.png";
    x.style.width = "100px";
    x.style.position = "fixed";
    x.style.display = "block";
    x.className = "umlPic";
    headerDiv.appendChild(x);
    headerDiv.appendChild(titleDiv);
    headerDiv.innerHTML += val;
  });
