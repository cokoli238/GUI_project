var userRating = 0;
var className = "";
var snapshot;
var snapshotUser;

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

function setClassName(err, data) {
  var id = getClassID();
  data.database.forEach(function(obj) {
    if (obj.id == id) {
      className = obj.name;
    }
  });
  displayClass();
}

function get_user_first_name() {
  return (snapshotUser.val() && snapshotUser.val().firstName) || "";
}

function get_user_last_name() {
  return (snapshotUser.val() && snapshotUser.val().lastName) || "";
}

function removeReview(uid) {
  var reviews = get_class_database();
  var classID = getClassID().replace(".", "");
  var name = get_user_first_name() + " " + get_user_last_name();
  var uid = window.user.uid;
  for (var i = 0; i < reviews.length; i++) {
    if (reviews[i]["uid"] == uid) {
      reviews.splice(i, 1);
    }
  }
  var reviewsJson = JSON.stringify(reviews);
  firebase.database().ref('/classes/' + classID).set({
    reviews: reviewsJson
  }).then(function() {
    window.location.reload();
  }).catch(function(err) {
    // Handle errors
    alert(err.message);
  });

}

function add_review(rating, text) {
  var reviews = get_class_database();
  var classID = getClassID().replace(".", "");
  var name = get_user_first_name() + " " + get_user_last_name();
  var uid = window.user.uid;
  var obj = {};
  obj.rating = rating;
  obj.text = text;
  obj.uid = uid;
  obj.name = name;

  reviews.push(obj);
  var reviewsJson = JSON.stringify(reviews);
  firebase.database().ref('/classes/' + classID).set({
    reviews: reviewsJson
  }).then(function() {
    window.location.reload();
  }).catch(function(err) {
    // Handle errors
    alert(err.message);
  });
}

