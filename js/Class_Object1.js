function isAH(className,ahKey_Map){
        var alt_name="blank";
        
        if(className.includes('Intro to')){
          alt_name = className.replace(/Intro to/g,"Introduction to");
         console.log("\nWe got an alt name: " +  alt_name + "\n");
        }

        if( (ahKey_Map[className] === undefined) && (ahKey_Map[alt_name] === undefined)){
            console.log("\nNot an AH: "+ className);
            return false;
        }

        else if(ahKey_Map[className] == null){
            ahKey_Map[className] = ahKey_Map[alt_name];
            console.log("Just added new key: " + className + "\n");

        }
        return true;
    }

function isSS(className,ssKey_Map){
        var alt_name="blank"; 
        if(className.includes('Intro to')){
          alt_name = className.replace(/Intro to/g,"Introduction to");
         console.log("\nWe got an alt name:" +  alt_name + "\n");
        }
        if( (ssKey_Map[className] === undefined) && (ssKey_Map[alt_name] === undefined)) {
            return false;
        }
        console.log("We got an SS!\n" + className + "\n");
        if( ssKey_Map[className] === undefined){
            ssKey_Map[className] = ssKey_Map[alt_name];
            console.log("Just added new key: " + className + "\n");
        }

        return true;
    }

function isNS(className,nsKey_Map){
        var alt_name="blank"; 
        if(className.includes('Intro to')){
          alt_name = className.replace(/Intro to/g,"Introduction to");
         console.log("\nWe got an alt name:" +  alt_name + "\n");
        }
        if( (nsKey_Map[className] === undefined) && (nsKey_Map[alt_name] === undefined)) {
            return false;
        }
        console.log("We got an SS!\n" + className + "\n");
        return true;
    }

function isSequence(className, seqKey_Map){


}    

function checkClassType(obj, id){
    var dCheckbox = document.getElementById('dReq');
    var eCheckbox = document.getElementById('eReq');
    console.log("\nThis is our obj: " + obj['className']);
    if (typeof obj['classType'] == 'string' || obj['classType'] instanceof String) {
    var str = obj['classType'];
    var diversity = str.includes("D");
    var ethics = str.includes("E");
    console.log("\nFound a class type: "+ str);
        if(diversity && ethics){
        dCheckbox.checked = true;
        eCheckbox.checked = true;
        id.innerHTML = obj['classId'] + " (DE)";
        id.style.color = "purple";
        }
        else if(diversity){ 
        dCheckbox.checked = true;
        id.innerHTML = obj['classId'] + " (D)";
        id.style.color = "purple";
        }
        else if (ethics){
        eCheckbox.checked = true;
        id.innerHTML = obj['classId'] + " (E)";
        id.style.color = "green"; 
    }
 } // end of 1st if 

} // end of function

function Course(id, name, date, grade, credits, taken) {
    this.id = id;
    this.name = name;
    this.date = date; 
    this.grade = grade;
    this.credits = credits;
    this.taken = taken;
}

