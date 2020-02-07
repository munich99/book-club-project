'use strict';


        
document.addEventListener ( 'DOMContentLoaded', () => {

    
    
    // DOM-Elemente
    let email = document.querySelector('#email');
    let password = document.querySelector('#password');    
    let btn = document.querySelector('#btn');

    let linkNeueruser = document.querySelector('#link-neueruser');
    let firstname=[];

    let node, newUser, el, nodeLogin, textnodeLogin, addLogin
    linkNeueruser.addEventListener ( 'click', () => {

        node = document.createElement("input");   
        newUser = document.getElementById("eingabe");
        newUser.insertBefore(node, newUser.childNodes[0]);  
        
        node.setAttribute("id", "firstname");
        node.setAttribute("name", "firstname");
        node.setAttribute("placeholder", "Vorname");
        node.setAttribute("required", true);

        firstname = document.querySelector('#firstname');        
        el = document.getElementById('link-neueruser');
        el.remove(); 
        document.getElementById("btn").innerHTML = "Registrieren";

        nodeLogin = document.createElement("a");
        textnodeLogin = document.createTextNode("zurück zu Anmeldung");
        nodeLogin.appendChild(textnodeLogin);
        nodeLogin.classList.add("auth");
        nodeLogin.setAttribute("href", "auth.html");

        addLogin = document.querySelector(".main");
        addLogin.appendChild(nodeLogin);

    });
    

    btn.addEventListener ( 'click', () => {   
        
        // --- validate
				
		let fieldsfull	= true;
		let matches 	= document.getElementById("eingabe").querySelectorAll("input");	

		matches.forEach(element => {  // short for all inputs 			
			if (!element.validity.valid) {
				 element.focus(); fieldsfull=false; return
			}	
		});

		if(!fieldsfull) return 
		
        // -----------
        
        let meinRequest = newRquest('/auth');

        fetch( meinRequest ).then(
            erg => erg.json() //console.log(erg)    
        ).then(
            erg => token(erg)  
        ).catch(
            err => fehler()
        )
    });

    function newRquest(auth) {
        return new Request(
            auth,
            {
                method: 'post',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({                            
                    email:  ( email.value ),
                    password:  ( password.value ),
                    firstname:  ( firstname.value )                   
                })
            }
        )
    }

    function token(usertoken){     
        // console.log(usertoken.signed_user.id,"--usertoken--id"); 
        
        if(usertoken.signed_user.value.rev){
            console.log(usertoken, "gesamt");

            localStorage.setItem("userGesamt", JSON.stringify(usertoken.signed_user));
            // window.location.replace("/welcome");

        }else{ 
            console.log(usertoken, "erstmal nix");
            
            
            let abfrage = "/welcome/neueid/:" + usertoken.signed_user.id;
            let meinRequest = newRquest(abfrage);

            fetch( meinRequest ).then(
                erg => erg.json() //console.log(erg)    
            ).then(
                erg => usertoken.signed_user.value.rev = erg.signed_rev //  tokenNeu(erg) 
            ).catch(
                err => console.log(err,"mit rev err")
            )

            console.log(usertoken," alles neu")
        }        
    }
    function fehler(){alert("nicht möglich")}
})
