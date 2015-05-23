/*Socket.IO is composed of two parts:
    A server that integrates with (or mounts on) the Node.JS HTTP Server: socket.io
    A client library that loads on the browser side: socket.io-client
*/

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

  //Each socket also fires a special disconnect event:
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  // print out the chat message event
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    //send the message to everyone, including the sender.
    io.emit('chat message', msg);
  });
});

//We make the http server listen on port 3000.
http.listen(3000, function(){
  console.log('listening on *:3000');
});


/*
In order to send an event to everyone, Socket.IO gives us the io.emit:
	io.emit('some event', { for: 'everyone' });
*/

/* send a message to everyone except for a certain socket, we have the broadcast flag:
io.on('connection', function(socket){
  socket.broadcast.emit('hi');
});
*/