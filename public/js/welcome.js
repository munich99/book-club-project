'use strict';

let userGesamtIngesamt = JSON.parse(localStorage.getItem("userGesamt"));
console.log(userGesamtIngesamt);


document.addEventListener ( 'DOMContentLoaded', () => {
	// DOM-Elemente 
	let bookGenre  =  document.querySelector('#book-genre');
	let bookTitle  =  document.querySelector('#book-title');
	let bookAuthor =  document.querySelector('#book-author');    
	let btn        =  document.querySelector('#btn');
	let btnFreunde = document.querySelectorAll('.buch_freunde');
	let meinRequest;	
	

	document.getElementById("willkommen").innerHTML = userGesamtIngesamt.value.firstname;
		
	Object.keys(userGesamtIngesamt.value.books).forEach(key => {
		let node 	 = document.createElement("li");                
		let textnode = document.createTextNode(`${userGesamtIngesamt.value.books[key]} `); 
		node.appendChild(textnode);

		let newElement = document.createElement("span");
		let textnode2  = document.createTextNode(`${key}`); 
		newElement.appendChild(textnode2);

		node.appendChild(newElement);	
		document.getElementById("deine-buecher-liste").appendChild(node);		
	 });

// new book ##
	btn.addEventListener ( 'click', () => {  
		validateForm();	
		let b1 = bookAuthor.value;
		userGesamtIngesamt.value.books[b1] = bookTitle.value;

		meinRequest = newRquest(( '/welcome/:' + userGesamtIngesamt.id ), JSON.stringify(userGesamtIngesamt));

        fetch( meinRequest ).then(
			erg => erg.json() //console.log(erg)    
        ).then(
            erg => token(erg)     
        ).catch(
            err => console.error( err )
		);
	});

	
// serching Friends /to save many times ## addEventListener ##
	btnFreunde.forEach( (entry) => {
		entry.addEventListener ( 'click', () =>  {
			// alert(entry.parentNode.firstElementChild.value);			

			let serchingFriends = {     
				searchtheme:	entry.parentNode.id,
				searchcontent:  entry.parentNode.firstElementChild.value,				
				user:           userGesamtIngesamt.value.firstname
			};
			
			console.log(JSON.stringify(serchingFriends));
			
			
			meinRequest = newRquest('/welcome/a/:55', JSON.stringify(serchingFriends));

			fetch( meinRequest ).then(
				erg => erg.json() //console.log(erg)    
			).then(
				erg => console.log(erg)    
			).catch(
				err => console.error( err )
			); 

			
		});
		console.log(entry)
	  });

	
	function newRquest(routing, bodycontent) {
        return new Request(
            routing,
            {   method: 	'post',
				headers:  { 'content-type': 'application/json' },
				body: 		bodycontent
            }
        )
	}

	function validateForm() {
		let matches = document.getElementById("eingabe").querySelectorAll("input");		
		matches.forEach(element => {  // short for all inputs
			if (!element.validity.valid) element.focus();	
		});		
	}

	function token(erg){  
		// local store chainging - for new couchdb _rev  
		userGesamtIngesamt.value.rev = erg.rev_user;
		localStorage.setItem("userGesamt", JSON.stringify(userGesamtIngesamt));
		window.location.replace("/welcome");  
	}
	
	function error( err ){ console.log(err)}

});