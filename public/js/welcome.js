'use strict';    
console.log(localStorage.getItem("user"));
console.log(localStorage.getItem("token"));  
console.log(localStorage.getItem("books"));

let z = localStorage.getItem("books");



 console.log(z,"zei mal");


let obj = z;
 obj=JSON.parse(obj);
 Object.keys(obj).forEach(key=>{
	console.log(`${key} : ${obj[key]}`);
 });








 

 

document.addEventListener ( 'DOMContentLoaded', () => {
    document.getElementById("willkommen").innerHTML = localStorage.getItem("user");
});