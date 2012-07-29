
window.MmxiiEarth = {
  Models: {},
  Collections: {},
  Views: {}
};

$(document).ready(function() {
  window.tweets = new MmxiiEarth.Collections.Tweets;
  tweets.fetch();
  window.earthPlotter = new MmxiiEarth.Views.EarthPlotter(tweets.all());
  return earthPlotter.plot();
});
