
MmxiiEarth.Views.EarthPlotter = (function() {

  function EarthPlotter(tweets) {
    var options;
    this.tweets = tweets;
    options = {
      zoom: 0.2,
      position: [51.3051, -1.0543]
    };
    this.earth = new WebGLEarth('container', options);
  }

  EarthPlotter.prototype.plot = function() {
    var tweet, _i, _len, _ref, _results,
      _this = this;
    console.log("Plotting " + this.tweets.length + " tweets...");
    this.markersList = new MmxiiEarth.Views.MarkersList;
    _ref = this.tweets;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      tweet = _ref[_i];
      _results.push((function(tweet) {
        return _this.markersList.add(new MmxiiEarth.Views.Marker(_this.earth, tweet));
      })(tweet));
    }
    return _results;
  };

  return EarthPlotter;

})();
