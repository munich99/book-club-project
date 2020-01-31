'use strict';
// testing
//
console.log("Hello World!");

const express = require('express');
const body_parser = require('body-parser');
const cors = require('cors');
const path =require('path');
const NodeCouchDb = require('node-couchdb');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true })) //({ extended: false }) for sending <form> without JSON
app.use(cors());

// node-couchdb instance with default options
const couch = new NodeCouchDb();

couch.listDatabases().then( (dbs) => {
    // console.log(dbs)
    }, err => {
    console.log(err)
});

const dbName = "buch-club";
const viewUrl = "_design/view4/_view/vorname";


// route handler
app.get('/',(req,res)=>{
   // res.render('index') // only file.ejs ## app.set('view engine', 'ejs'); ##
   res.sendFile(__dirname + "/public/index.html");
});

app.get('/auth',(req,res)=>{
    res.sendFile(__dirname + "/public/auth.html");
});

app.get('/welcome',(req,res)=>{
    res.sendFile(__dirname + "/public/welcome.html");
});

// start app
const port = 4000;
app.listen(port, ()=>{
    console.log(`app listen at port ${port}`);    
});

// own apps
let data = require('./own_modules/data');
app.get('/items', (req,res)=>{
    res.json(data);        
});

app.get('/items/:id', (req,res)=>{
    const itemId = req.params.id;
    const item = data.find(_item =>_item.id === itemId);

    if(item)res.json(item)
    else res.json({massage:"id nicht vorhanden"})  
});

// post app
/* for #postman# dont forget
 header-> content-type:application/json
 body -> {"key":"value"}
 */

// DECLARE JWT-secret, but missing substrings #install jsonwebtoken#
const JWT_Secret = 'your_secret_key';
const jwt = require('jsonwebtoken');	


app.post("/auth", (req, res) => {

    let user = {
        email: req.body.email,
        password:  req.body.password
    }; 

    couch.get(dbName, viewUrl).
    then( ({data, headers, status}) => {
        // console.log(user.email);
         let array1 = data.rows; 
         let forStatus = false; 
         for(let i=0; i<= array1.length-1; i++) {
            console.log(array1[i].value.password,"datenbank"); 
            console.log(array1[i].value.email,"eingabe");
            console.log(user, "user")
             
             if(user.email === array1[i].value.email && user.password === array1[i].value.password) {
                 console.log("passt!");  
                 let token = jwt.sign(user, JWT_Secret);
                 res.status(200).send({
                   signed_user: array1[i],
                   token: token,          
                 });
                 forStatus = true;
                 console.log("du bist drinnen");
                 break;
             }  
        }
        if(!forStatus) {
            res.status(403).send({ errorMessage: 'nicht bekannt' });
             console.log("nicht bekannt");
         }         
    });
 });
