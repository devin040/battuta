const mariadb = require('mariadb');

var locs = ['LHR', 'CDG', 'AMS', 'MAD', 
            'BCN', 'FCO', 'DUB', 'ZRH', 'CPH', 'VIE', 'TXL'] ;

const conn= mariadb.createConnection({
    host: 'battuta.cole6w4w7clq.us-east-2.rds.amazonaws.com', 
    database: 'battutardb',
    user:'admin',
    password: '1qaz!QAZ'
  })
  .then(conn => {
    console.log("connected ! connection id is " + conn.threadId);
    for (var i = 0; i < locs.length; i++){
        for (var j = 0; j < locs.length; j++){
            if (i != j){
                conn.query("INSERT INTO routes(fromPort, toPort, routeStr) values(?,?,?)",
                [locs[i], locs[j], locs[i] + "" + locs[j]]);
            }
        }
    }

  })
  .catch(err => {
    console.log("not connected due to error: " + err);
});
