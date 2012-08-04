
window.MmxiiEarth = {
  Models: {},
  Collections: {},
  Views: {}
};

$(document).ready(function() {
  var socket, tweets;
  tweets = new MmxiiEarth.Collections.Tweets;
  new MmxiiEarth.Views.EarthPlotter;
  socket = io.connect('http://localhost');
  return socket.on('data', function(data) {
    return tweets.add(data.source);
  });
});
