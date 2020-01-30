'use strict';

const NodeCouchDb = require('node-couchdb'); // for standard couchdb request

const couch = new NodeCouchDb(); // node-couchdb instance with default options



/*
const dbName = "buch-club";
const viewUrl = "_design/view4/_view/vorname";
couch.get(dbName, viewUrl).then( ({data, headers, status}) => {
    console.log(data, "GESAMT")
    console.log(data.rows[0].value.vorname, "EINZEL WERTE") 
});

*/



exports.dbArea =  () => { 
    return couch.listDatabases() // List of databases
};

/*
exports.dbUser =  () => { 
    return couch.get(dbName, viewUrl).then( ({data, headers, status}) => { 
    });
};

*/
