'use strict';
        
document.addEventListener ( 'DOMContentLoaded', () => {
    
    // DOM-Elemente
    let email = document.querySelector('#email');
    let input2 = document.querySelector('#password');
    let btn = document.querySelector('#btn');

    btn.addEventListener ( 'click', () => {

        let meinRequest = new Request(
            '/auth',
            {
                method: 'post',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({                            
                    email:  ( email.value ),
                    password:  ( password.value ),
                })
            }
        )

        fetch( meinRequest ).then(
            erg => erg.json() //console.log(erg)    
        ).then(
            erg => token(erg)  
        ).catch(
            err => console.error( err )
        )
    });

    function token(usertoken){ 
        console.log(usertoken, "wertwetr");
                        
        if(usertoken.token) {
            localStorage.setItem("user", usertoken.signed_user.value.vorname);
            localStorage.setItem("token", usertoken.token); 
            window.location.replace("/welcome");
        } 
    }
})