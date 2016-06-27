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
        // componentsとactionsで別のセッションを張ってしまっている場合
        // 異なるセッションに通知(socket.emit)しても意味がないため、
        // ここでは、一旦繋がっているセッションの全てに通知を行う。
        //socket.emit('recieve comments', JSON.parse(data));
        socket.broadcast.emit('recieve comments', JSON.parse(data));
      });
    });

    socket.on('create comment', function(comment){
      fs.readFile('db/comments.json', function(err, data) {
        var comments = JSON.parse(data);
        comments.push(comment);
        fs.writeFile('db/comments.json', JSON.stringify(comments, null, 4), function(err) {
          // componentsとactionsで別のセッションを張ってしまっている場合
          // 異なるセッションに通知(socket.emit)しても意味がないため、
          // ここでは、一旦繋がっているセッションの全てに通知を行う。
          //socket.emit('recieve comments', comments);
          socket.broadcast.emit('recieve comments', comments);
        });
      });
    });
/*
    // 無駄に通知しないでも本来は良いはず。
    setInterval(function(){
      fs.readFile('db/comments.json', function(err, data) {
        socket.emit('recieve comments', JSON.parse(data));
      });
    }, 2000);
*/
  })
};

module.exports = channel;