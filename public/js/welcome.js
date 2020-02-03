'use strict';    
console.log(localStorage.getItem("user"));
console.log(localStorage.getItem("token"));  

document.addEventListener ( 'DOMContentLoaded', () => {
    document.getElementById("willkommen").innerHTML = localStorage.getItem("user");
});