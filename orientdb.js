var OrientDB = require('orientjs');
var dbConfig = {
   host:       '139.59.103.56',
   port:       2424,
   username:   'root',
   password:   'Sgweb2211'
};

console.log("Try to connect to db");
console.log(dbConfig);
var server = OrientDB(dbConfig);

var dbs = server.list()
   .then(
      function(list){
         console.log('Databases on Server:', list.length);
      }
   );

//server.close();
//console.log("Server close");