function constructClass(classObj, name, id) {
  var reviewAlreadyPosted = false;
  //Create div for individual class and set class name
  var classDiv = document.createElement("div");
  classDiv.className = 'classDiv';

  //NOTE: Add a formatting class to the div
  classDiv.id = classObj.id;

  //Add info to the child here
  //---Class labels---
  var idLabel = document.createElement("Label");
  idLabel.innerHTML = "<p>" + id + "</p>";
  idLabel.className = "classTextTitle";
  classDiv.appendChild(idLabel);

  var titleLabel = document.createElement("Label");
  titleLabel.innerHTML = "<p>" + name + "</p>";
  titleLabel.className = "classTextTitle";
  classDiv.appendChild(titleLabel);

  //Reviews
  var reviewsLabel = document.createElement("Label");
  reviewsLabel.id = "reviews";
  reviewsLabel.className = "classText";


  var reviewDiv = document.createElement("div");

  reviewDiv.className = 'classHiddenDiv';
  var reviewText = "";
  var avgRev = 0;
  if (typeof classObj != "undefined" && classObj.length > 0) {
    for (var i = 0, l = classObj.length; i < l; i += 1) {
      if (classObj[i].uid == window.user.uid) {
        reviewAlreadyPosted = true;
      }
      var ratingText = "";
      for (j = 1; j < 6; j++) {
        if (j <= classObj[i].rating) {
          ratingText = ratingText + "<span class=\"fa fa-star checked\"></span>";
        } else {
          ratingText = ratingText + "<span class=\"fa fa-star\"></span>";
        }
      }
      reviewText = reviewText + "<p>" + ratingText + "</p> <p>" + classObj[i].text + "</p>";
      avgRev = avgRev + classObj[i].rating;
    }
    reviewsLabel.innerHTML = "<p>" + reviewText + "</p>";

    avgRev = avgRev / classObj.length;
    var ratingText = "";
    for (j = 1; j < 6; j++) {
      if (j <= avgRev) {
        ratingText = ratingText + "<span class=\"fa fa-star checked\"></span>";
      } else {
        ratingText = ratingText + "<span class=\"fa fa-star\"></span>";
      }
    }
    //After processing the reviews, get the average we calculated
    var avgReviewLabel = document.createElement("Label");
    avgReviewLabel.innerHTML = "<p>Avgerage Rating: </p><p>" + ratingText + " (" + avgRev + ")" + "</p>";
    avgReviewLabel.className = "classTextTitle";
    classDiv.appendChild(avgReviewLabel);
  } else {
    reviewsLabel.innerHTML = "No reviews yet";
  }
  reviewDiv.appendChild(reviewsLabel);


  //---Comment Box-
  var reviewTextDiv = document.createElement("div");
  reviewTextDiv.className = 'userReview';
  var reviewText = document.createElement('TEXTAREA');
  reviewText.type = "text";
  reviewText.id = "userReview";
  reviewText.placeholder = "Write review here...";
  reviewText.rows = "10";
  reviewText.style.fontSize = "25px";
  reviewTextDiv.appendChild(reviewText);

  var starDiv = document.createElement("div");
  var starOne = document.createElement("Label");
  starOne.innerHTML = "<span class=\"fa fa-star\"></span>";
  starOne.onclick = function() {
    starOne.innerHTML = "<span class=\"fa fa-star checked\"></span>";
    starTwo.innerHTML = "<span class=\"fa fa-star\"></span>";
    starThree.innerHTML = "<span class=\"fa fa-star\"></span>";
    starFour.innerHTML = "<span class=\"fa fa-star\"></span>";
    starFive.innerHTML = "<span class=\"fa fa-star\"></span>";
    //Clear the div and readd the stars
    starDiv.innerHTML = "";
    starDiv.appendChild(starOne);
    starDiv.appendChild(starTwo);
    starDiv.appendChild(starThree);
    starDiv.appendChild(starFour);
    starDiv.appendChild(starFive);
    userRating = 1;
  }
  starDiv.appendChild(starOne);

  var starTwo = document.createElement("Label");
  starTwo.innerHTML = "<span class=\"fa fa-star\"></span>";
  starTwo.onclick = function() {
    starOne.innerHTML = "<span class=\"fa fa-star checked\"></span>";
    starTwo.innerHTML = "<span class=\"fa fa-star checked\"></span>";
    starThree.innerHTML = "<span class=\"fa fa-star\"></span>";
    starFour.innerHTML = "<span class=\"fa fa-star\"></span>";
    starFive.innerHTML = "<span class=\"fa fa-star\"></span>";
    //Clear the div and readd the stars
    starDiv.innerHTML = "";
    starDiv.appendChild(starOne);
    starDiv.appendChild(starTwo);
    starDiv.appendChild(starThree);
    starDiv.appendChild(starFour);
    starDiv.appendChild(starFive);
    userRating = 2;
  }
  starDiv.appendChild(starTwo);

  var starThree = document.createElement("Label");
  starThree.innerHTML = "<span class=\"fa fa-star\"></span>";
  starThree.onclick = function() {
    starOne.innerHTML = "<span class=\"fa fa-star checked\"></span>";
    starTwo.innerHTML = "<span class=\"fa fa-star checked\"></span>";
    starThree.innerHTML = "<span class=\"fa fa-star checked\"></span>";
    starFour.innerHTML = "<span class=\"fa fa-star\"></span>";
    starFive.innerHTML = "<span class=\"fa fa-star\"></span>";
    //Clear the div and readd the stars
    starDiv.innerHTML = "";
    starDiv.appendChild(starOne);
    starDiv.appendChild(starTwo);
    starDiv.appendChild(starThree);
    starDiv.appendChild(starFour);
    starDiv.appendChild(starFive);
    userRating = 3;
  }
  starDiv.appendChild(starThree);

  var starFour = document.createElement("Label");
  starFour.innerHTML = "<span class=\"fa fa-star\"></span>";
  starFour.onclick = function() {
    starOne.innerHTML = "<span class=\"fa fa-star checked\"></span>";
    starTwo.innerHTML = "<span class=\"fa fa-star checked\"></span>";
    starThree.innerHTML = "<span class=\"fa fa-star checked\"></span>";
    starFour.innerHTML = "<span class=\"fa fa-star checked\"></span>";
    starFive.innerHTML = "<span class=\"fa fa-star\"></span>";
    //Clear the div and readd the stars
    starDiv.innerHTML = "";
    starDiv.appendChild(starOne);
    starDiv.appendChild(starTwo);
    starDiv.appendChild(starThree);
    starDiv.appendChild(starFour);
    starDiv.appendChild(starFive);
    userRating = 4;
  }
  starDiv.appendChild(starFour);

  var starFive = document.createElement("Label");
  starFive.innerHTML = "<span class=\"fa fa-star\"></span>";
  starFive.onclick = function() {
    starOne.innerHTML = "<span class=\"fa fa-star checked\"></span>";
    starTwo.innerHTML = "<span class=\"fa fa-star checked\"></span>";
    starThree.innerHTML = "<span class=\"fa fa-star checked\"></span>";
    starFour.innerHTML = "<span class=\"fa fa-star checked\"></span>";
    starFive.innerHTML = "<span class=\"fa fa-star checked\"></span>";
    //Clear the div and readd the stars
    starDiv.innerHTML = "";
    starDiv.appendChild(starOne);
    starDiv.appendChild(starTwo);
    starDiv.appendChild(starThree);
    starDiv.appendChild(starFour);
    starDiv.appendChild(starFive);
    userRating = 5;
  }
  starDiv.appendChild(starFive);

  reviewTextDiv.appendChild(starDiv);
  var submitButton = document.createElement("Label");
  submitButton.className = 'button';
  submitButton.innerHTML = "Submit Review";
  submitButton.className = "classButton";

  var removeButton = document.createElement("Label");
  removeButton.className = 'button';
  removeButton.innerHTML = "Remove Review";
  removeButton.className = "classButtonRemove";
  //Hides and unhides the description and keywords on click

  removeButton.onclick = function() {
    removeReview(window.user.uid);
  };

  submitButton.onclick = function() {
    var userText = document.getElementById("userReview").value;
    if (userRating < 1) {
      alert("Must rate 1 star or higher");
    } else {
      add_review(userRating, userText)
    }
  };

  if (reviewAlreadyPosted) {
    removeButton.style.display = '';
    submitButton.style.display = 'none';
  } else {
    removeButton.style.display = 'none';
    submitButton.style.display = '';
  }
  reviewTextDiv.appendChild(removeButton);
  reviewTextDiv.appendChild(submitButton);




  //---Buttons---
  var detailsButton = document.createElement("Label");
  detailsButton.className = 'button';
  detailsButton.innerHTML = "Back";
  detailsButton.className = "classButton";
  //Hides and unhides the description and keywords on click
  detailsButton.onclick = function() {
    window.history.back();
  };
  classDiv.appendChild(detailsButton);


  //Attach the hidden div after the buttons
  classDiv.appendChild(reviewDiv);
  classDiv.appendChild(reviewTextDiv);


  //Append the individual class to the Classes div
  document.getElementById("Class").appendChild(classDiv);
}