function viewSequnce(courseHistoryArray){

    var tags = getAH();
    var tags2 = getSS();
    var tags3 = getNS();
    var ahKey_Map = {};
    var ssKey_Map = {};
    var nsKey_Map = {};

    for (var i = 0; tags.database.length > i; i += 1) {
        for(j = 0; tags.database[i].department.length > j; j += 1){
            ahKey_Map[tags.database[i].department[j].className] = tags.database[i].department[j];
            ahKey_Map[tags.database[i].department[j].classId] = tags.database[i].department[j];
        } 
    }

    for (var i = 0; tags2.database.length > i; i += 1) {
        for(j = 0; tags2.database[i].department.length > j; j += 1){
            ssKey_Map[tags2.database[i].department[j].className] = tags2.database[i].department[j];
            ssKey_Map[tags2.database[i].department[j].classId]   = tags2.database[i].department[j];
        } 
    }

    for (var i = 0; tags3.database.length > i; i += 1) {
        nsKey_Map[tags3.database[i].className] = tags3.database[i];
        nsKey_Map[tags3.database[i].classId] =   tags3.database[i];

    }
    
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
    var alog = document.getElementById('alog');
    var dCheckbox = document.getElementById('dReq');
    var eCheckbox = document.getElementById('eReq');
    var ahCheckbox = document.getElementById('ahReq');
    var ssCheckbox = document.getElementById('ssReq');

    var tookoral = 0; 
    var ah_counter = 0;
    var ss_counter = 0; 
    var fe_counter = 0;
    var tech_counter = 0;
    var cs_elec_counter = 0;
    var nat_sci_counter = 0;
    var seq_counter = 0;
    var credits_tracker = 0;;

    for (var i = 0; i < courseHistoryArray.length ; i++){
	var courseName = courseHistoryArray[i].name;
    var courseID = courseHistoryArray[i].id;
	var courseGrade = courseHistoryArray[i].grade;
    var courseCredits = courseHistoryArray[i].credits;

    /* Required Courses */
 	switch(courseName) {
    case "Computing I":
        comp1.innerHTML = courseGrade;
        credits_tracker = credits_tracker + parseInt(courseCredits.slice(0,1)); 
	   break;
    case "Computing II":
        comp2.innerHTML = courseGrade;
        credits_tracker = credits_tracker + parseInt(courseCredits.slice(0,1));
	break;
    case "Calculus I":
        calc1.innerHTML = courseGrade;
        credits_tracker = credits_tracker + parseInt(courseCredits.slice(0,1));
		break;
    case "College Writing I":
        col_writing1.innerHTML = courseGrade;
        credits_tracker = credits_tracker + parseInt(courseCredits.slice(0,1));
		break;
    case "College Writing II":
        col_writing2.innerHTML = courseGrade;
        credits_tracker = credits_tracker + parseInt(courseCredits.slice(0,1));
		break;
    case "Calculus II":
        calc2.innerHTML = courseGrade;
        credits_tracker = credits_tracker + parseInt(courseCredits.slice(0,1));
	   break;
    case "Comp Org & Assembly Lang":
        assembly.innerHTML = courseGrade;
        credits_tracker = credits_tracker + parseInt(courseCredits.slice(0,1));
	   break;
    case "Computing III":
        comp3.innerHTML = courseGrade;
        credits_tracker = credits_tracker + parseInt(courseCredits.slice(0,1));
	   break;
    case "Computing IV":
        comp4.innerHTML = courseGrade;
        credits_tracker = credits_tracker + parseInt(courseCredits.slice(0,1));
	break;
    case "Org & Assembly Lang":
        assembly.innerHTML = courseGrade;
        credits_tracker = credits_tracker + parseInt(courseCredits.slice(0,1));
	break;
    case "Logic Design":
        logic.innerHTML = courseGrade;
        credits_tracker = credits_tracker + parseInt(courseCredits.slice(0,1));
	break;
    case "Discrete Structures I":
        discrete1.innerHTML = courseGrade;
        credits_tracker = credits_tracker + parseInt(courseCredits.slice(0,1));
	break;
    case "Discrete Structures II":
        discrete2.innerHTML = courseGrade;
        credits_tracker = credits_tracker + parseInt(courseCredits.slice(0,1));
	break;
    case "Prob & Stats I":
        probstat.innerHTML = courseGrade;
        credits_tracker = credits_tracker + parseInt(courseCredits.slice(0,1));
	break;
    case "Oral & Wrttn Comm for CS":
        ah3_grade.innerHTML = courseGrade;
        tookoral=1;
        console.log("ORAL: "+ ah_counter + "\n");
        credits_tracker = credits_tracker + parseInt(courseCredits.slice(0,1));
	break;
 	 case "Intro to Operating Systems":
        os.innerHTML = courseGrade;
        credits_tracker = credits_tracker + parseInt(courseCredits.slice(0,1));
	break;
    case "Computer Architecture":
        comp_arch.innerHTML = courseGrade;
        credits_tracker = credits_tracker + parseInt(courseCredits.slice(0,1));
	break;
    case "Foundations of Comp Science":
        fnds.innerHTML = courseGrade;
        credits_tracker = credits_tracker + parseInt(courseCredits.slice(0,1));
	break;
    case "Org Programming Languages":
       	opl.innerHTML = courseGrade;
        credits_tracker = credits_tracker + parseInt(courseCredits.slice(0,1));
	break;
    case "Analysis of Algorithms":
        alog.innerHTML = courseGrade;
        credits_tracker = credits_tracker + parseInt(courseCredits.slice(0,1));
	break;
    case "Operating Systems":
        os.innerHTML = courseGrade;
        credits_tracker = credits_tracker + parseInt(courseCredits.slice(0,1));
    case "College Writing II ESL":
        col_writing2.innerHTML = courseGrade;
        credits_tracker = credits_tracker + parseInt(courseCredits.slice(0,1));
	break;
    case "Assembly Language Programming":
        assembly.innerHTML = courseGrade;
        credits_tracker = credits_tracker + parseInt(courseCredits.slice(0,1));
    break;
    case "Co-op. Ed. Work Experience l":
          tookoral=1;
    break;
    case "Co-op Assessment 1":
          tookoral=1;
    break;
    case "Co-op Ed. Work Experience II":
          tookoral=1;
    break;
    case "Co-op Assessment 2":
          tookoral=1;
    default:
            // IF COURSE IS HUMANITES
            if( ( isAH(courseName,ahKey_Map)|| isAH(courseID,ahKey_Map) ) && ah_counter < 2){
                ah_counter++;
                var ah_grade = document.getElementById('ah' + (ah_counter) + '_grade');
                var ah_name = document.getElementById('ah' + (ah_counter) + '_name');
                var ah_id = document.getElementById('ah' + (ah_counter) + '_id');
            
                if(isAH(courseID,ahKey_Map)){
                    console.log("\nUsing course ID for: " + courseName); 
                    checkClassType(ahKey_Map[courseID],ah_id); 
                }
                else {
                    checkClassType(ahKey_Map[courseName],ah_id); 
                }

                ah_grade.innerHTML = courseGrade;
                ah_name.innerHTML = courseName;
                console.log("\nGoing to AH (" + ah_counter + ") ==> "+ courseName);
                credits_tracker = credits_tracker + parseInt(courseCredits.slice(0,1));

                }
                // IF COURSE IS SOCIAL SCIENCES
            else if( (isSS(courseName,ssKey_Map)||(isSS(courseID,ssKey_Map))) && ss_counter < 3){
                ss_counter++;
                var ss_grade = document.getElementById('ss' + (ss_counter) + '_grade');
                var ss_name = document.getElementById('ss' + (ss_counter) + '_name');
                var ss_id = document.getElementById('ss' + (ss_counter) + '_id');
                if(isSS(courseID,ssKey_Map)){
                    console.log("\nChecking:  " + courseName);
                    checkClassType(ssKey_Map[courseID],ss_id);
                }
                else {
                    console.log("\nChecking:  " + courseName);
                    checkClassType(ssKey_Map[courseName],ss_id);
                } 

                ss_grade.innerHTML = courseGrade;
                ss_name.innerHTML = courseName;
                console.log("\nGoing to SS (" + ss_counter + ") ==> "+ courseName);
                credits_tracker = credits_tracker + parseInt(courseCredits.slice(0,1)); 
            }

            else if( (isNS(courseName,nsKey_Map)||(isNS(courseID,nsKey_Map))) && nat_sci_counter < 3 && !(courseGrade.includes('W'))){
                nat_sci_counter++;
                var nat_sci_grade = document.getElementById('nat_sci' + (nat_sci_counter) + '_grade');
                var nat_sci_name = document.getElementById('nat_sci' + (nat_sci_counter) + '_name');
                nat_sci_grade.innerHTML = courseGrade;
                nat_sci_name.innerHTML = courseName;
                credits_tracker = credits_tracker + parseInt(courseCredits.slice(0,1)); 
                console.log("\nGoing to cs: " + courseName);
                }
                /* Check for CS Elective */
             else if( (cs_elec_counter < 2 && (courseID.includes('COMP.3')||courseID.includes('COMP.4')||courseID.includes('COMP.5')))){
                cs_elec_counter++;
                var cs_elec_grade = document.getElementById('cs_elec' + (cs_elec_counter) + '_grade');
                var cs_elec_name = document.getElementById('cs_elec' + (cs_elec_counter) + '_name');
                cs_elec_grade.innerHTML = courseGrade;
                cs_elec_name.innerHTML = courseName;
                credits_tracker = credits_tracker + parseInt(courseCredits.slice(0,1)); 
                console.log("\nGoing to cs: " + courseName);

             }
            // Check for Tech Elective 
             else if ((tech_counter < 2 && (courseID.includes('COMP.3')||courseID.includes('COMP.4')||courseID.includes('COMP.5'))) ){
                tech_counter++;
                var tech_elec_grade = document.getElementById('tech_elec' + (tech_counter) + '_grade');
                var tech_elec_name = document.getElementById('tech_elec' + (tech_counter) + '_name');
                tech_elec_grade.innerHTML = courseGrade;
                tech_elec_name.innerHTML = courseName;
                credits_tracker = credits_tracker + parseInt(courseCredits.slice(0,1)); 
                console.log("\nGoing to tech: " + courseName);
             }
             /* Check for Project Elective*/
             else if( (seq_counter < 2 && (courseID.includes('COMP.3')||courseID.includes('COMP.4')||courseID.includes('COMP.5')))) { 
                seq_counter++;
                var project_grade = document.getElementById('project' + (seq_counter) + '_grade');
                var project_name = document.getElementById('project' + (seq_counter) + '_name');
                project_grade.innerHTML = courseGrade;
                project_name.innerHTML = courseName;
                credits_tracker = credits_tracker + parseInt(courseCredits.slice(0,1)); 
                console.log("\nGoing to project: " + courseName);
             }

            else if( ((fe_counter < 4) && (!(courseName.includes('Lab')||courseGrade.includes('T')||courseGrade.includes('D')||courseGrade.includes('F')||courseGrade.length > 1))) )
            {
                fe_counter++;
                var fe_grade = document.getElementById('fe' + (fe_counter) + '_grade');
                var fe_name = document.getElementById('fe' + (fe_counter) + '_name');
                console.log("\nah/ss_count is " + ah_counter +"/"+ ss_counter +"\nAdding " + courseName + "/" + courseID + " to fe " + fe_counter);
                fe_grade.innerHTML = courseGrade;
                fe_name.innerHTML = courseName;
                if(isAH(courseName,ahKey_Map) && ah_counter == 2){
                    fe_name.style.color = "red";
                    ah_counter++;
                } 
            }
            else 
            {
                console.log("\nUnhandled: " + courseName);
            }
        } // end of switch
	} // end of for loop 

 /* EXIT FOR LOOP  */

 if(ah_counter + tookoral == 3){
    ahCheckbox.checked = true;
 }

 if(ss_counter == 3){
    ssCheckbox.checked = true;
 }

console.log("Here is ah_counter: " + ah_counter + "\nHere is ss_counter: " + ss_counter + "\n");

}


