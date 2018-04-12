 
function Course(id, name, date, grade, credits, taken) {
    this.id = id;
    this.name = name;
    this.date = date; 
    this.grade = grade;
    this.credits = credits;
    this.taken = taken;
}



function viewSequnce(courseHistoryArray){
	
	var comp1 = document.getElementById('Computing I');
	var comp2 = document.getElementById('Computing II');
	var col_writing1 = document.getElementById('College Writing I');
	var col_writing2 = document.getElementById('College Writing II');
	var calc1 = document.getElementById('Calculus I');
	var calc2 = document.getElementById('Calculus II');
	var assembly = document.getElementById('Comp Org & Assembly Lang');
	var comp3  = document.getElementById('Computing III');
	var comp4 = document.getElementById('Computing IV');
	var discrete1 = document.getElementById('Discrete Structures I');
	var discrete2 = document.getElementById('Discrete Structures II');
	var logic = document.getElementById('Logic Design');
	var probstat = document.getElementById('Prob. & Stats. I');
	var oral = document.getElementById('Oral & Written');
	var fnds = document.getElementById('Foundations of CS');
	var comp_arch = document.getElementById('Computer Architecture');
	var os = document.getElementById('Intro to Operating Sys.');
	var opl  = document.getElementById('Org. of Prog. Lang.');

for (i = 0; i < courseHistoryArray.length ; i++){
	var courseName = courseHistoryArray[i].name;
	var courseGrade = courseHistoryArray[i].grade;
	console.log("\nCourse: " + courseName + "\nGrade: " + courseGrade);
	

	/*var  = document.getElementById(' ');
	var  = document.getElementById(' ');
	var  = document.getElementById(' ');
	var  = document.getElementById(' ');
	var  = document.getElementById(' ');
	var  = document.getElementById(' ');
	//var  = document.getElementById(' ');*/

	//var comp4 = document.getElementById('Computing IV');
 	switch(courseName) {
    case "Computing I ":
        comp1.innerHTML = courseGrade;
        break;
    case "Computing II ":
        comp2.innerHTML = courseGrade;
        break;
    case "Calculus I ":
        calc1.innerHTML = courseGrade;
        break;
    case "College Writing I ":
        col_writing1.innerHTML = courseGrade;
        break;
    case "College Writing II ":
        col_writing2.innerHTML = courseGrade;
        break;
    case "Calculus II ":
        calc2.innerHTML = courseGrade;
        break;
    case "Comp Org & Assembly Lang ":
        assembly.innerHTML = courseGrade;
        break;
    case "Computing III ":
        comp3.innerHTML = courseGrade;
        break;
    case "Computing IV ":
        comp4.innerHTML = courseGrade;
        break;
    case "Org & Assembly Lang ":
        assembly.innerHTML = courseGrade;
        break;
    case "Logic Design ":
        logic.innerHTML = courseGrade;
        break;
    case "Discrete Structures I ":
        discrete1.innerHTML = courseGrade;
        break;
    case "Discrete Structures II ":
        discrete2.innerHTML = courseGrade;
        break;
    case "Prob & Stats I ":
        probstat.innerHTML = courseGrade;
        break;
    case "Oral & Wrttn Comm for CS ":
        oral.innerHTML = courseGrade;
        break;
 	 case "Intro to Operating Systems ":
        os.innerHTML = courseGrade;
        break;
    case "Computer Architecture ":
        comp_arch.innerHTML = courseGrade;
        break;
    case "Foundations of Comp Science ":
        fnds.innerHTML = courseGrade;
        break;
    case "Org Programming Languages ":
       	opl.innerHTML = courseGrade;
        break;
    /* case " ":
        .innerHTML = courseGrade;
        break;
    case " ":
        .innerHTML = courseGrade;
        break;
    case " ":
        .innerHTML = courseGrade;
        break;*/
    default:
	} 

  }

}


function makeClass(){
/* Parsing patterns for course history */ 

var idP = /(\d{2} [0-9]{3})|([A-Z]{4} \w+)/gm;
//var nameP = /(((\w\-*\#*\+*\s)+(\w\w*\s)*)|((\w\+*\s)+|(\w\w*\s)+))(?=\s+201[4-8])/gim;
//var nameP = /(((\w+\-*\#*\+*\s)+)|((\w\+*\s)+|(\w\w*\s)+))(?=\s+201[4-8])/gim;
var nameP = /((\w+\s&\s)*((\w+\-*\#*\+*\s)+)|((\w\+*\s)+|(\w\w*\s)+))(?=\s+201[4-8])/gim;
var dateP = /(\d{4} (Fall|Spring|Winter|Summer))/gm;
var gradeP = /[A-Z][^\s]*(?=\s+\d\.\d\d)/gm;
var creditsP = /\d\.\d\d/gm;
var takenP = /(Transferred|Taken|In Progress)/gm;
var userInput = document.getElementById("start").value;
var nameArray = userInput.match(nameP);
var idArray = userInput.match(idP);
var uniform_length = idArray.length;
var dateArray = userInput.match(dateP);
var gradeArray = userInput.match(gradeP);
var creditsArray = userInput.match(creditsP);
var takenArray = userInput.match(takenP);

if( uniform_length != nameArray.length ){
	window.alert("Name Parsing Error: Missing Entries" )
	return -1;
}

else if( uniform_length != dateArray.length ){
	window.alert("Date Parsing Error: Missing Entries" )
	return -1;
}

else if( uniform_length != gradeArray.length ){
	window.alert("Grade Parsing Error: Missing Entries" )
	return -1;
}

else if( uniform_length != creditsArray.length ){
	window.alert("Credit Parsing Error: Missing Entries" )
	return -1;
}

else if( uniform_length != takenArray.length ){
	window.alert("Taken Parsing Error: Missing Entries" )
	return -1;
}

//console.log("No parsing errors"); 
var courseHistoryArray = makeCourseArray(idArray, nameArray, dateArray, gradeArray, creditsArray, takenArray);
/*for(i =0 ; i < courseHistoryArray.length; i++){
	console.log("\n" + courseHistoryArray[i].name);
}*/
viewSequnce(courseHistoryArray);
}

 
function makeCourseArray(idArr, nameArr, dateArr, gradeArr, creditsArr, takenArr){

var newCourse = new Course("ID","NAME","DATE","GRADE","CREDITS","TAKEN");
var courseArray = [newCourse];
	for(i =0; i < idArr.length; i++){
 		newCourse	= new Course(idArr[i], nameArr[i], dateArr[i],gradeArr[i], creditsArr[i], takenArr[i]);
 		courseArray.push(newCourse);
	}	
return courseArray;
}
