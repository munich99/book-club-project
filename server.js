'use strict';
// testing
console.log("Hello World!");

const express = require('express');
const server = express();

// route handler
server.get('/json', (req,res)=>{
    res.json({message:"hallo world!!"})    
});
server.get('/',(req,res)=>{
    res.sendFile(__dirname + "/index.html");
});

// start server
const port = 4000;
server.listen(port, ()=>{
    console.log(`server listen at port ${port}`);    
});

// own apps
let data = require('./own_modules/data');
server.get('/items', (req,res)=>{
    res.json(data);        
});

server.get('/items/:id', (req,res)=>{
    const itemId = req.params.id;
    const item = data.find(_item =>_item.id === itemId);

    if(item)res.json(item)
    else res.json({massage:"id nicht vorhanden"})
    

});




