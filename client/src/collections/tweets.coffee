class MmxiiEarth.Collections.Tweets

  constructor: ->
    @tweets = []

  add: (tweet) ->
    @tweets.push tweet
    $.publish 'new_tweet', tweet

