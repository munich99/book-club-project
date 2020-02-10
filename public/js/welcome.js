'use strict';

let userGesamtIngesamt = JSON.parse(localStorage.getItem("userGesamt"));
console.log(userGesamtIngesamt,"xx");


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
	
// new book ##	
	btn.addEventListener ( 'click', () => {  

		// --- validate new book
				
		let fieldsfull	= true;
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

		// prüfe die id des neuen users
		if(userGesamtIngesamt.value.books){ 
			
			userGesamtIngesamt.value.books.push(newbookarray);	
			
		}else{ 			 
			userGesamtIngesamt.value.books = [];
			userGesamtIngesamt.value.books.push(newbookarray);

			console.log(userGesamtIngesamt.value.books, "id nicht da!!!!")
		}
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
		console.log(erg.searchthemeBack);

		let nodeBack, searchBack;		
		erg.findsearchBack.forEach(ele => {

			console.log(erg, "alles");
			
			searchBack =  document.getElementById(erg.searchthemeBack);					
				
			nodeBack 	 = document.createElement("p");
			nodeBack.innerHTML = (ele[1] + " hat es gelesen. Author " + ele[0].author + " davon gelesen: " + ele[0].read);

			searchBack.appendChild(nodeBack);

		})

	}	
	

});