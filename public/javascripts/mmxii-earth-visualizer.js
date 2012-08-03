/*! mmxii-earth-visualizer - v0.0.1 - 2012-08-03
* Copyright (c) 2012 Claudio Ortolina; Licensed  */


window.MmxiiEarth = {
  Models: {},
  Collections: {},
  Views: {}
};

$(document).ready(function() {
  var socket;
  window.tweets = new MmxiiEarth.Collections.Tweets;
  tweets.fetch();
  window.earthPlotter = new MmxiiEarth.Views.EarthPlotter(tweets.all());
  earthPlotter.plot();
  socket = io.connect('http://localhost');
  return socket.on('news', function(data) {
    console.log(data);
    return socket.emit('my other event', {
      my: 'data'
    });
  });
});


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
    this.tweet.text = this.tweet.text.parseURL().parseUsername().parseHashtag();
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
    }, 8000);
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

var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

MmxiiEarth.Collections.Tweets = (function() {

  Tweets.prototype.query = '/api.json';

  function Tweets() {
    this.fetch = __bind(this.fetch, this);
    this.fetch;
  }

  Tweets.prototype.fetch = function() {
    return $.getJSON(this.query, function(data) {
      var tweet, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = data.length; _i < _len; _i++) {
        tweet = data[_i];
        _results.push((function(tweet) {
          if (tweet.geo !== null) {
            return $.jStorage.set(tweet.id, tweet);
          }
        })(tweet));
      }
      return _results;
    });
  };

  Tweets.prototype.all = function() {
    var key;
    return shuffle((function() {
      var _i, _len, _ref, _results;
      _ref = $.jStorage.index();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        key = _ref[_i];
        _results.push($.jStorage.get(key));
      }
      return _results;
    })());
  };

  return Tweets;

})();
