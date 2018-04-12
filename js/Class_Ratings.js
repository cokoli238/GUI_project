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

function constructClass(classObj) {
  var id = getClassID();
  if (classObj.id != id) {
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



  var reviewDiv = document.createElement("div");
  reviewDiv.className = 'classHiddenDiv';
  var reviewText = "";
  var avgRev = 0;
  if (typeof classObj.reviews != "undefined" && classObj.reviews.length > 0) {
    for (var i = 0, l = classObj.reviews.length; i < l; i += 1) {
      var ratingText = "";
      for (j = 1; j < 6; j++) {
        if (j <= classObj.reviews[i].rating) {
          ratingText = ratingText + "<span class=\"fa fa-star checked\"></span>";
        } else {
          ratingText = ratingText + "<span class=\"fa fa-star\"></span>";
        }
      }
      reviewText = reviewText + "<p>" + ratingText + "</p> <p>" + classObj.reviews[i].text + "</p>";
      avgRev = avgRev + classObj.reviews[i].rating;
    }

    var reviewsLabel = document.createElement("Label");
    reviewsLabel.className = "classText";
    reviewsLabel.innerHTML = "<p> Reviews: " + reviewText + "</p>";
    reviewDiv.appendChild(reviewsLabel);

    avgRev = avgRev / classObj.reviews.length;
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
    avgReviewLabel.innerHTML = "<p>Avgerage Rating: </p><p>" + ratingText + "(" + avgRev + ")" + "</p>";
    avgReviewLabel.className = "classTextTitle";
    classDiv.appendChild(avgReviewLabel);
  }



  //---Comment Box-
  var reviewTextDiv = document.createElement("div");
  reviewTextDiv.className = 'userReview';
  var reviewText = document.createElement('TEXTAREA');
  reviewText.type = "text";
  reviewText.rows = "10";
  reviewText.style.fontSize = "25px";
  reviewTextDiv.appendChild(reviewText);

  var submitButton = document.createElement("Label");
  submitButton.className = 'button';
  submitButton.innerHTML = "Submit Review";
  submitButton.className = "classButton";
  //Hides and unhides the description and keywords on click
  submitButton.onclick = function() {

  };
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

  var addButton = document.createElement("Label");
  addButton.className = 'button';
  addButton.innerHTML = "Add to schedule";
  addButton.className = "classButton";
  classDiv.appendChild(addButton);



  //Attach the hidden div after the buttons
  classDiv.appendChild(reviewDiv);
  classDiv.appendChild(reviewTextDiv);


  //Append the individual class to the Classes div
  document.getElementById("Class").appendChild(classDiv);
}

function displayClass(err, data) {
  data.database.forEach(constructClass);
  constructClass(data);
}

function getClassID() {
  var a = window.location.toString();
  var name = a.substring(a.indexOf('?') + 1);
  return name;
}

getJSON("class_ratings_catalog.json", displayClass);
