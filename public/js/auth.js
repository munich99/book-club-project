'use strict';
        
document.addEventListener ( 'DOMContentLoaded', () => {
    
    // DOM-Elemente
    let email = document.querySelector('#email');
    let password = document.querySelector('#password');    
    let btn = document.querySelector('#btn');

    let linkNeueruser = document.querySelector('#link-neueruser');
    let firstname=[];

    linkNeueruser.addEventListener ( 'click', () => {
        let node = document.createElement("input");                
        let textnode = document.createTextNode("Water"); 
        node.appendChild(textnode);                             
        let newUser = document.getElementById("eingabe");
        newUser.insertBefore(node, newUser.childNodes[0]);  
        
        node.setAttribute("id", "firstname");
        node.setAttribute("name", "firstname");
        node.setAttribute("placeholder", "Vorname");

        firstname = document.querySelector('#firstname');
    });
    

    btn.addEventListener ( 'click', () => {        
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
            '/auth',
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
                        
        if(usertoken.token) {      
            localStorage.setItem("token", usertoken.token); 
            localStorage.setItem("user", usertoken.signed_user.value.firstname);
            localStorage.setItem("books", JSON.stringify(usertoken.signed_user.value.books)); 
            window.location.replace("/welcome");
        } 
    }

})
