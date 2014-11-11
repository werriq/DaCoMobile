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
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // `load`, `deviceready`, `offline`, and `online`.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.getElementById('scan').addEventListener('click', this.scan, false);
        document.getElementById('encode').addEventListener('click', this.encode, false);
    },

    // deviceready Event Handler
    //
    // The scope of `this` is the event. In order to call the `receivedEvent`
    // function, we must explicity call `app.receivedEvent(...);`
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
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

function TP(){
	navigator.camera.getPicture(TPonSuccess, TPonFail, { 
		quality: 100,
    	destinationType: Camera.DestinationType.FILE_URI,
		saveToPhotoAlbum: true,
	});
}

function TPonSuccess(imageURI) {
    //var image = document.getElementById('myImage');
    //image.src = imageURI;
	document.getElementById("pText").innerHTML = imageURI;
	
	window.localStorage.setItem("picURI",imageURI);
	//Link öffnen
	self.location.href="draw.html";

	
}

function TPonFail(message) {
    document.getElementById("pText").innerHTML = 'Failed because: ' + message;
	FSSchreiben("newWrite");
}




//### Dateien bearbeiten ###

//Dateisystem laden etc
function FSLoad(){
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, FSgot, FSfail);
}

function FSgot(fileSystem) {
	if (FSSchreibart === "read"){
		fileSystem.root.getFile(FSPfad, null, FSgotFileEntry, FSfail);
	}else{
		fileSystem.root.getFile(FSPfad, {create: true, exclusive: false}, FSgotFileEntry, FSfail);
	}
};

function FSgotFileEntry(fileEntry) {

	if(FSSchreibart === "newWrite") {
		fileEntry.createWriter(FSnewWrite, FSfail);
	} else if (FSSchreibart === "addWrite") {
		fileEntry.createWriter(FSaddWrite,FSfail);
	} else if (FSSchreibart === "read"){
		fileEntry.file(FSgotFile, FSfail);
	}
	
};

function FSgotFile(file){
        //readDataUrl(file);
        readAsText(file);
}
//Ende: Dateisystem laden etc


//Was soll geschrieben werden
var FSText;
var FSDateiname;
var FSPfad;
var FSSchreibart;

function FSSchreiben(Schreibart) {
	FSSchreibart = Schreibart;
	FSDateiname ="readme.txt";
	FSPfad = "DaCoMobile/test/" + FSDateiname;
	if(FSSchreibart != "read"){
		FSText = prompt("Was wollen sie in die Datei schreiben?");
	}
	FSLoad();
}

function FSnewWrite(writer) {
	writer.onwrite = function(evt) {
		document.getElementById("pText").innerHTML = "Datei wurde überschrieben";
	};
	writer.write(FSText);
};

function FSaddWrite(writer) {
	writer.onwrite = function(evt) {
		document.getElementById("pText").innerHTML = "Text wurde der Datei hinzugefügt";
	};
	writer.seek(writer.length);
	writer.write(FSText + ";" + document.getElementById('pText').innerHTML);
};
	
function readAsText(file) {
	var reader = new FileReader();
    reader.onloadend = function(evt) {
         document.getElementById("pText").innerHTML = "Ausgelesen: " + evt.target.result;
    };
    reader.readAsText(file);
}

function FSfail(error) {
    document.getElementById("pText").innerHTML = "Error while file operation: " + error.code;
}
	
//### Dateien bearbeiten ENDE ###



//### Hilfsfunktionen ###

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
