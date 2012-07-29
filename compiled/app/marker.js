
MmxiiEarth.Views.Marker = (function() {

  function Marker(earth, tweet) {
    var _ref;
    this.earth = earth;
    this.tweet = tweet;
    this.earthMarker = (_ref = this.earth).initMarker.apply(_ref, this.tweet.geo.coordinates);
    this.render();
  }

  Marker.prototype.template = $('#tweet-template').html();

  Marker.prototype.render = function() {
    var popup;
    popup = Mustache.render(this.template, this.tweet);
    return this.earthMarker.bindPopup(popup);
  };

  return Marker;

})();

MmxiiEarth.Views.MarkersList = (function() {

  function MarkersList() {
    this.list = [];
    this.listen();
  }

  MarkersList.prototype.add = function(marker) {
    return this.list.push(marker);
  };

  MarkersList.prototype.hide = function() {
    var marker, _i, _len, _ref, _results;
    _ref = this.list;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      marker = _ref[_i];
      _results.push(marker.earthMarker.closePopup());
    }
    return _results;
  };

  MarkersList.prototype.listen = function() {
    var _this = this;
    return $('body').on('click', '#close-popups', function() {
      return _this.hide();
    });
  };

  return MarkersList;

})();
