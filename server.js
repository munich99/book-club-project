'use strict';

// testing
console.log("Hello World!");

const express = require('express');
const server = express();

// route handler
server.get('/json', (req,res)=>{
    res.json({message:"hallo world!!"})    
})
server.get('/',(req,res)=>{
    res.sendFile(__dirname + "/index.html");
});

// Start server
const port = 4000;
server.listen(port, ()=>{
    console.log(`server listen at port ${port}`);
    
})