function get_class_database() {
  return JSON.parse(get_class_reviews());
}

function get_class_reviews() {
  var val = (snapshot.val() && snapshot.val().reviews) || "[]";
  return val;
}

function displayClass() {
  var found = false;
  var id = getClassID();
  var data = get_class_database();

  if (snapshot.val()) {
    constructClass(data, className, id);
  } else {
    var objTemp = [];
    constructClass(objTemp, className, id);
  }
}

function getClassID() {
  var a = window.location.toString();
  var name = a.substring(a.indexOf('?') + 1);
  return name;
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    window.user = user;
    get_snapshot_user();
  } else {
    window.user = user;
  }
});


function get_snapshot_user() {
  firebase.database().ref('/users/' + window.user.uid).once('value').then(function(val) {
    snapshotUser = val;
    //Start the page by displaying all Classes
    get_snapshot();
  }).catch(function(err) {
    // Handle Errors here.
    alert(err.message);
  });
}

function get_snapshot() {
  var className = getClassID().replace(".", "");
  firebase.database().ref('/classes/' + className).once('value').then(function(val) {
    snapshot = val;
    //Start the page by displaying all Classes
    getJSON("cs_catalog.json", setClassName);
  }).catch(function(err) {
    // Handle Errors here.
    alert(err.message);
  });
}
