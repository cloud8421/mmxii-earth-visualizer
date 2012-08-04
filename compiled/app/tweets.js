
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
