function makeClass(){


var idP = /(\d{2} [0-9]{3})|([A-Z]{4} \w+)/gm;
var nameP = /\w+(.*)(?=\n\D\D(\d{4} (Fall|Spring|Winter|Summer)))/gm;
var dateP = /(\d{4} (Fall|Spring|Winter|Summer))/gm;
var gradeP = /([A-Z][A-Z]*|\W\W)(\+*|\-*)(?=\n\D\D\d\.\d\d)/gm;
var creditsP = /\d\.\d\d/gm;
var takenP = /(Transferred|Taken|In Progress)/gm;
var start = document.getElementById("start").value;

var idArray = start.match(idp);
var len = idArray.length();
}


function getMatches(text,pattern){


}
