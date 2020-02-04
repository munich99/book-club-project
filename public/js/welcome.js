'use strict';    
console.log(localStorage.getItem("user"));
console.log(localStorage.getItem("token"));  
console.log(localStorage.getItem("id"));
console.log(localStorage.getItem("rev"),"rev");

let obj = JSON.parse(localStorage.getItem("books"));
console.log(obj,"books");
 

document.addEventListener ( 'DOMContentLoaded', () => {
	// DOM-Elemente 
	let bookGenre = document.querySelector('#book-genre');
	let bookTitle = document.querySelector('#book-title');
	let bookAuthor = document.querySelector('#book-author');    
	let btn = document.querySelector('#btn');

	document.getElementById("willkommen").innerHTML = localStorage.getItem("user");
		
	Object.keys(obj).forEach(key => {
		let node = document.createElement("li");                
		let textnode = document.createTextNode(`${obj[key]}`); 
		node.appendChild(textnode);

		let newElement = document.createElement("span");
		let textnode2 = document.createTextNode(`${key}`); 
		newElement.appendChild(textnode2);

		node.appendChild(newElement);	
		document.getElementById("deine-buecher-liste").appendChild(node);		
	 });

	 // const matches = document.getElementById("eingabe").querySelectorAll("input");
	 //console.log(matches,"values");
	 //console.log(matches[0].value,"vv");
	// matches.forEach(element => console.log(element.value),"valueee");
	 
	 

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
            ( '/welcome/:' + localStorage.getItem("id") ),
            {
                method: 'post',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({                            
                    booktitle:	bookTitle.value,
                    bookauthor: bookAuthor.value,
					bookgenre:	bookGenre.value,
					rev:        localStorage.getItem("rev")          
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