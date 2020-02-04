'use strict';

const userGesamtIngesamt = JSON.parse(localStorage.getItem("userGesamt"));

document.addEventListener ( 'DOMContentLoaded', () => {
	// DOM-Elemente 
	let bookGenre = document.querySelector('#book-genre');
	let bookTitle = document.querySelector('#book-title');
	let bookAuthor = document.querySelector('#book-author');    
	let btn = document.querySelector('#btn');

	document.getElementById("willkommen").innerHTML = userGesamtIngesamt.value.firstname;
		
	Object.keys(userGesamtIngesamt.value.books).forEach(key => {
		let node = document.createElement("li");                
		let textnode = document.createTextNode(`${userGesamtIngesamt.value.books[key]} `); 
		node.appendChild(textnode);

		let newElement = document.createElement("span");
		let textnode2 = document.createTextNode(`${key}`); 
		newElement.appendChild(textnode2);

		node.appendChild(newElement);	
		document.getElementById("deine-buecher-liste").appendChild(node);		
	 });	 

	function validateForm() {
		let matches = document.getElementById("eingabe").querySelectorAll("input");		
		matches.forEach(element => {  // short for all inputs
			if (!element.validity.valid) element.focus();	
		});

		
	}


	btn.addEventListener ( 'click', () => {  
		validateForm();	
		let b1 = bookAuthor.value;
		userGesamtIngesamt.value.books[b1] = bookTitle.value;
		
		// let newBooks = {[bookAuthor.value]:bookTitle.value};
		console.log(userGesamtIngesamt.value.books, "neue bücher");

       	let meinRequest = newRquest();

        fetch( meinRequest ).then(
            erg => erg.json() //console.log(erg)    
        ).then(
			localStorage.setItem("userGesamt", JSON.stringify(userGesamtIngesamt))
		).then(
            erg => token(erg)  
        ).catch(
            err => console.error( err )
		);
			
		
	});
	
	function newRquest() {
        return new Request(
            ( '/welcome/:' + userGesamtIngesamt.id ),
            {   method: 'post',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify(userGesamtIngesamt)
            }
        )
	}

	function token(usertoken){  
 
            
    	window.location.replace("/welcome");
  
    }
	


});