'use strict';

const NodeCouchDb = require('node-couchdb'); // for standard couchdb request
const couch = new NodeCouchDb(); // node-couchdb instance with default options
exports.dbArea =  () => { 
    return couch.listDatabases() // List of databases
};


const dbName = "buch-club"; // Name of database
const viewUrl = "_design/view4/_view/vorname"; // Path to database JSON
exports.dbUser = couch.get(dbName, viewUrl).then( ({data, headers, status}) => {    
    return data.rows[0].value.vorname // Value from databases
});


