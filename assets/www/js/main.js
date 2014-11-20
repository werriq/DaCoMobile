
var ModuleTest = "ModuleTest ist leer";
// wait for device init
document.addEventListener( "DOMContentLoaded", function(){
    setTimeout(function(){
		FileOperation("read","ModuleTests.cfg","DaCoMobile");
    }, 1000);
	
}, false );



//### Dateien bearbeiten ###
	
	var DateiInhalt;
	
	var FSSchreibart;
	var FSDateiname;
	var FSPfad;
	var FSText;
	
function FileOperation(Schreibart, Dateiname, Pfad){
	DateiInhalt = "leer";
	
	FSSchreibart = Schreibart;
	FSDateiname = Dateiname;
	FSPfad = Pfad + "/" + Dateiname;
	
	console.log("DateiInhalt: " + DateiInhalt + " /// FSSchreibart: " + FSSchreibart + " /// FSPfad: " + FSPfad);
	
	if(FSSchreibart != "read"){
		FSText = prompt("Was wollen sie in die Datei schreiben?");
	}
	
	FSLoad();
	
}	


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
		FSread(file);
	}
	//Ende: Dateisystem laden etc

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
		writer.write(FSText + ";" + document.getElementById('pText').innerHTML);
	};
	
	function FSread(file) {
		var reader = new FileReader();
    	reader.onloadend = function(evt) {
			DateiInhalt = evt.target.result;
			FSreadAfter();
    	};
		
    	reader.readAsText(file);
	};

	function FSfail(error) {
		alert("Error while file operation: " + error.code);
	};


function FSreadAfter(){
	var stream = DateiInhalt.split("\n");

	//Je nach eingelesener Datei 
	//die richtige Unterfunktion aufrufen

	switch(stream[0]) {
    	case "[ModuleTest]":
        	stream = cleanStream(stream);
			addMainEntrys(stream);
			break;
    	case "[MQT01 Errorlist]":
        	//code block
        	break;
    	default:
        	alert("Dateiinhalt kann nicht zugeordnet werden!");
	}
		
}

function cleanStream(stream){
	//Hinweise und leerzeilen entfernen
	for(i=0;i<stream.length;i++){
		if (stream[i].indexOf("#") === 0){
			stream.splice(i,1); i--;
		} else if (stream[i].length === 0) {
			stream.splice(i,1); i--;
		}
	}
	
	return stream;
}

//### Dateien bearbeiten ENDE ###
	

function addMainEntrys(stream){
//Diese function fügt die Testauswahl hinzu
	var mainEntrys;
	var entryParts;
	
	
	for(i=1;i<stream.length;i++){
		entryParts = stream[i].split(";");
		mainEntrys += '<li class="mainEntry" id="'+entryParts[1]+'" onclick="'+entryParts[3]+'" >'+entryParts[2]+'</li>';
	}	
	document.getElementById("testList").innerHTML = mainEntrys;
}

function testfn(el){
	alert("in testfn: ");
}
