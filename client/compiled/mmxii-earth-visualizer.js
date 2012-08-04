
window.MmxiiEarth = {
  Models: {},
  Collections: {},
  Views: {}
};

$(document).ready(function() {
  var tweets;
  tweets = new MmxiiEarth.Collections.Tweets;
  return new MmxiiEarth.Views.EarthPlotter;
});
