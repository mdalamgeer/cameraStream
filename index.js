'use strict';
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);




// Initiate the source
let Duplex = require('stream').Duplex;  

// abc
const net = require('net');
const port = 7070;
const host = 'localhost';
// const host = '18.223.148.236';
const server = net.createServer();

server.listen(port, host, () => {
    console.log('TCP Server is running on port ' + port +'.');
});
let sockets = [];
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});



http.listen(3000, function(){
  console.log('listening on *:3000');
});

server.on('connection', function(sock) {
    console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);
    sockets.push(sock);
	
io.on('connection', function(socket){
  console.log('a user IO connected');
  
  
  sock.on('data', function(stats) {
		var currentdate = new Date(); 
var datetime = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
		console.log('DATA ' + sock.remoteAddress + ': New data...'+datetime);
		
		 io.emit('stream', stats);
 });
   
});
	
 
 
 
  console.log("a user connected");
  
  	



});
