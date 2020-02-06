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
	
	let textnode, node, newElement, newTextnode, addmeaning = ["", ", ", " gelesen, Genre: ", ""]; 		
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

	 //btn.removeEventListener("click");
// new book ##	
	btn.addEventListener ( 'click', () => {  
		// --- validate new book

		let fieldsfull=true;
		let matches = document.getElementById("eingabe").querySelectorAll("input");	

		matches.forEach(element => {  // short for all inputs 			
			if (!element.validity.valid) {
				 element.focus(); fieldsfull=false; return
			}	
		});

		if(!fieldsfull) return 
		
		// -----------

/*
		function parent_function(){			
			function child_function(){
				console.log("Hi from CHILD function")
			}
			return child_function
		}

		child_function = parent_function()
		
		child_function()
	*/
		// ------------

		

		// console.log(hallo(),"hallo");

		console.log(userGesamtIngesamt,"userGesamtIngesamt");
		
		/*
		let b1 = bookAuthor.value;
		userGesamtIngesamt.value.books[b1] = bookTitle.value;
		
		meinRequest = newRquest(( '/welcome/:' + userGesamtIngesamt.id ), JSON.stringify(userGesamtIngesamt));

        fetch( meinRequest ).then(
			erg => erg.json() //console.log(erg)    
        ).then(
            erg => token(erg)     
        ).catch(
            err => console.error( err )
		); */
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
		
	  });

	function validateForm() {
	/*	matches.forEach(element => {  // short for all inputs
			if (!element.validity.valid) {
			//	element.focus(); let fieldsfull=true; return fieldsfull
			  }			
		});	*/
		return false;	
	}

	function newRquest(routing, bodycontent) {
        return new Request(
            routing,
            {   method: 	'post',
				headers:  { 'content-type': 'application/json' },
				body: 		bodycontent
            }
        )
	}


	function token(erg){  
		// local store chainging - for new couchdb _rev  
		userGesamtIngesamt.value.rev = erg.rev_user;
		localStorage.setItem("userGesamt", JSON.stringify(userGesamtIngesamt));
		window.location.replace("/welcome");  
	}
	
	function error( err ){ console.log(err)}

});