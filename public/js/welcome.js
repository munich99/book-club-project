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
		let textnode = document.createTextNode(`${userGesamtIngesamt.value.books[key]}`); 
		node.appendChild(textnode);

		let newElement = document.createElement("span");
		let textnode2 = document.createTextNode(`${key}`); 
		newElement.appendChild(textnode2);

		node.appendChild(newElement);	
		document.getElementById("deine-buecher-liste").appendChild(node);		
	 });	 

	function validateForm() {
		let matches = document.getElementById("eingabe").querySelectorAll("input");		
		matches.forEach(element => { 
			if (!element.validity.valid) element.focus();	
		});

	
	}

	btn.addEventListener ( 'click', () => {  
		validateForm()	

       let meinRequest = newRquest();

        fetch( meinRequest ).then(
            erg => erg.json() //console.log(erg)    
        ).then(
            erg => token(erg)  
        ).catch(
            err => console.error( err )
		)		
		
	});
	
	function newRquest() {
        return new Request(
            ( '/welcome/:' + userGesamtIngesamt.id ),
            {
                method: 'post',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({                            
                    booktitle:	bookTitle.value,
                    bookauthor: bookAuthor.value,
					bookgenre:	bookGenre.value,
					rev:        userGesamtIngesamt.value.rev          
                })
            }
        )
	}

	function token(usertoken){         
                        
             
            //localStorage.setItem("token", usertoken.token); 
            //localStorage.setItem("user", usertoken.signed_user.value.firstname);
            //localStorage.setItem("id", usertoken.signed_user.id);
            //localStorage.setItem("books", JSON.stringify(usertoken.signed_user.value.books)); 
            
            window.location.replace("/welcome");
  
    }
	


});