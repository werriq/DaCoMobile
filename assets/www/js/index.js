/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var touchme = null;
 
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
		document.getElementById('scan').addEventListener('click', this.scan, false);
        document.getElementById('encode').addEventListener('click', this.encode, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
		
		//Touch Listener
		touchme=document.getElementById('HammerCanvas');
		touchme.addEventListener('touchstart',onNav, false);
		
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
	
	scan: function() {
        console.log('scanning');
        
        var scanner = cordova.require("cordova/plugin/BarcodeScanner");

        scanner.scan( function (result) { 

            alert("We got a barcode\n" + 
            "Result: " + result.text + "\n" + 
            "Format: " + result.format + "\n" + 
            "Cancelled: " + result.cancelled);  

           console.log("Scanner result: \n" +
                "text: " + result.text + "\n" +
                "format: " + result.format + "\n" +
                "cancelled: " + result.cancelled + "\n");
            document.getElementById("info").innerHTML = result.text;
            console.log(result);
            /*
            if (args.format == "QR_CODE") {
                window.plugins.childBrowser.showWebPage(args.text, { showLocationBar: false });
            }
            */

        }, function (error) { 
            console.log("Scanning failed: ", error); 
        } );
    },

    encode: function() {
        var scanner = cordova.require("cordova/plugin/BarcodeScanner");

        scanner.encode(scanner.Encode.TEXT_TYPE, "http://www.nhl.com", function(success) {
            alert("encode success: " + success);
          }, function(fail) {
            alert("encoding failed: " + fail);
          }
        );

    }

};

// ######## mycode #########


function Hinweis(){
	alert("Hinweisknopf funktioniert");	
};

//Get Acceleration
function accee() {
	navigator.accelerometer.getCurrentAcceleration(onSuccess, onError);
};

function onSuccess(Acceleration) {
	document.getElementById("txtacX").value = Acceleration.x;
	document.getElementById("txtacY").value = Acceleration.y;
	document.getElementById("txtacZ").value = Acceleration.z;
		  //	"timestamp: " + Acceleration.timestamp + "\n");
};

function onError(Acceleration) {
 	alert("onerror");
};


//Take a Picture with Camera
function TakePic() {
navigator.camera.getPicture(TPonSuccess, TPonFail, { 
	quality: 100,
    destinationType: Camera.DestinationType.FILE_URI,
	saveToPhotoAlbum: true,
	});
};

function TPonSuccess(imageURI) {
    var image = document.getElementById('imgTP');
	var path = document.getElementById('TPPath');
    image.src = imageURI;	//"data:image/jpeg;base64," + imageData;
	document.getElementById('TPPath').innerHTML = imageURI;
	
	window.localStorage.setItem("picURI",imageURI);
	//Link öffnen
	self.location.href="draw.html";

}

function TPonFail(message) {
    alert('Failed because: ' + message);
}

//Draw something
function DrawOnCanvas(){
	//var canvas = document.getElementById('ImgCanvas');
	var canvas = document.getElementById('HammerCanvas');
	var context = canvas.getContext('2d');
	
	context.strokeStyle = "red";
	context.moveTo(0,0);
	context.lineTo(document.getElementById('ImgCanvas').width, document.getElementById('ImgCanvas').height);
	context.stroke();
	
	
	context.strokeStyle = 'red';
	context.fillStyle = "yellow";
	context.moveTo(0,0);
	context.rect(0,0,4,200);
	context.fill();
	context.stroke();
	
	context.moveTo(50,50);
	context.rect(50,50,10,200);
	context.fill();
	context.stroke();
}

//Bild in canvas laden
function ImageToCanvas(){
	var canvas = document.getElementById('ImgCanvas');
	var context = canvas.getContext('2d');
	
	var imageObj = new Image();
	imageObj.src = document.getElementById('TPPath').innerHTML;
	
	imageObj.onload = function() {
		context.drawImage(imageObj,0,0,150,150);	
	};
	
}

function ItC(){
	var canvas = document.getElementById('ImgCanvas');
	var context = canvas.getContext('2d');
	alert("Start ItC");
	//var image = canvas.toDataURL("image/png").replace("image/png", "image/oct-stream");
	//window.location.href=image;	
	
	window.canvas2ImagePlugin.saveImageDataToLibrary(
        function(msg){
            alert(msg);
        },
        function(err){
            alert(err);
        },
        document.getElementById('ImgCanvas')
    );
}

function CanvasToImg(){
	var canvas = document.getElementById('ImgCanvas');
	var context = canvas.getContext('2d');
	
	var dataURL = canvas.toDataURL();
	document.getElementById('imgTP').src = dataURL;
	
	return dataURL.replace(/data:image\/png;base64,/, "");
}





//Check connection of my device
function checkConnection() {
	var networkState = navigator.connection.type;
	
	var states = {};
	states[Connection.UNKNOWN] = "Unknown connection";
	states[Connection.ETHERNET] = "Ethernet connection";
	states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    alert('Connection type: ' + states[networkState]);
}






//### Dateien bearbeiten ###

//Dateisystem laden
function FSLoad(){
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, FSgot, FSfail);
}

