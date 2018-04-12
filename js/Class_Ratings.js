var userRating = 0;

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

function constructClass(classObj, id) {
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



//Reviews
  var reviewsLabel = document.createElement("Label");
  reviewsLabel.id = "reviews";
  reviewsLabel.className = "classText";


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
    reviewsLabel.innerHTML = "<p>" + reviewText + "</p>";

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
    avgReviewLabel.innerHTML = "<p>Avgerage Rating: </p><p>" + ratingText + " (" + avgRev + ")" + "</p>";
    avgReviewLabel.className = "classTextTitle";
    classDiv.appendChild(avgReviewLabel);
  }
  reviewDiv.appendChild(reviewsLabel);


  //---Comment Box-
  var reviewTextDiv = document.createElement("div");
  reviewTextDiv.className = 'userReview';
  var reviewText = document.createElement('TEXTAREA');
  reviewText.type = "text";
  reviewText.id = "userReview";
  reviewText.rows = "10";
  reviewText.style.fontSize = "25px";
  reviewTextDiv.appendChild(reviewText);

var starDiv = document.createElement("div");
var starOne = document.createElement("Label");
starOne.innerHTML = "<span class=\"fa fa-star\"></span>";
starOne.onclick = function(){
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
starTwo.onclick = function(){
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
starThree.onclick = function(){
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
starFour.onclick = function(){
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
starFive.onclick = function(){
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
  //Hides and unhides the description and keywords on click
  submitButton.onclick = function() {
    var reviews = document.getElementById("reviews");
    var userText = document.getElementById("userReview").value;
    var ratingTextStars = "";
      for (var j = 1; j < 6; j++) {
        if (j <= userRating) {
          ratingTextStars = ratingTextStars + "<span class=\"fa fa-star checked\"></span>";
        } else {
          ratingTextStars = ratingTextStars + "<span class=\"fa fa-star\"></span>";
        }
      }

    reviews.innerHTML = "<p>" + ratingTextStars + "</p>" + "<p>" + userText + "</p>" + reviews.innerHTML;

    this.innerHTML = "Thanks for reviewing!";
    submitButton.onclick = "";
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
  var found = false;
  var name = getClassName();
  data.database.forEach(function(obj){
    found = constructClass(obj,name);
  });
  if(!found){
    var notFoundLabel = document.createElement("Label");
    notFoundLabel.innerHTML = "<p>" + "Couldn't find class: " + name + "</p>";
    notFoundLabel.style.fontSize = "30px";
    document.getElementById("Class").appendChild(notFoundLabel);
  }
}

function getClassID() {
  var a = window.location.toString();
  var name = a.substring(a.indexOf('?') + 1);
  return name;
}

getJSON("class_ratings_catalog.json", displayClass);
