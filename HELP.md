const couch = new NodeCouchDb();


const dbName = "buch-club";
const viewUrl = "_design/view4/_view/vorname";
let foo;
let ff = couch.get(dbName, viewUrl).then( ({data, headers, status}) => {    
    return data.rows[0].value.vorname 
}).
then(
    (erg)=> {
        foo = erg;
        zeichen();
    }    
);

const zeichen = ()=> {

    // user passwort abgleichen etc, etc, etc, ...........
    /// einfach foo holen
    console.log(foo);
}

