//draw.js	


var ctx;
var color = "rgba(0, 166, 214, 0.3)";	
var tool = "rect"; //mark //pen

var xStM, yStM; //xStartModule, yStartModule

var module;
var cellCount = 60;
var stringCount = 6;
var stringStep, cellStep;
// Establish the array which acts as a data source for the list
var error = "keine Auswahl";
var ErrorData = [];

document.addEventListener( "DOMContentLoaded", function(){

	// setup a new canvas for drawing wait for device init
    setTimeout(function(){
		module = window.localStorage.getItem("module");//lade modulDaten
		alert(module.serial);
		document.getElementById("aTool").innerText = tool; //Zeige aktuelles tool
		document.getElementById("aError").innerText = "Fehler: " + error; //Zeige aktuellen Fehler
		
		newCanvas(); //Öffne das Canvas
		
    }, 1000);

}, false );


// function to setup a new canvas for drawing
function newCanvas(){
	//define and resize canvas
    document.getElementById("content").style.height = window.innerHeight-90;
    var canvas = '<canvas id="canvas" width="'+window.innerWidth+'" height="'+(window.innerHeight-90)+'"></canvas>';
	document.getElementById("content").innerHTML = canvas;
	
    // setup canvas
	ctx=document.getElementById("canvas").getContext("2d");
	
	ctx.strokeStyle = color;
	ctx.lineWidth = 3;	
	
	//Load the picture
	TPLoad();
	
	// setup to trigger drawing on mouse or touch
    drawTouch();
    drawPointer();
	drawMouse();
	
}


function TPLoad(){
	
	var image = new Image(); //Bild laden
	image.src = window.localStorage.getItem("picURI");
	var canvas = document.getElementById('canvas');
	ctx.drawImage (image,0,0,image.width,image.height,0,0,canvas.scrollWidth,canvas.scrollHeight);
}


// prototype to	start drawing on touch using canvas moveTo and lineTo
var drawTouch = function() {
	var xStart=0,yStart=0;
	
	var start = function(e) {
		ctx.lineWidth = 3;
		ctx.beginPath();
		xStart = e.changedTouches[0].pageX;
		yStart = e.changedTouches[0].pageY-44;
		ctx.moveTo(xStart,yStart);
	};
	
	var move = function(e) {
		e.preventDefault();
		x = e.changedTouches[0].pageX;
		y = e.changedTouches[0].pageY-44;
		
		if(tool === "pen"){
			ctx.lineTo(x,y);
			ctx.stroke();
		} else if (tool === "rect") {
			ctx.moveTo(xStart,yStart);
			ctx.lineTo(xStart,y);
			ctx.stroke();
			ctx.moveTo(xStart,yStart);
			ctx.lineTo(x,yStart);
			ctx.stroke();
		} 
	};
	
	var end = function(e) {
		x = e.changedTouches[0].pageX;
		y = e.changedTouches[0].pageY-44;
		if (tool === "rect") {
			ctx.moveTo(x,y);
			ctx.lineTo(x,yStart);
			ctx.stroke();
			ctx.moveTo(x,y);
			ctx.lineTo(xStart,y);
			ctx.stroke();
			
			ctx.lineWidth = 1;
			stringStep = (x-xStart)/stringCount;
			for (var i = 0; i<=stringCount;i++){
				ctx.moveTo(xStart + (i*stringStep),yStart);
				ctx.lineTo(xStart + (i*stringStep),y);
				ctx.stroke();
			}
			
			cellStep = (y-yStart)/(cellCount/stringCount);
			for (var i = 0; i<=(cellCount/stringCount);i++){
				ctx.moveTo(xStart, yStart + (i*cellStep));
				ctx.lineTo(x, yStart + (i*cellStep));
				ctx.stroke();
			}
			
			toggleTool();
			//Werte für Fehlereintrag sichern
			xStM = xStart;
			yStM = yStart;
		} else if(tool === "mark"){
			markError(x, y);
		}
	};
	
    document.getElementById("canvas").addEventListener("touchstart", start, false);
	document.getElementById("canvas").addEventListener("touchmove", move, false);
	document.getElementById("canvas").addEventListener("touchend", end, false);
}; 
  


function toggleTool(){
	if (tool === "rect"){
		tool = "mark";
	} else if (tool === "mark"){
		tool = "rect";
	} else {
		tool = "mark";
	}
	document.getElementById("aTool").innerText = tool; //Aktualisiere Anzeige mit aktuellem tool
}

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







