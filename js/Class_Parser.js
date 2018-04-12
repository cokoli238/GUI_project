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
  getJSON("cs_catalog.json", displayAllClasses);
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
  idLabel.className = "classTextTitle";
  classDiv.appendChild(idLabel);

  var titleLabel = document.createElement("Label");
  titleLabel.innerHTML = "<p>" + classObj.name + "</p>";
  titleLabel.className = "classTextTitle";
  classDiv.appendChild(titleLabel);

  var creditsLabel = document.createElement("Label");
  creditsLabel.innerHTML = "<p>Credits: " + classObj.credits + "</p>";
  creditsLabel.className = "classTextTitle";
  classDiv.appendChild(creditsLabel);

  var teacherLabel = document.createElement("Label");
  teacherLabel.innerHTML = "<p>Teacher: " + classObj.teacher + "</p>";
  teacherLabel.className = "classTextTitle";
  classDiv.appendChild(teacherLabel);



  var hiddenDiv = document.createElement("div");
  hiddenDiv.className = 'classHiddenDiv';
  //Hide text until ready to display
  hiddenDiv.style.display = 'none';


  var descLabel = document.createElement("Label");
  descLabel.innerHTML = "<p> Description: " + classObj.description + "</p>";
  //Hide text until ready to display
  descLabel.className = "classTextDescription";
  hiddenDiv.appendChild(descLabel);

  var keywordLabel = document.createElement("Label");

  if (typeof classObj.keywords != "undefined" && classObj.keywords.length > 0) {
    var text = classObj.keywords.reduce(function(final, object) {
      return final + ", " + object;
    });
    text = text.substring(0, text.length);
    keywordLabel.className = "classText";
    keywordLabel.innerHTML = "<p> Keywords: " + text + "</p>";
    hiddenDiv.appendChild(keywordLabel);
  }



  var preReqLabel = document.createElement("Label");

  if (typeof classObj.prerequisites != "undefined" && classObj.prerequisites.length > 0) {
    var text = classObj.prerequisites.reduce(function(final, object) {
      return final + ", " + object;
    });
    text = text.substring(0, text.length);
    preReqLabel.className = "classText";
    preReqLabel.innerHTML = "<p> Pre Reqs: " + text + "</p>";
    hiddenDiv.appendChild(preReqLabel);
  }

  var coReqLabel = document.createElement("Label");

  if (typeof classObj.corequisites != "undefined" && classObj.corequisites.length > 0) {
    var text = classObj.corequisites.reduce(function(final, object) {
      return final + ", " + object;
    });
    text = text.substring(0, text.length);
    coReqLabel.className = "classText";
    coReqLabel.innerHTML = "<p> Pre Reqs: " + text + "</p>";
    hiddenDiv.appendChild(coReqLabel);
  }

  var teacherRating = document.createElement("Label");
  var ratingText = "";
  for (i = 1; i < 6; i++) {
    if (i <= classObj.rating) {
      ratingText = ratingText + "<span class=\"fa fa-star checked\"></span>";
    } else {
      ratingText = ratingText + "<span class=\"fa fa-star\"></span>";
    }
  }
  teacherRating.innerHTML = "<p>Teacher Rating: " + ratingText + "</p>";
  teacherRating.className = "classText";
  hiddenDiv.appendChild(teacherRating);



  //---Buttons---
  var detailsButton = document.createElement("Label");
  detailsButton.className = 'button';
  detailsButton.innerHTML = "Details";
  detailsButton.className = "classButton";
  //Hides and unhides the description and keywords on click
  detailsButton.onclick = function() {
    if (hiddenDiv.style.display == 'none') {
      hiddenDiv.style.display = '';

    } else {
      hiddenDiv.style.display = 'none';
    }
  };
  classDiv.appendChild(detailsButton);

  var addButton = document.createElement("Label");
  addButton.className = 'button';
  addButton.innerHTML = "Add to schedule";
  addButton.className = "classButton";
  classDiv.appendChild(addButton);

  var reviewButton = document.createElement("Label");
  reviewButton.className = 'button';
  reviewButton.innerHTML = "Review Class";
  reviewButton.className = "classButton";
  classDiv.appendChild(reviewButton);



  //Attach the hidden div after the buttons
  classDiv.appendChild(hiddenDiv);

  //Append the individual class to the Classes div
  document.getElementById("Classes").appendChild(classDiv);
}

function displayAllClasses(err, data) {
  clearClasses();
  data.database.forEach(constructClass);
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
  }).forEach(function(obj, index) {
    constructClass(obj[1], index);
  });


}

//Start the page by displaying all Classes
getJSON("cs_catalog.json", displayAllClasses);

//Associate enter key with search
// Get the input field
var input = document.getElementById("textSearch");

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
  // Cancel the default action, if needed
  event.preventDefault();
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Trigger the button element with a click
    document.getElementById("Class_Search").click();
  }
});
