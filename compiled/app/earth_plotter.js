
MmxiiEarth.Views.EarthPlotter = (function() {

  EarthPlotter.prototype.defaultAltitude = 9592125;

  function EarthPlotter() {
    var options,
      _this = this;
    options = {
      zoom: 0.2,
      position: [51.3051, -1.0543],
      altitude: this.defaultAltitude
    };
    this.earth = new WebGLEarth('earth-container', options);
    this.markersList = new MmxiiEarth.Views.MarkersList;
    $.subscribe('new_tweet', function(evt, tweet) {
      return _this.markersList.add(new MmxiiEarth.Views.Marker(_this.earth, tweet));
    });
  }

  return EarthPlotter;

})();
