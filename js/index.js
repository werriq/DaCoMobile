/*
 * 
 */
var app = {
    // Application Constructor
    initialize: function() {
		//alert("inside intitialize");
        this.bindEvents();
    },
    // Bind Event Listeners
    //
	
    // Bind any events that are required on startup. Common events are:
    // `load`, `deviceready`, `offline`, and `online`.
    bindEvents: function() {
		alert("inside bindEvents");
        //document.addEventListener('deviceready', this.onDeviceReady, false);
		document.addEventListener("deviceready", this.onDeviceReady, true);
        //document.getElementById('scan').addEventListener('click', this.scan, false);
        //document.getElementById('encode').addEventListener('click', this.encode, false);
    },

    // deviceready Event Handler
    //
    // The scope of `this` is the event. In order to call the `receivedEvent`
    // function, we must explicity call `app.receivedEvent(...);`
    onDeviceReady: function() {
		alert("inside onDeviceReady");
        app.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
alert("inside received1");
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
alert("inside received3");
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    

};

function scan() {
       
        alert('scanning');
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
            
        }, function (error) { 
            console.log("Scanning failed: ", error); 
        } );

}

function encode() {
        var scanner = cordova.require("cordova/plugin/BarcodeScanner");

        scanner.encode(scanner.Encode.TEXT_TYPE, "http://www.nhl.com", function(success) {
            alert("encode success: " + success);
          }, function(fail) {
            alert("encoding failed: " + fail);
          }
        );
}

var currentPage = "content-Index";
function goTo(page){
	document.getElementById(currentPage).style.display = 'none';
	document.getElementById(page).style.display = 'block';
	//alert(currentPage + " ... " + page);
	currentPage = page;
}

function offlineTP(imageURI){
	module.addPicPath(imageURI);
	addXtraPic(imageURI);
}



var test;
function testFn() {
	test = prompt("Eingabe","Default Eingabe");
	alert(test);
}

function testFn2() {
	alert(module.serial);
	
	window.localStorage.setItem('module', JSON.stringify(module));
	//Link öffnen
	self.location.href="draw.html";
}

//#############
//MQT01



function setDisable(Ids) {
	/*	Ids format: [['fieldset Id',true],['fieldset2 Id',false], ... ]
		true = wird disabled, false = wird enabled	*/
	for(i=0;i<Ids.length;i++){
		document.getElementById(Ids[i][0]).disabled = Ids[i][1];
	}
}

//### Take a Picture with Camera ###
function TakePic(moduleItem) {
	//moduleItem noch verwursten, was vom Modul wird geknipst
	navigator.camera.getPicture(TPonSuccess, TPonFail, { 
		quality: 100,
    	destinationType: Camera.DestinationType.FILE_URI,
		saveToPhotoAlbum: true,
		});
}

function TPonSuccess(imageURI) {
    var image = document.getElementById('imgTP');
	var path = document.getElementById('TPPath');
	
	module.addPicPath(imageURI);
	addXtraPic(imageURI);
	window.localStorage.setItem('module', JSON.stringify(module));
	
	//Link öffnen
	//self.location.href="draw.html";

}

function TPonFail(message) {
    alert('Failed because: ' + message);
}
//### Take a Picture with Camera Ende###

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
//### Weitere Bilder ENDE ###

