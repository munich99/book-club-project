'use strict';
// testing
console.log("Hello World!");

const express = require('express');
const auth = express();

// route handler
auth.get('/json', (req,res)=>{
    res.json({message:"hallo world!!"})    
});
auth.get('/',(req,res)=>{
    res.sendFile(__dirname + "/index.html");
});

// start auth
const port = 4000;
auth.listen(port, ()=>{
    console.log(`auth listen at port ${port}`);    
});

// own apps
let data = require('./own_modules/data');
auth.get('/items', (req,res)=>{
    res.json(data);        
});

auth.get('/items/:id', (req,res)=>{
    const itemId = req.params.id;
    const item = data.find(_item =>_item.id === itemId);

    if(item)res.json(item)
    else res.json({massage:"id nicht vorhanden"})  
});

// post auth
/* for #postman# dont forget
 header-> content-type:application/json
 body -> {"key":"value"}
 */
const body_parser = require('body-parser');
const cors = require('cors');
auth.use(body_parser.json());
auth.use(cors());

// DECLARE JWT-secret #install jsonwebtoken#
const JWT_Secret = 'your_secret_key';
const jwt = require('jsonwebtoken');


	
var testUser = { email: 'kelvin@gmai.com', password: '1234'};

auth.post("/auth", (req, res) => {
    //console.log(req.body.id,"id")
    let user = {
        email: req.body.email,
        password:  req.body.password
    };    
    // res.send ( JSON.stringify ( user ) ); #doppeltes -send- vermeiden

    if(user.email === testUser.email && user.password === testUser.password) {        
        let token = jwt.sign(user, JWT_Secret);
        res.status(200).send({
          signed_user: user,
          token: token,          
        });
        console.log("du bist drinnen");
        // res.sendFile(__dirname + "/index.html");
    } 
    else 
    {}
    
        
    


 });





