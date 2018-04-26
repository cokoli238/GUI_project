//Called by the submit button, checks if every paremeter is correct to build a valid table
function validateForm() {
  var startPrice = parseFloat(document.forms["tableForm"]["startPrice"].value);
  var endPrice = parseFloat(document.forms["tableForm"]["endPrice"].value);
  var priceStep = parseFloat(document.forms["tableForm"]["priceStep"].value);
  var startMPG = parseFloat(document.forms["tableForm"]["startMPG"].value);
  var endMPG = parseFloat(document.forms["tableForm"]["endMPG"].value);
  var MPGStep = parseFloat(document.forms["tableForm"]["MPGStep"].value);

  //Check to make sure no numbers are less than 0
  if (startPrice < 1) {
    alert("Starting Price cannot be less than 1");
    return false;
  }
  if (endPrice < 1) {
    alert("Ending Price cannot be less than 1");
    return false;
  }
  if (priceStep < 1) {
    alert("Price Step cannot be less than 1");
    return false;
  }
  if (startMPG < 1) {
    alert("Starting MPG cannot be less than 1");
    return false;
  }
  if (endMPG < 1) {
    alert("Ending MPG cannot be less than 1");
    return false;
  }
  if (MPGStep < 1) {
    alert("MPG Step cannot be less than 1");
    return false;
  }

  //Check to make sure starting values arn't greater than or equal to the ending value
  if (startPrice >= endPrice) {
    alert("Starting Price cannot be greater than or equal to ending price");
    return false;
  }
  if (startMPG >= endMPG) {
    alert("Starting MPG cannot be greater than or equal to ending MPG");
    return false;
  }
