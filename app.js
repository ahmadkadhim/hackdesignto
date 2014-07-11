var express = require('express');
var app = express();

app.use(express.compress());

var oneDay = 86400000;

app.use(express.static(__dirname + '/public', { maxAge: oneDay }));

var server = app.listen(3000, function() {
	console.log('Listening on port %d', server.address().port);
});