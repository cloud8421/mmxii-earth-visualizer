class MmxiiEarth.Collections.Tweets

  query: 'http://search.twitter.com/search.json?q=%23Olympics%20OR%20%23London2012%20OR%20%23Olympic&geocode=51.3051,-1.0543,10000km&rpp=100&callback=?'

  constructor: ->
    @fetch

  fetch: =>
    $.getJSON @query, (data) ->
      for tweet in data.results
        do (tweet) ->
          if tweet.geo isnt null
            $.jStorage.set(tweet.id, tweet)

  all: ->
    $.jStorage.get(key) for key in $.jStorage.index()

