
var pvM = {
	serial:"empty",
	Enummer:"E#####-T1",
	pic: [],
	picCount: 0,
	
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
	
	/*
	// setup to trigger drawing on mouse or touch
    drawTouch();
    drawPointer();
	drawMouse();
	*/
}


function TPLoad(){
	alert("inside tpload()");
	var image = new Image(); //Bild laden
	image.src = pvM.pic[0][2];
	alert(image.height);
	var canvas = document.getElementById("canvas");
	ctx.drawImage (image,0,0,image.width,image.height,0,0,canvas.scrollWidth,canvas.scrollHeight);
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
	




