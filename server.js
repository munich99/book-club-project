'use strict';
console.log("Hello World!"); // testing

const express = require('express');
const body_parser = require('body-parser');
const cors = require('cors');
const path =require('path');
const NodeCouchDb = require('node-couchdb');

const app = express();

const JWT_Secret = 'your_secret_key';
const jwt = require('jsonwebtoken');

const dbName = "buch-club";
const viewUrl = "_design/view4/_view/vorname";

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true })) //({ extended: false }) for sending <form> without JSON
app.use(cors());

// node-couchdb instance with default options ### here not use ###
const couch = new NodeCouchDb();
couch.listDatabases().then( (dbs) => {
    // console.log(dbs)
    }, err => {
    console.log(err)
});

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

// own apps ## here not use ###
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
// ##end not use apps ##

// post app
/* for #postman# dont forget
 header-> content-type:application/json
 body -> {"key":"value"}
 */


	


app.post("/auth", (req, res) => {    
    
    let user = {
        email: req.body.email,
        password:  req.body.password,
        firstname: req.body.firstname
    }; 
    // DECLARE JWT-secret, install jsonwebtoken ### here not use, but ##JSON Web Tokens for heigh SECURITY
    let token = jwt.sign(user, JWT_Secret);

    if(!req.body.firstname){        
         
        couch.get(dbName, viewUrl).
        then(({data, headers, status}) => {            
            let array1 = data.rows;                        
            let forStatus = false;             
            for(let i=0; i<= array1.length-1; i++) {
                
                if(user.email === array1[i].value.email && user.password === array1[i].value.password) {
                    console.log("du bist drinnen");                      
                    res.status(200).send({
                    signed_user: array1[i],
                    token: token,                          
                    });
                    forStatus = true;     
                    break;
                }  
            }

            if(!forStatus) {
                res.status(403).send('nicht bekannt!!!');
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
                // console.log(data, "neuer user möglich!!");
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

// new book -- new router
app.post("/welcome/:id", (req, res) => { 
    const itemId = req.params.id;
    let userbook = {
        id:itemId.substr(1), // remove : from (/:id)
        rev:            req.body.value.rev,
        firstname:      req.body.value.firstname,
        email:          req.body.value.email,
        password:       req.body.value.password,
        books:          req.body.value.books
    };       
    
    // note that "doc" must have both "_id" and "_rev" fields
    couch.update(dbName, {
        _id:           `${userbook.id}`,  // ${} important to set id in quotes
        _rev:          `${userbook.rev}`,
        firstname:      userbook.firstname,
        email:          userbook.email,
        password:       userbook.password,
        readedBooks:    userbook.books
    }).then(

        couch.get(dbName, userbook.id)
    ).then(({data, headers, status}) => {  
        res.status(200).send({
            rev_user: data.rev                      
        });   
        console.log("eintrag geändert und gesendet!!");
    }, err => {
        res.status(403).send("noththing ok");
        console.log("buch anlegen nicht möglich");
    })
});
