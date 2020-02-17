'use strict';


document.addEventListener ( 'DOMContentLoaded', () => {	// DOM-Elemente 

    console.log(userGesamtIngesamt,"xx");
    document.getElementById("willkommen").innerHTML = userGesamtIngesamt.value.firstname;

    let textnode, node, newElement, newTextnode, addmeaning = ["", ", ", " gelesen, Genre: ", ""]; 	
	
	if(userGesamtIngesamt.value.books){
		userGesamtIngesamt.value.books.forEach(key => {	

			node 	 = document.createElement("li");		
			textnode = document.createTextNode(Object.values(key)[0] + " von "); 
			node.appendChild(textnode);		
			
			for(let i=1; i<=3; i++){			
				newElement = document.createElement("span");
				newTextnode = document.createTextNode( Object.values(key)[i] + addmeaning[i] );
				newElement.appendChild(newTextnode);
				node.appendChild(newElement)
			}

			document.getElementById("deine-buecher-liste").appendChild(node);	

		});
	}


});