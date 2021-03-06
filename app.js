
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , app = express.createServer()
  , io   = require('socket.io')
  , DataSift = require('datasift')
  , consumer = new DataSift('cloud8421', 'fed2b3cda097e37d8dd1f9e78779a023')
  , mongo = require('mongodb')
  , Server = mongo.Server
  , Db = mongo.Db;

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

app.get('/', function(req, res){
  res.render('index', { title: 'Express' });
});

var server = http.createServer(app);

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

var sio = io.listen(server);

sio.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
});

// var server = new Server('localhost', 27017, {auto_reconnect: true});
var server = new Server('alex.mongohq.com', 10011, {auto_reconnect: true});
var db = new Db('mmxii-earth', server);

db.open(function(err, p_client) {
  db.authenticate('mmxiiearth', 'mmxiiearth', function(err){
    if(!err) {
      console.log("We are connected");
      db.createCollection('tweets', function(err, collection) {});
    }
  });
});

consumer.connect();
consumer.on("connect", function(){
  consumer.subscribe('a04bf77b2b2a45228772cb1f83903259');
});
consumer.on("disconnect", function(){
  console.log("Disconnected!");
});
consumer.on("interaction", function(obj) {
  if(obj.data !== undefined) {
    sio.sockets.emit('data', {
      source : obj.data
    });
    db.collection('tweets', function(err, collection) {
      collection.insert({data: obj.data});
    });
  }
});
