
var pvM = {
	serial:"empty",
	Enummer:"E#####-T1",
	pic: [],
	picCount: 0,
	cellCount: 60,
	stringCoint: 6,
	ErrorData: [],
	
	addPicPath: function (picPath) {
		//alert("inside" + this.picCount);
		this.pic.push([this.picCount, pvMpicType, picPath]);
		this.picCount += 1;
		for(var ABC in this.pic){
			alert("picCount: " + this.pic[ABC][0] + " \npvMpcType: " + this.pic[ABC][1] + "\npicPath: " + this.pic[ABC][2]);
		}
	}
};

var pvMpicType = "unknown"; //important to store what was photographed

function setDisable(Ids) {
	/*	Ids format: [['fieldset Id',true],['fieldset2 Id',false], ... ]
		true = wird disabled, false = wird enabled	*/
	for(i=0;i<Ids.length;i++){
		document.getElementById(Ids[i][0]).disabled = Ids[i][1];
	}
}

//### Take a Picture with Camera ###
function TakePic(moduleItem) {
	pvMpicType = moduleItem;
	navigator.camera.getPicture(TPonSuccess, TPonFail, { 
		quality: 100,
    	destinationType: Camera.DestinationType.FILE_URI,
		saveToPhotoAlbum: true,
		});
}

function TPonSuccess(imageURI) {
    var image = document.getElementById('imgTP');
	var path = document.getElementById('TPPath');
	
	pvM.addPicPath(imageURI);
	addPic(imageURI);
	window.localStorage.setItem('pvM', JSON.stringify(pvM));
}

function TPonFail(message) {
    alert('Failed because: ' + message);
}
//### Take a Picture with Camera Ende###
function addPic(picPfad){
	switch (pvMpicType) {
		case ("picLabel" || "picFront" || "picBack"):
			document.getElementById(targetTXT(pvMpicType)).value = picPfad;
			break;
		
		case ("picXtra"):
			addXtraPic(picPfad);
			break;
			
		default:
			alert("pvMpicType is not known");
	}
	pvMpicType = "unknown";
}
//### Weitere Bilder ###
var picIndex = 0;
function addXtraPic(picPfad) {
	
	// Find a <table> element with id="myTable":
	var table = document.getElementById("table-xtraPics");

	// Create an empty <tr> element and add it to the 1st position of the table:
	var row = table.insertRow(table.rows.length);
	row.id = picIndex;
	//row.id = picIndex;
	// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	// Add some text to the new cells:
	cell1.innerHTML = picPfad;
	cell2.class = "td-right";
	cell2.innerHTML = '<button type="button" class="btn btn-default" style="float:right" onclick="delXtraPic(' + picIndex + ')"><span class="glyphicon glyphicon-remove"></span></button>';
	
	picIndex +=1;
}
function delXtraPic(index) {
	var table = document.getElementById("table-xtraPics");
	var rows = table.rows;
	for (i = 0; i < rows.length; i++) {
        if(parseInt(rows[i].id) === parseInt(index)){
			table.deleteRow(rows[i].rowIndex);
		}
    }
}

function targetTXT(s){
	return "txt" + s.charAt(0).toUpperCase() + s.slice(1);
}
//### Weitere Bilder ENDE ###




//########### Draw functions ################
var ctx;
var color = "rgba(0, 166, 214, 0.3)";	
var tool = "rect"; //mark //pen
var xStM, yStM; //xStartModule, yStartModule

var stringStep, cellStep;
// Establish the array which acts as a data source for the list
var error = "keine Auswahl";

// function to setup a new canvas for drawing
function newCanvas(){
	//define and resize canvas
    document.getElementById("canvasDiv").style.height = window.innerHeight-90;
    var canvas = '<canvas id="canvas" width="'+window.innerWidth+'" height="'+(window.innerHeight-90)+'"></canvas>';
	document.getElementById("canvasDiv").innerHTML = canvas;
	
    // setup canvas
	ctx=document.getElementById("canvas").getContext("2d");
	
	ctx.strokeStyle = color;
	ctx.lineWidth = 3;	
	
	//Bild laden
	TPLoad();
	
	// setup to trigger drawing on mouse or touch
    drawTouch();
    drawPointer();
	drawMouse();
}


function TPLoad(){
	alert("inside tpload()");
	var image = new Image(); //Bild laden
	image.src = pvM.pic[pic.length][2];// noch variable gestalten
	alert(image.height);
	var canvas = document.getElementById("canvas");
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
			stringStep = (x-xStart)/pvM.stringCount;
			for (var i = 0; i<=pvM.stringCount;i++){
				ctx.moveTo(xStart + (i*stringStep),yStart);
				ctx.lineTo(xStart + (i*stringStep),y);
				ctx.stroke();
			}
			
			cellStep = (y-yStart)/(pvM.cellCount/pvM.stringCount);
			for (var i = 0; i<=(pvM.cellCount/pvM.stringCount);i++){
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













function offlineTP(imageURI){
	
	document.getElementById("txtPicLabel").value = "leeren durch offlineTP";
	pvMpicType = "picLabel";
	pvM.addPicPath(imageURI);
	addPic(imageURI);
}


function testFn2() {
	goTo('content-MQT01-Draw');
	newCanvas();
}
	




