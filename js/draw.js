//draw.js	






document.addEventListener( "DOMContentLoaded", function(){

	// setup a new canvas for drawing wait for device init
    setTimeout(function(){
		
		drawModule = JSON.parse(window.localStorage.getItem("pvM"));//lade modulDaten
		alert(drawModule.serial);
		document.getElementById("aTool").innerText = tool; //Zeige aktuelles tool
		document.getElementById("aError").innerText = "Fehler: " + error; //Zeige aktuellen Fehler
		
		newCanvas(); //Öffne das Canvas
		
    }, 1000);

}, false );


  




function showErrorList(){
	document.getElementById("errorList").style.visibility = "visible";
}

function showSubErrorList(selection){
	var splitted = selection.innerText.split("##:");
	
document.getElementById("aError").innerText = "Fehler: " + document.getElementById("measUl_"+splitted[0]).style.display;
	if ("inline" === document.getElementById("measUl_"+splitted[0]).style.display) {
		document.getElementById("measUl_"+splitted[0]).style.display = "none";
		document.getElementById("measUl_"+splitted[0]).style.height = "0px";
	} else {
		document.getElementById("measUl_"+splitted[0]).style.display = "inline";
		document.getElementById("measUl_"+splitted[0]).style.height = "";
	}
}

function selectOSC(selection){
	var splitted = selection.innerText.split(":");
	error = splitted[0];
	document.getElementById("aError").innerText = "Fehler: " + error; //Aktualisiere Anzeige mit aktuellem tool
	document.getElementById("errorList").style.visibility = "hidden";
}

function addList(errorText){
	// Make the list itself which is a <ul>
    var listElement = document.getElementById("measUl");
    // create a <li> for each one.
    var listItem = document.createElement("li");
   	// add the item text
    listItem.innerHTML = errorText;
    // add listItem to the listElement
    listElement.appendChild(listItem);
}

function selectError(el){
	el.style.borderColor = "#fff";
	error = el.id;
}

function markError(x, y){
	var Spalte, Zeile;
	if (x>xStM & x<xStM+(stringStep*stringCount)){
		for (var i = 0; i<=stringCount;i++){
			if (x>xStM+(stringStep*(i-1)) & x<=xStM+(stringStep*i)){
				Spalte = String.fromCharCode(64+i);
			}
		}
		for (var i = 0; i<=(cellCount/stringCount);i++){
			if (y>yStM+(cellStep*(i-1)) & y<=yStM+(cellStep*i)){
				Zeile = addLeadingZeros(i,2);
			}
		}
		addError(Spalte+Zeile);
	} else {
		alert("Fehler liegt nicht im Modul");
	}
	
}

function addError(cell){
	var newError = cell + ":" + error;
	ErrorData.push(newError);
	addList(newError);
}




//Führende Nullen hinzufügen:
function addLeadingZeros(number, length) {
    var num = '' + number;
    while (num.length < length) num = '0' + num;
    return num;
}

//Führende Nullen entfernen:
function delLeadingZeros(number){
	return Number(number);
}







