'use strict';    
console.log(localStorage.getItem("user"));
console.log(localStorage.getItem("token"));  

let obj=JSON.parse(localStorage.getItem("books"));
Object.keys(obj).forEach(key=>{

	console.log(`${key} : ${obj[key]}`);

 });
 

document.addEventListener ( 'DOMContentLoaded', () => {
    document.getElementById("willkommen").innerHTML = localStorage.getItem("user");
});