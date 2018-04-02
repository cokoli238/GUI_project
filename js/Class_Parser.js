var getJSON = function(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'json';
  xhr.onload = function() {
    var status = xhr.status;
    if (status === 200) {
      callback(null, xhr.response);
    } else {
      callback(status, xhr.response);
    }
  };
  xhr.send();
};

function clearSearch() {
  getJSON2("cs_catalog.json", function(err, data) {
    data.database.forEach(constructClass);
  });
  document.getElementById("textSearch").value = "";
}

function clearClasses() {
  var classChildren = document.getElementById("Classes");
  classChildren.innerHTML = "";
}

function searchJson() {
  getJSON("cs_catalog.json", searchClasses);
}

function constructClass(classObj, index) {
  //Create div for individual class and set class name
  var classDiv = document.createElement("div");
  classDiv.className = 'classDiv';

  //NOTE: Add a formatting class to the div
  classDiv.id = classObj.id;

  //Add info to the child here
  //---Class labels---
  var idLabel = document.createElement("Label");
  idLabel.innerHTML = "<p>" + classObj.id + "</p>";
  idLabel.className = "classText";
  classDiv.appendChild(idLabel);

  var titleLabel = document.createElement("Label");
  titleLabel.innerHTML = "<p>" + classObj.name + "</p>";
  titleLabel.className = "classText";
  classDiv.appendChild(titleLabel);

  var descLabel = document.createElement("Label");
  descLabel.innerHTML = "<p>" + classObj.description + "</p>";
  //Hide text until ready to display
  descLabel.style.display = 'none';
  descLabel.className = "classText";
  classDiv.appendChild(descLabel);

  var keywordLabel = document.createElement("Label");

  if (typeof classObj.keywords != "undefined" && classObj.keywords.length > 0) {
    var text = classObj.keywords.reduce(function(final, object) {
      return final + ", " + object;
    });
    text = text.substring(0, text.length - 1);
    keywordLabel.className = "classText";
    keywordLabel.innerHTML = "<p>" + text + "</p>";
  }
  //Hide text until ready to display
  keywordLabel.style.display = 'none';
  classDiv.appendChild(keywordLabel);

  //---Buttons---
  var addButton = document.createElement("Label");
  addButton.className = 'button';
  addButton.innerHTML = "Add to schedule";
  addButton.className = "classButton";
  classDiv.appendChild(addButton);

  var detailsButton = document.createElement("Label");
  detailsButton.className = 'button';
  detailsButton.innerHTML = "Details";
  detailsButton.className = "classButton";
  //Hides and unhides the description and keywords on click
  detailsButton.onclick = function() {
    if (descLabel.style.display == 'none') {
      descLabel.style.display = '';
      keywordLabel.style.display = '';

    } else {
      descLabel.style.display = 'none';
      keywordLabel.style.display = 'none';
    }
  };
  classDiv.appendChild(detailsButton);

  //Append the individual class to the Classes div
  document.getElementById("Classes").appendChild(classDiv);
}

function searchClasses(err, data) {
  clearClasses();
  var database = data.database;
  var criteria = document.getElementById("textSearch").value;
  var idMatch = [];
  var titleMatch = [];
  var keywordMatch = [];
  //Split by spaces, then by commas
  var criteriaArraySpace = criteria.split(" ");
  var criteriaArrayComma = criteria.split(",");
  criteriaArraySpace.forEach(function(criteria, index) {
    //Iterate through each class
    database.forEach(function(object, index) {
      if (typeof object.id != undefined && object.id.toUpperCase().includes(criteria.toUpperCase())) {
        idMatch[idMatch.length + 1] = object;
        return;
      }
      if (typeof object.name != undefined && (criteria.toUpperCase().includes(object.name.toUpperCase()) || object.name.toUpperCase().includes(criteria.toUpperCase()))) {
        titleMatch[titleMatch.length + 1] = object;
        return;
      }
      var keywordCount = 0;
      object.keywords.forEach(function(keyword, index) {
        //Iterate through each keyword in class
        if (keyword == criteria) {
          keywordCount++;
        }
      });
      if (keywordCount > 0) {
        keywordMatch[keywordMatch.length + 1] = [keywordCount, object];
      }
    });

  });

  //Now that we have the sorted classes, send them to the div builder
  idMatch.forEach(constructClass);
  titleMatch.forEach(constructClass);
  keywordMatch.sort(function(a, b) {
    return a[0] - b[0]
  }).forEach(constructClass);


}
