'use strict';
var fs = require("fs"),
    http = require("http"),
    url = require("url"),
    path = require("path");




// Initiate the source
let Duplex = require('stream').Duplex;  

// abc
const net = require('net');
const port = 7070;
const host = 'localhost';
const server = net.createServer();

server.listen(port, host, () => {
    console.log('TCP Server is running on port ' + port +'.');
});
let sockets = [];
server.on('connection', function(sock) {
    console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);
    sockets.push(sock);
 sock.on('data', function(stats) {
		
		console.log('DATA ' + sock.remoteAddress + ': ');
 });
   
http.createServer(function (req, res) {
  if (req.url != "/movie.mp4") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end('<video src="http://localhost:8888/movie.mp4" controls></video>');
  } else {
    var file = path.resolve(__dirname,"movie.mp4");
	 sock.on('data', function(stats) {
		
		console.log('DATA ' + sock.remoteAddress + ': ');
    
  
 
      res.writeHead(206, {       
        "Accept-Ranges": "bytes",      
        "Content-Type": "video/mp4"
      });

      // var stream = fs.createReadStream(file, { start: start, end: end })
        // .on("open", function() {
          // stream.pipe(res);
        // }).on("error", function(err) {
          // res.end(err);
        // });
		 //fs.createReadStream(stats).pipe(res);
	

  let stream = new Duplex();
  stream.push(stats);
  stream.push(null);
   stream.pipe(res);
 
		  
    });
  }
}).listen(8888);




  console.log("a user connected");
  
  	



});
