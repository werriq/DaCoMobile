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
		
        //document.addEventListener('deviceready', this.onDeviceReady, false);
		document.addEventListener("deviceready", this.onDeviceReady, true);
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

    

};

function scan() {
       
        //alert('scanning');
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
	//Write/change Title to navbar
	var title = page.replace("content-","DaCoMobile ");
	if (title.match("Index")){
		document.getElementById("navTitle").innerHTML = "DaCoMobile";
	} else {
		document.getElementById("navTitle").innerHTML = title;
	}
	currentPage = page;
	
	//Test if additional loadings needed
	switch (page) {
		case ("content-Draw"):
			
			break;
			
		default:
			//nothing
	}
}




var test;
function testFn() {
	test = prompt("Eingabe","Default Eingabe");
	alert(test);
}




