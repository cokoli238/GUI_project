var snapshotTeachers;
var snapshotClasses;

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

function get_average_class_rating(id) {
  var snapshotClass = snapshotClasses.child(id);
  var val = JSON.parse((snapshotClass.val() && snapshotClass.val().reviews) || "[]");
  var avg = 0;
  val.forEach(function(obj) {
    avg += obj.rating;
  });
  if (val.length > 0) {
    avg = avg / val.length;
    return avg;
  } else {
    return 0;
  }

}

function get_average_teacher_rating(name) {
  var snapshotTeacher = snapshotTeachers.child(name);
  var val = JSON.parse((snapshotTeacher.val() && snapshotTeacher.val().reviews) || "[]");
  var avg = 0;
  val.forEach(function(obj) {
    avg += obj.rating;
  });
  if (val.length > 0) {
    avg = avg / val.length;
    return avg;
  } else {
    return 0;
  }
}

function addToSchedule(classId) {
  firebase.database().ref('/users/' + window.user.uid).once('value').then(function(val) {
    snapshot = val;
    var classes = get_my_classes();
    var firstName = get_user_first_name();
    var lastName = get_user_last_name();
    var major = get_user_major();
    var minor = get_user_minor();
    classes.push(classId);
    var classesJson = JSON.stringify(classes);
    firebase.database().ref('users/' + window.user.uid).set({
      firstName: firstName,
      lastName: lastName,
      major: major,
      minor: minor,
      classes: classesJson
    }).then(function() {

    }).catch(function(err) {
      // Handle errors
      alert(err.message);
    });
  }).catch(function(err) {
    // Handle Errors here.
    alert(err.message);
  });

}

function removeFromSchedule(classId) {
  firebase.database().ref('/users/' + window.user.uid).once('value').then(function(val) {
    snapshot = val;
    var classes = get_my_classes();
    var firstName = get_user_first_name();
    var lastName = get_user_last_name();
    var major = get_user_major();
    var minor = get_user_minor();
    var index = classes.indexOf(classId);
    if (index > -1) {
      classes.splice(index, 1);
    }
    var classesJson = JSON.stringify(classes);
    firebase.database().ref('users/' + window.user.uid).set({
      firstName: firstName,
      lastName: lastName,
      major: major,
      minor: minor,
      classes: classesJson
    }).then(function() {

    }).catch(function(err) {
      // Handle errors
      alert(err.message);
    });
  }).catch(function(err) {
    // Handle Errors here.
    alert(err.message);
  });

}

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

function get_my_classes() {
  return JSON.parse(get_user_classes());
}

