 
function checkClassType(str){

    var dCheckbox = document.getElementById('dReq');
    var eCheckbox = document.getElementById('eReq');
    var diversity = str.includes("D");
    var ethics = str.includes("E");
    if(diversity && ethics){
        dCheckbox.checked = true;
        eCheckbox.checked = true;
    }
    else if(diversity)
    { dCheckbox.checked = true;}
     else if (ethics)
    { eCheckbox.checked = true;}
    
}

function Course(id, name, date, grade, credits, taken) {
    this.id = id;
    this.name = name;
    this.date = date; 
    this.grade = grade;
    this.credits = credits;
    this.taken = taken;
}

/*
courseHistoryArray.forEach((product) => {
  product.sizes.forEach((size) => {
    console.log(size);
  });
});*/

function isAH(courseName,courseID){
    var class_type;
    var ah_req = getAH();
    var id = "";

     for(var i=0; i < ah_req.database.length; i++){
       console.log("Department[" + i + "] has " + ah_req.database[i].department.length + " items\n");
        for(var j=0; j < ah_req.database[i].department.length; j++){
               // id = ah_req.database[i].department[j].classId;
                class_type = ah_req.database[i].department[j].classType;
                if (!(class_type === undefined)){
                    checkClassType(class_type);
                 }
               // console.log("Class ID: " + id + "\n");
                
        }
     }
    
}


function search(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].name === nameKey) {
            return myArray[i];
        }
    }
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
    var ns1_grade = document.getElementById('nat_sci1_grade');
    var ns1_id = document.getElementById('nat_sci1_id');
    var ah1_name = document.getElementById('ah1_name');
    var ah2_name =  document.getElementById('ah2_name');
    var ah3_name = document.getElementById('ah3_name');
    var ss1_name = document.getElementById('ss1_name');
    var ss2_name =  document.getElementById('ss2_name');
    var ss3_name = document.getElementById('ss3_name');
    var ah1_grade = document.getElementById('ah1_grade');
    var ah2_grade = document.getElementById('ah2_grade');
    var ah3_grade = document.getElementById('ah3_grade');
    var ss1_grade = document.getElementById('ss1_grade');
    var ss2_grade =  document.getElementById('ss2_grade');
    var ss3_grade = document.getElementById('ss3_grade');
    var ah1_id = document.getElementById('ah1_id');
    var ah2_id =  document.getElementById('ah2_id');
    var ah3_id = document.getElementById('ah3_id');
    var ss1_id = document.getElementById('ss1_id');
    var ss2_id =  document.getElementById('ss2_id');
    var ss3_id = document.getElementById('ss3_id');
    var dCheckbox = document.getElementById('dReq');
    var eCheckbox = document.getElementById('eReq');
    var ahCheckbox = document.getElementById('ahReq');
    var ssCheckbox = document.getElementById('ssReq');
    var cs_elec1_grade = document.getElementById('cs_elec1_grade');
    var cs_elec1_id = document.getElementById('cs_elec1_id');
    var cs_elec1_name = document.getElementById('cs_elec1_name');
    var project1_grade = document.getElementById('project1_grade');
    var project1_id = document.getElementById('project1_id');
    var project1_name = document.getElementById('project1_name');

   // var _diversity = document.getElementById('');
   // var _ethics =  document.getElementById('');
    var ah_counter = 0;
    var ah_array = new Array();
    var ss_counter = 0; 

    for (var i = 0; i < courseHistoryArray.length ; i++){
	var courseName = courseHistoryArray[i].name;
    var courseID = courseHistoryArray[i].id;
	var courseGrade = courseHistoryArray[i].grade;
	console.log("\nCourse: " + courseName + "-\nGrade: " + courseGrade);
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
        ah3_grade.innerHTML = courseGrade;
        ah_counter++;
        console.log("ORAL: "+ ah_counter + "\n");
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
     case "General Psychology ":
        ss1_grade.innerHTML = courseGrade;
        ss1_name.innerHTML = courseName;
        ss1_id.innerHTML = courseID;
        ss_counter++;
        break;
    case "Intro to American Politics ":
        ss2_grade.innerHTML = courseGrade;
        ss2_name.innerHTML = courseName;
        ss2_id.innerHTML = courseID;
        ss_counter++;
        break;
    case "Intro to Sociology ":
        ss3_grade.innerHTML = courseGrade;
        ss3_name.innerHTML = courseName;
        ss_counter++;
        ss3_id.innerHTML = courseID + " (E)";
        ss3_id.style.color = "green";
        dCheckbox.checked = true;
        break;
    case "Introduction to Ethics ":
        ah1_grade.innerHTML = courseGrade;
        ah1_name.innerHTML = courseName;
        ah1_id.innerHTML = courseID + " (D)";
        ah1_id.style.color = "purple";
        eCheckbox.checked = true;
        console.log("ETHICS: "+ ah_counter + "\n");
        break;
    case "Introduction to Theatre ":
       ah2_grade.innerHTML = courseGrade;
       ah2_name.innerHTML = courseName;
       ah2_id.innerHTML = courseID;
       ah_counter++;
       console.log("Thea: "+ ah_counter + "\n");
       break;
    case "Life Science I ":
        ns1_grade.innerHTML = courseGrade;
        ns1_id.innerHTML = courseID;
        break;
    case "Mobile App Programming l ":
        cs_elec1_grade.innerHTML = courseGrade;
        cs_elec1_id.innerHTML = courseID;
        cs_elec1_name.innerHTML = courseName;
        break;
    case "GUI Programming I ":
        project1_id.innerHTML = courseID;
        project1_grade.innerHTML = courseGrade;
        project1_name.innerHTML = courseName;
        break;
    /*case " ":
        .innerHTML = courseGrade;
        break;
    case " ":
        .innerHTML = courseGrade;
        break;
    case " ":
        .innerHTML = courseGrade;
        break;
    case " ":
        .innerHTML = courseGrade;
        break;
    case " ":
        .innerHTML = courseGrade;
        break;
    case " ":
        .innerHTML = courseGrade;
        break;
    case " ":
        .innerHTML = courseGrade;
        break;
    case " ":
        .innerHTML = courseGrade;
        break;
    case " ":
        .innerHTML = courseGrade;*/
    default:
        
	}

 }

 if(ah_counter == 2){
    ahCheckbox.checked = true;
 }

 if(ss_counter == 3){
    ssCheckbox.checked = true;
 }

