function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFile.send(null);
}


functuon readTextFileJquery(){
$.getJSON("test.json", function(json) {
    console.log(json); // this will show the info it in firebug console
});	
}


function parseJson(fileName)
{
   // JavaScript array of JavaScript objects
var objs = JSON.parse(s);
}