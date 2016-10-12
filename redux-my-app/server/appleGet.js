/**
 * Created by CoolGuy on 2016/10/12 11:32.
 */
var http = require('http');

var data = {id:5,weight:260,isEaten:false};

var srv = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(data));
});

srv.listen(3000, function() {
    console.log('listening on localhost:8080');
});