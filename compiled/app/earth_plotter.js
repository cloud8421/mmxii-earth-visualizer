
MmxiiEarth.Views.EarthPlotter = (function() {

  EarthPlotter.prototype.defaultAltitude = 9592125;

  function EarthPlotter(tweets) {
    var options;
    this.tweets = tweets;
    options = {
      zoom: 0.2,
      position: [51.3051, -1.0543],
      altitude: this.defaultAltitude
    };
    this.earth = new WebGLEarth('earth-container', options);
    this.listen();
  }

  EarthPlotter.prototype.plot = function() {
    var tweet, _i, _len, _ref, _results,
      _this = this;
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

  EarthPlotter.prototype.listen = function() {
    return $('body').on('click', '#altitude', function(evt) {
      return console.log(evt);
    });
  };

  return EarthPlotter;

})();
