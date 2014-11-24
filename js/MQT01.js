
var module = {
	serial:"empty",
	Enummer:"E#####-T1",
	pic: [],
	picCount: 0,
	
	addPicPath: function (picPath) {
		//alert("inside" + this.picCount);
		this.pic.push([this.picCount, picPath]);
		this.picCount += 1;
		for(var ABC in this.pic){
			//alert("picCount: " + this.pic[ABC][0] + " \npicPath: " + this.pic[ABC][1]);
		}
	},
	
	
};


	






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
