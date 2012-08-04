
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes/routes')
  , http = require('http')
  , path = require('path')
  , app = express.createServer()
  , io   = require('socket.io')
  , DataSift = require('datasift')
  , consumer = new DataSift('cloud8421', 'fed2b3cda097e37d8dd1f9e78779a023');

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);

app.get('/api.json', routes.api);

var server = http.createServer(app);

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

var sio = io.listen(server);

sio.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

// consumer.connect();
consumer.on("connect", function(){
  consumer.subscribe('a04bf77b2b2a45228772cb1f83903259');
});
consumer.on("disconnect", function(){
  console.log("Disconnected!");
});
consumer.on("interaction", function(obj) {
  if(obj.data !== undefined) {
    //console.log(obj.data);
    sio.sockets.emit('data', {
      source : obj.data
    });
  }
});