console.log("Here is ah_counter: " + ah_counter + "\nHere is ss_counter: " + ss_counter + "\n");
}


function hide(){
   console.log("You should see the Tutorial\n");
    var btn = document.getElementById('tutBtn');
    var tut = document.getElementById('tutorial');
    if (tut.style.display === "none") {
        tut.style.display = "block";
        btn.innerHTML = "Hide Tutorial";
    } else {
        tut.style.display = "none";
        btn.innerHTML = "Show Tutorial";
    }
}



function makeClass(){
/* Parsing patterns for course history */ 

var btn = document.getElementById('tutBtn');
var tut = document.getElementById('tutorial');
   // tut.style.display = "none";
  //  btn.innerHTML = "Show Tutorial";
    
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

if(uniform_length != nameArray.length ){
	window.alert("Parsing Error: Missing entries from name column" );
	return -1;
}

else if( uniform_length != dateArray.length ){
	window.alert("Parsing Error: Missing entries from date column" );
	return -1;
}

else if( uniform_length != gradeArray.length ){
	window.alert("Parsing Error: Missing entries from grade column" );
	return -1;
}

else if( uniform_length != creditsArray.length ){
	window.alert("Parsing Error: Missing entries from credits column" );
	return -1;
}

else if( uniform_length != takenArray.length ){
	window.alert("Parsing Error: Missing entries from status column" );
	return -1;
}

console.log("No parsing errors"); 
var courseHistoryArray = makeCourseArray(idArray, nameArray, dateArray, gradeArray, creditsArray, takenArray);


for(var i =0 ; i < courseHistoryArray.length; i++){
	console.log("\n" + courseHistoryArray[i].name);
}

/*var myTable = document.getElementById('mTable');
 if (myTable.style.display === "none") {
        myTable.style.display = "inline-block";
    } else {
        myTable.style.display = "none";
    } */
    viewSequnce(courseHistoryArray);
}

 
function makeCourseArray(idArr, nameArr, dateArr, gradeArr, creditsArr, takenArr){

var newCourse = new Course("ID","NAME","DATE","GRADE","CREDITS","TAKEN");
var courseArray = [newCourse];
	for(var i =0; i < idArr.length; i++){
 		newCourse= new Course(idArr[i], nameArr[i], dateArr[i],gradeArr[i], creditsArr[i], takenArr[i]);
 		courseArray.push(newCourse);
        console.log("\nWe pushed " + nameArr[i]);
	}	
return courseArray;
}

