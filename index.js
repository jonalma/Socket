// Express initializes app to be a function handler that you can supply to an HTTP server 
var app = require('express')(); 
var http = require('http').Server(app);
//initialize a new instance of socket.io by passing the http (the HTTP server) object. 
var io = require('socket.io')(http);

// app.get('/', function(req, res){
//   res.send('<h1>Hello world</h1>');
// });

//We define a route handler / that gets called when we hit our website home.
app.get('/', function(req, res){
  res.sendfile('index.html');
});

//listen on the connection event for incoming sockets, and I log it to the console.
io.on('connection', function(socket){
  console.log('a user connected');
});

//We make the http server listen on port 3000.
http.listen(3000, function(){
  console.log('listening on *:3000');
});

