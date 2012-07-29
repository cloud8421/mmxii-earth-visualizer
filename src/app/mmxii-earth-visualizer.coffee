window.MmxiiEarth =
  Models: {}
  Collections: {}
  Views: {}

$(document).ready ->

  window.tweets = new MmxiiEarth.Collections.Tweets
  # tweets.fetch()
  window.earthPlotter = new MmxiiEarth.Views.EarthPlotter(tweets.all())
  earthPlotter.plot()
