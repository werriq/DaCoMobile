
//### Weitere Bilder ###
var picIndex = 0;
function addXtraPic(picPfad) {
	// Find a <table> element with id="myTable":
	var table = document.getElementById("table-xtraPics");

	// Create an empty <tr> element and add it to the 1st position of the table:
	var row = table.insertRow(document.getElementsByTagName("tr").length);
	row.id = picIndex;
	//row.id = picIndex;
	// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	// Add some text to the new cells:
	cell1.innerHTML = "Bild Nummer: " + picIndex;
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



function add(type) {
        //Create an input type dynamically.   
        var element = document.createElement("input");
        //Assign different attributes to the element. 
        element.setAttribute("type", type);
        element.setAttribute("value", type);
        element.setAttribute("name", type);
        element.setAttribute("onclick", alert("blabla"));

        var foo = document.getElementById("fooBar");
        //Append the element in page (in span).  
        foo.appendChild(element);

    }


function setDisable(Ids) {
	/*	Ids format: [['fieldset Id',true],['fieldset2 Id',false], ... ]
		true = wird disabled, false = wird enabled	*/
		
	for(i=0;i<Ids.length;i++){
		document.getElementById(Ids[i][0]).disabled = Ids[i][1];
	}
}