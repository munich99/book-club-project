'use strict';


document.addEventListener ( 'DOMContentLoaded', () => {	// DOM-Elemente 

    document.getElementById("willkommen").innerHTML = userGesamtIngesamt.value.firstname;

    let textnodeTitle, node, newElementTitle, textnodeTitleZusatz, textnodeAuthor, newTextnode, addmeaning = ["", ", ", " gelesen, Genre: ", ""]; 	
	
	if(userGesamtIngesamt.value.books){
		userGesamtIngesamt.value.books.forEach(key => {	
            console.log();
            

            node 	 = document.createElement("li");
            
            newElementTitle  = document.createElement("span");
            newElementTitle.className = "title";            
            textnodeTitle = document.createTextNode(key.title);
            newElementTitle.appendChild(textnodeTitle);   
            //textnodeAuthor = document.createTextNode(key.author); 
            console.log(key);
            

            textnodeTitleZusatz = document.createTextNode(" von ");
            textnodeAuthor = document.createTextNode(key.author);            
            
            
            node.appendChild(newElementTitle);
            node.appendChild(textnodeTitleZusatz);
            node.appendChild(textnodeAuthor);

            // node.appendChild(textnodeAuthor);		
			
			/* for(let i=1; i<=3; i++){			
				newElement  = document.createElement("span");
				newTextnode = document.createTextNode( Object.values(key)[i] + addmeaning[i] );
				newElement.appendChild(newTextnode);
				node.appendChild(newElement)
			} */

			document.getElementById("deine-buecher-liste").appendChild(node);	

		});
	}


});