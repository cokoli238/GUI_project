function readTextFile(url) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var myObj = JSON.parse(this.responseText);
      return myObj;
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}


function getJson() {
  //Text field is the URL of the database
  return readTextFile("data.json");
}
