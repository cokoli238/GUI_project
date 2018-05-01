var snapshot;

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

function clearClasses() {
  var classChildren = document.getElementById("Classes");
  classChildren.innerHTML = "";
}

function get_my_classes() {
  return JSON.parse(get_user_classes());
}

function constructClass(classObj, index) {
  var classes = get_my_classes();
  var classExists = false;
  classes.forEach(function(obj) {
    if (obj == classObj.id) {
      classExists = true;
    }

  });
  if (!classExists) {
    return;
  }

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

  if (typeof classObj.teacher != "undefined") {
    var teacherLabel = document.createElement("Label");
    teacherLabel.innerHTML = "<p>Teacher: " + "</p><p>" + classObj.teacher + "</p>";
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


  var classRatingDiv = document.createElement("div");
  classRatingDiv.className = "classText";
  var classRating = document.createElement("Label");
  var ratingText = "";
  for (i = 1; i < 6; i++) {
    if (i <= classObj.rating) {
      ratingText = ratingText + "<span class=\"fa fa-star checked\"></span>";
    } else {
      ratingText = ratingText + "<span class=\"fa fa-star\"></span>";
    }
  }
  var classRatingStars = document.createElement("Label");
  classRatingStars.innerHTML = ratingText;
  classRatingStars.className = "classText";
  classRatingStars.style.paddingLeft = "5px";
  classRatingStars.style.paddingRight = "5px";

  classRating.innerHTML = "Class Rating: ";
  classRating.className = "classText";
  classRating.style.paddingRight = "5px";
  classRatingDiv.appendChild(classRating);
  classRatingDiv.appendChild(classRatingStars);

  var reviewButtonDiv = document.createElement("div");
  var reviewButton = document.createElement("Label");  
  reviewButton.className = 'classButton';  
  reviewButton.innerHTML = "Class Reviews";  
  reviewButton.className = "classButton";  
  reviewButton.style.float = "none";
  reviewButton.style.padding = "5px";
  reviewButton.onclick = function() {
    window.location = 'class_ratings.html?' + classObj.id;
  };
  reviewButtonDiv.appendChild(reviewButton);
  classRatingDiv.appendChild(reviewButtonDiv);
  hiddenDiv.appendChild(classRatingDiv);

  var teacherRatingDiv = document.createElement("div");
  teacherRatingDiv.className = "classText";
  var teacherRating = document.createElement("Label");
  var ratingText = "";
  for (i = 1; i < 6; i++) {
    if (i <= classObj.rating) {
      ratingText = ratingText + "<span class=\"fa fa-star checked\"></span>";
    } else {
      ratingText = ratingText + "<span class=\"fa fa-star\"></span>";
    }
  }
  var teacherRatingStars = document.createElement("Label");
  teacherRatingStars.innerHTML = ratingText;
  teacherRatingStars.className = "classText";
  teacherRatingStars.style.paddingLeft = "5px";
  teacherRatingStars.style.paddingRight = "5px";

  teacherRating.innerHTML = "Teacher Rating: ";
  teacherRating.className = "classText";
  teacherRating.style.paddingRight = "5px";
  teacherRatingDiv.appendChild(teacherRating);
  teacherRatingDiv.appendChild(teacherRatingStars);

  var teacherReviewButtonDiv = document.createElement("div");
  var teacherReviewButton = document.createElement("Label");  
  teacherReviewButton.className = 'classButton';  
  teacherReviewButton.innerHTML = "Teacher Reviews";  
  teacherReviewButton.className = "classButton";  
  teacherReviewButton.style.float = "none";
  teacherReviewButton.style.padding = "5px";
  teacherReviewButton.onclick = function() {
    window.location = 'teacher_ratings.html?' + classObj.teacher.replace(" ", "_");
  };
  teacherReviewButtonDiv.appendChild(teacherReviewButton);
  teacherRatingDiv.appendChild(teacherReviewButtonDiv);
  hiddenDiv.appendChild(teacherRatingDiv);


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
  addButton.innerHTML = "Remove from schedule";
  addButton.className = "classButton";
  addButton.onclick = function() {
    removeFromSchedule(classObj.id);
  };
  classDiv.appendChild(addButton);


  //Attach the hidden div after the buttons
  classDiv.appendChild(hiddenDiv);

  //Append the individual class to the Classes div
  document.getElementById("Classes").appendChild(classDiv);
}

function displayMyClasses(err, data) {
  clearClasses();
  data.database.forEach(constructClass);
}


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    window.user = user;
    get_snapshot();
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
    getJSON("cs_catalog.json", displayMyClasses);
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


function removeFromSchedule(classId) {
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
    document.getElementById(classId).innerHTML = "";
    document.getElementById(classId).remove();
  }).catch(function(err) {
    // Handle errors
    alert(err.message);
  });
}