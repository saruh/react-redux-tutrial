var fs = require('fs');

var channel = function(io) {
  io.on('connection', function(socket) {

    console.log('connection');
    // Connection Count
    console.log('Object.keys(io.sockets.sockets).length', Object.keys(io.sockets.sockets).length);
    console.log('io.eio.clientsCount', io.eio.clientsCount);
    console.log('io.engine.clientsCount', io.engine.clientsCount);
    console.log('socket.client.conn.server.clientsCount', socket.client.conn.server.clientsCount);

    socket.on('search comments', function(){
      fs.readFile('db/comments.json', function(err, data) {
        console.log('search comments', JSON.parse(data));
        socket.emit('recieve comments', JSON.parse(data));
      });
    });

    socket.on('create comment', function(comment){
      fs.readFile('db/comments.json', function(err, data) {
        var comments = JSON.parse(data);
        comments.push(comment);
        fs.writeFile('db/comments.json', JSON.stringify(comments, null, 4), function(err) {
          console.log('create comment', comments);
          socket.broadcast.emit('recieve comments', comments);
        });
      });
    });

  })
};

module.exports = channel;