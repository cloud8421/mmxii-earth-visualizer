var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

MmxiiEarth.Collections.Tweets = (function() {

  Tweets.prototype.query = '/sample_data.json';

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
    var key, _i, _len, _ref, _results;
    _ref = $.jStorage.index();
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      key = _ref[_i];
      _results.push($.jStorage.get(key));
    }
    return _results;
  };

  return Tweets;

})();
