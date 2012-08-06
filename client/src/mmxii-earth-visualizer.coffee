window.MmxiiEarth =
  Models: {}
  Collections: {}
  Views: {}

$(document).ready ->

  tweets = new MmxiiEarth.Collections.Tweets
  new MmxiiEarth.Views.EarthPlotter

  socket = io.connect('http://mmxii-earth-visualizer.jit.su/')
  # socket = io.connect('http://localhost/')
  socket.on 'data', (data) ->
    tweets.add data.source
