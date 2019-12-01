var express = require('express');
var app     = express();
var http    = require('http').Server(app);

app.use(express.static(__dirname + '/public'));

http.listen(8000, function() {
  console.log("Server is listening on port 8000");
});
