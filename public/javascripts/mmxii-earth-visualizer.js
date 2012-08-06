/*! mmxii-earth-visualizer - v0.0.3 - 2012-08-06
* Copyright (c) 2012 Claudio Ortolina; Licensed  */


window.MmxiiEarth = {
  Models: {},
  Collections: {},
  Views: {}
};

$(document).ready(function() {
  var socket, tweets;
  tweets = new MmxiiEarth.Collections.Tweets;
  new MmxiiEarth.Views.EarthPlotter;
  socket = io.connect('http://mmxii-earth-visualizer.jit.su/');
  return socket.on('data', function(data) {
    return tweets.add(data.source);
  });
});


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

var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

MmxiiEarth.Views.Marker = (function() {

  function Marker(earth, tweet) {
    this.earth = earth;
    this.tweet = tweet;
    this.earthMarker = this.earth.initMarker(this.tweet.interaction.geo.latitude, this.tweet.interaction.geo.longitude);
    this.render();
  }

  Marker.prototype.template = $('#tweet-template').html();

  Marker.prototype.render = function() {
    var popup;
    this.tweet.created_at = this.humanizeDate(this.tweet.interaction.created_at);
    console.log(this.tweet.interaction);
    this.tweet.text = this.tweet.interaction.content.parseURL().parseUsername().parseHashtag();
    popup = Mustache.render(this.template, this.tweet);
    return this.earthMarker.bindPopup(popup, 400, false);
  };

  Marker.prototype.rotateToMarker = function() {
    this.earth.flyTo(this.tweet.interaction.geo.latitude, this.tweet.interaction.geo.longitude);
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

  MarkersList.prototype.started = false;

  function MarkersList() {
    this.rotate = __bind(this.rotate, this);
    this.list = [];
    this.listen();
  }

  MarkersList.prototype.add = function(marker) {
    this.list.push(marker);
    if (!this.started) {
      return this.start();
    }
  };

  MarkersList.prototype.start = function() {
    var _this = this;
    this.rotate();
    setInterval(function() {
      return _this.rotate();
    }, 4000);
    return this.started = true;
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


MmxiiEarth.Collections.Tweets = (function() {

  function Tweets() {
    this.tweets = [];
  }

  Tweets.prototype.add = function(tweet) {
    this.tweets.push(tweet);
    return $.publish('new_tweet', tweet);
  };

  return Tweets;

})();
