'use strict';    
console.log(localStorage.getItem("user"));
console.log(localStorage.getItem("token"));  

// test


let obj = JSON.parse(localStorage.getItem("books"));
console.log(obj,"books");
 

document.addEventListener ( 'DOMContentLoaded', () => {

	document.getElementById("willkommen").innerHTML = localStorage.getItem("user");

		
	Object.keys(obj).forEach(key=>{
		let node = document.createElement("li");                
		let textnode = document.createTextNode(`${obj[key]}`); 
		node.appendChild(textnode);

		let newElement = document.createElement("span");
		let textnode2 = document.createTextNode(`${key}`); 
		newElement.appendChild(textnode2);

		node.appendChild(newElement);	
		document.getElementById("deine-buecher-liste").appendChild(node);


		console.log(`${key} : ${obj[key]}`);
	 });

});