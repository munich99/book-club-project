'use strict';

let userGesamtIngesamt = JSON.parse(localStorage.getItem("userGesamt"));
console.log(userGesamtIngesamt);


document.addEventListener ( 'DOMContentLoaded', () => {	// DOM-Elemente 
	
	let bookTitle  =  document.querySelector('#book-title');
	let bookAuthor =  document.querySelector('#book-author');  
	let bookGenre  =  document.querySelector('#book-genre'); 
	let bookPart =  document.querySelector('#book-part');
	

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
	
// new book ##	
	btn.addEventListener ( 'click', () => {  

		// --- validate new book
				
		let fieldsfull	=true;
		let matches 	= document.getElementById("eingabe").querySelectorAll("input");	

		matches.forEach(element => {  // short for all inputs 			
			if (!element.validity.valid) {
				 element.focus(); fieldsfull=false; return
			}	
		});

		if(!fieldsfull) return 
		
		// -----------
		
		let newbookarray =  {
			title:	bookTitle.value,
			autor:	bookAuthor.value,
			read:	bookPart.value,
			genre:	bookGenre.value
		}
		userGesamtIngesamt.value.books.push(newbookarray);
		
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

			let serchingFriends = {     
				searchtheme:	entry.parentNode.id,
				searchcontent:  entry.parentNode.firstElementChild.value,				
				user:           userGesamtIngesamt.value.firstname
			};		

			meinRequest = newRquest('/welcome/a/:55', JSON.stringify(serchingFriends));

			fetch( meinRequest ).then(
				erg => erg.json() //console.log(erg)    
			).then(
				erg => findsearchBack(erg)      
			).catch(
				err => console.error( err )
			); 
			
		});
		
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

	function token(erg){  
		// local store chainging - for new couchdb _rev  
		userGesamtIngesamt.value.rev = erg.rev_user;
		localStorage.setItem("userGesamt", JSON.stringify(userGesamtIngesamt));
		window.location.replace("/welcome");  
	}

	function findsearchBack(erg){
		console.log(erg.findsearchBack, "das kommt zurück bei freunden");
		console.log(erg.searchthemeBack, "das kommt Thema");

		let searchBack =  document.getElementById(erg.searchthemeBack);
	
		let nodeBack, textnodeBack;
		nodeBack 	 = document.createElement("p");
		textnodeBack = document.createTextNode(erg.findsearchBack);
		nodeBack.appendChild(textnodeBack);	
		searchBack.appendChild(nodeBack);
		
		/*, newElement, newTextnode, addmeaning = ["", ", ", " gelesen, Genre: ", ""]; 		
		userGesamtIngesamt.value.books.forEach(key => {	
	
			nodeBack 	 = document.createElement("li");		
			textnodeBack = document.createTextNode(Object.values(key)[0] + " von "); 
			node.appendChild(textnode);		
			
			for(let i=1; i<=3; i++){			
				newElement = document.createElement("span");
				newTextnode = document.createTextNode( Object.values(key)[i] + addmeaning[i] );
				newElement.appendChild(newTextnode);
				node.appendChild(newElement)
			}
		*/


	}
	
	// function error( err ){ console.log(err)}

});