function constructClass(classObj, index) {

  //Create div for individual class and set class name
  var classDiv = document.createElement("div");
  classDiv.className = 'classDiv';

  //NOTE: Add a formatting class to the div
  classDiv.id = classObj.id;

  //Add info to the child here
  //---Class labels---
  var ratingText = "";
  var classRate = get_average_class_rating(classObj.id.replace(".", ""));
  for (i = 1; i < 6; i++) {
    if (i <= classRate) {
      ratingText = ratingText + "<span class=\"fa fa-star checked\"></span>";
    } else {
      ratingText = ratingText + "<span class=\"fa fa-star\"></span>";
    }
  }
  var idLabel = document.createElement("Label");
  idLabel.innerHTML = "<p>" + classObj.id + "</p> <p>" + ratingText + "</p>";
  idLabel.className = "classTextTitle";
  idLabel.onclick = function() {
    window.location = 'class_ratings.html?' + classObj.id;
  };
  idLabel.style.cursor = "pointer";
  classDiv.appendChild(idLabel);


  var titleLabel = document.createElement("Label");
  titleLabel.innerHTML = "<p>" + classObj.name + "</p>";
  titleLabel.className = "classTextTitle";
  classDiv.appendChild(titleLabel);

  var creditsLabel = document.createElement("Label");
  creditsLabel.innerHTML = "<p>Credits: " + classObj.credits + "</p>";
  creditsLabel.className = "classTextTitle";
  classDiv.appendChild(creditsLabel);

  if (typeof classObj.teacher != "undefined") {
    var teacherRate = get_average_teacher_rating(classObj.teacher);
    var ratingText = "";
    for (i = 1; i < 6; i++) {
      if (i <= teacherRate) {
        ratingText = ratingText + "<span class=\"fa fa-star checked\"></span>";
      } else {
        ratingText = ratingText + "<span class=\"fa fa-star\"></span>";
      }
    }
    var teacherLabel = document.createElement("Label");
    teacherLabel.innerHTML = "<p>" + classObj.teacher + "</p> <p>" + ratingText + "</p>";
    teacherLabel.className = "classTextTitle";
    //teacherLabel.style.textDecoration = "underline";
    teacherLabel.style.cursor = "pointer";
    teacherLabel.onclick = function() {
      window.location = 'teacher_ratings.html?' + classObj.teacher.replace(" ", "_");
    };
    classDiv.appendChild(teacherLabel);
  }



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


  if (typeof classObj.prerequisites != "undefined" && classObj.prerequisites.length > 0) {
    var preReqDiv = document.createElement("div");
    preReqDiv.className = "classText";
    preReqDiv.innerHTML = "<p>";
    var preReqLabel = document.createElement("Label");
    preReqDiv.appendChild(preReqLabel);
    preReqLabel.innerHTML = "Pre-Reqs: ";
    classObj.prerequisites.forEach(function(obj) {
      var val = document.createElement("Label");
      val.style.cursor = "pointer";
      val.innerHTML = obj + ", ";
      val.onclick = function() {
        var input = document.getElementById("textSearch");
        input.value = obj.replace(" ", ".");
        document.getElementById("Class_Search").click();
      };
      preReqDiv.appendChild(val);
    });
    preReqDiv.innerHTML += "</p>";
    hiddenDiv.appendChild(preReqDiv);
  }


  if (typeof classObj.corequisites != "undefined" && classObj.corequisites.length > 0) {
    var coReqDiv = document.createElement("div");
    coReqDiv.className = "classText";
    coReqDiv.innerHTML = "<p>";
    var coReqLabel = document.createElement("Label");
    coReqDiv.appendChild(coReqLabel);
    coReqLabel.innerHTML = "Co-Reqs: ";
    classObj.corequisites.forEach(function(obj) {
      var val = document.createElement("Label");
      val.style.cursor = "pointer";
      val.innerHTML = obj + ", ";
      val.onclick = function() {
        var input = document.getElementById("textSearch");
        input.value = obj.replace(" ", ".");
        document.getElementById("Class_Search").click();
      };
      coReqDiv.appendChild(val);
    });
    coReqDiv.innerHTML += "</p>";
    hiddenDiv.appendChild(coReqDiv);
  }

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

  var classes = get_my_classes();
  var classExists = false;
  classes.forEach(function(obj) {
    if (obj == classObj.id) {
      classExists = true;
    }
  });
  var addButton = document.createElement("Label");
  addButton.innerHTML = "Add To Schedule";
  addButton.className = "classButton";
  addButton.onclick = function() {
    addToSchedule(classObj.id);
    addButton.style.display = 'none';
    removeButton.style.display = '';
  };
  var removeButton = document.createElement("Label");
  removeButton.innerHTML = "Remove From Schedule";
  removeButton.className = "classButtonRemove";
  removeButton.onclick = function() {
    removeFromSchedule(classObj.id);
    removeButton.style.display = 'none';
    addButton.style.display = '';
  };

  if (classExists) {
    addButton.style.display = 'none';
    removeButton.style.display = '';
  } else {
    removeButton.style.display = 'none';
    addButton.style.display = '';
  }


  classDiv.appendChild(addButton);
  classDiv.appendChild(removeButton);


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
  database.forEach(function(object, index) {
    if (typeof object.teacher != "undefined" && (object.teacher.toUpperCase().includes(criteria.toUpperCase()))) {
      idMatch[idMatch.length + 1] = object;
      return;
    }
    if (typeof object.id != "undefined" && object.id.toUpperCase().includes(criteria.toUpperCase())) {
      idMatch[idMatch.length + 1] = object;
      return;
    }

    //Process each word seperated by spaces
    criteriaArraySpace.forEach(function(criteria, index) {
      if (typeof object.name != "undefined" && (criteria.toUpperCase().includes(object.name.toUpperCase()) || object.name.toUpperCase().includes(criteria.toUpperCase()))) {
        titleMatch[titleMatch.length + 1] = object;
        return;
      }
      var keywordCount = 0;
      object.keywords.forEach(function(keyword, index) {
        //Iterate through each keyword in class
        if (keyword.toUpperCase() == criteria.toUpperCase()) {
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



firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    window.user = user;
    get_snapshot_teachers();
  } else {
    window.user = user;
  }
});

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

function get_user_classes() {
  var val = (snapshot.val() && snapshot.val().classes) || "";
  return val;
}

function get_snapshot() {
  firebase.database().ref('/users/' + window.user.uid).once('value').then(function(val) {
    snapshot = val;
    //Start the page by displaying all Classes
    getJSON("cs_catalog.json", displayAllClasses);
  }).catch(function(err) {
    // Handle Errors here.
    alert(err.message);
  });
}



function get_snapshot_teachers() {
  firebase.database().ref('/teachers/').once('value').then(function(val) {
    snapshotTeachers = val;
    //Start the page by displaying all Classes
    get_snapshot_classes();
  }).catch(function(err) {
    // Handle Errors here.
    alert(err.message);
  });
}

function get_snapshot_classes() {
  firebase.database().ref('/classes/').once('value').then(function(val) {
    snapshotClasses = val;
    //Start the page by displaying all Classes
    get_snapshot();
  }).catch(function(err) {
    // Handle Errors here.
    alert(err.message);
  });
}

function getSearch() {
  var a = window.location.toString();
  var name = a.substring(a.indexOf('?') + 1);
  return name;
}

//If theres a ?, then we have a search we want to perform on page load
if (a.indexOf('?') > -1) {
  var val = getSearch();
  //Associate enter key with search
  // Get the input field
  var input = document.getElementById("textSearch");
  input.value = val;
  document.getElementById("Class_Search").click();
}
