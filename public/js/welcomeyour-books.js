'use strict';


document.addEventListener ( 'DOMContentLoaded', () => {	// DOM-Elemente 

    document.getElementById("willkommen").innerHTML = userGesamtIngesamt.value.firstname;

    let textnodeTitle, newElementTitle, textnodeTitleZusatz, textnodeAuthor, newTextnode, addmeaning = ["", ", ", " gelesen, Genre: ", ""];
 
	
	if(userGesamtIngesamt.value.books){
        let nodeTableTr, nodeTableTh, textnodeHeadersText;	
        let nodeTableHeaders = ["Titel", "Autor", "gelesen", "genre"]; 
               
        nodeTableTr  = document.createElement("tr");

        nodeTableHeaders.forEach(headers => {
            nodeTableTh  = document.createElement("th");                        
            textnodeHeadersText = document.createTextNode(headers);
            nodeTableTh.appendChild(textnodeHeadersText); 
            nodeTableTr.appendChild(nodeTableTh);
        });	
       

       document.getElementById("deine-buecher-liste").appendChild(nodeTableTr);



/*
		userGesamtIngesamt.value.books.forEach(key => {	
            console.log();
            
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



			document.getElementById("deine-buecher-liste").appendChild(node);	

        });
        */
	}


});