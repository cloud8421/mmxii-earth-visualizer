var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

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
    this.tweet.created_at = this.humanizeDate(this.tweet.created_at);
    popup = Mustache.render(this.template, this.tweet);
    return this.earthMarker.bindPopup(popup, 400, false);
  };

  Marker.prototype.rotateToMarker = function() {
    var _ref;
    (_ref = this.earth).flyTo.apply(_ref, this.tweet.geo.coordinates);
    return this.earthMarker.openPopup();
  };

  Marker.prototype.humanizeDate = function(created_at) {
    var date;
    date = new Date(created_at);
    return moment(date).calendar();
  };

  return Marker;

})();

MmxiiEarth.Views.MarkersList = (function() {

  function MarkersList() {
    this.rotate = __bind(this.rotate, this);

    var _this = this;
    this.list = [];
    this.listen();
    setInterval(function() {
      return _this.rotate();
    }, 5000);
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
    }).on('click', '#next-marker', function() {
      return _this.rotate();
    });
  };

  MarkersList.prototype.rotate = function() {
    var cm;
    this.hide();
    cm = this.list.shift();
    this.list.push(cm);
    return cm.rotateToMarker();
  };

  return MarkersList;

})();