function hide(){
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


function makeCourseArray(idArr, nameArr, dateArr, gradeArr, creditsArr, takenArr){


var newCourse = new Course("ID","NAME","DATE","GRADE","CREDITS","TAKEN");
var courseArray = [newCourse];
var status = takenArr[0];
var bad_grade ="";
var idstr = "";
var cutID = "";
var cutStatus= "";
var new_id ="";
var namestr = "";
	for(var i =0; i < creditsArr.length; i++){

        if(takenArr[i].toString().includes("In Progress")){
           gradeArr[i] = "TBA"; 
         //  console.log("\nClass: " + nameArr[i] + "\nStatus read: " + takenArr[i]);
        }
        
        cutStatus = nameArr[i].replace(/(Transferred|Taken|In Progress|Grade\s+Units\s+Status)\s*/g, "-");
        cutID = cutStatus.replace(/(-([A-Z]{3,5}\s\w+)|-(\d\d \d\d\d))/g, "");
        namestr = cutID.replace(/(\d{4}\s(Fall|Spring|Winter|Summer))/g,"");

        idstr = idArr[i].replace(/(Transferred|Taken|In Progress|Grade\s+Units\s+Status)\s*/g, "");
        //console.log("\nidArr[" + i + "] was " + idArr[i]);
        //console.log("\nidArr[" + i + "] is " + idstr);
        new_id = idstr.trim();
        if(new_id.includes(' ')){
         idstr = new_id.replace(/ /g, ".");
        }
 		newCourse = new Course(idstr, namestr.trim(), dateArr[i],gradeArr[i], creditsArr[i], takenArr[i]);
 		
        //showCourse(newCourse);
       // console.log("Course:\n" + "id: " + idstr + "\nname: " + namestr.trim() + "\ndate: "+ dateArr[i] + "\ngrade: " + gradeArr[i] + "\ncredits: " + creditsArr[i] + "\nstatus: " + takenArr[i]);
        bad_grade = gradeArr[i];
        if(bad_grade.includes('F')||bad_grade.includes('W')){

        }
        else{
        courseArray.push(newCourse);
        }
	}	
return courseArray;
}


function makeClass(){
/* Parsing patterns for course history */ 


console.log("YO WE HERE!");

var btn = document.getElementById('tutBtn');
var tut = document.getElementById('tutorial');
   // tut.style.display = "none";
  //  btn.innerHTML = "Show Tutorial";
var idP = /(Transferred|Taken|In Progress|Grade\s+Units\s+Status)\s*((\d{2} [0-9]{3})|([A-Z]{4} \w+))/gm;   
var idP_og = /(\d{2}\s[0-9]{3})|([A-Z]{4}\s\w+)/gm;
var nameP = /(Transferred|Taken|In Progress|Grade\s+Units\s+Status)\s*((\d{2} [0-9]{3})|([A-Z]{4} \w+))\s+((\S+\s+)*?)(\d{4}\s(Fall|Spring|Winter|Summer))/gm;
var dateP = /(\d{4}\s(Fall|Spring|Winter|Summer))/gm;
var gradeP = /([A-Z](\-|\+)?|NC|\S)(?=(\s*\d\.\d\d))/gm;
var creditsP = /\d\.\d\d/gm;
var takenP = /(Transferred|Taken|In Progress)/gm;
var input = document.getElementById("start").value;
var userInput = input.toString();
var nameArray = userInput.match(nameP);
var idArray = userInput.match(idP);
var dateArray = userInput.match(dateP);
var gradeArray = userInput.match(gradeP);
var creditsArray = userInput.match(creditsP);
var takenArray = userInput.match(takenP);
var uniform_length = idArray.length;


if( (nameArray) && nameArray.length != 0){
}

else{
    window.alert("Failed pattern match for name\n");
    return -1;
}

if( (idArray) && idArray.length != 0){
}

else{
    window.alert("Failed pattern match for id\n");
    return -1;
}

if( (gradeArray) && gradeArray.length != 0){
}

else{
    window.alert("Failed pattern match for grade\n");
    return -1;
}

if( (dateArray) && dateArray.length != 0){
}

else{
    window.alert("Failed pattern match for date\n");
    return -1;
}

if( (creditsArray) && creditsArray.length != 0){
}

else{
    window.alert("Failed pattern match for credits\n");
    return -1;
}


if( (takenArray) && takenArray.length != 0){
}

else{
    window.alert("Failed pattern match for taken\n");
    return -1;
}


if(uniform_length != nameArray.length ){
    window.alert("Parsing Error: Missing " + (uniform_length - nameArray.length) + " entries from name column" +
        "\nnameArray[0] has " + nameArray[0]);
    return -1;
} 

else if( uniform_length != nameArray.length ){
    window.alert("Parsing Error: Missing" + (uniform_length - dateArray.length) + " entries from date column" );
    return -1;
}

else if( uniform_length != dateArray.length ){
    window.alert("Parsing Error: Missing" + (uniform_length - dateArray.length) + " entries from date column" );
    return -1;
}

else if( uniform_length != gradeArray.length ){
    window.alert("Parsing Error: Missing " + (uniform_length - gradeArray.length) + " entries from grade column" );
    return -1;
}

else if( uniform_length != creditsArray.length ){
    window.alert("Parsing Error: Missing " + (uniform_length - creditsArray.length) + " entries from credits column" );
    return -1;
}

else if( uniform_length != takenArray.length ){
    window.alert("Parsing Error: Missing " + (uniform_length - takenArray.length) + " entries from status column" );
    return -1;
}

var courseHistoryArray = makeCourseArray(idArray, nameArray, dateArray, gradeArray, creditsArray, takenArray);


for(var i =0 ; i < courseHistoryArray.length; i++){
//  console.log("\nCourse[" + i + "] = " + courseHistoryArray[i].name);
}

/*var myTable = document.getElementById('mTable');
 if (myTable.style.display === "none") {
        myTable.style.display = "inline-block";
    } else {
        myTable.style.display = "none";
    } */

    viewSequnce(courseHistoryArray);
}



function getSS(){
var jsonObj = 
  {
    "database": [{
            "department": [{
                    "classId": "HSCI.1020",
                    "classType": "(D)",
                    "className": "Introduction to Public Health"
                },

                {
                    "classId": "HSCI.3060",
                    "className": "Introduction to Gerontology"
                },

                {
                    "classId": "HSCI.3080",
                    "classType": "(D)",
                    "className": "Global Health"
                }
            ]
        },

        {
            "department": [{
                    "classId": "LGST.2100",
                    "classType": "(E)",
                    "className": "Restorative Justice"
                },

                {
                    "classId": "LGST.2620",
                    "className": "Introduction to Business Law"
                },

                {
                    "classId": "LGST.3600",
                    "classType": "(D)",
                    "className": "Legal Issues in Racism"
                },

                {
                    "classId": "LGST.3710",
                    "className": "Law, Ethics, Cultural Heritage and the Visual Arts"
                }
            ]
        },

        {
            "department": [{
                    "classId": "CRIM.2210",
                    "className": "Criminology"
                },

                {
                    "classId": "CRIM.2480",
                    "classType": "(E)",
                    "className": "Terrorism"
                },

                {
                    "classId": "CRIM.3600",
                    "classType": "(D)",
                    "className": "Gender, Race, and Crime"
                },

                {
                    "classId": "CRIM.4770",
                    "className": "Intimate Partner Violence"
                },

                {
                    "classId": "CRIM.4780",
                    "classType": "(E)",
                    "className": "Child Maltreatment"
                }
            ]
        },

        {
            "department": [{
                    "classId": "POLI.1010",
                    "className": "Introduction to American Politics"
                },

                {
                    "classId": "POLI.1100",
                    "classType": "(D)",
                    "className": "Introduction to Politics"
                },

                {
                    "classId": "POLI.1120",
                    "classType": "(D)",
                    "className": "Comparative Political Systems"
                },

                {
                    "classId": "POLI.1210",
                    "classType": "(D)",
                    "className": "Introduction to International Relations"
                },

                {
                    "classId": "POLI.1750",
                    "className": "Introduction to Environmental Studies"
                },

                {
                    "classId": "POLI.2150",
                    "classType": "(D)",
                    "className": "African Politics"
                },
                {
                    "classId": "POLI.2180",
                    "classType": "(DE)",
                    "className": "Introduction to Politics and Sports"
                },

                {
                    "classId": "POLI.2310",
                    "classType": "(E)",
                    "className": "Introduction to Political Thought"
                },

                {
                    "classId": "POLI.2350",
                    "classType": "(D)",
                    "className": "Constitutional Law and Politics"
                },

                {
                    "classId": "POLI.2370",
                    "classType": "(D)",
                    "className": "Civil Liberties Law and Politics"
                }
            ]
        },

        {
            "department": [{
                "classId": "PCST.2050",
                "classType": "(E)",
                "className": "Restorative Justice"
            }]
        },

        {
            "department": [{
                    "classId": "PSYC.1010",
                    "className": "General Psychology"
                },

                {
                    "classId": "PSYC.2090",
                    "classType": "(D)",
                    "className": "Social Psychology"
                },

                {
                    "classId": "PSYC.2320",
                    "className": "Psychology of Personality"
                },

                {
                    "classId": "PSYC.2550",
                    "classType": "(D)",
                    "className": "Community Psychology"
                },

                {
                    "classId": "PSYC.2600",
                    "className": "Child and Adolescent Development"
                },

                {
                    "classId": "PSYC.2720",
                    "className": "Abnormal Psychology"
                },

                {
                    "classId": "PSYC.2760",
                    "className": "Theories of Learning"
                },

                {
                    "classId": "PSYC.3330",
                    "className": "Psychology of Consciousness"
                },

                {
                    "classId": "PSYC.3350",
                    "classType": "(D)",
                    "className": "Psychology & Women"
                },

                {
                    "classId": "PSYC.3510",
                    "className": "Human Sexuality"
                },

                {
                    "classId": "PSYC.3550",
                    "className": "Sport and Exercise Psychology"
                },

                {
                    "classId": "PSYC.3600",
                    "className": "Adult Development and Aging"
                },

                {
                    "classId": "PSYC.3630",
                    "classType": "(D, E)",
                    "className": "Introduction to Disability Studies"
                },

                {
                    "classId": "PSYC.3650",
                    "classType": "(D)",
                    "className": "Psychology of Language"
                }
            ]
        },

        {
            "department": [{
                    "classId": "SOCI.1010",
                    "classType": "(D, E)",
                    "className": "Introduction to Sociology"
                },
                {
                    "classId": "SOCI.1020",
                    "classType": "(D)",
                    "className": "Social Anthropology"
                },

                {
                    "classId": "SOCI.1100",
                    "classType": "(D, E)",
                    "className": "Introduction to Social Values"
                },

                {
                    "classId": "SOCI.1150",
                    "classType": "(D)",
                    "className": "Social Problems"
                },

                {
                    "classId": "SOCI.2100",
                    "classType": "(D)",
                    "className": "Sociology of Food"
                },

                {
                    "classId": "SOCI.2150",
                    "classType": "(D, E)",
                    "className": "Peacemaking Alternatives"
                },

                {
                    "classId": "SOCI.2130",
                    "classType": "(D)",
                    "className": "Sociology of the Family"
                },

                {
                    "classId": "SOCI.2550",
                    "className": "Sociology of Deviance"
                },

                {
                    "classId": "SOCI.2700",
                    "className": "Self in Society"
                },

                {
                    "classId": "SOCI.3030",
                    "classType": "(D, E)",
                    "className": "Sociology of American Education"
                },

                {
                    "classId": "SOCI.3170",
                    "classType": "(D, E)",
                    "className": "Sociology of Genocide"
                },

                {
                    "classId": "SOCI.3300",
                    "classType": "(D)",
                    "className": "Fast Food, Hot Planet, Sociological Approaches"
                },

                {
                    "classId": "SOCI.3410",
                    "classType": "(D)",
                    "className": "Social Stratification"
                },

                {
                    "classId": "SOCI.3700",
                    "classType": "(D)",
                    "className": "Women in Society"
                }
            ]
        },

        {
            "department": [{
                    "classId": "ECON.1100",
                    "className": "The Future of Work in the Global Economy"
                },

                {
                    "classId": "ECON.2010",
                    "className": "Economics I"
                },

                {
                    "classId": "ECON.2020",
                    "className": "Macroeconomics"
                },

                {
                    "classId": "ECON.3020",
                    "classType": "(D)",
                    "className": "Labor Economics"
                },

                {
                    "classId": "ECON.3250",
                    "classType": "(D)",
                    "className": "U.S. Economic History"
                },

                {
                    "classId": "ECON.3450",
                    "classType": "(E)",
                    "className": "Health Economics"
                },

                {
                    "classId": "ECON.4150",
                    "classType": "(E)",
                    "className": "Introduction to Environmental Economics"
                }
            ]
        },


        {
            "department": [{
                    "classId": "57.201",
                    "className": "Regions of the Merrimack Valley"
                },

                {
                    "classId": "PUBH.2110",
                    "classType": "(E)",
                    "className": "Sustainable Development"
                },
                {
                    "classId": "57.218",
                    "classType": "(D)",
                    "className": "Regional Health and the Environment"
                },

                {
                    "classId": "FAHS.2200",
                    "classType": "(E)",
                    "className": "Designing the Future World"
                },

                {
                    "classId": "POLI.2150",
                    "classType": "(D)",
                    "className": "African Politics"
                },
                {
                    "classId": "57.420",
                    "classType": "(D)",
                    "className": "Gender, Work, and Public Policy"
                }
            ]
        },

        {
            "department": [{
                    "classId": "88.10",
                    "classType": "(D)",
                    "className": "World Regional Geography"
                },
                {
                    "classId": "88.102",
                    "className": "Geography of the US and Canada"
                },
                {
                    "classId": "88.104",
                    "classType": "(E)",
                    "className": "Foundations of Conservation and Environmental Concern"
                }
            ]
        },

        {
            "department": [{
                    "classId": "FAHS.2390",
                    "classType": "(D, E)",
                    "className": "Introduction to Gender Studies"
                },

                {
                    "classId": "FAHS.3490",
                    "classType": "(D, E)",
                    "className": "Literature, Politics and Genocide in Cambodia"
                },

                {
                    "classId": "FAHS.3560",
                    "classType": "(D)",
                    "className": "Village Empowerment: Overcoming Global Poverty"
                },

                {
                    "classId": "FAHS.3630",
                    "classType": "(D, E)",
                    "className": "Introduction to Disability Studies"
                },

                {
                    "classId": "FAHS.3800",
                    "classType": "(E)",
                    "className": "Challenges for Higher Ed"
                },

                {
                    "classId": "DGMD.1000",
                    "classType": "Introduction to Journalism and Mass Communication"
                },

                {
                    "classId": "UTCH.2010",
                    "classType": "Knowing and Learning in Math and Science"
                },

                {
                    "classId": "WLSO.2400",
                    "classType": "Work, Labor, and Society"
                }
            ]
        }
    ]
}
return jsonObj;
}

function getAH(){
var jsonObj = {
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

return jsonObj;
}


function getNS(){
    var jsonObj = {
    "database": [{
            "classId": "BIOL.1110",
            "className": "Principles of Biology I"
        }, {
            "classId": "BIOL.1170L",
            "className": "Experimental Biology I"
        }, {
            "classId": "BIOL.1102",
            "className": "Principles of Biology II"
        }, {
            "classId": "BIOL.1180L",
            "className": "Experimental Biology II"
        }, {
            "classId": "LIFE.1010",
            "className": "Life Science I"
        }, {
            "classId": "LIFE.1020",
            "className": "Life Science II"
        },

        {
            "classId": "CHEM.1210",
            "className": "Chemistry I"
        }, {
            "classId": "CHEM.1240",
            "className": "Chemistry II"
        }, {
            "classId": "ENVI.2010",
            "className": "Earth & Environmental Systems I"
        }, {
            "classId": "ENVI.2020",
            "className": "Earth & Environmental Systems II"
        }, {
            "classId": "GEOL.2150",
            "className": "Forensic Geology"
        }, {
            "classId": "GEOL.3140",
            "className": "Hydrogeology"
        }, {
            "classId": "GEOL.3150",
            "className": "Environmental Geochemistry"
        }, {
            "classId": "PHYS.1410",
            "className": "Physics I"
        }, {
            "classId": "PHYS.1440",
            "className": "Physics II"
        }, {
            "classId": "PHYS.1210",
            "className": "Exploring the Universe"
        }
    ]
}
    return jsonObj;
}