function getAH(){
var ahReqs = {
    "database": [{
            "department": [{
                    "classId": "AMST.2480",
                    "classType": "(D, E)",
                    "className": "Values in American Culture"
                },
                {
                    "classId": "AMST.2570",
                    "className": "The Family in American Literature"
                },
                {
                    "classId": "ENGL.2010",
                    "className": "Classical Mythology"
                },
                {
                    "classId": "ENGL.2030",
                    "className": "Great Books of the Modern World"
                },
                {
                    "classId": "ENGL.2050",
                    "classType": "(D, E)",
                    "className": "Human Values in Western Culture I",
                    "classId2": "FAHS.2050"
                },
                {
                    "classId": "ENGL.2060",
                    "classType": "(D, E)",
                    "className": "Human Values in Western Culture II",
                    "classId2": "FAHS.2060"
                },
                {
                    "classId": "ENGL.2100",
                    "className": "Drama"
                },
                {
                    "classId": "ENGL.2110",
                    "className": "Poetry"
                },
                {
                    "classId": "ENGL.2120",
                    "className": "Short Story"
                },
                {
                    "classId": "ENGL.2160",
                    "classType": "(E)",
                    "className": "Monsters, Apes, and Nightmares"
                },
                {
                    "classId": "ENGL.2170",
                    "className": "Horror Story"
                },
                {
                    "classId": "ENGL.2180",
                    "className": "Comedy"
                },
                {
                    "classId": "ENGL.2200",
                    "className": "Oral Communication"
                },
                {
                    "classId": "ENGL.2220",
                    "className": "Oral Communication"
                },
                {
                    "classId": "ENGL.2320",
                    "className": "Turning Fiction into Film"
                },
                {
                    "classId": "ENGL.2360",
                    "className": "Science Fiction and Fantasy"
                },
                {
                    "classId": "ENGL.2400",
                    "className": "Literature and Women"
                },
                {
                    "classId": "ENGL.2420",
                    "className": "The Heroine in Modern Fiction"
                },
                {
                    "classId": "ENGL.2430",
                    "classType": "(D)",
                    "className": "Contemporary Women Writers"
                },
                {
                    "classId": "ENGL.2440",
                    "className": "Women in the Middle Ages and Renaissance"
                },
                {
                    "classId": "ENGL.2460",
                    "classType": "(D)",
                    "className": "Gay and Lesbian Literature"
                },
                {
                    "classId": "ENGL.2480",
                    "classType": "(D, E)",
                    "className": "Values in American Culture,",
                    "classId2": "FAHS.2480"
                },
                {
                    "classId": "ENGL.2490",
                    "classType": "(E)",
                    "className": "Literature: Tech and Human Values",
                    "classId2": "FAHS.2490"
                },
                {
                    "classId": "ENGL.2500",
                    "className": "The Bible as Literature"
                },
                {
                    "classId": "ENGL.2510",
                    "classType": "(E)",
                    "className": "War in Literature"
                },
                {
                    "classId": "ENGL.2570",
                    "classType": "(D)",
                    "className": "The Family in American Literature",
                    "classId2": "AMST.2570"
                },
                {
                    "classId": "ENGL.2580",
                    "classType": "(D, E)",
                    "className": "Disability in Literature"
                },
                {
                    "classId": "ENGL.2670",
                    "className": "Introduction to Shakespeare"
                },
                {
                    "classId": "ENGL.2720",
                    "className": "Continental Fiction"
                },
                {
                    "classId": "ENGL.2740",
                    "className": "Literature of the Beat Movement"
                },
                {
                    "classId": "ENGL.2770",
                    "className": "American Ethnic Literature"
                },
                {
                    "classId": "ENGL.2780",
                    "className": "Literature of the Vietnam War"
                },
                {
                    "classId": "ENGL.2850",
                    "classType": "(D)",
                    "className": "Crime and Literature"
                },
                {
                    "classId": "ENGL.2910",
                    "className": "History of English Literature I"
                },
                {
                    "classId": "ENGL.2920",
                    "className": "History of English Literature II"
                },
                {
                    "classId": "ENGL.2930",
                    "className": "History of English Literature III"
                },
                {
                    "classId": "ENGL.2940",
                    "className": "History of American Literature I"
                },
                {
                    "classId": "ENGL.2950",
                    "className": "History of American Literature II"
                },
                {
                    "classId": "ENGL.2960",
                    "classType": "(D)",
                    "className": "History of American Literature III"
                },
                {
                    "classId": "ENGL.2980",
                    "className": "Children's Literature"
                },
                {
                    "classId": "ENGL.3110",
                    "className": "The South in American Literature"
                },
                {
                    "classId": "ENGL.3170",
                    "className": "British Literature of the Twentieth Century"
                },
                {
                    "classId": "ENGL.3410",
                    "className": "Studies in Film"
                },
                {
                    "classId": "ENGL.3490",
                    "className": "Arthurian Literature"
                },
                {
                    "classId": "ENGL.3760",
                    "classType": "(D)",
                    "className": "African American Literature"
                },
                {
                    "classId": "ENGL.3820",
                    "className": "Theatre History I: Ancient Greece through the 18th Century"
                },
                {
                    "classId": "ENGL.3830",
                    "className": "Theatre History II: Nineteenth Century to the Present"
                },
                {
                    "classId": "THEA.2010",
                    "className": "Introduction to Theatre"
                },
                {
                    "classId": "THEA.2610",
                    "className": "Acting I"
                },
                {
                    "classId": "THEA.2620",
                    "className": "Acting II"
                }
            ]
        },

        {
            "department": [{
                    "classId": "HIST.1010",
                    "className": "Classical Civilization"
                },
                {
                    "classId": "HIST.1050",
                    "classType": "(D)",
                    "className": "Western Civilization I"
                },
                {
                    "classId": "HIST.1060",
                    "classType": "(D)",
                    "className": "Modern World"
                },
                {
                    "classId": "HIST.1070",
                    "classType": "(D)",
                    "className": "World Civilization I"
                },
                {
                    "classId": "HIST.1080",
                    "classType": "(D)",
                    "className": "World Civilization II"
                },
                {
                    "classId": "HIST.1110",
                    "classType": "(D)",
                    "className": "United States to 1877"
                },
                {
                    "classId": "HIST.1120",
                    "classType": "(D)",
                    "className": "US History since 1877"
                },
                {
                    "classId": "HIST.2000",
                    "className": "Early Christianity: The First Centuries"
                },
                {
                    "classId": "HIST.2060",
                    "classType": "(D)",
                    "className": "American Economic History"
                },
                {
                    "classId": "HIST.2110",
                    "className": "Historical Dimensions of Globalization"
                },
                {
                    "classId": "HIST.2120",
                    "classType": "(D)",
                    "className": "Modern Latin America"
                },
                {
                    "classId": "HIST.2230",
                    "className": "England to 1660"
                },
                {
                    "classId": "HIST.2240",
                    "className": "English History Since 1660"
                },
                {
                    "classId": "HIST.2270",
                    "classType": "(D)",
                    "className": "The Middle Ages"
                },
                {
                    "classId": "HIST.2280",
                    "className": "Women in European History"
                },
                {
                    "classId": "HIST.2310",
                    "className": "Renaissance & Reformation"
                },
                {
                    "classId": "HIST.2740",
                    "classType": "(D)",
                    "className": "Native American History"
                },
                {
                    "classId": "HIST.2750",
                    "classType": "(D)",
                    "className": "African American History"
                },
                {
                    "classId": "HIST.2810",
                    "classType": "(D)",
                    "className": "Sub-Saharan Africa"
                },
                {
                    "classId": "HIST.3040",
                    "className": "European Social and Economic History"
                },
                {
                    "classId": "HIST.3080",
                    "classType": "(D)",
                    "className": "History of Crime and Social Control"
                },
                {
                    "classId": "HIST.3110",
                    "className": "History of Science I"
                },
                {
                    "classId": "HIST.3120",
                    "className": "Science and the Modern World"
                },
                {
                    "classId": "HIST.3160",
                    "className": "American Environmental History"
                },
                {
                    "classId": "HIST.3480",
                    "className": "Making a Historical Documentary"
                },
                {
                    "classId": "HIST.3360",
                    "classType": "(D)",
                    "className": "Problems of Modern Ireland"
                },
                {
                    "classId": "HIST.3390",
                    "className": "Nationalism: The State and Human Rights in Modern Europe Since 1800"
                },
                {
                    "classId": "HIST.3450",
                    "classType": "(D)",
                    "className": "Slavery and Abolition"
                },
                {
                    "classId": "HIST.3470",
                    "className": "History of Documentary Film"
                },
                {
                    "classId": "HIST.3490",
                    "classType": "(D)",
                    "className": "The Cuban Revolution"
                },
                {
                    "classId": "HIST.3500",
                    "classType": "(D)",
                    "className": "Colonial America: History and Culture"
                },
                {
                    "classId": "HIST.3760",
                    "className": "Irish History in Film"
                }
            ]
        },


        {
            "department": [{
                    "classId": "PHIL.2010",
                    "classType": "(E)",
                    "className": "Introduction to Philosophy"
                },
                {
                    "classId": "PHIL.2020",
                    "className": "Introduction to Logic and Critical Reasoning"
                },
                {
                    "classId": "PHIL.2030",
                    "classType": "(D, E)",
                    "className": "Introduction to Ethics"
                },
                {
                    "classId": "PHIL.2060",
                    "classType": "(E)",
                    "className": "Introduction to Political Philosophy"
                },
                {
                    "classId": "PHIL.2160",
                    "classType": "(E)",
                    "className": "Plato and Beginning of Philosophy"
                },
                {
                    "classId": "PHIL.2850",
                    "classType": "(E)",
                    "className": "Ancient Philosophy"
                },
                {
                    "classId": "PHIL.2960",
                    "classType": "(D)",
                    "className": "Introduction to World Religions"
                },
                {
                    "classId": "PHIL.3010",
                    "className": "Ways of Knowing"
                },
                {
                    "classId": "PHIL.3040",
                    "classType": "(D)",
                    "className": "God and Philosophy"
                },
                {
                    "classId": "PHIL.3050",
                    "className": "Language, Signs and Symbols"
                },
                {
                    "classId": "PHIL.3130",
                    "className": "American Philosophy"
                },
                {
                    "classId": "PHIL.3140",
                    "className": "Philosophy of the Gothic Imagination"
                },
                {
                    "classId": "PHIL.3160",
                    "className": "Philosophy and Film"
                },
                {
                    "classId": "PHIL.3270",
                    "classType": "(D, E)",
                    "className": "Environmental Philosophy"
                },
                {
                    "classId": "PHIL.3340",
                    "classType": "(E)",
                    "className": "Engineering and Ethics"
                },
                {
                    "classId": "PHIL.3350",
                    "classType": "(E)",
                    "className": "Ethical Issues in Technology"
                },
                {
                    "classId": "PHIL.3360",
                    "classType": "(E)",
                    "className": "Early Modern Philosophy"
                },
                {
                    "classId": "PHIL.3370",
                    "className": "Science and the Meaning of Nature"
                },
                {
                    "classId": "PHIL.3400",
                    "classType": "(D, E)",
                    "className": "Mysticism: East and West"
                },
                {
                    "classId": "PHIL.3410",
                    "classType": "(E)",
                    "className": "Science, Ethics, and Society"
                },
                {
                    "classId": "PHIL.3420",
                    "classType": "(E)",
                    "className": "Critical Theory & Society"
                },
                {
                    "classId": "PHIL.3470",
                    "className": "Greek Tragedy and Philosophy"
                },
                {
                    "classId": "PHIL.3480",
                    "classType": "(D, E)",
                    "className": "Eastern Philosophy and Religion"
                },
                {
                    "classId": "PHIL.3500",
                    "classType": "(D, E)",
                    "className": "World Philosophies"
                },
                {
                    "classId": "PHIL.3510",
                    "classType": "(D, E)",
                    "className": "Problem of Evil"
                },
                {
                    "classId": "PHIL.3520",
                    "classType": "(E)",
                    "className": "Existence and Anxiety"
                },
                {
                    "classId": "PHIL.3600",
                    "classType": "(D)",
                    "className": "The Goddess in World Religions"
                },
                {
                    "classId": "PHIL.3610",
                    "className": "Equality, Justice, and the Law",
                    "classId2": "44.361"
                },
                {
                    "classId": "PHIL.3710",
                    "classType": "(D, E)",
                    "className": "Buddhist and Zen Philosophy"
                },
                {
                    "classId": "PHIL.3840",
                    "className": "Philosophies of Art and Beauty"
                },
                {
                    "classId": "PHIL.4010",
                    "classType": "(E)",
                    "className": "Bioethics and Genetic Research"
                }
            ]
        },

        {
            "department": [{
                    "classId": "WLFR.3750",
                    "classType": "(D)",
                    "className": "Gender and Sexuality in French Cinema"
                },
                {
                    "classId": "WLFR.3760",
                    "classType": "(D)",
                    "className": "French Cinema and Society"
                },
                {
                    "classId": "WLFR.3780",
                    "classType": "(D)",
                    "className": "Images of Women in French Cinema"
                },
                {
                    "classId": "WLIT.3250",
                    "classType": "(D)",
                    "className": "Italian American Literature and Culture"
                },
                {
                    "classId": "WLIT.3730",
                    "classType": "(DE)",
                    "className": "Italian Humanism 52.378 Italian Cinema and Culture"
                },
                {
                    "classId": "WLPO.2370",
                    "classType": "(D)",
                    "className": "Portuguese Literature in Translation"
                },
                {
                    "classId": "WLCH.3000",
                    "className": "Modern Chinese Literature and Culture"
                }
            ]
        },

        {
            "department": [{
                    "classId": "ARHI.1010",
                    "classType": "(D)",
                    "className": "Art Appreciation"
                },
                {
                    "classId": "ARHI.1050",
                    "className": "Comparative Arts",
                    "classId2": "FAHS.1050"
                },
                {
                    "classId": "ARHI.2030",
                    "classType": "(D)",
                    "className": "History of Art: Prehistoric to Medieval Art"
                },
                {
                    "classId": "ARHI.2040",
                    "classType": "(D)",
                    "className": "History of Art: Renaissance to Modern Art"
                },
                {
                    "classId": "ARHI.2050",
                    "className": "Studies of World Art"
                },
                {
                    "classId": "ARHI.2060",
                    "className": "History of Architecture"
                },
                {
                    "classId": "ARHI.2110",
                    "className": "Nineteenth Century Art"
                },
                {
                    "classId": "ARHI.2210",
                    "className": "Twentieth Century Art"
                },
                {
                    "classId": "ARHI.2250",
                    "className": "History of Picturing"
                },
                {
                    "classId": "ARHI.2310",
                    "className": "Greek and Roman Art and Architecture"
                },
                {
                    "classId": "ARHI.2410",
                    "className": "Medieval Art"
                },
                {
                    "classId": "ARHI.3080",
                    "className": "Art, Science, and Technology",
                    "classId2": "FAHS.3280"
                },
                {
                    "classId": "ARHI.3130",
                    "className": "American Art"
                },
                {
                    "classId": "ARHI.3140",
                    "className": "American Architure"
                },
                {
                    "classId": "ARHI.3210",
                    "className": "Italian Renaissance Art"
                },
                {
                    "classId": "ARHI.3230",
                    "className": "Northern Renaissance Art"
                },
                {
                    "classId": "ARHI.3250",
                    "className": "Studies in Latin American Art"
                },
                {
                    "classId": "ARHI.3300",
                    "className": "Italian Mannerism"
                },
                {
                    "classId": "ARHI.3320",
                    "className": "Baroque Art in Italy"
                },
                {
                    "classId": "ARHI.3400",
                    "className": "Women and Art"
                },
                {
                    "classId": "ARHI.3450",
                    "className": "Pre-Raphaelite Art"
                },
                {
                    "classId": "ARHI.3500",
                    "className": "Postmodernism"
                },
                {
                    "classId": "ARHI.3520",
                    "className": "Critical Issues in Art History"
                },
                {
                    "classId": "ARHI.3700",
                    "className": "Art History and Film"
                }
            ]
        },

        {
            "department": [{
                    "classId": "ARTS.1000",
                    "className": "Artbotics",
                    "classId2": "COMP.1170"
                },
                {
                    "classId": "ARTS.1010",
                    "className": "Art Concepts"
                },
                {
                    "classId": "ARTS.1050",
                    "className": "Tangible Interaction Design",
                    "classId2": "COMP.1190"
                },
                {
                    "classId": "ARTS.1080",
                    "className": "Introduction to App Design and Mobile Computing",
                    "classId2": "COMP.1080"
                },
                {
                    "classId": "ARTS.2550",
                    "className": "Drawing - Introduction to Form and Space"
                }
            ]
        },

        {
            "department": [{
                    "classId": "MUTH.1100",
                    "className": "Basic Music Theory"
                },
                {
                    "classId": "MUTH.1110",
                    "className": "Basic Music Theory 2"
                },
                {
                    "classId": "MUED.2120",
                    "className": "Sound Thinking",
                    "classId2": "COMP.2120"
                },
                {
                    "classId": "MUHI.1030",
                    "classType": "(D)",
                    "className": "Gender Issues in Music"
                },
                {
                    "classId": "MUHI.1610",
                    "className": "Music in Western Civilization"
                },
                {
                    "classId": "MUHI.2610",
                    "className": "Music History I"
                },
                {
                    "classId": "MUHI.2620",
                    "className": "Music History II"
                },
                {
                    "classId": "MUHI.3010",
                    "classType": "(D)",
                    "className": "American Music"
                },
                {
                    "classId": "MUHI.3200",
                    "classType": "(D)",
                    "className": "African-American Concert Music"
                },
                {
                    "classId": "MUHI.3550",
                    "classType": "(D)",
                    "className": "Jazz"
                },
                {
                    "classId": "MUHI.3860",
                    "classType": "(D)",
                    "className": "History of Rock Music"
                },
                {
                    "classId": "MUHI.3560",
                    "classType": "(D)",
                    "className": "American Musical Theater"
                },
                {
                    "classId": "MUSR.3010",
                    "className": "Music, Technology and Society"
                },
                {
                    "classId": "MUSR.4010",
                    "className": "Music of the Beatles"
                }
            ]
        },


        {
            "department": [{
                    "classId": "FAHS.1050",
                    "className": "Comparative Arts",
                    "classId2": "ARTS.1050"
                },
                {
                    "classId": "FAHS.1110",
                    "classType": "(D)",
                    "className": "Foundations in Cultural Studies"
                },
                {
                    "classId": "FAHS.2050",
                    "classType": "(D, E)",
                    "className": "Human Values in Western Culture I",
                    "classId2": "ENGL.2050"
                },
                {
                    "classId": "FAHS.2060",
                    "classType": "(D, E)",
                    "className": "Human Values in Western Culture II",
                    "classId2": "ENGL.2060"
                },
                {
                    "classId": "FAHS.2110",
                    "className": "Nineteenth Century Art"
                },
                {
                    "classId": "THEA.2010",
                    "className": "Introduction to Theatre"
                },
                {
                    "classId": "ENGL.2490",
                    "classType": "(E)",
                    "className": "Literature: Technology and Human Values"
                },
                {
                    "classId": "THEA.2610",
                    "className": "Acting I"
                },
                {
                    "classId": "THEA.2620",
                    "className": "Acting II"
                },
                {
                    "classId": "FAHS.3030",
                    "classType": "(E)",
                    "className": "Society & Technology"
                },
                {
                    "classId": "FAHS.3280",
                    "className": "Art, Science, and Technology"
                },
                {
                    "classId": "FAHS.3310",
                    "className": "Greek and Roman Art"
                },
                {
                    "classId": "FAHS.3740",
                    "className": "Cinema Across Cultures"
                },
                {
                    "classId": "FAHS.3950",
                    "classType": "(E)",
                    "className": "Computers in Society"
                },
                {
                    "classId": "GNDR.2400",
                    "classType": "(DE)",
                    "className": "Introduction to Gender Studies"
                },
                {
                    "classId": "HONR.1100",
                    "className": "First Year Seminar in Honors: Text and the City"
                },
                {
                    "classId": "UTCH.2040",
                    "className": "Perspectives on Math and Science"
                }
            ]
        }
    ]
}
return ahReqs;
}