function FSgot(fileSystem) {
	fileSystem.root.getFile(FSPfad, {create: true, exclusive: false}, FSgotFileEntry, FSfail);
};

function FSgotFileEntry(fileEntry) {

	if(FSSchreibart === "newWrite") {
		fileEntry.createWriter(FSnewWrite, FSfail);
	}
	else if (FSSchreibart === "addWrite") {
		fileEntry.createWriter(FSaddWrite,FSfail);
	}
};

//Was soll geschrieben werden
var FSText;
var FSDateiname;
var FSPfad;
var FSSchreibart;

function FSSchreiben(Schreibart) {
	FSSchreibart = Schreibart;
	FSPfad = "readme.txt";
	FSText = prompt("Was wollen sie in die Datei schreiben?");
	FSLoad();
}

function FSnewWrite(writer) {
	writer.onwrite = function(evt) {
		alert("Datei wurde überschrieben");
	};
	writer.write(FSText);
};

function FSaddWrite(writer) {
	writer.onwrite = function(evt) {
		alert("Text wurde der Datei hinzugefügt");
	};
	writer.seek(writer.length);
	writer.write(FSText + ";" + document.getElementById('TPPath').innerHTML);
};


function FSfail(error) {
    alert("Error while file operation: " + error.code);
}

function FSsavePicture(){
	FSSchreibart = "newWrite";
	FSPfad = "MyPic.png";
	FSText = CanvasToImg();
	FSLoad();
}

/*
function gotFileWriter(writer) {
    writer.onwriteend = function(evt) {
    	console.log("contents of file now 'some sample text'");
        writer.truncate(11);
        writer.onwriteend = function(evt) {
        	console.log("contents of file now 'some sample'");
            writer.seek(4);
            writer.write(" different text Time");
            writer.onwriteend = function(evt){
            	console.log("contents of file now 'some different text'");
            };
        };
	};
   	writer.write("some sample text!!!");
};
*/
	
//### Dateien bearbeiten ENDE ###

//Pan zeigt ob nach links oder rechts gewischt wurde
function hammerPan(){
	alert("Start Hammertime: Pan!");
	var myElement = document.getElementById('HammerDiv');
	var hammerMC = new Hammer(myElement);
	
	// listen to events...
	hammerMC.on("panleft panright tap press", function(ev) {
    	myElement.textContent = ev.type + " gesture detected";
	});
}	

	var Start = false;
	var End = false;
	var HL = [];
//touchposition ermitteln
window.addEventListener("DOMContentLoaded", onDeviceReady, false);
function onNav(event) {

	//Startpunkt oder Endpunkt festlegen
	if (!Start) {
        Start = true;
		HL[0] = event.touches[0].pageX - getClipRect('HammerCanvas').left;
		HL[1] = event.touches[0].pageY - getClipRect('HammerCanvas').top;
		//alert(HL[0] + ' -1- ' + HL[1] + " Y" + getClipRect('HammerCanvas').top);
	} else if (!End) {
		End = true;
		HL[2] = event.touches[0].pageX - getClipRect('HammerCanvas').left;
		HL[3] = event.touches[0].pageY - getClipRect('HammerCanvas').top;
		//alert(X2 + ' -2- ' + Y2);
		//alert("Start dawing");
		DrawOnHammerCanvas(HL);
		Start = false;
		End = false;
	}
}
//Draw on HammerCanvas
function DrawOnHammerCanvas(Point){
	var canvas = document.getElementById('HammerCanvas');
	var context = canvas.getContext('2d');
	
	//alert("drawing: " + Point[0] + "x" + parseInt(Point[1]) + "     " + Point[2] + "x" + Point[3]);
	
	/*//context.strokeStyle = 'blue';
	context.fillStyle = "yellow";
	context.rect(parseInt(Point[0]),parseInt(Point[1]),parseInt(Point[2]),parseInt(Point[3]));
	context.fill();
	//context.stroke();
	*/
	context.moveTo(0,0);
	//alert(parseInt(Point[1]) * 100 / getClipRect('HammerCanvas').height + "    " + getClipRect('HammerCanvas').height);
	context.strokeStyle = 'red';
	context.moveTo(parseInt(Point[0])/2,parseInt(Point[1])/2);
	context.lineTo(parseInt(Point[2])/2,parseInt(Point[3])/2);
	context.stroke();
	
}

//Funktion gibt die Position des Elements zurück
function getClipRect(obj) {
  if (typeof obj === 'string')
    obj = document.getElementById(obj);

  var curleft = 0;
  var curtop = 0;

  var findPos = function(obj) {
    curleft += obj.offsetLeft;
    curtop += obj.offsetTop;
    if(obj.offsetParent) {
      findPos(obj.offsetParent);
    }
  };
  findPos(obj);

  return {
    top: curtop,
    left: curleft,
    width: obj.offsetWidth,
    height: obj.offsetHeight
  };
}




// Barcodescanner

// Quelltext nicht vollständig
// Plugin noch nicht eingebunden
function BarcodeScand() {
	cordova.plugins.barcodeScanner.scan( ); // SIEHE WEBSITE
}
