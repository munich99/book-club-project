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

const JWT_Secret = 'your_secret_key';
const jwt = require('jsonwebtoken');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
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
	


app.post("/auth", (req, res) => {    
    
    let user = {
        email: req.body.email,
        password:  req.body.password,
        firstname: req.body.firstname
    }; 
    let token = jwt.sign(user, JWT_Secret);

    if(!req.body.firstname){            
         
        couch.get(dbName, viewUrl).
        then( ({data, headers, status}) => {
            
            let array1 = data.rows;             
            let forStatus = false;             
            for(let i=0; i<= array1.length-1; i++) {
                
                if(user.email === array1[i].value.email && user.password === array1[i].value.password) {
                    console.log("passt!");                      
                    res.status(200).send({
                    signed_user: array1[i],
                    token: token,                          
                    });
                    forStatus = true;
                    console.log("du bist drinnen");
                    console.log(array1[i].value.books,"books");
                    break;
                }  
            }
            if(!forStatus) {
                res.status(403).send({ errorMessage: 'nicht bekannt' });
                console.log("nicht bekannt");
            }         
        });
    } else {        

        couch.uniqid().then( (ids) => { 
            const id = ids[0]  // generate unique id
            couch.insert(dbName, {
                _id: id,
                firstname: req.body.firstname,
                email: req.body.email,
                password: req.body.password
            }).then(({data, headers, status}) => {
                console.log(data, "neuer user möglich!!");
                let Signed_user = {value:user};
                res.status(200).send({
                    signed_user:Signed_user,
                    token: token,          
                    });
            }, err => {
                res.status(403).send({ errorMessage: 'neuer user nicht möglich' });
                console.log("neuer user nicht möglich");
            });
        } );
    }    

});

// new book
app.post("/welcome/:id", (req, res) => {  
    const itemId = req.params.id;
    let user = {
        id:itemId, 
        rev: req.body.rev,
        booktitle:	req.body.booktitle,
        bookauthor: req.body.bookauthor,
        bookgenre:	req.body.bookgenre 
    };   

    console.log(user, "angekommen und buch");

            /*/ note that "doc" must have both "_id" and "_rev" fields
            couch.update(dbName, {
                _id: id,
                _rev: "1-xxx",
                field: "new sample data",
                field2: 1
            }).then(({data, headers, status}) => {
                        
            }, err => {
                // either request error occured
                // ...or err.code=EFIELDMISSING if either _id or _rev fields are missing
            }); */

            res.status(200).send({
                new_book: {"new":22}               
                });
    
});
