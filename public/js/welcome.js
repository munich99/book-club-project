'use strict';    
console.log(localStorage.getItem("user"));
console.log(localStorage.getItem("token"));  

let obj = JSON.parse(localStorage.getItem("books"));
console.log(obj,"books");
 

document.addEventListener ( 'DOMContentLoaded', () => {
	// DOM-Elemente    
	let btn = document.querySelector('#btn');

	document.getElementById("willkommen").innerHTML = localStorage.getItem("user");
		
	Object.keys(obj).forEach(key => {
		let node = document.createElement("li");                
		let textnode = document.createTextNode(`${obj[key]}`); 
		node.appendChild(textnode);

		let newElement = document.createElement("span");
		let textnode2 = document.createTextNode(`${key}`); 
		newElement.appendChild(textnode2);

		node.appendChild(newElement);	
		document.getElementById("deine-buecher-liste").appendChild(node);		
	 });

	 btn.addEventListener ( 'click', () => {        
       /* let meinRequest = newRquest();

        fetch( meinRequest ).then(
            erg => erg.json() //console.log(erg)    
        ).then(
            erg => token(erg)  
        ).catch(
            err => console.error( err )
		)
		*/
		alert("funkt");
    });

});