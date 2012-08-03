
window.MmxiiEarth = {
  Models: {},
  Collections: {},
  Views: {}
};

$(document).ready(function() {
  var socket;
  window.tweets = new MmxiiEarth.Collections.Tweets;
  tweets.fetch();
  window.earthPlotter = new MmxiiEarth.Views.EarthPlotter(tweets.all());
  earthPlotter.plot();
  socket = io.connect('http://localhost');
  return socket.on('news', function(data) {
    console.log(data);
    return socket.emit('my other event', {
      my: 'data'
    });
  });
});
