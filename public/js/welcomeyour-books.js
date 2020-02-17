'use strict';


document.addEventListener ( 'DOMContentLoaded', () => {	// DOM-Elemente 

    document.getElementById("willkommen").innerHTML = userGesamtIngesamt.value.firstname;  
	
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


        let nodeTableTd, nodeTableTdTitle, nodeTableTdAuthor, nodeTableTdRead;
        userGesamtIngesamt.value.books.forEach(book => {	

            nodeTableTr  = document.createElement("tr");
                        
            nodeTableTd  = document.createElement("td");                        
            nodeTableTdTitle = document.createTextNode(book.title);
            nodeTableTd.appendChild(nodeTableTdTitle);
            nodeTableTr.appendChild(nodeTableTd);
            
            nodeTableTd  = document.createElement("td");
            nodeTableTdAuthor = document.createTextNode(book.author);
            nodeTableTd.appendChild(nodeTableTdAuthor);
            nodeTableTr.appendChild(nodeTableTd);

            nodeTableTd  = document.createElement("td");
            nodeTableTdRead = document.createTextNode(book.read);
            nodeTableTd.appendChild(nodeTableTdRead);
            nodeTableTr.appendChild(nodeTableTd);
           


            


            document.getElementById("deine-buecher-liste").appendChild(nodeTableTr);	

            });
       
	}


});