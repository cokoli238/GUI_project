function readTextFile(url) {
  var request = new Request(url, {
  	method: 'POST',
  	mode: 'cors',
  	redirect: 'follow',
  	headers: new Headers({
  		'Content-Type': 'text/plain'
  	})
  });

  console.log('Reading: ', url);
  fetch(request)
  .then(res => res.json())
  .then((out) => {
    console.log('Checkout this JSON! ', out);
    var test = out.database;
    test.forEach(constructClass);
    return out;
  })
  .catch(err => { throw err });
}

function getJson() {
  //Text field is the URL of the database
  //NOTE: Currently need to disable Cross-Origin restrictios in browser
  //This should be fixed when all files are in a common server
  var test = readTextFile("file:///Users/tim/GIT/GUI_project/cs_catalog.json");
  return test;
}

function clearClasses(){
  var classChildren = document.getElementById("Classes").children;
  classChildren.innerHTML = "";
}

function constructClass(classObj, index){
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

  if(typeof classObj.keywords != "undefined" && classObj.keywords.length > 0){
    var text = classObj.keywords.reduce(function(final, object){return final + ", " + object;});
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
    if(descLabel.style.display == 'none'){
          descLabel.style.display = '';
          keywordLabel.style.display = '';

    }
      else {
          descLabel.style.display = 'none';
          keywordLabel.style.display = 'none';
      }
  };
  classDiv.appendChild(detailsButton);

  //Append the individual class to the Classes div
  document.getElementById("Classes").appendChild(classDiv);
}

function searchClasses(criteria){
  var idMatch = [];
  var titleMatch = [];
  var keywordMatch = [];
  var database = getJson();
  //Split by spaces, then by commas
  var criteriaArraySpace = criteria.split(" ");
  var criteriaArrayComma = criteria.split(",");
  criteriaArraySpace.forEach(function(criteria, index){
    //Iterate through each class
    database.database.forEach(function(object,index){
      if(object.id.contains(criteria)){
        idMatch[idMatch.length + 1] = object;
        return;
      }
      if(criteria.contains(object.name)){
        titleMatch[titleMatch.length + 1] = object;
        return;
      }
      var keywordCount = 0;
      object.keywords.forEach(function(keyword,index){
        //Iterate through each keyword in class
          if(keyword == criteria){
            keywordCount++;
          }
      });
      if(keywordCount > 0){
        keywordMatch[keywordMatch.length + 1] = [keywordCount, object];
      }
      });

    });

    //Now that we have the sorted classes, send them to the div builder
    //idMatch.forEach(constructClass);
    //titleMatch.forEach(constructClass);
    //keywordMatch.sort(function(a, b){return a[0] - b[0]}).forEach(constructClass);


  }
